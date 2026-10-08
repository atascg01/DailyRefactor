# Links config files in this repo into the places Claude Code, Codex and OpenCode read them from.
# Safe to re-run: correct links are skipped, real files are moved to ~/.dotfiles-backup/<timestamp> first.
#
#   .\install.ps1          create/repair links
#   .\install.ps1 -Check   only report status (use this to spot a tool that replaced a link with a real file)
#
# Needs Windows Developer Mode (or an admin shell) for symlinks. Uses mklink because
# Windows PowerShell 5.1's New-Item ignores Developer Mode.

param([switch]$Check)

$ErrorActionPreference = 'Stop'
$Repo = $PSScriptRoot
$H = $env:USERPROFILE
$Backup = Join-Path $H ".dotfiles-backup\$(Get-Date -Format yyyyMMdd-HHmmss)"

# repo path (relative)              -> live path  -- edit this list to match the files you track
$Links = [ordered]@{
    'shared\skills'                 = "$H\.agents\skills"
    'shared\skill-lock.json'        = "$H\.agents\.skill-lock.json"
    'claude\settings.json'          = "$H\.claude\settings.json"
    'codex\config.windows.toml'     = "$H\.codex\config.toml"   # per-OS: Codex writes absolute runtime paths
    'codex\AGENTS.md'               = "$H\.codex\AGENTS.md"
    'opencode\opencode.jsonc'       = "$H\.config\opencode\opencode.jsonc"
    'opencode\AGENTS.md'            = "$H\.config\opencode\AGENTS.md"
    'opencode\package.json'         = "$H\.config\opencode\package.json"
    'opencode\plugins'              = "$H\.config\opencode\plugins"
}

function Get-LinkTarget($Path) {
    $item = Get-Item -LiteralPath $Path -Force -ErrorAction SilentlyContinue
    if ($item -and $item.LinkType) { return [string]($item.Target | Select-Object -First 1) }
    return $null
}

function Get-TreeHash($Path) {
    # One string describing every file (relative path + content hash), for comparing two folders.
    $root = (Get-Item -LiteralPath $Path -Force).FullName
    if (-not (Test-Path -LiteralPath $Path -PathType Container)) { return (Get-FileHash -LiteralPath $Path).Hash }
    (Get-ChildItem -LiteralPath $Path -Recurse -File -Force | Sort-Object FullName |
        ForEach-Object { $_.FullName.Substring($root.Length) + ':' + (Get-FileHash -LiteralPath $_.FullName).Hash }) -join '|'
}

# A machine that already has its own config: decide what to do with it before linking.
#   folder vs folder: entries only on this machine move into the repo (additive, nothing lost);
#                     same-named entries that differ are returned as conflicts (repo version wins).
#   file vs file:     Same = identical, so no backup is needed.
# With -Check it only reports what would happen.
function Resolve-Existing($Dst, $Src, $Rel) {
    $r = @{ Same = $false; Conflicts = @() }
    $dstIsDir = Test-Path -LiteralPath $Dst -PathType Container
    $srcIsDir = Test-Path -LiteralPath $Src -PathType Container
    if ($dstIsDir -and $srcIsDir) {
        foreach ($child in Get-ChildItem -LiteralPath $Dst -Force) {
            $target = Join-Path $Src $child.Name
            if (-not (Test-Path -LiteralPath $target)) {
                if ($Check) { Write-Host "  +merge $Rel\$($child.Name) (only on this machine)" -ForegroundColor Cyan }
                else { Move-Item -LiteralPath $child.FullName -Destination $target; Write-Host "merged   $Rel\$($child.Name) (only on this machine, commit it)" -ForegroundColor Cyan }
            } elseif ((Get-TreeHash $child.FullName) -ne (Get-TreeHash $target)) {
                Write-Host "  !diff  $Rel\$($child.Name) (differs from repo; repo version wins, this copy is backed up)" -ForegroundColor Yellow
                $r.Conflicts += $child.Name
            }
        }
    } elseif (-not $dstIsDir -and -not $srcIsDir) {
        if ((Get-FileHash -LiteralPath $Dst).Hash -eq (Get-FileHash -LiteralPath $Src).Hash) { $r.Same = $true }
        else {
            if ((Split-Path $Src -Leaf) -eq 'skill-lock.json') { Merge-SkillLock $Dst $Src $Rel }
            Write-Host "  !diff  $Rel (differs from repo; repo version wins, this copy is backed up)" -ForegroundColor Yellow
        }
    }
    return $r
}

