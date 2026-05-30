<script setup lang="ts">
/**
 * Conditional image / placeholder primitive.
 *
 * - When `src` is provided, renders <NuxtImg> with AVIF + WebP variants and a
 *   responsive srcset driven by the `sizes` prop.
 * - When `src` is empty/null, renders a bordered placeholder card with the
 *   image's alt text exposed via aria-label, so the layout and accessibility
 *   surface stay identical before and after a real image lands.
 *
 * Required everywhere a portfolio image goes: case-card heroes, the about
 * portrait, index hover previews, case-study heroes, artifact figures,
 * gallery tiles, and prev/next adjacent cards. Drop a file into
 * `public/images/...` and point `src` at it to flip from placeholder to image.
 */

defineProps<{
  /** Path under `public/`, e.g. `/images/about/portrait.jpg`. Falsy → placeholder. */
  src?: string | null
  /** Real alt text. Required regardless of placeholder vs image state. */
  alt: string
  /** Tailwind aspect class for the wrapper (e.g. `aspect-[16/9]`). */
  aspect: string
  /** NuxtImg `sizes` attribute. Only used when an image is rendered. */
  sizes?: string
  /** Disable lazy loading (e.g. for above-the-fold hero images). */
  eager?: boolean
}>()
</script>

<template>
  <div
    :class="['border border-brand-hairline bg-brand-surface overflow-hidden', aspect]"
  >
    <NuxtImg
      v-if="src"
      :src="src"
      :alt="alt"
      :sizes="sizes"
      :loading="eager ? 'eager' : 'lazy'"
      class="w-full h-full object-cover"
    />
    <div
      v-else
      class="w-full h-full"
      role="img"
      :aria-label="alt"
    />
  </div>
</template>
