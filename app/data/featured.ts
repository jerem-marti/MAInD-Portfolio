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
    slug: 'household-energy-interface',
    title: 'Household energy interface',
    problem:
      'Domestic energy use is invisible until the bill arrives, and another app is the wrong place to put it.',
    outcome:
      'A tangible, ambient interface now in continued use at the host institution after a six-week field trial.',
    meta: 'Tangible interface / Field study / 2025',
    alt: 'An oak block sitting on a kitchen counter with a column of softly backlit segments along one edge.',
  },
  {
    num: 'F·02',
    slug: 'ai-evaluation-framework',
    title: 'Evaluation framework for AI features',
    problem:
      'Product teams shipped AI features without a shared way to tell if they actually helped users complete real tasks.',
    outcome:
      'A repeatable evaluation method, piloted on a Swiss product team and adopted across two subsequent releases.',
    meta: 'Method / AI evaluation / 2025',
    alt: 'A printed evaluation rubric annotated by hand with yellow tape marking the disagreement rows.',
  },
  {
    num: 'F·03',
    slug: 'primary-sources-reader',
    title: 'Reading interface for primary sources',
    problem:
      'Researchers lost context every time they jumped from a source citation back to the surrounding argument.',
    outcome:
      "A linked-margin reading interface used by two research groups and a peer-reviewed publication's online edition.",
    meta: 'Editorial / Research tool / 2024',
    alt: 'A two-column reading layout with marginalia connected to inline citations by hairline lines.',
  },
] as const
