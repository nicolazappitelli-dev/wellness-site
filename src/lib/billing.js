import { supabase } from './supabaseClient'

async function authHeader() {
  if (!supabase) throw new Error('Supabase is not configured')
  const { data, error } = await supabase.auth.getSession()
  if (error || !data.session) throw new Error('Please sign in first')
  return {
    Authorization: `Bearer ${data.session.access_token}`,
    'Content-Type': 'application/json',
  }
}

export async function startCheckout(plan) {
  const headers = await authHeader()
  const res = await fetch('/api/create-checkout', {
    method: 'POST',
    headers,
    body: JSON.stringify({ plan }),
  })
  const payload = await res.json().catch(() => ({}))
  if (!res.ok || !payload.url) {
    throw new Error(payload.error || 'Could not start checkout')
  }
  window.location.href = payload.url
}

export async function openBillingPortal() {
  const headers = await authHeader()
  const res = await fetch('/api/create-portal', {
    method: 'POST',
    headers,
  })
  const payload = await res.json().catch(() => ({}))
  if (!res.ok || !payload.url) {
    throw new Error(payload.error || 'Could not open billing portal')
  }
  window.location.href = payload.url
}
