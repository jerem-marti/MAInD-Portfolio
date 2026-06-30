# Brand & voice

> The rules a cold agent must obey when writing copy or touching design on jeremymartin.ch. Token *values* live in `app/assets/css/main.css`; this doc owns the *rules*.

## At a glance

| When I'm doing… | The rule | Source |
| --- | --- | --- |
| Picking a color | Use the `@theme` custom properties only; never raw hex in components. | `app/assets/css/main.css:6-17` |
| Reaching for yellow | Accent on active/focus/hover/one-callout only. Never a fill on a large surface. | CLAUDE.md › Design tokens |
| Setting type | Geist Sans for prose/headings; Geist Mono for structural meta only. | `app/assets/css/main.css:15-16` |
| Writing body copy | No em-dashes/dashes; US spelling; only real numbers; Swiss `'` separator. | CLAUDE.md › Voice rules |
| Naming a metric | Use a real one or delete the sentence. Never invent. No specific grades. | CLAUDE.md › Voice rules |
| Describing the work | "agentic experiences (AX)", designed around user intent. Not "AI-driven products". | CLAUDE.md › Voice rules |
| Tagging an Index row | 2–4 tags, only from `indexTags`. TypeScript enforces it. | `app/data/projects.ts:7-30,36` |
| Using a client name | UBS name OK in copy; UBS logo never in any image. | CLAUDE.md › Voice rules |
| Stating a bio fact | Pull from Background facts below (corrected). Languages: FR native + EN B2, no Italian. | This doc › Background facts |

## Brand thesis

The site exists to show **how Jérémy thinks, not what he ships**. Process is the artifact; outputs are evidence the process works. *Why:* it differentiates a designer from a deliverables list, and it is the through-line every case study and copy decision must serve.

- **Voice:** warm and precise — confident, technically grounded, disciplined. Substance under the surface.
- **Positioning:** the work is **"agentic experiences (AX)"**, designed around user intent — never "AI-driven products". *Why:* AX centers the human's intent; "AI-driven" centers the technology and reads as hype.
- **What this is NOT:** SaaS, agency site, freelance portfolio, blog, or a JS app. It is a static document with light interactivity. (CLAUDE.md › What this codebase is NOT)

## Design tokens

Real custom properties from the `@theme` block in `app/assets/css/main.css:6-17`. Tailwind v4 auto-generates utilities from these names (`bg-brand-bg`, `text-brand-ink-muted`, `border-brand-hairline`, `font-sans`, `font-mono`, …). **Use the utilities/variables, never the raw hex.**

| Custom property | Value | Intended use |
| --- | --- | --- |
| `--color-brand-bg` | `#f4f5f7` | Cool-neutral page background |
| `--color-brand-surface` | `#ffffff` | Cards/surfaces sitting above the background |
| `--color-brand-ink` | `#0a0a0a` | Primary text; also the focus-ring keyline |
| `--color-brand-ink-muted` | `#5b6168` | Secondary / meta text (cool grey) |
| `--color-brand-hairline` | `#d7dae0` | Borders, dividers, rules |
| `--color-brand-accent` | `#f5d547` | Signal yellow — active / focus / hover only |
| `--color-brand-ink-hover` | `#1f1f1f` | Hover ink (lifted black). *Present in CSS, not in CLAUDE.md's token list.* |
| `--font-sans` | `"Geist", ui-sans-serif, system-ui, sans-serif` | Display, headings, body |
| `--font-mono` | `"Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace` | Structural meta only (see Typography) |

**Yellow with discipline** — `--color-brand-accent` is a *signal*, not a fill. Allowed moments: active-state indicator in nav/TOC, focus rings, link arrows on the Index list, hover highlight on interactive rows, one callout per case study. Never a fill on a large surface. *Why:* scarcity makes it mean "here / active"; spread thin it means nothing.

Two locked non-`@theme` colors also live in the CSS and must not be repurposed:
- **Focus ring** (`main.css:34-38`): `3px` solid accent + a `4px` ink `box-shadow` keyline. *Why:* yellow alone is only ~1.33:1 against the light bg; the ink keyline carries the 3:1 non-text contrast (WCAG 1.4.11 / 2.4.11). Never remove focus outlines.
- **Text selection** (`main.css:47-54`): indigo `#4748F5` on `--color-brand-bg`. *Why:* selection avoids yellow (the inline-emphasis color) to stay unambiguous.

## Typography

Self-hosted via `@nuxt/fonts`. Two families, two jobs — do not cross them.

- **Geist Sans** (`--font-sans`, family literal `"Geist"`) — display, headings, body prose.
- **Geist Mono** (`--font-mono`) — structural meta **only**: section numbers (`00`–`05`), captions, Index list tags, year labels, footer micro-copy. *Why:* the mono is the maker-engineer signal; on body prose it becomes costume, not signal. **Never set body prose in mono.**

