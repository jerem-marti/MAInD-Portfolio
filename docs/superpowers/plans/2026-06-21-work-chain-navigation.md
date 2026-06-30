# Work Chain Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hand-authored per-file `prev`/`next` frontmatter with a single ordered chain (`app/data/workChain.ts`) plus one canonical `card` per study, so the "More work" prev/next is derived, de-duplicated, and impossible to orphan.

**Architecture:** One ordered slug list is the single source of truth for order. Each study owns one `card` block (title, optional image, alt) in its frontmatter. The case-study page computes a study's two ring neighbours from its position in the list, looks up their cards, and renders them. The chain wraps (ring): the last study links to the first and vice versa.

**Tech Stack:** Nuxt 4, Vue 3 `<script setup>`, @nuxt/content v3 (`queryCollection`), Zod schema in `content.config.ts`, static SSG via `nuxt generate`.

## Global Constraints

- Static build must pass clean: `npm run generate` (output lands in `.output/public/`).
- If the build fails with `UNABLE_TO_VERIFY_LEAF_SIGNATURE` (corporate TLS, fonts download at build), re-run prefixed: `NODE_OPTIONS=--use-system-ca npm run generate`.
- TypeScript is `strict: true` — no `any`, narrow before use.
- Card copy is **verbatim** from this plan (harvested and de-drifted from the spec). British spelling in prose; card titles keep their em-dash (they are titles/chrome, not body copy).
- No new dependencies. No test runner is added (none exists); verification is build + rendered-HTML inspection, plus a throwaway Node check for the pure helper.
- Commits: **do not** add `Co-Authored-By: Claude` trailers (user preference).
- The chain order is exactly these 13 slugs: `databloom, wematch, family-space, an-aura-of-words, elen, wama, brushbuddy, human-loci, beau-rivage, uefa-female-coaches, a-ta-dispo, bereal, cultural-trails`.

## Before you start

The repo is on `main`. Create a feature branch first:

```bash
git switch -c feat/work-chain-nav
```

## File Structure

- **Create** `app/data/workChain.ts` — ordered slug list + pure `chainNeighbours` helper. Single responsibility: chain order and neighbour math.
- **Modify** `content.config.ts` — drop `prev`/`next` from the schema, add optional `card`.
- **Modify** all 15 `content/work/*.md` — delete `prev:`/`next:` blocks, add one `card:` block.
- **Modify** `app/pages/work/[slug].vue` — import the helper, resolve neighbour cards, gate and render the "More work" section from them.
- **Unchanged** `app/components/work/AdjacentCard.vue` — already accepts `{ slug, title, image?, alt }`.

---

### Task 1: Create the chain data module

**Files:**
- Create: `app/data/workChain.ts`

**Interfaces:**
- Produces: `workChain: readonly WorkSlug[]` and `chainNeighbours(slug: string): { prev: WorkSlug | null; next: WorkSlug | null }`. `WorkSlug` is the union of the 13 slugs. `chainNeighbours` returns ring neighbours (wraps) for chain members, and `{ prev: null, next: null }` for any slug not in the chain.

- [ ] **Step 1: Write the module**

Create `app/data/workChain.ts`:

```ts
/**
 * The single ordered chain behind the "More work" prev/next on case studies.
 * Order is the only source of truth here; each study's display card (title,
 * image, alt) lives in its own markdown frontmatter under `card:`.
 *
 * The chain is a ring: the last slug's `next` wraps to the first, and the first
 * slug's `prev` wraps to the last. Slugs not listed here (e.g. goldilocks-worlds,
 * meeting-pond) are off-chain and render no "More work" section.
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
```

- [ ] **Step 2: Verify the helper (throwaway Node check)**

Node 24 strips TS types natively, so the module runs without a build. From the repo root:

```bash
node --input-type=module -e "import('./app/data/workChain.ts').then(m => console.log(JSON.stringify({ db: m.chainNeighbours('databloom'), ct: m.chainNeighbours('cultural-trails'), gw: m.chainNeighbours('goldilocks-worlds'), len: m.workChain.length })))"
```

Expected output (exactly):

```
{"db":{"prev":"cultural-trails","next":"wematch"},"ct":{"prev":"bereal","next":"databloom"},"gw":{"prev":null,"next":null},"len":13}
```

