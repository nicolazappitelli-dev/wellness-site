import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './SimplePages.css'

export default function Account() {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const navigate = useNavigate()

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
              ? 'Sign in to access your member dashboard and book your next session.'
              : 'Create your account to activate a membership and start booking.'}
          </p>
        </div>
      </div>

      <div className="container">
        <div className="auth-card">
          <div className="auth-card__tabs">
            <button
              className={`auth-card__tab${mode === 'login' ? ' auth-card__tab--active' : ''}`}
              onClick={() => setMode('login')}
            >
              Log In
            </button>
            <button
              className={`auth-card__tab${mode === 'register' ? ' auth-card__tab--active' : ''}`}
              onClick={() => setMode('register')}
            >
              Create Account
            </button>
          </div>

          {mode === 'login' ? (
            <form className="auth-form" onSubmit={e => { e.preventDefault(); navigate('/#waitlist') }}>
              <div className="auth-form__field">
                <label className="auth-form__label">Email Address</label>
                <input type="email" className="auth-form__input" placeholder="you@example.com" />
              </div>
              <div className="auth-form__field">
                <label className="auth-form__label">Password</label>
                <input type="password" className="auth-form__input" placeholder="••••••••" />
              </div>
              <div className="auth-form__row">
                <label className="auth-form__check">
                  <input type="checkbox" /> Remember me
                </label>
                <Link to="/#waitlist" className="auth-form__forgot">Forgot password?</Link>
              </div>
              <button type="submit" className="btn-primary auth-form__submit">Sign In</button>
              <p className="auth-form__switch">
                Don't have an account?{' '}
                <button type="button" className="auth-form__switch-btn" onClick={() => setMode('register')}>
                  Create one
                </button>
              </p>
            </form>
          ) : (
            <form className="auth-form" onSubmit={e => { e.preventDefault(); navigate('/#waitlist') }}>
              <div className="auth-form__row-2">
                <div className="auth-form__field">
                  <label className="auth-form__label">First Name</label>
                  <input type="text" className="auth-form__input" placeholder="First" />
                </div>
                <div className="auth-form__field">
                  <label className="auth-form__label">Last Name</label>
                  <input type="text" className="auth-form__input" placeholder="Last" />
                </div>
              </div>
              <div className="auth-form__field">
                <label className="auth-form__label">Email Address</label>
                <input type="email" className="auth-form__input" placeholder="you@example.com" />
              </div>
              <div className="auth-form__field">
                <label className="auth-form__label">Phone Number</label>
                <input type="tel" className="auth-form__input" placeholder="(440) 000-0000" />
              </div>
              <div className="auth-form__field">
                <label className="auth-form__label">Password</label>
                <input type="password" className="auth-form__input" placeholder="Create a password" />
              </div>
              <div className="auth-form__field">
                <label className="auth-form__label">Confirm Password</label>
                <input type="password" className="auth-form__input" placeholder="Confirm password" />
              </div>
              <label className="auth-form__check auth-form__terms">
                <input type="checkbox" />
                <span>
                  I agree to the{' '}
                  <Link to="/policies">Terms of Service & Policies</Link>
                </span>
              </label>
              <button type="submit" className="btn-primary auth-form__submit">Create Account</button>
              <p className="auth-form__note">
                After creating your account, you'll be prompted to select a membership plan before booking.
              </p>
              <p className="auth-form__switch">
                Already have an account?{' '}
                <button type="button" className="auth-form__switch-btn" onClick={() => setMode('login')}>
                  Sign in
                </button>
              </p>
            </form>
          )}
        </div>

        <div className="auth-membership-note">
          <div className="auth-membership-note__inner">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <p>
              <strong>Membership required to book.</strong>{' '}
              Account creation is free. A subscription plan is required before scheduling any sessions.{' '}
              <Link to="/memberships">View plans →</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
