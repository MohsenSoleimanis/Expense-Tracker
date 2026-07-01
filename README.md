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

## Supabase MCP
`.mcp.json` configures the official Supabase MCP server for Claude Code. It reads the token from the
`SUPABASE_ACCESS_TOKEN` environment variable (never committed) and runs **read-only** by default.
See [`survey-app/README.md`](survey-app/README.md) and the setup notes for how to enable it.
