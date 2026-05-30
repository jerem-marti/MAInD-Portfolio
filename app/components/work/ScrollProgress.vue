<script setup lang="ts">
const { y } = useWindowScroll()
const { height } = useWindowSize()

const progress = computed(() => {
  if (!import.meta.client) return 0
  const max = document.documentElement.scrollHeight - height.value
  if (max <= 0) return 0
  return Math.max(0, Math.min(100, (y.value / max) * 100))
})
</script>

<template>
  <div
    class="fixed top-0 inset-x-0 z-50 h-[2px] bg-transparent pointer-events-none"
    aria-hidden="true"
  >
    <div
      class="h-full bg-brand-accent transition-[width] duration-75"
      :style="{ width: progress + '%' }"
    />
  </div>
</template>
