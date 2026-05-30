# Jérémy Martin — Personal Portfolio

This is a personal portfolio website for Jérémy Martin, an interaction design master's student at SUPSI, Mendrisio. Domain: jeremymartin.ch.

## Brand thesis

The site exists to show how Jérémy thinks, not what he ships. Process is the artifact; outputs are evidence the process works. The voice is "warm and precise" — confident, technically grounded, with discipline. Substance under the surface.

## Tech stack

- **Nuxt 4** (Vue 3, Vite, Nitro) with the `app/` directory convention
- **Tailwind CSS v4** (CSS-first config via `@theme` in `app/assets/css/main.css`)
- **TypeScript**
- **Static site generation** via `nuxi generate` (`nitro.preset: 'static'`)
- **@nuxt/image** — AVIF/WebP with fallbacks, responsive srcset, named presets per role
- **@nuxt/fonts** — self-hosted Geist Sans + Geist Mono (free from Vercel)
- **@nuxtjs/seo** — umbrella for robots, sitemap, og-image, schema.org, link checker
- **@nuxt/content** — case studies as Markdown with frontmatter
- **@vueuse/nuxt** — scroll, intersection observer, media query composables

**Deferred to v2:** `@nuxtjs/i18n` (French version), Matomo (analytics), `nuxt-ai-ready` (llms.txt for AI crawlers).

**Excluded by design:**
- No contact form (mailto only, no privacy notice trigger)
- No analytics at v1 (Matomo deferred to v2)
- No legal pages at v1 (mailto-only contact)
- No UI library (no Radix, no shadcn-vue, no Nuxt UI — custom Tailwind components only)
- No icon library (the 6-8 icons we need are inline SVG, custom-drawn or copy-from-Lucide-as-SVG)
- No dark mode at v1

## Site structure

```
/                       Home (single long page, numbered sections 00-05)
/work/[slug]            Featured case study (×3)
/about                  About (separate page, CV downloads)
/contact                Contact (mailto only)
error.vue               Nuxt error page (404)

/fr/...                 French version, ships in v2 via @nuxtjs/i18n
```

## Design tokens (matching the Figma Make prototype)

```css
--brand-bg: #f4f5f7;         /* cool neutral background */
--brand-surface: #ffffff;
--brand-ink: #0a0a0a;
--brand-ink-muted: #5b6168;  /* cool grey for secondary text */
--brand-hairline: #d7dae0;
--brand-accent: #f5d547;     /* signal yellow */
```

Yellow appears with **discipline** — never as a fill on large surfaces. Acceptable moments: active state indicator in navigation/TOC, focus rings, link arrows on Index list, hover highlights on interactive rows, one callout per case study.

## Typography

- **Geist Sans** — display, headings, body
- **Geist Mono** — meta, captions, section numbers (00, 01, 02), Index list tags, year labels, footer micro-copy

The mono carries the maker-engineer signal. Use it intentionally on structural meta, never on body prose.

Section numbers are visible across the home page as quiet typographic chrome in Geist Mono at small size, text-secondary color.

## Interaction principles

1. Motion serves meaning, never decoration
2. Information is visible at rest (hover/tap is enrichment, never gating)
3. The page is complete in its HTML (SSG, JS enhances)
4. JavaScript earns its place
5. Scroll is the primary navigation (no scroll-jacking)
6. Hover is enrichment, touch is parity
7. The page tells you where you are (persistent nav, section numbers, sticky TOC on case studies)
8. Loading states are honest (no fake skeletons on a fast static site)
9. Forms are absent or trivial (no contact form at v1)
10. Accessibility AA, non-negotiable
11. Performance is a design decision
12. All motion respects `prefers-reduced-motion`

## Locked interaction behaviors

- **Desktop nav:** persistent top bar, always visible, compact
- **Mobile nav:** persistent bottom bar, ~56px, app-style, safe-area-inset-bottom, backdrop-blur if supported
- **Index list:** desktop hover shows side preview image; mobile has no preview; linked rows tap to navigate; unlinked rows non-interactive on mobile
- **Case study TOC:** sticky left rail on desktop, sticky top bar on mobile, scroll-spy active, click for smooth-scroll
- **Scroll progress indicator:** thin yellow line at top, case study pages only
- **Page transitions:** fade ≤250ms, respects `prefers-reduced-motion`

## Performance budget

- Initial HTML: <50KB per page
- Home total initial load: <500KB
- Case study total: <1.5MB
- LCP: <1s on good connection
- TTI: <1.5s

## Accessibility commitments

