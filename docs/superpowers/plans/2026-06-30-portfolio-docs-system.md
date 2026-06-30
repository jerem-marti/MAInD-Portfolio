# Portfolio Documentation System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: this plan is executed by the **orchestrator
> (main thread) running a ReAct loop** — for each task it dispatches read-only Map/Draft
> sub-agents, then verifies and commits **in the main thread** (sub-agents cannot execute code,
> run git, or run npm). Use `superpowers:executing-plans` for the batch/checkpoint cadence, NOT
> a fresh wrapping subagent per task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce a committed, dual-reader (human + AI agent) documentation system so a
no-context agent can modify the portfolio end to end.

**Architecture:** `AGENTS.md` is the canonical agent entry point; `README.md` is the human front
door; a `docs/` tree holds eight focused docs consolidating today's playbooks. Each doc is written
by a per-domain sub-agent (Map → Draft), grounded in real code, then verified and committed by the
orchestrator. `CLAUDE.md` becomes a thin committed pointer that imports `AGENTS.md`.

**Tech Stack:** Nuxt 4 (Vue 3, Nitro, SSG), Tailwind v4, @nuxt/content, @nuxtjs/i18n,
@nuxtjs/seo, @nuxt/image, @nuxt/fonts. Docs are plain Markdown (not wired into the build).

**Spec:** `docs/superpowers/specs/2026-06-30-portfolio-docs-system-design.md`

## Global Constraints

- **Branch / commits:** all work on `docs/agent-documentation-system` (already created). Commits
  carry **no `Co-Authored-By: Claude` trailer**. **Do not push** — owner reviews/merges.
- **Grounding (anti-hallucination):** every path/command/API in a doc must be traced to real code,
  cited as `path:line`. Unverifiable claims are marked `TODO: verify`, never guessed.
- **Local vs portable:** local `D:\` paths, the personal email, PAT steps, the
  `NODE_OPTIONS=--use-system-ca` TLS quirk, Windows specifics, and chromium sweeps are **kept but
  fenced** under a "Local environment" heading.
- **No duplication:** `AGENTS.md`, `CLAUDE.md`, `README.md` carry no overlapping instruction prose;
  each points inward to `docs/`.
- **Sub-agent execution limit:** sub-agents read/search only. All `npm`/`npx`/`git`/file-write
  verification and commits happen in the **main thread**.
- **The locks (copy verbatim into each doc's "Constraints" where relevant), from `CLAUDE.md`:**
  - No em-dashes in body copy. Allowed on chrome/meta (section heads, date ranges, figcaptions, footer).
  - Banned phrases: "passionate about", "thought leader", "results-oriented", "synergy", "rockstar", "ninja".
  - No specific numerical grades. Only real numbers; never invent a metric.
  - Swiss number format: thousands separator is `'` (e.g. `1'000`).
  - "Maker-Engineer" is internal only — never in published copy.
  - Positioning: "agentic experiences (AX)", designed around user intent — not "AI-driven products".
  - UBS name may appear in copy; the **UBS logo must never appear in any image**.
  - Featured trio is locked: DataBloom, WeMatch, Thea (UBS Family Space moved to Index).
  - Accessibility AA non-negotiable; perf budgets (home <500KB, case study <1.5MB, LCP <1s).
  - Brand thesis: "process is the artifact; outputs are evidence the process works."
- **Shared sub-agent prompt template** (the Draft agent receives this with `{slots}` filled by the
  task; the Map agent receives the `<your_domain>` + `<sources_of_truth>` halves only):

```
<role>
You are a senior technical writer + Nuxt 4 engineer. You write docs a future AI
agent with ZERO context can use to modify this repo correctly on the first try,
and a human can skim. Precision over prose.
</role>
<project_context>
Personal portfolio of Jérémy Martin (jeremymartin.ch): a statically generated
Nuxt 4 site. Brand thesis: "process is the artifact; outputs are evidence the
process works." These docs are committed to the repo as the single source of truth.
</project_context>
<audience>
Two readers, one doc: (1) a cold AI agent — needs where things live, exact steps,
verify commands, and constraints it must not break; (2) a human skimming. Never
invent paths/APIs/behavior; if unverified, mark "TODO: verify" or omit.
</audience>
<your_domain>{DOMAIN}: {one-line scope}. You own documenting: {OWNED_PATHS}</your_domain>
<sources_of_truth>
Ground every claim here. Read first: {READ_FIRST}. Inspect (cite file:line): {INSPECT_GLOBS}.
Align with / don't duplicate: {SIBLING_DOCS}.
</sources_of_truth>
<method> <!-- think before writing; don't show scratch work -->
1) Map: list real files, exports, config keys, commands.
2) Find the change-scenarios a cold agent hits ("how do I add/change X?").
3) Write each as a runbook: numbered steps -> exact file+field -> verify command + expected output.
4) Extract hard constraints (the locks) and the why.
5) Self-check: every path exists, every command real, every API matches code.
</method>
<output_format>
Markdown body for {FILE}:
# Title  ·  > one-sentence purpose
## At a glance  (table: I need to... | Edit | Verify)
## Concepts (scaled to complexity)
## Runbooks: "How to {scenario}" (copy-pasteable)
## Constraints (the locks + why)
## Verify (commands + expected output)
## Related (cross-links)
Real paths as `path:line`; commands in fences; fence machine-specific bits under "Local environment".
Worked example of the house style to match:
  ## At a glance
  | I need to… | Edit | Verify |
  |---|---|---|
  | Add an Index row | `app/data/projects.ts` | `npm run generate` shows the row |
  ## Runbooks
  ### How to add an Index row
  1. Add a typed entry to `app/data/projects.ts` (id, num, title, tags, year, href?, preview?, alt).
  2. Tags must come from the controlled vocabulary (docs/brand-voice.md).
  3. Verify: `NODE_OPTIONS=--use-system-ca npm run generate` — row renders, link-check passes.
