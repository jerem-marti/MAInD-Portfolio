<script setup lang="ts">
type Section = { id: string; num: string; label: string }

const props = defineProps<{
  sections: readonly Section[]
  active: string
}>()

const open = ref(false)
const current = computed(
  () => props.sections.find((s) => s.id === props.active) ?? props.sections[0]!,
)
</script>

<template>
  <div
    class="2xl:hidden sticky top-[60px] max-md:pointer-coarse:top-0 z-20 bg-brand-bg/95 backdrop-blur border-b border-brand-hairline"
  >
    <button
      type="button"
      class="w-full max-w-[1280px] mx-auto flex items-center justify-between px-5 md:px-10 lg:px-16 py-3"
      :aria-expanded="open"
      aria-controls="case-study-toc-menu"
      aria-label="Case study sections"
      @click="open = !open"
    >
      <span class="flex items-baseline gap-3">
        <span
          class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted"
        >
          Section
        </span>
        <span
          class="font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink relative"
        >
          <span
            aria-hidden="true"
            class="absolute -left-3 top-1/2 -translate-y-1/2 size-1.5 bg-brand-accent"
          />
          {{ current.num }} {{ current.label }}
        </span>
      </span>
      <!-- Lucide ChevronDown, stroke 1.5, 16x16 -->
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
        class="text-brand-ink-muted transition-transform"
        :class="{ 'rotate-180': open }"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
    <ul
      v-show="open"
      id="case-study-toc-menu"
      class="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16 pb-3 flex flex-col gap-2"
    >
      <li v-for="s in sections" :key="s.id">
        <a
          :href="`#${s.id}`"
          class="font-mono uppercase tracking-[0.08em] text-[11px] flex items-baseline gap-3"
          :class="
            s.id === active ? 'text-brand-ink' : 'text-brand-ink-muted hover:text-brand-ink'
          "
          @click="open = false"
        >
          <span class="w-5">{{ s.num }}</span>
          <span>{{ s.label }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>
