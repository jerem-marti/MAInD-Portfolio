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
// Consumed by server/llms/handler.ts; routes are registered in modules/llms.ts.
// Voice rules (CLAUDE.md): US spelling, Swiss `1'000`, no em-dashes in body prose
// (they are fine in titles/meta). Study prose is reproduced verbatim from the
// frontmatter, so its own punctuation is preserved as authored.

import { featured } from '../../app/data/featured'
import { projects } from '../../app/data/projects'
import { workChain } from '../../app/data/workChain'

export const SITE_URL = 'https://jeremymartin.ch'

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

const resourceTypeLabel = (type: string): string =>
  ({ pdf: 'PDF', github: 'GitHub', demo: 'Live demo', web: 'Web', video: 'Video' }[type] ?? type)

function resourceBullet(r: NonNullable<WorkDoc['resources']>[number]): string {
  if (r.type === 'video') {
    const href = r.src
      ? abs(r.src)
      : r.provider === 'vimeo'
        ? `https://vimeo.com/${r.id}`
        : `https://www.youtube.com/watch?v=${r.id}`
    return `- [${r.title}](${href}): Video`
  }
  return `- [${r.title}](${abs(r.url)}): ${resourceTypeLabel(r.type)}`
}

// ── per-study markdown twin ──────────────────────────────────────────────────

/** Clean markdown twin of a single case study, faithful to what /work/<slug> shows. */
export function studyToMarkdown(doc: WorkDoc): string {
  const b: string[] = [`# ${doc.title}`, `> ${doc.summary}`]

  if (doc.brief) {
    b.push([
      `- **Role:** ${doc.brief.role}`,
      `- **Year:** ${doc.brief.year}`,
      `- **Host:** ${doc.brief.host}`,
      `- **Scope:** ${doc.brief.scope}`,
      `- **Shipped:** ${doc.brief.shipped}`,
    ].join('\n'))
  }

  if (doc.problem?.length) {
    b.push('## Problem', doc.problem.join('\n\n'))
  }

  if (doc.role) {
    const r = doc.role
    const parts: string[] = []
    if (r.led?.length) parts.push(['**Led**', ...r.led.map(i => `- ${i}`)].join('\n'))
    if (r.contributed?.length) parts.push(['**Contributed**', ...r.contributed.map(i => `- ${i}`)].join('\n'))
    if (r.notTouched?.length) parts.push(['**Did not touch**', ...r.notTouched.map(i => `- ${i}`)].join('\n'))
    if (r.team) parts.push(`**Team:** ${r.team}`)
    b.push('## Role', parts.join('\n\n'))
  }

  if (doc.approach?.length) {
    b.push('## Approach')
    for (const step of doc.approach) {
      b.push(`### ${step.label}: ${step.title}`)
      if (step.prose?.length) b.push(step.prose.join('\n\n'))
      if (step.artifacts?.length) {
        // Transcribe the visual layer: each image's caption, alt text, and the
        // "Decision ·" rationale all render on the page (WorkArtifactBlock.vue).
        b.push(step.artifacts.map(a => `- **${a.caption}** ${a.alt} _Decision · ${a.decision}_`).join('\n'))
      }
    }
  }

  if (doc.outcome?.length) {
    b.push('## Outcome', doc.outcome.join('\n\n'))
  }

  if (doc.reflection) {
    b.push('## Reflection', doc.reflection)
  }

  if (doc.gallery?.length) {
    b.push('## Gallery', doc.gallery.map(g => `- **${g.caption}** ${g.alt}`).join('\n'))
  }

  if (doc.resources?.length) {
    b.push('## Resources', doc.resources.map(resourceBullet).join('\n'))
  }

  return `${b.join('\n\n')}\n`
}

// ── shared preamble copy ─────────────────────────────────────────────────────

const HEADER = '# Jérémy Martin — Interaction Designer'

const BLOCKQUOTE = '> Portfolio of Jérémy Martin, an interaction and product designer working on '
  + 'agentic experiences (AX) designed around user intent. The site shows how he thinks: process '
  + 'is the artifact, outputs are the evidence. This file indexes the portfolio for language models.'

