export type FeaturedCase = {
  /** Display number, e.g. "F·01". */
  num: string
  /** Slug used by `/work/[slug]`. Must match a content/work/<slug>.md file once Phase 4b lands. */
  slug: string
  title: string
  problem: string
  outcome: string
  meta: string
  /** Path inside public/images/featured/. Filled in Phase 5; null renders a placeholder card. */
  image?: string
  /** Real alt text for the card hero. Required even when image is null. */
  alt: string
}

export const featured: readonly FeaturedCase[] = [
  {
    num: 'F·01',
    slug: 'databloom',
    title: 'DataBloom',
    problem:
      'Domestic digital usage carries a large invisible energy cost. Another app is the wrong place to put it.',
    outcome:
      "A tangible flower whose stem wilts with the household's weekly digital footprint. Validated in user testing and published by the MEI research lab.",
    meta: 'Tangible interface / Bachelor thesis / 2025',
    alt: "DataBloom prototype: an artificial flower with a green stem and ultramarine petals in a terracotta pot, on a kitchen counter, an LED at the flower's centre.",
  },
  {
    num: 'F·02',
    slug: 'wematch',
    title: 'WeMatch',
    problem:
      "Group travel works when the group fits. Booking strangers by trip and date doesn't predict that.",
    outcome:
      'An AX matching service for the WeRoad world, shown through behavior rather than labeled as AI. Delivered as an end-to-end design presentation, a testable agent, and a one-page editorial story.',
    meta: 'AX design / Service narrative / 2026',
    alt: 'WeMatch one-pager: an editorial web layout with a Sofia character mark above a large opening quote, restrained typography, generous white space.',
  },
  {
    num: 'F·03',
    slug: 'elen',
    title: 'ELEN',
    problem:
      "What if a camera could photograph the wireless infrastructure we live inside? Wi-Fi and Bluetooth signals fill rooms with presences we can't perceive.",
    outcome:
      "A handheld camera that turns detected Wi-Fi and Bluetooth signals into spectral entities drifting through a live fluid simulation. Designed for Marco De Mutiis's Shadow Creatures brief at Fotomuseum Winterthur, then selected for Milan Design Week.",
    meta: 'Speculative design / Exhibition piece / 2026',
    alt: 'ELEN device: a handheld camera with orange accents and plexiglass panels, screen showing live video overlaid with spectral fluid entities.',
  },
] as const
