<script setup lang="ts">
defineProps<{
  led: readonly string[]
  contributed: readonly string[]
  notTouched: readonly string[]
  team: string
}>()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10">
    <div class="flex flex-col gap-3 border-t border-brand-ink pt-4">
      <span class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted">
        Led
      </span>
      <ul class="flex flex-col gap-2">
        <li
          v-for="it in led"
          :key="it"
          class="text-[15px] leading-[1.45] text-brand-ink"
        >
          {{ it }}
        </li>
      </ul>
    </div>
    <div class="flex flex-col gap-3 border-t border-brand-ink pt-4">
      <span class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted">
        Contributed to
      </span>
      <ul class="flex flex-col gap-2">
        <li
          v-for="it in contributed"
          :key="it"
          class="text-[15px] leading-[1.45] text-brand-ink"
        >
          {{ it }}
        </li>
      </ul>
    </div>
    <div class="flex flex-col gap-3 border-t border-brand-ink pt-4">
      <span class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted">
        Not touched
      </span>
      <ul class="flex flex-col gap-2">
        <li
          v-for="it in notTouched"
          :key="it"
          class="text-[15px] leading-[1.45] text-brand-ink-muted"
        >
          {{ it }}
        </li>
      </ul>
    </div>
    <div class="md:col-span-3 border-t border-brand-ink pt-4">
      <span
        class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted mb-2 block"
      >
        Team
      </span>
      <p class="text-[16px] leading-[1.55] text-brand-ink max-w-[60ch]">{{ team }}</p>
    </div>
  </div>
</template>
