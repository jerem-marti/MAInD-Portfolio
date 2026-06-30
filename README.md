# jeremymartin.ch

The personal portfolio of **Jérémy Martin**, an interaction designer (MAIND, SUPSI Mendrisio). A statically generated Nuxt 4 site — English at `/`, French under `/fr`. Brand thesis: *process is the artifact; outputs are evidence the process works.*

## Quickstart

```bash
npm install      # install dependencies (runs `nuxt prepare`)
npm run dev      # dev server at http://localhost:3000 (hot reload)
npm run generate # static build → .output/public/
npm run preview  # serve the built site for final QA
```

> On some Windows setups `npm` fails with `UNABLE_TO_VERIFY_LEAF_SIGNATURE`. Prefix with the system-CA flag: `NODE_OPTIONS=--use-system-ca npm install`. Not needed in CI or on other machines.

## Documentation

Start with **[AGENTS.md](./AGENTS.md)** — the entry point for humans and AI agents. The depth lives in `docs/`:

| Doc | What's in it |
|---|---|
| [docs/architecture.md](./docs/architecture.md) | Stack, the static-render model, where code lives, data flow, interaction principles, a11y + performance budgets. |
| [docs/brand-voice.md](./docs/brand-voice.md) | Brand thesis, design tokens, typography, voice rules, the Index controlled vocabulary, bio facts. |
| [docs/content-authoring.md](./docs/content-authoring.md) | Add/edit case studies, Index rows, featured cards, resources, SEO; the full frontmatter schema. |
| [docs/images.md](./docs/images.md) | Image roles, aspect ratios, the production pipeline, and the per-study tracker. |
| [docs/i18n.md](./docs/i18n.md) | The EN/`/fr` locale system, the message catalog, and French twins. |
| [docs/build-deploy.md](./docs/build-deploy.md) | Local dev, the static build, hosting, nginx, the post-deploy smoke test. |
| [docs/llms.md](./docs/llms.md) | The `llms.txt` / `.md`-twin pipeline for AI crawlers. |
| [docs/troubleshooting.md](./docs/troubleshooting.md) | Known failure modes → cause → fix. |

## Tech stack

- **Nuxt 4** (Vue 3, Vite, Nitro) — static site generation (`nuxi generate`, `nitro.preset: 'static'`).
- **Tailwind CSS v4** — CSS-first config via `@theme` in `app/assets/css/main.css`.
- **@nuxt/content** — case studies as Markdown collections (`content/{en,fr}/work/`).
- **@nuxtjs/i18n** — English default, French under `/fr`.
- **@nuxtjs/seo** — sitemap, robots, OG images (Satori), schema.org, link checker.
- **@nuxt/image** (AVIF/WebP) and **@nuxt/fonts** (self-hosted Geist Sans + Mono).
- **TypeScript**, strict.

## Verify

```bash
npm run generate     # builds; fails on broken internal links
npx nuxi typecheck   # strict TypeScript
npm run check:i18n   # no English leaks into /fr; EN↔FR route parity (run after generate)
```

## License & contact

The source code is MIT-licensed; site content and imagery are © 2026 Jérémy Martin, all rights reserved (some material is under client NDA). See [`public/license.txt`](./public/license.txt). Contact: hello@jeremymartin.ch · LinkedIn `jermarti`.
