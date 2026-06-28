<script setup lang="ts">
const { t, locale } = useI18n()

// Site-wide schema.org graph — every page picks this up via the default layout
// (error.vue wraps in <NuxtLayout> too, so it gets the same). inLanguage tracks
// the active locale so /fr pages advertise French.
useSchemaOrg([
  defineWebSite({
    name: t('schema.websiteName'),
    url: 'https://jeremymartin.ch',
    inLanguage: locale.value,
  }),
  definePerson({
    name: 'Jérémy Martin',
    jobTitle: t('schema.jobTitle'),
    email: 'mailto:hi@jeremymartin.ch',
    url: 'https://jeremymartin.ch',
    sameAs: ['https://www.linkedin.com/in/jermarti', 'https://github.com/jerem-marti'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mendrisio',
      addressCountry: 'CH',
    },
  }),
])

// Site-default OG card (brand template in components/OgImage/NuxtSeo.satori.vue).
// This is the fallback for pages that don't set their own — home, about, contact,
// error. Content pages override it: pages/work/[slug].vue passes the study title +
// summary. Title/description/footer are passed explicitly and localized; nuxt-og-image
// does not infer them into the prerendered image under zeroRuntime.
defineOgImage('NuxtSeo', {
  title: t('og.defaultTitle'),
  description: t('og.defaultDescription'),
  footer: t('og.footer'),
})
</script>

<template>
  <div class="min-h-dvh flex flex-col">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-brand-surface focus:text-brand-ink focus:px-3 focus:py-2 focus:font-mono focus:uppercase focus:tracking-[0.08em] focus:text-[11px]"
    >
      {{ t('skipToContent') }}
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
