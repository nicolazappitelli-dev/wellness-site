export const SITE_ORIGIN = 'https://elevatecryoconcord.com'

/**
 * Per-route title and description. A single-page app serves one index.html to
 * every route, so without this each page would report the homepage's title and
 * compete with itself in search results.
 */
export const PAGE_META = {
  '/': {
    title: 'Cryotherapy in Concord, OH | Elevate Cryo & Wellness',
    description:
      'Whole body cryotherapy, redlight bed therapy, infrared sauna, and compression therapy in Concord, Ohio. Now open at 8019 Crile Road — request a call to get started.',
  },
  '/modalities': {
    title: 'Cryotherapy, Sauna & Redlight | Elevate Cryo Concord',
    description:
      'Explore our recovery modalities in Concord, Ohio: 3-minute whole body cryotherapy, 15-minute redlight bed therapy, 25-minute infrared sauna, and compression therapy.',
  },
  '/memberships': {
    title: 'Memberships & Pricing | Elevate Cryo Concord, OH',
    description:
      'Walk-in sessions, Everyday Wellness, and Unlimited memberships at Elevate Cryo in Concord, Ohio. Founding member pricing available now.',
  },
  '/contact': {
    title: 'Contact & Hours | Elevate Cryo Concord, OH',
    description:
      'Visit Elevate Cryo at 8019 Crile Road, Concord, OH 44077. Open Monday through Saturday. Call (440) 754-2912 or request a call back.',
  },
  '/policies': {
    title: 'Policies | Elevate Cryo Concord, OH',
    description:
      'Membership terms, cancellation, and health and safety policies for Elevate Cryo & Wellness in Concord, Ohio.',
  },
}

export const DEFAULT_META = PAGE_META['/']
