# Architecture

> How this static Nuxt 4 portfolio is built, rendered, and laid out on disk — the map a cold agent reads before changing anything.

## At a glance

| I need to… | Where | Notes / Verify |
|---|---|---|
| Add/edit a home section | `app/pages/index.vue` | Sections 00–05 are **inline** in this one file (no `components/home/` folder). Uses `UiSectionHead` + `UiMediaPlaceholder` and the `featured` / `projects` data. |
| Edit nav, footer, mobile chrome | `app/components/chrome/` | `TopNav`, `MobileTop`, `BottomNav`, `Footer`. Wired in `app/layouts/default.vue:47-53`. |
| Add/edit a case study | `content/en/work/<slug>.md` (+ `content/fr/work/<slug>.md`) | Schema in `content.config.ts`. Page renderer: `app/pages/work/[slug].vue`. See `docs/content-authoring.md`. |
| Change the "More work" ring order | `app/data/workChain.ts` | Ordered slug list with ring-wrap; a slug left out gets no "More work" card. |
| Edit the Index list rows | `app/data/projects.ts` + `i18n/locales/*.json` (`data.projects.*`) | Data file holds structure only; display strings live in the i18n catalog. |
| Edit featured cards | `app/data/featured.ts` + `i18n/locales/*.json` (`data.featured.*`) | 3 entries: databloom, wematch, thea. |
| Change a design token / color / font | `app/assets/css/main.css:6-17` | Tailwind v4 `@theme`. Token rationale: `docs/brand-voice.md`. |
| Add a route module / config | `nuxt.config.ts` | Single config; sections cited below. |
| Add a build-time artifact (llms.txt etc.) | `modules/llms.ts` + `server/llms/` | See `server/llms/README.md`. |
| Localize a string | `i18n/locales/en.json` (source) → `fr.json` (per-key fallback) | See `docs/i18n.md`. |
| Build / verify the site | `npm run generate` → `.output/public` | See **Verify** below and `docs/build-deploy.md`. |

## The stack

Nuxt 4 with the `app/` directory convention (`app.vue`, `app/pages/`, `app/layouts/`, …). Vue 3 + Vite + Nitro under the hood. TypeScript is **strict** (`nuxt.config.ts:174-176`).

Module list — `nuxt.config.ts:8-15`, order is load-bearing (comments in-file):

| Module | Role |
|---|---|
| `@nuxt/image` | Build-time image optimization (AVIF/WebP/JPG, 1×/2× densities). Static IPX, no runtime image service. Config: `nuxt.config.ts:137-148`. |
| `@nuxt/fonts` | Self-hosted Geist Sans + Geist Mono, downloaded at build. Config: `nuxt.config.ts:121-126`. |
| `@nuxtjs/i18n` | EN at `/`, FR at `/fr` with French URL segments. Must load **before** `@nuxtjs/seo` so hreflang/sitemap/og pick up locales. Config: `nuxt.config.ts:53-72`. |
| `@nuxtjs/seo` | Umbrella: robots, sitemap, og-image (Satori), schema.org, link-checker. Must load **before** `@nuxt/content`. Sub-config: `site` (39-43), `ogImage` (80-88), `linkChecker` (152-160), `sitemap` (164-172). |
| `@nuxt/content` | Case studies as Markdown collections. SQLite `native` connector (`nuxt.config.ts:129-131`) to avoid a `better-sqlite3` native build on Windows. Schema: `content.config.ts`. |
| `@vueuse/nuxt` | Scroll / media-query / intersection composables (e.g. `useMediaQuery` in `index.vue`, `useScrollSpy.ts`). |

Tailwind CSS v4 is **CSS-first**, wired via the official Vite plugin (`@tailwindcss/vite`, `nuxt.config.ts:1,20-22`) — **not** the `@nuxtjs/tailwindcss` module. There is no `tailwind.config.js`; tokens and theme live in `@theme` inside `app/assets/css/main.css` (registered at `nuxt.config.ts:17`).

## Rendering model

100% static site generation. There is **no runtime server** — the output is plain files served by nginx (`deploy/nginx-i18n.conf`).

