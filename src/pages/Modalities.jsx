import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import './Modalities.css'

const modalities = [
  {
    id: 'cryo',
    name: 'Cryotherapy',
    tagline: 'The power of cold. Redefined.',
    duration: '10 Minutes',
    emoji: '❄',
    image: '/cryo-chamber.jpg',
    gradient: 'radial-gradient(ellipse at 60% 30%, #c8dff0 0%, #a0c0e0 45%, #7098b8 100%)',
    accentColor: '#4A7FA8',
    intro: `Experience ultra-cold, dry air in our advanced electric cryotherapy chamber—engineered to accelerate recovery, reduce inflammation, and leave you energized.`,
    benefits: [
      'Dramatically reduces systemic inflammation and joint pain',
      'Accelerates athletic recovery and reduces DOMS',
      'Activates the sympathetic nervous system for lasting energy',
      'Boosts mood via endorphin and norepinephrine release',
      'Supports metabolism and body composition goals',
    ],
    ideal: 'Athletes, high-performers, those managing chronic inflammation or pain, and anyone seeking an immediate energy and mood reset.',
    note: 'Clients are advised to remove all metal jewelry and moisture from skin before entering the chamber. A minimum 18-year age requirement applies.',
  },
  {
    id: 'redlight',
    name: 'Red Light Bed Therapy',
    tagline: 'Heal from the inside out.',
    duration: '20 Minutes',
    emoji: '☀',
    image: '/red-light-bed.jpg',
    gradient: 'radial-gradient(ellipse at 40% 55%, #f5dfc0 0%, #e0a060 45%, #c07838 100%)',
    accentColor: '#C07830',
    intro: `Red and near-infrared wavelengths (630–660nm and up to 940nm) penetrate deep into tissue to support cellular repair, reduce inflammation, and enhance recovery.`,
    benefits: [
      'Stimulates collagen production for smoother, firmer skin',
      'Accelerates wound healing and tissue repair',
      'Reduces inflammation and oxidative stress',
      'Enhances mitochondrial energy output (ATP synthesis)',
      'Supports improved sleep quality and circadian rhythm',
    ],
    ideal: 'Those seeking skin rejuvenation, enhanced recovery, improved energy, or a targeted approach to reducing inflammation. Pairs beautifully with cryotherapy.',
    note: 'Sessions are performed with protective eyewear. No photosensitizing medications or topicals within 24 hours prior.',
  },
  {
    id: 'sauna',
    name: 'Infrared Sauna',
    tagline: 'Sweat deeply. Release fully.',
    duration: '40 Minutes',
    emoji: '♨',
    gradient: 'radial-gradient(ellipse at 50% 40%, #e8c4a8 0%, #c88858 45%, #a05830 100%)',
    accentColor: '#B05035',
    intro: `Our infrared sauna uses far-infrared wavelengths to penetrate 1.5 to 2 inches beneath the skin's surface—reaching muscle tissue, joints, and deep organs in a way traditional steam saunas cannot. The result is a deeper, more intentional sweat at a more comfortable ambient temperature, ideal for extended, therapeutic sessions.`,
    benefits: [
      'Deep detoxification through profuse, metabolically active sweating',
      'Relieves chronic muscle soreness, stiffness, and joint pain',
      'Activates parasympathetic recovery and deep relaxation',
      'Supports cardiovascular health and mimics moderate aerobic effort',
      'Promotes clearer skin through enhanced circulation',
    ],
    ideal: 'Anyone experiencing chronic stress, muscular tension, toxin burden, or those seeking a deeply meditative, restorative session. The longest and most contemplative of our offerings.',
    note: 'We recommend hydrating well before and after. A plush towel and water are provided. Avoid sauna use immediately after vigorous training.',
  },
  {
    id: 'compression',
    name: 'Compression Therapy',
    tagline: 'Restore your circulation. Reclaim your legs.',
    duration: '30 Minutes',
    emoji: '◎',
    gradient: 'radial-gradient(ellipse at 35% 60%, #c8d0e8 0%, #8890c0 45%, #585890 100%)',
    accentColor: '#5060A0',
    intro: `Sequential compression therapy uses dynamic air pressure—applied via specialized sleeves to the legs, hips, and arms—to replicate and amplify the natural pumping action of your lymphatic system. The result is dramatically improved circulation, accelerated metabolic waste removal, and a profound sense of lightness in tired limbs.`,
    benefits: [
      'Accelerates lactic acid clearance after intense training',
      'Reduces swelling, puffiness, and post-travel heaviness',
      'Enhances lymphatic drainage for immune and recovery support',
      'Improves venous blood return and peripheral circulation',
      'Provides immediate relief from sore, fatigued legs',
    ],
    ideal: 'Endurance athletes, frequent travelers, those who stand for long periods, and anyone recovering from lower-body soreness or swelling. An exceptional standalone session or complement to cryo.',
    note: 'Compression sleeves are single-use sterile liners over reusable systems. Contraindicated with active DVT or acute lower-extremity injury.',
  },
]

