# Parked case studies

These `.md` files are kept for possible future use but are **not** part of the site.

The `work` collection's source glob is `work/*.md` (top level only — see `content.config.ts`), so anything in this `_drafts/` subfolder is invisible to the build: no `/work/<slug>` route, no `queryCollection('work')` result, not in the sitemap.

## To reactivate a study

1. Move the file up one level: `content/work/_drafts/<slug>.md` → `content/work/<slug>.md`.
2. Add its slug to the ordered chain in `app/data/workChain.ts` at the position you want it in the "More work" ring (omit it and the page renders no "More work" section).
3. Make sure it has a `card:` block (title, alt, optional `image`) — it is what neighbouring studies show.
4. `npm run generate` and confirm `/work/<slug>/index.html` is produced.

## Currently parked

- `goldilocks-worlds.md` — Goldilocks Worlds (exoplanet habitability data story)
