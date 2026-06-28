<script setup lang="ts">
// Branded OG / social-share card, rendered to a static PNG at build time
// (Satori, zeroRuntime). Brand tokens are hardcoded here because Satori does not
// see the site's CSS @theme. Pass title/description/image per page via
// defineOgImage('NuxtSeo', { title, description, image }) — see
// app/layouts/default.vue (site default: the portrait) and
// app/pages/work/[slug].vue (per case study: the study hero).
//
// Layout: text on the left (wordmark, title, clamped description, mono footer),
// the image on the right. With no image it falls back to a full-width text card.
//
// Satori notes: every <div> with more than one child needs an explicit display
// (flex throughout); line-clamp support is narrow, so text is trimmed in script.
const props = defineProps({
  title: { type: String, default: 'Jérémy Martin' },
  description: { type: String, default: 'Interaction and product designer' },
  image: { type: String, default: '' },
})

const clamp = (s: string, max: number) => {
  if (!s || s.length <= max) return s
  const cut = s.slice(0, max)
  const sp = cut.lastIndexOf(' ')
  return (sp > 0 ? cut.slice(0, sp) : cut).trimEnd() + '…'
}
const heading = computed(() => clamp(props.title, 48))
const desc = computed(() => clamp(props.description, 110))
</script>

<template>
  <div style="width: 100%; height: 100%; display: flex; background-color: #f4f5f7; color: #0a0a0a;">
    <!-- Text column -->
    <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; padding: 72px;">
      <!-- Wordmark: one disciplined yellow mark + the domain in mono -->
      <div style="display: flex; align-items: center;">
        <div style="width: 20px; height: 20px; background-color: #f5d547;" />
        <div
          style="display: flex; margin-left: 16px; font-family: 'Geist Mono'; font-size: 24px; letter-spacing: 2px; color: #5b6168;"
        >
          jeremymartin.ch
        </div>
      </div>

      <!-- Title + description (trimmed in script, so safe to render flat) -->
      <div style="display: flex; flex-direction: column;">
        <div
          style="display: flex; font-family: 'Geist'; font-weight: 500; font-size: 64px; line-height: 1.04; letter-spacing: -2px; color: #0a0a0a;"
        >
          {{ heading }}
        </div>
        <div
          v-if="desc"
          style="display: flex; margin-top: 24px; font-family: 'Geist'; font-weight: 400; font-size: 27px; line-height: 1.35; color: #5b6168;"
        >
          {{ desc }}
        </div>
      </div>

      <!-- Footer: yellow hairline + discipline label in mono -->
      <div style="display: flex; align-items: center;">
        <div style="width: 64px; height: 2px; background-color: #f5d547;" />
        <div
          style="display: flex; margin-left: 16px; font-family: 'Geist Mono'; font-size: 20px; letter-spacing: 2px; color: #5b6168;"
        >
          INTERACTION &amp; PRODUCT DESIGN
        </div>
      </div>
    </div>

    <!-- Image column (right). Omitted entirely when no image is passed. -->
    <div
      v-if="image"
      style="display: flex; width: 470px; height: 630px; border-left: 1px solid #d7dae0;"
    >
      <img
        :src="image"
        width="470"
        height="630"
        style="width: 470px; height: 630px; object-fit: cover;"
      />
    </div>
  </div>
</template>
