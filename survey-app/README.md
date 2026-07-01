# Spending Habits Survey — React + Supabase

A small, calm, mobile-friendly survey app for the expense-tracker UX study. Questions live in
[`src/data/survey.js`](src/data/survey.js) and mirror
[`../ux-research/05-survey-instrument.md`](../ux-research/05-survey-instrument.md). Responses are
saved anonymously to a Supabase table.

## What it does
- Multi-step form (one section per step) with a progress bar — sections/questions branch based on answers.
- Writes each submission to a `survey_responses` table as JSON.
- Row-Level Security: the public key can **insert** a response but **cannot read** anyone's answers. You view results in the Supabase dashboard.

---

## 1. Create the Supabase backend (free)
1. Go to **supabase.com** → create a project (free tier). Pick a strong DB password; you don't need it for the app.
2. In the project, open **SQL Editor → New query**, paste the contents of
   [`supabase/schema.sql`](supabase/schema.sql), and click **Run**. This creates the table + security policy.
3. Open **Project Settings → API** and copy two values:
   - **Project URL**
   - **anon public** key (the publishable one — safe to ship in a browser)

## 2. Configure the app
```bash
cd survey-app
cp .env.example .env      # on Windows PowerShell: Copy-Item .env.example .env
```
Edit `.env` and paste your two values:
```
VITE_SUPABASE_URL=https://YOUR-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

## 3. Run it locally
```bash
npm install
npm run dev
```
Open the printed `http://localhost:5173`. Fill it in and submit — then check **Table editor →
survey_responses** in Supabase to see the row.

## 4. Deploy (free) — pick one
- **Vercel / Netlify / Cloudflare Pages:** import the repo, set the build command to `npm run build`,
  output dir `dist`, and add the two `VITE_...` env vars in the dashboard. Deploy → share the URL.
- Or `npm run build` and upload the `dist/` folder to any static host.

---

## Viewing & exporting results
- **Table editor → survey_responses** shows every submission (`answers` is JSON).
- To export: **Table editor → … → Export to CSV**, or run SQL, e.g.:
  ```sql
  -- churn reasons (Q D2)
  select answers->>'D2' as reason, count(*)
  from survey_responses
  where answers ? 'D2'
  group by 1 order by 2 desc;

  -- average "manual makes me more aware" (Q C1, 1–5)
  select round(avg((answers->>'C1')::numeric), 2) as c1_avg
  from survey_responses where answers ? 'C1';
  ```

## Editing the survey
Everything is data — edit [`src/data/survey.js`](src/data/survey.js). Question types: `single`,
`multi` (both support `allowOther`), `likert5`, `number` (with `prefix`/`suffix`), `text`
(`single: true` for one-liners). Use `showIf: (responses) => boolean` on a section or question to
branch. No other code changes needed.

## Notes
- The `anon` key is meant to be public; security comes from the RLS policy in `schema.sql`, not from hiding the key.
- Consider enabling **Cloudflare Turnstile** or Supabase's built-in rate limits if you post the link publicly, to reduce spam.
- Keep it anonymous: the form asks people not to enter account/card numbers, and we store no login/PII.
