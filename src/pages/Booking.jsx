import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth, isActiveMember } from '../lib/auth'
import { supabase } from '../lib/supabaseClient'
import {
  MODALITIES,
  DAY_NAMES,
  MONTH_NAMES,
  bookingWindowDays,
  canCancelBooking,
  formatTime,
  generateSlots,
  occupancyKey,
  toISODate,
} from '../lib/catalog'
import './SimplePages.css'
import './Booking.css'

function Locked({ title, body, primary, secondary }) {
  return (
    <div className="bk-locked">
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
                [1, 5, 8, 12, 16].includes(i) ? ' --full' :
                [3, 10, 17].includes(i) ? ' --partial' : ''
              }`}
            />
          ))}
        </div>
      </div>
      <div className="bk-locked__gate">
        <div className="bk-locked__icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
            <rect x="3" y="11" width="18" height="11" rx="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
        <h2 className="bk-locked__title">{title}</h2>
        <p className="bk-locked__sub">{body}</p>
        <div className="bk-locked__ctas">
          <Link to={primary.to} className="btn-primary">{primary.label}</Link>
          <Link to={secondary.to} className="btn-secondary">{secondary.label}</Link>
        </div>
        <p className="bk-locked__walkin">
          Walk-ins welcome — <strong>$25 + tax per modality</strong>, first-come, first-served.
        </p>
      </div>
    </div>
  )
}

export default function Booking() {
  const { ready, configured, user, profile } = useAuth()
  const days = useMemo(() => bookingWindowDays(), [])
  const [selDay, setSelDay] = useState(0)
  const [selMod, setSelMod] = useState('cryo')
  const [selSlot, setSelSlot] = useState(null)
  const [mine, setMine] = useState([])
  const [taken, setTaken] = useState({})
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')

  const modality = MODALITIES.find(m => m.id === selMod)
  const day = days[selDay]
  const dayIso = toISODate(day)
  const slots = useMemo(() => generateSlots(day, modality), [day, modality])
  const active = isActiveMember(profile)
  const plan = profile?.plan

  async function loadCalendar() {
    if (!supabase || !user || !active) return
    const start = toISODate(days[0])
    const end = toISODate(days[days.length - 1])
    const [{ data: occupancy }, { data: mineRows, error: mineError }] = await Promise.all([
      supabase.rpc('booking_occupancy_window', { start_date: start, end_date: end }),
      supabase.from('bookings').select('*').eq('user_id', user.id).eq('status', 'confirmed').gte('slot_date', start).lte('slot_date', end),
    ])
    if (mineError) setError(mineError.message)
    const next = {}
    for (const row of occupancy || []) {
      next[occupancyKey(row.slot_date, row.modality, row.start_min)] = row.taken
    }
    setTaken(next)
    setMine(mineRows || [])
  }

  useEffect(() => {
    loadCalendar()
  }, [user, active, configured])

  const dayBookings = mine.filter(b => b.slot_date === dayIso)
  const bookedThisMod = dayBookings.find(b => b.modality === selMod)
  const essentialCapped = plan === 'essential' && dayBookings.length >= 1

  function overlapsUser(slotTime) {
    const end = slotTime + modality.duration
    return dayBookings.some(b => {
      if (b.modality === selMod && b.start_min === slotTime) return false
      const other = MODALITIES.find(m => m.id === b.modality)
      return slotTime < b.start_min + other.duration && end > b.start_min
    })
  }

  function slotState(slotTime) {
    if (bookedThisMod?.start_min === slotTime) return 'booked'
    if (overlapsUser(slotTime)) return 'conflict'
    const occ = taken[occupancyKey(dayIso, selMod, slotTime)] || 0
    if (occ >= modality.capacity) return 'full'
    if (selSlot === slotTime) return 'selected'
    if (modality.capacity > 1 && occ > 0) return 'partial'
    return 'available'
  }

  async function handleConfirm() {
    if (selSlot == null || !supabase || !user) return
    setBusy(true)
    setError('')
    const { error: insertError } = await supabase.from('bookings').insert({
      user_id: user.id,
      modality: selMod,
      slot_date: dayIso,
      start_min: selSlot,
    })
    setBusy(false)
    if (insertError) {
      setError(insertError.message || 'Could not book that slot.')
      return
    }
    setSelSlot(null)
    setNotice('Booking confirmed. See you at the studio.')
    await loadCalendar()
    setTimeout(() => setNotice(''), 4000)
  }

  async function handleCancel(booking) {
    if (!canCancelBooking(booking.slot_date, booking.start_min)) {
      setError('Cancellations must be at least 4 hours before the session.')
      return
    }
    const { error: cancelError } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', booking.id)
    if (cancelError) {
      setError(cancelError.message)
      return
    }
    setNotice('Session cancelled.')
    await loadCalendar()
  }

  return (
    <main className="booking-page">
      <div className="simple-page__hero">
        <div className="container">
          <span className="section-label fade-up">Book a Session</span>
          <h1 className="simple-page__title fade-up-1">Reserve your session.</h1>
          <p className="simple-page__sub fade-up-2">
            Members book online up to 4 days ahead. Walk-ins welcome — just show up and pay $25 + tax.
          </p>
        </div>
      </div>

      <div className="container">
        {!ready ? (
          <p className="bk-loading">Loading your booking calendar…</p>
        ) : !configured ? (
          <Locked
            title="Connect Supabase to open booking."
            body="Unpause the project, add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then run supabase/schema.sql."
            primary={{ to: '/contact', label: 'Contact Us' }}
            secondary={{ to: '/memberships', label: 'View Plans' }}
          />
        ) : !user ? (
          <Locked
            title="Online booking is members-only."
            body="Create an account, activate Essential or Unlimited, then reserve sessions up to 4 days ahead."
            primary={{ to: '/account', label: 'Create Account' }}
            secondary={{ to: '/memberships', label: 'View Plans' }}
          />
        ) : !active ? (
          <Locked
            title="Activate a membership to book."
            body="Online scheduling is included with Essential ($99/mo) and Unlimited ($129/mo). Walk-ins stay $25 + tax."
            primary={{ to: '/memberships', label: 'Choose a Plan' }}
            secondary={{ to: '/account', label: 'Account' }}
          />
        ) : (
          <div className="bk-ui">
            <div className="bk-plan-bar">
              <span className="bk-plan-bar__pill">
                <span className="bk-plan-bar__dot" />
                {plan === 'essential' ? 'Essential Plan' : 'Unlimited Plan'}
              </span>
              <span className="bk-plan-bar__rule">
                {plan === 'essential'
                  ? '1 session per day · 4-day advance booking'
                  : 'Unlimited sessions per day · 4-day advance booking'}
              </span>
            </div>

            <div className="bk-days">
              {days.map((d, i) => {
                const iso = toISODate(d)
                const hasBk = mine.some(b => b.slot_date === iso)
                return (
                  <button
                    key={iso}
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

            {essentialCapped && (
              <div className="bk-cap-banner">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                Daily session limit reached for this day.
                <Link to="/memberships" className="bk-cap-banner__link">Upgrade to Unlimited →</Link>
              </div>
            )}

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

            {bookedThisMod && (
              <div className="bk-booked-notice">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                <strong>{modality.name}</strong> confirmed at {formatTime(bookedThisMod.start_min)} —{' '}
                {day.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                {canCancelBooking(bookedThisMod.slot_date, bookedThisMod.start_min) && (
                  <button className="bk-cancel" type="button" onClick={() => handleCancel(bookedThisMod)}>
                    Cancel
                  </button>
                )}
              </div>
            )}

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
                {slots.map(slotTime => {
                  const st = slotState(slotTime)
                  const occ = taken[occupancyKey(dayIso, selMod, slotTime)] || 0
                  const capped = essentialCapped && !['booked', 'full', 'conflict'].includes(st)
                  const disabled = ['full', 'conflict', 'booked'].includes(st) || capped
                  return (
                    <button
                      key={slotTime}
                      className={`bk-slot bk-slot--${st}${capped ? ' bk-slot--capped' : ''}`}
                      onClick={() => {
                        if (disabled) return
                        setSelSlot(slotTime === selSlot ? null : slotTime)
                      }}
                      disabled={disabled}
                      title={
                        capped ? 'Daily limit reached (Essential plan)' :
                        st === 'conflict' ? 'Overlaps with another of your bookings' :
                        st === 'full' ? 'No availability' :
                        st === 'partial' ? `${modality.capacity - occ} of ${modality.capacity} spots open` : ''
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

            {selSlot !== null && (
              <div className="bk-confirm">
                <div className="bk-confirm__summary">
                  <span className="bk-confirm__mod">{modality.icon} {modality.name}</span>
                  <span className="bk-confirm__when">
                    {day.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    &nbsp;·&nbsp;{formatTime(selSlot)} – {formatTime(selSlot + modality.duration)}
                  </span>
                </div>
                <button className="btn-primary bk-confirm__btn" onClick={handleConfirm} disabled={busy}>
                  {busy ? 'Booking…' : 'Confirm Booking'}
                </button>
              </div>
            )}

            {notice && (
              <div className="bk-success">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                {notice}
              </div>
            )}
            {error && <p className="bk-error">{error}</p>}

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
