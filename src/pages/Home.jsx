import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Waitlist from '../components/Waitlist'
import './Home.css'

const modalities = [
  {
    icon: '❄',
    name: 'Cryotherapy',
    slug: 'cryotherapy',
    duration: '15 min',
    desc: 'Experience ultra-cold, dry air in our advanced electric cryotherapy chamber—engineered to accelerate recovery, reduce inflammation, and leave you energized.',
    color: 'rgba(15,40,72,0.75)',
    iconColor: '#82CEF2',
  },
  {
    icon: '☀',
    name: 'Red Light Bed Therapy',
    slug: 'red-light',
    duration: '20 min',
    desc: 'Bathe in the healing spectrum. Red and near-infrared wavelengths penetrate deep into tissue, stimulating collagen, accelerating repair, and restoring luminosity from within.',
    color: 'rgba(65,12,10,0.75)',
    iconColor: '#E84030',
  },
  {
    icon: '♨',
    name: 'Infrared Sauna',
    slug: 'sauna',
    duration: '25 min',
    desc: 'Sweat with intention. Infrared heat works deeper than traditional saunas—purging toxins, soothing sore muscles, and activating the parasympathetic state your body craves.',
    color: 'rgba(55,22,8,0.75)',
    iconColor: '#E09050',
  },
  {
    icon: '◎',
    name: 'Compression Therapy',
    slug: 'compression',
    duration: '30 min',
    desc: 'Restore your flow. Sequential compression massage mobilizes lactic acid, reduces swelling, and revives circulation—a full-body reset that athletes and high-performers swear by.',
    color: 'rgba(10,18,58,0.75)',
    iconColor: '#8090D8',
  },
]

const steps = [
  {
    num: '1',
    title: 'Request a call',
    desc: 'Leave your name and number. Tell us what you are interested in — a membership, a walk-in, or a specific modality.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    num: '2',
    title: 'He calls you to help',
    desc: 'He will reach out to answer questions, help you pick a plan, and find a time that works when the studio opens.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12.1 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.59 1.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.06 6.06l1.06-1.06a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    num: '3',
    title: 'Restore & repeat',
    desc: 'Leave reset. Come back stronger. Each session compounds — this is recovery as a practice.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 1-6.74 2.74L3 8"/>
        <path d="M3 3v5h5"/>
      </svg>
    ),
  },
]

const faqs = [
  {
    q: 'When are you opening?',
    a: "We're targeting Summer 2026 in Concord, Ohio. Request a call and we'll reach out to help you get started and lock in founding member pricing.",
  },
  {
    q: 'What is cryotherapy?',
    a: 'Whole-body cryotherapy involves brief exposure to ultra-cold, dry air in an advanced electric chamber. The rapid cooling triggers deep physiological responses that reduce inflammation, accelerate recovery, and leave you energized.',
  },
  {
    q: 'What modalities will you offer?',
    a: 'We offer four modalities: whole-body Cryotherapy, Red Light Bed Therapy, Infrared Sauna, and Compression Therapy. Each is independently powerful — together, they form a complete recovery protocol.',
  },
  {
    q: 'What should I bring?',
    a: 'We provide everything you need. For cryo, wear minimal clothing. For the sauna, a towel is provided. Compression suits and red light beds are private and fully equipped.',
  },
  {
    q: 'Are there any health contraindications?',
    a: 'Certain conditions may be contraindicated with some modalities. We recommend reviewing our full health guidelines in the Policies section and consulting your physician if you have any concerns.',
  },
  {
    q: 'How do founding memberships work?',
    a: 'Request a call to secure founding member status. Founding rates are Essential at $99/mo and Unlimited at $129/mo, with walk-ins at $25 + tax per modality. He will call you to help you join and schedule when we open.',
  },
]