- `ssr: true` (`nuxt.config.ts:25`) + `nitro.preset: 'static'` (`nuxt.config.ts:27`) → `npm run generate` prerenders every route to `.output/public`.
- `nitro.prerender.crawlLinks: true` (`nuxt.config.ts:29`) discovers pages by following links from the entry routes.
- `nitro.prerender.ignore: ['/fr/sitemap.xml']` (`nuxt.config.ts:34`) drops a junk localized sitemap stub; the real per-locale sitemaps come from the sitemap module.
- **Non-link artifacts** (the `llms.txt` / `.md` twins) can't be crawled, so `modules/llms.ts` enumerates live slugs and pushes one literal route per artifact into `nitro.prerender.routes`. See `server/llms/README.md`.
- **OG images**: Satori renders one 1200×630 PNG per page at build into `.output/public/_og/` (`ogImage.zeroRuntime: true`, `nuxt.config.ts:80-88`). Template: `app/components/OgImage/NuxtSeo.satori.vue`. Per-page title/description passed via `defineOgImage()` — site default in `app/layouts/default.vue:32-36`, per-study override in `app/pages/work/[slug].vue`.
- **i18n on a static host**: `detectBrowserLanguage: false` (`nuxt.config.ts:67`) — the root Accept-Language redirect is an nginx rule, not Nuxt. `experimental.prerenderMessages: true` ships locale catalogs as static JSON; `experimental.strictSeo: true` makes i18n own hreflang/canonical/og:locale at prerender time (`nuxt.config.ts:68-71`).

## Where code lives

```
nuxt-portfolio/
├── app/                      # Nuxt 4 app dir
│   ├── app.vue               # root: <NuxtLayout><NuxtPage/></NuxtLayout> (app/app.vue:1-5)
│   ├── error.vue             # 404 / error page
│   ├── layouts/default.vue   # chrome + skip-link + schema.org + default OG (used by every page incl. error)
│   ├── pages/                # routes (see Data flow)
│   ├── components/           # see table below
│   ├── data/                 # typed structure-only data files
│   ├── composables/          # useScrollSpy.ts
│   ├── utils/                # resources.ts (Resource types + helpers)
│   └── assets/css/main.css   # Tailwind v4 @theme tokens + a11y/motion CSS
├── content/{en,fr}/work/     # case studies, per-locale Markdown collections
├── content.config.ts         # @nuxt/content collections + workSchema
├── nuxt.config.ts            # single source of build/runtime config
├── modules/llms.ts           # local Nuxt module: registers llms artifact routes
├── server/llms/              # handler.ts + builders.ts + README.md (build-time text artifacts)
├── i18n/                     # locales/{en,fr}.json + i18n.config.ts
├── scripts/check-i18n-leaks.mjs   # post-generate i18n validator
└── deploy/nginx-i18n.conf    # VPS nginx: redirect, gzip, cache headers, SSG fallback
```

Component taxonomy (`app/components/`) — note there is **no `home/` folder**:

| Folder | Path | Purpose |
|---|---|---|
| chrome | `app/components/chrome/` | Site shell: `TopNav`, `MobileTop`, `BottomNav`, `Footer`. |
| work | `app/components/work/` | Case-study parts: `DesktopTOC`, `MobileTOC`, `ScrollProgress`, `ArtifactBlock`, `RoleColumns`, `AdjacentCard`, `Resources` / `ResourceRow` / `ResourceVideo`. |
| ui | `app/components/ui/` | Primitives: `SectionHead` (numbered heading), `MediaPlaceholder` (`NuxtImg` + placeholder/fallback). |
| OgImage | `app/components/OgImage/` | `NuxtSeo.satori.vue` — the Satori OG card template. |

> Auto-import prefixing: components resolve by folder + name, e.g. `app/components/ui/SectionHead.vue` → `<UiSectionHead>`, `app/components/chrome/TopNav.vue` → `<ChromeTopNav>` (`default.vue:47`).

## Data flow

Two sources feed pages: typed TS data files (`app/data/`) and Markdown content collections (`content/`).

**Home** (`app/pages/index.vue`) imports `featured` (`app/data/featured.ts`) and `projects` (`app/data/projects.ts`) and renders the Selected-work and Index sections directly. The data files carry **structure only** (slug, num, image path, tags, year); every display string is pulled from the i18n catalog keyed by slug — `t('data.featured.<slug>.title')`, `t('data.projects.<key>.title')`, `t('tags.<tag>')` (`index.vue:10-13,126-139`).

**Case study** (`app/pages/work/[slug].vue`):
1. Looks up the doc by slug via `queryCollection('work_fr' | 'work_en').path('/work/<slug>')` with an EN fallback for FR (`[slug].vue:15-25`). Both collections resolve to the same internal `/work/<slug>` path; the `/fr/projets/<slug>` URL prefix comes from i18n routing (`content.config.ts:3-9`).
2. Renders structured frontmatter (hero, brief, problem, role, approach + artifacts, outcome, gallery, resources) — the Markdown **body is unused** (`content.config.ts:8-9`).
3. **"More work" ring**: `chainNeighbours(slug)` from `app/data/workChain.ts` returns prev/next (wraps around the ordered list); off-chain slugs return `{null, null}` → no section (`[slug].vue:27-54`). Neighbour cards come from the `card` frontmatter block, queried with `select('path','card')` only to keep the payload small.
4. A missing study throws `createError(404)` (`[slug].vue:56-62`).

