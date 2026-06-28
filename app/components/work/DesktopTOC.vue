<script setup lang="ts">
type Section = { id: string; num: string; label: string }

defineProps<{
  sections: readonly Section[]
  active: string
}>()
</script>

<template>
  <aside
    class="hidden 2xl:block fixed top-1/2 -translate-y-1/2 left-10 z-20 w-[150px]"
    :aria-label="$t('work.toc.aria')"
  >
    <div
      class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted mb-4"
    >
      {{ $t('work.toc.contents') }}
    </div>
    <ul class="flex flex-col gap-3 border-l border-brand-hairline pl-4">
      <li v-for="s in sections" :key="s.id" class="relative">
        <span
          v-if="s.id === active"
          aria-hidden="true"
          class="absolute -left-[17px] top-1/2 -translate-y-1/2 w-[3px] h-4 bg-brand-accent"
        />
        <a
          :href="`#${s.id}`"
          :aria-current="s.id === active ? 'true' : undefined"
          class="font-mono uppercase tracking-[0.08em] text-[10px] flex items-baseline gap-2 transition-colors"
          :class="
            s.id === active
              ? 'text-brand-ink'
              : 'text-brand-ink-muted hover:text-brand-ink'
          "
        >
          <span class="w-4">{{ s.num }}</span>
          <span>{{ s.label }}</span>
        </a>
      </li>
    </ul>
  </aside>
</template>
