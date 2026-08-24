import { Link } from 'react-router-dom'
import { STUDIO_HOURS } from '../lib/catalog'
import { SITE_EMAIL, SITE_PHONE, SITE_PHONE_HREF } from '../lib/site'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              <img src="/logo-nav-dark.svg" alt="Elevate Cryo" className="footer__logo-img" loading="lazy" />
            </div>
            <p className="footer__tagline">
              Cryotherapy, redlight bed therapy, sauna, and compression therapy — recovery elevated in Concord, Ohio.
            </p>
            <a
              href="https://www.elevatecryoconcord.com"
              className="footer__site"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.elevatecryoconcord.com
            </a>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Navigate</h4>
            <nav className="footer__nav">
              <Link to="/">Home</Link>
              <Link to="/modalities">Modalities</Link>
              <Link to="/memberships">Memberships</Link>
              <Link to="/#inquiry">Request a Call</Link>
              <Link to="/policies">Policies</Link>
              <Link to="/contact">Contact</Link>
            </nav>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Hours</h4>
            <div className="footer__hours">
              {STUDIO_HOURS.map(row => (
                <div key={row.days} className="footer__hours-row">
                  <span>{row.days}</span>
                  <span>{row.hours}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Location</h4>
            <address className="footer__address">
              <p>8019 Crile Road</p>
              <p>Concord, OH 44077</p>
            </address>
            <a
              href="https://maps.google.com/?q=8019+Crile+Road+Concord+OH+44077"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__directions"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
              Get Directions
            </a>
            <div className="footer__contact">
              <a href={SITE_PHONE_HREF} className="footer__contact-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12.1 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.59 1.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.06 6.06l1.06-1.06a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                {SITE_PHONE}
              </a>
              <a href={`mailto:${SITE_EMAIL}`} className="footer__contact-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                {SITE_EMAIL}
              </a>
              <a href="https://www.instagram.com/elevatecryo/" target="_blank" rel="noopener noreferrer" className="footer__contact-item">
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__legal">
            &copy; {new Date().getFullYear()} Elevate Cryo. All rights reserved.
          </p>
          <div className="footer__legal-links">
            <Link to="/policies">Privacy Policy</Link>
            <Link to="/policies">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
