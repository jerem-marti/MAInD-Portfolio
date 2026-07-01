import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-05-30',
  devtools: { enabled: true },

  modules: [
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxtjs/i18n', // before @nuxtjs/seo so sitemap/og/hreflang pick up the locales
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
      // i18n localizes every route, including the sitemap module's /sitemap.xml
      // redirect stub, producing a junk /fr/sitemap.xml SPA page. The real
      // per-locale sitemaps live at /sitemap_index.xml → /__sitemap__/{en,fr}.xml,
      // so drop the localized redirect.
      ignore: ['/fr/sitemap.xml'],
    },
  },

  // @nuxtjs/seo foundation
  site: {
    url: 'https://jeremymartin.ch',
    name: 'Jérémy Martin — Interaction Designer',
    defaultLocale: 'en',
  },

  // English stays unprefixed at `/`; French lives under `/fr` with French URL
  // segments (/fr/a-propos, /fr/projets/<slug>). `language: 'en' | 'fr'` keeps
  // <html lang> as plain `en`/`fr` (so the EN tree is byte-for-byte unchanged).
  // SSG specifics: detectBrowserLanguage is off (an nginx rule on `/` owns the
  // root Accept-Language redirect); strictSeo lets i18n own hreflang/x-default/
  // canonical/og:locale prerender-safely; prerenderMessages ships the lazy
  // catalogs as static assets instead of a Nitro route that won't exist on a
  // static host.
  i18n: {
    baseUrl: 'https://jeremymartin.ch',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    customRoutes: 'config',
    pages: {
      about: { fr: '/a-propos' },
      'work/[slug]': { fr: '/projets/[slug]' },
    },
    locales: [
      { code: 'en', language: 'en', name: 'English', file: 'en.json' },
      { code: 'fr', language: 'fr', name: 'Français', file: 'fr.json' },
    ],
    lazy: true,
    detectBrowserLanguage: false,
    experimental: {
      strictSeo: true,
      prerenderMessages: true,
    },
  },

  // OG image generation via Satori (installed as a peer dep). Renders one 1200×630
  // PNG per page at build time into .output/public/_og/, so the static host serves
  // them with no runtime image service. The brand card lives in
  // app/components/OgImage/NuxtSeo.satori.vue; title/description are passed per page
  // via defineOgImage (see layouts/default.vue and pages/work/[slug].vue). Geist is
  // registered for Satori here — without it the card falls back to Inter.
  ogImage: {
    zeroRuntime: true,
    defaults: {
      component: 'NuxtSeo',
      width: 1200,
      height: 630,
    },
    fonts: ['Geist:400', 'Geist:500', 'Geist Mono:400'],
  },

  // Fade page transition (~200ms); fade CSS + reduced-motion guard live in main.css.
  // Page titles are just the context (e.g. "About"); @nuxtjs/seo's seo-utils
  // appends the site name automatically ("About | Jérémy Martin — Interaction
  // Designer"). The home page sets no title so the suffix renders alone — no
  // duplication.
  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
    // Favicon set (assets in public/). The brand mark: signal-yellow square on
    // the ink tile (see public/favicon.svg). SVG is the modern primary; the .ico
    // covers legacy browsers + the bare /favicon.ico request; apple-touch-icon
    // (180, full-bleed — iOS rounds it) is for the iOS home screen.
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        // Mobile browsers tint their UI (e.g. Chrome's address bar) to this color.
        // #f4f5f7 = --brand-bg, matching the body + MobileTop header, so the bar
        // blends into the page. No prefers-color-scheme variant — the site is light-only.
        { name: 'theme-color', content: '#f4f5f7' },
        // The site is light-only: declare it so form controls, scrollbars, and
        // default backgrounds stay light on dark-mode devices (no auto-darkening).
        { name: 'color-scheme', content: 'light' },
      ],
    },
  },

  // Self-hosted Geist Sans + Geist Mono. @nuxt/fonts downloads at build time and
  // generates @font-face rules; explicit `families` makes the provider deterministic.
  fonts: {
    families: [
      { name: 'Geist', provider: 'google', weights: [400, 500] },
      { name: 'Geist Mono', provider: 'google', weights: [400] },
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
    // The llms artifacts (registered in modules/llms.ts) are prerendered text
    // files, not human-facing pages — keep them out of the sitemap (both locales).
    exclude: [
      '/llms.txt', '/llms-full.txt', '/*.md', '/work/*.md',
      '/fr/llms.txt', '/fr/llms-full.txt', '/fr/*.md', '/fr/projets/*.md',
    ],
  },

  typescript: {
    strict: true,
  },
})
