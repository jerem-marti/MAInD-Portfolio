<script setup lang="ts">
import type { LinkResource } from '~/utils/resources'
import { RESOURCE_TAG } from '~/utils/resources'

const props = defineProps<{
  resource: LinkResource
}>()

const tag = computed(() => RESOURCE_TAG[props.resource.type])
</script>

<template>
  <a
    :href="resource.url"
    target="_blank"
    rel="noopener noreferrer"
    class="group flex items-baseline gap-4 md:gap-6 py-4 md:py-5 border-t border-brand-hairline"
  >
    <span
      class="font-mono uppercase tracking-[0.08em] text-[10px] md:text-[11px] text-brand-ink-muted w-[52px] md:w-[72px] shrink-0 pt-[3px]"
    >
      {{ tag }}
    </span>
    <span
      class="flex-1 text-[18px] md:text-[22px] leading-[1.3] tracking-[-0.01em] text-brand-ink"
    >
      <span
        class="group-hover:[box-shadow:inset_0_-0.16em_0_var(--color-brand-accent)]"
      >{{ resource.title }}</span>
    </span>
    <span class="sr-only"> (opens in new tab)</span>
    <!-- Lucide ArrowUpRight -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="shrink-0 self-center text-brand-ink-muted transition-colors group-hover:text-brand-ink"
      aria-hidden="true"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  </a>
</template>
