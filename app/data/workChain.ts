/**
 * The single ordered chain behind the "More work" prev/next on case studies.
 * Order is the only source of truth here; each study's display card (title,
 * image, alt) lives in its own markdown frontmatter under `card:`.
 *
 * The chain is a ring: the last slug's `next` wraps to the first, and the first
 * slug's `prev` wraps to the last. Slugs not listed here (e.g. goldilocks-worlds)
 * are off-chain and render no "More work" section.
 *
 * To reorder or add a study: edit this array (and ensure the study has a `card:`
 * block in content/work/<slug>.md). Nothing else needs touching.
 */
export const workChain = [
  'databloom',
  'wematch',
  'family-space',
  'an-aura-of-words',
  'elen',
  'meeting-pond',
  'wama',
  'brushbuddy',
  'human-loci',
  'beau-rivage',
  'uefa-female-coaches',
  'a-ta-dispo',
  'bereal',
  'cultural-trails',
] as const

export type WorkSlug = (typeof workChain)[number]

/**
 * Ring neighbours of a slug, with wrap. Returns both null when the slug is not
 * part of the chain.
 */
export function chainNeighbours(slug: string): {
  prev: WorkSlug | null
  next: WorkSlug | null
} {
  const i = workChain.indexOf(slug as WorkSlug)
  if (i === -1) return { prev: null, next: null }
  const n = workChain.length
  return {
    prev: workChain[(i - 1 + n) % n]!,
    next: workChain[(i + 1) % n]!,
  }
}
