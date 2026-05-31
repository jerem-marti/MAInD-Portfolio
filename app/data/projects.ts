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
  'Brand / Editorial',
  'AI evaluation',
  'Hardware',
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
  /** Path under public/images/index/ for the desktop hover preview. Omit until uploaded. */
  preview?: string
  /** Real alt text for the hover-preview image. Required even before Phase 5 images land. */
  alt?: string
}

export const projects: readonly IndexRow[] = [
  {
    num: '01',
    title: 'Human Loci',
    tags: ['Tangible interface', 'Prototyping', 'Hardware'],
    year: '2025',
    href: '/work/human-loci',
    alt: 'Compact listening box with three pigmented plaster disks beside it, on a wooden surface.',
  },
  {
    num: '02',
    title: 'Wama',
    tags: ['AI evaluation', 'Interaction design', 'Prototyping'],
    year: '2026',
    href: '/work/wama',
    alt: 'Phone mounted next to a kitchen sink, showing a small animated character on the screen during dishwashing.',
  },
  {
    num: '03',
    title: 'Goldilocks Worlds',
    tags: ['Front-end build', 'Information architecture', 'UX writing'],
    year: '2025',
    href: '/work/goldilocks-worlds',
    alt: 'Browser-based data story: a scatter plot of candidate exoplanets with annotated habitability filters in a sidebar.',
  },
  {
    num: '04',
    title: 'Meeting Pond',
    tags: ['Tangible interface', 'Prototyping', 'Hardware'],
    year: '2026',
    href: '/work/meeting-pond',
    alt: 'A 32×32 LED matrix mounted in a frame, displaying ripples spreading across a luminous surface.',
  },
  {
    num: '05',
    title: 'E-banking Family Space',
    tags: ['UX research', 'Interaction design', 'Information architecture'],
    year: '2025',
    href: '/work/family-space',
    alt: 'Mobile screen mockups of a family banking concept: parent overview, child analytics, savings goals.',
  },
  {
    num: '06',
    title: 'BrushBuddy',
    tags: ['Tangible interface', 'Prototyping', 'Hardware'],
    year: '2026',
    href: '/work/brushbuddy',
    alt: '15cm cube with a monster face, two googly eyes, and a row of softly lit teeth in the mouth.',
  },
  {
    num: '07',
    title: 'Pong Game',
    tags: ['Front-end build', 'Prototyping'],
    year: '2025',
    href: 'https://github.com/jerem-marti/MAInD-Creative_Coding_Foundation-2025',
    alt: 'Browser remake of the 1972 Pong game: two paddles, a ball, retro typography, score and player avatars at top.',
  },
  {
    num: '08',
    title: 'UEFA Female Coaches Campaign',
    tags: ['UX research', 'Interaction design', 'UX writing'],
    year: '2025',
    href: '/work/uefa-female-coaches',
    alt: 'Landing page mockup for a campaign encouraging women into football coaching, with scrollytelling testimonials.',
  },
  {
    num: '09',
    title: 'Cultural Trails Web App',
    tags: ['Front-end build', 'Interaction design', 'Accessibility'],
    year: '2024',
    href: '/work/cultural-trails',
    alt: 'Mobile screens for a gamified walking-trails app, showing a map, points of interest with quizzes, audio guide controls.',
  },
  {
    num: '10',
    title: 'BeReal Like Web App',
    tags: ['Front-end build', 'Prototyping'],
    year: '2024',
    href: 'https://github.com/HEIG-COMEM/HEIG-VD_DevMobil_REST',
    alt: 'Mobile capture screen for a BeReal-like prototype: time-bounded photo capture with the back camera.',
  },
] as const
