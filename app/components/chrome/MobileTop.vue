<script setup lang="ts">
const localePath = useLocalePath()
const { t } = useI18n()
</script>

<template>
  <header
    class="hidden max-md:pointer-coarse:flex border-b border-brand-hairline px-5 py-4 items-baseline justify-between bg-brand-bg"
  >
    <NuxtLink :to="localePath('/')" class="text-[15px] text-brand-ink">Jérémy Martin</NuxtLink>
    <span class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted">
      {{ t('chrome.tagline') }}
    </span>
  </header>
</template>
