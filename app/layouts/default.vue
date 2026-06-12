<script setup lang="ts">
// Site-wide schema.org graph — every page picks this up via the default layout
// (error.vue wraps in <NuxtLayout> too, so it gets the same).
useSchemaOrg([
  defineWebSite({
    name: 'Jérémy Martin, Interaction and Product Designer',
    url: 'https://jeremymartin.ch',
    inLanguage: 'en',
  }),
  definePerson({
    name: 'Jérémy Martin',
    jobTitle: 'Interaction and Product Designer',
    email: 'mailto:hi@jeremymartin.ch',
    url: 'https://jeremymartin.ch',
    sameAs: ['https://www.linkedin.com/in/jermarti'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mendrisio',
      addressCountry: 'CH',
    },
  }),
])

// Auto-generated OG image per page. NuxtSeo template pulls title + description
// from useHead, so each route gets a unique 1200×600 PNG at build time. Theme
// keyed to the brand-accent yellow; siteName replaces the default tag.
defineOgImage('NuxtSeo', {
  theme: '#f5d547',
  colorMode: 'light',
  siteName: 'jeremymartin.ch',
})
</script>

<template>
  <div class="min-h-dvh flex flex-col">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-brand-surface focus:text-brand-ink focus:px-3 focus:py-2 focus:font-mono focus:uppercase focus:tracking-[0.08em] focus:text-[11px]"
    >
      Skip to content
    </a>
    <ChromeTopNav />
    <ChromeMobileTop />
    <main id="main" class="flex-1">
      <slot />
    </main>
    <ChromeFooter />
    <ChromeBottomNav />
  </div>
</template>
