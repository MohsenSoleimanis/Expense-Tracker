# Field Observation & Diary Study — Spending in the Wild
**Phase 1 (Discover) · Step 4 · Segment: Everyday individuals**
_Method grounding: Kim Flaherty / NN/g ("Diary Studies: Understanding Long-Term User Behavior"); Larson & Csikszentmihalyi (originators of the **Experience Sampling Method**); Beyer & Holtzblatt (*Contextual Design* — the master–apprentice field method); Jan Chipchase (*The Field Study Handbook*) and Sam Ladner (*Practical Ethnography*) on observation craft._

---

## 1. Why this step exists (and why it's non-optional for an expense tracker)

Interviews rely on **memory** — and spending is exactly the kind of behavior memory is worst at: frequent, mundane, repeated, and emotionally charged. People genuinely cannot recall "every coffee, every tap." A diary study captures behavior **in the moment, in context, over time**, which:
- **kills recall bias** — you see the real spend, not a sanitized reconstruction;
- **exposes the micro-moments of failure** — the exact instant someone *doesn't* log something (the churn we've been chasing since Step 2);
- **observes the awareness-vs-effort tension live** (the reframed thesis) — does logging in the moment actually change what they do next?
- **catches the ostrich moments** — when someone avoids checking, and why.

Critically: **a spending diary is essentially a manual prototype of your product.** Watching people live it for a week tells you more about your core loop than any mockup.

---

## 2. Method design

**Primary method: an event-contingent diary study** (Experience Sampling). "Event-contingent" = the participant makes an entry **every time the trigger event happens** — here, *every time they spend money*. This maps perfectly to your core task. Supplement with a **short daily reflection** (interval-contingent) to capture end-of-day feelings.

**Secondary method (optional, deeper): 2–3 contextual-inquiry sessions.** Sit with a participant (in person or screen-share) while they do a real "money moment" — pay a bill, reconcile, check their balance — using Holtzblatt's **master–apprentice** stance: *they* lead, *you* watch and ask "why did you just do that?" Governed by the four principles: **context** (real place, real task), **partnership** (they teach, you learn), **interpretation** (check your reading back with them), **focus** (money behavior).

| Design parameter | Choice | Rationale |
|---|---|---|
| **Duration** | 1 week minimum, **2 weeks ideal** | 2 weeks catches a full pay/bill cycle and routine, not just novelty (NN/g). |
| **Participants** | 5–8, ideally a **subset of your interviewees** | Cheaper, and you can compare what they *said* (interview) vs what they *did* (diary) — the say/do gap. |
| **Entry trigger** | Every spend + one daily reflection | Event-contingent for the core task; daily for emotion/awareness. |
| **Capture channel** | **Lowest-friction option the participant will actually use** | Diary studies live or die on compliance. Offer: a quick form, a WhatsApp/SMS number, a voice note, or a photo. Let them pick. |
| **Tooling** | Purpose-built: **Dscout, Indeemo, ExperienceFellow**; or lightweight: Google Form + SMS reminders + a shared album | Purpose-built tools timestamp, geotag, and nudge automatically; the lightweight stack works on a budget. |

---

## 3. The per-spend entry template (keep it under 30 seconds — or they'll quit)

Each time you spend money, capture:
1. **What did you buy?** (one line)
2. **Roughly how much?** (ranges are fine — never ask for account/card numbers)
3. **Where were you & on what?** (in a shop / online / app; phone / card / cash)
4. **Who were you with?** (alone / partner / friends / family)
5. **How did it feel?** — one tap: 😀 fine · 😐 neutral · 😣 regret/guilt · 😬 anxious
6. **Did you log this anywhere you normally would? ** (Yes / No / I don't normally log)
7. *(optional)* **A photo** — receipt, screen, or the moment.

> Field-note for you: entries that are **skipped** are as valuable as entries made. The daily reflection recovers them ("anything you spent today but didn't log in the moment?").

## 4. The daily reflection prompt (end of day, ~2 min)
- "Anything you spent today but **didn't** capture in the moment? What was it, and why did it slip?"
- "When did you think about money today — and did you *avoid* thinking about it at any point?" (ostrich probe)
- "One word for how you feel about your money right now."

## 5. The end-of-study debrief (a short interview, 20–30 min)
Run after the diary closes, while it's fresh:
- Walk back through **their own entries together** — "Tell me about this one. What was happening?" (the diary becomes the interview stimulus — powerful and specific.)
- "Which days felt easy to keep up with? Which felt like a chore? What made the difference?"
- "Did logging change anything about how you spent? Show me an entry where it did / didn't."
- "If this had been an app doing it automatically, what would you have gained — and lost?"

---

## 6. Compliance & incentives (diary studies drop out — plan for it)
- **Onboard live:** a 15-min kickoff call to install/practice the entry method and do one test entry together. Never onboard by email alone.
- **Nudge daily:** a friendly reminder each evening (automated in Dscout/Indeemo, or a scripted SMS). Compliance without reminders collapses.
- **Check in mid-study** (day 2–3): catch anyone who's gone quiet, troubleshoot friction.
- **Incentive structure that rewards completion:** e.g., ~US$100–150 for a 1-week study, **weighted to the end** (a base + a completion bonus) so people finish. Diary studies ask far more than a single interview — pay accordingly.
- **Over-recruit ~30%** — dropout is higher than interviews.

## 7. Ethics (heightened for financial + location data)
- Informed consent covering **daily data collection, photos, and any location/timestamp**.
- Explicit rule: **never capture full account or card numbers**; amounts can be approximate/ranged.
- Secure, anonymized storage; a clear data-retention/deletion promise; right to withdraw entries.

---

## 8. Analysis
1. Build a **per-participant timeline** of entries (tools do this automatically) — see the rhythm of their spending and logging.
2. **Tag every entry** (thematic analysis, Braun & Clarke — same method as the mining and interviews, so it all stacks): context, payment type, emotion, logged/skipped.
3. Hunt the patterns that only *in-situ* data reveals:
   - **When does logging fail?** (on the move? social settings? small amounts? card vs cash?) → your friction map.
   - **Where are the emotional peaks?** (regret, anxiety, avoidance) → where a calmer, non-judgmental design earns trust.
   - **Does capturing change behavior?** → direct test of the awareness thesis.
4. **Compare say vs do:** overlay each person's diary against their interview. Contradictions are findings ("said they track carefully; skipped 40% of spends on the move").
5. **Triangulate** across all three primary methods + review mining. Where diary + interview + mining agree → high-confidence input to Phase 2.

---

## 9. What this feeds into (→ Phase 2: Define)
The diary is the evidence that makes your **journey map real** (the actual moments, emotions, and drop-offs of a spending week) and grounds your **personas** in observed behavior, not stereotypes. Combined with the interviews and review mining, you'll enter Define with triangulated, defensible evidence — exactly what separates professional UX from guesswork.

> **Phase 1 (Discover) is complete after this step:** research plan (1) → secondary + competitive + heuristic + review mining (2) → interviews + JTBD (3) → field/diary (4). Next: **Phase 2 (Define)** — synthesize everything into affinity clusters, personas, an experience/journey map, JTBD statements, and the information architecture.