This confirms: a mid-chain study's neighbours, the wrap (`cultural-trails` → `databloom`), the off-chain null case, and the count of 13.

- [ ] **Step 3: Commit**

```bash
git add app/data/workChain.ts
git commit -m "feat(work): add single ordered chain for case-study navigation"
```

---

### Task 2: Update the content schema

**Files:**
- Modify: `content.config.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: each `work` document gains an optional `card?: { title: string; image?: string; alt: string }`; `prev`/`next` are no longer part of the schema.

- [ ] **Step 1: Remove `prev` and `next`, add `card`**

In `content.config.ts`, delete the entire `prev` block and the entire `next` block (the two `z.object({...}).optional()` definitions for `prev:` and `next:` near the end of the schema, lines ~112-128). In their place add:

```ts
        // One canonical card per study, used by the "More work" prev/next on
        // neighbouring pages. Order lives in app/data/workChain.ts. `image` is
        // omitted for studies without a public/images/work/<slug>/adjacent.jpg.
        card: z
          .object({
            title: z.string(),
            image: z.string().optional(),
            alt: z.string(),
          })
          .optional(),
```

- [ ] **Step 2: Verify the schema still builds**

```bash
npm run generate
```

Expected: build succeeds. (Markdown files still contain `prev:`/`next:` keys at this point; Zod silently ignores unknown keys, so the build stays green. The "More work" section is temporarily hidden because the page still reads `study.prev`/`study.next`, which are now absent — this is fixed in Task 4.)

- [ ] **Step 3: Commit**

```bash
git add content.config.ts
git commit -m "feat(work): replace prev/next schema fields with canonical card"
```

---

### Task 3: Swap prev/next blocks for card blocks in all studies

**Files:**
- Modify: `content/work/databloom.md`, `wematch.md`, `family-space.md`, `an-aura-of-words.md`, `elen.md`, `wama.md`, `brushbuddy.md`, `human-loci.md`, `beau-rivage.md`, `uefa-female-coaches.md`, `a-ta-dispo.md`, `bereal.md`, `cultural-trails.md`, `goldilocks-worlds.md`, `meeting-pond.md`

**Interfaces:**
- Consumes: the `card` schema field from Task 2.
- Produces: every study has a `card:` block; no study has `prev:`/`next:`.

For each file: **delete the `prev:` block and the `next:` block** from the frontmatter (they sit together near the end of the frontmatter; the prev `slug:` lines are around the line numbers noted below) and **add the `card:` block** shown for that file (placing it where prev/next were, still inside the `---` frontmatter). Strings are double-quoted to match the existing style.

- [ ] **Step 1: Apply card blocks to the 13 chain studies**

`content/work/databloom.md` (prev/next ~241-251):
```yaml
card:
  title: "DataBloom — making the energy impact of digital usage visible"
  image: "/images/work/databloom/adjacent.jpg"
  alt: "The DataBloom flower: ultramarine felt petals on a green segmented stem in a small terracotta pot, on a white studio backdrop."
```

`content/work/wematch.md` (prev/next ~176-186):
```yaml
card:
  title: "WeMatch — an AX matching service for the WeRoad world"
  image: "/images/work/wematch/adjacent.jpg"
  alt: "WeMatch title card: 'WeMatch finds your group before you find your trip' in coral and ink on a soft white-to-pink gradient, with the round Matchy agent character."
```

`content/work/family-space.md` (prev/next ~192-202):
```yaml
card:
  title: "UBS Family Space — a family's shared place to manage money"
  image: "/images/work/family-space/adjacent.jpg"
  alt: "UBS Family Space concept: two phone screens on a soft red gradient, a parent's hub for the child's analytics, limits, and goals, and the child's savings-goal screen."
```

`content/work/an-aura-of-words.md` (prev/next ~181-191):
```yaml
card:
  title: "An Aura of Words — Lugano's parks, told by their reviews"
  image: "/images/work/an-aura-of-words/adjacent.jpg"
  alt: "Lugano's five parks shown on a map, each as a colour-blended organic aura sized by review volume."
