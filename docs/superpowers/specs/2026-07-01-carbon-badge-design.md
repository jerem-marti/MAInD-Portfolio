# Carbon badge — design spec

- **Date:** 2026-07-01
- **Status:** Approved (design); ready for implementation plan
- **Topic:** A per-page, live-but-graceful Website Carbon badge in the footer

## Goal

Show visitors that jeremymartin.ch is built with eco-conception in mind by
displaying its measured carbon footprint per page view, sourced from
[Website Carbon](https://www.websitecarbon.com/) (Wholegrain Digital). The badge
should read the figure for **the page you're actually on**, stay localized
(EN/FR) and on-brand, and degrade gracefully with no JS.

## Captured measurement (homepage, real)

From the live Website Carbon report on 2026-06-30
(`https://www.websitecarbon.com/website/jeremymartin-ch/`):

- **CO₂ per view:** `0.05 g`
- **Cleaner than:** `90%` of all web pages globally
- **Rating:** A · **green-hosted** (running on sustainable energy)
- **Last tested:** 30 Jun 2026

These become the **baked fallback** (see Architecture). The rating letter and
green-hosting flag are **not displayed** (decision below) but recorded here for
provenance.

## Context — how the official badge works, and why we don't embed it as-is

The official embed is a JS snippet:

```html
<div id="wcb" class="carbonbadge"></div>
<script src="https://unpkg.com/website-carbon-badges@1.1.3/b.min.js" defer></script>
```

On load it fetches `https://api.websitecarbon.com/b?url=<current URL>`
**client-side** (returns `{ c: grams, p: percentile }`), caches the result in
`localStorage` for 24h, and renders "X g CO₂/view — Cleaner than Y% of pages
tested" with a link to websitecarbon.com. It measures `window.location.href`, so
it is inherently **per-page**.

Rejected for this site because it:

- injects **hardcoded English** text ("Cleaner than X% of pages tested"), which
  would show through on `/fr` and almost certainly fail the load-bearing
  `check:i18n` (English-leak + EN↔FR parity);
- pulls a script from a third-party CDN (unpkg);
- ships default styling that clashes with the footer's mono/hairline aesthetic.

## Decision — hybrid (SSR fallback + live per-page upgrade)

Render our **own** badge markup — localized and brand-styled — and drive it in two
stages:

1. **SSR / no-JS / first paint:** show the baked homepage snapshot from
   `app/data/carbon.ts` (real: `0.05 g`, `cleaner than 90%`). Works without
   JavaScript.
2. **After hydration (client only):** a tiny first-party fetch reads the live
   figure for the **current page** from `https://api.websitecarbon.com/b?url=…`
   and reactively updates the CO₂ and cleaner-than numbers. Cached 24h in
   `localStorage` (mirroring the official badge, one call per page per day).

This gets per-page + live figures while keeping the text localized, the styling
on-brand, and the script first-party (no unpkg). It stays 100% static: the fetch
is client-side and assumes no Nitro server. If the fetch fails (offline, API
throttled, or a page Website Carbon hasn't indexed yet — which returns "Service
temporarily unavailable"), the baked fallback simply remains.

Rejected alternatives: the raw official script (i18n leak, above); a static
single site-wide value (not per-page); static per-route baking (≈15+ manual
measurements across EN/FR, all drifting stale).

**Displayed content:** CO₂ g/view + cleaner-than-% + attribution, and **no date**
— matching the real Website Carbon badge. The **rating letter and green-hosting
are also intentionally omitted** — the live `/b` API returns only `c` and `p`, so
a per-page rating would have to be derived and could be shown wrong; we keep only
what the API actually returns.

## Rendered output

Footer bottom row, matching footer typography exactly
(`font-mono uppercase tracking-[0.08em]`, ~11px, `text-brand-ink-muted`), with a
hairline top divider separating it from the columns above.

> The `0.05`/`90%` below are the real baked fallback values; after hydration the
> two numbers become the current page's live figures (e.g. a heavier work page
> may read higher). The wording never changes.

**EN:**

```
🌿  0.05 G CO₂/VIEW · CLEANER THAN 90% OF PAGES TESTED · WEBSITE CARBON →
```

**FR:**

```
🌿  0,05 G DE CO₂/VUE · PLUS PROPRE QUE 90 % DES PAGES TESTÉES · WEBSITE CARBON →
```

(The 🌿 is an illustration marker; the real mark is a monochrome inline SVG leaf,
not an emoji.)

- `Website Carbon →` is the only linked span; it opens the live report
  (`https://www.websitecarbon.com/website/jeremymartin-ch/`) in a new tab
  (`target="_blank"`, `rel="noopener"`). Hover/focus tints it with
  `--color-brand-accent` (accent only on hover/focus, never a fill).
- The leading mark is a 12px inline SVG **leaf** (`currentColor`, `aria-hidden`),
  a simple minimal single-path leaf. Inherits `text-brand-ink-muted`.

## Architecture

Golden rules honored: numeric/structural data in `app/data/*`, all display words
in the i18n catalog, nothing hardcoded in the component.

### 1. `app/data/carbon.ts` — data (structure only)

The baked fallback snapshot + link. Re-recording later is a one-line edit.

```ts
export interface CarbonMeasurement {
  co2Grams: number       // fallback grams CO₂ per view (homepage snapshot)
  cleanerThanPct: number // fallback "cleaner than N%"
  reportUrl: string      // live Website Carbon report for the domain
}

// Fallback snapshot from the 2026-06-30 report (see spec "Captured measurement").
export const carbon: CarbonMeasurement = {
  co2Grams: 0.05,
  cleanerThanPct: 90,
  reportUrl: 'https://www.websitecarbon.com/website/jeremymartin-ch/',
}
```

### 2. `i18n/locales/{en,fr}.json` — display strings

New keys under `footer.carbon`. The brand name `Website Carbon` and the report
link are shared across locales, appended after a `·` separator, so they stay out
of the interpolation.

- `footer.carbon.line` (EN): `"{co2} g CO₂/view · cleaner than {percent} of pages tested"`
- `footer.carbon.line` (FR): `"{co2} g de CO₂/vue · plus propre que {percent} des pages testées"`
- `footer.carbon.report` (EN): `"View the full carbon report on Website Carbon"` — accessible label for the link
- `footer.carbon.report` (FR): `"Voir le rapport carbone complet sur Website Carbon"`

`{co2}` and `{percent}` are interpolated with locale-formatted values (see
Formatting). The visible link text is the literal `Website Carbon` (shared),
rendered after a `·` separator, followed by the `→` glyph.

### 3. `app/components/chrome/CarbonBadge.vue` — presentation + live upgrade

Reactive state seeded from `carbon` (co2, percent). Renders the localized line +
linked attribution + leaf mark. On the client only (`onMounted` /
`import.meta.client`):

1. Build `key = 'wcb_' + encodeURIComponent(window.location.href)`.
2. If a fresh (< 24h) `localStorage[key]` exists, use it.
3. Else `fetch('https://api.websitecarbon.com/b?url=' + encodeURIComponent(href))`,
   read `{ c, p }`, validate they are finite numbers, update state, and cache
   `{ c, p, t: <clientTimestamp> }`.
4. Any failure (network, non-OK, throttled, malformed) is swallowed — the baked
   fallback stays. Never throws into the render.

The fetch is fire-and-forget after mount, so SSR and initial client render match
(no hydration mismatch); the update lands as a normal reactive change.

Mounted in `Footer.vue` as a new `col-span-12` row inside the existing grid (or a
sibling row directly under it), with a `border-t border-brand-hairline pt-…`
divider.

## Formatting

Locale-aware, via `Intl` (or vue-i18n `n`/`d`):

| Value   | EN         | FR          | Method |
|---------|------------|-------------|--------|
| co2     | `0.05`     | `0,05`      | `Intl.NumberFormat(locale, { maximumFractionDigits: 2 })` |
| percent | `90%`      | `90 %`      | `Intl.NumberFormat(locale, { style: 'percent' })` on `pct/100` (FR yields the NBSP before `%`) |

CSS `uppercase` matches the footer, so source strings stay normal-case.

## Accessibility

- AA contrast: reuses the footer's existing `text-brand-ink-muted` — no new risk.
- The link keeps its focus state (never removed) and carries an accessible name
  via `footer.carbon.report`.
- The leaf SVG mark is `aria-hidden="true"`.
- Reactive number updates are non-intrusive; no live-region needed (not urgent
  info). Plain informative text otherwise.

## Constraints & trade-offs

- **100% static:** all fallback values baked; the live fetch is client-side and
  assumes no server at request time.
- **No invented numbers:** fallback figures are the real 2026-06-30 report values;
  live figures come straight from the Website Carbon API for the current page.
- **i18n catalog:** every display word lives in `en.json`/`fr.json`; FR twin
  included, so `check:i18n` parity/leak checks hold (our own markup, no English
  injected by a third party).
- **Color discipline:** signal yellow only on link hover/focus.
- **No em-dashes** in copy; US spelling in EN.
- **Accepted cost (privacy/eco):** each fresh page view triggers one client-side
  call to `api.websitecarbon.com` (cached 24h per URL), a third-party request from
  the visitor's browser. This is the price of live per-page data; it is minimized
  by the 24h cache and degrades to the static fallback on failure.

## Verification

```bash
NODE_OPTIONS=--use-system-ca npm run generate   # static build + load-bearing link checker
npx nuxi typecheck                              # 4 known baseline errors only
npm run check:i18n                              # after generate: EN↔FR parity, no leaks
```

Plus manual checks: footer row renders in `/` and `/fr`; with JS off the baked
fallback shows; with JS on the number updates for the current page (and differs
between a light page and a heavier work page); the link opens the report;
hover/focus shows the accent.

## Out of scope (YAGNI)

- Rating letter and green-hosting indicator (omitted — not returned by `/b`).
- Per-route baked values, official badge widget, unpkg dependency.
- Any server-side (build-time or runtime) carbon fetch.
