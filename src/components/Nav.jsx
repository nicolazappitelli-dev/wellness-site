import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Nav.css'

const links = [
  { to: '/', label: 'Home' },
  { to: '/modalities', label: 'Modalities' },
  { to: '/memberships', label: 'Memberships' },
  { to: '/booking', label: 'Booking' },
  { to: '/policies', label: 'Policies' },
  { to: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 40
      setScrolled(prev => prev === next ? prev : next)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location])

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <Link to="/" className="nav__logo">
          <img src="/logo.png" alt="Elevate Cryo & Wellness" className="nav__logo-img" />
        </Link>

        <nav className="nav__links">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`nav__link${location.pathname === l.to ? ' nav__link--active' : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link to="/#waitlist" className="nav__waitlist">Join Waitlist</Link>
        <Link to="/account" className="nav__account">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
          Account
        </Link>

        <button
          className={`nav__hamburger${open ? ' nav__hamburger--open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`nav__mobile${open ? ' nav__mobile--open' : ''}`}>
        {links.map(l => (
          <Link
            key={l.to}
            to={l.to}
            className={`nav__mobile-link${location.pathname === l.to ? ' nav__mobile-link--active' : ''}`}
          >
            {l.label}
          </Link>
        ))}
        <Link to="/#waitlist" className="nav__mobile-link">Join Waitlist</Link>
        <Link to="/account" className="nav__mobile-link">Account</Link>
      </div>
    </header>
  )
}
