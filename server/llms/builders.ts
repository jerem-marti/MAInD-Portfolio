// Build-time string builders for the site's llms.txt artifacts.
//
// The `work` content collection (frontmatter — see content.config.ts) is the
// single source of truth for the case studies; the featured/index ordering comes
// from app/data. These pure functions turn that data into:
//   - /llms.txt        a curated link index (buildLlmsIndex)
//   - /llms-full.txt   the whole portfolio in one file (buildLlmsFull)
//   - /work/<slug>.md  a clean markdown twin per study (studyToMarkdown)
//   - /index.md /about.md /contact.md  twins of the three app pages, authored
//                       here because their content lives in .vue, not frontmatter.
//
// i18n: every function takes a `locale`. English literals below are the source of
// truth and the default; for French, fr.json overrides them — display strings via
// the `data.*` / `tags.*` catalog keys (D), all other prose via the `llms.*`
// namespace (L). Until those French strings exist (Phase 5), French output falls
// back to the English defaults, so locale='en' is byte-for-byte unchanged.
//
// Consumed by server/llms/handler.ts; routes are registered in modules/llms.ts.
// Voice rules (CLAUDE.md): US spelling, Swiss `1'000`, no em-dashes in body prose
// (they are fine in titles/meta). Study prose is reproduced verbatim from the
// frontmatter, so its own punctuation is preserved as authored.

import { featured } from '../../app/data/featured'
import { projects } from '../../app/data/projects'
import { workChain } from '../../app/data/workChain'
import enMessages from '../../i18n/locales/en.json'
import frMessages from '../../i18n/locales/fr.json'

export const SITE_URL = 'https://jeremymartin.ch'

export type Locale = 'en' | 'fr'

const EN = enMessages as Record<string, unknown>
const FR = frMessages as Record<string, unknown>
const pathGet = (obj: unknown, key: string): unknown =>
  key.split('.').reduce<unknown>((o, k) => (o == null ? o : (o as Record<string, unknown>)[k]), obj)

/** Localized llms prose: English `def` is the source of truth; fr.json `llms.<key>` overrides it. */
function L(locale: Locale, key: string, def: string): string {
  if (locale === 'fr') {
    const v = pathGet(FR, `llms.${key}`)
    if (typeof v === 'string' && v) return v
  }
  return def
}

/** Localized featured/Index display string from the shared catalog (the single
 * source of truth): fr.json `data.*`/`tags.*` for French, en.json for English. */
function D(locale: Locale, key: string): string {
  if (locale === 'fr') {
    const v = pathGet(FR, key)
    if (typeof v === 'string' && v) return v
  }
  const e = pathGet(EN, key)
  return typeof e === 'string' ? e : ''
}

/** The subset of the `work` collection frontmatter these builders consume. */
export interface WorkDoc {
  path: string
  title: string
  summary: string
  status: 'live' | 'in-progress'
  brief?: { role: string, year: string, host: string, scope: string, shipped: string }
  problem?: string[]
  role?: { led: string[], contributed: string[], notTouched: string[], team: string }
  approach?: Array<{
    label: string
    title: string
    prose: string[]
    artifacts?: Array<{ src?: string, alt: string, caption: string, decision: string, width: string }>
  }>
  outcome?: string[]
  reflection?: string
  gallery?: Array<{ src?: string, alt: string, caption: string }>
  resources?: Array<
    | { type: 'pdf' | 'github' | 'demo' | 'web', title: string, url: string }
    | { type: 'video', title: string, poster: string, src?: string, provider?: 'youtube' | 'vimeo', id?: string }
  >
}

// ── helpers ──────────────────────────────────────────────────────────────────

const slugOf = (d: WorkDoc): string => d.path.split('/').pop() ?? ''

/** Slug from an Index row href, or null if the row is not an internal /work link. */
const workSlug = (href?: string): string | null => href?.match(/^\/work\/([^/]+)$/)?.[1] ?? null

/** Absolutize an internal path; leave full URLs untouched. */
const abs = (url: string): string =>
  /^https?:\/\//.test(url) ? url : `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`

/** First sentence of a summary, for the terse notes in the link index. */
const firstSentence = (s: string): string => (s.match(/^[\s\S]*?[.!?](?=\s|$)/)?.[0] ?? s).trim()

