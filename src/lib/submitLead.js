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
 */
export async function submitLead(fields) {
  const { website, ...payload } = fields
  if (website) {
    return { ok: true, skipped: true }
  }

  if (ACCESS_KEY) {
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
        ccemail: SITE_EMAIL,
        ...payload,
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
  }

  return mailtoFallback(payload)
}
