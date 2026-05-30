<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const is404 = computed(() => props.error.statusCode === 404)

useHead({
  title: () => (is404.value ? '404' : 'Error'),
})

const ways = [
  { label: 'Home', to: '/' },
  { label: 'See the work', to: '/#work' },
  { label: 'Contact', to: '/contact' },
] as const

function handle(redirect: string) {
  return clearError({ redirect })
}
</script>

<template>
  <NuxtLayout>
    <!-- Acknowledgement -->
    <section class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 pt-16 md:pt-28 pb-10 md:pb-16">
      <div class="flex items-baseline gap-6 mb-10 md:mb-14">
        <span class="font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink-muted">
          00
        </span>
        <span class="font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink">
          <template v-if="is404">404 — Not found</template>
          <template v-else>{{ error.statusCode || 'Error' }} — Something broke</template>
        </span>
        <span aria-hidden="true" class="flex-1 h-px bg-brand-hairline" />
      </div>
      <h1
        class="text-[32px] md:text-[64px] leading-[1.05] tracking-[-0.025em] font-medium text-brand-ink max-w-[22ch]"
      >
        <template v-if="is404">
          That page isn't here.
          <span class="text-brand-ink-muted">
            It may have moved, or it never existed.
          </span>
        </template>
        <template v-else>
          Something went sideways.
          <span class="text-brand-ink-muted">
            Try reloading, or pick one of the routes below.
          </span>
        </template>
      </h1>
    </section>

    <!-- Three ways out -->
    <section class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 py-10 md:py-16">
      <UiSectionHead num="01" label="Three ways out" class="mb-8 md:mb-10" />
      <div class="grid grid-cols-12 gap-x-6">
        <ul class="col-span-12 md:col-span-10 md:col-start-2 flex flex-col">
          <li
            v-for="w in ways"
            :key="w.label"
            class="border-b border-brand-hairline"
          >
            <button
              type="button"
              class="group flex w-full items-baseline gap-4 py-5 md:py-6 text-left"
              @click="handle(w.to)"
            >
              <span
                class="flex-1 text-[22px] md:text-[28px] leading-[1.2] tracking-[-0.01em] text-brand-ink group-hover:[box-shadow:inset_0_-0.32em_0_var(--color-brand-accent)]"
              >
                {{ w.label }}
              </span>
              <!-- Lucide ArrowUpRight, stroke 1.5, 18x18 -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-brand-ink-muted group-hover:text-brand-ink"
                aria-hidden="true"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </section>
  </NuxtLayout>
</template>
