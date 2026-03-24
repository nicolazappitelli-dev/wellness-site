import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Waitlist from '../components/Waitlist'
import './Home.css'

const modalities = [
  {
    icon: '❄',
    name: 'Cryotherapy',
    duration: '10 min',
    desc: 'Step into restorative cold. Whole-body cryo triggers deep cellular recovery, reduces inflammation, and resets your nervous system—leaving you energized and sharply focused.',
    color: 'rgba(15,40,72,0.75)',
    iconColor: '#82CEF2',
  },
  {
    icon: '☀',
    name: 'Red Light Bed Therapy',
    duration: '20 min',
    desc: 'Bathe in the healing spectrum. Red and near-infrared wavelengths penetrate deep into tissue, stimulating collagen, accelerating repair, and restoring luminosity from within.',
    color: 'rgba(65,12,10,0.75)',
    iconColor: '#E84030',
  },
  {
    icon: '♨',
    name: 'Infrared Sauna',
    duration: '40 min',
    desc: 'Sweat with intention. Infrared heat works deeper than traditional saunas—purging toxins, soothing sore muscles, and activating the parasympathetic state your body craves.',
    color: 'rgba(55,22,8,0.75)',
    iconColor: '#E09050',
  },
  {
    icon: '◎',
    name: 'Compression Therapy',
    duration: '30 min',
    desc: 'Restore your flow. Sequential compression massage mobilizes lactic acid, reduces swelling, and revives circulation—a full-body reset that athletes and high-performers swear by.',
    color: 'rgba(10,18,58,0.75)',
    iconColor: '#8090D8',
  },
]

const steps = [
  {
    num: '01',
    label: 'Join',
    title: 'Choose your membership',
    desc: 'Pick a monthly plan that fits your recovery routine. Essential or Unlimited — both unlock the portal.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    num: '02',
    label: 'Book',
    title: 'Reserve your session',
    desc: 'Book up to 4 days ahead through your member portal. Guaranteed time, guaranteed modality.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <path d="M16 2v4M8 2v4M3 10h18"/>
        <path d="M9 16l2 2 4-4"/>
      </svg>
    ),
  },
  {
    num: '03',
    label: 'Recover',
    title: 'Restore & repeat',
    desc: 'Leave reset. Come back stronger. Each session compounds — this is recovery as a practice.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 1-6.74 2.74L3 8"/>
        <path d="M3 3v5h5"/>
      </svg>
    ),
  },
]

const plans = [
  {
    name: 'Essential',
    price: '$99',
    billing: '+ tax / month',
    feature: '1 modality per day',
    desc: 'One session daily—the ideal entry point for consistent, focused recovery.',
    cta: 'Start Essential',
  },
  {
    name: 'Unlimited',
    price: '$129',
    billing: '+ tax / month',
    feature: 'Unlimited modalities per day',
    desc: 'Layer every modality in a single visit. Maximum restoration, maximum value.',
    cta: 'Start Unlimited',
    featured: true,
  },
]

const reviews = [
  {
    text: '"Three weeks in and my post-workout recovery has completely transformed. I sleep deeper, move better, and actually look forward to rest days."',
    name: 'A.M.',
    detail: 'Unlimited Member',
  },
  {
    text: `"The combination of cryo and red light has done more for my energy than anything else I've tried. This place is exceptional."`,
    name: 'T.R.',
    detail: 'Essential Member',
  },
  {
    text: '"Clean, calm, and genuinely effective. The staff understands wellness at a deep level. Worth every penny."',
    name: 'L.S.',
    detail: 'Unlimited Member',
  },
]

