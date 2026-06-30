# Troubleshooting

> Every known failure mode for jeremymartin.ch in one place: symptom → cause → fix, each tagged **Universal** (applies anywhere) or **Local environment** (this Windows box only). This is the aggregator; the owning doc for each area is linked at the bottom.

This is the canonical home for "the build broke" / "the feature misbehaves." It collects gotchas from `docs/build-deploy.md`, `docs/images.md`, `docs/content-authoring.md`, and `docs/i18n.md` — go to those for the full how-to. Read `docs/build-deploy.md` › Constraints first if you don't know the project: the site is 100% static (`nitro.preset: 'static'`), there is no runtime server, and the `generate`-time link checker is load-bearing.

**Two commands resolve most failures on this machine:**

```powershell
# 1. Almost every network failure on this box is the TLS one — prefix and retry:
$env:NODE_OPTIONS="--use-system-ca"; npm run generate

# 2. A failed OG render leaves chromium orphans that starve the next run — sweep, then retry:
Get-Process chrome,chromium -ErrorAction SilentlyContinue | Stop-Process -Force
```

---

## At a glance

| Symptom | Likely cause | Fix | Tag |
|---|---|---|---|
| `UNABLE_TO_VERIFY_LEAF_SIGNATURE` on any npm/network step | Local SSL inspector's CA not in Node's bundle | `$env:NODE_OPTIONS="--use-system-ca"` then re-run | Local environment |
| Build fails on a link with status ≥ 400 | Referenced file/route missing, or a typo'd path | Drop the file / fix the path; exclude only genuinely uncheckable URLs | Universal |
| `[@nuxtjs/og-image] renderer.createImage timeout` | Satori flaked under load (often chromium orphans piling up) | Sweep chrome/chromium, then re-run `generate` | Universal (cause amplified Local) |
| OG/image PNG didn't change after I edited the template | `@nuxt/image` + `nuxt-og-image` cache aggressively | Delete `.output` + `node_modules/.cache/nuxt`, regenerate | Universal |
| Native SQLite / `@nuxt/content` build error | Node older than 22.5 | Use Node 22 (`NODE_VERSION=22` on hosts) | Universal |
| New image shows as placeholder | File missing/misnamed, field not set, or stale cache | Verify path + field; restart dev; clear cache | Universal |
| Hover preview thumbnail 404s on the live site | IPX never built the on-interaction preview's `_ipx` variant | Serve the source via a raw `<img>` (already done in `index.vue`) | Universal |
| Every image renders ~2px; srcset shows `_ipx/w_1`/`w_2` | `sizes` written in HTML media-query form | Use `@nuxt/image` breakpoint form (`sm:50vw md:33vw …`) | Universal |
| "Case study in progress" still shows | `status` still `in-progress`, or a required block missing | Flip `status: "live"`; check dev terminal for the Zod error | Universal |
| Zod validation error at dev/`generate` | Frontmatter doesn't match `content.config.ts` schema | Read the named field in the error; fix it (see common cases below) | Universal |
| Schema.org not detected in Google's test | Validator cached the old fetch | Refetch / "Test code" paste the rendered HTML | Universal |
| A string is still English on `/fr` | Missing FR key, hardcoded string, verbatim-keep, or missing twin | Walk the 4-step order; `npm run check:i18n` names leaks | Universal |
| `check:i18n` prints `✗` and exits non-zero | English leak, EN↔FR route mismatch, or missing lang/canonical | Add the FR key/twin/route; re-run after `generate` | Universal |
| `warning: LF will be replaced by CRLF` | Git on Windows normalizes line endings | Ignore — repo stores LF | Local environment |

---

## Build & generate

