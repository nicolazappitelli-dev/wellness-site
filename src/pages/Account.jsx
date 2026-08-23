import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useAuth, isActiveMember } from '../lib/auth'
import { startCheckout } from '../lib/billing'
import { CLOVER_BOOKING_URL, hasCloverBooking } from '../lib/clover'
import { MODALITIES, PLANS, canCancelBooking, formatTime, parseISODate } from '../lib/catalog'
import './SimplePages.css'
import './Account.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Account() {
  const { ready, configured, user, profile, refreshProfile, signOut } = useAuth()
  const [params] = useSearchParams()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({
    first: '', last: '', email: '', phone: '', password: '', confirm: '',
  })
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [upcoming, setUpcoming] = useState([])
  const [billingError, setBillingError] = useState('')

  function update(field) {
    return e => setForm(prev => ({ ...prev, [field]: e.target.value }))
  }

  useEffect(() => {
    if (params.get('checkout') === 'success' && user) {
      setMessage('Payment received. Your membership activates in a few seconds.')
      let tries = 0
      const timer = setInterval(async () => {
        tries += 1
        const next = await refreshProfile()
        if (next?.membership_status === 'active' || tries > 8) clearInterval(timer)
      }, 1500)
      return () => clearInterval(timer)
    }
    return undefined
  }, [params, user])

  useEffect(() => {
    if (!supabase || !user) {
      setUpcoming([])
      return
    }
    const today = new Date()
    const iso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    supabase
      .from('bookings')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'confirmed')
      .gte('slot_date', iso)
      .order('slot_date')
      .order('start_min')
      .then(({ data }) => setUpcoming(data || []))
  }, [user, profile])

  async function handleAuth(e) {
    e.preventDefault()
    if (!supabase) return
    setMessage('')
    const email = form.email.trim()
    if (!EMAIL_RE.test(email) || form.password.length < 6) {
      setMessage('Enter a valid email and a password of at least 6 characters.')
      return
    }
    setStatus('loading')
    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password: form.password })
        if (error) throw error
      } else {
        if (!form.first.trim() || !form.last.trim()) throw new Error('Please enter your name.')
        if (form.password !== form.confirm) throw new Error('Passwords do not match.')
        const { data, error } = await supabase.auth.signUp({
          email,
          password: form.password,
          options: {
            data: {
              first_name: form.first.trim(),
              last_name: form.last.trim(),
              phone: form.phone.trim(),
            },
          },
        })
        if (error) throw error
        if (!data.session) {
          setMessage('Check your email to confirm your account, then sign in.')
          setMode('login')
          setStatus('idle')
          return
        }
      }
    } catch (err) {
      setMessage(err.message || 'Could not complete that request.')
    } finally {
      setStatus('idle')
    }
  }

  async function handleForgot() {
    if (!supabase || !EMAIL_RE.test(form.email.trim())) {
      setMessage('Enter your email above, then click forgot password.')
      return
    }
    const { error } = await supabase.auth.resetPasswordForEmail(form.email.trim(), {
      redirectTo: `${window.location.origin}/account`,
    })
    setMessage(error ? error.message : 'Password reset email sent.')
  }

  function pay(plan) {
    setBillingError('')
    try {
      startCheckout(plan)
    } catch (err) {
      setBillingError(err.message)
    }
  }

  async function cancelBooking(booking) {
    if (!canCancelBooking(booking.slot_date, booking.start_min)) {
      setBillingError('Cancellations must be at least 4 hours before the session.')
      return
    }
    const { error } = await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', booking.id)
    if (error) {
      setBillingError(error.message)
      return
    }
    setUpcoming(prev => prev.filter(b => b.id !== booking.id))
  }

  if (!ready) {
    return (
      <main className="simple-page">
        <div className="simple-page__hero">
          <div className="container">
            <span className="section-label">Member Portal</span>
            <h1 className="simple-page__title">Loading…</h1>
          </div>
        </div>
      </main>
    )
  }

  if (!configured) {
    return (
      <main className="simple-page">
        <div className="simple-page__hero">
          <div className="container">
            <span className="section-label fade-up">Member Portal</span>
            <h1 className="simple-page__title fade-up-1">Book and pay in Clover.</h1>
            <p className="simple-page__sub fade-up-2">
              Scheduling and membership payments run through the studio&apos;s Clover account.
              Website logins are optional.
            </p>
            <div className="hero__ctas fade-up-3" style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/booking" className="btn-primary">Book a session</Link>
              <Link to="/memberships" className="btn-secondary">Memberships</Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (user) {
    const active = isActiveMember(profile)
    const plan = profile?.plan ? PLANS[profile.plan] : null
    return (
      <main className="simple-page">
        <div className="simple-page__hero">
          <div className="container">
            <span className="section-label fade-up">Member Portal</span>
            <h1 className="simple-page__title fade-up-1">
              {profile?.first_name ? `Welcome back, ${profile.first_name}.` : 'Your account.'}
            </h1>
            <p className="simple-page__sub fade-up-2">
              {active
                ? `${plan?.name} is on file. Book and pay through Clover.`
                : 'Use Clover to start Essential or Unlimited, then book sessions there.'}
            </p>
          </div>
        </div>

        <div className="container account-dash">
          {message && <p className="form-hint">{message}</p>}
          {billingError && <p className="form-hint form-hint--error">{billingError}</p>}

          <section className="account-card">
            <h2 className="account-card__title">Membership</h2>
            <p className="account-card__status">
              {active ? `${plan.name} · ${plan.label}` : 'No active membership'}
              {profile?.membership_status === 'past_due' && ' · payment past due'}
            </p>
            <div className="account-card__actions">
              {!active && (
                <>
                  <button type="button" className="btn-secondary" onClick={() => pay('essential')}>Start Essential · $99/mo</button>
                  <button type="button" className="btn-primary" onClick={() => pay('unlimited')}>Start Unlimited · $129/mo</button>
                </>
              )}
              {active && plan?.id === 'essential' && (
                <button type="button" className="btn-primary" onClick={() => pay('unlimited')}>Upgrade to Unlimited</button>
              )}
              {hasCloverBooking() && (
                <a className="btn-secondary" href={CLOVER_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  Manage in Clover
                </a>
              )}
              <Link to="/booking" className="btn-secondary">Book a session</Link>
            </div>
          </section>

          <section className="account-card">
            <h2 className="account-card__title">Upcoming sessions</h2>
            {upcoming.length === 0 ? (
              <p className="account-card__empty">No upcoming bookings yet.</p>
            ) : (
              <ul className="account-bookings">
                {upcoming.map(b => {
                  const mod = MODALITIES.find(m => m.id === b.modality)
                  const date = parseISODate(b.slot_date)
                  return (
                    <li key={b.id} className="account-bookings__row">
                      <div>
                        <strong>{mod?.name || b.modality}</strong>
                        <span>
                          {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                          {' · '}{formatTime(b.start_min)}
                        </span>
                      </div>
                      {canCancelBooking(b.slot_date, b.start_min) && (
                        <button type="button" className="account-bookings__cancel" onClick={() => cancelBooking(b)}>
                          Cancel
                        </button>
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </section>

          <div className="account-signout">
            <p>{user.email}</p>
            <button type="button" className="btn-ghost" onClick={signOut}>Sign out</button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="simple-page">
      <div className="simple-page__hero">
        <div className="container">
          <span className="section-label fade-up">Member Portal</span>
          <h1 className="simple-page__title fade-up-1">
            {mode === 'login' ? 'Welcome back.' : 'Join Elevate.'}
          </h1>
          <p className="simple-page__sub fade-up-2">
            {mode === 'login'
              ? 'Sign in to book sessions and manage your membership.'
              : 'Create your account, then activate Essential or Unlimited to start booking.'}
          </p>
        </div>
      </div>

      <div className="container">
        <div className="auth-card">
          <div className="auth-card__tabs">
            <button className={`auth-card__tab${mode === 'login' ? ' auth-card__tab--active' : ''}`} onClick={() => setMode('login')}>Log In</button>
            <button className={`auth-card__tab${mode === 'register' ? ' auth-card__tab--active' : ''}`} onClick={() => setMode('register')}>Create Account</button>
          </div>

          <form className="auth-form" onSubmit={handleAuth}>
            {mode === 'register' && (
              <>
                <div className="auth-form__row-2">
                  <div className="auth-form__field">
                    <label className="auth-form__label">First Name</label>
                    <input className="auth-form__input" value={form.first} onChange={update('first')} autoComplete="given-name" required />
                  </div>
                  <div className="auth-form__field">
                    <label className="auth-form__label">Last Name</label>
                    <input className="auth-form__input" value={form.last} onChange={update('last')} autoComplete="family-name" required />
                  </div>
                </div>
                <div className="auth-form__field">
                  <label className="auth-form__label">Phone Number</label>
                  <input className="auth-form__input" type="tel" value={form.phone} onChange={update('phone')} autoComplete="tel" placeholder="(440) 000-0000" />
                </div>
              </>
            )}
            <div className="auth-form__field">
              <label className="auth-form__label">Email Address</label>
              <input className="auth-form__input" type="email" value={form.email} onChange={update('email')} autoComplete="email" required />
            </div>
            <div className="auth-form__field">
              <label className="auth-form__label">Password</label>
              <input className="auth-form__input" type="password" value={form.password} onChange={update('password')} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} required />
            </div>
            {mode === 'register' && (
              <div className="auth-form__field">
                <label className="auth-form__label">Confirm Password</label>
                <input className="auth-form__input" type="password" value={form.confirm} onChange={update('confirm')} autoComplete="new-password" required />
              </div>
            )}
            {mode === 'login' && (
              <div className="auth-form__row">
                <span />
                <button type="button" className="auth-form__forgot" onClick={handleForgot}>Forgot password?</button>
              </div>
            )}
            {mode === 'register' && (
              <label className="auth-form__check auth-form__terms">
                <input type="checkbox" required />
                <span>I agree to the <Link to="/policies">Terms of Service & Policies</Link></span>
              </label>
            )}
            {message && <p className="form-hint form-hint--error">{message}</p>}
            <button type="submit" className="btn-primary auth-form__submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </div>

        <div className="auth-membership-note">
          <div className="auth-membership-note__inner">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <p>
              <strong>Membership required to book online.</strong>{' '}
              Walk-ins are $25 + tax with no account.{' '}
              <Link to="/memberships">View plans →</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
