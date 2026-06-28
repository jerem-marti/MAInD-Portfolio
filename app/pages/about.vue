<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: () => t('about.metaTitle'),
  meta: [
    { name: 'description', content: () => t('about.metaDescription') },
  ],
})

useSchemaOrg([defineWebPage({ '@type': 'AboutPage' })])

const facts = computed(() => [
  { key: t('about.facts.currentlyKey'), value: t('about.facts.currentlyValue') },
  { key: t('about.facts.previouslyKey'), value: t('about.facts.previouslyValue') },
  { key: t('about.facts.languagesKey'), value: t('about.facts.languagesValue') },
  { key: t('about.facts.basedKey'), value: t('about.facts.basedValue') },
  { key: t('about.facts.availableKey'), value: t('about.facts.availableValue') },
  { key: t('about.facts.festivalKey'), value: t('about.facts.festivalValue') },
])
</script>

<template>
  <div>
  <!-- Single root node (this div): the fade page transition can't bind to a multi-root
       page, which left every page blank on client-side navigation. -->
  <!-- Hero -->
  <section class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 pt-16 md:pt-28 pb-16 md:pb-24">
    <div class="grid grid-cols-12 gap-x-6 gap-y-10 items-end">
      <div class="col-span-12 md:col-span-7">
        <span
          class="font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink-muted mb-6 md:mb-10 block"
        >
          {{ t('about.heroLabel') }}
        </span>
        <i18n-t
          keypath="about.heroBody"
          tag="p"
          scope="global"
          class="text-[28px] md:text-[44px] leading-[1.15] tracking-[-0.02em] text-brand-ink max-w-[22ch] font-medium"
        >
          <template #emphasis>
            <span class="[box-shadow:inset_0_-0.32em_0_var(--color-brand-accent)]">{{ t('about.heroEmphasis') }}</span>
          </template>
        </i18n-t>
      </div>
      <div class="col-span-12 md:col-span-5 md:col-start-8">
        <UiMediaPlaceholder
          src="/images/about/portrait.jpg"
          :alt="t('common.portraitAlt')"
          aspect="aspect-[4/5]"
          sizes="sm:100vw md:500px lg:500px xl:500px 2xl:500px"
          eager
          priority
        />
      </div>
    </div>
  </section>

  <!-- Story -->
  <section class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 py-16 md:py-28">
    <UiSectionHead num="01" :label="t('about.storyLabel')" class="mb-10 md:mb-16" />
    <div class="grid grid-cols-12 gap-x-6">
      <div class="col-span-12 md:col-span-8 md:col-start-3 flex flex-col gap-6">
        <i18n-t
          keypath="about.storyP1"
          tag="p"
          scope="global"
          class="text-[22px] md:text-[26px] leading-[1.4] tracking-[-0.005em] text-brand-ink max-w-[58ch]"
        >
          <template #emphasis>
            <em class="not-italic [box-shadow:inset_0_-0.35em_0_var(--color-brand-accent)]">{{ t('about.storyP1Emphasis') }}</em>
          </template>
        </i18n-t>
        <p class="text-[17px] md:text-[18px] leading-[1.6] text-brand-ink max-w-[64ch]">
          {{ t('about.storyP2') }}
        </p>
        <p class="text-[17px] md:text-[18px] leading-[1.6] text-brand-ink max-w-[64ch]">
          {{ t('about.storyP3') }}
        </p>
        <p class="text-[17px] md:text-[18px] leading-[1.6] text-brand-ink max-w-[64ch]">
          {{ t('about.storyP4') }}
        </p>
        <p class="text-[17px] md:text-[18px] leading-[1.6] text-brand-ink max-w-[64ch]">
          {{ t('about.storyP5') }}
        </p>
        <i18n-t
          keypath="about.storyP6"
          tag="p"
          scope="global"
          class="text-[17px] md:text-[18px] leading-[1.6] text-brand-ink max-w-[64ch]"
        >
          <template #emphasis>
            <span class="[box-shadow:inset_0_-0.32em_0_var(--color-brand-accent)]">{{ t('about.storyP6Emphasis') }}</span>
          </template>
        </i18n-t>
      </div>
    </div>
  </section>

  <!-- Field experience -->
  <section class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 py-16 md:py-28">
    <UiSectionHead num="02" :label="t('about.fieldLabel')" class="mb-10 md:mb-16" />
    <div class="grid grid-cols-12 gap-x-6 gap-y-12">
      <div class="col-span-12 md:col-span-8 md:col-start-3 flex flex-col gap-12">
        <div class="flex flex-col gap-4">
          <span class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted">
            {{ t('about.thesisMeta') }}
          </span>
          <i18n-t
            keypath="about.thesisBody"
            tag="p"
            scope="global"
            class="text-[20px] md:text-[24px] leading-[1.4] tracking-[-0.005em] text-brand-ink max-w-[60ch]"
          >
            <template #emphasis>
              <span class="[box-shadow:inset_0_-0.32em_0_var(--color-brand-accent)]">{{ t('about.thesisEmphasis') }}</span>
            </template>
          </i18n-t>
        </div>
        <div class="flex flex-col gap-4">
          <span class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted">
            {{ t('about.festivalMeta') }}
          </span>
          <i18n-t
            keypath="about.festivalBody"
            tag="p"
            scope="global"
            class="text-[17px] md:text-[18px] leading-[1.65] text-brand-ink max-w-[64ch]"
          >
            <template #emphasis>
              <span class="[box-shadow:inset_0_-0.32em_0_var(--color-brand-accent)]">{{ t('about.festivalEmphasis') }}</span>
            </template>
          </i18n-t>
        </div>
      </div>
    </div>
  </section>

  <!-- Thinking -->
  <section class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 py-16 md:py-28">
    <UiSectionHead num="03" :label="t('about.thinkingLabel')" class="mb-10 md:mb-16" />
    <div class="grid grid-cols-12 gap-x-6">
      <div class="col-span-12 md:col-span-8 md:col-start-3">
        <p class="text-[18px] md:text-[20px] leading-[1.6] text-brand-ink max-w-[60ch]">
          {{ t('about.thinkingBody') }}
        </p>
      </div>
    </div>
  </section>

  <!-- Facts -->
  <section class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 py-16 md:py-28">
    <UiSectionHead num="04" :label="t('about.factsLabel')" class="mb-10 md:mb-16" />
    <dl class="border-t border-brand-ink">
      <div
        v-for="f in facts"
        :key="f.key"
        class="grid grid-cols-12 gap-x-6 py-5 border-b border-brand-hairline items-baseline"
      >
        <dt
          class="col-span-12 md:col-span-3 font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink-muted mb-2 md:mb-0"
        >
          {{ f.key }}
        </dt>
        <dd
          class="col-span-12 md:col-span-9 text-[17px] md:text-[18px] leading-[1.5] text-brand-ink max-w-[64ch]"
        >
          {{ f.value }}
        </dd>
      </div>
    </dl>
  </section>

  <!-- Downloads -->
  <section class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 py-16 md:py-28">
    <UiSectionHead num="05" :label="t('about.downloadsLabel')" class="mb-10 md:mb-16" />
    <div class="grid grid-cols-12 gap-x-6">
      <div class="col-span-12 md:col-span-8 md:col-start-3 flex flex-col md:flex-row gap-4">
        <a
          href="/jeremy-martin-cv-en.pdf"
          download
          class="inline-flex items-center justify-between gap-3 px-5 py-3.5 bg-brand-ink text-brand-bg hover:bg-brand-ink-hover min-w-[240px] transition-colors"
        >
          <span class="text-[14px]">{{ t('about.cvEn') }}</span>
          <!-- Lucide Download, stroke 1.5, 16x16 -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" x2="12" y1="15" y2="3" />
          </svg>
        </a>
        <span
          class="inline-flex items-center justify-between gap-3 px-5 py-3.5 border border-brand-hairline text-brand-ink-muted min-w-[240px]"
          aria-disabled="true"
        >
          <span class="text-[14px]">{{ t('about.cvFr') }}</span>
          <span class="font-mono uppercase tracking-[0.08em] text-[10px]">{{ t('about.cvFrSoon') }}</span>
        </span>
      </div>
    </div>
  </section>
  </div>
</template>
