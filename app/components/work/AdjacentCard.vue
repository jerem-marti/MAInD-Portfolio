<script setup lang="ts">
defineProps<{
  dir: 'prev' | 'next'
  item: {
    slug: string
    title: string
    image?: string
    alt: string
  }
}>()

const localePath = useLocalePath()
</script>

<template>
  <NuxtLink
    :to="localePath(`/work/${item.slug}`)"
    class="group block border-t border-brand-ink pt-4"
  >
    <div class="flex items-baseline justify-between mb-4">
      <span class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted">
        {{ dir === 'prev' ? $t('work.adjacent.previous') : $t('work.adjacent.next') }}
      </span>
      <!-- Lucide ArrowLeft / ArrowRight, stroke 1.5, 14x14 -->
      <svg
        v-if="dir === 'prev'"
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-brand-ink-muted"
        aria-hidden="true"
      >
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-brand-ink-muted"
        aria-hidden="true"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </div>
    <UiMediaPlaceholder
      :src="item.image"
      :alt="item.alt"
      aspect="aspect-[16/10]"
      sizes="sm:100vw md:50vw lg:50vw xl:50vw 2xl:50vw"
      class="mb-4"
    />
    <div>
      <h3
        class="text-[24px] md:text-[32px] leading-[1.1] tracking-[-0.015em] font-medium max-w-[20ch] group-hover:[box-shadow:inset_0_-0.18em_0_var(--color-brand-accent)] inline"
      >
        {{ item.title }}
      </h3>
    </div>
    <div class="mt-3 inline-flex items-center gap-2 text-[14px]">
      <span class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted">
        {{ $t('work.adjacent.read') }}
      </span>
      <!-- Lucide ArrowUpRight -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-brand-ink-muted"
        aria-hidden="true"
      >
        <path d="M7 7h10v10" />
        <path d="M7 17 17 7" />
      </svg>
    </div>
  </NuxtLink>
</template>
