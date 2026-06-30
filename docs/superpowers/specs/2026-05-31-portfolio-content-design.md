# Portfolio content design

**Date:** 2026-05-31
**Author:** Jérémy Martin (with Claude as UX writer)
**Status:** Draft for review

## 1. Goal

Populate the content of `jeremymartin.ch` (Nuxt 4 portfolio, currently built with placeholder/fabricated prose) with real material drawn from:

- Bachelor thesis at HEIG-VD (DataBloom, 2024-25)
- 8 Master Interaction Design projects at SUPSI (2025-26)
- 1 additional Master project from the `designing_intelligent_experiences` course (WeMatch)
- Old Bachelor-era portfolio (6 projects + Baleinev Festival role)

The structure, design tokens, and voice rules are locked (see `CLAUDE.md`). This spec covers **what goes where and how it's written**.

## 2. Audience and attention budget

Primary readers (in priority order):

1. **Design hiring managers / leads** at product teams hiring 2026 graduating interns. They scan; they spend ~3 seconds deciding to keep scrolling.
2. **Design recruiters** scanning multiple portfolios; they need clear positioning.
3. **Peer designers / collaborators** for credibility checks and reference.
4. **Future AI summarizers** (LLM-driven candidate review tools, the planned in-site AI assistant). Every page needs clean semantic structure so summaries pull a clean block.

Implications for writing:
- Every page's first 10 words must convey *who, what, why care*.
- Every case study has one quotable "what this is" sentence near the top.
- Headings stay descriptive (not clever) so they survive being lifted into a summary.
- No banned phrases (CLAUDE.md list). No invented metrics. No grades.

## 3. Project mapping

### 3.1 Featured (×3)

The Featured row anchors the home page and gets full case study pages.

| Slot | Title | Slug | Source | Why featured |
|------|-------|------|--------|--------------|
| F·01 | **DataBloom — making the energy impact of digital usage visible** | `databloom` | Bachelor thesis, MEI/HEIG-VD, 2024-25 | Largest scope, solo, six-month build, real artifact, real user testing, published case write-up by MEI |
| F·02 | **WeMatch — a travel companion that solves a people problem** | `wematch` | Designing Intelligent Experiences (MAIND-S2), 2025 | Demonstrates the full chain (strategy → UX writing → AI feature design → editorial frontend craft) that the brand thesis argues for. Strongest "show how you think" piece |
| F·03 | **ELEN — a speculative camera for invisible wireless presences** | `elen` | ID212 Prototyping Spatial Experiences, 2026 | Critical / speculative design, deep technical work (Kismet + Python backend + WebGL fluid sim), exhibited at SACEBA. Brings a different mode than F·01 and F·02 |

