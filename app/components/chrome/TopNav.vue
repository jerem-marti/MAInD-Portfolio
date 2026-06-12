<script setup lang="ts">
const route = useRoute()

const navItems = [
  { label: 'Work', to: '/', match: (p: string) => p === '/' || p.startsWith('/work') },
  { label: 'About', to: '/about', match: (p: string) => p.startsWith('/about') },
  { label: 'Contact', to: '/contact', match: (p: string) => p.startsWith('/contact') },
]
</script>

<template>
  <header
    class="sticky top-0 z-30 hidden md:block bg-brand-bg/85 backdrop-blur border-b border-brand-hairline"
  >
    <div class="mx-auto max-w-[1280px] px-10 lg:px-16 py-5 flex items-baseline justify-between">
      <NuxtLink to="/" class="flex items-baseline gap-3">
        <span class="text-[15px] text-brand-ink">Jérémy Martin</span>
        <span class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted">
          Interaction and product designer
        </span>
      </NuxtLink>
      <nav class="flex items-center gap-10" aria-label="Primary">
        <NuxtLink
          v-for="item in navItems"
          :key="item.label"
          :to="item.to"
          class="font-mono uppercase tracking-[0.08em] text-[11px] relative transition-colors"
          :class="item.match(route.path)
            ? 'text-brand-ink'
            : 'text-brand-ink-muted hover:text-brand-ink'"
          :aria-current="item.match(route.path) ? 'page' : undefined"
        >
          <span
            v-if="item.match(route.path)"
            aria-hidden="true"
            class="absolute -left-3 top-1/2 -translate-y-1/2 size-1.5 bg-brand-accent"
          />
          {{ item.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
