import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SITE_PHONE, SITE_PHONE_HREF } from '../lib/site'
import './Nav.css'

const links = [
  { to: '/', label: 'Home' },
  { to: '/modalities', label: 'Modalities' },
  { to: '/memberships', label: 'Memberships' },
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

  const onHome = location.pathname === '/'
  const solid = scrolled || !onHome

  return (
    <header className={`nav${solid ? ' nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <Link to="/" className="nav__logo">
          <img
            src={solid ? '/logo-nav-dark.svg' : '/logo-nav.svg'}
            alt="Elevate Cryo"
            className="nav__logo-img"
          />
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

        <Link to="/#inquiry" className="nav__waitlist">Request a Call</Link>

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
        <Link to="/#inquiry" className="nav__mobile-link">Request a Call</Link>
        <a href={SITE_PHONE_HREF} className="nav__mobile-link">Call {SITE_PHONE}</a>
      </div>
    </header>
  )
}