The full content schema (fields, optionality, the `resources` link-vs-video union) lives in `content.config.ts:13-121` — documented for authors in `docs/content-authoring.md`.

## Interaction principles & locked behaviors

Full text in `docs/brand-voice.md` and the original `CLAUDE.md`. The load-bearing ones a change must preserve:

- **Scroll is primary navigation** — no scroll-jacking.
- **Information visible at rest** — hover/tap is enrichment, never gating (e.g. Index rows stay real `<a href>`; the mobile preview reveal in `index.vue:43-52` only enriches a tap).
- **Desktop nav** persists top, every width; **mobile bottom bar** shows only on `(max-width: md) AND (pointer: coarse)` — switch is by **input type, not width** (so a narrow desktop window keeps the top bar).
- **Case-study TOC**: sticky rail desktop / sticky top mobile, scroll-spy active (`useScrollSpy.ts`, `ScrollProgress.vue`).
- **Page transitions**: fade ~200ms, `out-in` (`nuxt.config.ts:95-96`; CSS `main.css:56-65`).
- **Color discipline**: signal yellow (`--color-brand-accent`) only as active/focus/hover accents, never as a large fill. Tokens + rules: `docs/brand-voice.md`.

## Constraints (the locks — and why)

**Accessibility AA — non-negotiable.** WCAG AA contrast on every text/background pair; keyboard reaches everything; focus visible in yellow (`main.css:34-38`, with a 1px ink keyline so the 3:1 non-text contrast bar is met); one `<h1>` per page; `<html lang>` per locale; skip-to-content as first focusable element (`default.vue:41-46`, targets `#main` at `default.vue:49`). Why: it is a design commitment, and broken contrast/focus is a visible regression.

**Performance budgets** (from `CLAUDE.md`):

| Budget | Limit |
|---|---|
| Initial HTML per page | < 50 KB |
| Home total initial load | < 500 KB |
| Case study total | < 1.5 MB |
| LCP (good connection) | < 1 s |
| TTI | < 1.5 s |

Why they hold: SSG + self-hosted fonts + build-time images + no UI/icon libraries (icons are inline SVG). The `work/[slug].vue` card query selects only `path`+`card` specifically to avoid serializing every study's full frontmatter into each page (`[slug].vue:30-45`). Don't add a runtime client framework or large dependency without re-checking these. (LCP/TTI are stated targets, not a measured guarantee — re-check with Lighthouse after a deploy.)

## SSG completeness

"The page is complete in its HTML; JS only enhances." Anything that must exist on a static host has to be prerendered. Concrete trap already handled: hover/tap-only images use raw `<img>` pointing at source files, **not** `<NuxtImg>`, because the static IPX pass never sees client-only markup and would 404 (`index.vue:361-365,424-427`). See `docs/troubleshooting.md`.

**`prefers-reduced-motion` respected** — global guard flattens all animation/transition to ~1ms and disables smooth scroll (`main.css:75-89`); per-component transitions add their own guard (e.g. `index.vue:601-610`). Any new motion inherits the global guard automatically; keep it that way.

## Verify

```bash
# Full static build → writes .output/public (every route prerendered)
npm run generate

# Strict type check (matches nuxt.config.ts typescript.strict)
npx nuxi typecheck

# Post-generate i18n validator: no English leaks into /fr, EN↔FR route parity, lang+canonical
npm run check:i18n
```

Expected: `generate` finishes with a prerendered-routes list and no errors; `.output/public/index.html`, `.output/public/work/<slug>/index.html`, `.output/public/_og/*.png`, and the sitemaps exist. `typecheck` prints no errors. `check:i18n` exits 0.

> **Local environment.** On this machine npm/Nuxt network steps fail TLS verification; prefix the build with the system-CA flag:
> ```bash
> NODE_OPTIONS=--use-system-ca npm run generate
> ```
> This prefix is a local cert workaround, not a project requirement — omit it in CI / on other machines.

## Related

- `docs/brand-voice.md` — design tokens, color discipline, voice rules, Index controlled vocabulary.
- `docs/content-authoring.md` — case-study frontmatter schema and the add-a-study / add-an-Index-row / add-resources runbooks.
- `docs/i18n.md` — locale routing, custom URL segments, the i18n catalog, the leak check.
- `docs/build-deploy.md` — the `generate` pipeline, nginx config, hosting.
- `docs/troubleshooting.md` — failure modes and fixes (TLS, OG timeout, IPX previews).
- `server/llms/README.md` — how the `llms.txt` / `.md` artifacts are built and prerendered.
