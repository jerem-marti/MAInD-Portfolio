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
 * are numbered 01-11 in display order.
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
    title: 'Meeting Pond',
    tags: ['Interaction design', 'Prototyping', 'Hardware', 'Front-end build'],
    year: '2026',
    href: '/work/meeting-pond',
    preview: '/images/index/meeting-pond.jpg',
    alt: 'A single Meeting Pond unit glowing green in a dark room, ripples spreading across its 32×32 LED grid.',
  },
  {
    num: '04',
    title: 'Wama',
    tags: ['Machine learning', 'Interaction design', 'Prototyping', 'Front-end build'],
    year: '2026',
    href: '/work/wama',
    preview: '/images/index/wama.jpg',
    alt: 'Wama in its laser-cut holder at a built sink rig, the phone showing a small blue cloud character.',
  },
  {
    num: '05',
    title: 'BrushBuddy',
    tags: ['Tangible interface', 'Prototyping', 'Hardware'],
    year: '2026',
    href: '/work/brushbuddy',
    preview: '/images/index/brushbuddy.jpg',
    alt: 'Front view of the BrushBuddy cube: a yellow monster face with raised brows, googly eyes and a mouth of grey teeth, the toothbrush standing straight up from the dock.',
  },
  {
    num: '06',
    title: 'Human Loci',
    tags: ['Tangible interface', 'Prototyping', 'Hardware'],
    year: '2025',
    href: '/work/human-loci',
    preview: '/images/index/human-loci.jpg',
    alt: 'The Human Loci listening box: a transparent acrylic box with a record-style tonearm, three-quarter view on a grey backdrop.',
  },
  {
    num: '07',
    title: 'Beau-Rivage Eco-Redesign',
    tags: ['Sustainability', 'Front-end build', 'UX research'],
    year: '2025',
    href: '/work/beau-rivage',
    preview: '/images/index/beau-rivage.jpg',
    alt: 'The redesigned Beau-Rivage Palace homepage on mobile: the shell logo, a Réserver button and the centred wordmark over fine gold lines, far lighter than the original.',
  },
  {
    num: '08',
    title: 'UEFA Female Coaches Campaign',
    tags: ['Design thinking', 'Brand / Editorial', 'Marketing strategy', 'Scrollytelling'],
    year: '2025',
    href: '/work/uefa-female-coaches',
    preview: '/images/index/uefa-female-coaches.jpg',
    alt: 'The Why Not You? awareness poster: nine portraits of real female coaches around a central mirror, under the banner Coach, Woman, Leader.',
  },
  {
    num: '09',
    title: 'À ta Dispo',
    tags: ['Business strategy', 'UX research', 'Marketing strategy'],
    year: '2025',
    href: '/work/a-ta-dispo',
    preview: '/images/index/a-ta-dispo.jpg',
    alt: "À ta Dispo's hand-drawn logo: a coral wordmark on a pink sticker shape, the identity for the volunteer-matchmaking startup.",
  },
  {
    num: '10',
    title: 'BeReal Like Web App',
    tags: ['Back-end build', 'Front-end build', 'Prototyping'],
    year: '2024',
    href: '/work/bereal',
    preview: '/images/index/bereal.jpg',
    alt: 'A BeReal-like capture screen on a dark mobile interface: the rear photo full-frame with the front-camera selfie inset, ready to send.',
  },
  {
    num: '11',
    title: 'Cultural Trails Web App',
    tags: ['Back-end build', 'Front-end build', 'Information architecture'],
    year: '2024',
    href: '/work/cultural-trails',
    preview: '/images/index/cultural-trails.jpg',
    alt: 'The Sentiers culturels explore map on mobile: trails shown as pins across the Lausanne and Lavaux shore with thématique, critères and rayon filters, standing on the project\'s green, peach and blue trail ribbon.',
  },
] as const
