# Expense Tracker

Building an expense-tracker app **UX-first** — real user research before design and code. This repo holds the research and the tooling that supports it.

## Repository structure

```
.
├── ux-research/     UX research (Double Diamond · Discover phase)
├── survey-app/      React + Supabase survey for collecting spending-habit data
├── .mcp.json        Supabase MCP config for Claude Code (token via env var)
└── README.md
```

### `ux-research/`
The full Discover-phase research, each grounded in expert sources:
- `02a-competitive-scorecard.md` — competitive analysis (JTBD + core-task frame)
- `02b-heuristic-evaluation-template.md` — Nielsen heuristic-eval template + severity scale
- `02c-review-mining-findings.md` — thematic analysis of ~11 apps + Mint migration (incl. real Reddit data via PullPush)
- `03a-screener-and-recruiting-plan.md` — interview screener + recruiting plan
- `03b-generative-interview-guide.md` — Portigal-style generative interview guide
- `03c-jtbd-switch-interview-script.md` — Jobs-to-be-Done "switch" interview
- `04-field-observation-and-diary-study.md` — diary-study / field-observation protocol
- `05-survey-instrument.md` — the survey questionnaire (source of truth for the app)

### `survey-app/`
A calm, mobile-friendly React (Vite) survey that saves anonymous responses to Supabase.
See [`survey-app/README.md`](survey-app/README.md) for setup and deploy steps.

## Key research finding so far
The category's biggest, most consistent churn driver is **trust** — billing dark patterns, data loss, and sync unreliability — not logging friction. Manual entry, notably, *creates awareness* ("makes me think before I spend"), while automation numbs it. Design direction: manual-first, trust-first, calm and non-judgmental (the "ostrich effect" — anxiety makes people avoid looking).

## Status
Phase 1 (Discover) complete; primary-research toolkit ready to run. Next: run interviews + launch the survey, then Phase 2 (Define) — personas, journey map, JTBD statements.

## Supabase MCP (Claude Code)
[`.mcp.json`](.mcp.json) configures the official Supabase MCP server. It reads the token from the
`SUPABASE_ACCESS_TOKEN` environment variable (never committed) and runs **read-only** by default.

**Enable it:**
1. Create a token: Supabase Dashboard → **Account → Access Tokens → Generate new token**.
2. Put it in your environment (do **not** commit it):
   - Persistent (PowerShell): `setx SUPABASE_ACCESS_TOKEN "your-token"` then reopen the terminal.
   - This session only: `$env:SUPABASE_ACCESS_TOKEN = "your-token"`
3. Open this folder in Claude Code. Project-scoped MCP servers require approval — accept the `supabase`
   server when prompted, or run `/mcp` to check/enable it.
4. *(Optional)* Scope to one project: add `"--project-ref=YOUR_PROJECT_REF"` to the `args` in `.mcp.json`
   (the ref is the subdomain of your project URL).
5. *(Optional)* To let the assistant run migrations / create tables, remove `"--read-only"`. Do this
   deliberately — read-only is safer and reduces prompt-injection risk on a data-connected tool.

**Global alternative** (not committed to the repo):
```
claude mcp add supabase -e SUPABASE_ACCESS_TOKEN=your-token -- cmd /c npx -y @supabase/mcp-server-supabase@latest --read-only
```