// Locale-aware artifact paths. French twins live under the French URL segments
// (/fr/index.md, /fr/a-propos.md, /fr/projets/<slug>.md), mirroring the page routes.
const pageMdPath = (locale: Locale, page: 'home' | 'about' | 'contact'): string => {
  if (locale === 'fr') return page === 'home' ? '/fr/index.md' : page === 'about' ? '/fr/a-propos.md' : '/fr/contact.md'
  return page === 'home' ? '/index.md' : `/${page}.md`
}
const studyMdPath = (locale: Locale, slug: string): string =>
  locale === 'fr' ? `/fr/projets/${slug}.md` : `/work/${slug}.md`
const llmsTxtPath = (locale: Locale, file: 'llms.txt' | 'llms-full.txt'): string =>
  locale === 'fr' ? `/fr/${file}` : `/${file}`

const resourceTypeLabel = (type: string, locale: Locale): string =>
  (({
    pdf: L(locale, 'res.pdf', 'PDF'),
    github: L(locale, 'res.github', 'GitHub'),
    demo: L(locale, 'res.demo', 'Live demo'),
    web: L(locale, 'res.web', 'Web'),
    video: L(locale, 'res.video', 'Video'),
  } as Record<string, string>)[type] ?? type)

function resourceBullet(r: NonNullable<WorkDoc['resources']>[number], locale: Locale): string {
  if (r.type === 'video') {
    const href = r.src
      ? abs(r.src)
      : r.provider === 'vimeo'
        ? `https://vimeo.com/${r.id}`
        : `https://www.youtube.com/watch?v=${r.id}`
    return `- [${r.title}](${href}): ${L(locale, 'res.video', 'Video')}`
  }
  return `- [${r.title}](${abs(r.url)}): ${resourceTypeLabel(r.type, locale)}`
}

// ── per-study markdown twin ──────────────────────────────────────────────────

/** Clean markdown twin of a single case study, faithful to what /work/<slug> shows. */
export function studyToMarkdown(doc: WorkDoc, locale: Locale = 'en'): string {
  const b: string[] = [`# ${doc.title}`, `> ${doc.summary}`]

  if (doc.brief) {
    b.push([
      `- **${L(locale, 'study.briefRole', 'Role')}:** ${doc.brief.role}`,
      `- **${L(locale, 'study.briefYear', 'Year')}:** ${doc.brief.year}`,
      `- **${L(locale, 'study.briefHost', 'Host')}:** ${doc.brief.host}`,
      `- **${L(locale, 'study.briefScope', 'Scope')}:** ${doc.brief.scope}`,
      `- **${L(locale, 'study.briefShipped', 'Shipped')}:** ${doc.brief.shipped}`,
    ].join('\n'))
  }

  if (doc.problem?.length) {
    b.push(`## ${L(locale, 'study.hProblem', 'Problem')}`, doc.problem.join('\n\n'))
  }

  if (doc.role) {
    const r = doc.role
    const parts: string[] = []
    if (r.led?.length) parts.push([`**${L(locale, 'study.led', 'Led')}**`, ...r.led.map(i => `- ${i}`)].join('\n'))
    if (r.contributed?.length) parts.push([`**${L(locale, 'study.contributed', 'Contributed')}**`, ...r.contributed.map(i => `- ${i}`)].join('\n'))
    if (r.notTouched?.length) parts.push([`**${L(locale, 'study.notTouched', 'Did not touch')}**`, ...r.notTouched.map(i => `- ${i}`)].join('\n'))
    if (r.team) parts.push(`**${L(locale, 'study.team', 'Team')}:** ${r.team}`)
    b.push(`## ${L(locale, 'study.hRole', 'Role')}`, parts.join('\n\n'))
  }

  if (doc.approach?.length) {
    b.push(`## ${L(locale, 'study.hApproach', 'Approach')}`)
    for (const step of doc.approach) {
      b.push(`### ${step.label}: ${step.title}`)
      if (step.prose?.length) b.push(step.prose.join('\n\n'))
      if (step.artifacts?.length) {
        // Transcribe the visual layer: each image's caption, alt text, and the
        // "Decision ·" rationale all render on the page (WorkArtifactBlock.vue).
        b.push(step.artifacts.map(a => `- **${a.caption}** ${a.alt} _${L(locale, 'study.decision', 'Decision')} · ${a.decision}_`).join('\n'))
      }
    }
  }

  if (doc.outcome?.length) {
    b.push(`## ${L(locale, 'study.hOutcome', 'Outcome')}`, doc.outcome.join('\n\n'))
  }

  if (doc.reflection) {
    b.push(`## ${L(locale, 'study.hReflection', 'Reflection')}`, doc.reflection)
  }

  if (doc.gallery?.length) {
    b.push(`## ${L(locale, 'study.hGallery', 'Gallery')}`, doc.gallery.map(g => `- **${g.caption}** ${g.alt}`).join('\n'))
  }

  if (doc.resources?.length) {
    b.push(`## ${L(locale, 'study.hResources', 'Resources')}`, doc.resources.map(r => resourceBullet(r, locale)).join('\n'))
  }

  return `${b.join('\n\n')}\n`
}

