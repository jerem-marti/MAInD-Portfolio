# Carbon badge — design spec

- **Date:** 2026-07-01
- **Status:** Approved (design); ready for implementation plan
- **Topic:** A static, brand-styled Website Carbon badge in the footer

## Goal

Show visitors that jeremymartin.ch is built with eco-conception in mind by
displaying its measured carbon footprint per page view, sourced from
[Website Carbon](https://www.websitecarbon.com/) (Wholegrain Digital). The badge
must be **self-consistent with the eco thesis**: it should not itself add runtime
weight, third-party requests, or a privacy hop.

## Context — how the official badge works, and why we don't use it as-is

The official embed is a JS snippet:

```html
<div id="wcb" class="carbonbadge"></div>
<script src="https://unpkg.com/website-carbon-badges@1.1.3/b.min.js" defer></script>
```

On load it fetches `https://api.websitecarbon.com/b?url=<current URL>` **client-side**,
caches the result in `localStorage` for 24h, and renders "X g CO₂/view — Cleaner
than Y% of pages tested" with a link to websitecarbon.com. It reads no config
attributes; it measures `window.location.href`.

Rejected for this site because it:

- pulls a script from a third-party CDN (unpkg) and calls an external API on each
  fresh visit — an eco badge that itself adds a request and a privacy hop;
- ships default styling that clashes with the footer's mono/hairline aesthetic;
- assumes JS is enabled to render anything at all.

A build-time fetch variant was also considered and rejected: it adds a network
call and failure mode to the load-bearing `generate` step for a value that
changes slowly.

## Decision

A **static, brand-styled** badge. The measured figures are baked into the static
HTML, styled to match the footer, and linked to the live Website Carbon report
for verification. Zero third-party runtime JS, no external API call on visit,
fully private and on-brand. The trade-off — it is a dated snapshot, not
auto-updating — is made honest by a visible "measured {date}" note.

**Placement:** a slim, full-width colophon line at the bottom of the footer,
below the three existing columns.

**Attribution:** the source is credited inline; the brand name "Website Carbon"
is the link to the live report.

## Rendered output

Footer bottom row, matching footer typography exactly
(`font-mono uppercase tracking-[0.08em]`, ~11px, `text-brand-ink-muted`), with a
hairline top divider separating it from the columns above.

> The `0.04` / `92%` below illustrate the *format* only. The shipped figures are
> the real measured values from "Measurement capture"; these examples are not
> copy to bake in.

**EN:**

```
◐  0.04 G CO₂/VIEW · CLEANER THAN 92% OF PAGES TESTED · MEASURED JUL 2026 BY WEBSITE CARBON →
```

**FR:**

```
◐  0,04 G DE CO₂/VUE · PLUS PROPRE QUE 92 % DES PAGES TESTÉES · MESURÉ JUIL. 2026 PAR WEBSITE CARBON →
```

- `Website Carbon →` is the only linked span; it opens the live report in a new
  tab (`target="_blank"`, `rel="noopener"`). Hover/focus tints it with
  `--color-brand-accent` (accent only on hover/focus, never a fill — color
  discipline honored).
- `◐` is a leading 12px inline SVG mark (`currentColor`, `aria-hidden`), a simple
  half-filled circle suggesting efficiency. **Resolved:** keep the SVG mark.
- **Resolved:** the link is scoped to `Website Carbon →` only, not the whole line.

## Architecture

Three pieces, each with one clear purpose. Golden rules honored: numeric/structural
data in `app/data/*`, all display words in the i18n catalog, nothing hardcoded in
the component.

### 1. `app/data/carbon.ts` — data (structure only)

Single source of truth for the measured snapshot. Re-measuring later is a one-line
edit.

```ts
export interface CarbonMeasurement {
  co2Grams: number      // grams CO₂ per page view, from Website Carbon
  cleanerThanPct: number // percentile: "cleaner than N% of pages tested"
  measuredOn: string    // ISO date, e.g. '2026-07-01' — drives the visible snapshot
  reportUrl: string     // live Website Carbon report for the domain
}

export const carbon: CarbonMeasurement = {
  co2Grams: 0.00,          // REAL value baked in before merge (see "Measurement capture")
  cleanerThanPct: 0,       // REAL value baked in before merge
  measuredOn: '2026-07-01',
  reportUrl: 'https://www.websitecarbon.com/website/<slug>/', // confirmed at capture
}
```

> The zeros above are the data *shape*, not shipped copy. Implementation replaces
> them with the real measured figures (see "Measurement capture"). The file must
> never carry an invented number.

### 2. `i18n/locales/{en,fr}.json` — display strings

New keys under `footer.carbon`. The connector word (`by`/`par`) is localized; the
brand name `Website Carbon` and the report link are shared across locales, so the
link stays out of the interpolation.

- `footer.carbon.line` (EN): `"{co2} g CO₂/view · cleaner than {percent} of pages tested · measured {date} by"`
- `footer.carbon.line` (FR): `"{co2} g de CO₂/vue · plus propre que {percent} des pages testées · mesuré {date} par"`
- `footer.carbon.report` (EN): `"View the full carbon report on Website Carbon"` — accessible label for the link
- `footer.carbon.report` (FR): `"Voir le rapport carbone complet sur Website Carbon"`

`{co2}`, `{percent}`, `{date}` are interpolated with locale-formatted values (see
Formatting). The visible link text is the literal `Website Carbon` (shared),
rendered after the localized connector, followed by the `→` glyph.

### 3. `app/components/chrome/CarbonBadge.vue` — presentation

Presentational component. Reads `carbon` from the data file, formats the three
interpolated values for the active locale, renders the line + linked attribution.
No data or copy defined inline.

Mounted in `Footer.vue` as a new `col-span-12` row inside the existing grid
container (or as a sibling row directly under the grid), with a
`border-t border-brand-hairline pt-…` divider.

## Formatting

Locale-aware, via `Intl` (or vue-i18n's `n`/`d`) so numbers read natively:

| Value   | EN        | FR         | Method |
|---------|-----------|------------|--------|
| co2     | `0.04`    | `0,04`     | `Intl.NumberFormat(locale, { maximumFractionDigits: 2 })` |
| percent | `92%`     | `92 %`     | `Intl.NumberFormat(locale, { style: 'percent' })` on `pct/100`, or localized string with the `%` — FR gets the non-breaking space before `%` |
| date    | `Jul 2026`| `juil. 2026` | `Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' })` on `measuredOn` |

The whole line is uppercased by CSS (`uppercase`) to match the footer, so source
strings stay normal-case.

## Accessibility

- AA contrast: reuses the same `text-brand-ink-muted` the footer labels already
  use — no new contrast risk.
- The link keeps its focus state (never removed) and carries an accessible name
  via `footer.carbon.report`.
- The `◐` SVG mark is `aria-hidden="true"`.
- The line is plain informative text; no ARIA gymnastics needed.

## Constraints honored

- **100% static:** all values baked at build; no Nitro/runtime assumption, no
  client-side external call.
- **No invented numbers:** figures come from a real Website Carbon measurement
  captured before merge.
- **i18n catalog:** every display word lives in `en.json`/`fr.json`; FR twin
  included, so `check:i18n` route/string parity holds.
- **Color discipline:** signal yellow only on link hover/focus.
- **No em-dashes** in the copy; US spelling in EN.

## Measurement capture (implementation step, not a placeholder)

Before merge, obtain the real figures for the deployed apex URL
`https://jeremymartin.ch/` and write them into `app/data/carbon.ts`:

1. Preferred: query the badge API once it indexes the site —
   `GET https://api.websitecarbon.com/b?url=https%3A%2F%2Fjeremymartin.ch`
   returns `{ c: <grams>, p: <percentile>, … }`. (As of 2026-07-01 this returns
   "Service temporarily unavailable" because the URL is not yet indexed; loading
   the official badge once against the live URL, or running the calculator UI at
   websitecarbon.com, seeds the test.)
2. Fallback: run the Website Carbon Calculator UI against the live URL and read
   the grams + "cleaner than" percentile, and copy the resulting shareable report
   URL into `reportUrl`.

Acceptance: `app/data/carbon.ts` contains real, non-zero measured values and a
valid `reportUrl`; the badge renders those figures.

## Verification

```bash
NODE_OPTIONS=--use-system-ca npm run generate   # static build + load-bearing link checker
npx nuxi typecheck                              # 4 known baseline errors only
npm run check:i18n                              # after generate: EN↔FR parity, no leaks
```

Plus a manual check that the footer row renders in both `/` and `/fr`, the link
opens the report, and hover/focus shows the accent.

## Out of scope (YAGNI)

- Live/auto-updating value, build-time fetch, per-page CO₂ (site-wide snapshot is
  enough).
- Green-hosting indicator (omitted unless the host is verifiably green — no
  unverified claim).
- Any third-party script or the official badge widget.
