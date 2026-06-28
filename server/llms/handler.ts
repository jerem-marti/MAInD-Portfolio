// Single dispatching handler for every llms artifact route. Registered against
// explicit literal routes in modules/llms.ts (one per route, no params) so it can
// never shadow the real /work/<slug> pages, and prerendered to static files.
//
// Routes handled:
//   /llms.txt              curated link index
//   /llms-full.txt         whole portfolio, full text
//   /index.md /about.md /contact.md   app-page twins
//   /work/<slug>.md        per-study twin (live studies only)

import { createError, defineEventHandler, getRequestURL, setHeader } from 'h3'
import { queryCollection } from '@nuxt/content/server'
import {
  aboutMarkdown,
  buildLlmsFull,
  buildLlmsIndex,
  contactMarkdown,
  homeMarkdown,
  studyToMarkdown,
  type WorkDoc,
} from './builders'

export default defineEventHandler(async (event) => {
  const path = getRequestURL(event).pathname

  const liveDocs = async (): Promise<WorkDoc[]> =>
    (await queryCollection(event, 'work_en').where('status', '=', 'live').all()) as unknown as WorkDoc[]

  if (path === '/llms.txt') {
    setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
    return buildLlmsIndex(await liveDocs())
  }

  if (path === '/llms-full.txt') {
    setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
    return buildLlmsFull(await liveDocs())
  }

  setHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')

  if (path === '/index.md') return homeMarkdown()
  if (path === '/about.md') return aboutMarkdown()
  if (path === '/contact.md') return contactMarkdown()

  const slug = path.match(/^\/work\/([^/]+)\.md$/)?.[1]
  if (slug) {
    const doc = (await queryCollection(event, 'work_en').path(`/work/${slug}`).first()) as unknown as WorkDoc | null
    if (doc && doc.status === 'live') return studyToMarkdown(doc)
  }

  throw createError({ statusCode: 404, statusMessage: 'Not found', fatal: true })
})
