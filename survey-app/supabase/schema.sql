-- Run this in your Supabase project: Dashboard → SQL Editor → New query → paste → Run.
-- It creates the responses table and locks it down so the public (anon) key can
-- INSERT a response but can NOT read anyone's answers. You view results in the
-- Supabase Table editor / SQL editor (which use your privileged service role).

create table if not exists public.survey_responses (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  answers     jsonb not null,
  meta        jsonb
);

alter table public.survey_responses enable row level security;

-- Allow anonymous (public anon key) to insert a response, nothing else.
drop policy if exists "anon can insert responses" on public.survey_responses;
create policy "anon can insert responses"
  on public.survey_responses
  for insert
  to anon
  with check (true);

-- NOTE: we intentionally create NO select/update/delete policy for anon,
-- so responses are write-only from the browser and private by default.
