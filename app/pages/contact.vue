<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: () => t('contact.metaTitle'),
  meta: [
    { name: 'description', content: () => t('contact.metaDescription') },
  ],
})

useSchemaOrg([defineWebPage({ '@type': 'ContactPage' })])
</script>

<template>
  <div>
  <!-- Single root node (this div): the fade page transition can't bind to a multi-root
       page, which left every page blank on client-side navigation. -->
  <!-- Headline -->
  <section class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 pt-16 md:pt-28 pb-8 md:pb-12">
    <span
      class="font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink-muted mb-6 md:mb-10 block"
    >
      {{ t('contact.heroMeta') }}
    </span>
    <h1
      class="text-[44px] md:text-[88px] leading-[0.95] tracking-[-0.03em] font-medium text-brand-ink"
    >
      {{ t('contact.heroTitle') }}
    </h1>
  </section>

  <!-- Essentials -->
  <section class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 py-10 md:py-16">
    <UiSectionHead num="01" :label="t('contact.essentialsLabel')" class="mb-8 md:mb-10" />
    <div class="grid grid-cols-12 gap-x-6 gap-y-10">
      <div class="col-span-12 md:col-span-10 md:col-start-2 flex flex-col gap-10 md:gap-14">
        <a
          href="mailto:hello@jeremymartin.ch"
          class="self-start text-[clamp(34px,7vw,84px)] leading-[1] tracking-[-0.025em] font-medium text-brand-ink hover:[box-shadow:inset_0_-0.18em_0_var(--color-brand-accent)] break-all"
        >
          hello@jeremymartin.ch
        </a>
        <ul class="flex flex-col gap-3 max-w-[60ch]">
          <li class="text-[17px] md:text-[18px] leading-[1.55] text-brand-ink">
            {{ t('common.availableLead') }}
            <span class="[box-shadow:inset_0_-0.32em_0_var(--color-brand-accent)]">
              {{ t('common.availableDate') }}
            </span>.
          </li>
          <li class="text-[17px] md:text-[18px] leading-[1.55] text-brand-ink">
            {{ t('common.repliesFrEn') }}
          </li>
          <li class="text-[17px] md:text-[18px] leading-[1.55] text-brand-ink">
            {{ t('contact.linkedinLabel') }}
            <a
              href="https://www.linkedin.com/in/jermarti"
              rel="me noopener"
              target="_blank"
              class="pb-[2px] border-b border-brand-ink hover:[box-shadow:inset_0_-0.4em_0_var(--color-brand-accent)]"
            >
              jermarti
            </a>
          </li>
          <li class="text-[17px] md:text-[18px] leading-[1.55] text-brand-ink">
            {{ t('contact.based') }}
          </li>
        </ul>
      </div>
    </div>
  </section>
  </div>
</template>
