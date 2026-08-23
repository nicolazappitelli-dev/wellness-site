import { SITE_EMAIL } from './site'

/**
 * Sends waitlist and contact submissions to the studio inbox via FormSubmit.
 * First-time use sends a one-click confirmation to SITE_EMAIL; after that,
 * submissions arrive as regular email.
 */
export async function submitLead(fields) {
  const { website, ...payload } = fields
  if (website) {
    return { ok: true, skipped: true }
  }

  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(SITE_EMAIL)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      ...payload,
      _template: 'table',
      _captcha: 'false',
    }),
  })

  let data = {}
  try {
    data = await res.json()
  } catch {
    data = {}
  }

  const failed = !res.ok || data.success === false || data.success === 'false'
  if (failed) {
    const message = String(data.message || '')
    const error = new Error(message || 'Submit failed')
    if (/activat|confirm|verify/i.test(message)) {
      error.code = 'activation'
    }
    throw error
  }

  return data
}
