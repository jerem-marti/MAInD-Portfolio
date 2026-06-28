<script setup lang="ts">
import type { VideoResource } from '~/utils/resources'
import { resourceEmbedUrl } from '~/utils/resources'

const props = defineProps<{
  resource: VideoResource
}>()

const playing = ref(false)
const player = ref<HTMLElement | null>(null)
const embedUrl = computed(() => resourceEmbedUrl(props.resource))

// Defer the heavy player (file or third-party iframe) until the visitor clicks.
// Nothing third-party loads at rest, so a provider video costs zero requests/cookies
// until play. Move focus into the player so keyboard users land on the controls.
async function play() {
  playing.value = true
  await nextTick()
  player.value?.focus()
}
</script>

<template>
  <figure class="flex flex-col gap-3">
    <button
      v-if="!playing"
      type="button"
      class="group relative block w-full cursor-pointer"
      :aria-label="$t('work.resource.playVideo', { title: resource.title })"
      @click="play"
    >
      <UiMediaPlaceholder
        :src="resource.poster"
        alt=""
        aspect="aspect-video"
        sizes="sm:100vw md:100vw lg:100vw xl:1120px 2xl:1120px"
      />
      <span
        aria-hidden="true"
        class="absolute inset-0 flex items-center justify-center"
      >
        <span
          class="flex size-16 items-center justify-center rounded-full bg-brand-ink/85 text-brand-surface backdrop-blur-sm transition-colors group-hover:bg-brand-ink md:size-20"
        >
          <!-- Play triangle -->
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>

    <div
      v-else
      ref="player"
      tabindex="-1"
      class="aspect-video w-full overflow-hidden border border-brand-hairline bg-black"
    >
      <video
        v-if="resource.src"
        :src="resource.src"
        class="h-full w-full"
        controls
        autoplay
        playsinline
      />
      <iframe
        v-else-if="embedUrl"
        :src="embedUrl"
        :title="resource.title"
        class="h-full w-full border-0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
        referrerpolicy="strict-origin-when-cross-origin"
      />
    </div>

    <figcaption class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted">
      {{ $t('work.resource.videoPrefix') }} · {{ resource.title }}
    </figcaption>
  </figure>
</template>
