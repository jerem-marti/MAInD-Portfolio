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
    const workDir = join(nuxt.options.rootDir, 'content', 'en', 'work')
    const slugs = readdirSync(workDir)
      .filter(f => f.endsWith('.md'))
      .filter(f => /status:\s*["']?live["']?/.test(readFileSync(join(workDir, f), 'utf8')))
      .map(f => f.slice(0, -3))
      .sort()

    // English llms artifacts. The single handler dispatches by path.
    const enArtifactRoutes = [
      '/llms.txt',
      '/llms-full.txt',
      '/index.md',
      '/about.md',
      '/contact.md',
      ...slugs.map(s => `/work/${s}.md`),
    ]

    // French llms artifacts, mirrored under the French URL segments (the handler
    // strips /fr and resolves the French content, falling back to English twins).
    const frArtifactRoutes = [
      '/fr/llms.txt',
      '/fr/llms-full.txt',
      '/fr/index.md',
      '/fr/a-propos.md',
      '/fr/contact.md',
      ...slugs.map(s => `/fr/projets/${s}.md`),
    ]

    const artifactRoutes = [...enArtifactRoutes, ...frArtifactRoutes]
    for (const route of artifactRoutes) {
      addServerHandler({ route, handler })
    }

    // French page routes. `prefix_except_default` + crawlLinks only discovers a
    // locale's pages through localized links; enumerating them here guarantees
    // the whole /fr tree prerenders even if a link is missed. Paths must match
    // the i18n custom-route map in nuxt.config (a-propos, projets/<slug>).
    const frPageRoutes = [
      '/fr',
      '/fr/a-propos',
      '/fr/contact',
      ...slugs.map(s => `/fr/projets/${s}`),
    ]

    nuxt.options.nitro ||= {}
    nuxt.options.nitro.prerender ||= {}
    nuxt.options.nitro.prerender.routes ||= []
    nuxt.options.nitro.prerender.routes.push(...artifactRoutes, ...frPageRoutes)
  },
})
