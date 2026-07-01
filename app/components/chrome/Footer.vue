<script setup lang="ts">
const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <footer class="border-t border-brand-hairline mt-10 mb-0 max-md:pointer-coarse:mb-20">
    <div
      class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 pt-10 pb-10 max-md:pointer-coarse:pb-24 grid grid-cols-12 gap-x-6 gap-y-6"
    >
      <div class="col-span-12 md:col-span-4 flex flex-col gap-1">
        <span class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted">
          {{ t('footer.contact') }}
        </span>
        <a
          href="mailto:hello@jeremymartin.ch"
          class="font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink hover:text-brand-ink-muted transition-colors"
        >
          hello@jeremymartin.ch
        </a>
        <a
          href="https://www.linkedin.com/in/jermarti"
          rel="me noopener"
          target="_blank"
          class="font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink hover:text-brand-ink-muted transition-colors"
        >
          {{ t('footer.linkedin') }}
        </a>
        <a
          href="https://github.com/jerem-marti"
          rel="me noopener"
          target="_blank"
          class="font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink hover:text-brand-ink-muted transition-colors"
        >
          {{ t('footer.github') }}
        </a>
      </div>
      <div class="col-span-6 md:col-span-4 flex flex-col gap-1">
        <span class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted">
          {{ t('footer.language') }}
        </span>
        <div class="flex items-center gap-3">
          <template v-for="l in locales" :key="l.code">
            <span
              v-if="l.code === locale"
              class="font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink relative"
            >
              <!-- Active-language dot: -left-2 (not -3) so it sits ~centered in the
                   gap-3 and clears the previous code (e.g. EN when FR is active). -->
              <span
                aria-hidden="true"
                class="absolute -left-2 top-1/2 -translate-y-1/2 size-1 bg-brand-accent"
              />
              {{ l.code.toUpperCase() }}
            </span>
            <NuxtLink
              v-else
              :to="switchLocalePath(l.code)"
              :hreflang="l.code"
              class="font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink-muted hover:text-brand-ink transition-colors"
            >
              {{ l.code.toUpperCase() }}
            </NuxtLink>
          </template>
        </div>
      </div>
      <div class="col-span-6 md:col-span-4 flex md:justify-end flex-col gap-1 md:items-end">
        <span class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted">
          {{ t('footer.copyright') }} ·
          <!-- "License" opens the locally-served LICENSE (MIT for code; content reserved). -->
          <a
            href="/license.txt"
            rel="license"
            target="_blank"
            class="text-brand-ink hover:text-brand-ink-muted transition-colors"
          >{{ t('footer.license') }}</a>
        </span>
        <span class="font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink">
          {{ t('footer.line') }}
        </span>
      </div>
    </div>
  </footer>
</template>