```

`content/work/elen.md` (prev/next ~176-184):
```yaml
card:
  title: "ELEN — a speculative camera for invisible wireless presences"
  image: "/images/work/elen/adjacent.jpg"
  alt: "ELEN, a handheld camera with a translucent orange body and twin white handles, lit on a grey studio backdrop, its deep-blue screen showing through the plexiglass."
```

`content/work/wama.md` (prev/next ~160-170):
```yaml
card:
  title: "Wama — machine learning as a sink-side witness"
  image: "/images/work/wama/adjacent.jpg"
  alt: "Wama's built sink rig at an angle: a tap pouring into a clear basin, the phone in its laser-cut holder showing the character."
```

`content/work/brushbuddy.md` (prev/next ~153-162):
```yaml
card:
  title: "BrushBuddy — a monster cube that guides two-minute toothbrushing"
  image: "/images/work/brushbuddy/adjacent.jpg"
  alt: "A hand lifts the toothbrush from the dock on top of the BrushBuddy cube, which has a worried yellow monster face."
```

`content/work/human-loci.md` (prev/next ~200-209):
```yaml
card:
  title: "Human Loci — a synesthetic listening object"
  image: "/images/work/human-loci/adjacent.jpg"
  alt: "Human Loci: a transparent acrylic listening box with three plaster disks for a park, a marina, and a train station."
```

`content/work/beau-rivage.md` (prev/next ~128-137) — no image:
```yaml
card:
  title: "Beau-Rivage Eco-Redesign — a 95% lighter luxury hotel site"
  alt: "The redesigned Beau-Rivage Palace site: restrained, elegant, far lighter than the original."
```

`content/work/uefa-female-coaches.md` (prev/next ~113-122) — no image:
```yaml
card:
  title: "Why Not You? — the UEFA female coaches campaign"
  alt: "The Why Not You? campaign: bold display typography over a female coach, with the line Lead Your Passion, Shape the Game."
```

`content/work/a-ta-dispo.md` (prev/next ~125-134) — no image:
```yaml
card:
  title: "À ta Dispo — matching event volunteers with organizers"
  alt: "À ta Dispo: a matchmaking concept connecting festival volunteers with event organizers."
```

`content/work/bereal.md` (prev/next ~119-128) — no image:
```yaml
card:
  title: "Re-coding BeReal — a dual-camera capture and image pipeline"
  alt: "A BeReal-like capture screen: front and back cameras firing simultaneously, the rear photo full-frame with the front-camera selfie inset."
```

`content/work/cultural-trails.md` (prev/next ~120-128) — no image:
```yaml
card:
  title: "Cultural Trails — a full-stack heritage walking app"
  alt: "Mobile screens for a gamified walking-trails app, showing a map, points of interest with quizzes, and audio guide controls."
```

- [ ] **Step 2: Apply card blocks to the 2 off-chain studies**

These are not in the chain, but get a card for schema uniformity and so they can join the chain later with a single edit.

`content/work/goldilocks-worlds.md` (prev/next ~149-157) — no image:
```yaml
card:
  title: "Goldilocks Worlds — making exoplanet habitability legible"
  alt: "Dark, space-like data-story scene: an exoplanet plot with a habitable-zone constraint band and an explanation sidebar."
```

`content/work/meeting-pond.md` (prev/next ~108-116) — no image:
```yaml
card:
  title: "Meeting Pond — connected light objects for distant presence"
  alt: "A 32×32 LED matrix mounted in a frame, displaying ripples spreading across a luminous surface."
```

- [ ] **Step 3: Verify no prev/next remain and the build is green**

```bash
grep -rn "^prev:\|^next:" content/work/ ; echo "exit:$?"
```
Expected: no matches (the helper prints `exit:1` from grep when nothing matches).

```bash
npm run generate
```
Expected: build succeeds. The "More work" section is still hidden site-wide (page not yet wired) — that is corrected in Task 4.

- [ ] **Step 4: Commit**

```bash
git add content/work/
git commit -m "feat(work): give each study a canonical card, drop prev/next blocks"
```

---

### Task 4: Wire the page to render neighbours from the chain

**Files:**
- Modify: `app/pages/work/[slug].vue`

**Interfaces:**
- Consumes: `chainNeighbours` from `~/data/workChain` (Task 1); the `card` field on `work` docs (Tasks 2-3).
- Produces: the final rendered "More work" section, gated on chain membership.

- [ ] **Step 1: Add the import and neighbour resolution**

Replace the top of `<script setup>` (current lines 1-5) with:

```vue
<script setup lang="ts">
import { chainNeighbours } from '~/data/workChain'

