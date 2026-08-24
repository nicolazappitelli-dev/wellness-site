import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SITE_PHONE, SITE_PHONE_HREF } from '../lib/site'
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
        <a href={SITE_PHONE_HREF} className="nav__account">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12.1 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.59 1.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.06 6.06l1.06-1.06a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          Call {SITE_PHONE}
        </a>

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
        <a href={SITE_PHONE_HREF} className="nav__mobile-link">Call {SITE_PHONE}</a>
        <Link to="/account" className="nav__mobile-link">Members</Link>
      </div>
    </header>
  )
}
