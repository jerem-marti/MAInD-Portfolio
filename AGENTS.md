# AGENTS.md

> The entry point for anyone — human or AI — about to change this repo. Read this first, then jump to the `docs/` file that owns your task. This file is the index; the depth lives in `docs/`.

## What this is

The personal portfolio of Jérémy Martin (jeremymartin.ch): a **statically generated Nuxt 4 site** (Vue 3, Nitro, Tailwind v4, `@nuxt/content`), English-default with a French version under `/fr`. It builds to flat files (`npm run generate` → `.output/public`) served by nginx — there is **no runtime server**.

Brand thesis: **process is the artifact; outputs are evidence the process works.** The voice is warm and precise. (Originally migrated from a Figma Make prototype to Nuxt 4.)

## Golden rules (don't break these)

- **Voice:** no em-dashes in body copy (fine in chrome/meta/titles); US spelling; only real numbers, never invented; no specific grades; Swiss thousands separator `'` (`1'000`). Full list: `docs/brand-voice.md`.
- **Color discipline:** signal yellow (`--color-brand-accent`) only as active/focus/hover accents, never a large fill.
- **Accessibility AA is non-negotiable** — never remove focus states; one `<h1>` per page; real alt text.
- **The site is 100% static** — don't introduce code that assumes a Nitro server at request time.
- **Display strings live in the i18n catalog** (`i18n/locales/{en,fr}.json`), never hardcoded in `app/data/*.ts` (those hold structure only).
- **The `generate`-time link checker is load-bearing** — don't disable it.
- **UBS:** the name may appear in copy; the **UBS logo must never appear in any image**.
- **Locked:** the featured trio is DataBloom / WeMatch / Thea (`app/data/featured.ts`); the Index controlled vocabulary is fixed (`docs/brand-voice.md`).

## Documentation index

| Doc | What's in it |
|---|---|
| `docs/architecture.md` | Stack, SSG/render model, where code lives, data flow, the 12 interaction principles, a11y + perf budgets. |
| `docs/brand-voice.md` | Brand thesis, design tokens, typography, voice rules, the Index controlled vocabulary, bio facts, excluded-by-design scope. |
| `docs/content-authoring.md` | Add/edit case studies, Index rows, featured cards, resources, per-page SEO; the full frontmatter schema. |
| `docs/images.md` | Image roles + aspect ratios, the production pipeline, wiring, the per-study tracker. |
| `docs/i18n.md` | The EN/`/fr` locale system, the message catalog, French twins, `check:i18n`. |
| `docs/build-deploy.md` | Local dev, the static build, hosting, nginx, the smoke test. |
| `docs/llms.md` | The `llms.txt` / `.md`-twin pipeline (auto-generated at build). |
| `docs/troubleshooting.md` | Every known failure mode → cause → fix, tagged Universal vs Local environment. |

## Where do I go to…?

| Task | Start here |
|---|---|
| Add or edit a case study | `docs/content-authoring.md` (+ `docs/i18n.md` for the French twin) |
| Add an Index row / featured card | `docs/content-authoring.md` |
| Produce or wire images | `docs/images.md` (produce) → `docs/content-authoring.md` (wire) |
| Change a design token, color, or font | `docs/brand-voice.md` → `app/assets/css/main.css` |
| Edit a home section | `app/pages/index.vue` (sections are inline) — see `docs/architecture.md` |
| Edit nav / footer / mobile chrome | `app/components/chrome/` — see `docs/architecture.md` |
| Translate a string / add a French page | `docs/i18n.md` |
| Build, preview, or deploy | `docs/build-deploy.md` |
| Touch the llms.txt artifacts | `docs/llms.md` (usually: nothing — it auto-generates) |
| Fix a broken build or odd behavior | `docs/troubleshooting.md` |

## Repo map

| Area | Path |
|---|---|
| Pages (routes) | `app/pages/` (`index.vue`, `about.vue`, `contact.vue`, `work/[slug].vue`) |
| Components | `app/components/{chrome,work,ui,OgImage}/` |
| Layout / root / error | `app/layouts/default.vue`, `app/app.vue`, `app/error.vue` |
| Typed data (structure only) | `app/data/{featured,projects,workChain}.ts` |
| Tokens + a11y/motion CSS | `app/assets/css/main.css` |
| Case studies (content) | `content/en/work/*.md`, `content/fr/work/*.md` |
| Content schema | `content.config.ts` |
| Build/runtime config | `nuxt.config.ts` |
| i18n catalog + config | `i18n/locales/{en,fr}.json`, `i18n/i18n.config.ts` |
| llms pipeline | `server/llms/` + `modules/llms.ts` (deep ref: `server/llms/README.md`) |
| Deploy | `deploy/nginx-i18n.conf` |
| i18n leak check | `scripts/check-i18n-leaks.mjs` |

## Verify

```bash
npm run generate     # static build → .output/public; fails on broken links
npx nuxi typecheck   # strict TypeScript
npm run check:i18n   # no English leaks into /fr, EN↔FR route parity, lang/canonical (run after generate)
```

> **Local environment.** On this Windows machine, prefix network/build commands with the system-CA flag to avoid a TLS error: `NODE_OPTIONS=--use-system-ca npm run generate`. Not needed in CI / on other machines. See `docs/troubleshooting.md`.

## Conventions

- Work on a feature branch, not `main`. Commits carry **no `Co-Authored-By: Claude`** trailer.
- The CRLF warning on commit is normal (repo stores LF).
- Local-only files (gitignored): `.claude/`, `docs/superpowers/` (working specs/plans/notes). These are not part of the published repo.
