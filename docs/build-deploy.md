# Build & deploy

> How to run, statically build, preview, host, and smoke-test jeremymartin.ch — a 100% prerendered Nuxt 4 site served as static files.

## At a glance

| I need to… | Command | Notes |
|---|---|---|
| Install deps | `npm install` | Runs `postinstall: nuxt prepare` (`package.json:11`). Local TLS note below. |
| Run locally (hot reload) | `npm run dev` | http://localhost:3000, no SSG (`package.json:7`). |
| Build the static site | `npm run generate` | Output → `.output/public/` (`package.json:8`; `nuxt.config.ts:26-36`). |
| Preview the built site | `npm run preview` | Serves `.output/public/` for final QA (`package.json:9`). |
| Type-check | `npx nuxi typecheck` | Full TS check; `typescript.strict: true` (`nuxt.config.ts:174-176`). |
| Verify French parity | `npm run check:i18n` | Run **after** `generate` (`package.json:10`; `scripts/check-i18n-leaks.mjs`). |
| Deploy to a static host | build `npm run generate`, output `.output/public`, `NODE_VERSION=22` | Any static host works; see [Hosting](#hosting). |
| Deploy to the VPS (nginx) | copy `.output/public` → server root; use `deploy/nginx-i18n.conf` | See [nginx](#nginx). |

## Local development

```bash
npm install      # one-time per clone or after pulling new deps
npm run dev      # http://localhost:3000, hot-reload, no SSG
```

`npm install` triggers `postinstall: nuxt prepare` (`package.json:11`), which generates `.nuxt/` types so `typecheck` and editor IntelliSense work immediately.

`npm run dev` serves an SSR dev server with HMR. It is **not** the static build — derived images, OG cards, sitemap, and link-checking only run at `generate` time. To see exactly what ships, use [Preview](#preview--checks).

> **Local environment (this machine)**
> - **TLS:** if `npm install`, `nuxt generate`, or any network step fails with `UNABLE_TO_VERIFY_LEAF_SIGNATURE`, the local SSL inspector is presenting a CA not in Node's bundle. Prefix the command so Node trusts the Windows cert store — do **not** disable strict-ssl:
>   ```powershell
>   $env:NODE_OPTIONS="--use-system-ca"; npm install   # PowerShell
>   ```
>   ```bash
>   NODE_OPTIONS=--use-system-ca npm install            # bash
>   ```
> - **CRLF warning:** Git on Windows converts LF → CRLF on commit (`warning: ... will be replaced by CRLF`). Files are stored LF in the repo (`text=auto`). Normal — ignore.

## The static build

```bash
npm run generate      # → .output/public/
```

`nitro.preset: 'static'` (`nuxt.config.ts:27`) makes `nuxt generate` prerender the whole site to flat files under `.output/public/`. There is **no runtime server**; the host only serves files.

**What `generate` does:**

- **Prerenders every route** to HTML for both locales — EN at `/`, FR at `/fr` (`nuxt.config.ts:26-36`; i18n strategy `prefix_except_default`, `nuxt.config.ts:53-72`).
- **Crawls internal links** found in the rendered HTML and prerenders those too (`nitro.prerender.crawlLinks: true`, `nuxt.config.ts:29`). `/fr/sitemap.xml` is excluded to avoid a junk localized stub (`nuxt.config.ts:34`).
- **Renders OG images at build time via Satori** — one 1200×630 PNG per page into `.output/public/_og/`, with no runtime image service (`ogImage.zeroRuntime: true`, component `NuxtSeo`, Geist registered for the card; `nuxt.config.ts:80-88`). Backed by `satori` + `@resvg/resvg-js` (`package.json:19,22`).
- **Generates sitemap, robots.txt, and schema.org JSON-LD** via `@nuxtjs/seo` (`nuxt.config.ts:12`). Sitemap is `zeroRuntime` and ships a per-locale index (`/sitemap_index.xml` → `/__sitemap__/{en,fr}.xml`); llms text artifacts and `*.md` twins are excluded (`nuxt.config.ts:164-172`).
- **Runs the link checker** over every internal link and **fails the build** on a broken one (status ≥ 400). Known-absent/uncheckable URLs are whitelisted in `linkChecker.excludeLinks` (`nuxt.config.ts:152-160`). This is load-bearing — see [Constraints](#constraints).
- **Compiles `@nuxt/image` variants** — AVIF + WebP + JPG fallback at the responsive breakpoints (640/768/1024/1280/1536) and 1×/2× density, via the static IPX provider into `/_ipx/` (`nuxt.config.ts:137-148`).
- **Self-hosts the fonts** — `@nuxt/fonts` downloads Geist Sans (400, 500) and Geist Mono (400) at build time and emits `@font-face` + hashed files under `/_fonts/` (`nuxt.config.ts:121-126`).
- **Prerenders the llms artifacts** — `modules/llms.ts` registers one route per `llms.txt` / `*.md` twin into `nitro.prerender.routes`, so they land as static text files (see [docs/llms.md](./llms.md) and `server/llms/README.md`).

`@nuxt/content` uses the **native** SQLite connector (`nuxt.config.ts:128-131`), which needs **Node 22.5+** and avoids a `better-sqlite3` native build on Windows.

## Preview & checks

```bash
npm run generate          # produce .output/public first
npm run preview           # serve the built static site for final QA
npm run check:i18n        # assert no English leaks into /fr + EN↔FR route parity + lang/canonical
npx nuxi typecheck        # full TypeScript check
```

`npm run preview` serves the real `.output/public` artifact (not the dev server), so OG cards, derived images, and the 404 fallback behave as in production.

`check:i18n` (`scripts/check-i18n-leaks.mjs`) reads `.output/public` and exits non-zero on: (1) any of ~16 sentinel English UI strings appearing in a `/fr` page (`script:20-37`), (2) a missing EN or FR counterpart for any route — including every `/work/<slug>` ↔ `/fr/projets/<slug>` pair (`script:73-86`), (3) a page missing the correct `<html lang>` or a `<link rel="canonical">` (`script:88-102`). It **requires** that `generate` has already run; it does not build. Detail in [docs/i18n.md](./i18n.md).

## Hosting

The build output (`.output/public/`) is fully static, so any static host serves it. `.output/` is gitignored — hosts build from source, they do not consume a committed artifact. Presented as factual options:

| Host | Build command | Output dir | Node |
|---|---|---|---|
| Cloudflare Pages | `npm run generate` | `.output/public` | env var `NODE_VERSION=22` |
| Netlify | `npm run generate` | `.output/public` | env var `NODE_VERSION=22` |
| Vercel | `npm run generate` (override default `npm run build`) | `.output/public` | env var `NODE_VERSION=22` |

Set the production branch to `main`. On Cloudflare/Netlify, any other branch (e.g. a feature branch) gets its own preview URL per push. `NODE_VERSION=22` matters because the native SQLite connector needs Node 22.5+ (`nuxt.config.ts:128-131`) and some host defaults are older.

## nginx

The VPS option serves `.output/public` directly. The full config is `deploy/nginx-i18n.conf` — copy the generated `.output/public` to the server `root` and adapt `server_name` / `root` / TLS. What each block does (do not paste the whole file into other docs; point here):

- **Root language redirect** — a `map` on `$http_accept_language` plus `location = /` send a first-time French-preferring visitor from `/` to `/fr` once (302, cookie-sticky); every other URL is served verbatim so bots and deep links are never redirected (`conf:16-19, 59-66`). Nuxt does **not** do this (`detectBrowserLanguage: false`, `nuxt.config.ts:67`); nginx owns it. Redirect rationale lives in [docs/i18n.md](./i18n.md).
- **Compression** — `gzip` on for text/CSS/JS/JSON/SVG/XML; already-compressed binaries (woff2, images, video) excluded; optional `brotli` block commented out for builds that have `ngx_brotli` (`conf:36-55`).
- **Cache tiers** — fingerprinted build output `/_nuxt/` + `/_fonts/` → 1 year `immutable`; derived/stable-URL assets `/_ipx/`, `/_og/`, `/videos/`, `/images/` → 30 days (revalidatable, not immutable); `/files/` downloads → 1 day; `.txt`/`.md` artifacts → `no-cache`; HTML and other root files → `no-cache` so a deploy is visible immediately (`conf:83-138`).
- **SSG fallback** — the catch-all `try_files $uri $uri/ $uri.html /404.html;` serves the prerendered file, directory index, `.html` twin, then the prerendered 404 page (from `app/error.vue`) (`conf:135-140`).

## Post-deploy smoke test

After the deploy is live, open the deployed URL and check:

1. **Tab from the top** of the home page — focus rings appear in brand-accent yellow (never missing).
2. **Open a case study**, scroll to the bottom — the sticky TOC scroll-spy highlights the active section and the yellow progress line at the top advances.
3. **View source** on the home page and confirm:
   - `<title>Jérémy Martin — Interaction Designer</title>` (matches `site.name`, `nuxt.config.ts:41`)
   - `<meta property="og:image" content="https://jeremymartin.ch/_og/...png">`
   - a `<script type="application/ld+json">` block with `WebSite` + `Person`
4. **Open `/fr`** in a French-preferring browser from the bare domain — confirm the one-time redirect, then that `/fr` pages show no English chrome and carry `<html lang="fr">`.
5. **Validate structured data**: paste the URL into Google's Rich Results Test (https://search.google.com/test/rich-results).
6. **Preview the OG card**: paste the URL into https://www.opengraph.xyz.

> **Local environment.** Run a Lighthouse audit in Chrome DevTools (Lighthouse → mobile). Target 95+ on Performance, Accessibility, Best Practices, SEO (aligns with the perf/a11y budgets in [docs/architecture.md](./architecture.md)).

## Constraints

- **100% static, no runtime server.** `nitro.preset: 'static'` (`nuxt.config.ts:27`). Nothing runs on the host at request time — no API routes, no SSR, no runtime image/OG service (`ogImage.zeroRuntime`, `sitemap.zeroRuntime`, static IPX). Do not introduce code that assumes a Nitro server in production.
- **The link checker is load-bearing — do not disable it.** It fails the build on broken internal links by design and has caught real bugs. Only add an entry to `linkChecker.excludeLinks` (`nuxt.config.ts:152-160`) for a genuinely uncheckable URL (e.g. a login-walled external page), and **remove the entry the moment the referenced file lands** — e.g. once `public/jeremy-martin-cv-en.pdf` exists, drop `'/jeremy-martin-cv-en.pdf'` so the checker starts verifying it. Wiring the CVs is owned by [docs/content-authoring.md](./content-authoring.md).
- **Node 22.5+** for builds (native SQLite connector, `nuxt.config.ts:128-131`); hosts pin `NODE_VERSION=22`.
- **i18n redirect is nginx, not Nuxt.** Keep `detectBrowserLanguage: false` (`nuxt.config.ts:67`); the root redirect lives only in `deploy/nginx-i18n.conf`.

## Verify

```bash
npm run generate            # static build → .output/public; must exit 0
npm run check:i18n          # i18n guard over the built output
npx nuxi typecheck          # TypeScript, must be clean
```

Expected:
- `generate` exits 0 with no link-check failures; `.output/public/index.html`, `.output/public/fr/index.html`, and `.output/public/work/<slug>/index.html` for each study exist, plus `.output/public/_og/`, `/_nuxt/`, `/_fonts/`, `/_ipx/`.
- `check:i18n` prints a success line and exits 0; any `✗` line + non-zero exit means a leak or a missing counterpart.
- `typecheck` reports no errors.

## Related

- [docs/i18n.md](./i18n.md) — the nginx root redirect rationale and `check:i18n` in depth.
- [docs/troubleshooting.md](./troubleshooting.md) — build failures (link-check, OG cache, stale IPX, TLS).
- [docs/llms.md](./llms.md) — the llms.txt/`.md` prerender pipeline; `server/llms/README.md`.
- [docs/architecture.md](./architecture.md) — the SSG rendering model and perf/a11y budgets.
- [docs/content-authoring.md](./content-authoring.md) — adding content, wiring CVs, SEO/OG per page.
- `deploy/nginx-i18n.conf` — the full VPS server config.
