/**
 * Controlled vocabulary for Index list tags (CLAUDE.md). Apply consistently;
 * keep each row to 2-4 tags from this set.
 */
export const indexTags = [
  'UX research',
  'Interaction design',
  'Prototyping',
  'Information architecture',
  'UX writing',
  'Design systems',
  'Accessibility',
  'Tangible interface',
  'Front-end build',
  'Back-end build',
  'Brand / Editorial',
  'AI evaluation',
  'Machine learning',
  'Hardware',
  'Sustainability',
  'Business strategy',
  'Marketing strategy',
  'Design thinking',
  'Scrollytelling',
  'Data visualization',
  'Small data',
  'DevOps',
] as const

export type IndexTag = (typeof indexTags)[number]

export type IndexRow = {
  num: string
  title: string
  /** 2-4 tags from `indexTags`. TypeScript enforces vocabulary membership. */
  tags: readonly IndexTag[]
  year: string
  /** Internal route (e.g. /work/<slug>) or external URL. Omit for non-linked rows. */
  href?: string
  /** Path under public/images/index/ for the preview image. Omit until uploaded. */
  preview?: string
  /** Real alt text for the preview image. Required even before Phase 5 images land. */
  alt?: string
}

/**
 * One flat Index in true chronological order, newest first. No grouping: rather
 * than impose a single taxonomy (school, capability, medium), the page lets the
 * visitor pick a discipline filter on top of this order (see index.vue). Rows
 * are numbered 01-10 in display order.
 */
export const projects: readonly IndexRow[] = [
  {
    num: '01',
    title: 'An Aura of Words',
    tags: ['Scrollytelling', 'Data visualization', 'Front-end build', 'Small data'],
    year: '2026',
    href: '/work/an-aura-of-words',
    preview: '/images/index/an-aura-of-words.jpg',
    alt: "Scrollytelling data story: Google Reviews of Lugano's parks encoded into colour-weighted organic 'aura' shapes.",
  },
  {
    num: '02',
    title: 'ELEN',
    tags: ['Prototyping', 'Hardware', 'Front-end build', 'DevOps'],
    year: '2026',
    href: '/work/elen',
    preview: '/images/index/elen.jpg',
    alt: 'ELEN, a handheld speculative camera: a detail of its translucent orange body, white handle, control button, and antenna on a grey backdrop.',
  },
  {
    num: '03',
    title: 'Wama',
    tags: ['Machine learning', 'Interaction design', 'Prototyping', 'Front-end build'],
    year: '2026',
    href: '/work/wama',
    alt: 'Phone mounted next to a kitchen sink, showing a small animated character on the screen during dishwashing.',
  },
  {
    num: '04',
    title: 'BrushBuddy',
    tags: ['Tangible interface', 'Prototyping', 'Hardware'],
    year: '2026',
    href: '/work/brushbuddy',
    alt: '15cm cube with a monster face, two googly eyes, and a row of softly lit teeth in the mouth.',
  },
  {
    num: '05',
    title: 'Human Loci',
    tags: ['Tangible interface', 'Prototyping', 'Hardware'],
    year: '2025',
    href: '/work/human-loci',
    alt: 'Compact listening box with three pigmented plaster disks beside it, on a wooden surface.',
  },
  {
    num: '06',
    title: 'Beau-Rivage Eco-Redesign',
    tags: ['Sustainability', 'Front-end build', 'UX research'],
    year: '2025',
    href: '/work/beau-rivage',
    alt: 'A redesigned, far lighter luxury-hotel homepage for the Beau-Rivage Palace, with optimised imagery.',
  },
  {
    num: '07',
    title: 'UEFA Female Coaches Campaign',
    tags: ['Design thinking', 'Brand / Editorial', 'Marketing strategy', 'Scrollytelling'],
    year: '2025',
    href: '/work/uefa-female-coaches',
    alt: 'Landing page mockup for a campaign encouraging women into football coaching, with scrollytelling testimonials.',
  },
  {
    num: '08',
    title: 'À ta Dispo',
    tags: ['Business strategy', 'UX research', 'Marketing strategy'],
    year: '2025',
    href: '/work/a-ta-dispo',
    alt: 'À ta Dispo concept: a matchmaking app connecting volunteers with associations, NGOs, and events, with recognition badges.',
  },
  {
    num: '09',
    title: 'BeReal Like Web App',
    tags: ['Back-end build', 'Front-end build', 'Prototyping'],
    year: '2024',
    href: '/work/bereal',
    alt: 'Mobile capture screen for a BeReal-like prototype: simultaneous front and back camera capture.',
  },
  {
    num: '10',
    title: 'Cultural Trails Web App',
    tags: ['Back-end build', 'Front-end build', 'Information architecture'],
    year: '2024',
    href: '/work/cultural-trails',
    alt: 'Mobile screens for a gamified walking-trails app, showing a map, points of interest with quizzes, audio guide controls.',
  },
] as const
