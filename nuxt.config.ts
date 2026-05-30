import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
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

  // OG image generation is deferred to the production-readiness phase. Disabling it
  // avoids nuxt-og-image's renderer-selection prompt, which crashes `nuxt dev` in a
  // non-interactive shell. To enable later: install a renderer (e.g. `npm i satori`),
  // then set `enabled: true`.
  ogImage: { enabled: false },

  // Fade page transition (~200ms); fade CSS + reduced-motion guard live in main.css
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

  // PDFs (CVs) are user-supplied static assets dropped into public/, not Nuxt routes.
  // Skip them in link-check so generate doesn't fail before the user uploads them.
  linkChecker: {
    excludeLinks: [
      '/jeremy-martin-cv-en.pdf',
      '/jeremy-martin-cv-fr.pdf',
    ],
  },

  typescript: {
    strict: true,
  },
})
