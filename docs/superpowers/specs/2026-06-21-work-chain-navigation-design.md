# Design: single ordered chain for "More work" prev/next

Date: 2026-06-21
Status: approved, ready for implementation plan

## Problem

The "More work" prev/next cards on each case study are hand authored in every
markdown file's frontmatter. Each study carries a full `prev:` block and a full
`next:` block that duplicate the neighbour's slug, title, image, and alt. This is a
manually maintained doubly linked list.

Consequences today:

- Reordering or inserting one study means editing up to four blocks by hand (the
  study's own `prev` and `next`, plus the two neighbours that point back at it).
- The same study is described with different copy depending on who links to it. For
  example `bereal` appears as "Re-coding BeReal, a dual-camera capture and image
  pipeline" from one neighbour and "BeReal-like web app, a REST API and image
  pipeline" from another.
- Orphans drift in unnoticed. `goldilocks-worlds` and `meeting-pond` point into the
  Index ring, but nothing in the ring points back at them.

## Goal

Make the chain easy to understand and to maintain: one source of truth for order, one
canonical card per study, no duplicated copy, no possible orphans.

## Decisions (settled during brainstorming)

1. **One chain.** Featured and Index studies live in a single ordered chain.
2. **Ring.** The chain wraps: the last study's Next loops to the first, the first
   study's Previous loops to the last. No dead ends.
3. **Membership: 13 studies.** The 3 featured then the 10 Index studies in their
   current Index order. `goldilocks-worlds` and `meeting-pond` are not in the chain
   and lose their "More work" section, consistent with being off the Index.
4. **Card copy lives in frontmatter (Approach A).** Each study owns one `card:` block.
   `workChain.ts` holds only the ordered slug list.

## The chain order

```
databloom → wematch → family-space → an-aura-of-words → elen → wama →
brushbuddy → human-loci → beau-rivage → uefa-female-coaches →
a-ta-dispo → bereal → cultural-trails → (wraps to databloom)
```

## Architecture and data flow

One ordered list of slugs is the single source of truth. Each study owns one canonical
`card` (title, optional image, alt). The page computes a study's two ring neighbours
from its position in the list, looks up their cards, and renders them.

```
workChain.ts  (ordered slugs)  ──┐
                                 ├─► [slug].vue computes prev/next slugs (wrap)
content/work/*.md (card: block) ─┘        └─► reads neighbours' card ─► <AdjacentCard>
```

- Reordering the chain: edit one array.
- Fixing a card's copy: edit one file.

## Components and changes

### New: `app/data/workChain.ts`

Exports the ordered slug list and a pure neighbour helper.

```ts
export const workChain = [
  'databloom',
  'wematch',
  'family-space',
  'an-aura-of-words',
  'elen',
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
 * Ring neighbours of a slug. Returns the previous and next slugs with wrap, or
 * null for each side when the slug is not part of the chain (off-chain pages such
 * as goldilocks-worlds and meeting-pond get no neighbours, hence no "More work").
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
```

The helper is pure, so it is trivially correct and could be unit tested later if a
test runner is ever added. None exists today, so we do not add one here.

### Changed: `content.config.ts`

Remove the `prev` and `next` object fields. Add an optional `card`:

```ts
card: z
  .object({
    title: z.string(),
    image: z.string().optional(),
    alt: z.string(),
  })
  .optional(),
```

### Changed: every `content/work/*.md` (15 files)

- Delete the `prev:` and `next:` blocks.
- Add one `card:` block (see the canonical card table in the appendix). The 13 chain
  studies need it. `goldilocks-worlds` and `meeting-pond` also get one, for two
  reasons: schema uniformity, and so a study can later join the chain by adding its
  slug to `workChain.ts` alone, with no risk of a chain member missing its card.
- 5 chain studies have no `adjacent.jpg`, so they omit `image`; the placeholder
  renders, exactly as today.

### Changed: `app/pages/work/[slug].vue`

- Import `workChain` and `chainNeighbours` from `~/data/workChain`.
- Resolve neighbour slugs from the current slug.
- Add one `useAsyncData` that loads all studies and maps `slug → card`.
- Replace the `present` flag of the "More work" section and the template references.

Setup sketch:

```ts
import { chainNeighbours } from '~/data/workChain'

const slug = route.params.slug as string
const { prev, next } = chainNeighbours(slug)

const { data: cards } = await useAsyncData('work-cards', () =>
  queryCollection('work').all(),
)
const cardFor = (s: string | null) => {
  if (!s) return null
  const doc = cards.value?.find((d) => d.path === `/work/${s}`)
  return doc?.card ? { slug: s, ...doc.card } : null
}
const prevCard = computed(() => cardFor(prev))
const nextCard = computed(() => cardFor(next))
```

Section gating in the `sections` computed:

```ts
{ id: 'next', label: 'More work', present: !!(prevCard.value || nextCard.value) }
```

Template (replaces lines that referenced `study.prev` / `study.next`):

```vue
<section v-if="prevCard || nextCard" id="next" …>
  <UiSectionHead :num="numFor('next')" label="More work" class="mb-10 md:mb-16" />
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
    <WorkAdjacentCard v-if="prevCard" dir="prev" :item="prevCard" />
    <WorkAdjacentCard v-if="nextCard" dir="next" :item="nextCard" />
  </div>
</section>
```

Note on the `select` optimisation: `queryCollection('work').all()` returns all 15
small docs at build. A `.select('path', 'card')` narrowing is a possible optimisation,
but `.all()` is the established pattern in this file and is robust, so the plan uses
`.all()`. Confirm at implementation time whether the project prefers `select`.

### Unchanged: `app/components/work/AdjacentCard.vue`

It already accepts `{ slug, title, image?, alt }`. We pass `{ slug: neighbourSlug,
...neighbourCard }`, so no change is needed.

## Behaviour changes (intended)

- `goldilocks-worlds` and `meeting-pond` lose their "More work" section. Their other
  sections renumber down by one automatically, because section numbers are already
  derived contiguously from present sections.
- The ring closes: `cultural-trails` Next is `databloom`, and `databloom` Previous is
  `cultural-trails`. Previously the featured trio and the Index ten were two separate
  rings.
- Drifted neighbour copy is normalised to one card per study.

## Edge cases

- **Off-chain slug.** `chainNeighbours` returns `{ prev: null, next: null }`, so the
  section is absent. Covers `goldilocks-worlds`, `meeting-pond`, and any future page
  not added to the chain.
- **Ring of length n ≥ 2.** Every chain member has two distinct neighbours (n = 13),
  so chain members always render both cards.
- **Missing card on a chain member.** Prevented by adding `card` to all studies. If
  one were missing, `cardFor` returns null and that side simply does not render.

## Verification

No unit test runner exists in the project. Verify by build and inspection:

1. `npm run generate` succeeds (the Zod schema validates all 15 files).
2. Spot-check rendered HTML:
   - `dist/work/databloom/index.html`: Previous card is `cultural-trails`, Next is
     `wematch`.
   - `dist/work/cultural-trails/index.html`: Next wraps to `databloom`.
   - `dist/work/goldilocks-worlds/index.html`: no "More work" section, no `#next`.
3. Confirm the 13 case studies still appear in the sitemap.

## Out of scope

- No test harness is added.
- No change to `featured.ts` or `projects.ts`. The chain order is maintained
  independently in `workChain.ts` (it happens to match featured order then Index
  order today, but the two are not coupled in code).
- No change to `AdjacentCard.vue` markup or styling.

## Appendix: canonical card table

De-drifted copy harvested from the current prev/next blocks, one card per study. Image
is included only where `public/images/work/<slug>/adjacent.jpg` exists.

### In the chain (13)

1. **databloom**
   - title: `DataBloom — making the energy impact of digital usage visible`
   - image: `/images/work/databloom/adjacent.jpg`
   - alt: `The DataBloom flower: ultramarine felt petals on a green segmented stem in a small terracotta pot, on a white studio backdrop.`

2. **wematch**
   - title: `WeMatch — an AX matching service for the WeRoad world`
   - image: `/images/work/wematch/adjacent.jpg`
   - alt: `WeMatch title card: 'WeMatch finds your group before you find your trip' in coral and ink on a soft white-to-pink gradient, with the round Matchy agent character.`

3. **family-space**
   - title: `UBS Family Space — a family's shared place to manage money`
   - image: `/images/work/family-space/adjacent.jpg`
   - alt: `UBS Family Space concept: two phone screens on a soft red gradient, a parent's hub for the child's analytics, limits, and goals, and the child's savings-goal screen.`

4. **an-aura-of-words**
   - title: `An Aura of Words — Lugano's parks, told by their reviews`
   - image: `/images/work/an-aura-of-words/adjacent.jpg`
   - alt: `Lugano's five parks shown on a map, each as a colour-blended organic aura sized by review volume.`

5. **elen**
   - title: `ELEN — a speculative camera for invisible wireless presences`
   - image: `/images/work/elen/adjacent.jpg`
   - alt: `ELEN, a handheld camera with a translucent orange body and twin white handles, lit on a grey studio backdrop, its deep-blue screen showing through the plexiglass.`

6. **wama**
   - title: `Wama — machine learning as a sink-side witness`
   - image: `/images/work/wama/adjacent.jpg`
   - alt: `Wama's built sink rig at an angle: a tap pouring into a clear basin, the phone in its laser-cut holder showing the character.`

7. **brushbuddy**
   - title: `BrushBuddy — a monster cube that guides two-minute toothbrushing`
   - image: `/images/work/brushbuddy/adjacent.jpg`
   - alt: `A hand lifts the toothbrush from the dock on top of the BrushBuddy cube, which has a worried yellow monster face.`

8. **human-loci**
   - title: `Human Loci — a synesthetic listening object`
   - image: `/images/work/human-loci/adjacent.jpg`
   - alt: `Human Loci: a transparent acrylic listening box with three plaster disks for a park, a marina, and a train station.`

9. **beau-rivage** (no image)
   - title: `Beau-Rivage Eco-Redesign — a 95% lighter luxury hotel site`
   - alt: `The redesigned Beau-Rivage Palace site: restrained, elegant, far lighter than the original.`

10. **uefa-female-coaches** (no image)
    - title: `Why Not You? — the UEFA female coaches campaign`
    - alt: `The Why Not You? campaign: bold display typography over a female coach, with the line Lead Your Passion, Shape the Game.`

11. **a-ta-dispo** (no image)
    - title: `À ta Dispo — matching event volunteers with organizers`
    - alt: `À ta Dispo: a matchmaking concept connecting festival volunteers with event organizers.`

12. **bereal** (no image)
    - title: `Re-coding BeReal — a dual-camera capture and image pipeline`
    - alt: `A BeReal-like capture screen: front and back cameras firing simultaneously, the rear photo full-frame with the front-camera selfie inset.`

13. **cultural-trails** (no image)
    - title: `Cultural Trails — a full-stack heritage walking app`
    - alt: `Mobile screens for a gamified walking-trails app, showing a map, points of interest with quizzes, and audio guide controls.`

### Off the chain, card added for uniformity (2)

14. **goldilocks-worlds** (no image)
    - title: `Goldilocks Worlds — making exoplanet habitability legible`
    - alt: `Dark, space-like data-story scene: an exoplanet plot with a habitable-zone constraint band and an explanation sidebar.`

15. **meeting-pond** (no image)
    - title: `Meeting Pond — connected light objects for distant presence`
    - alt: `A 32×32 LED matrix mounted in a frame, displaying ripples spreading across a luminous surface.`
