import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import './SimplePages.css'
import './Booking.css'

// ─── Mock config ────────────────────────────────────────
const MOCK_MODES = [
  { id: 'guest',     label: 'Guest (not logged in)', plan: null,        loggedIn: false },
  { id: 'essential', label: 'Essential ($99/mo)',     plan: 'essential', loggedIn: true  },
  { id: 'unlimited', label: 'Unlimited ($129/mo)',    plan: 'unlimited', loggedIn: true  },
]

const MODALITIES = [
  { id: 'cryo',        name: 'Cryotherapy',    icon: '❄', duration: 10, capacity: 1, interval: 15, color: '#54B8E0' },
  { id: 'redlight',    name: 'Red Light',       icon: '☀', duration: 20, capacity: 1, interval: 25, color: '#E84030' },
  { id: 'sauna',       name: 'Infrared Sauna',  icon: '♨', duration: 40, capacity: 1, interval: 45, color: '#E09050' },
  { id: 'compression', name: 'Compression',     icon: '◎', duration: 30, capacity: 4, interval: 35, color: '#8090D8' },
]

const DAY_NAMES   = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// ─── Helpers ────────────────────────────────────────────
function getHours(date) {
  const d = date.getDay()
  if (d === 0) return { open: 9 * 60, close: 17 * 60 }  // Sun 9–5
  if (d === 6) return { open: 8 * 60, close: 18 * 60 }  // Sat 8–6
  return           { open: 7 * 60, close: 20 * 60 }     // Weekday 7–8
}

function generateSlots(date, mod) {
  const { open, close } = getHours(date)
  const out = []
  for (let t = open; t + mod.duration <= close; t += mod.interval) out.push(t)
  return out
}

function formatTime(min) {
  const h = Math.floor(min / 60)
  const m = min % 60
  const ap = h >= 12 ? 'PM' : 'AM'
  const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h
  return `${h12}:${m.toString().padStart(2, '0')} ${ap}`
}

// Deterministic mock occupancy — feels real, reproducible across renders
function mockOccupancy(dayIdx, modalityId, slotIdx, capacity) {
  const s = (dayIdx * 31 + slotIdx * 17 + modalityId.charCodeAt(0) * 7) % 100
  if (capacity === 1) return s < 38 ? 1 : 0
  // Compression (cap 4): show spread of 0–4
  if (s < 8)  return 4
  if (s < 22) return 3
  if (s < 42) return 2
  if (s < 62) return 1
  return 0
}