# The skills lock file records where each skill came from. Entries only this machine has are added
# to the repo's copy; for skills both have, the repo's entry wins.
function Merge-SkillLock($Dst, $Src, $Rel) {
    $mine = Get-Content -LiteralPath $Dst -Raw | ConvertFrom-Json
    $repo = Get-Content -LiteralPath $Src -Raw | ConvertFrom-Json
    if (-not $mine.skills) { return }
    if (-not $repo.skills) { $repo | Add-Member -NotePropertyName skills -NotePropertyValue ([pscustomobject]@{}) }
    $missing = @($mine.skills.PSObject.Properties.Name | Where-Object { -not $repo.skills.PSObject.Properties[$_] })
    if (-not $missing.Count) { return }
    if ($Check) { Write-Host "  +merge $Rel entries: $($missing -join ' ')" -ForegroundColor Cyan; return }
    foreach ($name in $missing) { $repo.skills | Add-Member -NotePropertyName $name -NotePropertyValue $mine.skills.$name }
    # UTF-8 without BOM and LF endings: Node's JSON.parse (the skills CLI) rejects a BOM.
    $json = ($repo | ConvertTo-Json -Depth 20) -replace "`r`n", "`n"
    [IO.File]::WriteAllText($Src, $json + "`n", (New-Object Text.UTF8Encoding $false))
    Write-Host "merged   $Rel entries: $($missing -join ' ') (commit it)" -ForegroundColor Cyan
}

$problems = 0
foreach ($rel in $Links.Keys) {
    $src = Join-Path $Repo $rel
    $dst = $Links[$rel]

    if ((Get-LinkTarget $dst) -eq $src) {
        if (Test-Path -LiteralPath $src) { Write-Host "ok       $dst" }
        else { Write-Host "BROKEN   $dst (repo file missing)" -ForegroundColor Yellow; $problems++ }
        continue
    }

    # Test-Path follows links, so a dangling link would look absent; Get-Item -Force sees the link itself.
    $exists = [bool](Get-Item -LiteralPath $dst -Force -ErrorAction SilentlyContinue)

    # First install of a per-OS file: adopt this machine's real file into the repo.
    if (-not (Test-Path -LiteralPath $src)) {
        if ($exists -and -not (Get-LinkTarget $dst)) {
            if ($Check) { Write-Host "ADOPT    $dst -> $rel" -ForegroundColor Yellow; $problems++; continue }
            Move-Item -LiteralPath $dst -Destination $src
            Write-Host "adopted  $dst -> $rel (commit it)" -ForegroundColor Cyan
            $exists = $false
        } else {
            Write-Host "SKIP     $dst (no $rel in repo and nothing to adopt)" -ForegroundColor Yellow
            continue
        }
    }
    $isDir = Test-Path -LiteralPath $src -PathType Container

    if ($Check) {
        $state = if (-not $exists) { 'MISSING ' } elseif (Get-LinkTarget $dst) { 'WRONGLNK' } else { 'NOTLINK ' }
        Write-Host "$state $dst" -ForegroundColor Yellow
        if ($state -eq 'NOTLINK ') { Resolve-Existing $dst $src $rel | Out-Null }
        $problems++
        continue
    }

    if ($exists) {
        $old = Get-Item -LiteralPath $dst -Force
        if ($old.LinkType) {
            # an old link pointing elsewhere: just remove the link, never its target
            cmd /c $(if ($old.PSIsContainer) { "rmdir `"$dst`"" } else { "del `"$dst`"" }) | Out-Null
        } else {
            $r = Resolve-Existing $dst $src $rel
            if ($r.Same) {
                Remove-Item -LiteralPath $dst -Force
                Write-Host "same     $dst (identical to repo, no backup needed)"
            } else {
                $bak = Join-Path $Backup ($dst.Substring($H.Length).TrimStart('\'))
                New-Item -ItemType Directory -Force (Split-Path $bak) | Out-Null
                Move-Item -LiteralPath $dst -Destination $bak
                Write-Host "backup   $dst -> $bak"
                if (-not $isDir) { Write-Host "compare  git diff --no-index `"$bak`" `"$src`"" }
                foreach ($name in $r.Conflicts) { Write-Host "compare  git diff --no-index `"$bak\$name`" `"$src\$name`"" }
            }
        }
    }
    New-Item -ItemType Directory -Force (Split-Path $dst) | Out-Null
    $out = if ($isDir) { cmd /c mklink /D "$dst" "$src" 2>&1 } else { cmd /c mklink "$dst" "$src" 2>&1 }
    if ($LASTEXITCODE -ne 0) { throw "mklink failed for ${dst}: $out (is Developer Mode on?)" }
    Write-Host "linked   $dst" -ForegroundColor Green
}

# Claude Code reads skills from ~/.claude/skills, so expose each shared skill there too
# (same junction layout the `skills` CLI creates).
foreach ($skill in Get-ChildItem (Join-Path $Repo 'shared\skills') -Directory) {
    $dst = "$H\.claude\skills\$($skill.Name)"
    if (Test-Path -LiteralPath $dst) { continue }
    if ($Check) { Write-Host "MISSING  $dst" -ForegroundColor Yellow; $problems++; continue }
    New-Item -ItemType Directory -Force (Split-Path $dst) | Out-Null
    cmd /c mklink /J "$dst" "$H\.agents\skills\$($skill.Name)" | Out-Null
    Write-Host "linked   $dst" -ForegroundColor Green
}

if ($Check) {
    if ($problems) { Write-Host "`n$problems problem(s). Run .\install.ps1 to fix (real files get backed up first)." -ForegroundColor Yellow; exit 1 }
    Write-Host "`nAll links OK." -ForegroundColor Green
}
