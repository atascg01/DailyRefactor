param([Parameter(Mandatory)][string]$Task)

if (-not $env:AI_GATEWAY_API_KEY) {
    throw 'AI_GATEWAY_API_KEY is not set.'
}

$body = @{
    model = 'typesafe-ai/jev'
    state = $Task
    questions = @{
        effort = @{
            type = 'choice'
            instructions = 'Choose the lowest sufficient reasoning effort.'
            criteria = @{
                low = 'A local mechanical edit with clear instructions and an obvious check.'
                medium = 'Several files, understood behavior, and a reproducible check.'
                high = 'Uncertain cause, concurrency risk, security-sensitive behavior, or architectural tradeoffs.'
            }
        }
    }
} | ConvertTo-Json -Depth 8

try {
    $result = Invoke-RestMethod -Method Post `
        -Uri 'https://ai-gateway.vercel.sh/v1/evaluate' `
        -Headers @{ Authorization = "Bearer $env:AI_GATEWAY_API_KEY" } `
        -ContentType 'application/json' -Body $body -TimeoutSec 30
} catch {
    throw 'Jev request failed. Check network access and Gateway authorization.'
}

$answer = $result.answers.effort
if ($answer.type -ne 'choice' -or
    $answer.choice -cnotin @('low', 'medium', 'high')) {
    throw 'Jev did not return a supported effort choice.'
}

$answer.choice