### Link-check fails the build
**Symptom** (Universal): `npm run generate` aborts; the link checker reports an internal link returning status ≥ 400 (commonly a CV PDF path, or a route/file that doesn't exist).
**Cause:** `linkChecker` runs at `generate` and fails on any broken internal link by design (`nuxt.config.ts` › `linkChecker`). The referenced file isn't on disk, or the path has a typo.
**Fix:** Confirm the file exists, then fix the source of the link. For a CV that genuinely isn't ready yet, the path stays in `linkChecker.excludeLinks` — but **remove the exclusion the moment the file lands** so the checker starts verifying it.

```powershell
# Is the referenced file actually there?
Get-ChildItem public/jeremy-martin-cv-en.pdf
# Present but still failing? The excludeLinks entry has a typo, or you removed the
# exclusion before dropping the file. Drop the file, then remove the exclusion.
```

For a **third-party URL that flakes** (a 503/timeout on a site you don't control), add that exact URL to `linkChecker.excludeLinks` in `nuxt.config.ts`. Do **not** disable link-checking globally — it has caught real bugs every phase.
**Tag: Universal.**

### OG `createImage timeout`
**Symptom** (Universal): `generate` dies with `[@nuxtjs/og-image] renderer.createImage timeout` for a random `/work/<slug>`.
**Cause:** Satori under load — flaky, not your content. Link-check runs *before* OG rendering, so a **passing link-check + this timeout means the content is fine**. On this machine the real amplifier is orphaned chromium from previous failed runs piling up and starving the renderer (timeouts snowball 3 → 15 → all).
**Fix:** Sweep chrome/chromium first (see [Local environment](#chromium-orphans-starve-the-og-renderer)), then re-run.

```powershell
Get-Process chrome,chromium -ErrorAction SilentlyContinue | Stop-Process -Force
npm run generate
```

Don't keep blindly re-running without sweeping.
**Tag: Universal** (the snowballing cause is Local — see below).

### OG image / PNG didn't update after editing the template
**Symptom** (Universal): edited `app/components/OgImage/NuxtSeo.satori.vue` (or replaced a source image) but the rendered PNG is unchanged.
**Cause:** `@nuxt/image` and `nuxt-og-image` cache aggressively.
**Fix:** Clear both caches and regenerate.

```powershell
Remove-Item -Recurse -Force .output, node_modules/.cache/nuxt
npm run generate
```

Preview a single OG card in dev at `http://localhost:3000/__og-image__/image/<route>/og.png`.
**Tag: Universal.**

### Build fails on the native SQLite connector / wrong Node version
**Symptom** (Universal): `generate`/`build` errors out around `@nuxt/content`'s database, or a host build fails where local succeeds.
**Cause:** `@nuxt/content` uses the **native** SQLite connector (`nuxt.config.ts` › `content`), which needs **Node 22.5+**.
**Fix:** Build on Node 22. On Cloudflare/Netlify/Vercel set the env var `NODE_VERSION=22` (some host defaults are older).
**Tag: Universal.**

### `nuxi typecheck` reports type-def errors (known baseline, non-blocking)
**Symptom** (Universal): `npx nuxi typecheck` exits non-zero with errors like `"NuxtSeo" is not assignable to keyof OgImageComponents` (`app/layouts/default.vue`, `app/pages/work/[slug].vue`), `'lazy' does not exist in NuxtI18nOptions`, and `'component' does not exist in OgImageOptions` (`nuxt.config.ts`).
**Cause:** type-definition lag in `@nuxtjs/og-image` / `@nuxtjs/i18n` versus the config those modules accept at runtime. The errors are type-only; they do **not** affect `npm run generate` (the static build does not run `vue-tsc`).
**Fix:** none needed for these four — treat them as the current baseline. When you run `typecheck`, confirm you didn't add a *new* error beyond these. (To clear them, pin/upgrade the module type packages — out of scope for content work.)
**Tag: Universal** (current repo state).

---

## Images

### My new image isn't showing (placeholder renders instead)
**Symptom** (Universal): the bordered placeholder div renders where the image should be.
**Cause / Fix — check in order:**

1. The file is actually at `public/images/...` and **named exactly** as referenced (case-sensitive on most hosts).
2. The matching field is set — `hero` / `src` / `preview` / `image` (see `docs/content-authoring.md` › Activating an image). No file or empty field = placeholder by design.
3. You added a **new directory** under `public/` and HMR missed it — restart `npm run dev`.
4. Suspected stale cache — clear and rebuild:

```powershell
Remove-Item -Recurse -Force .output, node_modules/.cache/nuxt
npm run generate
```
**Tag: Universal.**

### Index hover-preview thumbnail 404s on the static host → use a raw `<img>`
**Symptom** (Universal): on the deployed/static-served site, an Index row's hover (or mobile tap-reveal) preview is a broken image; the optimized URL (e.g. `/_ipx/w_300&q_80/images/index/<slug>.jpg`) 404s while the **source** file (`/images/index/<slug>.jpg`) 200s.
**Cause:** the preview rail renders the image **only on interaction**, so the static IPX pass never crawls it and never builds its `_ipx` variant. `npm run dev` has a live IPX server that masks this — it only bites a static build.
**Fix:** serve the **source file directly with a raw `<img>`** (not `<NuxtImg>`). `app/pages/index.vue` already does this for both the desktop rail and the mobile reveal; an unoptimized ~300px decoration is a fair trade. This affects **every** Index preview; case-study hero/gallery/artifact and prev/next adjacent cards are unaffected (they render in crawled HTML). Verify a new preview with a **static serve of `.output/public` + a scripted hover**, not `npm run dev`.
**Tag: Universal.**

### `sizes` must be breakpoint-format, not HTML media queries
**Symptom** (Universal): every image renders at ~2px; the generated srcset shows `_ipx/w_1` / `w_2`.
**Cause:** `@nuxt/image` v2 `sizes` is **breakpoint-format**, not HTML. An HTML media-query string like `sizes="(min-width: 768px) 33vw"` is parsed as a `1px` breakpoint → srcset of `w_1`/`w_2`.
**Fix:** use the breakpoint form, e.g. `sizes="sm:50vw md:33vw lg:33vw xl:33vw 2xl:33vw"`. The shipped components are already correct — copy their existing `sizes` strings rather than inventing one.
**Tag: Universal.**

> A srcset of `_ipx/w_1` is the tell for the `sizes` bug above. (Distinct from the IPX **404** issue, which is the on-interaction-preview problem and is fixed with a raw `<img>`.)

---

## Content & schema

### "Case study in progress" still shows after I added content
**Symptom** (Universal): the page renders only the hero + a "case study in progress" stub even though you wrote the blocks.
**Cause / Fix — two causes:**

1. `status:` is still `"in-progress"` — flip it to `"live"` in `content/en/work/<slug>.md`.
2. Frontmatter parses but a **required block is missing or malformed** — a Zod error. Run `npm run dev` and read the validation error in the terminal.
**Tag: Universal.**

### Zod frontmatter validation error
**Symptom** (Universal): `dev`/`generate` fails with a Zod validation message naming a frontmatter field.
**Cause:** the frontmatter doesn't match the schema in `content.config.ts`. Common offenders:
- Used the reserved key **`meta`** instead of **`brief`** — `meta` is reserved by `@nuxt/content` and silently renders empty.
- A `resources` **video** with neither or both sources — a video needs **exactly one** of `src` *or* (`provider` + `id`).
- An artifact `width` outside `full | wide | inset | half`.
**Fix:** read the field named in the error and correct it against `docs/content-authoring.md` › Frontmatter. Re-run.
**Tag: Universal.**

### Schema.org doesn't show in Google's Rich Results Test
**Symptom** (Universal): structured data you added isn't detected by the validator.
**Cause:** the validator caches its fetch of the URL.
**Fix:** refetch the URL (or use "Test URL" in Search Console after the new deploy is live). To test before deploy, click "Test code" and paste the rendered HTML — local HTML works.
**Tag: Universal.**

---

## i18n

### A string is still English on `/fr`
**Symptom** (Universal): a `/fr` page shows English where you expected French.
**Cause / Fix — check in this order** (full runbook in `docs/i18n.md`):

1. **Missing FR key** — the key exists in `i18n/locales/en.json` but not `fr.json`; `fallbackLocale: 'en'` silently shows English. Add it at the same key path in `fr.json`.
2. **Hardcoded string** — a component renders a literal instead of `t(...)`, or a display string was put in `app/data/*.ts`. Move it into the catalog (`data.*` / `tags.*`); `app/data/*.ts` holds structure only.
3. **Deliberate verbatim-keep** — some French copy keeps English on purpose (e.g. `chrome.tagline`). Confirm against `docs/wip/FR-REVIEW.md` (French is owner-reviewed) before "fixing."
4. **Missing FR content twin** — a case study shows English because `content/fr/work/<slug>.md` doesn't exist (EN fallback). Add the twin.

```powershell
npm run generate
npm run check:i18n   # names every English-sentinel leak with its file path
```
**Tag: Universal.**

### `check:i18n` route-parity (or leak / lang) failure
**Symptom** (Universal): `check:i18n` prints a `✗` line and exits non-zero. It asserts three things, any of which can trip it:
1. **English leak** — a fully-translated UI sentinel appeared on a `/fr` page (see the "still English on `/fr`" runbook above).
2. **Route parity** — an EN route has no FR counterpart (or vice versa): `index ↔ fr/index`, `about ↔ fr/a-propos`, `contact ↔ fr/contact`, and each `work/<slug> ↔ fr/projets/<slug>`.
3. **`<html lang>` / canonical** — a page is missing the correct `<html lang="en|fr">` or a `<link rel="canonical">`.

**Cause (route parity):** usually a new study/route added without its FR enumeration, or a French URL segment changed without updating the parity pairs.
**Fix:** every EN `work/<slug>` auto-enumerates its `/fr/projets/<slug>` route, so a missing pair normally means a new EN study didn't generate cleanly — re-run `generate`. If you **changed a URL segment**, update the `i18n.pages` map in `nuxt.config.ts`, the route lists in `modules/llms.ts`, and the parity pairs in `scripts/check-i18n-leaks.mjs`.

```powershell
npm run generate   # check:i18n reads .output/public — it does NOT build
npm run check:i18n
```

Note: `check:i18n` **requires that `generate` has already run** — it validates the built output, it does not produce it.
**Tag: Universal.**

---

## Local environment (Windows / this machine)

### TLS: `UNABLE_TO_VERIFY_LEAF_SIGNATURE`
**Symptom** (Local environment): `npm install`, `npm run dev`, `npm run generate`, or any network step fails with `UNABLE_TO_VERIFY_LEAF_SIGNATURE`. `curl` on this box hits the same TLS error.
**Cause:** the local SSL inspector presents a CA that isn't in Node's bundled CA list.
**Fix:** make Node trust the Windows certificate store. Do **not** disable `strict-ssl`.

```powershell
$env:NODE_OPTIONS="--use-system-ca"; npm install   # PowerShell
```
```bash
NODE_OPTIONS=--use-system-ca npm install            # bash
```

For scripted downloads (e.g. a Figma MCP asset URL), `curl` fails — use Node `fetch(...)` with the same `NODE_OPTIONS` prefix. CI and other machines do **not** need this. Documented in `.claude/memory/` (npm-tls-use-system-ca).
**Tag: Local environment.**

### CRLF warnings on commit
**Symptom** (Local environment): `warning: in the working copy of '…', LF will be replaced by CRLF the next time Git touches it`.
**Cause:** Git on Windows converts LF → CRLF on checkout/commit; the repo stores LF (`text=auto`).
**Fix:** none — it's normal. Ignore.
**Tag: Local environment.**

### Chromium orphans starve the OG renderer
**Symptom** (Local environment): repeated `[@nuxtjs/og-image] renderer.createImage timeout`s that **snowball** across re-runs (3 → 15 → all routes); `Get-Process chrome,chromium` shows a growing pile (dozens).
**Cause:** every `generate` that dies on an OG timeout — and every headless puppeteer capture script that errors — leaves chromium processes behind. They accumulate and starve the next run's renderer.
**Fix:** sweep chrome/chromium **before** retrying. A clean slate with idle CPU usually builds first try.

```powershell
Get-Process chrome,chromium -ErrorAction SilentlyContinue | Stop-Process -Force
npm run generate
```
**Tag: Local environment.**

### Image-production deps were pruned
**Symptom** (Local environment): an image-production script fails with a missing-module error for `sharp`, `mupdf`, or `puppeteer-core`.
**Cause:** these are transient (`--no-save`) deps used only for the image pipeline; an `npm install`/prune can remove them.
**Fix:** reinstall them (with the TLS prefix). Run all image production in the **main thread** — background subagents get code-execution denied.

```powershell
$env:NODE_OPTIONS="--use-system-ca"; npm i sharp mupdf puppeteer-core --no-save
```
**Tag: Local environment.** (Full pipeline: `docs/images.md` › Production pipeline.)

### `EBUSY: resource busy or locked, rmdir '.output'` during generate
**Symptom** (Local environment): `npm run generate` builds the client and server fine, then fails at the finalize step with `EBUSY: resource busy or locked, rmdir '...\.output'`.
**Cause:** a stale process holds a handle on `.output` on Windows (a previous `generate`/`preview`/`nuxi` run, an Explorer/IDE window inside `.output`, or antivirus), so Nuxt can't clear the directory.
**Fix:** stop anything serving or watching `.output` (e.g. `npm run preview`, an open Explorer window), then re-run. If a specific stray `node` process is the culprit, end that one — do **not** blanket-kill `node` while other tooling (or this session) is running. `Remove-Item -Recurse -Force .output` works once the holder is gone.
**Tag: Local environment.**

---

## Related

The owning doc for each area — go there for the full how-to:

- **`docs/build-deploy.md`** — link-check as a load-bearing constraint, Node 22.5+, TLS, CRLF, the static-build model, `check:i18n` placement.
- **`docs/images.md`** — §6 Learnings/gotchas: the OG timeout + chromium sweep, the IPX raw-`<img>` preview fix, the `sizes` breakpoint format, big PDFs, external link-check flakes, supplied-asset watermark checks, the sharp/mupdf/puppeteer pipeline.
- **`docs/content-authoring.md`** — Common issues: in-progress stub, image not showing, link-check after a CV, OG PNG didn't update, dev won't start (TLS), schema.org caching; the full frontmatter schema.
- **`docs/i18n.md`** — Runbooks: "a string is still English on `/fr`", the three `check:i18n` assertions, adding a French twin/segment.
- **`AGENTS.md`** — the top-level index of all docs.
- `.claude/memory/npm-tls-use-system-ca.md` — the TLS workaround note.
