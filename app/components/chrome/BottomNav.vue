<script setup lang="ts">
const route = useRoute()

const items = [
  { label: 'Work', to: '/', match: (p: string) => p === '/' || p.startsWith('/work'), icon: 'briefcase' },
  { label: 'About', to: '/about', match: (p: string) => p.startsWith('/about'), icon: 'user' },
  { label: 'Contact', to: '/contact', match: (p: string) => p.startsWith('/contact'), icon: 'mail' },
] as const
</script>

<template>
  <nav
    class="md:hidden fixed inset-x-0 bottom-0 z-30 bg-brand-bg/95 backdrop-blur border-t border-brand-hairline"
    style="padding-bottom: env(safe-area-inset-bottom)"
    aria-label="Primary mobile"
  >
    <ul class="grid grid-cols-3 h-14">
      <li v-for="item in items" :key="item.label" class="relative">
        <NuxtLink
          :to="item.to"
          class="h-full flex flex-col items-center justify-center gap-1 transition-colors"
          :class="item.match(route.path) ? 'text-brand-ink' : 'text-brand-ink-muted'"
          :aria-current="item.match(route.path) ? 'page' : undefined"
        >
          <!-- Inline Lucide icons (Briefcase/User/Mail), stroke 1.5, 18x18 -->
          <svg
            v-if="item.icon === 'briefcase'"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            <rect width="20" height="14" x="2" y="6" rx="2" />
          </svg>
          <svg
            v-else-if="item.icon === 'user'"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <svg
            v-else-if="item.icon === 'mail'"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <span class="font-mono uppercase tracking-[0.08em] text-[9px]">{{ item.label }}</span>
          <span
            v-if="item.match(route.path)"
            aria-hidden="true"
            class="absolute top-1 left-1/2 -translate-x-1/2 size-1 bg-brand-accent"
          />
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
