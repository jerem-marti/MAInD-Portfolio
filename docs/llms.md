# llms.txt pipeline

> Build-time generation of the site's AI-crawler artifacts (`/llms.txt`, `/llms-full.txt`, and per-page `.md` twins, plus an `/fr` mirror), synthesized from case-study frontmatter and `app/data` ordering — no runtime server.

## At a glance

| I need to… | Where | Notes |
| --- | --- | --- |
| Add a case study | `content/en/work/<slug>.md` + `app/data` | **Nothing to wire here.** The twin, the `/llms.txt` row, and the `/llms-full.txt` entry all regenerate on build. See [docs/content-authoring.md](./content-authoring.md). |
| Change what a twin/index contains | `server/llms/builders.ts` | Pure string builders; no I/O. Deep reference: [server/llms/README.md](../server/llms/README.md). |
| Change how a route maps to a builder | `server/llms/handler.ts` | One dispatching handler; picks a builder by path + locale. |
| Add/remove an artifact route | `modules/llms.ts` | Registers literal routes + `nitro.prerender.routes`. Slugs auto-discovered from disk. |
| Edit display strings (titles/tags/labels) | `i18n/locales/{en,fr}.json` | Single source of truth for prose; never hardcode in builders. See [docs/i18n.md](./i18n.md). |
| Keep artifacts out of the sitemap | `nuxt.config.ts:168` (`sitemap.exclude`) | Already handled. |
| Verify a build | `.output/public/` after `npm run generate` | See [Verify](#verify). |

## What it emits

All files are prerendered to `.output/public/` and served from the site root as plain static text. Case-study bodies are empty markdown — content lives in **frontmatter** — so these files are synthesized from the `work_en` / `work_fr` content collections plus the ordering in `app/data`, not scraped from rendered HTML.

**English (default locale, served at `/`):**

| Artifact | Builder | Content-Type |
| --- | --- | --- |
| `/llms.txt` | `buildLlmsIndex` (`builders.ts:225`) | `text/plain` |
| `/llms-full.txt` | `buildLlmsFull` (`builders.ts:262`) | `text/plain` |
| `/index.md` | `homeMarkdown` (`builders.ts:279`) | `text/markdown` |
| `/about.md` | `aboutMarkdown` (`builders.ts:309`) | `text/markdown` |
| `/contact.md` | `contactMarkdown` (`builders.ts:341`) | `text/markdown` |
| `/work/<slug>.md` (one per **live** study) | `studyToMarkdown` (`builders.ts:137`) | `text/markdown` |

- `/llms.txt` is the [llmstxt.org](https://llmstxt.org/) spec file: a curated link index (summary, the three Featured studies, then Index studies under the reserved `## Optional` section), every bullet linking to a `.md` twin.
- `/llms-full.txt` (a community convention, not the spec) is the whole portfolio in one file: home, about, contact, then every live study in navigation-ring order (`app/data/workChain.ts`), with any off-chain live study appended so nothing is dropped (`builders.ts:268`).

**FR mirror** (same builders, `locale='fr'`, served under French URL segments): `/fr/llms.txt`, `/fr/llms-full.txt`, `/fr/index.md`, `/fr/a-propos.md`, `/fr/contact.md`, `/fr/projets/<slug>.md`. French queries the `work_fr` collection and falls back to the English twin per study when a French twin is missing (`handler.ts:36-42`, `:65-67`), so the FR files always render a complete portfolio.

## How it works

```
content/en/work/*.md (frontmatter)   app/data/{featured,projects,workChain}.ts   i18n/locales/{en,fr}.json
                          \                       |                        /
                           builders.ts  ──>  pure strings (index, full, per-page/per-study twins)
                                  |
                handler.ts  (reads path + locale, queries the work collection status:live, picks a builder)
                                  |
                modules/llms.ts  (globs live slugs, registers one literal route per artifact,
                                  adds every route to nitro.prerender.routes)
                                  |
                npm run generate  ──>  real files in .output/public/
```

1. **Data → builders.** `server/llms/builders.ts` holds pure functions (no I/O) plus `SITE_URL` (`builders.ts:29`) and the `WorkDoc` frontmatter type (`builders.ts:65`). They read the `work` collection for study content and `app/data/{featured,projects,workChain}.ts` for ordering/section placement. Display strings come from the i18n catalog via helpers `D()` (`builders.ts:55`, `data.*`/`tags.*` keys) and llms prose via `L()` (`builders.ts:45`, `llms.*` keys); English literals are the inline defaults and `fr.json` overrides per key.
2. **Handler dispatch.** `server/llms/handler.ts` reads the request path, detects the `/fr` prefix to set the locale (`handler.ts:28-31`), queries `work_en`/`work_fr` filtered to `status: 'live'` (`handler.ts:36-42`), and returns the matching builder's output with the right Content-Type — `text/plain` for `.txt`, `text/markdown` for `.md`. Anything else 404s (`handler.ts:71`).
3. **Route registration.** `modules/llms.ts` is a local Nuxt module. At build it globs `content/en/work/*.md`, keeps slugs whose file matches `status: live` via regex (`modules/llms.ts:25-30`), registers **one literal server route per artifact** (all pointing at the single handler, `:54-56`), and pushes every route into `nitro.prerender.routes` (`:72`) so `nuxi generate` writes each to a real file.
4. **`npm run generate`** prerenders all of it to `.output/public/`. `nuxt.config.ts:168` (`sitemap.exclude`) keeps the `.txt`/`.md` artifacts out of `sitemap.xml`.

### Why literal routes (not a catch-all)

Two reasons, both load-bearing:

- **Non-crawlable artifacts.** The static prerenderer uses `crawlLinks` to discover pages by following `<a>` links in rendered HTML. These artifacts are plain text and are linked from nowhere in the page DOM, so the crawler can never find them. They must be enumerated explicitly as prerender routes — which is exactly what `modules/llms.ts` does.
- **No shadowing.** The twins sit at `/work/<slug>.md`, right beside the real `/work/<slug>` pages. A catch-all like `/work/**:slug.md` would also match `/work/<slug>` (the router doesn't enforce the `.md` suffix), shadowing the actual case-study pages. One literal route per slug can only ever match the exact `.md` path. See [docs/architecture.md](./architecture.md) and [server/llms/README.md](../server/llms/README.md) for the full rationale.

## Adding a study

**Nothing to wire in this pipeline.** Follow the normal flow in [docs/content-authoring.md](./content-authoring.md) (add `content/en/work/<slug>.md`, register it in `app/data/featured.ts` or `app/data/projects.ts` + `app/data/workChain.ts`, add the FR twin per [docs/i18n.md](./i18n.md)). On the next build:

- `modules/llms.ts` auto-discovers the slug from `content/en/work/*.md` and registers its routes.
- It gets a `/work/<slug>.md` twin (and `/fr/projets/<slug>.md`).
- It appears in `/llms-full.txt` (in `workChain` order).
- It gets a row in `/llms.txt` — under `## Featured case studies` if it's in `featured.ts`, otherwise under `## Optional` (an Index study with a `/work/<slug>` href).

A study only appears once its frontmatter `status: live`; `in-progress` stubs are filtered out everywhere (`handler.ts:37`, `modules/llms.ts:28`), so nothing leaks early.

## Constraints

- **Don't hand-maintain the artifact list.** The route set is rebuilt from disk on every build. Adding studies to the route arrays in `modules/llms.ts` by hand is wrong and will drift.
- **Display strings flow from frontmatter + i18n, never hardcoded in builders.** Study prose is reproduced verbatim from frontmatter; featured/Index titles and tags come from the `data.*`/`tags.*` catalog keys. New user-facing prose in a builder must use `L()` with an `en.json` default, or it can't be translated.
- **Keep the FR mirror in sync.** Every English artifact has a French counterpart registered in `modules/llms.ts` under French URL segments; the builders are locale-parameterized. If you add an artifact type, add both locales. FR prose missing in `fr.json` falls back to the English default; a missing FR study twin falls back to the English twin.
- **Don't convert per-study routes to a catch-all** under `/work/` — it shadows the real pages (see [Why literal routes](#why-literal-routes-not-a-catch-all)).
- **Voice rules apply to authored copy** (the home/about/contact twins and the `llms.txt` preamble): US spelling, Swiss `1'000`, no em-dashes in body prose. Study prose stays verbatim. See [docs/brand-voice.md](./brand-voice.md).

## Verify

```bash
npm run generate
```

Then confirm the artifacts exist in `.output/public/`:

```bash
# English artifacts present
ls .output/public/llms.txt .output/public/llms-full.txt \
   .output/public/index.md .output/public/about.md .output/public/contact.md

# one twin per live study (EN under work/, FR under fr/projets/)
ls .output/public/work/*.md
ls .output/public/fr/llms.txt .output/public/fr/projets/*.md

# artifacts stay out of the sitemap (expect 0)
grep -cE 'llms|\.md<' .output/public/sitemap.xml
```

For the full link-resolution check (every `.md` URL in `llms.txt` resolves to a generated file), see the script in [server/llms/README.md](../server/llms/README.md). The i18n leak/parity check (`npm run check:i18n`) also covers the `/fr` artifacts.

## Related

- [server/llms/README.md](../server/llms/README.md) — **the deep reference** for this pipeline (conventions, gotchas, full verify script).
- [docs/content-authoring.md](./content-authoring.md) — how to add a study (the "nothing to wire" flow).
- [docs/i18n.md](./i18n.md) — the FR mirror, locale routing, and the catalog as source of truth for display strings.
- [docs/architecture.md](./architecture.md) — rendering model and why these artifacts use literal prerender routes.
- [docs/brand-voice.md](./brand-voice.md) — voice rules for authored copy.
