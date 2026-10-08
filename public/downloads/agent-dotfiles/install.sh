#!/usr/bin/env bash
# Links config files in this repo into the places Claude Code, Codex and OpenCode read them from.
# macOS and Linux counterpart of install.ps1. Safe to re-run: correct links are skipped,
# real files are moved to ~/.dotfiles-backup/<timestamp> first.
#
#   ./install.sh          create/repair links
#   ./install.sh --check  only report status
#
# Written for the Bash 3.2 that ships with macOS: no associative arrays, no readlink -f.

set -euo pipefail

REPO="$(cd "$(dirname "$0")" && pwd)"
BACKUP="$HOME/.dotfiles-backup/$(date +%Y%m%d-%H%M%S)"
CHECK=0
[ "${1:-}" = "--check" ] && CHECK=1

case "$(uname -s)" in
  Darwin) OS=macos ;;
  Linux)  OS=linux ;;
  *) echo "Unsupported OS: $(uname -s). Use install.ps1 on Windows." >&2; exit 2 ;;
esac

# repo path (relative) | live path  -- edit this list to match the files you track
LINKS="
shared/skills|$HOME/.agents/skills
shared/skill-lock.json|$HOME/.agents/.skill-lock.json
claude/settings.json|$HOME/.claude/settings.json
codex/config.$OS.toml|$HOME/.codex/config.toml
codex/AGENTS.md|$HOME/.codex/AGENTS.md
opencode/opencode.jsonc|$HOME/.config/opencode/opencode.jsonc
opencode/AGENTS.md|$HOME/.config/opencode/AGENTS.md
opencode/package.json|$HOME/.config/opencode/package.json
opencode/plugins|$HOME/.config/opencode/plugins
"

problems=0
say() { printf '%-8s %s\n' "$1" "$2"; }

backup() {
  BAK="$BACKUP/${1#"$HOME"/}"
  mkdir -p "$(dirname "$BAK")"
  mv "$1" "$BAK"
  say backup "$1 -> $BAK"
}

# A machine that already has its own config: decide what to do with it before linking.
#   folder vs folder: entries only on this machine move into the repo (additive, nothing lost);
#                     same-named entries that differ are listed in CONFLICTS (repo version wins).
#   file vs file:     SAME=1 when identical, so no backup is needed.
# In --check mode it only reports what would happen.
reconcile() {
  local dst="$1" src="$2" rel="$3" child name
  SAME=0; CONFLICTS=""
  if [ -d "$dst" ] && [ -d "$src" ]; then
    for child in "$dst"/* "$dst"/.[!.]*; do
      [ -e "$child" ] || continue
      name="$(basename "$child")"
      if [ ! -e "$src/$name" ]; then
        if [ $CHECK -eq 1 ]; then say "  +merge" "$rel/$name (only on this machine)"
        else mv "$child" "$src/$name"; say merged "$rel/$name (only on this machine, commit it)"; fi
      elif ! diff -rq "$child" "$src/$name" >/dev/null 2>&1; then
        say "  !diff" "$rel/$name (differs from repo; repo version wins, this copy is backed up)"
        CONFLICTS="$CONFLICTS $name"
      fi
    done
  elif [ -f "$dst" ] && [ -f "$src" ]; then
    if cmp -s "$dst" "$src"; then SAME=1; return; fi
    [ "$(basename "$src")" = "skill-lock.json" ] && merge_lock "$dst" "$src" "$rel"
    say "  !diff" "$rel (differs from repo; repo version wins, this copy is backed up)"
  fi
}

# The skills lock file records where each skill came from. Entries only this machine has are added
# to the repo's copy; for skills both have, the repo's entry wins. Needs jq.
merge_lock() {
  local dst="$1" src="$2" rel="$3" missing tmp
  if ! command -v jq >/dev/null 2>&1; then
    say "  !jq" "$rel: install jq to merge lock entries automatically; this machine's copy is backed up"
    return
  fi
  missing="$(jq -r --slurpfile r "$src" '(.skills // {} | keys) - ($r[0].skills // {} | keys) | .[]' "$dst" | tr '\n' ' ')"
  [ -z "$missing" ] && return
  if [ $CHECK -eq 1 ]; then say "  +merge" "$rel entries: $missing"; return; fi
  tmp="$(mktemp)"
  jq -s '.[1] + {skills: ((.[0].skills // {}) + (.[1].skills // {}))}' "$dst" "$src" > "$tmp" && mv "$tmp" "$src"
  say merged "$rel entries: $missing(commit it)"
}

while IFS='|' read -r rel dst; do
  [ -z "$rel" ] && continue
  src="$REPO/$rel"

  # -ef compares the files themselves, so path spellings (/tmp vs /private/tmp) don't matter
  if [ -L "$dst" ] && [ "$dst" -ef "$src" ]; then
    say ok "$dst"
    continue
  fi

  # First install of a per-OS file: adopt this machine's real file into the repo.
  if [ ! -e "$src" ]; then
    if [ -e "$dst" ] && [ ! -L "$dst" ]; then
      if [ $CHECK -eq 1 ]; then say ADOPT "$dst -> $rel"; problems=$((problems + 1)); continue; fi
      mv "$dst" "$src"
      say adopted "$dst -> $rel (commit it)"
    else
      say SKIP "$dst (no $rel in repo and nothing to adopt)"
      continue
    fi
  fi

  if [ $CHECK -eq 1 ]; then
    if [ -L "$dst" ]; then say WRONGLNK "$dst"
    elif [ -e "$dst" ]; then say NOTLINK "$dst"; reconcile "$dst" "$src" "$rel"
    else say MISSING "$dst"; fi
    problems=$((problems + 1))
    continue
  fi

  if [ -L "$dst" ]; then
    rm "$dst"            # old link pointing elsewhere: remove the link, never its target
  elif [ -e "$dst" ]; then
    reconcile "$dst" "$src" "$rel"
    if [ $SAME -eq 1 ]; then
      rm "$dst"; say same "$dst (identical to repo, no backup needed)"
    else
      backup "$dst"
      if [ -f "$src" ]; then say compare "git diff --no-index \"$BAK\" \"$src\""; fi
      for name in $CONFLICTS; do say compare "git diff --no-index \"$BAK/$name\" \"$src/$name\""; done
    fi
  fi
  mkdir -p "$(dirname "$dst")"
  ln -s "$src" "$dst"
  say linked "$dst"
done <<EOF
$LINKS
EOF

# Claude Code reads skills from ~/.claude/skills, so expose each shared skill there too.
for skill in "$REPO"/shared/skills/*/; do
  [ -d "$skill" ] || continue   # unmatched glob when there are no skills
  name="$(basename "$skill")"
  dst="$HOME/.claude/skills/$name"
  { [ -e "$dst" ] || [ -L "$dst" ]; } && continue
  if [ $CHECK -eq 1 ]; then say MISSING "$dst"; problems=$((problems + 1)); continue; fi
  mkdir -p "$HOME/.claude/skills"
  ln -s "$HOME/.agents/skills/$name" "$dst"
  say linked "$dst"
done

if [ $CHECK -eq 1 ]; then
  if [ $problems -gt 0 ]; then echo; echo "$problems problem(s). Run ./install.sh to fix (real files get backed up first)."; exit 1; fi
  echo; echo "All links OK."
fi