export default function Home() {
  return (
    <main className="home">
      {/* Hero — fires on load, no scroll reveal needed */}
      <section className="hero">
        <div className="hero__bg">
          <div className="hero__gradient" />
          <div className="hero__orb hero__orb--1" />
          <div className="hero__orb hero__orb--2" />
        </div>
        <div className="container hero__content">
          <span className="section-label fade-up">Coming Soon — Concord, Ohio</span>
          <h1 className="hero__title fade-up-1">
            Recover Faster.<br />
            Feel Better.<br />
            <em>Age Better.</em>
          </h1>
          <p className="hero__sub fade-up-2">
            Cryotherapy, Sauna &amp; Recovery — Coming Soon to Concord, Ohio.
          </p>
          <div className="hero__ctas fade-up-3">
            <p className="hero__founding-note">Leave your info — he will call you to help you get started</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/#inquiry" className="btn-primary">Request a Call</Link>
              <Link to="/memberships" className="btn-secondary">See Memberships</Link>
            </div>
          </div>
        </div>
        <div className="hero__scroll">
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* Trust Bar */}
      <div className="trust-bar">
        <div className="container">
          <div className="trust-bar__inner">
            <div className="trust-chip">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
              Private Rooms
            </div>
            <div className="trust-bar__sep" />
            <div className="trust-chip">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
              Clean Protocols
            </div>
            <div className="trust-bar__sep" />
            <div className="trust-chip">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
              Premium Equipment
            </div>
            <div className="trust-bar__sep" />
            <div className="trust-chip">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
              Founding Member Rates
            </div>
          </div>
        </div>
      </div>

      {/* Opening Soon */}
      <section className="opening-soon">
        <div className="container">
          <Reveal>
            <div className="opening-card">
              <div className="opening-card__chip">
                <span className="opening-card__pulse" />
                Opening Soon
              </div>
              <h2 className="opening-card__title">Opening Summer 2026.</h2>
              <p className="opening-card__subhead">Elevate Cryo &amp; Wellness is coming to Concord.</p>
              <p className="opening-card__body">
                Request a call with your name and number. He will reach out to help you join Essential or Unlimited and get scheduled when we open.
              </p>
              <Link to="/#inquiry" className="btn-primary opening-card__cta">Request a Call</Link>
              <div className="opening-card__address">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                8019 Crile Road, Concord, OH 44077
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How It Works */}
      <section className="section how-it-works">
        <div className="container">
          <Reveal>
            <div className="how-it-works__header">
              <span className="section-label">The Process</span>
              <h2 className="section-title">Simple by design.<br />Transformative by nature.</h2>
            </div>
          </Reveal>
          <div className="hiw-track" aria-hidden="true">
            <div className="hiw-track__node" />
            <div className="hiw-track__line" />
            <div className="hiw-track__node hiw-track__node--mid" />
            <div className="hiw-track__line" />
            <div className="hiw-track__node" />
          </div>
          <div className="how-it-works__steps">
            {steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 110}>
                <div className="step">
                  <div className="step__pill">Step {s.num}</div>
                  <div className="step__icon">{s.icon}</div>
                  <h3 className="step__title">{s.title}</h3>
                  <p className="step__desc">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Modalities Preview */}
      <section className="section modalities-preview">
        <div className="container">
          <Reveal>
            <div className="modalities-preview__header">
              <span className="section-label">What We Offer</span>
              <h2 className="section-title">Four pathways to restoration.</h2>
              <p className="section-subtitle">
                Each modality is precision-designed for a specific dimension of recovery. Together, they form a complete wellness protocol.
              </p>
            </div>
          </Reveal>
          <div className="modalities-preview__grid">
            {modalities.map((m, i) => (
              <Reveal key={m.name} delay={i * 80}>
                <div className="mod-card" style={{ '--card-bg': m.color }}>
                  <div className="mod-card__icon" style={{ color: m.iconColor }}>{m.icon}</div>
                  <div className="mod-card__duration">{m.duration}</div>
                  <h3 className="mod-card__name">{m.name}</h3>
                  <p className="mod-card__desc">{m.desc}</p>
                  <Link to={`/modalities#${m.slug}`} className="mod-card__link">
                    Learn more
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div className="modalities-preview__cta">
              <Link to="/modalities" className="btn-secondary">Explore All Modalities</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Founding Memberships */}
      <section className="section founding-cta">
        <div className="container">
          <Reveal>
            <div className="founding-cta__card">
              <span className="section-label">Founding Members</span>
              <h2 className="founding-cta__title">Founding rates: $99 and $129.</h2>
              <p className="founding-cta__body">
                Essential is $99/mo for one modality a day. Unlimited is $129/mo for every modality,
                every visit. Walk-ins are $25 + tax. Request a call and he will help you get set up.
              </p>
              <Link to="/#inquiry" className="btn-primary founding-cta__btn">Request a Call</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq-section">
        <div className="container">
          <div className="faq-section__inner">
            <Reveal>
              <div className="faq-section__left">
                <span className="section-label">FAQ</span>
                <h2 className="section-title">Questions answered.</h2>
                <p className="section-subtitle">
                  Everything you need to know before your first session.
                </p>
                <Link to="/policies" className="btn-ghost">
                  Read Full Policies
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="faq-section__right">
                {faqs.map((f, i) => (
                  <FaqItem key={i} q={f.q} a={f.a} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Eligibility & Requirements */}
      <section className="section eligibility">
        <div className="container">
          <Reveal>
            <div className="eligibility__inner">
              <span className="section-label">Before You Visit</span>
              <h2 className="section-title">Eligibility &amp; Requirements</h2>
              <p className="eligibility__intro">
                To ensure a safe and effective experience for every client, please review the following requirements before your first visit.
              </p>
              <ul className="eligibility__list">
                <li className="eligibility__item">
                  <span className="eligibility__dot" aria-hidden="true" />
                  Membership is available to individuals 18 years of age or older.
                </li>
                <li className="eligibility__item">
                  <span className="eligibility__dot" aria-hidden="true" />
                  All members must complete a health intake form and acknowledge any applicable health contraindications prior to activating their account.
                </li>
                <li className="eligibility__item">
                  <span className="eligibility__dot" aria-hidden="true" />
                  Clients must be at least 16 years of age to use any services at Elevate Cryo &amp; Wellness.
                </li>
                <li className="eligibility__item">
                  <span className="eligibility__dot" aria-hidden="true" />
                  Clients under the age of 18 must have a parent or legal guardian present to sign a consent form prior to receiving services.
                </li>
                <li className="eligibility__item">
                  <span className="eligibility__dot" aria-hidden="true" />
                  A parent or guardian may be required to remain on-site during the session at the discretion of staff.
                </li>
                <li className="eligibility__item">
                  <span className="eligibility__dot" aria-hidden="true" />
                  Elevate Cryo &amp; Wellness reserves the right to request valid identification and to refuse service if age or consent requirements are not met.
                </li>
                <li className="eligibility__item">
                  <span className="eligibility__dot" aria-hidden="true" />
                  All clients are required to complete a waiver and health screening prior to participation.
                </li>
                <li className="eligibility__item">
                  <span className="eligibility__dot" aria-hidden="true" />
                  Certain services may not be suitable for individuals with specific medical conditions.
                </li>
              </ul>
              <p className="eligibility__disclaimer">Please consult your physician if you have any medical concerns.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Waitlist */}
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
