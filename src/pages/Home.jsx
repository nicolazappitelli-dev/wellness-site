import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Waitlist from '../components/Waitlist'
import { HEADLINE, OFFERS, STUDIO_HOURS, TAGLINE, modalityBySlug, modalitySummary } from '../lib/catalog'
import './Home.css'

const modalityCards = [
  { slug: 'cryotherapy', duration: '10 min', image: '/cryo-chamber.jpg' },
  { slug: 'red-light', duration: '15 min', image: '/red-light-bed.jpg' },
  { slug: 'sauna', duration: '25 min', image: '/sauna.jpg' },
  { slug: 'compression', duration: '30 min', image: '/compression-boots.jpg' },
]

const modalities = modalityCards.map(card => ({
  ...card,
  name: modalityBySlug(card.slug).name,
  desc: modalitySummary(card.slug),
}))

const faqs = [
  {
    q: 'Are you open?',
    a: 'Yes. We are now open in Concord, Ohio. Leave your info and we will call you to help you get started.',
  },
  {
    q: 'What are your hours?',
    a: STUDIO_HOURS.map(row => `${row.days}: ${row.hours}`).join('. ') + '.',
  },
  {
    q: 'What modalities do you offer?',
    a: 'Cryotherapy, infrared sauna, red light therapy bed (up to 940nm), and compression therapy.',
  },
  {
    q: 'How much does it cost?',
    a: `Walk-ins are $${OFFERS.walkIn.price} + tax per modality. Elevate Essential is $${OFFERS.essential.price}/month + tax for 1 modality a week. Everyday Wellness is 1 modality a day: $${OFFERS.everyday.founding}/month + tax for the first 50 members, then $${OFFERS.everyday.standard}/month + tax. Unlimited is all modalities, unlimited access: $${OFFERS.unlimited.founding}/month + tax for the first 50, then $${OFFERS.unlimited.standard}/month + tax. The Unlimited Week Pass is $${OFFERS.weekPass.price} for 7 days. Members on Essential or Everyday Wellness can add another modality the same day for $${OFFERS.addOn.price}.`,
  },
  {
    q: 'How do founding memberships work?',
    a: `The first 50 members lock in Everyday Wellness at $${OFFERS.everyday.founding}/month + tax and Unlimited at $${OFFERS.unlimited.founding}/month + tax. After the first 50, those plans are $${OFFERS.everyday.standard} and $${OFFERS.unlimited.standard} per month, plus tax.`,
  },
  {
    q: 'Are there health requirements?',
    a: 'Some conditions may be contraindicated. Review Policies and check with your physician if you have concerns.',
  },
]

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero__media" aria-hidden="true">
          <picture>
            <source type="image/webp" media="(max-width: 900px)" srcSet="/lobby-sm.webp" />
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
        <p className="hero__open fade-up">Now Open</p>
        <div className="hero__copy">
          <h1 className="hero__title fade-up-1">
            Recover.<br />
            Restore.<br />
            <em>Elevate.</em>
          </h1>
          <p className="hero__sub fade-up-2">
            {TAGLINE}
          </p>
          <div className="hero__ctas fade-up-3">
            <Link to="/#inquiry" className="btn-primary">Request a Call</Link>
            <Link to="/#hours" className="btn-secondary hero__hours-btn">See Hours</Link>
          </div>
        </div>
      </section>

      <section className="section modalities-preview">
        <div className="container">
          <Reveal>
            <div className="modalities-preview__header">
              <span className="section-label">Modalities</span>
              <h2 className="section-title">{HEADLINE}</h2>
              <p className="section-subtitle">
                {TAGLINE} Cryotherapy, infrared sauna, red light therapy bed, and compression therapy.
              </p>
            </div>
          </Reveal>
          <div className="modalities-preview__grid">
            {modalities.map((m, i) => (
              <Reveal key={m.slug} delay={i * 70}>
                <Link to={`/modalities#${m.slug}`} className="mod-card">
                  <img src={m.image} alt="" className="mod-card__photo" />
                  <div className="mod-card__duration">{m.duration}</div>
                  <h3 className="mod-card__name">{m.name}</h3>
                  <p className="mod-card__desc">{m.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="hours" className="section hours-section" aria-label="Hours">
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
                {STUDIO_HOURS.map(row => (
                  <li key={row.days} className="hours-list__row">
                    <span className="hours-list__days">{row.days}</span>
                    <span className={`hours-list__time${row.hours === 'Closed' ? ' hours-list__time--closed' : ''}`}>
                      {row.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <Waitlist />

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
