export const MODALITIES = [
  { id: 'cryo', name: 'Cryotherapy', icon: '❄', duration: 10, capacity: 1, interval: 15, color: '#54B8E0' },
  { id: 'redlight', name: 'Red Light', icon: '☀', duration: 20, capacity: 1, interval: 25, color: '#E84030' },
  { id: 'sauna', name: 'Infrared Sauna', icon: '♨', duration: 40, capacity: 1, interval: 45, color: '#E09050' },
  { id: 'compression', name: 'Compression', icon: '◎', duration: 30, capacity: 4, interval: 35, color: '#8090D8' },
]

export const STUDIO_HOURS = [
  { days: 'Mon–Fri', hours: '7:00 AM – 8:00 PM' },
  { days: 'Saturday', hours: '8:00 AM – 6:00 PM' },
  { days: 'Sunday', hours: '9:00 AM – 5:00 PM' },
]

export const PLANS = {
  essential: { id: 'essential', name: 'Essential', price: 99, label: '$99/mo' },
  unlimited: { id: 'unlimited', name: 'Unlimited', price: 129, label: '$129/mo' },
}

export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const BOOKING_WINDOW_DAYS = 4
export const CANCEL_HOURS = 4

export function getHours(date) {
  const d = date.getDay()
  if (d === 0) return { open: 9 * 60, close: 17 * 60 }
  if (d === 6) return { open: 8 * 60, close: 18 * 60 }
  return { open: 7 * 60, close: 20 * 60 }
}

export function generateSlots(date, mod) {
  const { open, close } = getHours(date)
  const out = []
  for (let t = open; t + mod.duration <= close; t += mod.interval) out.push(t)
  return out
}

export function formatTime(min) {
  const h = Math.floor(min / 60)
  const m = min % 60
  const ap = h >= 12 ? 'PM' : 'AM'
  const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h
  return `${h12}:${m.toString().padStart(2, '0')} ${ap}`
}

export function toISODate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function parseISODate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function slotStart(isoDate, startMin) {
  const dt = parseISODate(isoDate)
  dt.setMinutes(startMin)
  return dt
}

export function canCancelBooking(isoDate, startMin) {
  const start = slotStart(isoDate, startMin)
  return start.getTime() - Date.now() >= CANCEL_HOURS * 60 * 60 * 1000
}

export function bookingWindowDays(from = new Date()) {
  const start = new Date(from)
  start.setHours(0, 0, 0, 0)
  return Array.from({ length: BOOKING_WINDOW_DAYS }, (_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    return d
  })
}

export function occupancyKey(isoDate, modality, startMin) {
  return `${isoDate}|${modality}|${startMin}`
}
