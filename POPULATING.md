# Populating the site

This guide is the canonical reference for adding content, images, PDFs, and metadata to **jeremymartin.ch**. The architecture and locked decisions live in `CLAUDE.md`; this file covers the *how* — every step, every field, every file to edit, in the order you'll actually do them.

It assumes the migration is complete (all six phases merged to `main`). If you're starting fresh, run `npm install` and then `npm run dev` to confirm the site renders before changing anything.

---

## At a glance — what lives where

| Need to | Edit | Section |
|---|---|---|
| Add an Index-list row on the home page | `app/data/projects.ts` | [Index list](#index-list-rows-home-section-03) |
| Activate a Featured card on the home page | `app/data/featured.ts` | [Featured cards](#featured-cards-home-section-02) |
| Write a full case study | `content/work/<slug>.md` (set `status: "live"`) | [Case studies](#case-studies) |
| Activate an in-progress case study | Same as above — flip `status` + add the blocks | [Case studies](#case-studies) |
| Add resources (links, video) to a case study | `content/work/<slug>.md` (`resources` block) | [Case studies](#case-studies) |
| Replace a placeholder with an image | Drop file into `public/images/...`, then set the matching `src` / `hero` / `preview` / `image` field | [Images](#images) |
| Wire the CV PDFs | Drop into `public/jeremy-martin-cv-*.pdf`, remove from `linkChecker.excludeLinks` in `nuxt.config.ts` | [CVs](#cvs) |
| Change page titles, descriptions, OG content | Per-page `useHead({ title, meta })` in `app/pages/...` | [SEO](#seo) |
| Customise the OG image template | `app/components/OgImage/NuxtSeo.satori.vue` | [OG images](#og-images) |
| Add or change schema.org data | `useSchemaOrg([...])` in `app/layouts/default.vue` (global) or per page | [Schema.org](#schemaorg-structured-data) |
| Tighten site-wide SEO foundation | `nuxt.config.ts` → `site:` block | [Site config](#site-config) |
| Change robots.txt or sitemap rules | `nuxt.config.ts` → `robots:` / `sitemap:` blocks | [Sitemap & robots](#sitemap--robots) |

---

## Case studies

Case studies live in `content/work/<slug>.md`, are validated by the Zod schema in `content.config.ts`, and render via `app/pages/work/[slug].vue`. The slug in the filename **must** match the slug in `app/data/featured.ts` and in the `prev` / `next` adjacency blocks.

Three slugs are already on the site:

| Slug | Status | What to do |
|---|---|---|
| `household-energy-interface` | `live` | Edit prose only |
| `ai-evaluation-framework` | `in-progress` | Fill in blocks, flip status |
| `primary-sources-reader` | `in-progress` | Fill in blocks, flip status |

To add a fourth case study, also add an entry to `app/data/featured.ts` (or just leave it as an Index-list row in `app/data/projects.ts` if it shouldn't be one of the three Featured cards).

### Frontmatter — every field

YAML frontmatter only; the markdown body is unused (the page is built entirely from the structured data above the `---`).

#### Required fields

```yaml
---
title: "Household energy interface"
summary: "A tangible interface that made domestic energy use legible without requiring an app."
status: "live"          # "live" or "in-progress"
heroAlt: "An oak block sitting on a kitchen counter with a column of softly backlit segments along one edge."
```

- **`title`**: appears as the hero `<h1>` AND becomes the `<title>` (with the site suffix appended automatically — *don't* add `— Jérémy Martin` here).
- **`summary`**: appears under the hero `<h1>` AND becomes the `<meta name="description">` AND the OG image subtitle. Two short sentences max, ideally under 160 characters.
- **`status`**: `live` renders all seven numbered sections + scroll-spy TOC + progress bar. `in-progress` renders just the hero block and a "case study in progress" stub.
- **`heroAlt`**: real alt text for the hero image, used whether the image is set or the placeholder card renders. Describe what's in the picture *and* what it shows in context.

#### Optional brief (the five-column meta dl under the hero)

```yaml
brief:
  role: "Bachelor thesis"
  year: "2024 – 2025"
  host: "HEIG-VD"
  scope: "6 months · solo"
  shipped: "Working prototype, in active use at the host institution"
```

All five fields are short strings. Renders as a 2-col grid on mobile, 5-col on `md+`. **Don't rename this block to `meta`** — `meta` is reserved by `@nuxt/content`'s page schema and silently renders empty.

#### Optional body sections (live case studies)

Each block below is independent — drop any that don't apply. The section's `<UiSectionHead>` only renders if the block has data.

##### `problem` — section 01

```yaml
problem:
  - >-
    First paragraph. Use YAML block-folded notation (>-) for multi-line prose;
    line wraps in your editor don't affect rendering.
  - >-
    Second paragraph. Each entry in the array becomes a separate <p> tag.
  - >-
    Third paragraph.
```

The first paragraph renders in a larger size (`text-[20px] md:text-[24px]`), the rest at `text-[17px] md:text-[18px]`. Keep it to two to four paragraphs.

##### `role` — section 02

```yaml
role:
  led:
    - "Field research (11 households, contextual interviews and home tours)"
    - "Concept and industrial design of the tangible device"
    - "Firmware on the ESP32 microcontroller and the calibration routine"
    - "Six-week in-home evaluation and write-up"
  contributed:
    - "Enclosure fabrication, with the HEIG-VD prototyping workshop"
    - "Statistical review of meter data, with the thesis supervisor"
  notTouched:
    - "Power-line communication firmware (used as-is from the meter vendor)"
  team: "Solo thesis, supervised by Prof. M. Bujard (HEIG-VD). Workshop support from R. Pellet."
```

Renders as three columns + a Team band underneath. `notTouched` items render in muted grey (lower visual weight). The honesty of `notTouched` is the point — list things you'd otherwise be tempted to claim credit for. Keep each item to one line.

##### `approach` — section 03 (with artifact figures)

The richest block. Array of sub-sections; each gets its own `03.NN / LABEL` heading and a title.

```yaml
approach:
  - label: "Research"
    title: "Eleven homes, two questions"
    prose:
      - >-
        First prose paragraph.
      - >-
        Second prose paragraph.
    artifacts:                                 # optional, omit for prose-only sub-sections
      - alt: "Marked-up transcripts pinned to a wall, with yellow tape grouping recurring phrases."
        caption: "Affinity diagram — 11 transcripts, 312 quotes."
        decision: 'Grouping by surface (kitchen / entry / bathroom) shifted the brief from "app" to "object on a counter."'
        width: "wide"                          # full | wide | inset | half
        # src: "/images/work/<slug>/artifact-01.jpg"  # uncomment when the image lands
      - alt: "..."
        caption: "..."
        decision: "..."
        width: "half"
```

Artifact width variants control how the figure spans the 12-column grid:

| `width` | Grid span | When to use |
|---|---|---|
| `full` | `col-span-12` | A single hero figure (one decision per row) |
| `wide` | `col-span-12 md:col-span-10 md:col-start-2` | A primary figure with breathing room |
| `inset` | `col-span-12 md:col-span-8 md:col-start-3` | A figure that should sit inside the prose column |
| `half` | `col-span-12 md:col-span-6` | Two figures side by side (group `half` + `half` in the same sub-section) |

The `decision` line is rendered in mono with a `Decision · ` prefix — it's not a caption, it's the *why this artifact mattered*. One sentence.

Em-dashes are allowed in `caption` (chrome/meta) but **not in `prose` or `decision`** (body copy). See [voice rules](#voice-rules-quick-reference).

##### `outcome` — section 04

```yaml
outcome:
  - >-
    First outcome paragraph. Two paragraphs max; renders at a large size
    (text-[22px] md:text-[28px]).
  - >-
    Second outcome paragraph.
```

Outcome is the only quantitative section — concrete numbers belong here ("Eleven working units", "Nine households continued to use the device", etc.). No grades.

##### `reflection` — section 05

```yaml
reflection: >-
  Single block of prose, rendered with a brand-accent left border at
  text-[18px] md:text-[20px]. Honest reflection on what would change next
  time — *not* "lessons learned" listicle.
```

One paragraph. Two if necessary, separated by a blank line in the YAML block.

##### `gallery` — section 06

```yaml
gallery:
  - alt: "Unit H-02 sitting on a kitchen counter with afternoon light from a side window."
    caption: "Unit H-02, in use."
    # src: "/images/work/<slug>/gallery-01.jpg"
  - alt: "Detail of the unfinished brass insets along one edge of the R4 enclosure."
    caption: "Brass detail, R4 enclosure."
  # ...up to 9 entries fits cleanly in the 2/3-col grid
```

`alt` is required; `caption` is required; `src` is optional. Renders as a 2-col mobile / 3-col `md+` grid with numbered figcaptions (`01 · Unit H-02, in use.`).

##### `resources` — section 07

Outbound links and an optional click-to-load video. The section (and its TOC entry) only appear when `resources` has at least one item.

```yaml
resources:
  - type: pdf            # pdf | github | demo | web
    title: "Bachelor thesis paper"
    url: "/files/<slug>-thesis.pdf"            # external URL, or a path under public/
  - type: github
    title: "Firmware, schematics, and printable parts"
    url: "https://github.com/jerem-marti/<repo>"
  - type: demo
    title: "Live web simulation"
    url: "https://<demo-url>"
  - type: web
    title: "Research blog write-up"
    url: "https://<article-url>"
  - type: video
    title: "90-second walkthrough"
    poster: "/images/work/<slug>/video-poster.jpg"
    src: "/videos/<slug>/walkthrough.mp4"      # self-hosted…
    # …OR an external provider instead of src:
    # provider: youtube   # youtube | vimeo
    # id: "dQw4w9WgXcQ"
```

Each item is one of two shapes:

| Shape | Required fields | Notes |
|---|---|---|
| Link row | `type` (`pdf` / `github` / `demo` / `web`), `title`, `url` | Always opens in a new tab. `url` is an external URL or a `public/` path. |
| Video | `type: video`, `title`, `poster`, and **exactly one** source | Source is either `src` (self-hosted file) OR `provider` + `id` (`youtube` / `vimeo`). |

- **Title-only by design.** A row shows the mono type tag + title + an external arrow, nothing else. The type tag carries the context, so keep titles self-explanatory. The five types are a fixed set (`pdf`, `github`, `demo`, `video`, `web`).
- **The video is a facade.** At rest only the `poster` image loads; the player (a native `<video>` for `src`, or a `youtube-nocookie` / Vimeo-DNT iframe for a provider) is injected only when the visitor clicks play. Nothing third-party loads and no cookies are set until then — this is a privacy + performance decision, keep it that way.
- **Files**: downloads/PDFs go in `public/files/`, self-hosted videos in `public/videos/<slug>/`, posters in `public/images/work/<slug>/`.
- The schema rejects a video with neither or both sources, so a wrong shape fails `npm run generate`.

Schema lives in `content.config.ts`; components are `app/components/work/Resources*.vue` with shared types in `app/utils/resources.ts`.

##### `prev` / `next` — section 08 (adjacency)

```yaml
prev:
  slug: "primary-sources-reader"
  title: "Reading interface for primary sources"
  alt: "A two-column reading layout with marginalia connected to inline citations by hairline lines."
  # image: "/images/work/primary-sources-reader/adjacent.jpg"

next:
  slug: "ai-evaluation-framework"
  title: "Evaluation framework for AI features"
  alt: "A printed evaluation rubric annotated by hand with yellow tape marking the disagreement rows."
```

`slug` must match a real `content/work/<slug>.md` file (the link checker will catch you if it doesn't). The two cards render side-by-side in a 16:10 placeholder until `image` is set. Either or both can be omitted (last case study has no `next`, first has no `prev`).

### From in-progress to live — the checklist

Open `content/work/<slug>.md` and:

1. Change `status: "in-progress"` to `status: "live"`.
2. Add a `problem:` block (2-4 paragraphs).
3. Add a `role:` block (led / contributed / notTouched / team).
4. Add an `approach:` block (3-6 sub-sections, each with `prose` and optional `artifacts`).
5. Add an `outcome:` block (1-2 paragraphs with the concrete results).
6. Add a `reflection:` paragraph.
7. Add a `gallery:` block (4-9 figcaptions).
8. (Optional) Add a `resources:` block (links and/or a walkthrough video).
9. Add `prev` / `next` adjacency (pick the two closest neighbours).
10. Run `npm run dev`, visit `/work/<slug>`, scroll the whole page, click each TOC item, confirm nothing's missing.
11. Commit on a feature branch (`feat/case-study-<slug>`), merge through `dev` to `main` once you're happy.

---

## Featured cards (home, section 02)

`app/data/featured.ts` defines the three big case-study cards on the home page. Locked to three slots by `CLAUDE.md` (Bachelor thesis / AI evaluation framework / third TBD).

```ts
{
  num: 'F·01',                                // display number, mono
  slug: 'household-energy-interface',         // must match content/work/<slug>.md
  title: 'Household energy interface',        // h3 on the card
  problem:                                    // one-liner under "Problem"
    'Domestic energy use is invisible until the bill arrives, and another app is the wrong place to put it.',
  outcome:                                    // one-liner under "Outcome"
    'A tangible, ambient interface now in continued use at the host institution after a six-week field trial.',
  meta: 'Tangible interface / Field study / 2025',
  alt: 'An oak block sitting on a kitchen counter with a column of softly backlit segments along one edge.',
  // image: '/images/featured/household-energy-interface.jpg',  // uncomment when uploaded
}
```

To change a card:

- Edit the entry in the array — every field is rendered live.
- `slug` must point at a real `content/work/<slug>.md`. If it's a stub (status `in-progress`), the card still renders; clicking through shows the in-progress stub page.
- `problem` and `outcome` are one-liners (sub-50-word). They're the elevator pitch of the case study.
- `meta` is a slash-separated chrome label — pattern is `<discipline> / <method> / <year>`. Keep it short.

To **add** a fourth case study (drops the locked F·01–F·03 constraint — confirm with stakeholder before doing this), append to the array and add the matching markdown file in `content/`. To **remove**, comment out the entry and remove the matching markdown.

---

## Index list rows (home, section 03)

`app/data/projects.ts` powers the typed table at the bottom of the home page. Eight rows currently; can grow without limit (the prototype's introductory caption reads "Eight entries" — update that string in `app/pages/index.vue` if you change the count).

```ts
{
  num: '01',                                  // mono index number
  title: 'Energy interface prototype',        // row title
  tags: ['Tangible interface', 'UX research'],// 2-4 tags from the controlled vocabulary
  year: '2025',                               // string, four digits
  href: '/work/household-energy-interface',   // optional — omit for non-linked rows
  preview: '/images/index/01-energy-interface.jpg',  // optional — hover preview
  alt: 'Oak enclosure prototype on a workbench beside calibration notes.',
}
```

### Controlled vocabulary (enforced by TypeScript)

```
UX research
Interaction design
Prototyping
Information architecture
UX writing
Design systems
Accessibility
Tangible interface
Front-end build
Brand / Editorial
AI evaluation
Hardware
```

TypeScript will catch a typo or any tag not in this list at build time. To add a new tag to the vocabulary, edit the `indexTags` array in `app/data/projects.ts` — but do this sparingly; the vocabulary is part of the brand voice (see CLAUDE.md).

### Linked vs unlinked rows

A row with `href:` is rendered as an `<a>`, hover-highlights with a faint yellow tint, and shows the up-right arrow at the end of the row. A row without `href:` is a plain `<div>`, non-interactive, with an em-dash where the arrow would be.

Use unlinked rows for work you want to surface but can't fully publish (NDA, in-progress, lost-the-files). The presence-without-link is intentional — CLAUDE.md explicitly says "some link, some don't, both are honest".

### Hover preview rail (desktop only, `lg+`)

When the user hovers (or keyboard-focuses) a row:

- If the row has `preview:` set, that image renders in the rail.
- Otherwise the row's `title` and `tags` render as text in the placeholder card.

The rail is `aria-hidden="true"` (it's a decorative enrichment of the table; all the row data is reachable in the row itself).

---

## Images

All site imagery flows through `app/components/ui/MediaPlaceholder.vue`. When a `src` is provided, it renders `<NuxtImg>` with responsive AVIF/WebP variants. When `src` is empty or `null`, it renders a bordered placeholder div with the alt text exposed via `aria-label`.

The pipeline is **opt-in by path**: drop a file, set the path, image renders. No file means placeholder. There's no "magic auto-detection" — paths are explicit.

### Directory structure

```
public/images/
├── about/
│   └── portrait.jpg                                      # 4:5, ≥1200px wide
├── featured/
│   ├── household-energy-interface.jpg                    # 16:9, ≥1600px wide
│   ├── ai-evaluation-framework.jpg
│   └── primary-sources-reader.jpg
├── index/
│   ├── 01-energy-interface.jpg                           # 3:4, ≥900px wide
│   ├── 02-festival.jpg
│   └── ...                                               # one per linked row in projects.ts
└── work/
    └── <slug>/                                           # one folder per case study
        ├── hero.jpg                                      # 21:8, ≥2400px wide
        ├── artifact-research-01.jpg                      # 16:10, ≥1800px wide
        ├── artifact-research-02.jpg
        ├── ...
        ├── gallery-01.jpg                                # 4:3, ≥1200px wide
        ├── gallery-02.jpg
        └── adjacent.jpg                                  # 16:10, ≥1200px wide (for prev/next cards)
```

You don't have to use these filenames — they're examples. The actual filenames are whatever you reference from your data files / frontmatter.

### Recommended source dimensions

`@nuxt/image` downscales at build time, so you can drop the largest version you have and the build emits AVIF/WebP variants at the breakpoints (640, 768, 1024, 1280, 1536) and at 1× + 2× density. Min sizes below are *floors* — bigger is fine.

| Role | Aspect | Min width | Where used |
|---|---|---|---|
| Featured card hero | 16:9 | 1600 px | Home, section 02 |
| Case-study hero | 21:8 | 2400 px | `/work/<slug>` hero |
| Artifact figure | 16:10 | 1800 px | `approach[].artifacts[]` |
| Gallery tile | 4:3 | 1200 px | `gallery[]` |
| Adjacent card | 16:10 | 1200 px | `prev` / `next` |
| Video poster | 16:9 | 1600 px | `resources[]` video facade |
| About / portrait | 4:5 | 1200 px | `/about` hero + home section 04 |
| Index preview | 3:4 | 900 px | Home section 03 hover rail |

### Source format

Doesn't matter much. JPG, PNG, HEIC, WebP, TIFF — `@nuxt/image` reads everything via `sharp`. Use the highest quality original you have. Avoid pre-compressed JPEGs from social media (visible artifacts).

### Activating an image

Each image position has a specific field to set. After dropping the file into `public/images/...`:

| Position | File to edit | Field |
|---|---|---|
| Featured card hero | `app/data/featured.ts` | `image: '/images/featured/<slug>.jpg'` |
| Index hover preview | `app/data/projects.ts` | `preview: '/images/index/<filename>.jpg'` |
| Case-study hero | `content/work/<slug>.md` | `hero: '/images/work/<slug>/hero.jpg'` |
| Artifact figure | `content/work/<slug>.md` | `approach[N].artifacts[M].src: '/images/work/<slug>/...'` |
| Gallery tile | `content/work/<slug>.md` | `gallery[N].src: '/images/work/<slug>/gallery-XX.jpg'` |
| Adjacent (prev/next) | `content/work/<slug>.md` | `prev.image:` and `next.image:` |
| About hero portrait | `app/pages/about.vue` | Change `:src="null"` to `:src="'/images/about/portrait.jpg'"` |
| Home About-preview portrait | `app/pages/index.vue` | Change `:src="null"` to the same path |

### Writing alt text (mandatory)

Every image position has an `alt` field. It's required even before the image is uploaded — the placeholder uses it as the `aria-label`. Real alt text describes *what's in the image* and *what it shows in context* — not "image" or "hero". Examples:

- ✅ "An oak block sitting on a kitchen counter with a column of softly backlit segments along one edge."
- ✅ "Marked-up transcripts pinned to a wall, with yellow tape grouping recurring phrases."
- ❌ "Hero image"
- ❌ "Energy device"
- ❌ "" (empty — only allowed for purely decorative imagery, which the portfolio doesn't have)

CLAUDE.md: "Real alt text (not 'image' or 'hero' — describe what's in the image and what it shows in context)."

---

## CVs

Two PDFs are wired and excluded from link-checking until they exist:

- `public/jeremy-martin-cv-en.pdf` — English CV, v1 deliverable
- `public/jeremy-martin-cv-fr.pdf` — French CV, v2 (rendered as a "soon" pill until then)

To wire the English CV:

1. Drop the PDF into `public/` as `jeremy-martin-cv-en.pdf`.
2. Open `nuxt.config.ts` and remove `'/jeremy-martin-cv-en.pdf'` from `linkChecker.excludeLinks`.
3. Run `npm run generate` — the link-checker will now verify the file actually exists. If you got the path wrong, the build fails fast.
4. The Download CV (English) button on `/about` already points at this path; no template change needed.

To wire the French CV:

1. Drop the PDF into `public/` as `jeremy-martin-cv-fr.pdf`.
2. Edit `app/pages/about.vue`, find the FR "soon" pill, replace it with the same `<a download>` pattern the EN button uses. The exclusion entry in `nuxt.config.ts` should also be removed.

---

## SEO

### Site config

Foundational metadata lives in `nuxt.config.ts` under `site:`. This is consumed by `@nuxtjs/seo`'s sub-modules (sitemap, robots, og-image, schema-org, link-checker) — change it in one place and every page picks up the new value.

```ts
site: {
  url: 'https://jeremymartin.ch',       // canonical site URL, used in sitemap, OG, JSON-LD
  name: 'Jérémy Martin — Interaction Designer',  // appended to every page's <title>
  defaultLocale: 'en',                  // used by hreflang + JSON-LD inLanguage
},
```

Don't touch unless you're moving the domain or rebranding.

### Page titles

`@nuxtjs/seo`'s `seo-utils` automatically appends the site name to every page's `<title>` using `|` as separator:

| Page-level title | Rendered `<title>` |
|---|---|
| *(none)* (home) | `Jérémy Martin — Interaction Designer` |
| `'About'` | `About \| Jérémy Martin — Interaction Designer` |
| `'Contact'` | `Contact \| Jérémy Martin — Interaction Designer` |
| `study.title` | `Household energy interface \| Jérémy Martin — Interaction Designer` |

**Set just the page context** in `useHead({ title: 'About' })` — don't add the brand suffix manually (causes duplication). The home page sets no title; the site name renders alone.

If you ever want a different page title pattern, configure `app.head.titleTemplate` in `nuxt.config.ts`. Note: an explicit `titleTemplate` function gets overridden by `seo-utils`. To actually change the separator, dig into seo-utils' runtime config (`nuxt-seo-utils` package).

### Meta descriptions

Each page sets `<meta name="description">` via `useHead`. Pattern:

```ts
useHead({
  title: 'About',
  meta: [
    {
      name: 'description',
      content:
        'Interaction design master at SUPSI Mendrisio, coming to design from electronics and media engineering. Available from August 2026.',
    },
  ],
})
```

Guidance:

- 1-2 sentences.
- Under 160 characters (Google truncates beyond ~155).
- Concrete and specific. The home description is the elevator pitch.
- Used as the **OG image subtitle** AND the meta description AND search-result snippet — all three at once.

Pages that currently set descriptions: `/`, `/about`, `/contact`, `/work/[slug]` (auto from `summary` frontmatter). Error pages don't need one.

### OG images

Every page gets a unique 1200×630 PNG, generated by Satori at build time. Setup is global:

```ts
// app/layouts/default.vue
defineOgImage('NuxtSeo', {
  theme: '#f5d547',                     // brand-accent yellow
  colorMode: 'light',
  siteName: 'jeremymartin.ch',
})
```

The `NuxtSeo` template auto-pulls **title** and **description** from each page's `useHead`. You don't write per-page OG calls.

#### Customising the template

The ejected component lives at `app/components/OgImage/NuxtSeo.satori.vue`. To match the brand harder (Geist font in the PNG, the same big-type hero, the brand-accent square):

1. Edit the SFC. It's a Vue template that Satori renders to SVG.
2. **Satori constraints** (these will bite):
   - No `display: grid`. Use `flex` everywhere.
   - `position: absolute` requires explicit `width` AND `height` on the absolutely-positioned element.
   - Web fonts need `@nuxt/fonts` configured with `global: true` (currently `false` by default). To enable Geist inside OG renders, add `global: true` to the relevant family in `nuxt.config.ts` → `fonts:`. Build time and bundle size will grow.
   - Tailwind utility classes work but only a subset Satori understands. When in doubt, write inline styles.
3. Preview in dev at `/__og-image__/image/<route>/og.png` — e.g. `http://localhost:3000/__og-image__/image/about/og.png`.
4. To debug, enable `ogImage: { debug: true }` in `nuxt.config.ts` — adds an inspector route at `/__og-image__/`.

#### How many OG images are emitted

One per route, into `.output/public/_og/s/`. Currently six (home, about, contact, three case studies). Adding a new case study automatically gets one. Filenames encode the route as base64 (e.g. `…p_Ii9hYm91dCI.png` is the OG image for `/about`).

#### Per-page override

If a specific page needs a different OG image (e.g., a case study with a custom hero), call `defineOgImage` in that page's `<script setup>`:

```ts
defineOgImage('NuxtSeo', {
  theme: '#f5d547',
  colorMode: 'light',
  siteName: 'jeremymartin.ch',
  title: 'A different title for this page',
  description: 'A different subtitle.',
})
```

It overrides the layout-level call for that page only.

### Schema.org structured data

Site-wide WebSite + Person graph is registered once in `app/layouts/default.vue`:

```ts
useSchemaOrg([
  defineWebSite({
    name: 'Jérémy Martin — Interaction Designer',
    url: 'https://jeremymartin.ch',
    inLanguage: 'en',
  }),
  definePerson({
    name: 'Jérémy Martin',
    jobTitle: 'Interaction Designer',
    email: 'mailto:hi@jeremymartin.ch',
    url: 'https://jeremymartin.ch',
    sameAs: ['https://www.linkedin.com/in/jermarti'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mendrisio',
      addressCountry: 'CH',
    },
  }),
])
```

To add a profile (GitHub, Bluesky, Mastodon, etc.), append to `sameAs`.

Per-page schema types are added on top:

| Page | Composable | Schema type |
|---|---|---|
| `/about` | `defineWebPage({ '@type': 'AboutPage' })` | `["WebPage", "AboutPage"]` |
| `/contact` | `defineWebPage({ '@type': 'ContactPage' })` | `["WebPage", "ContactPage"]` |
| `/work/[slug]` | `defineArticle({...})` with `author: { '@id': '#/schema/person' }` | `Article` linked to the global Person |

To validate after a change: paste a rendered HTML into [Google's Rich Results Test](https://search.google.com/test/rich-results) or [Schema.org's validator](https://validator.schema.org/).

### Sitemap & robots

Both are auto-generated by `@nuxtjs/seo`:

- **`/sitemap.xml`** — lists every prerendered route. `sitemap: { zeroRuntime: true }` skips the runtime helper (no dynamic sources needed for a fully-static site). Add `sitemap: false` to a page's `useHead` to exclude it. Pre-fetch `/_payload.json` and other internal Nitro routes are auto-excluded.

- **`/robots.txt`** — defaults to `User-agent: * / Allow: /`. To disallow paths, configure in `nuxt.config.ts`:

  ```ts
  robots: {
    disallow: ['/some-private-path'],
  },
  ```

  To noindex a single page, add `robots: 'noindex, nofollow'` to its `useHead` meta.

### Canonical URLs

Auto-emitted by `seo-utils` on every page based on `site.url` + the route path. Query-string params are stripped except those in `seo-utils.canonicalQueryWhitelist` (defaults to `['page', 'sort', 'filter', 'search', 'q', 'category', 'tag']`).

You don't need to set canonical manually. If you ever need to override on a single page, use `useSeoMeta({ canonical: '...' })`.

### Link checking

`linkChecker` runs at `generate` time and fails the build on broken internal links (status >= 400). Two paths are currently excluded because the files aren't there yet:

```ts
linkChecker: {
  excludeLinks: [
    '/jeremy-martin-cv-en.pdf',
    '/jeremy-martin-cv-fr.pdf',
  ],
},
```

**Remove each entry as you upload the corresponding PDF.** Build fails if a referenced file isn't there — that's the point.

To exclude an external link from validation (e.g., a third-party site that 503s sometimes), add it to the same array. Don't disable link-check globally — it's caught real bugs every phase.

---

## Voice rules (quick reference)

Lifted from CLAUDE.md. Apply to all body copy on the site (case-study prose, page descriptions, button labels).

**Banned**:
- Em-dashes (`—`) in body copy. Allowed on chrome / meta labels: section heads ("Index — all other work"), date ranges ("2024 — 2025"), figcaptions, footer ("FR — soon").
- Phrases: "passionate about", "thought leader", "results-oriented", "synergy", "rockstar", "ninja".
- Specific numerical grades. "Awarded distinction" is OK; "16/20" is not.
- "Maker-Engineer" in published copy — it's an internal label only.

**Encouraged**:
- Concrete numbers in the Outcome section. "Eleven units. Nine households continued." beats "many users found value."
- Sentence connectors over em-dashes when removing one: `:` `;` `(...)` are all fine.
- Specific names (institutions, people) with permission. Vagueness reads as evasion.

---

## Local development & verification

```bash
npm install                         # one-time per clone or after pulling new deps
npm run dev                         # http://localhost:3000, hot-reload, no SSG
npm run generate                    # full static build → .output/public/
npm run preview                     # serves .output/public/ locally for final QA
npx nuxi typecheck                  # full TypeScript check
```

### What `generate` actually does

- Renders every page server-side (`nuxt prerender`)
- Crawls every internal link found in rendered HTML (`nitro.prerender.crawlLinks: true`)
- Generates one OG image per route (`nuxt-og-image`)
- Generates sitemap + robots + schema.org JSON-LD
- Runs link-checker on every internal link (build fails on broken)
- Compiles every `@nuxt/image` source into AVIF + WebP variants
- Self-hosts Geist + Geist Mono (`@nuxt/fonts` downloads at build time)

Expected output: **24 routes** with the current setup. Adding a fourth case study brings it to ~26 (case study page + OG image).

### TLS gotcha on this machine

If `npm install`, `nuxt generate`, or anything else doing network ops fails with `UNABLE_TO_VERIFY_LEAF_SIGNATURE`, the local SSL inspector is presenting a CA not in Node's bundle. Fix:

```powershell
$env:NODE_OPTIONS="--use-system-ca"
npm install                         # or whatever was failing
```

This makes Node trust the Windows certificate store. Do **not** disable strict-ssl. Already documented in `.claude/memory/`.

### CRLF warnings

Git on Windows converts LF → CRLF on commit. The warning is normal; the files in the repo are stored with LF (`text=auto` default). Ignore.

---

## Pushing to production

### One-time GitHub setup

The remote is already wired:

```
origin  https://github.com/jerem-marti/MAInD-Portfolio.git
```

For the first push you'll need either:

1. **HTTPS + Personal Access Token (PAT)**:
   - Create a PAT at https://github.com/settings/tokens with `repo` scope.
   - First `git push -u origin main` — git prompts for username (`jerem-marti`) and password (use the PAT, not your account password).
   - Token is cached in Windows Credential Manager.

2. **SSH key**:
   - Generate one with `ssh-keygen -t ed25519 -C "jeremy_martin@bluewin.ch"`.
   - Add the public key to https://github.com/settings/keys.
   - Change the remote: `git remote set-url origin git@github.com:jerem-marti/MAInD-Portfolio.git`.
   - First `git push -u origin main` accepts the host fingerprint.

After that:

```bash
git push                            # main → main
git push origin dev                 # if you want to sync dev too
```

### Recommended GitFlow workflow

The pattern locked in during the migration:

```
main             stable, every commit is shippable
  ↑ (FF merge)
dev              integration branch, accumulates features
  ↑ (FF merge)
feat/<topic>     branched off dev, atomic per feature
```

For a new piece of work:

```bash
git switch dev
git switch -c feat/about-page-image      # branch off dev
# ... edits + atomic commits ...
git switch dev
git merge feat/about-page-image --ff-only
git switch main
git merge dev --ff-only                  # only when shipping
git branch -d feat/about-page-image
git push                                 # push main
```

If `--ff-only` fails, dev has moved since you branched. Rebase: `git switch feat/...; git rebase dev`.

### Hosting

The build output is fully static (`.output/public/`). Any static host works. Recommended (all have free tiers):

#### Cloudflare Pages

Best fit for this site (Swiss-fast, generous bandwidth).

- Connect the GitHub repo at https://dash.cloudflare.com → Workers & Pages → Create
- **Build command**: `npm run generate`
- **Build output directory**: `.output/public`
- **Environment variable**: `NODE_VERSION=22` (Cloudflare's default may be older)
- Production branch: `main`
- Preview branches: any other branch (e.g., `dev`) gets its own preview URL on every push

Custom domain: Cloudflare → DNS → add `jeremymartin.ch` as a CNAME to the Pages project (Cloudflare auto-issues the TLS cert).

#### Netlify

- Build command: `npm run generate`
- Publish directory: `.output/public`
- Node version: 22 (set in Site settings → Build & deploy → Environment, `NODE_VERSION=22`)

#### Vercel

- Framework preset: Nuxt (auto-detected)
- Build command: `npm run generate` (override the default `npm run build`)
- Output directory: `.output/public`

### Post-deploy smoke test

1. Open the deployed URL.
2. Tab through the home page from the top — focus rings should appear in brand-accent yellow.
3. Click into a case study, scroll to the bottom, confirm scroll-spy and progress bar work.
4. View source on the home page; confirm:
   - `<title>Jérémy Martin — Interaction Designer</title>`
   - `<meta property="og:image" content="https://jeremymartin.ch/_og/s/...png">`
   - `<script type="application/ld+json">` with `WebSite` + `Person`
5. Paste the URL into https://search.google.com/test/rich-results — should see the Person + WebSite (and per-page schema) detected.
6. Paste into https://www.opengraph.xyz to preview the OG card.
7. Run a Lighthouse audit (Chrome DevTools → Lighthouse → mobile). Target scores: 95+ on all four (Performance, Accessibility, Best Practices, SEO).

---

## Common issues

### "Case study in progress" still shows after I added content

Two causes:

1. `status:` is still `"in-progress"` — flip to `"live"`.
2. Frontmatter parses but a required block is missing. Run `npm run dev` and check the terminal for the Zod validation error.

### My new image isn't showing

- Confirm the file is actually at `public/images/...` and named correctly. Case-sensitive on most hosts.
- Confirm the corresponding field is set (see [activating an image](#activating-an-image)).
- `nuxt dev` watches `public/` — restart `dev` if you added a new directory and HMR doesn't pick it up.
- `nuxt generate` recompiles AVIF/WebP variants on every run. Clear `.output/` + `node_modules/.cache/nuxt/` if you suspect a stale cache.

### Build fails on link-check after adding a CV PDF

The PDF doesn't actually exist at the expected path. Check:

```powershell
Get-ChildItem public/jeremy-martin-cv-en.pdf
```

If absent: drop the file. If present but build still fails: the path in `excludeLinks` may have a typo; remove the exclusion entry only when the file is confirmed on disk.

### OG image template changed but the PNG didn't update

`@nuxt/image` and `nuxt-og-image` cache aggressively. Clear:

```powershell
Remove-Item -Recurse -Force .output, node_modules/.cache/nuxt
npm run generate
```

### `npm run dev` won't start after `npm install`

Probably the TLS issue if it's the first time on this machine. See [TLS gotcha](#tls-gotcha-on-this-machine).

### Schema.org doesn't show in Google's test tool

The validator caches results — refetch the URL or use the "Test URL" feature in the Google Search Console after the new deploy is live. Local HTML works too if you click "Test code" and paste it.

---

## When to come back to this file

- **Adding new content** (case study, Index row, Featured card) — case-study section first, then images, then SEO.
- **Replacing a placeholder image** — [Activating an image](#activating-an-image).
- **Going live for the first time** — full read-through, then [pushing to production](#pushing-to-production).
- **Adding a new third-party profile (Bluesky, GitHub, …)** — [Schema.org structured data](#schemaorg-structured-data) → `sameAs`.
- **Customising the brand on the OG image** — [OG images](#og-images) → "Customising the template".
- **Anything failing the build that wasn't failing yesterday** — [Common issues](#common-issues), then check `git log` for the change that broke it.

Architecture, brand thesis, voice locks, and what's *not* shipping at v1 stay in **`CLAUDE.md`**. This file (`POPULATING.md`) is the operational playbook; `CLAUDE.md` is the spec.