export default function Modalities() {
  return (
    <main className="modalities-page">
      {/* Hero */}
      <section className="mod-hero">
        <div className="container">
          <span className="section-label fade-up">Our Services</span>
          <h1 className="mod-hero__title fade-up-1">
            Four modalities.<br />
            <em>One complete recovery.</em>
          </h1>
          <p className="mod-hero__sub fade-up-2">
            Each treatment is independently powerful. Together, they form a comprehensive,
            science-backed protocol for recovery, performance, and longevity.
          </p>
        </div>
      </section>

      {/* Modality Sections */}
      {modalities.map((m, i) => (
        <section
          key={m.id}
          className={`mod-section ${i % 2 === 0 ? 'mod-section--light' : 'mod-section--cream'}`}
        >
          <div className="container">
            <div className={`mod-layout ${i % 2 !== 0 ? 'mod-layout--reverse' : ''}`}>

              {/* Atmospheric Visual Panel */}
              <Reveal delay={60}>
                <div
                  className={`mod-visual${m.image ? ' mod-visual--photo' : ''}`}
                  style={m.image
                    ? { backgroundImage: `url('${m.image}')` }
                    : { background: m.gradient }
                  }
                >
                  {m.image && <div className="mod-visual__photo-overlay" />}
                  <div className="mod-visual__glow" />
                  <div className="mod-visual__emoji">{m.emoji}</div>
                  <div className="mod-visual__pill">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    {m.duration}
                  </div>
                </div>
              </Reveal>

              {/* Content */}
              <Reveal delay={160}>
                <div className="mod-content">
                  <span className="section-label">{m.duration} Session</span>
                  <h2 className="mod-content__name">{m.name}</h2>
                  <p className="mod-content__tagline">{m.tagline}</p>
                  <div className="divider" />
                  <p className="mod-content__intro">{m.intro}</p>

                  <div className="mod-benefits">
                    <h4 className="mod-benefits__heading">Key Benefits</h4>
                    <ul className="mod-benefits__list">
                      {m.benefits.map((b, j) => (
                        <li key={j} className="mod-benefits__item">
                          <span className="mod-benefits__dot" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mod-ideal">
                    <span className="mod-ideal__label">Ideal For</span>
                    <p className="mod-ideal__text">{m.ideal}</p>
                  </div>

                  <div className="mod-note">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                    {m.note}
                  </div>
                </div>
              </Reveal>

            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="section mod-cta">
        <div className="container">
          <Reveal>
            <div className="mod-cta__inner">
              <span className="section-label">Coming Soon</span>
              <h2 className="section-title">Founding Memberships Coming Soon</h2>
              <p className="section-subtitle">
                Be one of the first to experience all four modalities. Join the waitlist for priority access and exclusive founding member pricing.
              </p>
              <div className="mod-cta__actions">
                <Link to="/#waitlist" className="btn-primary">Join the Waitlist</Link>
                <Link to="/contact" className="btn-secondary">Ask a Question</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
