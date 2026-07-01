# Heuristic Evaluation — Template & Protocol
**Phase 1 (Discover) · Step 2 · Expense Tracker apps**
_Method: Jakob Nielsen's Heuristic Evaluation (NN/g). Nielsen co-founded NN/g and defined the field's usability standards — this is the canonical expert-audit method for judging an interface **without users**._

---

## 0. How to run this properly (don't skip)

- **Use multiple evaluators.** Nielsen's research: a *single* evaluator finds ~35% of usability problems; **3–5 evaluators find ~75%**. One person's pass is a draft, not a verdict. Aggregate independent passes.
- **Evaluate against ALL 10 heuristics, screen by screen.** Walk each core flow (onboarding → add expense → view budget → view report) and check every screen against every heuristic.
- **Rate every issue with the severity scale** (Section 2). No flat lists — severity forces prioritization.
- **Separately evaluate, then merge.** Each evaluator works alone first (avoids groupthink), then you combine findings and reconcile severity.
- **Supplement forms with Baymard.** For the *add-expense* screen specifically, also check it against Baymard Institute's form-usability findings (numeric keypad, label placement, inline validation timing, autofill). Baymard = Holst/Appleseed, 130k+ documented testing hours — the evidence base for form UX.

---

## 1. Nielsen's 10 Heuristics — with expense-tracker evaluation prompts

| # | Heuristic | What to check *in an expense tracker* |
|---|---|---|
| **1** | **Visibility of system status** | After I log an expense, do I get immediate confirmation? Is a sync in progress shown? Do I always know my current balance/remaining budget? |
| **2** | **Match between system & the real world** | Are categories/labels in the user's language ("Groceries") not accounting jargon ("Debit/Credit")? Does the mental model match how people bucket money (Thaler)? |
| **3** | **User control & freedom** | Can I undo a mis-logged expense? Edit amount/category after saving? Exit the add-flow without losing data? |
| **4** | **Consistency & standards** | Same gestures/icons across screens? Does "+" always mean add? Platform conventions (iOS/Android) respected? |
| **5** | **Error prevention** | Numeric keypad for amounts? Prevents duplicate/impossible entries? Confirms destructive actions (delete account, wipe data)? |
| **6** | **Recognition rather than recall** | Recent/most-used categories surfaced so I don't recall them? Merchant autofill? No memorizing where features live? |
| **7** | **Flexibility & efficiency** | Fast path for power users (quick-add, widgets, shortcuts) AND easy path for novices? Can frequent expenses be repeated in 1 tap? |
| **8** | **Aesthetic & minimalist design** | Is the add-expense screen free of clutter? Is the dashboard calm (ostrich effect — anxiety drives avoidance) or overwhelming? |
| **9** | **Help users recognize, diagnose & recover from errors** | If sync fails, is the message plain-language + actionable (not "Error 402")? Recovery path clear? |
| **10** | **Help & documentation** | Is contextual help available where needed (esp. budgeting concepts)? Onboarding that teaches without a manual? |

---

## 2. Nielsen's Severity Scale (rate every issue)

| Rating | Meaning | Action |
|---|---|---|
| **0** | Not a usability problem | Ignore |
| **1** | Cosmetic — fix if time allows | Backlog |
| **2** | Minor — low priority | Fix later |
| **3** | Major — important to fix, high priority | Fix soon |
| **4** | Usability catastrophe — imperative to fix before release | Fix now |

Severity = combination of **frequency** (how often it happens) × **impact** (how hard to overcome) × **persistence** (one-time vs. repeated).

---

## 3. Findings table (one per app — copy this block per evaluator)

**App:** `__________`  · **Evaluator:** `__________` · **Date:** `__________` · **Flow(s) evaluated:** `__________`

| # | Screen / step | Heuristic(s) violated | Issue description | Severity (0–4) | Suggested fix |
|---|---|---|---|---|---|
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |
| 5 | | | | | |

---

## 4. Worked example (so the format is unambiguous)

**App:** _[example]_ · **Flow:** Add expense

| # | Screen / step | Heuristic(s) violated | Issue description | Severity | Suggested fix |
|---|---|---|---|---|---|
| 1 | Add-expense amount field | #5 Error prevention | Opens full alphanumeric keyboard for a money amount → slow + typo-prone | **3** | Default to numeric/decimal keypad |
| 2 | After saving expense | #1 Visibility of status | No confirmation; unclear if it saved → user re-taps, creates duplicate | **3** | Toast confirmation + brief balance update animation |
| 3 | Category picker | #6 Recognition vs recall | 30+ categories alphabetical; no recents → user hunts every time | **2** | Surface last-used + most-used categories on top |
| 4 | Dashboard | #8 Minimalist / ostrich effect | 6 charts + red overspend banners on open → anxiety, user avoids app | **3** | Calm default view; one primary number; details on demand |

---

## 5. Aggregation sheet (after all evaluators finish)

For each unique issue, record how many evaluators caught it and the **max** severity assigned:

| Issue (merged) | Caught by (n evaluators) | Max severity | Consensus priority |
|---|---|---|---|
| | | | |

> Issues caught by multiple evaluators AND rated 3–4 = your top fixes. These, cross-referenced with the review-mining themes (Step 2.4) and the behavioral-econ lens (Step 2.1), become the design principles you carry into Phase 3.
