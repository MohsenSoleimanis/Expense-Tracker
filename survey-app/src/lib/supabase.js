import { createClient } from '@supabase/supabase-js'

// Public Supabase config for the "Expense Tracker" project.
// The publishable (anon) key is SAFE to ship in the browser — security is enforced by
// Row-Level Security (see supabase/schema.sql: anon can INSERT only), NOT by hiding the key.
// Env vars (Cloudflare build vars or a local .env) override these defaults when present.
const url = import.meta.env.VITE_SUPABASE_URL || 'https://azrfsmrktcijcigqheyw.supabase.co'
const anonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_tOyyI5um-6Oo3UqImEt4ew_de_RpPdB'

export const isConfigured = Boolean(url && anonKey)
export const supabase = createClient(url, anonKey)

export async function submitResponse(answers, meta) {
  const { error } = await supabase.from('survey_responses').insert({ answers, meta })
  if (error) throw error
}
