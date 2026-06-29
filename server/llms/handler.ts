// Single dispatching handler for every llms artifact route, English and French.
// Registered against explicit literal routes in modules/llms.ts (one per route,
// no params) so it can never shadow the real page routes, and prerendered to
// static files.
//
// Routes handled (mirrored under /fr with French URL segments):
//   /llms.txt              curated link index
//   /llms-full.txt         whole portfolio, full text
//   /index.md /about.md /contact.md   app-page twins
//   /work/<slug>.md        per-study twin (live studies only)
//   /fr/llms.txt … /fr/a-propos.md … /fr/projets/<slug>.md   French equivalents

import { createError, defineEventHandler, getRequestURL, setHeader } from 'h3'
import { queryCollection } from '@nuxt/content/server'
import {
  aboutMarkdown,
  buildLlmsFull,
  buildLlmsIndex,
  contactMarkdown,
  homeMarkdown,
  studyToMarkdown,
  type Locale,
  type WorkDoc,
} from './builders'

export default defineEventHandler(async (event) => {
  const path = getRequestURL(event).pathname
  const isFr = path.startsWith('/fr/')
  const locale: Locale = isFr ? 'fr' : 'en'
  // Strip the '/fr' prefix so the rest of the dispatch is locale-agnostic.
  const p = isFr ? path.slice(3) : path

  // Live docs for the active locale, falling back to the English twin per study
  // until the French frontmatter exists (Phase 5), so the French llms files
  // always render a complete portfolio.
  const liveDocs = async (): Promise<WorkDoc[]> => {
    const en = (await queryCollection(event, 'work_en').where('status', '=', 'live').all()) as unknown as WorkDoc[]
    if (locale !== 'fr') return en
    const fr = (await queryCollection(event, 'work_fr').where('status', '=', 'live').all()) as unknown as WorkDoc[]
    const byPath = new Map(fr.map(d => [d.path, d]))
    return en.map(d => byPath.get(d.path) ?? d)
  }

  if (p === '/llms.txt') {
    setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
    return buildLlmsIndex(await liveDocs(), locale)
  }

  if (p === '/llms-full.txt') {
    setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
    return buildLlmsFull(await liveDocs(), locale)
  }

  setHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')

  if (p === '/index.md') return homeMarkdown(locale)
  if (p === (isFr ? '/a-propos.md' : '/about.md')) return aboutMarkdown(locale)
  if (p === '/contact.md') return contactMarkdown(locale)

  // Per-study twin: /work/<slug>.md (en) or /projets/<slug>.md (fr, after strip).
  const slug = p.match(isFr ? /^\/projets\/([^/]+)\.md$/ : /^\/work\/([^/]+)\.md$/)?.[1]
  if (slug) {
    const col = locale === 'fr' ? 'work_fr' : 'work_en'
    let doc = (await queryCollection(event, col).path(`/work/${slug}`).first()) as unknown as WorkDoc | null
    if (!doc && locale === 'fr') {
      doc = (await queryCollection(event, 'work_en').path(`/work/${slug}`).first()) as unknown as WorkDoc | null
    }
    if (doc && doc.status === 'live') return studyToMarkdown(doc, locale)
  }

  throw createError({ statusCode: 404, statusMessage: 'Not found', fatal: true })
})
