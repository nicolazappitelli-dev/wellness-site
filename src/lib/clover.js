export const CLOVER_BOOKING_URL = import.meta.env.VITE_CLOVER_BOOKING_URL || ''
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

export function hasCloverPay() {
  return Boolean(CLOVER_PAY_ESSENTIAL || CLOVER_PAY_UNLIMITED)
}

export function startCloverCheckout(plan) {
  const url = cloverPayUrl(plan) || CLOVER_BOOKING_URL
  if (!url) {
    throw new Error('Add your Clover payment or booking link in Vercel env vars (VITE_CLOVER_PAY_ESSENTIAL / VITE_CLOVER_BOOKING_URL).')
  }
  window.location.href = url
}