// ── shared preamble copy ─────────────────────────────────────────────────────

const header = (locale: Locale): string => `# ${L(locale, 'header', 'Jérémy Martin — Interaction Designer')}`

const blockquote = (locale: Locale): string => `> ${L(locale, 'blockquote',
  'Portfolio of Jérémy Martin, an interaction and product designer working on '
  + 'agentic experiences (AX) designed around user intent. The site shows how he thinks: process '
  + 'is the artifact, outputs are the evidence. This file indexes the portfolio for language models.')}`

const intro = (locale: Locale): string => L(locale, 'intro',
  'Jérémy is finishing a Master of Arts in Interaction Design at SUPSI in Mendrisio, '
  + 'Switzerland, graduating 2027 and available from August 2026. His path runs from a four-year '
  + 'electronics apprenticeship (CFC) through a BSc in Media Engineering at HEIG-VD to interaction '
  + 'design, and his practice spans hardware prototyping, front-end build, and UX research. '
  + 'He works in French (native) and English (B2). Contact: hi@jeremymartin.ch.')

const corePages = (locale: Locale): string[] => [
  `- [${L(locale, 'pages.home', 'Home')}](${SITE_URL}${pageMdPath(locale, 'home')}): ${L(locale, 'pages.homeDesc', 'Point of view and the three featured case studies.')}`,
  `- [${L(locale, 'pages.about', 'About')}](${SITE_URL}${pageMdPath(locale, 'about')}): ${L(locale, 'pages.aboutDesc', 'Background, education path, and CV download.')}`,
  `- [${L(locale, 'pages.contact', 'Contact')}](${SITE_URL}${pageMdPath(locale, 'contact')}): ${L(locale, 'pages.contactDesc', 'Email, LinkedIn, and availability.')}`,
]

// Display title comes from app/data (how the site labels the work), not the page
// H1, so llms.txt matches the home Index; the note is the study's own first sentence.
const studyRow = (title: string, d: WorkDoc, locale: Locale): string =>
  `- [${title}](${SITE_URL}${studyMdPath(locale, slugOf(d))}): ${firstSentence(d.summary)}`

// ── /llms.txt — curated link index ───────────────────────────────────────────