- WCAG AA contrast across every text/background pairing
- Keyboard navigation reaches everything mouse can reach
- Focus states visible in signal yellow, never removed
- Real alt text (not "image" or "hero" — describe what's in the image and what it shows in context)
- Semantic HTML, correct heading hierarchy (one h1 per page)
- Language attribute on `<html>` (`lang="en"`)
- Skip-to-content link as first focusable element

## Voice rules (for any copy work)

- No dashes in body copy
- Banned phrases: "passionate about," "thought leader," "results-oriented," "synergy," "rockstar," "ninja"
- Don't cite specific numerical grades
- "Maker-Engineer" is an internal label, never appears in published copy — the story does the work

## Background facts on Jérémy

- Currently: Master in Interaction Design at SUPSI, Mendrisio, graduating 2027
- Previously: BSc Media Engineering at HEIG-VD; one semester Microengineering at EPFL (factual, don't over-market); CFC Electronics Technician (4-year apprenticeship at HEIA-FR)
- Languages: French native, English B2, Italian working (not fluent)
- Based: Mendrisio, Switzerland
- Available: from August 2026
- Festival (Baleinev): 3 years involved (~1,000 attendees), one year as president of ~30-person committee
- Bachelor thesis: tangible interface for household energy, still in active use at the host institution
- Email: hi@jeremymartin.ch
- LinkedIn: jermarti

## Featured case studies (in order on home, locked)

1. **Household energy interface** (bachelor thesis, tangible interface) — content from existing portfolio PDF
2. **AI evaluation framework** — TO BE BUILT, non-negotiable for v1 launch
3. **Third case study** — TBD

## Index list controlled vocabulary

Use only these tags. Apply consistently. Each row gets 2-4 tags.

- UX research
- Interaction design
- Prototyping
- Information architecture
- UX writing
- Design systems
- Accessibility
- Tangible interface
- Front-end build
- Brand / Editorial
- AI evaluation
- Hardware

## File and directory conventions (Nuxt 4 `app/` structure)

```
nuxt-portfolio/
├── app/
│   ├── pages/               # Route files
│   │   ├── index.vue        # Home
│   │   ├── about.vue
│   │   ├── contact.vue
│   │   └── work/
│   │       └── [slug].vue   # Dynamic case study route
│   ├── components/
│   │   ├── chrome/          # TopNav, BottomNav, Footer
│   │   ├── home/            # Section components for home
│   │   ├── work/            # Case study section components, TOC, ProgressIndicator
│   │   └── ui/              # Small primitives (Button, IconArrow, etc.)
│   ├── layouts/
│   │   └── default.vue
│   ├── assets/
│   │   └── css/
│   │       └── main.css     # Tailwind v4 @theme + tokens
│   ├── data/                # Typed data files
│   │   ├── featured.ts      # Featured case studies array
│   │   └── projects.ts      # Index list entries
│   └── error.vue            # Nuxt error page (404 + others)
├── content/
│   └── work/                # Case study Markdown files
│       └── [slug].md
├── public/
│   ├── images/
│   │   ├── work/[slug]/     # Case study images
│   │   ├── about/           # About portrait
│   │   ├── index/           # Index list hover previews
│   │   └── featured/        # Featured card heroes
│   ├── jeremy-martin-cv-en.pdf
│   └── jeremy-martin-cv-fr.pdf  # ships with FR version in v2
├── nuxt.config.ts
└── CLAUDE.md                # this file
```

## How to add a featured case study

1. Place images in `public/images/work/[slug]/`
2. Add Markdown file at `content/work/[slug].md` with frontmatter: `title`, `summary`, `meta` (role, year, host, scope, what shipped), `heroImage`
3. Add typed entry to `app/data/featured.ts` (id, slug, title, hero image path, problem one-liner, outcome one-liner)
4. Verify `npm run generate` produces `/work/[slug]/index.html`
5. Verify the case study appears in the sitemap

## How to add an Index list entry

1. Place preview image (if any) in `public/images/index/`
2. Add typed entry to `app/data/projects.ts` (id, number, title, tags from controlled vocabulary, year, slug if linked, previewImage path, alt text)
3. If linked, follow the featured-case-study process for the destination page
4. Tags must come from the controlled vocabulary

## What this codebase is NOT

- Not a SaaS product
- Not an agency site
- Not a freelance portfolio
- Not a personal blog
- Not a JavaScript app — it's a static document with light interactivity

## Migration context

This project is being migrated from a Figma Make React prototype to Nuxt 4. The prototype lives at `D:\OneDrive\Etudes\SUPSI\MAIND-S2\portfolio_slam\figma_make-portfolio`. Migration follows 6 phases: setup/audit → tokens & chrome → simple pages → complex pages → image strategy → production readiness. See `MIGRATION_INVENTORY.md` in the prototype directory for the audit output.