Section numbers appear across the home page as quiet typographic chrome: Geist Mono, small size, `--color-brand-ink-muted`.

## Voice rules

For any copy work. (CLAUDE.md › Voice rules.)

- **No em-dashes / dashes in body copy.** Dashes are fine in chrome, meta, captions, and titles — never in running prose. Restructure the sentence instead.
- **US spelling** (switched from British 2026-06-28).
- **Inverted pyramid:** lead with the claim, then support it.
- **Banned phrases, verbatim:** "passionate about," "thought leader," "results-oriented," "synergy," "rockstar," "ninja".
- **No specific numerical grades.** Ever.
- **Only real numbers.** Never invent a metric; drop the sentence instead.
- **Swiss thousands separator is `'`** — `1'000`, not `1,000` or `1.000`.
- **"Maker-Engineer" is an internal label** — never appears in published copy. The story does the work.
- **Positioning:** "agentic experiences (AX)", designed around user intent — not "AI-driven products".
- **UBS:** the name may appear in copy; the UBS logo must never appear in any image (client/NDA).

## Controlled vocabulary

The Index list tag set, verbatim from the `indexTags` array (`app/data/projects.ts:7-30`). `IndexTag` is `(typeof indexTags)[number]` and `IndexRow.tags` is typed to it, so **TypeScript rejects any tag outside this list at build time** (`app/data/projects.ts:32-36`). Display labels (EN/FR) live in the i18n catalog under `tags.*`; the strings below are the canonical identifiers.

- UX research
- Interaction design
- Prototyping
- Information architecture
- UX writing
- Design systems
- Accessibility
- Tangible interface
- Front-end
- Back-end
- Brand / Editorial
- AI evaluation
- Machine learning
- Hardware
- Sustainability
- Business strategy
- Marketing strategy
- Design thinking
- Scrollytelling
- Data visualization
- Small data
- DevOps

**Rules:** each Index row gets **2–4 tags**, all from the list above, applied consistently. To add a new tag: append the string to `indexTags` in `app/data/projects.ts`, then add its `tags.<...>` label to `i18n/locales/en.json` (and `fr.json`). Do this **sparingly** — *why:* the vocabulary is a filter facet on the Index; every new tag dilutes the others and risks near-duplicates that fragment the filter.

## Background facts

The only bio facts copy may draw on. These **override any stale text** elsewhere.

- **Now:** Master of Arts in Interaction Design (MAIND) at SUPSI, Mendrisio; graduating **2027**.
- **Education (chronological):** CFC Electronics Technician (4-year apprenticeship at HEIA-FR) → CMS preparatory bridge year at EPFL (for *maturité professionnelle* holders) → one semester Microengineering at EPFL (left; state factually, do not over-market) → BSc Media Engineering at HEIG-VD → MAIND at SUPSI.
- **Languages:** French (native), English (B2). **No Italian.**
- **Based:** Mendrisio, Switzerland.
- **Available:** from **August 2026**.
- **Festival (Baleinev):** committee 2023–2025; ~1'000 attendees; committee of ~25. Programmer (2023), head of communications (2024), president (2025).
- **Bachelor thesis — DataBloom:** a tangible interface (a wilting flower) making the energy impact of digital usage visible at home; functional prototype + thesis paper; **published on the MEI research blog** (not "in active use").
- **Contact:** hello@jeremymartin.ch · LinkedIn `jermarti`.

## Constraints

- **UBS logo never in any image** (client/NDA). The UBS name in copy is fine.
- **Featured trio is locked, in this order:** DataBloom, WeMatch, Thea (`app/data/featured.ts`). The Index list in `app/data/projects.ts` is a separate set.
- **Process is the artifact** — every design and copy decision serves "how he thinks", not a deliverables inventory.
- **WCAG AA on every color choice.** Text/background pairings meet AA; the focus ring's ink keyline exists specifically to clear non-text 3:1 (yellow alone fails). Never remove focus states.

## Scope (excluded by design, v1)

Deliberate omissions, not gaps. Don't add them without a decision:

- **No contact form** — mailto only (avoids a privacy-notice trigger).
- **No analytics at v1** — Matomo is deferred to v2.
- **No legal pages at v1** — mailto-only contact.
- **No dark mode at v1.**
- **Deferred to v2:** Matomo (analytics) and `nuxt-ai-ready` (an llms.txt helper). The French locale was originally deferred but is now shipped — see `docs/i18n.md`.

## Related

- `docs/architecture.md` — where these tokens are consumed (`## Where code lives`, `## Constraints`).
- `docs/content-authoring.md` — where this vocabulary and these voice rules get applied when writing case studies.
- `app/assets/css/main.css:6-17` — token values (source of truth; this doc must not diverge).
- `app/data/projects.ts:7-30` — controlled vocabulary (source of truth, TypeScript-enforced).
