# Carbon Badge Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a per-page Website Carbon badge to the footer — a baked homepage snapshot that renders statically, then upgrades to the current page's live figure via a small first-party client fetch.

**Architecture:** A presentational `ChromeCarbonBadge` component reads a baked fallback from `app/data/carbon.ts` and renders a localized, brand-styled footer line (leaf mark + "{co2} g CO₂/view · cleaner than {percent} of pages tested · Website Carbon →"). On `onMounted` (client only) it fetches `https://api.websitecarbon.com/b?url=<current URL>`, validates `{c, p}`, caches 24h in `localStorage`, and reactively updates the two numbers. Any failure keeps the static fallback. The badge is mounted in `Footer.vue`, which the default layout renders on every page (EN + FR).

**Tech Stack:** Nuxt 4 (SSG, `nitro.preset: 'static'`), Vue 3 `<script setup>`, `@nuxtjs/i18n` v10 (`useI18n`, named interpolation), Tailwind v4 (brand tokens in `main.css`), native `fetch` + `Intl` (no new dependencies).

## Global Constraints

- **100% static site** — no code that assumes a Nitro server at request time. The live fetch runs client-side in `onMounted` only (never during prerender).
- **No new dependencies, no test framework.** The project has no unit-test runner; do not add one. Each task's verification uses the project's real gates: `npx nuxi typecheck`, `npm run generate`, `npm run check:i18n`, plus targeted manual browser checks.
- **Display strings live in the i18n catalog** (`i18n/locales/{en,fr}.json`) — never hardcoded in the component. Structure/data lives in `app/data/*.ts`.
- **French twin is mandatory.** `fallbackLocale: 'en'` means a missing FR key silently renders English on `/fr` (an i18n leak). Every EN key added must get its FR counterpart in the same task.
- **No em-dashes** in the badge copy; **US spelling** in EN.
- **Color discipline:** signal yellow (`--color-brand-accent`) is never text (only ~1.33:1 on the light bg). Links use `text-brand-ink-muted hover:text-brand-ink`; focus is the global `:focus-visible` ring — do not override it.
- **Accessibility AA is non-negotiable:** never remove focus states; the leaf mark is `aria-hidden`; the link carries an accessible name.
- **The `generate`-time link checker is load-bearing** and checks external links — the Website Carbon report URL must be excluded or `generate` fails.
- **Local env:** on this Windows machine prefix build/network commands with the system-CA flag: `NODE_OPTIONS=--use-system-ca npm run generate` (Git Bash) or `$env:NODE_OPTIONS='--use-system-ca'; npm run generate` (PowerShell). `typecheck` does not need it.
- **Commits carry no `Co-Authored-By: Claude` trailer.** Work stays on branch `feat/carbon-badge`.
- **Real numbers only.** The baked fallback is the 2026-06-30 report: `0.05 g`, `cleaner than 90%`. Report URL: `https://www.websitecarbon.com/website/jeremymartin-ch/`.

---

## Task 1: Carbon data module

**Files:**
- Create: `app/data/carbon.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `export const carbon: CarbonMeasurement` with `{ co2Grams: number, cleanerThanPct: number, reportUrl: string }`. Imported by Task 3 as `import { carbon } from '~/data/carbon'`.

- [ ] **Step 1: Create the data module**

Create `app/data/carbon.ts`:

```ts
export interface CarbonMeasurement {
  /** Fallback grams of CO₂ per view (homepage snapshot). */
  co2Grams: number
  /** Fallback "cleaner than N%" percentile (whole number, e.g. 90). */
  cleanerThanPct: number
  /** Live Website Carbon report for the domain (link target). */
  reportUrl: string
}

// Baked fallback shown on SSR / no-JS / first paint. From the 2026-06-30 Website
// Carbon report (rating A, green-hosted; only the two figures below are shown).
// The component upgrades co2/percent to the current page's live value on the
// client. Re-recording later is a one-line edit here.
export const carbon: CarbonMeasurement = {
  co2Grams: 0.05,
  cleanerThanPct: 90,
  reportUrl: 'https://www.websitecarbon.com/website/jeremymartin-ch/',
}
```

- [ ] **Step 2: Typecheck**

Run: `npx nuxi typecheck`
Expected: PASS with no NEW errors (the 4 known baseline type-def errors may remain — see `docs/troubleshooting.md`). No error referencing `app/data/carbon.ts`.

- [ ] **Step 3: Commit**

```bash
git add app/data/carbon.ts
git commit -m "feat: add carbon measurement data module"
```

---

## Task 2: i18n catalog keys (EN + FR)

**Files:**
- Modify: `i18n/locales/en.json` (the `footer` object, ~lines 13-21)
- Modify: `i18n/locales/fr.json` (the `footer` object, ~lines 13-21)

**Interfaces:**
- Consumes: nothing.
- Produces: `footer.carbon.line` (interpolates `{co2}`, `{percent}`) and `footer.carbon.report` in both locales. Used by Task 3 via `t('footer.carbon.line', { co2, percent })` and `t('footer.carbon.report')`.

- [ ] **Step 1: Add the EN keys**

In `i18n/locales/en.json`, add a `carbon` object inside `footer` (note the added comma after the `line` value). The `footer` block becomes:

```json
  "footer": {
    "contact": "Contact",
    "linkedin": "LinkedIn — jermarti",
    "github": "GitHub — jerem-marti",
    "language": "Language",
    "copyright": "© 2026",
    "license": "License",
    "line": "Jérémy Martin · jeremymartin.ch",
    "carbon": {
      "line": "{co2} g CO₂/view · cleaner than {percent} of pages tested",
      "report": "View the full carbon report on Website Carbon"
    }
  },
