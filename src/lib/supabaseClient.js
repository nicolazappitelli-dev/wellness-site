let client

/**
 * Lazily load Supabase only when the waitlist is submitted.
 * Keeps @supabase/supabase-js out of the initial JS bundle.
 */
export async function getSupabase() {
  if (client !== undefined) return client

  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!url || !key) {
    client = null
    return null
  }

  const { createClient } = await import('@supabase/supabase-js')
  client = createClient(url, key)
  return client
}
