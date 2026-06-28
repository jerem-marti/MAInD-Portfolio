// Local Nuxt module that wires up the site's llms.txt artifacts.
//
// It discovers the live case studies on disk at build time, registers one literal
// server route per artifact (all pointing at server/llms/handler.ts), and adds the
// same routes to the static prerender set so `nuxi generate` writes each one to a
// real file in .output/public. Literal routes (no params, no catch-all) guarantee
// these never shadow the real /work/<slug> page routes.
//
// New live studies are picked up automatically — add content/work/<slug>.md and
// register it in app/data (see CLAUDE.md); no change needed here.

import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { addServerHandler, createResolver, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: { name: 'portfolio-llms' },
  setup(_options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const handler = resolve('../server/llms/handler')

    // Live case-study slugs, read straight from the content files (the content DB
    // isn't available this early). Frontmatter-only files, so a cheap regex on the
    // `status:` line is enough to skip in-progress stubs.
    const workDir = join(nuxt.options.rootDir, 'content', 'work')
    const slugs = readdirSync(workDir)
      .filter(f => f.endsWith('.md'))
      .filter(f => /status:\s*["']?live["']?/.test(readFileSync(join(workDir, f), 'utf8')))
      .map(f => f.slice(0, -3))
      .sort()

    const routes = [
      '/llms.txt',
      '/llms-full.txt',
      '/index.md',
      '/about.md',
      '/contact.md',
      ...slugs.map(s => `/work/${s}.md`),
    ]

    for (const route of routes) {
      addServerHandler({ route, handler })
    }

    nuxt.options.nitro ||= {}
    nuxt.options.nitro.prerender ||= {}
    nuxt.options.nitro.prerender.routes ||= []
    nuxt.options.nitro.prerender.routes.push(...routes)
  },
})
