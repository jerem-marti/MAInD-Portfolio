# llms.txt generation

Build-time generation of `llms.txt` and companion files for this static site,
following the [llmstxt.org](https://llmstxt.org/) proposal. Everything here runs
at build (`npm run generate`) and is served as plain static files. There is no
runtime server.

The site is generated with `nitro.preset: 'static'`, and case studies render
from **frontmatter** (their markdown bodies are empty). So these files cannot be
extracted from rendered page bodies. They are synthesized from the same data the
pages use: the `work` content collection plus the ordering in `app/data`.

## What it produces

All paths are written to `.output/public/` and served from the site root.

| File | What it is |
| --- | --- |
| `/llms.txt` | Curated link index: site summary, the three featured studies, and the Index studies under the reserved `## Optional` section. Every bullet links to a `.md` twin. |
| `/llms-full.txt` | The whole portfolio in one file: home, about, contact, then all live case studies in navigation-ring order. |
| `/index.md`, `/about.md`, `/contact.md` | Clean markdown twins of the three app pages. |
| `/work/<slug>.md` | Clean markdown twin of each **live** case study (one per study). |

A consumer fetches `/llms.txt`, reads the summary, then follows the links to the
`.md` twins (or grabs `/llms-full.txt` for everything at once). The `## Optional`
section holds the secondary work an agent can skip under a tight context budget.

## How it works

```
content/work/*.md (frontmatter)  app/data/{featured,projects,workChain}.ts
                       \                /
                        builders.ts  ──>  pure strings (index, full, per-page twins)
                              |
            handler.ts  (queries the collection, picks a builder by path)
                              |
            modules/llms.ts  (registers one literal route per file,
                              adds them to nitro.prerender.routes)
                              |
            npm run generate  ──>  real files in .output/public/
```

| File | Responsibility |
| --- | --- |
| `server/llms/builders.ts` | Pure string builders. `studyToMarkdown` (frontmatter → twin), `buildLlmsIndex`, `buildLlmsFull`, and the hand-authored `homeMarkdown` / `aboutMarkdown` / `contactMarkdown`. Holds `SITE_URL`, the `WorkDoc` type, and the formatting helpers. No I/O. |
| `server/llms/handler.ts` | One dispatching event handler. Reads the request path, queries the `work` collection server-side (`status: live` only), and returns the right builder's output with the right `Content-Type`. 404s on anything else. |
| `modules/llms.ts` | Local Nuxt module. At build it globs `content/work/*.md`, keeps the `status: live` slugs, registers one **literal** server route per artifact (all pointing at `handler.ts`), and adds every route to `nitro.prerender.routes` so generate writes each one to a file. |
| `nuxt.config.ts` | `sitemap.exclude` keeps the `.txt` / `.md` artifacts out of `sitemap.xml`. |

### Why literal routes, not a catch-all

The twins live at `/work/<slug>.md`, right beside the real `/work/<slug>` pages.
A catch-all like `/work/**:slug.md` would also match `/work/<slug>` (the `.md`
suffix is not enforced by the router, only checked in the handler), so it would
shadow and break the actual case-study pages. `@nuxt/content`'s own llms feature
sidesteps this by serving under a `/raw/` prefix. We instead register one literal
route per slug (no params), which can only ever match the exact `.md` path and
never the page. The trade-off is that the route list is rebuilt at each build from
the content folder, which the module already does.

## Maintenance

Adding work needs **no change here**. The module discovers studies from disk and
the builders read the collection plus `app/data`, so the normal flow (see the root
`CLAUDE.md`) keeps everything in sync:

- **Add a case study** (`content/work/<slug>.md` + `app/data/featured.ts` or
  `app/data/projects.ts`): on the next build it gets a `/work/<slug>.md` twin,
  an entry in `/llms-full.txt`, and a row in `/llms.txt` (Featured if it is in
  `featured.ts`, otherwise under `## Optional`).
- **`status: in-progress` studies are skipped** everywhere (no twin, no rows), so
  stubs never leak. A study appears the moment its status flips to `live`.

Data sources, for reference:

| Source | Drives |
| --- | --- |
| `work` collection (frontmatter) | All twin/full content; the live filter |
| `app/data/featured.ts` | Order and titles of the Featured section |
| `app/data/projects.ts` | Order and titles of the `## Optional` section |
| `app/data/workChain.ts` | Study order inside `/llms-full.txt` |

## Verifying a build

```bash
npm run generate
```

Then, from `.output/public/`:

```bash
ls llms.txt llms-full.txt index.md about.md contact.md   # all present
ls work/*.md | wc -l                                      # one per live study (currently 15)
# every .md URL in llms.txt resolves to a generated file:
grep -oE 'https://jeremymartin\.ch/[^)]+\.md' llms.txt | sed 's#https://jeremymartin.ch/##' \
  | while read f; do test -f "$f" && echo "ok $f" || echo "MISSING $f"; done
grep -cE 'llms|\.md<' sitemap.xml                         # 0 — artifacts stay out of the sitemap
```

The build's link checker also runs over the HTML pages; the `.txt` / `.md`
artifacts are plain text, so they are not crawled as pages.

## Conventions and decisions

- **Twin URLs.** Twins sit at `/work/<slug>.md` and `/index.md` (not the pedantic
  `index.html.md`). This matches llmstxt.org's own `/index.md` and keeps URLs clean.
- **Link text in `## Optional`** uses the site's Index display names from
  `projects.ts`, so the index reads like the home page. Each twin keeps its own
  page H1 (a few differ, e.g. `Why Not You?` for `uefa-female-coaches`).
- **`llms-full.txt` is a community convention**, not part of the llmstxt.org
  proposal; we ship it because the whole portfolio is small enough to be useful in
  one fetch. `/llms.txt` is the spec-defined file.
- **Image content** is transcribed as text in the twins: each approach artifact
  contributes its caption, alt text, and the "Decision ·" rationale (all of which
  render on the page), since a text twin cannot show the image.
- **Authored copy** (the home/about/contact twins and the `llms.txt` preamble)
  follows the project voice rules in `CLAUDE.md`: US spelling, Swiss `1'000`, no
  em-dashes in body prose. Study prose is reproduced verbatim from frontmatter.

## Gotchas

- Do **not** convert the per-study routes to a catch-all under `/work/` (see
  "Why literal routes" above) — it will shadow the real pages.
- A new study only appears once `status: live`; `in-progress` is intentionally excluded.
- `.data/content/contents.sqlite` is the content build cache, not a source file; it
  regenerates on build.
