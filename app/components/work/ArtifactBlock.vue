<script setup lang="ts">
const props = defineProps<{
  src?: string
  alt: string
  caption: string
  decision: string
  width: 'full' | 'wide' | 'inset' | 'half'
}>()

const widthClass: Record<typeof props.width, string> = {
  full: 'col-span-12',
  wide: 'col-span-12 md:col-span-10 md:col-start-2',
  inset: 'col-span-12 md:col-span-8 md:col-start-3',
  half: 'col-span-12 md:col-span-6',
}
</script>

<template>
  <figure :class="['flex flex-col gap-3', widthClass[width]]">
    <UiMediaPlaceholder
      :src="src"
      :alt="alt"
      aspect="aspect-[16/10]"
      sizes="sm:100vw md:100vw lg:100vw xl:1200px 2xl:1200px"
    />
    <figcaption class="flex flex-col gap-1">
      <span class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink">
        {{ caption }}
      </span>
      <span
        class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted max-w-[64ch]"
      >
        Decision · {{ decision }}
      </span>
    </figcaption>
  </figure>
</template>