</output_format>
<definition_of_done>
Return: (1) the complete Markdown body; (2) claims you could NOT verify; (3) cross-doc
dependencies you assumed.
</definition_of_done>
```

---

### Task 1: Repo inventory + `docs/architecture.md`

**Files:**
- Create (local working note, gitignored): `docs/superpowers/notes/repo-inventory.md`
- Create: `docs/architecture.md`

**Interfaces:**
- Produces: `docs/superpowers/notes/repo-inventory.md` — a grounded inventory (real `app/` tree,
  `nuxt.config.ts` top-level keys, `package.json` scripts, `content.config.ts` collections,
  `app/data/*.ts` exports, `deploy/*`, `server/`, `modules/`). Tasks 2–10 read it to avoid
  re-deriving shared facts.
- Produces: `docs/architecture.md`.

- [ ] **Step 1: Dispatch the Map agent (Explore, read-only) to build the inventory**

Dispatch an `Explore` agent ("very thorough"). Prompt body:
```
Build a grounded inventory of this Nuxt 4 repo for documentation writers. Read, do not modify.
Return Markdown with these sections, each entry citing path (and line for config keys):
1. app/ tree: pages, components/ (by subfolder), layouts, data/, assets/css, utils/, composables/.
2. nuxt.config.ts: every top-level key and what module it configures (cite line).
3. package.json scripts (verbatim) + key deps with versions.
4. content.config.ts: collections (work_en, work_fr, …) and the case-study schema fields.
5. app/data/*.ts: each file's exported shape (featured.ts, projects.ts, workChain.ts).
6. server/ and modules/: llms handler/builders/module, any other server bits.
7. deploy/: files and purpose. i18n/: locales files. scripts/: check-i18n-leaks.mjs etc.
Do NOT invent. If a key's purpose is unclear, say so.
```
Save its return verbatim to `docs/superpowers/notes/repo-inventory.md`.

- [ ] **Step 2: Verify the inventory paths resolve**

Run (main thread):
```
node -e "const fs=require('fs');const t=fs.readFileSync('docs/superpowers/notes/repo-inventory.md','utf8');const m=[...t.matchAll(/`([^`]+\.(ts|vue|mjs|json|css|md|conf))`/g)].map(x=>x[1]);const miss=m.filter(p=>!fs.existsSync(p));console.log('cited:',m.length,'missing:',miss.length);console.log(miss.join('\n'))"
```
Expected: `missing: 0` (or only legitimately non-path backticked code). Fix the inventory if real
paths are missing.

- [ ] **Step 3: Dispatch the Draft agent for `docs/architecture.md`**

Dispatch a `general-purpose` agent with the shared template, slots filled:
- `{DOMAIN}` = "Architecture"
- `{scope}` = "how the site is built and rendered, where code lives, and the non-negotiable budgets"
- `{OWNED_PATHS}` = `app/**`, `nuxt.config.ts`, `content.config.ts`, `nitro`/SSG model
- `{FILE}` = `docs/architecture.md`
- `{READ_FIRST}` = `docs/superpowers/notes/repo-inventory.md`, `CLAUDE.md` (Tech stack, Site
  structure, Interaction principles, Performance budget, Accessibility sections)
- `{INSPECT_GLOBS}` = `nuxt.config.ts`, `app/app.vue`/`app/layouts/*`, `content.config.ts`,
  `app/components/**` (folders, not every file), `app/assets/css/main.css`
- `{SIBLING_DOCS}` = brand-voice.md (tokens/voice), content-authoring.md (frontmatter),
  i18n.md (locale routing) — "link, don't duplicate"
Must cover: Nuxt 4 `app/` convention; SSG via `nuxi generate` + `nitro.preset: 'static'`; the
module stack and what each does; data flow (data/*.ts + content collections → pages); the
component taxonomy (chrome/home/work/ui); interaction principles; a11y AA + perf budgets as hard
constraints.

- [ ] **Step 4: Write the returned body to `docs/architecture.md` and verify paths**

Save the body. Run the same path-resolution check from Step 2 against `docs/architecture.md`.
Expected: `missing: 0`. Address any `TODO: verify` the agent flagged (check the code yourself).

- [ ] **Step 5: Commit**
```
git add docs/architecture.md
git commit -m "docs: add architecture guide"
```

---

### Task 2: `docs/brand-voice.md`

**Files:**
- Create: `docs/brand-voice.md`

**Interfaces:**
- Consumes: `docs/superpowers/notes/repo-inventory.md`.
- Produces: `docs/brand-voice.md` — canonical home of the locks (other docs link here for voice + vocab).

- [ ] **Step 1: Dispatch the Draft agent**

Shared template, slots:
- `{DOMAIN}` = "Brand & voice"
- `{scope}` = "the brand thesis, visual tokens, typography, voice rules, controlled vocabulary, and bio facts that all copy and design must obey"
- `{OWNED_PATHS}` = `app/assets/css/main.css` (tokens), and the brand/voice rules themselves
- `{FILE}` = `docs/brand-voice.md`
- `{READ_FIRST}` = `CLAUDE.md` (Brand thesis, Design tokens, Typography, Interaction principles,
  Voice rules, Index list controlled vocabulary, Background facts), `app/assets/css/main.css`
- `{INSPECT_GLOBS}` = `app/assets/css/main.css` (`@theme` block), `app/data/projects.ts`
  (the `indexTags` vocabulary array — confirm it matches the prose list)
- `{SIBLING_DOCS}` = content-authoring.md (where the vocabulary is applied)
Must include verbatim: the six design tokens, the Geist Sans/Mono roles, all voice rules and banned
phrases, the full controlled vocabulary, the UBS-logo rule, the "agentic experiences (AX)"
positioning, Swiss number format, and the background bio facts (education path, languages —
**no Italian**, festival 2023–2025, DataBloom, availability Aug 2026).

- [ ] **Step 2: Cross-check the vocabulary against code**

Run (main thread):
```
node -e "const fs=require('fs');console.log(fs.readFileSync('app/data/projects.ts','utf8').match(/indexTags[\s\S]*?\]/)?.[0]||'indexTags not found')"
```
Expected: prints the `indexTags` array. Confirm `docs/brand-voice.md`'s vocabulary list matches it
exactly; fix the doc if it drifts.

- [ ] **Step 3: Save `docs/brand-voice.md` and run the path check** (as Task 1 Step 4). Expected: `missing: 0`.

- [ ] **Step 4: Commit**
```
git add docs/brand-voice.md
git commit -m "docs: add brand and voice guide"
```

---

### Task 3: `docs/content-authoring.md` (from `POPULATING.md`)

**Files:**
- Rename: `POPULATING.md` → `docs/content-authoring.md` (`git mv`)
- Modify: `docs/content-authoring.md` (restructure into the house format)

**Interfaces:**
- Consumes: repo-inventory, brand-voice.md (links for vocabulary/voice).
- Produces: `docs/content-authoring.md`.

- [ ] **Step 1: Find inbound references before moving**

Run:
```
grep -rniE "POPULATING\.md" --include=*.md --include=*.ts --include=*.vue --include=*.json . | grep -v node_modules
```
Expected: a short list (e.g. `CASE_STUDY_HANDOFF.md`, `README` if any). Note each — they get
updated in the task that owns that file (HANDOFF refs in Task 4; AGENTS/README in Tasks 9–10).

- [ ] **Step 2: Move with history preserved**
```
git mv POPULATING.md docs/content-authoring.md
```

- [ ] **Step 3: Dispatch the Draft agent to restructure (not rewrite facts)**

Shared template, slots:
- `{DOMAIN}` = "Content authoring"
- `{scope}` = "adding/editing case studies, Index rows, featured cards, SEO fields, and resources"
- `{OWNED_PATHS}` = `content/en/work/*.md`, `content/fr/work/*.md`, `app/data/featured.ts`,
  `app/data/projects.ts`, `app/data/workChain.ts`, `content.config.ts`, SEO in `nuxt.config.ts`/pages
- `{FILE}` = `docs/content-authoring.md`
- `{READ_FIRST}` = the **current** `docs/content-authoring.md` (the moved POPULATING.md — it is
  already accurate; preserve its facts), `content.config.ts`
- `{INSPECT_GLOBS}` = `content.config.ts`, `app/data/*.ts`, one real study e.g.
  `content/en/work/databloom.md`
- `{SIBLING_DOCS}` = brand-voice.md (vocabulary/voice — link, don't restate the list),
  images.md (image roles — link), i18n.md (FR twins — link)
Instruction to the agent: "This file is already correct and detailed. Reshape it into the house
format (purpose line, At-a-glance table, Runbooks, Constraints, Verify, Related). Move the
controlled-vocabulary list out and link to docs/brand-voice.md. Move image specifics to a link to
docs/images.md. Keep every frontmatter field and schema detail. Do not invent."

- [ ] **Step 4: Save, path-check (Task 1 Step 2 check), confirm no fact lost**

Run the path check against `docs/content-authoring.md` (expected `missing: 0`) and skim that all
frontmatter fields from the original are still present (problem/role/approach/outcome/reflection/
gallery/resources/card + featured + projects + SEO).

- [ ] **Step 5: Commit**
```
git add -A docs/content-authoring.md POPULATING.md
git commit -m "docs: move POPULATING.md to docs/content-authoring.md and restructure"
```

---

### Task 4: `docs/images.md` (from `CASE_STUDY_HANDOFF.md`)

**Files:**
- Rename: `CASE_STUDY_HANDOFF.md` → `docs/images.md` (`git mv`)
- Modify: `docs/images.md` (restructure; fence machine learnings under "Local environment")

**Interfaces:**
- Consumes: repo-inventory, content-authoring.md (links).
- Produces: `docs/images.md`.

- [ ] **Step 1: Find inbound references**
```
grep -rniE "CASE_STUDY_HANDOFF" --include=*.md --include=*.ts --include=*.vue . | grep -v node_modules
```
Note results for later fixups.

- [ ] **Step 2: Move**
```
git mv CASE_STUDY_HANDOFF.md docs/images.md
```

- [ ] **Step 3: Dispatch the Draft agent**

Shared template, slots:
- `{DOMAIN}` = "Images & resources pipeline"
- `{scope}` = "image roles/aspect ratios, the sharp/mupdf/puppeteer production pipeline, wiring
  images, and the per-study tracker"
- `{OWNED_PATHS}` = `public/images/**`, `app/components/ui/MediaPlaceholder.vue`, `@nuxt/image` usage
- `{FILE}` = `docs/images.md`
- `{READ_FIRST}` = the current `docs/images.md` (moved HANDOFF — accurate; preserve), POPULATING's
  image section now in `docs/content-authoring.md`
- `{INSPECT_GLOBS}` = `app/components/ui/MediaPlaceholder.vue`, `nuxt.config.ts` (image block),
  `app/pages/index.vue` (the raw-`<img>` Index preview detail)
- `{SIBLING_DOCS}` = content-authoring.md (where image fields are set — link),
  troubleshooting.md (image gotchas move there — link)
Instruction: "Reshape into the house format. **Keep the per-study tracker.** Move machine-specific
production details (sharp/mupdf/puppeteer commands, TLS prefix, chromium sweeps, this machine's
Chrome path) under a clearly labelled 'Local environment' section. The image-gotchas (IPX preview,
OG timeout) are summarized here and the full list lives in docs/troubleshooting.md — link it.
Do not invent."

- [ ] **Step 4: Save, path-check, confirm tracker intact** (path check expected `missing: 0`).

- [ ] **Step 5: Commit**
```
git add -A docs/images.md CASE_STUDY_HANDOFF.md
git commit -m "docs: move CASE_STUDY_HANDOFF.md to docs/images.md and restructure"
```

---

### Task 5: `docs/i18n.md`

**Files:**
- Create: `docs/i18n.md`

- [ ] **Step 1: Dispatch the Map agent (Explore)** focused on i18n:
```
Inventory the i18n system. Read-only. Return, with path:line citations:
- nuxt.config.ts i18n block (strategy, customRoutes, pages map, locales, detectBrowserLanguage).
- i18n/locales/en.json + fr.json structure (top-level keys; note en is source of truth).
- content.config.ts work_en vs work_fr collections.
- modules/llms.ts (how the FR slug list / routes are enumerated).
- deploy/nginx-i18n.conf (the root French-browser redirect rule).
- scripts/check-i18n-leaks.mjs (what it asserts).
```

- [ ] **Step 2: Dispatch the Draft agent** with the map. Slots:
- `{DOMAIN}` = "Internationalization (FR locale)"
- `{scope}` = "the English-default / French-under-/fr system, the message catalog, per-locale
  content collections, SEO/hreflang, and the i18n leak check"
- `{OWNED_PATHS}` = `i18n/**`, `content/fr/**`, i18n block in `nuxt.config.ts`, `deploy/nginx-i18n.conf`,
  `scripts/check-i18n-leaks.mjs`
- `{FILE}` = `docs/i18n.md`
- `{READ_FIRST}` = the Map return, `CLAUDE.md` (French locale section), `FR-REVIEW.md`
- `{INSPECT_GLOBS}` = `nuxt.config.ts`, `i18n/locales/*.json`, `content.config.ts`, `modules/llms.ts`,
  `deploy/nginx-i18n.conf`, `scripts/check-i18n-leaks.mjs`
- `{SIBLING_DOCS}` = content-authoring.md (adding FR twins), build-deploy.md (nginx), brand-voice.md
Must include the runbook "How to add a French twin for a study" and "Verify: `npm run generate &&
npm run check:i18n`". Link `FR-REVIEW.md` / `FR-DECALQUAGE.md` as the owner-reviewed glossary/journal.

- [ ] **Step 3: Save `docs/i18n.md`, path-check** (expected `missing: 0`).

- [ ] **Step 4: Commit**
```
git add docs/i18n.md
git commit -m "docs: add i18n guide"
```

---

### Task 6: `docs/build-deploy.md`

**Files:**
- Create: `docs/build-deploy.md`

- [ ] **Step 1: Dispatch the Draft agent.** Slots:
- `{DOMAIN}` = "Build & deploy"
- `{scope}` = "local dev, the static generate pipeline, what generate does, hosting options, the
  nginx i18n redirect, and the post-deploy smoke test"
- `{OWNED_PATHS}` = `package.json` scripts, `deploy/**`, `nuxt.config.ts` (site/build), `.output/public`
- `{FILE}` = `docs/build-deploy.md`
- `{READ_FIRST}` = the build/deploy + "What generate does" + hosting sections now in
  `docs/content-authoring.md` (from POPULATING), `package.json`, `deploy/*`
- `{INSPECT_GLOBS}` = `package.json`, `deploy/nginx-i18n.conf`, any other `deploy/*`, `nuxt.config.ts`
- `{SIBLING_DOCS}` = i18n.md (nginx detail), troubleshooting.md (build failures), llms.md
Must include the exact scripts (`dev`, `generate`, `preview`, `check:i18n`), the
`NODE_OPTIONS=--use-system-ca` prefix under "Local environment", hosting (Cloudflare/Netlify/Vercel
`npm run generate` → `.output/public`, `NODE_VERSION=22`), and the smoke-test checklist.

- [ ] **Step 2: Save, path-check** (expected `missing: 0`).

- [ ] **Step 3: Commit**
```
git add docs/build-deploy.md
git commit -m "docs: add build and deploy guide"
```

---

### Task 7: `docs/llms.md`

**Files:**
- Create: `docs/llms.md`

- [ ] **Step 1: Dispatch the Draft agent.** Slots:
- `{DOMAIN}` = "llms.txt pipeline"
- `{scope}` = "how /llms.txt, /llms-full.txt, and the per-study .md twins are generated at build,
  and how they stay in sync with frontmatter (incl. the FR mirror)"
- `{OWNED_PATHS}` = `server/llms/**`, `modules/llms.ts`
- `{FILE}` = `docs/llms.md`
- `{READ_FIRST}` = `server/llms/README.md`, `server/llms/builders.ts`, `server/llms/handler.ts`,
  `modules/llms.ts`
- `{INSPECT_GLOBS}` = `server/llms/*.ts`, `modules/llms.ts`
- `{SIBLING_DOCS}` = content-authoring.md (adding a study auto-wires llms), i18n.md (FR mirror)
Keep this doc a concise overview that **points to `server/llms/README.md`** for the deep detail
(don't duplicate it). Include: "Nothing to wire when adding a study — it regenerates from
frontmatter on build."

- [ ] **Step 2: Save, path-check** (expected `missing: 0`).

- [ ] **Step 3: Commit**
```
git add docs/llms.md
git commit -m "docs: add llms.txt pipeline overview"
```

---

### Task 8: `docs/troubleshooting.md` (aggregate)

**Files:**
- Create: `docs/troubleshooting.md`

**Interfaces:**
- Consumes: the gotchas/learnings from `docs/images.md` (moved HANDOFF) and the "Common issues" +
  TLS/CRLF sections now in `docs/content-authoring.md` and `docs/build-deploy.md`.

- [ ] **Step 1: Dispatch the Draft agent** to aggregate (read the sibling docs, do not re-derive):
- `{DOMAIN}` = "Troubleshooting"
- `{scope}` = "every known failure mode and its fix, in one place, each tagged universal vs Local environment"
- `{OWNED_PATHS}` = n/a (aggregator)
- `{FILE}` = `docs/troubleshooting.md`
- `{READ_FIRST}` = `docs/images.md`, `docs/content-authoring.md`, `docs/build-deploy.md`,
  `docs/i18n.md`
- `{INSPECT_GLOBS}` = none required (cite the sibling docs)
- `{SIBLING_DOCS}` = all of the above (this is the canonical home; siblings link here)
Must collect: TLS `UNABLE_TO_VERIFY_LEAF_SIGNATURE`, OG `createImage timeout` + chromium sweep,
IPX Index-preview 404 (raw `<img>` fix), CRLF warnings, link-check failures, Zod frontmatter
errors, "case study in progress still shows", stale image cache. Each entry: symptom → cause → fix,
tagged **Universal** or **Local environment**.

- [ ] **Step 2: Save, path-check** (expected `missing: 0`).

- [ ] **Step 3: Commit**
```
git add docs/troubleshooting.md
git commit -m "docs: add aggregated troubleshooting guide"
```

---

### Task 9: `AGENTS.md` + `CLAUDE.md` pointer + `.gitignore`

**Files:**
- Create: `AGENTS.md`
- Modify: `CLAUDE.md` (replace full content with a thin pointer)
- Modify: `.gitignore` (remove the `CLAUDE.md` line; keep `docs/superpowers/`)

**Interfaces:**
- Consumes: every `docs/*.md` produced above; the current local `CLAUDE.md` (the mined source).

- [ ] **Step 1: Safety snapshot — confirm CLAUDE.md content is fully migrated**

Dispatch an `Explore` agent: "Compare the current `CLAUDE.md` against the docs/ set
(`docs/architecture.md`, `brand-voice.md`, `content-authoring.md`, `images.md`, `i18n.md`,
`build-deploy.md`, `llms.md`). List any fact, rule, or section in CLAUDE.md that is NOT represented
in docs/. Return only the gaps." If gaps exist, fix the relevant doc (re-dispatch its Draft if
needed) and re-commit before proceeding.

- [ ] **Step 2: Dispatch the Draft agent for `AGENTS.md`** (concise, not a novel):
- `{DOMAIN}` = "Agent entry point"
- `{scope}` = "orient a no-context agent in 2 minutes: what this is, the repo map, the golden rules,
  and where to go for each kind of change"
- `{FILE}` = `AGENTS.md`
- `{READ_FIRST}` = all of `docs/*.md`, current `CLAUDE.md`
Structure: one-paragraph orientation; a repo map table (area → path → which doc); a "Golden rules"
list (the locks, compressed, linking docs/brand-voice.md for detail); a "Where do I go to…" table
(add a study → docs/content-authoring.md; change a token → docs/brand-voice.md; deploy →
docs/build-deploy.md; etc.); the verify commands; and the branch/commit conventions. **No long
prose** — it points into docs/.

- [ ] **Step 3: Write `CLAUDE.md` as a thin pointer**

Replace `CLAUDE.md` contents with:
```markdown
# CLAUDE.md

This project's instructions for AI agents live in **[AGENTS.md](./AGENTS.md)** (the canonical
entry point), which links into `docs/`. Read it first.

@AGENTS.md
```
(The `@AGENTS.md` import makes Claude Code auto-load the canonical instructions.)

- [ ] **Step 4: Un-ignore `CLAUDE.md`**

Remove the `CLAUDE.md` line from `.gitignore` (keep `docs/superpowers/` and `.claude`). Verify:
```
git check-ignore -v CLAUDE.md; echo "exit: $?"
```
Expected: no output, `exit: 1` (no longer ignored).

- [ ] **Step 5: Verify no duplicated instruction prose**

Manually confirm `AGENTS.md`, `CLAUDE.md`, `README.md` (Task 10 pending) don't restate doc bodies —
they point inward. Confirm `AGENTS.md` links resolve (path check from Task 1 Step 2).

- [ ] **Step 6: Commit**
```
git add AGENTS.md CLAUDE.md .gitignore
git commit -m "docs: add AGENTS.md entry point; CLAUDE.md points to it; un-ignore CLAUDE.md"
```

---

### Task 10: `README.md` (human front door)

**Files:**
- Modify: `README.md` (replace the Nuxt boilerplate)

- [ ] **Step 1: Dispatch the Draft agent.** Slots:
- `{DOMAIN}` = "Human README"
- `{scope}` = "tell a human developer what this project is, how to run it, and where the docs are"
- `{FILE}` = `README.md`
- `{READ_FIRST}` = `AGENTS.md`, `docs/architecture.md`, `package.json`
Structure: project one-liner + brand thesis; "Quickstart" (`npm install`, `npm run dev`,
`npm run generate`) with the Local-environment TLS note; "Documentation" section linking
`AGENTS.md` and each `docs/*.md` with a one-line description; "Tech stack" bullets; license/contact
line. Keep it short; the depth is in `docs/`.

- [ ] **Step 2: Save `README.md`, path-check** (expected `missing: 0`).

- [ ] **Step 3: Commit**
```
git add README.md
git commit -m "docs: rewrite README as human front door"
```

---

### Task 11: Quality gates + final verification

**Files:** none created; fixes applied to whatever the gates flag.

- [ ] **Step 1: Accuracy-critic pass**

Dispatch a `general-purpose` agent (read-only): "You are a skeptical fact-checker. For each file in
`AGENTS.md`, `README.md`, `CLAUDE.md`, and `docs/*.md`, verify every cited `path:line`, every npm
script, and every API/field claim against the actual code. Return a table: file | claim | verdict
(OK / WRONG / UNVERIFIABLE) | correction. Do not fix; report only." Apply the corrections (re-Draft
or hand-edit), re-commit per file touched.

- [ ] **Step 2: Cold-clone smoke test (manual reasoning, main thread)**

From `AGENTS.md` alone, confirm you can reach the runbook for each of: "add a case study", "change a
design token", "add a French twin", "deploy". If any path is more than 2 hops or missing, fix
`AGENTS.md`.

- [ ] **Step 3: Build + checks still green**

Run (main thread; sweep chromium first if a prior generate left some):
```
NODE_OPTIONS=--use-system-ca npm run generate
npx nuxi typecheck
npm run check:i18n
```
Expected: generate completes (no link-check failures; a flaky OG `createImage timeout` is not a
real failure — re-run after `Get-Process chrome,chromium | Stop-Process -Force`); typecheck clean;
check:i18n passes. Docs are Markdown and not wired into the build, so the only risk is the two
`git mv`s — confirm nothing referenced the old paths (Tasks 3–4 Step 1 results all fixed up).

- [ ] **Step 4: Final reference-integrity sweep**
```
grep -rniE "POPULATING\.md|CASE_STUDY_HANDOFF" --include=*.md --include=*.ts --include=*.vue . | grep -v node_modules | grep -v "docs/superpowers"
```
Expected: no stale references to the old filenames (all updated to `docs/content-authoring.md` /
`docs/images.md`).

- [ ] **Step 5: Commit any fixes**
```
git add -A
git commit -m "docs: accuracy-critic corrections and final verification"
```

---

## Self-Review

**Spec coverage:**
- Architecture/code → Task 1. Brand/voice → Task 2. Content authoring → Task 3. Images → Task 4.
  i18n → Task 5. Build/deploy → Task 6. llms → Task 7. Troubleshooting → Task 8.
  AGENTS.md + CLAUDE.md pointer + .gitignore → Task 9. README → Task 10. Quality gates + verify
  (spec §9) → Task 11. ReAct/divide-and-conquer (spec §7) → plan header + per-task Map/Draft
  dispatch. The prompt (spec §8) → Global Constraints (template) + per-task filled slots.
- Spec §11 open question (check:i18n exists) → resolved: `check:i18n` confirmed in package.json.
- Spec §11 open question (HANDOFF tracker) → resolved: Task 4 keeps the tracker, fences machine
  learnings under "Local environment".

**Placeholder scan:** the `{slots}` in the shared template are intentional parameters, fully
filled per task. No "TBD/TODO" left as plan instructions (doc-level `TODO: verify` is a deliberate
agent-honesty marker, resolved in Task 11).

**Consistency:** file names (`docs/content-authoring.md`, `docs/images.md`) used identically across
tasks; `repo-inventory.md` path consistent; verify commands (`NODE_OPTIONS=--use-system-ca npm run
generate`, `npm run check:i18n`, `npx nuxi typecheck`) consistent throughout.
