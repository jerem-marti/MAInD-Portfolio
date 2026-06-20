<script setup lang="ts">
import type { LinkResource, Resource, VideoResource } from '~/utils/resources'

const props = defineProps<{
  resources: Resource[]
}>()

// Links render as a ruled list; videos render as facade blocks beneath it.
const links = computed(() =>
  props.resources.filter((r): r is LinkResource => r.type !== 'video'),
)
const videos = computed(() =>
  props.resources.filter((r): r is VideoResource => r.type === 'video'),
)
</script>

<template>
  <div class="grid grid-cols-12 gap-x-6">
    <div class="col-span-12 md:col-span-10 md:col-start-2">
      <ul v-if="links.length" class="border-b border-brand-hairline">
        <li v-for="(r, i) in links" :key="i">
          <WorkResourceRow :resource="r" />
        </li>
      </ul>
      <div
        v-if="videos.length"
        class="mt-10 md:mt-12 flex flex-col gap-10 md:gap-12"
      >
        <WorkResourceVideo v-for="(v, i) in videos" :key="i" :resource="v" />
      </div>
    </div>
  </div>
</template>
