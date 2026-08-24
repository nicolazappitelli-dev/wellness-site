import { SITE_EMAIL } from './site'

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

function mailtoFallback(fields) {
  const subject = encodeURIComponent(fields._subject || 'Website submission')
  const lines = Object.entries(fields)
    .filter(([key, value]) => value && !key.startsWith('_') && key !== 'website')
    .map(([key, value]) => `${key}: ${value}`)
  const body = encodeURIComponent(lines.join('\n'))
  window.location.href = `mailto:${SITE_EMAIL}?subject=${subject}&body=${body}`
  return { ok: true, fallback: 'mailto' }
}

/**
 * Prefer Web3Forms when VITE_WEB3FORMS_ACCESS_KEY is set.
 * Otherwise open a prefilled email to the studio inbox so the form still works.
 * Do not send Pro-only fields (to, ccemail) — they make the free API reject the post.
 */
export async function submitLead(fields) {
  const { website, ...payload } = fields
  if (website) {
    return { ok: true, skipped: true }
  }

  if (!ACCESS_KEY) {
    return mailtoFallback(payload)
  }

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: ACCESS_KEY,
      from_name: 'Elevate Cryo website',
      subject: payload._subject || 'Website submission',
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      message: payload.message,
      interest: payload.interest,
      form: payload.form,
      first_name: payload.first_name,
      last_name: payload.last_name,
      botcheck: false,
    }),
  })

  let data = {}
  try {
    data = await res.json()
  } catch {
    data = {}
  }

  if (res.ok && data.success) {
    return data
  }

  const detail = data.message || data.body?.message || `Web3Forms error ${res.status}`
  throw new Error(detail)
}
