import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Waitlist from '../components/Waitlist'
import './Home.css'

const modalities = [
  {
    name: 'Cryotherapy',
    slug: 'cryotherapy',
    duration: '10 min',
    desc: 'Ultra-cold dry air to accelerate recovery, reduce inflammation, and leave you sharp.',
  },
  {
    name: 'Red Light Therapy',
    slug: 'red-light',
    duration: '20 min',
    desc: 'Red and near-infrared light to support repair, collagen, and recovery from within.',
  },
  {
    name: 'Infrared Sauna',
    slug: 'sauna',
    duration: '40 min',
    desc: 'Deep heat to ease sore muscles, support detox, and settle the nervous system.',
  },
  {
    name: 'Compression',
    slug: 'compression',
    duration: '30 min',
    desc: 'Sequential compression to move lactic acid, reduce swelling, and restore flow.',
  },
]

const faqs = [
  {
    q: 'When are you open?',
    a: 'We are open now in Concord, Ohio. Monday–Thursday 8am–7pm, Friday 8am–5pm, Saturday 10am–4pm. Closed Sunday.',
  },
  {
    q: 'What modalities will you offer?',
    a: 'Whole-body cryotherapy, red light bed therapy, infrared sauna, and compression therapy.',
  },
  {
    q: 'How much does it cost?',
    a: 'Walk-ins are $35 + tax per modality. Everyday Wellness is $149.99/mo founding (first 50) or $169.99/mo standard. Unlimited is $229.99/mo founding or $249.99/mo standard — all plus tax.',
  },
  {
    q: 'How do founding memberships work?',
    a: 'The first 50 members lock in founding rates before standard pricing begins. Join the waitlist to secure a founding spot.',
  },
  {
    q: 'Are there health requirements?',
    a: 'Some conditions may be contraindicated. Review Policies and check with your physician if you have concerns.',
  },
]

const hours = [
  { days: 'Monday – Thursday', time: '8:00 AM – 7:00 PM' },
  { days: 'Friday', time: '8:00 AM – 5:00 PM' },
  { days: 'Saturday', time: '10:00 AM – 4:00 PM' },
  { days: 'Sunday', time: 'Closed' },
]

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero__media" aria-hidden="true">
          <picture>
            <source
              type="image/webp"
              media="(max-width: 900px)"
              srcSet="/lobby-sm.webp"
            />
            <source type="image/webp" srcSet="/lobby.webp" />
            <img
              src="/lobby.jpg"
              alt=""
              className="hero__photo"
              width={1061}
              height={1004}
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </div>
        <div className="hero__veil" aria-hidden="true" />
        <div className="container hero__shell">
          <div className="hero__content">
            <p className="hero__open fade-up">Now Open</p>
            <h1 className="hero__title fade-up-1">
              Recover.<br />
              Restore.<br />
              <em>Elevate.</em>
            </h1>
            <p className="hero__sub fade-up-2">
              Cryotherapy, red light, sauna, and compression — now open in Concord, Ohio.
            </p>
            <div className="hero__ctas fade-up-2">
              <Link to="/#hours" className="btn-primary">See Hours</Link>
              <Link to="/#waitlist" className="btn-secondary">Join the Waitlist</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section modalities-preview">
        <div className="container">
          <Reveal>
            <div className="modalities-preview__header">
              <span className="section-label">Modalities</span>
              <h2 className="section-title">Four ways to restore.</h2>
              <p className="section-subtitle">
                A focused recovery protocol — each modality precise on its own, stronger together.
              </p>
            </div>
          </Reveal>
          <div className="modalities-preview__grid">
            {modalities.map((m, i) => (
              <Reveal key={m.name} delay={i * 70}>
                <Link to={`/modalities#${m.slug}`} className="mod-card">
                  <div className="mod-card__duration">{m.duration}</div>
                  <h3 className="mod-card__name">{m.name}</h3>
                  <p className="mod-card__desc">{m.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="hours" className="section hours-section">
        <div className="container">
          <div className="hours-section__inner">
            <Reveal>
              <div className="hours-section__intro">
                <span className="section-label">Visit Us</span>
                <h2 className="section-title">Hours</h2>
                <p className="section-subtitle">
                  Walk-ins welcome. Founding memberships still available for the first 50.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <ul className="hours-list">
                {hours.map((row) => (
                  <li key={row.days} className="hours-list__row">
                    <span className="hours-list__days">{row.days}</span>
                    <span className={`hours-list__time${row.time === 'Closed' ? ' hours-list__time--closed' : ''}`}>
                      {row.time}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="container">
          <div className="faq-section__inner">
            <Reveal>
              <div className="faq-section__left">
                <span className="section-label">FAQ</span>
                <h2 className="section-title">A few things to know.</h2>
                <Link to="/policies" className="btn-ghost">
                  Read Policies
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="faq-section__right">
                {faqs.map((f, i) => (
                  <FaqItem key={i} q={f.q} a={f.a} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Waitlist />
    </main>
  )
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item${open ? ' faq-item--open' : ''}`}>
      <button className="faq-item__q" onClick={() => setOpen(!open)}>
        {q}
        <span className="faq-item__icon">{open ? '−' : '+'}</span>
      </button>
      <div className="faq-item__a">
        <p>{a}</p>
      </div>
    </div>
  )
}
