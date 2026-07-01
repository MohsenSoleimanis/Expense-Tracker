# Competitive Scorecard — Expense Tracker Apps
**Phase 1 (Discover) · Step 2 · Segment: Everyday individuals**
_Method: Jobs-to-be-Done + core-task audit (per Kim Goodwin, *Designing for the Digital Age*; Christensen, *Competing Against Luck*). Apps are compared on the **core task and the job**, not a feature checklist._

> **How to read this doc**
> - Cells marked **⚠ verify** are best-estimate from public/documented behavior and MUST be confirmed by a hands-on test before you rely on them. (This is the honest professional standard — a scorecard is a hypothesis until you tap through the app yourself.)
> - Scores are **1–5** (5 = best-in-class for that dimension for *everyday individuals*).
> - The behavioral-economics columns tie back to the four forces from Step 2.1 (mental accounting, pain of paying, ostrich effect, present bias).

---

## 1. The competitor set

**Direct — current leaders (post-Mint market):**
| App | Model | Positioning |
|---|---|---|
| **Monarch Money** | Bank-sync (Plaid) + manual · paid | The main destination after Mint's 2024 shutdown; net-worth + budgeting; couple-friendly |
| **YNAB** (You Need A Budget) | Sync + manual · paid | Zero-based budgeting *method*; "give every dollar a job"; steep learning curve, devoted community |
| **Copilot Money** | Bank-sync + manual · paid | Premium, design-led, Apple-first; AI categorization |
| **Rocket Money** | Bank-sync · freemium | Subscription-cancellation & bill negotiation first, tracking second |
| **PocketGuard** | Bank-sync · freemium | "In My Pocket" — spendable-after-bills number |

**Simplicity / manual-first (closest to a v1):**
| App | Model | Positioning |
|---|---|---|
| **Monefy** | Manual · freemium | **Fastest logging on the market**; one-screen circular category pad |
| **Money Manager** (Realbyte) | Manual · ad-supported + paid | Double-entry feel, calendar view, budgets; huge in Asia |
| **Wallet by BudgetBakers** | Sync + manual · freemium | Balanced sync/manual, strong categorization |
| **Spendee** | Sync + manual · freemium | Visual, shared "wallets" |

**Indirect — your REAL competition for everyday individuals (never omit these):**
Spreadsheet / Excel · the user's **own bank app** · **Notes app** · **doing nothing / mental tracking**.
> For this segment, the honest baseline competitor is usually *a spreadsheet or nothing* — not YNAB. Your app must beat "nothing," which is a UX/motivation problem, not a feature problem.

---

## 2. Master comparison matrix

| Dimension | Monarch | YNAB | Copilot | Rocket Money | PocketGuard | Monefy | Money Manager | Spreadsheet |
|---|---|---|---|---|---|---|---|---|
| **Primary data model** | Sync + manual | Sync + manual (budget-led) | Sync + manual | Sync | Sync | **Manual** | **Manual** | Manual |
| **Time-to-first-value** ⚠verify | Med (needs sync) | Slow (learn method) | Med | Med | Fast-ish | **Instant** | Fast | Slow (build it) |
| **Add-expense tap count** ⚠verify | Reviews synced; manual ~5+ | Manual ~5+ | Reviews synced; AI-cat | Auto | Auto | **~2–3** | ~4–6 | Many |
| **Categorization** | Rich, editable | Rich, budget-tied | AI auto + editable | Auto | Auto | Fixed icon grid | Rich, hierarchical | Whatever you build |
| **Insight/feedback loop** | Strong dashboards | Budget balances | Beautiful trends | Bills/subscriptions | "Spendable" number | Simple pie | Calendar + reports | DIY |
| **Trust ask (up front)** | Bank login required for value | Bank login | Bank login | Bank login | Bank login | **None** | **None** | None |
| **Best-served JTBD** | See whole financial picture | Actively budget every dollar | Enjoy reviewing finances | Cut recurring costs | Avoid overspending now | **Log fast, stay aware** | Keep a tidy ledger | Full control, no trust cost |
| **Everyday-individual fit** (1–5) | 4 | 3 | 4 | 3 | 4 | 4 | 4 | 2 |

---

## 3. Core-task deep dive: "Add an expense"
_This is the make-or-break loop. Everything else is secondary for daily retention._

Two philosophies split the market — this is the **central strategic tradeoff** for your product:

**A) Automated capture (Monarch, YNAB, Copilot, Rocket, PocketGuard)**
- Bank sync removes entry friction — transactions appear automatically.
- **Cost:** requires bank-login trust up front (directly triggers your Step-1 *trust* risk), and sync breakage is the #1 complaint in review mining. Also weakens the *pain-of-paying* correction — if you never touch the transaction, awareness stays numb.

**B) Fast manual capture (Monefy, Money Manager)**
- No trust cost; user stays *aware* of every expense (restores pain-of-paying — the real product thesis from Step 2.1).
- **Cost:** friction and forgetting → the ostrich/present-bias abandonment spiral. Monefy's whole design exists to crush this friction (~2–3 taps).

> **Opportunity thesis (to validate in interviews):** For everyday individuals distrustful of bank linking, the winning wedge may be **manual entry so fast it rivals sync's convenience** — Monefy-speed capture + a feedback loop that pays off instantly. This targets the exact gap where trust and friction collide.

---

## 4. Behavioral-economics lens (scores each app against the four forces)
_5 = actively helps the user; 1 = ignores or worsens it._

| App | Restores **pain of paying**? | Fights **ostrich effect** (safe to look)? | Supports **mental accounting** (real buckets)? | Rewards **present bias** (instant payoff)? |
|---|---|---|---|---|
| Monarch | 2 (passive) | 3 | 4 | 3 |
| YNAB | 4 (active reconciling) | 2 (guilt-heavy for some) | **5** (envelope buckets) | 3 |
| Copilot | 2 | **4** (calm, beautiful) | 4 | 4 |
| Monefy | **4** (you log each spend) | 3 | 3 (fixed cats) | **4** (instant pie update) |
| Money Manager | 4 | 3 | 4 | 3 |

**Reading:** No competitor scores high on *all four*. The ostrich effect (making it emotionally safe to look) is under-served by the budgeting-heavy apps — a genuine opening for a calmer, less judgmental tracker.

---

## 5. Preliminary opportunity spaces (hypotheses, not conclusions)
1. **Trust-free fast capture** — Monefy-speed manual entry for the large group who won't link a bank account.
2. **Calm, non-judgmental tone** — most budgeting apps induce guilt; the ostrich literature says that *drives avoidance*. A shame-free UX is a differentiator with evidence behind it.
3. **Instant payoff on every log** — beat present bias by making the reward immediate, not buried in a monthly report.
4. **Mental-accounting-native categories** — let users shape buckets to how *they* think (Thaler), instead of imposing a taxonomy.

> These feed Step 3: interviews will confirm/kill each, so we don't build on assumption.

---

## 6. To verify by hands-on test (integrity checklist)
- [ ] Exact add-expense tap counts for each app (install & time it)
- [ ] Onboarding time-to-first-value (stopwatch, fresh account)
- [ ] Current pricing (changes often — confirm before citing)
- [ ] Whether "manual-only" apps have added sync since last check
- [ ] Regional availability of bank sync (Plaid/Salt Edge coverage varies by country)
