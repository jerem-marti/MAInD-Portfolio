import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-05-30',
  devtools: { enabled: true },

  modules: [
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxtjs/seo', // must load before @nuxt/content
    '@nuxt/content',
    '@vueuse/nuxt',
  ],

  css: ['~/assets/css/main.css'],

  // Tailwind CSS v4 via the official Vite plugin (not the @nuxtjs/tailwindcss module)
  vite: {
    plugins: [tailwindcss()],
  },

  // Static site generation
  ssr: true,
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
    },
  },

  // @nuxtjs/seo foundation
  site: {
    url: 'https://jeremymartin.ch',
    name: 'Jérémy Martin — Interaction Designer',
    defaultLocale: 'en',
  },

  // OG image generation via Satori (installed as a peer dep). Renders one PNG per
  // page from useHead title + description into .output/public/__og-image__/ at
  // build time, so the static host serves them with no runtime image service.
  ogImage: {
    zeroRuntime: true,
  },

  // Fade page transition (~200ms); fade CSS + reduced-motion guard live in main.css.
  // Page titles are just the context (e.g. "About"); @nuxtjs/seo's seo-utils
  // appends the site name automatically ("About | Jérémy Martin — Interaction
  // Designer"). The home page sets no title so the suffix renders alone — no
  // duplication.
  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
  },

  // Self-hosted Geist Sans + Geist Mono. @nuxt/fonts downloads at build time and
  // generates @font-face rules; explicit `families` makes the provider deterministic.
  fonts: {
    families: [
      { name: 'Geist', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Geist Mono', provider: 'google', weights: [400, 500] },
    ],
  },

  // Node 22.5+ present → use built-in SQLite, avoids better-sqlite3 native build on Windows
  content: {
    experimental: { sqliteConnector: 'native' },
  },

  // @nuxt/image — AVIF/WebP with JPG fallback, 1× + 2× densities. Sizes are
  // requested per-image via the `sizes` attribute on <NuxtImg> calls (see
  // components/ui/MediaPlaceholder.vue). Static IPX provider runs at build
  // time, so no runtime image service is needed.
  image: {
    format: ['avif', 'webp', 'jpg'],
    quality: 80,
    densities: [1, 2],
    screens: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },
  },

  // PDFs (CVs) are user-supplied static assets dropped into public/, not Nuxt routes.
  // Skip them in link-check so generate doesn't fail before the user uploads them.
  linkChecker: {
    excludeLinks: [
      '/jeremy-martin-cv-en.pdf',
      '/jeremy-martin-cv-fr.pdf',
      // Instagram serves a login/bot wall to crawlers (non-200), so the checker
      // can't validate it. Verified manually instead.
      'https://www.instagram.com/p/DXeyH-NGswr/',
    ],
  },

  // SSG: sitemap has no dynamic sources, so skip the runtime helper and ship a
  // smaller server bundle (also silences the build hint from prior phases).
  sitemap: {
    zeroRuntime: true,
  },

  typescript: {
    strict: true,
  },
})
