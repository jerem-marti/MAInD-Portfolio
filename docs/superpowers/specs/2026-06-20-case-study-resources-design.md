# Case-study resources — design

**Date:** 2026-06-20
**Status:** Approved (design), pending implementation plan
**Scope:** Add a "Resources" section to featured case-study pages for outbound links and one click-to-load video facade.

## Goal

Give each case study a tidy, restrained place to point visitors deeper: a thesis PDF, a source repo, a live demo, an external write-up, and a walkthrough video. Resources are evidence the process works, so they sit near the end of the page as an appendix rather than interrupting the narrative.

## Constraints

These shape every decision below:

- **Static SSG** — no server; everything resolves at `nuxi generate`.
- **Performance budget** — case-study total under 1.5 MB on initial load; LCP under 1s.
- **Restrained editorial brand** — yellow used sparingly, Geist Mono for structural meta, no large decorative surfaces.
- **AA accessibility** — keyboard reach, visible focus, real alt text, correct semantics.
- **Privacy posture (v1)** — mailto-only contact, no analytics, no third-party cookies. A persistent third-party iframe on page load is therefore out; anything third-party must be deferred behind explicit user intent.

## Decisions

| Question | Decision |
|----------|----------|
| Placement | One dedicated section near the page end (after Gallery, before More work). |
| Richness | Title-only link rows for every type; the `video` type gets a click-to-load facade. |
| Video source | Support both self-hosted files and external providers (YouTube/Vimeo), chosen per video. |
| Row anatomy | Type tag + title + external arrow only. No description, no meta line. |
| `demo` type | Plain row link opening in a new tab (not a facade). |
| Facade build | Custom Vue component, zero new dependencies (not `@nuxt/scripts`). |

## Data model

A new optional `resources` array in case-study frontmatter, validated in `content.config.ts`.

### Type vocabulary (fixed set of five)

| `type` | Mono tag | Use |
|--------|----------|-----|
| `pdf` | `PDF` | thesis, paper, deck, one-pager |
| `github` | `GITHUB` | source repository |
| `demo` | `DEMO` | live or interactive build |
| `video` | `VIDEO` | walkthrough (rendered as the facade) |
| `web` | `WEB` | external write-up, blog, article |

Because rows are title-only, the type tag is the only context cue, so the vocabulary is deliberate and closed (matching the existing Index tag-vocabulary discipline).

### Frontmatter shape

```yaml
resources:
  - type: pdf
    title: "Bachelor thesis paper"
    url: "/files/databloom-thesis.pdf"        # external URL or public/ path
  - type: github
    title: "Firmware + hardware repo"
    url: "https://github.com/jerem-marti/databloom"
  - type: demo
    title: "Live web simulation"
    url: "https://databloom-demo.example.ch"
  - type: web
    title: "MEI research blog write-up"
    url: "https://mei.example.ch/databloom"
  - type: video
    title: "90-second walkthrough"
    poster: "/images/work/databloom/video-poster.jpg"
    # self-hosted variant:
    src: "/videos/databloom/walkthrough.mp4"
    # …OR external variant (instead of src):
    # provider: youtube        # youtube | vimeo
    # id: "dQw4w9WgXcQ"
```

### Zod schema

A `z.union` of two object schemas under `resources: z.array(...).optional()`:

- **`linkResource`** — `type: z.enum(['pdf','github','demo','web'])`, `title: z.string()`, `url: z.string()`.
- **`videoResource`** — `type: z.literal('video')`, `title: z.string()`, `poster: z.string()`, optional `src`, optional `provider: z.enum(['youtube','vimeo'])`, optional `id`. A `.refine` enforces **exactly one** of: `src` present, OR both `provider` and `id` present. Supplying neither or both fails the build.

## Components

All under `app/components/work/`, following the existing `Work*` convention. Each has one clear job.

### `Resources.vue`
Section body. Props: `resources: Resource[]`. Renders a `<ul>`; per item, delegates to `ResourceRow` (link types) or `ResourceVideo` (`type === 'video'`). Carries no section chrome of its own — the page supplies `UiSectionHead`, mirroring how `RoleColumns` is used.

### `ResourceRow.vue`
One link row for `pdf` / `github` / `demo` / `web`. Renders an `<a>` containing:

- the mono type tag in a fixed-width column so titles align,
- the title,
- a trailing `ArrowUpRight` inline SVG (the Lucide pattern already used in `AdjacentCard.vue`),
- hover treatment consistent with the site (yellow `box-shadow` underline on the title, as on Index rows and adjacent cards),
- `target="_blank"` and `rel="noopener noreferrer"`,
- an accessible name combining title + type + "opens in new tab", with the arrow `aria-hidden`.

### `ResourceVideo.vue`
The facade. Local reactive `playing` state.

- **At rest:** poster via `UiMediaPlaceholder` + a centred play control. The control is a real `<button>` with `aria-label="Play {title}"`.
- **On activate:** `playing` flips and the component renders either
  - `<video controls autoplay preload="none">` when `src` is set, or
  - an injected `<iframe>` at `https://www.youtube-nocookie.com/embed/{id}?autoplay=1` (YouTube) or the Vimeo Do-Not-Track URL (Vimeo), with a `title` attribute.
- Focus moves into the player on activation.
- The swap respects `prefers-reduced-motion` (instant, no transition); otherwise the site's ≤250 ms fade.

Nothing third-party loads until the click: a provider video costs zero network requests and zero cookies at rest; a self-hosted file costs only the lazy poster image until play.

## Page integration (`app/pages/work/[slug].vue`)

### Section order and numbering

Resources becomes **07**; More work shifts to **08**:

```
06 Gallery → 07 Resources → 08 More work

(Section 06 was relabelled from "Artifacts" to "Gallery" during review: by the brand
thesis the process is the artifact and outputs are evidence, so "Artifacts" for an
output image grid inverted the idea; "Gallery" also frees the `artifacts` field name used
inside Approach. The section id was aligned to `gallery` to match its backing field.)
```

The section renders only `v-if="study.resources?.length"`, wrapped consistently:

```
<UiSectionHead num="07" label="Resources" />
<WorkResources :resources="study.resources" />
```

### TOC / scroll-spy — targeted improvement

The `sections` array is currently static, so an optional section would leave a dead TOC entry on studies that lack it (a fragility that already exists for `gallery` and others). As part of this work, derive the rendered TOC from which content fields are actually present on the study:

- keep a fixed master order with stable numbers (so a section's number never shifts based on what else exists),
- filter that master list against the study to produce the `sections` actually shown,
- feed the filtered list to `useScrollSpy`, `WorkDesktopTOC`, and `WorkMobileTOC`.

This is in-scope because introducing an optional section is precisely what makes the static array break.

## Accessibility

- Rows are a semantic `<ul>` / `<li>` of `<a>` elements; accessible name = title + type + "opens in new tab"; decorative arrows `aria-hidden`.
- Facade trigger is a `<button>`; focus moves into the player on activation; `<video controls>` / iframe carry a `title`; poster carries real alt text.
- Type tags use existing `text-brand-ink` / `text-brand-ink-muted` tokens already verified AA against `--brand-bg`.
- All motion respects `prefers-reduced-motion`.

## Performance

- Link rows are pure static HTML — negligible weight.
- The facade loads only a lazy AVIF/WebP poster at rest; the player or iframe loads on click. The section never threatens the 1.5 MB initial budget.
- No third-party request or cookie fires until a visitor chooses to play a provider video, and `youtube-nocookie` avoids cookies until playback.

## Edge cases

- No `resources` field → section omitted and TOC entry omitted.
- Studies with only links and no video are the common case and render fine.
- A `video` with neither `src` nor `provider`+`id`, or with both, fails Zod validation at `generate` time, surfacing the authoring error early.
- A `pdf` whose `url` is a `public/` path opens in a new tab like any external link (browser PDF viewer); no special same-tab download handling in v1.

## Verification

No automated test harness exists in the repo today, so v1 verification is:

1. `npm run generate` succeeds and the Resources markup appears in `dist/work/databloom/index.html`.
2. Manual keyboard pass: every row reachable and operable; facade play button focusable and operable; focus lands in the player after activation.
3. Manual screen-reader pass on row accessible names and the facade button label.
4. Network check: a provider video issues zero requests until play is clicked.

## Out of scope (v1)

- A Vitest component test for `ResourceVideo` swap logic. Deferred because it would mean introducing test tooling the repo does not currently have. Revisit if a test harness is added.
- Per-type leading glyph icons on rows (the text type tag is the signal).
- Optional row description / meta line.
- A `slides` type distinct from `pdf`.
- `demo` as a facade.