export function buildLlmsIndex(docs: WorkDoc[], locale: Locale = 'en'): string {
  const bySlug = new Map(docs.map(d => [slugOf(d), d]))
  const featuredSlugs = new Set(featured.map(f => f.slug))

  const featuredRows = featured
    .map((f) => {
      const d = bySlug.get(f.slug)
      return d ? studyRow(D(locale, `data.featured.${f.slug}.title`), d, locale) : null
    })
    .filter((row): row is string => !!row)

  const optionalRows = projects
    .map((p) => {
      const s = workSlug(p.href)
      if (!s || featuredSlugs.has(s)) return null
      const d = bySlug.get(s)
      return d ? studyRow(D(locale, `data.projects.${s}.title`), d, locale) : null
    })
    .filter((row): row is string => !!row)

  return `${[
    header(locale),
    blockquote(locale),
    intro(locale),
    `## ${L(locale, 'sec.corePages', 'Core pages')}\n${corePages(locale).join('\n')}`,
    `## ${L(locale, 'sec.featured', 'Featured case studies')}\n${featuredRows.join('\n')}`,
    `## ${L(locale, 'sec.optional', 'Optional')}\n${optionalRows.join('\n')}`,
  ].join('\n\n')}\n`
}

// ── /llms-full.txt — the whole portfolio in one file ─────────────────────────

const fullNote = (locale: Locale): string => L(locale, 'fullNote',
  'This file is the full text of the portfolio for language models: the home, '
  + 'about, and contact pages, followed by every case study in full. For a shorter map with links, '
  + `see ${SITE_URL}${llmsTxtPath(locale, 'llms.txt')}.`)

export function buildLlmsFull(docs: WorkDoc[], locale: Locale = 'en'): string {
  const bySlug = new Map(docs.map(d => [slugOf(d), d]))
  const chain = workChain as readonly string[]

  // Studies in navigation-ring order (featured first, then the index), with any
  // live study not on the ring appended so nothing is silently dropped.
  const ordered = chain.map(s => bySlug.get(s)).filter((d): d is WorkDoc => !!d)
  const offChain = docs.filter(d => !chain.includes(slugOf(d)))
  const studies = [...ordered, ...offChain].map(d => studyToMarkdown(d, locale))

  const preamble = [header(locale), blockquote(locale), intro(locale), fullNote(locale)].join('\n\n')
  const pages = [homeMarkdown(locale), aboutMarkdown(locale), contactMarkdown(locale), ...studies]
  return `${[preamble, ...pages].join('\n\n---\n\n')}\n`
}

// ── app-page twins (content lives in .vue, so authored here) ──────────────────

export function homeMarkdown(locale: Locale = 'en'): string {
  const work = featured
    .map(f => `- **${D(locale, `data.featured.${f.slug}.title`)}.** ${L(locale, 'home.problemLabel', 'Problem')}: ${D(locale, `data.featured.${f.slug}.problem`)} ${L(locale, 'home.outcomeLabel', 'Outcome')}: ${D(locale, `data.featured.${f.slug}.outcome`)}`)
    .join('\n')
  const index = projects
    .map((p) => {
      const s = workSlug(p.href)
      const title = s ? D(locale, `data.projects.${s}.title`) : ''
      const tags = p.tags.map(tg => D(locale, `tags.${tg}`)).join(' / ')
      return `- **${title}** (${p.year}) · ${tags}`
    })
    .join('\n')

  return `${[
    `# ${L(locale, 'home.title', 'Process is the artifact.')}`,
    `> ${L(locale, 'home.blockquote', `Interaction and product designer, currently working on agentic experiences (AX) designed around human intent and its consequences. Master's student at SUPSI Mendrisio, available from August 2026.`)}`,
    `## ${L(locale, 'home.hApproach', 'Approach')}`,
    L(locale, 'home.approach', `AI made design generation cheap. Judging whether it is any good did not. What changed is the tool, not the discipline. The work is centered on agentic experiences (AX): designed around human intent, prompts grounded as design decisions, outputs evaluated against the people who use them.`),
    `## ${L(locale, 'home.hSelectedWork', 'Selected work')}`,
    work,
    `## ${L(locale, 'home.hIndex', 'Index')}`,
    L(locale, 'home.indexNote', 'More work from the Master and Bachelor studies, beyond the three featured above.'),
    index,
    `## ${L(locale, 'home.hAbout', 'About')}`,
    L(locale, 'home.about', `Jérémy's current focus is agentic experiences (AX), designed around user intent. His practice spans hardware prototyping, front-end build, and UX research. Based in Mendrisio and Noréaz, Switzerland.`),
    `## ${L(locale, 'home.hContact', 'Contact')}`,
    L(locale, 'home.contact', 'Available for internships from August 2026. Email hi@jeremymartin.ch. LinkedIn jermarti. Replies in French or English, usually within a few working days.'),
  ].join('\n\n')}\n`
}

export function aboutMarkdown(locale: Locale = 'en'): string {
  const facts: Array<[string, string]> = [
    [L(locale, 'about.fCurrentlyK', 'Currently'), L(locale, 'about.fCurrentlyV', 'Master in Interaction Design, SUPSI Mendrisio · graduating 2027')],
    [L(locale, 'about.fPreviouslyK', 'Previously'), L(locale, 'about.fPreviouslyV', 'BSc Media Engineering, HEIG-VD · one semester Microengineering, EPFL · CMS preparatory bridge year, EPFL · CFC Electronics, HEIA-FR')],
    [L(locale, 'about.fLanguagesK', 'Languages'), L(locale, 'about.fLanguagesV', 'French (native) · English (B2)')],
    [L(locale, 'about.fBasedK', 'Based'), L(locale, 'about.fBasedV', 'Mendrisio and Noréaz, Switzerland')],
    [L(locale, 'about.fAvailableK', 'Available'), L(locale, 'about.fAvailableV', 'From August 2026')],
    [L(locale, 'about.fFestivalK', 'Festival'), L(locale, 'about.fFestivalV', `Baleinev: programmer (2023), head of comms (2024), president (2025). Committee ~25, ~1'000 attendees.`)],
  ]

  return `${[
    `# ${L(locale, 'about.title', 'About')}`,
    `> ${L(locale, 'about.blockquote', `I'm Jérémy Martin, an interaction and product designer currently working on agentic experiences (AX) designed around human intent and its consequences. I'm finishing a Master's in Interaction Design at SUPSI in Mendrisio, with a background in electronics and media engineering.`)}`,
    `## ${L(locale, 'about.hStory', 'How I got here')}`,
    L(locale, 'about.story1', `Take agentic experiences: the hard part there isn't generation. Generation became cheap; knowing whether what you generated is any good did not. The prompt itself isn't free either: it deserves the same grounding as any other design decision.`),
    L(locale, 'about.story2', `I'm finishing a master of arts in Interaction Design at SUPSI in Mendrisio. It's a practice-driven program: each course is a real project, taught by people working in their field. It has expanded the way I think and given me two areas I now build around: physical prototyping, and designing for agentic experiences.`),
    L(locale, 'about.story3', `Before SUPSI I completed a BSc in Media Engineering at HEIG-VD. The curriculum gave me a 360° view on digital projects, and the craft skills I still rely on: UX/UI design, front-end and back-end web development, digital marketing, project management.`),
    L(locale, 'about.story4', `Before HEIG-VD I spent one semester at EPFL in Microengineering. I left because the fit was wrong for what I was trying to become, and staying would have been more comfortable than honest. I reached that EPFL semester via CMS, EPFL's demanding bridge year for students with a maturité professionnelle rather than the gymnasiale that EPFL normally requires.`),
    L(locale, 'about.story5', `Underneath all of this is a four-year electronics apprenticeship (CFC) at HEIA-FR that I rarely mention up front and quietly rely on every day.`),
    L(locale, 'about.story6', `What I'm building toward is a design practice that takes AI as material, not as marketing. That means experiences shaped around user intent, prompts grounded like any other design decision, and aesthetics earned rather than applied at the end.`),
    `## ${L(locale, 'about.hField', 'Field experience')}`,
    `**${L(locale, 'about.thesisLabel', 'Bachelor thesis (2024 — 2025)')}.** ${L(locale, 'about.thesis', `For my Bachelor thesis at HEIG-VD I designed DataBloom, a tangible interface that makes the energy impact of digital usage perceptible at home. A flower whose stem wilts as the household's weekly data consumption grows, and whose center lights up to signal the live data rate. Built at the Media Engineering Institute on simulated data from CarbonViz Home, and published on the MEI research blog.`)}`,
    `**${L(locale, 'about.festivalLabel', 'Festival (2023 — 2025)')}.** ${L(locale, 'about.festival', `Three years on the organizing committee of Baleinev, a student-run music festival of around 1'000 attendees: programmer in 2023, head of communications in 2024, then president in 2025 (committee of about 25).`)}`,
    `## ${L(locale, 'about.hThinking', 'What I am thinking about')}`,
    L(locale, 'about.thinking', `How to keep designing for the user when the technological possibilities won't stop changing. AI doesn't change the discipline, but it makes it tempting to start with the tool instead of the user's intent. So my current question is the inverse: how do we anchor design around intent first, and only then bring AI generation in?`),
    `## ${L(locale, 'about.hFacts', 'Facts')}`,
    facts.map(([k, v]) => `- **${k}:** ${v}`).join('\n'),
    `## ${L(locale, 'about.hDownloads', 'Downloads')}`,
    `- [${L(locale, 'about.cvLabel', 'Download CV (English)')}](${SITE_URL}/jeremy-martin-cv-en.pdf): ${L(locale, 'about.cvNote', 'PDF. A French CV ships later.')}`,
  ].join('\n\n')}\n`
}

export function contactMarkdown(locale: Locale = 'en'): string {
  const essentials = [
    `- ${L(locale, 'contact.email', 'Email')}: [hi@jeremymartin.ch](mailto:hi@jeremymartin.ch)`,
    `- ${L(locale, 'contact.available', 'Available for internships from August 2026.')}`,
    `- ${L(locale, 'contact.replies', 'Replies in French or English, usually within a few working days.')}`,
    `- ${L(locale, 'contact.linkedin', 'LinkedIn')}: [jermarti](https://www.linkedin.com/in/jermarti)`,
    `- ${L(locale, 'contact.based', 'Based in Mendrisio and Noréaz, Switzerland.')}`,
  ].join('\n')

  return `${[
    `# ${L(locale, 'contact.title', 'Write to me.')}`,
    `> ${L(locale, 'contact.blockquote', 'Reach Jérémy Martin at hi@jeremymartin.ch. Available for internships from August 2026, based in Mendrisio and Noréaz.')}`,
    `## ${L(locale, 'contact.hEssentials', 'The essentials')}`,
    essentials,
  ].join('\n\n')}\n`
}
