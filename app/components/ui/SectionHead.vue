<script setup lang="ts">
defineProps<{
  num: string
  label: string
}>()
</script>

<template>
  <div class="flex items-baseline gap-6">
    <span class="font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink-muted">
      {{ num }}
    </span>
    <span class="font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink">
      {{ label }}
    </span>
    <span aria-hidden="true" class="flex-1 h-px bg-brand-hairline" />
  </div>
</template>
