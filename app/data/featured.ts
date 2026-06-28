export type FeaturedCase = {
  /** Display number, e.g. "F·01". */
  num: string
  /** Slug → /work/<slug> (EN) and /fr/projets/<slug> (FR). Must match a content twin. */
  slug: string
  /** Path inside public/images/featured/; omit to render a placeholder card. */
  image?: string
}

// Display strings (title, problem, outcome, meta, alt) live in the i18n catalog
// under `data.featured.<slug>.*` in i18n/locales/{en,fr}.json — the single source
// of truth, so English and French stay in lockstep. This file holds only the
// structure and order of the three featured studies.
export const featured: readonly FeaturedCase[] = [
  { num: 'F·01', slug: 'databloom', image: '/images/featured/databloom.jpg' },
  { num: 'F·02', slug: 'wematch', image: '/images/featured/wematch.jpg' },
  { num: 'F·03', slug: 'thea', image: '/images/featured/thea.jpg' },
] as const