const INTRO = 'Jérémy is finishing a Master of Arts in Interaction Design at SUPSI in Mendrisio, '
  + 'Switzerland, graduating 2027 and available from August 2026. His path runs from a four-year '
  + 'electronics apprenticeship (CFC) through a BSc in Media Engineering at HEIG-VD to interaction '
  + 'design, and his practice spans hardware prototyping, front-end build, UX research, and service '
  + 'design. He works in French (native) and English (B2). Contact: hi@jeremymartin.ch.'

const CORE_PAGES = [
  `- [Home](${SITE_URL}/index.md): Point of view and the three featured case studies.`,
  `- [About](${SITE_URL}/about.md): Background, education path, and CV download.`,
  `- [Contact](${SITE_URL}/contact.md): Email, LinkedIn, and availability.`,
]

// Display title comes from app/data (how the site labels the work), not the page
// H1, so llms.txt matches the home Index; the note is the study's own first sentence.
const studyRow = (title: string, d: WorkDoc): string =>
  `- [${title}](${SITE_URL}/work/${slugOf(d)}.md): ${firstSentence(d.summary)}`

// ── /llms.txt — curated link index ───────────────────────────────────────────

export function buildLlmsIndex(docs: WorkDoc[]): string {
  const bySlug = new Map(docs.map(d => [slugOf(d), d]))
  const featuredSlugs = new Set(featured.map(f => f.slug))

  const featuredRows = featured
    .map((f) => {
      const d = bySlug.get(f.slug)
      return d ? studyRow(f.title, d) : null
    })
    .filter((row): row is string => !!row)

  const optionalRows = projects
    .map((p) => {
      const s = workSlug(p.href)
      if (!s || featuredSlugs.has(s)) return null
      const d = bySlug.get(s)
      return d ? studyRow(p.title, d) : null
    })
    .filter((row): row is string => !!row)

  return `${[
    HEADER,
    BLOCKQUOTE,
    INTRO,
    `## Core pages\n${CORE_PAGES.join('\n')}`,
    `## Featured case studies\n${featuredRows.join('\n')}`,
    `## Optional\n${optionalRows.join('\n')}`,
  ].join('\n\n')}\n`
}

// ── /llms-full.txt — the whole portfolio in one file ─────────────────────────

const FULL_NOTE = 'This file is the full text of the portfolio for language models: the home, '
  + 'about, and contact pages, followed by every case study in full. For a shorter map with links, '
  + `see ${SITE_URL}/llms.txt.`

export function buildLlmsFull(docs: WorkDoc[]): string {
  const bySlug = new Map(docs.map(d => [slugOf(d), d]))
  const chain = workChain as readonly string[]

  // Studies in navigation-ring order (featured first, then the index), with any
  // live study not on the ring appended so nothing is silently dropped.
  const ordered = chain.map(s => bySlug.get(s)).filter((d): d is WorkDoc => !!d)
  const offChain = docs.filter(d => !chain.includes(slugOf(d)))
  const studies = [...ordered, ...offChain].map(studyToMarkdown)

  const preamble = [HEADER, BLOCKQUOTE, INTRO, FULL_NOTE].join('\n\n')
  const pages = [homeMarkdown(), aboutMarkdown(), contactMarkdown(), ...studies]
  return `${[preamble, ...pages].join('\n\n---\n\n')}\n`
}

// ── app-page twins (content lives in .vue, so authored here) ──────────────────

export function homeMarkdown(): string {
  const work = featured
    .map(f => `- **${f.title}.** Problem: ${f.problem} Outcome: ${f.outcome}`)
    .join('\n')
  const index = projects
    .map(p => `- **${p.title}** (${p.year}) · ${p.tags.join(' / ')}`)
    .join('\n')

  return `${[
    '# Process is the artifact.',
    `> Interaction and product designer, currently working on agentic experiences (AX) designed around human intent and its consequences. Master's student at SUPSI Mendrisio, available from August 2026.`,
    '## Approach',
    `AI made design generation cheap. Judging whether it is any good did not. What changed is the tool, not the discipline. The work is centered on agentic experiences (AX): designed around human intent, prompts grounded as design decisions, outputs evaluated against the people who use them.`,
    '## Selected work',
    work,
    '## Index',
    'More work from the Master and Bachelor studies, beyond the three featured above.',
    index,
    '## About',
    `Jérémy's current focus is agentic experiences (AX), designed around user intent. His practice spans hardware prototyping, front-end build, UX research, and service design. Based in Mendrisio, Switzerland.`,
    '## Contact',
    'Available for internships from August 2026. Email hi@jeremymartin.ch. LinkedIn jermarti. Replies in French or English, usually within a few working days.',
  ].join('\n\n')}\n`
}

export function aboutMarkdown(): string {
  const facts = [
    ['Currently', 'Master in Interaction Design, SUPSI Mendrisio · graduating 2027'],
    ['Previously', 'BSc Media Engineering, HEIG-VD · one semester Microengineering, EPFL · CMS preparatory bridge year, EPFL · CFC Electronics, HEIA-FR'],
    ['Languages', 'French (native) · English (B2)'],
    ['Based', 'Mendrisio, Switzerland'],
    ['Available', 'From August 2026'],
    ['Festival', `Baleinev: programmer (2023), head of comms (2024), president (2025). Committee ~25, ~1'000 attendees.`],
  ]

  return `${[
    '# About',
    `> I'm Jérémy Martin, an interaction and product designer currently working on agentic experiences (AX) designed around human intent and its consequences. I'm finishing a Master's in Interaction Design at SUPSI in Mendrisio, with a background in electronics and media engineering.`,
    '## How I got here',
    `Take agentic experiences: the hard part there isn't generation. Generation became cheap; knowing whether what you generated is any good did not. The prompt itself isn't free either: it deserves the same grounding as any other design decision.`,
    `I'm finishing a master of arts in Interaction Design at SUPSI in Mendrisio. It's a practice-driven program: each course is a real project, taught by people working in their field. It has expanded the way I think and given me two areas I now build around: physical prototyping, and designing for agentic experiences.`,
    `Before SUPSI I completed a BSc in Media Engineering at HEIG-VD. The curriculum gave me a 360° view on digital projects, and the craft skills I still rely on: UX/UI design, front-end and back-end web development, digital marketing, project management.`,
    `Before HEIG-VD I spent one semester at EPFL in Microengineering. I left because the fit was wrong for what I was trying to become, and staying would have been more comfortable than honest. I reached that EPFL semester via CMS, EPFL's demanding bridge year for students with a maturité professionnelle rather than the gymnasiale that EPFL normally requires.`,
    `Underneath all of this is a four-year electronics apprenticeship (CFC) at HEIA-FR that I rarely mention up front and quietly rely on every day.`,
    `What I'm building toward is a design practice that takes AI as material, not as marketing. That means experiences shaped around user intent, prompts grounded like any other design decision, and aesthetics earned rather than applied at the end.`,
    '## Field experience',
    `**Bachelor thesis (2024 — 2025).** For my Bachelor thesis at HEIG-VD I designed DataBloom, a tangible interface that makes the energy impact of digital usage perceptible at home. A flower whose stem wilts as the household's weekly data consumption grows, and whose center lights up to signal the live data rate. Built at the Media Engineering Institute on simulated data from CarbonViz Home, and published on the MEI research blog.`,
    `**Festival (2023 — 2025).** Three years on the organizing committee of Baleinev, a student-run music festival of around 1'000 attendees: programmer in 2023, head of communications in 2024, then president in 2025 (committee of about 25).`,
    '## What I am thinking about',
    `How to keep designing for the user when the technological possibilities won't stop changing. AI doesn't change the discipline, but it makes it tempting to start with the tool instead of the user's intent. So my current question is the inverse: how do we anchor design around intent first, and only then bring AI generation in?`,
    '## Facts',
    facts.map(([k, v]) => `- **${k}:** ${v}`).join('\n'),
    '## Downloads',
    `- [Download CV (English)](${SITE_URL}/jeremy-martin-cv-en.pdf): PDF. A French CV ships later.`,
  ].join('\n\n')}\n`
}

export function contactMarkdown(): string {
  const essentials = [
    '- Email: [hi@jeremymartin.ch](mailto:hi@jeremymartin.ch)',
    '- Available for internships from August 2026.',
    '- Replies in French or English, usually within a few working days.',
    '- LinkedIn: [jermarti](https://www.linkedin.com/in/jermarti)',
    '- Based in Mendrisio, Switzerland.',
  ].join('\n')

  return `${[
    '# Write to me.',
    '> Reach Jérémy Martin at hi@jeremymartin.ch. Available for internships from August 2026, based in Mendrisio.',
    '## The essentials',
    essentials,
  ].join('\n\n')}\n`
}