// ─── Component ──────────────────────────────────────────
export default function Booking() {
  const today = useMemo(() => new Date(), [])

  const days = useMemo(() =>
    Array.from({ length: 4 }, (_, i) => {
      const d = new Date(today)
      d.setDate(d.getDate() + i)
      return d
    }), [today])

  const [mockMode,    setMockMode]    = useState(0)
  const [selDay,      setSelDay]      = useState(0)
  const [selMod,      setSelMod]      = useState('cryo')
  const [selSlot,     setSelSlot]     = useState(null)
  const [confirmed,   setConfirmed]   = useState({}) // { dayIdx: [{modalityId, slotTime}] }
  const [showSuccess, setShowSuccess] = useState(false)

  const auth     = MOCK_MODES[mockMode]
  const modality = MODALITIES.find(m => m.id === selMod)
  const day      = days[selDay]

  const slots = useMemo(() => generateSlots(day, modality), [day, modality])

  const occupancies = useMemo(() =>
    slots.map((_, i) => mockOccupancy(selDay, selMod, i, modality.capacity)),
    [slots, selDay, selMod, modality.capacity])

  const dayBookings    = confirmed[selDay] || []
  const bookedToday    = dayBookings.length
  const bookedThisMod  = dayBookings.find(b => b.modalityId === selMod)

  // Does a potential slot overlap with user's existing confirmed bookings?
  function overlapsUser(slotTime) {
    const end = slotTime + modality.duration
    for (const b of dayBookings) {
      if (b.modalityId === selMod) continue
      const bMod = MODALITIES.find(m => m.id === b.modalityId)
      if (slotTime < b.slotTime + bMod.duration && end > b.slotTime) return true
    }
    return false
  }

  function slotState(slotTime, idx) {
    if (bookedThisMod?.slotTime === slotTime) return 'booked'
    if (overlapsUser(slotTime))               return 'conflict'
    const occ = occupancies[idx]
    if (occ >= modality.capacity)             return 'full'
    if (selSlot === slotTime)                 return 'selected'
    if (modality.capacity > 1 && occ > 0)    return 'partial'
    return 'available'
  }

  function handleSlot(slotTime, idx) {
    const st = slotState(slotTime, idx)
    if (['full', 'booked', 'conflict'].includes(st)) return
    if (auth.plan === 'essential' && bookedToday >= 1) return
    setSelSlot(slotTime === selSlot ? null : slotTime)
    setShowSuccess(false)
  }

  function handleConfirm() {
    if (selSlot === null) return
    setConfirmed(p => ({ ...p, [selDay]: [...(p[selDay] || []), { modalityId: selMod, slotTime: selSlot }] }))
    setSelSlot(null)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 4000)
  }

  const essentialCapped = auth.plan === 'essential' && bookedToday >= 1

  return (
    <main className="booking-page">

      {/* ── Preview switcher ── */}
      <div className="bk-demo">
        <span className="bk-demo__label">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
          Preview mode
        </span>
        <div className="bk-demo__tabs">
          {MOCK_MODES.map((m, i) => (
            <button
              key={m.id}
              className={`bk-demo__tab${mockMode === i ? ' bk-demo__tab--on' : ''}`}
              onClick={() => { setMockMode(i); setSelSlot(null); setShowSuccess(false) }}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Page hero ── */}
      <div className="simple-page__hero">
        <div className="container">
          <span className="section-label fade-up">Book a Session</span>
          <h1 className="simple-page__title fade-up-1">Reserve your session.</h1>
          <p className="simple-page__sub fade-up-2">
            Members book online up to 4 days ahead. Walk-ins always welcome — just show up.
          </p>
        </div>
      </div>

      <div className="container">

        {/* ═══════════════════════════════════════════
            A) LOCKED STATE — not logged in
            ═══════════════════════════════════════════ */}
        {!auth.loggedIn ? (
          <div className="bk-locked">
            {/* Blurred fake calendar behind the gate */}
            <div className="bk-locked__bg" aria-hidden="true">
              <div className="bk-locked__fake-days">
                {['Tue 25', 'Wed 26', 'Thu 27', 'Fri 28'].map(d => (
                  <div key={d} className="bk-locked__fake-day">{d}</div>
                ))}
              </div>
              <div className="bk-locked__fake-grid">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className={`bk-locked__fake-slot${
                      [1,5,8,12,16].includes(i) ? ' --full' :
                      [3,10,17].includes(i)     ? ' --partial' : ''
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Gate card */}
            <div className="bk-locked__gate">
              <div className="bk-locked__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <h2 className="bk-locked__title">Online booking is members-only.</h2>
              <p className="bk-locked__sub">
                Join to reserve sessions up to 4 days ahead — guaranteed time, guaranteed modality.
              </p>
              <div className="bk-locked__ctas">
                <Link to="/#waitlist" className="btn-primary">Join the Waitlist</Link>
                <Link to="/account"   className="btn-secondary">Log In</Link>
              </div>
              <p className="bk-locked__walkin">
                Walk-ins welcome — <strong>$25 + tax per modality.</strong>
              </p>
            </div>
          </div>

        ) : (

          /* ═══════════════════════════════════════════
             B) MEMBER BOOKING UI
             ═══════════════════════════════════════════ */
          <div className="bk-ui">

            {/* Plan status bar */}
            <div className="bk-plan-bar">
              <span className="bk-plan-bar__pill">
                <span className="bk-plan-bar__dot" />
                {auth.plan === 'essential' ? 'Essential Plan' : 'Unlimited Plan'}
              </span>
              <span className="bk-plan-bar__rule">
                {auth.plan === 'essential'
                  ? '1 session per day · 4-day advance booking'
                  : 'Unlimited sessions per day · 4-day advance booking'}
              </span>
            </div>

            {/* 4-day selector */}
            <div className="bk-days">
              {days.map((d, i) => {
                const hasBk = (confirmed[i] || []).length > 0
                return (
                  <button
                    key={i}
                    className={`bk-day${selDay === i ? ' bk-day--on' : ''}${hasBk ? ' bk-day--booked' : ''}`}
                    onClick={() => { setSelDay(i); setSelSlot(null) }}
                  >
                    <span className="bk-day__name">{i === 0 ? 'Today' : DAY_NAMES[d.getDay()]}</span>
                    <span className="bk-day__num">{d.getDate()}</span>
                    <span className="bk-day__mo">{MONTH_NAMES[d.getMonth()]}</span>
                    {hasBk && <span className="bk-day__dot" />}
                  </button>
                )
              })}
            </div>

            {/* Essential plan cap warning */}
            {essentialCapped && (
              <div className="bk-cap-banner">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                Daily session limit reached for this day.
                <Link to="/memberships" className="bk-cap-banner__link">Upgrade to Unlimited →</Link>
              </div>
            )}

            {/* Modality tabs */}
            <div className="bk-mods">
              {MODALITIES.map(m => (
                <button
                  key={m.id}
                  className={`bk-mod${selMod === m.id ? ' bk-mod--on' : ''}`}
                  style={{ '--mc': m.color }}
                  onClick={() => { setSelMod(m.id); setSelSlot(null) }}
                >
                  <span className="bk-mod__icon">{m.icon}</span>
                  <span className="bk-mod__name">{m.name}</span>
                  <span className="bk-mod__meta">
                    {m.duration} min{m.capacity > 1 ? ` · ${m.capacity} capacity` : ''}
                  </span>
                </button>
              ))}
            </div>

            {/* Already booked this modality today */}
            {bookedThisMod && (
              <div className="bk-booked-notice">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                <strong>{modality.name}</strong> confirmed at {formatTime(bookedThisMod.slotTime)} —{' '}
                {day.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </div>
            )}

            {/* Time slots */}
            <div className="bk-slots">
              <div className="bk-slots__hd">
                <h3 className="bk-slots__title">
                  {day.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </h3>
                <div className="bk-slots__legend">
                  <span className="bk-leg bk-leg--avail">Open</span>
                  {modality.capacity > 1 && <span className="bk-leg bk-leg--partial">Spots left</span>}
                  <span className="bk-leg bk-leg--full">Full</span>
                  <span className="bk-leg bk-leg--conflict">Conflict</span>
                </div>
              </div>

              <div className="bk-slots__grid">
                {slots.map((slotTime, idx) => {
                  const st       = slotState(slotTime, idx)
                  const occ      = occupancies[idx]
                  const capped   = essentialCapped && !['booked','full','conflict'].includes(st)
                  const disabled = ['full','conflict'].includes(st) || capped

                  return (
                    <button
                      key={slotTime}
                      className={`bk-slot bk-slot--${st}${capped ? ' bk-slot--capped' : ''}`}
                      onClick={() => !disabled && handleSlot(slotTime, idx)}
                      disabled={disabled}
                      title={
                        capped           ? 'Daily limit reached (Essential plan)' :
                        st === 'conflict' ? 'Overlaps with another of your bookings' :
                        st === 'full'     ? 'No availability' :
                        st === 'partial'  ? `${modality.capacity - occ} of ${modality.capacity} spots open` : ''
                      }
                    >
                      <span className="bk-slot__time">{formatTime(slotTime)}</span>
                      {st === 'booked' && <span className="bk-slot__badge">✓</span>}
                      {st === 'partial' && (
                        <span className="bk-slot__badge bk-slot__badge--partial">
                          {modality.capacity - occ}/{modality.capacity}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Confirm bar */}
            {selSlot !== null && (
              <div className="bk-confirm">
                <div className="bk-confirm__summary">
                  <span className="bk-confirm__mod">{modality.icon} {modality.name}</span>
                  <span className="bk-confirm__when">
                    {day.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    &nbsp;·&nbsp;{formatTime(selSlot)} – {formatTime(selSlot + modality.duration)}
                  </span>
                </div>
                <button className="btn-primary bk-confirm__btn" onClick={handleConfirm}>
                  Confirm Booking
                </button>
              </div>
            )}

            {/* Success toast */}
            {showSuccess && (
              <div className="bk-success">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                Booking confirmed. In production, a confirmation email would be sent.
              </div>
            )}

            {/* Walk-in note */}
            <div className="booking-walkin">
              <div className="booking-walkin__heading">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                Walk-ins also welcome
              </div>
              <p>No booking needed — just show up and pay <strong>$25 + tax per modality</strong> on the day.</p>
            </div>

          </div>
        )}
      </div>
    </main>
  )
}
