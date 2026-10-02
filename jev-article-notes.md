# Editorial and verification notes

The project article is src/content/blog/jev-reasoning-effort.mdx. The root draft is synchronized with its prose. Exact historical prompts remain unchanged in jev-system-prompt.md and public/downloads/jev-system-prompt.md.

The October 2 revision adds a bounded effort policy, a downloadable PowerShell helper, validated response handling, and explicit commands for new Codex and Claude Code sessions. These are tutorial extensions; they are not attributed to the author's existing system-prompt-only integration. Codex CLI configuration overrides were checked against installed help and official documentation. Claude Code controls were checked against official documentation, not a local invocation.

The historical chats established successful Gateway connectivity after correcting the endpoint/schema and retrying outside the sandbox. A fresh October 2 request failed in the sandbox and returned HTTP 403 after the network-enabled retry. No successful fresh answer or benchmark is invented. The JSON answer in the walkthrough is clearly illustrative.

Helper behavior was verified locally with mocked responses: valid choice, unexpected/case-mismatched choices, missing key, and sanitized transport failure. These checks do not establish current live Gateway access or native client execution.

No measured personal savings were supplied. The hypothetical 70% saving was removed. Retained pricing arithmetic: 2,000 / 1,000,000 * $0.04 = $0.00008; 1,000 decisions = $0.08. The article gives a comparison method for cost and quality rather than a claimed outcome.

The exact free promotion end date remains unresolved. The author supplied September 25; a community report quoted a September 26 email and a conflicting website date. The article uses September without a day. Source: https://community.vercel.com/t/jev-promo-ended-yesterday-but-have-email-stating-it-ends-today/49742

Writing review follows the previously read avoid-ai-writing skill, with a technical personal-blog voice. No new personal experience is attributed beyond the setup evidence. Historical prompt quotations are preserved. Prose assessment is model-only; no AI-authorship claim is made.

Verification: production build (including TypeScript) and lint passed. The refreshed browser renders the revised title, effort table, client commands, and quiz. Both downloads return HTTP 200. The marks normalizer ran on a temporary prose-only extract; no changes were required.