const route = useRoute()
const { data: study } = await useAsyncData(`work-${route.params.slug}`, () =>
  queryCollection('work').path(route.path).first(),
)

// Ring neighbours for the "More work" section, derived from the single ordered
// chain in app/data/workChain.ts. Both null for off-chain pages → no section.
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

- [ ] **Step 2: Gate the "More work" section on the resolved cards**

In the `sections` computed, change the `next` entry (current line 48) from:

```ts
    { id: 'next', label: 'More work', present: !!(s.prev || s.next) },
```

to:

```ts
    { id: 'next', label: 'More work', present: !!(prevCard.value || nextCard.value) },
```

- [ ] **Step 3: Render the resolved cards in the template**

Replace the "08 Next / Previous" section (current lines 387-398) with:

```vue
      <!-- More work (ring neighbours) -->
      <section
        v-if="prevCard || nextCard"
        id="next"
        class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 py-16 md:py-28 scroll-mt-32"
      >
        <UiSectionHead :num="numFor('next')" label="More work" class="mb-10 md:mb-16" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <WorkAdjacentCard v-if="prevCard" dir="prev" :item="prevCard" />
          <WorkAdjacentCard v-if="nextCard" dir="next" :item="nextCard" />
        </div>
      </section>
```

- [ ] **Step 4: Build and inspect the rendered HTML**

```bash
npm run generate
```
Expected: build succeeds.

Verify a mid-chain page renders the right neighbours (databloom: prev `cultural-trails`, next `wematch`):
```bash
grep -o "Cultural Trails — a full-stack heritage walking app\|WeMatch — an AX matching service for the WeRoad world" .output/public/work/databloom/index.html
```
Expected: both strings print.

Verify the wrap (cultural-trails next → databloom):
```bash
grep -o "DataBloom — making the energy impact of digital usage visible" .output/public/work/cultural-trails/index.html
```
Expected: the string prints.

Verify an off-chain page has no "More work" section:
```bash
grep -c 'id="next"' .output/public/work/goldilocks-worlds/index.html ; echo "exit:$?"
```
Expected: prints `0` (no `id="next"` anchor on that page).

Verify the case studies are still in the sitemap:
```bash
grep -o "/work/databloom\|/work/cultural-trails" .output/public/sitemap.xml
```
Expected: both paths print. (If the file is named differently, search `.output/public` for `*.xml`.)

- [ ] **Step 5: Commit**

```bash
git add app/pages/work/[slug].vue
git commit -m "feat(work): derive More work prev/next from the chain"
```

---

## Self-Review

**Spec coverage:**
- One ordered chain, ring, 13 members → Task 1 (`workChain`, wrap math). ✓
- Card copy in frontmatter (Approach A) → Tasks 2-3 (schema + 15 card blocks). ✓
- De-drifted canonical copy (e.g. `bereal`, `cultural-trails`) → Task 3 verbatim blocks. ✓
- Goldilocks/Meeting Pond lose "More work" → Task 1 returns nulls off-chain; Task 4 gating; verified in Task 4 Step 4. ✓
- Page wiring, section gating, AdjacentCard unchanged → Task 4. ✓
- Verify via `npm run generate` + HTML + sitemap → Task 4 Step 4. ✓

**Placeholder scan:** No TBD/TODO; every code and content step is complete and verbatim. Line-number references are marked approximate hints, with content-based removal instructions, since edits shift line numbers.

**Type consistency:** `chainNeighbours` signature is identical in Task 1 and its use in Task 4. `cardFor` returns `{ slug, ...card }` matching `AdjacentCard`'s `{ slug, title, image?, alt }` prop. `cards`/`prevCard`/`nextCard` names are consistent across Steps 1-3 of Task 4.

## Out of scope

- No changes to `app/data/featured.ts` or `app/data/projects.ts`.
- No changes to `AdjacentCard.vue`.
- No test harness added.
- Working docs that mention the old prev/next authoring (e.g. `POPULATING.md`, `CASE_STUDY_HANDOFF.md`) are not updated here; flag separately if you want them refreshed.
