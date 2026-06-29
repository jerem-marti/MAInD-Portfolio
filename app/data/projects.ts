/**
 * Controlled vocabulary for Index list tags (CLAUDE.md). Apply consistently;
 * keep each row to 2-4 tags from this set. Tag display labels (English and
 * French) live in the i18n catalog under `tags.*`; these keys are the canonical
 * identifiers TypeScript enforces.
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
  'Front-end',
  'Back-end',
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
  /** 2-4 tags from `indexTags`. TypeScript enforces vocabulary membership. */
  tags: readonly IndexTag[]
  year: string
  /** Internal route (e.g. /work/<slug>) or external URL. Omit for non-linked rows. */
  href?: string
  /** Path under public/images/index/ for the preview image. Omit until uploaded. */
  preview?: string
}

/**
 * One flat Index in true chronological order, newest first. No grouping: rather
 * than impose a single taxonomy (school, capability, medium), the page lets the
 * visitor pick a discipline filter on top of this order (see index.vue). Rows
 * are numbered 01-12 in display order.
 *
 * Display strings (title, alt) live in the i18n catalog under
 * `data.projects.<slug>.*` in i18n/locales/{en,fr}.json — the single source of
 * truth, keyed by the case-study slug from `href`. This file holds only structure.
 */
export const projects: readonly IndexRow[] = [
  {
    num: '01',
    tags: ['Scrollytelling', 'Data visualization', 'Front-end', 'Small data'],
    year: '2026',
    href: '/work/an-aura-of-words',
    preview: '/images/index/an-aura-of-words.jpg',
  },
  {
    num: '02',
    tags: ['Prototyping', 'Hardware', 'Front-end', 'DevOps'],
    year: '2026',
    href: '/work/elen',
    preview: '/images/index/elen.jpg',
  },
  {
    num: '03',
    tags: ['Interaction design', 'Prototyping', 'Hardware', 'Front-end'],
    year: '2026',
    href: '/work/meeting-pond',
    preview: '/images/index/meeting-pond.jpg',
  },
  {
    num: '04',
    tags: ['Machine learning', 'Interaction design', 'Prototyping', 'Front-end'],
    year: '2026',
    href: '/work/wama',
    preview: '/images/index/wama.jpg',
  },
  {
    num: '05',
    tags: ['Tangible interface', 'Prototyping', 'Hardware'],
    year: '2026',
    href: '/work/brushbuddy',
    preview: '/images/index/brushbuddy.jpg',
  },
  {
    num: '06',
    tags: ['UX research', 'Information architecture', 'Interaction design'],
    year: '2025',
    href: '/work/family-space',
    preview: '/images/index/family-space.jpg',
  },
  {
    num: '07',
    tags: ['Tangible interface', 'Prototyping', 'Hardware'],
    year: '2025',
    href: '/work/human-loci',
    preview: '/images/index/human-loci.jpg',
  },
  {
    num: '08',
    tags: ['Sustainability', 'Front-end', 'UX research'],
    year: '2025',
    href: '/work/beau-rivage',
    preview: '/images/index/beau-rivage.jpg',
  },
  {
    num: '09',
    tags: ['Design thinking', 'Brand / Editorial', 'Marketing strategy', 'Scrollytelling'],
    year: '2025',
    href: '/work/uefa-female-coaches',
    preview: '/images/index/uefa-female-coaches.jpg',
  },
  {
    num: '10',
    tags: ['Business strategy', 'UX research', 'Marketing strategy'],
    year: '2025',
    href: '/work/a-ta-dispo',
    preview: '/images/index/a-ta-dispo.jpg',
  },
  {
    num: '11',
    tags: ['Back-end', 'Front-end', 'Prototyping'],
    year: '2024',
    href: '/work/bereal',
    preview: '/images/index/bereal.jpg',
  },
  {
    num: '12',
    tags: ['Back-end', 'Front-end', 'Information architecture'],
    year: '2024',
    href: '/work/cultural-trails',
    preview: '/images/index/cultural-trails.jpg',
  },
] as const