```

- [ ] **Step 2: Add the FR twin**

In `i18n/locales/fr.json`, add the matching `carbon` object inside `footer`:

```json
  "footer": {
    "contact": "Contact",
    "linkedin": "LinkedIn — jermarti",
    "github": "GitHub — jerem-marti",
    "language": "Langue",
    "copyright": "© 2026",
    "license": "Licence",
    "line": "Jérémy Martin · jeremymartin.ch",
    "carbon": {
      "line": "{co2} g de CO₂/vue · plus propre que {percent} des pages testées",
      "report": "Voir le rapport carbone complet sur Website Carbon"
    }
  },
```

- [ ] **Step 3: Validate JSON both files parse**

Run: `node -e "JSON.parse(require('fs').readFileSync('i18n/locales/en.json','utf8')); JSON.parse(require('fs').readFileSync('i18n/locales/fr.json','utf8')); console.log('both OK')"`
Expected: prints `both OK` (no JSON syntax error from the added comma/object).

- [ ] **Step 4: Commit**

```bash
git add i18n/locales/en.json i18n/locales/fr.json
git commit -m "feat: add footer carbon badge strings (EN + FR)"
```

---

## Task 3: CarbonBadge component (static render)

**Files:**
- Create: `app/components/chrome/CarbonBadge.vue`

**Interfaces:**
- Consumes: `carbon` from `~/data/carbon` (Task 1); `footer.carbon.line` / `footer.carbon.report` (Task 2).
- Produces: the `<ChromeCarbonBadge />` component (Nuxt auto-imports `app/components/chrome/*` with the `Chrome` prefix). Reactive refs `co2` and `cleanerThanPct` are seeded from `carbon` and will be updated by Task 5. Root element is a `col-span-12` block so it slots into the footer grid.

- [ ] **Step 1: Create the component (static render only)**

Create `app/components/chrome/CarbonBadge.vue`. The live fetch is added in Task 5; for now it renders the baked fallback, localized and formatted.

```vue
<script setup lang="ts">
import { carbon } from '~/data/carbon'

const { t, locale } = useI18n()

// Figures are reactive and seeded from the baked homepage snapshot, so SSR /
// no-JS render real values. Task 5 upgrades them to the current page's live
// figure after mount.
const co2 = ref(carbon.co2Grams)
const cleanerThanPct = ref(carbon.cleanerThanPct)

// Locale-aware formatting: EN "0.05" / "90%", FR "0,05" / "90 %".
const co2Display = computed(() =>
  new Intl.NumberFormat(locale.value, { maximumFractionDigits: 2 }).format(co2.value),
)
const percentDisplay = computed(() =>
  new Intl.NumberFormat(locale.value, { style: 'percent', maximumFractionDigits: 0 }).format(
    cleanerThanPct.value / 100,
  ),
)
</script>

<template>
  <div class="col-span-12 border-t border-brand-hairline pt-6">
    <p class="flex items-center gap-2 font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink-muted">
      <!-- Leaf mark (Lucide "leaf"), decorative. Inherits the muted ink color. -->
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        class="size-3 shrink-0"
      >
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
      <span>
        {{ t('footer.carbon.line', { co2: co2Display, percent: percentDisplay }) }}
        <span aria-hidden="true"> · </span>
        <a
          :href="carbon.reportUrl"
          :aria-label="t('footer.carbon.report')"
          target="_blank"
          rel="noopener"
          class="text-brand-ink-muted hover:text-brand-ink transition-colors"
        >Website Carbon <span aria-hidden="true">→</span></a>
      </span>
    </p>
  </div>
</template>
```

- [ ] **Step 2: Typecheck**

Run: `npx nuxi typecheck`
Expected: PASS with no NEW errors referencing `CarbonBadge.vue`. (The component is not yet mounted anywhere — it only needs to compile; it is wired in Task 4.)

- [ ] **Step 3: Commit**

```bash
git add app/components/chrome/CarbonBadge.vue
git commit -m "feat: add CarbonBadge component (static render)"
```

---

## Task 4: Wire into the footer and exclude the report link from the checker

**Files:**
- Modify: `app/components/chrome/Footer.vue` (add the badge as the last grid child)
- Modify: `nuxt.config.ts` (`linkChecker.excludeLinks`)

**Interfaces:**
- Consumes: `<ChromeCarbonBadge />` (Task 3).
- Produces: the badge rendered site-wide (default layout → `ChromeFooter` on every page).

- [ ] **Step 1: Mount the badge in the footer grid**

In `app/components/chrome/Footer.vue`, add `<ChromeCarbonBadge />` as the final child **inside** the grid `div` (the one with `grid grid-cols-12 …`), immediately after the third column `div` (the copyright/license/tagline column) and before the grid `div` closes. Locate:

```html
        <span class="font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink">
          {{ t('footer.line') }}
        </span>
      </div>
    </div>
  </footer>
```

and insert the component so it reads:

```html
        <span class="font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink">
          {{ t('footer.line') }}
        </span>
      </div>
      <ChromeCarbonBadge />
    </div>
  </footer>
```

- [ ] **Step 2: Exclude the Website Carbon report URL from the link checker**

In `nuxt.config.ts`, add the report URL to `linkChecker.excludeLinks`. Locate:

```ts
  linkChecker: {
    excludeLinks: [
      '/jeremy-martin-cv-en.pdf',
      '/jeremy-martin-cv-fr.pdf',
      // Instagram serves a login/bot wall to crawlers (non-200), so the checker
      // can't validate it. Verified manually instead.
      'https://www.instagram.com/p/DXeyH-NGswr/',
    ],
  },
```

and add the entry:

```ts
  linkChecker: {
    excludeLinks: [
      '/jeremy-martin-cv-en.pdf',
      '/jeremy-martin-cv-fr.pdf',
      // Instagram serves a login/bot wall to crawlers (non-200), so the checker
      // can't validate it. Verified manually instead.
      'https://www.instagram.com/p/DXeyH-NGswr/',
      // Website Carbon's report page blocks automated crawlers (WAF → 403), so
      // the checker can't validate it. Verified manually instead.
      'https://www.websitecarbon.com/website/jeremymartin-ch/',
    ],
  },
```

- [ ] **Step 3: Typecheck**

Run: `npx nuxi typecheck`
Expected: PASS, no NEW errors.

- [ ] **Step 4: Static build (build + load-bearing link check)**

Run: `NODE_OPTIONS=--use-system-ca npm run generate`
Expected: build completes and writes `.output/public`; the link-check phase passes (no failure on the Website Carbon URL because it is excluded).

- [ ] **Step 5: i18n parity + leak check**

Run: `npm run check:i18n`
Expected: `✓ i18n check passed` — FR pages scanned, route pairs present, lang/canonical OK. (Our FR twin means no English leak from the badge.)

- [ ] **Step 6: Manual browser check**

Run: `NODE_OPTIONS=--use-system-ca npm run preview` (or serve `.output/public`), then in a browser:
- Home `/`: footer shows `🌿 0.05 G CO₂/VIEW · CLEANER THAN 90% OF PAGES TESTED · WEBSITE CARBON →` (uppercased, mono, muted, hairline divider above).
- `/fr`: shows `🌿 0,05 G DE CO₂/VUE · PLUS PROPRE QUE 90 % DES PAGES TESTÉES · WEBSITE CARBON →`.
- Tab to the link: the global yellow focus ring appears; hover darkens it muted→ink.
- Click "Website Carbon →": opens the report in a new tab.

Expected: all of the above hold. (Numbers are the static fallback until Task 5.)

- [ ] **Step 7: Commit**

```bash
git add app/components/chrome/Footer.vue nuxt.config.ts
git commit -m "feat: mount carbon badge in footer; exclude report URL from link checker"
```

---

## Task 5: Live per-page fetch upgrade

**Files:**
- Modify: `app/components/chrome/CarbonBadge.vue` (add the client-side fetch)

**Interfaces:**
- Consumes: the reactive `co2` / `cleanerThanPct` refs from Task 3.
- Produces: after mount, the two numbers reflect the current page's live Website Carbon figure (or stay at the baked fallback on any failure).

- [ ] **Step 1: Add the fetch + cache logic to the component script**

In `app/components/chrome/CarbonBadge.vue`, add the following **after** the `percentDisplay` computed (still inside `<script setup>`). It runs only in `onMounted`, which never executes during prerender, so SSR output is unchanged and there is no hydration mismatch.

```ts
// --- Live per-page upgrade (client only) ------------------------------------
// Mirror the official badge: one call per URL per day, cached in localStorage.
// The /b endpoint returns { c: grams, p: percentile } on success, or an error
// object otherwise. Any failure leaves the baked fallback in place.
const CACHE_TTL = 864e5 // 24h, matching the official badge

interface CarbonApiResult {
  c: number
  p: number
}

function applyResult(r: CarbonApiResult) {
  co2.value = r.c
  cleanerThanPct.value = r.p
}

function readCache(key: string): CarbonApiResult | null {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const v = JSON.parse(raw)
    if (
      typeof v?.c === 'number' &&
      typeof v?.p === 'number' &&
      typeof v?.t === 'number' &&
      Date.now() - v.t < CACHE_TTL
    ) {
      return { c: v.c, p: v.p }
    }
  } catch {
    // corrupt/blocked storage → ignore, fall through to fetch
  }
  return null
}

onMounted(async () => {
  const href = window.location.href
  const key = `wcb_${encodeURIComponent(href)}`

  const cached = readCache(key)
  if (cached) {
    applyResult(cached)
    return
  }

  try {
    const res = await fetch(`https://api.websitecarbon.com/b?url=${encodeURIComponent(href)}`)
    if (!res.ok) return
    const data = await res.json()
    if (typeof data?.c === 'number' && typeof data?.p === 'number') {
      applyResult({ c: data.c, p: data.p })
      try {
        localStorage.setItem(key, JSON.stringify({ c: data.c, p: data.p, t: Date.now() }))
      } catch {
        // storage full/blocked → the value still shows this session
      }
    }
    // else: error payload (e.g. un-indexed page "Service temporarily
    // unavailable") → keep the baked fallback silently.
  } catch {
    // network/CORS/offline → keep the baked fallback silently.
  }
})
```

- [ ] **Step 2: Typecheck**

Run: `npx nuxi typecheck`
Expected: PASS with no NEW errors referencing `CarbonBadge.vue`.

- [ ] **Step 3: Static build stays hermetic**

Run: `NODE_OPTIONS=--use-system-ca npm run generate`
Expected: build passes. The prerendered HTML still contains the baked fallback (`0.05` / `90%`) — confirm the API was NOT called at build time:

Run: `grep -rl "api.websitecarbon.com" .output/public --include=*.html`
Expected: no output (the endpoint appears only in the JS bundle, not baked into HTML; the fetch runs in the browser).

- [ ] **Step 4: Manual browser check (live upgrade)**

Serve `.output/public` (or `npm run preview`) and open the browser devtools Network tab:
- On `/`: a request to `api.websitecarbon.com/b?url=…` fires after load; if it returns `{c,p}`, the two numbers update to the live figure; reload → served from `localStorage` (no second call within 24h).
- Open a heavier page (e.g. a `/work/<slug>`): the request uses that page's URL; the figure may differ from the homepage's.
- Simulate failure (devtools offline, or block the domain): the badge keeps showing `0.05` / `90%` with no console error thrown into render.

Expected: numbers upgrade when the API responds; the static fallback holds on any failure.

- [ ] **Step 5: Commit**

```bash
git add app/components/chrome/CarbonBadge.vue
git commit -m "feat: upgrade carbon badge to live per-page figures on the client"
```

---

## Self-Review

**Spec coverage:**
- Hybrid SSR-fallback + client upgrade → Tasks 3 (static) + 5 (fetch). ✓
- Data module with real fallback + report URL → Task 1. ✓
- i18n keys with FR twin, no connector, shared "Website Carbon" → Task 2. ✓
- Own localized markup (no English injected) → Task 3 (keeps `check:i18n` green, Task 4 Step 5). ✓
- Leaf SVG mark, `aria-hidden`, mono/uppercase footer styling, hairline divider → Task 3. ✓
- Link: `text-brand-ink-muted hover:text-brand-ink`, global focus ring, accessible name, new tab → Task 3. ✓
- Per-page live fetch, 24h localStorage cache, `{c,p}` validation, graceful failure → Task 5. ✓
- Footer wiring site-wide → Task 4. ✓
- Link checker exclusion (load-bearing generate) → Task 4 Step 2. ✓
- Verification via typecheck / generate / check:i18n / manual (no test framework added) → every task. ✓
- Rating/green-hosting omitted (not returned by `/b`) → not implemented, by design. ✓

**Placeholder scan:** No TBD/TODO; all code and commands are concrete. ✓

**Type consistency:** `co2` / `cleanerThanPct` refs defined in Task 3 are the same ones updated in Task 5. `CarbonApiResult { c, p }` and `applyResult` are consistent. `carbon.{co2Grams,cleanerThanPct,reportUrl}` match Task 1's interface. `t('footer.carbon.line', { co2, percent })` params match Task 2's `{co2}`/`{percent}`. ✓

**Note on `Date.now()`:** used only inside browser component code (Task 5), not in any workflow/build script — valid here.
