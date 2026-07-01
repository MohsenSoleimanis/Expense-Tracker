import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Helpful, explicit failure if the .env file wasn't set up yet.
export const isConfigured = Boolean(url && anonKey)

export const supabase = isConfigured ? createClient(url, anonKey) : null

export async function submitResponse(answers, meta) {
  if (!supabase) {
    throw new Error(
      'Supabase is not configured. Copy .env.example to .env and add your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
    )
  }
  const { error } = await supabase
    .from('survey_responses')
    .insert({ answers, meta })
  if (error) throw error
}
