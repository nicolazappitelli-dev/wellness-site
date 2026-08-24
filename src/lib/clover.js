export const CLOVER_ORIGIN = 'https://elevatecryoconcord.cloveronline.com'

export const CLOVER_BOOKING_URL =
  import.meta.env.VITE_CLOVER_BOOKING_URL || `${CLOVER_ORIGIN}/services/all`

export const CLOVER_LOGIN_URL =
  import.meta.env.VITE_CLOVER_LOGIN_URL || `${CLOVER_ORIGIN}/services/login`

export const CLOVER_MEMBERSHIPS_URL =
  import.meta.env.VITE_CLOVER_MEMBERSHIPS_URL || `${CLOVER_ORIGIN}/services/memberships`

export const CLOVER_PAY_ESSENTIAL = import.meta.env.VITE_CLOVER_PAY_ESSENTIAL || ''
export const CLOVER_PAY_UNLIMITED = import.meta.env.VITE_CLOVER_PAY_UNLIMITED || ''

export function cloverPayUrl(plan) {
  if (plan === 'essential') return CLOVER_PAY_ESSENTIAL
  if (plan === 'unlimited') return CLOVER_PAY_UNLIMITED
  return ''
}

export function hasCloverBooking() {
  return Boolean(CLOVER_BOOKING_URL)
}

export function startCloverCheckout(plan) {
  const url = cloverPayUrl(plan)
  if (url) {
    window.location.href = url
    return
  }
  throw new Error('Memberships are activated at the studio. Contact us or book as a member in Clover.')
}
