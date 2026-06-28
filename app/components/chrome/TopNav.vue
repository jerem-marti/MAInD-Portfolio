<script setup lang="ts">
const route = useRoute()
const localePath = useLocalePath()
const getRouteBaseName = useRouteBaseName()
const { t } = useI18n()

// Active state keys off the locale-independent route base name (index / about /
// contact / work-slug) so it works identically under /fr. `to` is localized:
// localePath keeps EN paths as-is and maps FR to /fr, /fr/a-propos, /fr/projets/*.
const base = computed(() => getRouteBaseName(route))
const navItems = computed(() => [
  { key: 'work', label: t('nav.work'), to: localePath('/'), active: base.value === 'index' || base.value === 'work-slug' },
  { key: 'about', label: t('nav.about'), to: localePath('/about'), active: base.value === 'about' },
  { key: 'contact', label: t('nav.contact'), to: localePath('/contact'), active: base.value === 'contact' },
])
</script>

<template>
  <!-- Shown for mouse/desktop at every width; hidden only on touch phones
       (narrow + coarse pointer), where the bottom app bar takes over. A narrow
       desktop window keeps this bar rather than dropping to the mobile chrome. -->
  <header
    class="sticky top-0 z-30 block max-md:pointer-coarse:hidden bg-brand-bg/85 backdrop-blur border-b border-brand-hairline"
  >
    <div class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 py-5 flex items-baseline justify-between">
      <NuxtLink :to="localePath('/')" class="flex items-baseline gap-3">
        <span class="text-[15px] text-brand-ink">Jérémy Martin</span>
        <span class="hidden sm:inline font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted">
          {{ t('chrome.tagline') }}
        </span>
      </NuxtLink>
      <nav class="flex items-center gap-5 md:gap-10" :aria-label="t('nav.primaryAria')">
        <NuxtLink
          v-for="item in navItems"
          :key="item.key"
          :to="item.to"
          class="font-mono uppercase tracking-[0.08em] text-[11px] relative transition-colors"
          :class="item.active
            ? 'text-brand-ink'
            : 'text-brand-ink-muted hover:text-brand-ink'"
          :aria-current="item.active ? 'page' : undefined"
        >
          <span
            v-if="item.active"
            aria-hidden="true"
            class="absolute -left-3 top-1/2 -translate-y-1/2 size-1.5 bg-brand-accent"
          />
          {{ item.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