const faqs = [
  {
    q: 'Do I need a membership to visit?',
    a: 'No. Walk-ins are welcome at $25 + tax per modality — no account, no booking, no commitment required. Simply arrive during operating hours. Membership is only required to book online in advance.',
  },
  {
    q: 'How do I book a session online?',
    a: 'Online booking is available exclusively to active members. Create an account, activate an Essential or Unlimited plan, and schedule sessions up to 4 days ahead through the member portal.',
  },
  {
    q: 'Can I use multiple modalities in one visit?',
    a: 'With the Unlimited plan, yes — you may use all available modalities in a single day. The Essential plan allows one modality session per day. Walk-in guests pay $25 + tax per modality per visit.',
  },
  {
    q: "What's included in a membership?",
    a: "The Essential plan ($99 + tax/mo) gives you one modality session per day. The Unlimited plan ($129 + tax/mo) lets you stack all four modalities in a single visit. Both plans include full access to the online booking portal and a 4-day advance booking window.",
  },
  {
    q: 'What should I bring?',
    a: 'We provide everything you need. For cryo, wear minimal clothing. For the sauna, bring a towel or use ours. Compression suits and red light beds are private and fully equipped.',
  },
  {
    q: 'Are there any health contraindications?',
    a: 'Certain conditions may be contraindicated with some modalities. We recommend reviewing our full health guidelines in the Policies section and consulting your physician if you have any concerns.',
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
          <span className="section-label fade-up">Concord, Ohio</span>
          <h1 className="hero__title fade-up-1">
            Recover.<br />
            Restore.<br />
            <em>Elevate.</em>
          </h1>
          <p className="hero__sub fade-up-2">
            A sanctuary where whole-body cryotherapy, red light healing, infrared heat,
            and compression therapy converge—so you can perform, feel, and live at your peak.
          </p>
          <div className="hero__ctas fade-up-3">
            <Link to="/#waitlist" className="btn-primary">Join the Waitlist</Link>
            <Link to="/account" className="btn-secondary">Log In</Link>
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
              Members-Only Booking
            </div>
          </div>
        </div>
      </div>

      {/* Opening Soon */}
      <section className="opening-soon">
        <div className="container">
          <Reveal>
            <div className="opening-card">
              <div className="opening-card__left">
                <div className="opening-card__chip">
                  <span className="opening-card__pulse" />
                  Opening Soon
                </div>
                <h2 className="opening-card__title">Concord's new recovery sanctuary.</h2>
                <p className="opening-card__body">
                  Membership booking opens soon. Join the waitlist for first access and opening specials.
                </p>
              </div>
              <div className="opening-card__right">
                <div className="opening-card__details">
                  <div className="opening-card__detail">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                    8019 Crile Road, Concord, OH
                  </div>
                  <div className="opening-card__detail">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    Hours &amp; opening date coming soon
                  </div>
                </div>
                <Link to="/#waitlist" className="btn-primary opening-card__cta">Join the Waitlist</Link>
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
                  <div className="step__top">
                    <span className="step__badge">{s.num}</span>
                    <div className="step__icon">{s.icon}</div>
                  </div>
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
                  <Link to="/modalities" className="mod-card__link">
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

      {/* Membership Teaser */}
      <section className="section memberships-teaser">
        <div className="container">
          <Reveal>
            <div className="memberships-teaser__header">
              <span className="section-label">Membership</span>
              <h2 className="section-title">Invest in your recovery.</h2>
              <p className="section-subtitle">
                Walk-ins welcome at $25 + tax per modality. Or commit to a membership for
                unlimited online booking and the best value per session.
              </p>
            </div>
          </Reveal>
          <div className="memberships-teaser__plans">
            {plans.map((p, i) => (
              <Reveal key={p.name} delay={i * 120}>
                <div className={`plan-card${p.featured ? ' plan-card--featured' : ''}`}>
                  {p.featured && <div className="plan-card__badge">Most Popular</div>}
                  <div className="plan-card__name">{p.name}</div>
                  <div className="plan-card__price">
                    <span className="plan-card__amount">{p.price}</span>
                    <span className="plan-card__billing">{p.billing}</span>
                  </div>
                  <div className="plan-card__feature">{p.feature}</div>
                  <p className="plan-card__desc">{p.desc}</p>
                  <Link to="/#waitlist" className={p.featured ? 'btn-primary' : 'btn-secondary'}>
                    {p.cta}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={150}>
            <p className="memberships-teaser__note">
              All plans require account creation and renew monthly. Prefer no commitment? Walk-ins welcome at $25 + tax per modality — no booking needed.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Social Proof */}
      <section className="section social-proof">
        <div className="container">
          <Reveal>
            <span className="section-label">Member Stories</span>
            <h2 className="section-title">Trusted by those who&nbsp;demand more.</h2>
          </Reveal>
          <div className="reviews-grid">
            {reviews.map((r, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="review-card">
                  <div className="review-card__stars">{'★'.repeat(5)}</div>
                  <blockquote className="review-card__text">{r.text}</blockquote>
                  <div className="review-card__author">
                    <div className="review-card__avatar">{r.name[0]}</div>
                    <div>
                      <div className="review-card__name">{r.name}</div>
                      <div className="review-card__detail">{r.detail}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
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
