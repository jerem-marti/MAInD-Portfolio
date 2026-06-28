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
    image: '/images/featured/databloom.jpg',
    alt: 'The DataBloom flower: ultramarine felt petals on a green segmented stem in a small terracotta pot, standing on a white studio backdrop.',
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
    image: '/images/featured/wematch.jpg',
    alt: "WeMatch title card: the line 'WeMatch finds your group before you find your trip' set in coral and ink on a soft white-to-pink gradient, beside the round Matchy agent character.",
  },
  {
    num: 'F·03',
    slug: 'thea',
    title: 'Thea',
    problem:
      "Living with a severe allergy means a trigger you cannot see and a reaction that lands before you can act. Another tracker only adds to the anxiety.",
    outcome:
      'A wrist-worn calm sense of your allergen load nearing your limit, carried by an ambient gauge, a haptic rhythm, and an acknowledge-gated voice. Built as a working prototype on an Arduino UNO Q, with a co-design protocol.',
    meta: 'Multimodal wearable / SUPSI master / 2026',
    image: '/images/featured/thea.jpg',
    alt: 'Thea featured card: the pale wrist cuff suspended in a lattice of orange cords against a cobalt sky with a sprig of wildflower, its ring gauge glowing.',
  },
] as const