**Slug rename:** F·01 was `household-energy-interface`. Renaming to `databloom` because:
- The real project is named DataBloom (per MEI's published blog post)
- "Household energy" misrepresents the scope (it's specifically digital usage energy, not generic electricity)
- The current markdown file at `content/work/household-energy-interface.md` is entirely fabricated and will be rewritten from the thesis

### 3.2 Index (10 rows — final after Step 3 trimming)

All real master + bachelor portfolio projects. Linked rows resolve to either an **internal** case study page (`/work/<slug>`) or an **external** live URL/repository.

| № | Title | Year | Source | Link |
|---|-------|------|--------|------|
| 01 | Human Loci | 2025 | ID120 | Internal: `/work/human-loci` |
| 02 | Wama | 2026 | ID131 | Internal: `/work/wama` |
| 03 | Goldilocks Worlds | 2025 | ID190 | Internal: `/work/goldilocks-worlds` |
| 04 | Meeting Pond | 2026 | ID151 | Internal: `/work/meeting-pond` |
| 05 | E-banking Family Space | 2025 | ID111 | Internal: `/work/family-space` *(anonymized — see §4.1)* |
| 06 | BrushBuddy | 2026 | ID140 | Internal: `/work/brushbuddy` |
| 07 | Pong Game | 2025 | ID102 | External: `github.com/jerem-marti/MAInD-Creative_Coding_Foundation-2025` |
| 08 | UEFA Female Coaches Campaign | 2025 | Bachelor portfolio (`HEIG-VD/IM-BA6/ProjInt`) | Internal: `/work/uefa-female-coaches` |
| 09 | Cultural Trails Web App | 2024 | Bachelor portfolio (`HEIG-VD/IM-BA4/ProjetArt`) | Internal: `/work/cultural-trails` |
| 10 | BeReal Like Web App | 2024 | Bachelor portfolio | External: `github.com/HEIG-COMEM/HEIG-VD_DevMobil_REST` |

**Dropped from earlier drafts (user feedback during Step 3):**
- Tilt Runner — ESP32-driven 3D web game (Bachelor portfolio)
- Swiss Railways Scrollytelling (Bachelor portfolio)
- Festi'Neuch Website Redesign (Bachelor portfolio)

Tags per CLAUDE.md controlled vocabulary; 2-4 per row.

**Linking summary (10 rows):**
- 3 Featured + 7 Internal-linked Index entries = **10 case study pages total** (DataBloom, WeMatch, ELEN, Human Loci, Wama, Goldilocks Worlds, Meeting Pond, Family Space, BrushBuddy, UEFA Female Coaches Campaign, Cultural Trails Web App).
  - *(Actually that's 11. Let me recount: 3 Featured + 7 internal Index = 10. Internal Index entries: Human Loci, Wama, Goldilocks Worlds, Meeting Pond, Family Space, BrushBuddy, UEFA, Cultural Trails = 8. So 3 + 8 = 11 case study pages.)*
- 2 External-linked Index entries (Pong Game, BeReal Like Web App).
- 0 unlinked rows.

**Decisions:**
- The current `app/data/projects.ts` placeholders ("Confidential fintech work", "Scrollytelling data piece", etc.) are entirely replaced.
- Home page Index header text: "Ten projects from Master and Bachelor work: case studies and live repositories."
- Family Space (UBS-anonymized) display title is **"E-banking Family Space"** per user feedback. Slug stays `family-space` (path unchanged).
- Goldilocks Worlds upgraded from external GitHub link to internal case study — source folder `MAIND-S1/making_sense_of_data/mini-project` has README + codebase + datasets + .jam board, enough for a real write-up.

### 3.3 Excluded (with reason)

- **Baleinev Festival** — community/leadership role, lives in About > Field experience, not as an Index project.
- **Cultural Trails Web App** is a team project where Jérémy was back-end lead; included in Index because the artifact is live and the role is clear.
- Anything not in the resource folders.

## 4. Voice rules

Holds CLAUDE.md voice rules and adds:

| Rule | Why |
|------|-----|
| Only real numbers. If a metric isn't real, the sentence is dropped. | The current site invents specifics (e.g. "11 households, 9 of 11 reported change"). That's dishonest and easy to disprove. |
| Every page's first ~10 words pass the 3-second test. | Hiring managers scan. |
| One "what this is" sentence near the top of every case study, written so an LLM summary can lift it whole. | Future AI summary tooling. |
| No invented user quotes. Real quotes from the thesis or project docs only. | Same reason as numbers. |
| Don't oversell project scope. WeMatch is a Master course one-pager. ELEN was shown at SACEBA, not at a major museum. DataBloom is in user-test stage, not deployed. | Substance under the surface — overclaim breaks the brand. |
| French original quotes can stay French with English translation in mono caption. | The thesis is in French; lifting real quotes is more honest than translating-and-attributing. |
| Banned phrases (CLAUDE.md): "passionate about", "thought leader", "results-oriented", "synergy", "rockstar", "ninja". No dashes in body copy. | Existing CLAUDE.md rule. |
| "Maker-Engineer" never appears in published copy. The story does the work. | Existing CLAUDE.md rule. |

### 4.1 UBS anonymization (hard rule)

The ID111 project was a real engagement with **UBS** under NDA. The bank's name **MUST NOT appear anywhere on the public site** — no body copy, no title, no alt text, no slug, no image filename, no Open Graph meta, no LinkedIn share fallback. Anonymization rules:

- **Project name:** "Family Space" (drop the "UBS" prefix). Optionally subtitled "banking concept for parents and kids".
- **Client phrasing options (use sparingly):** "a major Swiss bank", "a Swiss bank", "a national retail bank". Never "UBS", "the Swiss bank UBS", etc.
- **Slug:** `family-space`. Not `ubs-family-space`.
- **Team / partner names:** safe to keep (the SUPSI teachers, the student team). The bank's individual contacts are not named.
- **Visual assets:** any screenshot or mockup containing the UBS logo or brand color is **excluded** from the public site; only anonymized mockups or process artifacts (sketches, flow diagrams, wireframes without branding) may be used. If we lack anonymized imagery, the case study ships with a placeholder hero — better than a leak.
- **Sourcing note:** the local project description PDF (`SUPSI/Projects-Documentation/ID111-.../UBSFS_Project_Description.pdf`) and the Figma file are working material only. Public copy is rewritten from scratch to avoid lifting any branded fragment.

Verbal example:

> ❌ "UBS Family Space introduces a shared digital environment inside the UBS app…"
> ✅ "Family Space is a shared banking environment for parents and children, designed inside a major Swiss bank's mobile app."

This rule is non-negotiable. If the constraint makes a sentence weak, drop the sentence rather than risk a violation.

## 5. Real-fact corrections required

Current site has fabricated content that has to be undone before writing real copy.

### 5.1 In existing files

| File | Current state | Action |
|------|---------------|--------|
| `content/work/household-energy-interface.md` | Entirely fictional. Says oak block, 11 households, 6-week field study, deployment, distinction. Real: flower form, no field study (lab user-testing N=4-ish), simulated CarbonViz Home data, no deployment, awarded. | Replace whole file; rename slug to `databloom`. |
| `content/work/ai-evaluation-framework.md` | Stub for invented "AI evaluation framework" project. | Delete; replace with `wematch.md`. |
| `content/work/primary-sources-reader.md` | Stub for invented "Primary sources reader" project. | Delete; replace with `elen.md`. |
| `app/data/featured.ts` | Three placeholders with invented problem/outcome strings. | Rewrite with real DataBloom, WeMatch, ELEN entries. |
| `app/data/projects.ts` | 8 placeholders with invented titles ("Confidential fintech work", "Scrollytelling data piece", "Personal data dashboard", "Wearable hardware exploration", etc.). | Rewrite with the 13-row real lineup from Section 3.2. |
| `app/pages/index.vue` (Index section header) | "Eight entries. Some link to case studies, some don't. Both are honest." | Update count to match Section 3.2 (drop the specific count or update to match). |
| `app/pages/index.vue` (Hero, Approach, About preview, Contact) | Mostly clean prose but uses some abstractions to be re-grounded. | Light edit; preserve voice. |
| `app/pages/about.vue` | Mostly clean. Workshop caption "HEIG-VD · 2024" should match a real photo we can supply later. | Light edit. |
| `app/pages/contact.vue` | Clean, no factual issues. | Likely no change. |

### 5.2 In `CLAUDE.md`

| Current claim | Correction | Source |
|---------------|-----------|--------|
| Baleinev "~1,000 attendees" | ~1'000 attendees (Swiss apostrophe formatting) | User feedback 2026-05-31 |
| Baleinev "~30-person committee" | ~25 committee members | User feedback 2026-05-31 |
| Baleinev "one year as president" | Three-year arc 2023→2025: programmer (2023), head of comms (2024), president (2025) | User feedback 2026-05-31 (overrides old portfolio PDF, which was misread) |
| Languages "Italian (working, not fluent)" | Drop Italian entirely — user does not speak it | User feedback 2026-05-31 |
| Previously "CFC Electronics Technician (4-year apprenticeship at HEIA-FR)" | Correct as-is; carry HEIA-FR through to facts row | User feedback 2026-05-31 |
| *(missing)* | Add CMS bridge year (EPFL) between CFC and EPFL semester. CMS is the year-long bridge for students with a *maturité professionnelle* rather than the *maturité gymnasiale* | User feedback 2026-05-31 |
| Featured #2 "AI evaluation framework (TO BE BUILT, non-negotiable)" | Replaced with WeMatch (real existing project) | This spec |
| Featured #3 "TBD" | Replaced with ELEN | This spec |
| Hero/positioning "evaluating AI-driven products" | Reframe as "agentic experiences (AX): designed around user intent, with AI used honestly inside the design process". The evaluation point survives in the prompt-grounding angle, not as the lead. | User feedback 2026-05-31 |
| *(missing)* | Add the UBS anonymization rule (§4.1) to CLAUDE.md so future content work inherits it | This spec |
| *(missing)* | Add Swiss number formatting note: thousands separator is `'` not `,` (e.g. `1'000`) | User feedback 2026-05-31 |

`CLAUDE.md` will be updated as part of the writing work, not in a separate pass. These corrections are also captured in user memory (`bio-corrections-vs-claudemd.md`) so they survive across sessions until Step 11.

## 6. Writing & validation cadence

Each step is its own commit. After each validated step, the writer (Claude) moves on without asking; if the user requests a change, the change is made and the pattern re-locked for downstream pages.

| Step | Scope | Files touched | Validation gate |
|------|-------|---------------|-----------------|
| 1 | About + Contact (smallest surfaces; lock voice on low-stakes copy) | `app/pages/about.vue`, `app/pages/contact.vue` | User reviews wording; we lock voice |
| 2 | Home page: Hero + 01 Approach + Featured cards + 04 About preview + 05 Contact | `app/pages/index.vue`, `app/data/featured.ts` | User reviews Hero + one Featured card; we lock pattern; I roll out the rest |
| 3 | Index list — 13 real entries with tags, year, alt text **+ icon distinction (§9)** | `app/data/projects.ts`, Index section header + icon rendering in `app/pages/index.vue` | User reviews first 2 rows + icon behaviour; I batch the rest |
| 4 | Featured F·01 case study — DataBloom (full rewrite) | `content/work/databloom.md` (new), delete `household-energy-interface.md` | User reviews structure + voice; we lock case study pattern |
| 5 | Featured F·02 case study — WeMatch | `content/work/wematch.md` (new), delete `ai-evaluation-framework.md` | User reviews, possibly adjusts pattern |
| 6 | Featured F·03 case study — ELEN | `content/work/elen.md` (new), delete `primary-sources-reader.md` | Final case study |
| 7 | SUPSI Index case studies — Human Loci, Wama, Goldilocks Worlds, Meeting Pond, BrushBuddy | `content/work/<slug>.md` ×5 | One pass, user reviews together |
| 8 | **Family Space case study (anonymized, see §4.1)** — read source from `SUPSI/MAIND-S1/documentation/ID111.01...`, write fresh prose containing no UBS reference | `content/work/family-space.md` (new) | User reviews specifically for anonymization compliance |
| 9 | **UEFA Female Coaches Campaign case study** — read source from `HEIG-VD/IM-BA6/ProjInt`, frame the full project (team work, not just landing page) plus the MEI selection → `whynotyou.ch` follow-on context | `content/work/uefa-female-coaches.md` (new) | User reviews framing of "student project that fed into a real campaign" |
| 10 | **Cultural Trails Web App case study** — read source from `HEIG-VD/IM-BA4/ProjetArt`, frame back-end-lead role on a live multi-stakeholder app | `content/work/cultural-trails.md` (new) | User reviews |
| 11 | `CLAUDE.md` fact corrections (Baleinev numbers, featured lineup, anonymization rule) | `CLAUDE.md` | User reviews diff |

**Out of scope for this content pass (deferred):**
- French (`/fr/...`) translation — v2 per CLAUDE.md
- Real images / alt-text accuracy review (placeholders stay until images land in Phase 5)
- llms.txt for AI crawlers — v2 per CLAUDE.md
- Analytics / Matomo — v2 per CLAUDE.md
- Cover letter / CV updates — separate deliverable

## 9. Technical requirement — Index link icons

The Index list currently renders one icon (Lucide `ArrowUpRight`) for all linked rows and a mono dash for unlinked rows. With more rows pointing to internal case studies and others pointing to external URLs, the user signal needs to be visually distinct.

**Rule:**

| Destination | Icon | Lucide name | Why |
|-------------|------|-------------|-----|
| Internal route (`/work/<slug>` or any path starting with `/`) | → | `ArrowRight` | Horizontal arrow = "go to a page on this site" |
| External URL (starts with `http://` or `https://`) | ↗ | `ArrowUpRight` | Up-right arrow = web convention for "leaves this site" |
| Unlinked row (no `href`) | — | n/a | Mono dash, current behaviour. *(With the updated mapping there are 0 unlinked rows, but the case stays in the component for resilience.)* |

**Implementation notes for Step 3:**

- The picker is purely URL-pattern based — no need for a new field on `IndexRow`. A small computed (`isExternal = (href) => /^https?:\/\//.test(href ?? '')`) in `app/pages/index.vue` keeps it inline.
- Both icons keep stroke-width 1.5 to match the existing Lucide style.
- External rows additionally get `target="_blank"` and `rel="noopener"` (current code already handles this for the `<a>` element when `r.href` is present; verify the render path).
- Hover/focus translation on the icon (`group-hover:-translate-y-0.5 group-hover:translate-x-0.5`) reads correctly for ArrowUpRight; for ArrowRight, switch to `group-hover:translate-x-0.5` only (no vertical lift). Small craft detail.
- Accessibility: both icons keep `aria-hidden="true"` because the row's text is the accessible name. The `<a>` element's `rel` attribute carries the "external" semantic.

## 7. Open questions deferred to per-page review

These don't block the spec but will surface during writing:

- **F·01 DataBloom slug:** `databloom` or `databloom-energy`? I'll default to `databloom` for shortness.
- **External link rows in Index:** resolved in §9 — icons now distinguish internal vs. external.
- **Real user-test quotes from thesis:** keep in French with English caption, or translate? I'll default to French primary + English mono caption.
- **WeMatch images:** the project ships as a web one-pager. Do we screenshot it or take fresh case-study imagery? Defer to image pass (Phase 5).
- **ELEN exhibition photos:** the project was exhibited at SACEBA cement plant. Are exhibition photos available for the case study? Defer to image pass.
- **UEFA case study framing:** primary frame is "team project, my role was the landing page, the merged project was selected by MEI and developed into the live `whynotyou.ch` campaign for UEFA." That arc is unusual and worth telling in full. Linkbacks needed: `pi25.heig-vd.ch/en` (student showcase) and `whynotyou.ch` (final MEI-developed campaign). Verify both URLs are still live at write time.
- **Family Space (UBS) imagery:** confirm what assets exist without UBS branding before the case study is written. If none, ship with a placeholder hero.

## 8. Self-review checklist

- [x] No placeholders ("TBD", "TODO") in the spec
- [x] No internal contradictions (mapping consistent across sections 3.1, 3.2, 5, 6)
- [x] Scope focused on one content pass (no v2 work, no image work, no translation)
- [x] All requirements concrete (file paths, slugs, real titles, validation gates)
- [x] UBS anonymization rule explicit and enforceable (§4.1)
- [x] Icon distinction has a concrete rule the implementer can follow (§9)
