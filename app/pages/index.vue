<script setup lang="ts">
import { featured } from '~/data/featured'
import { projects, type IndexRow } from '~/data/projects'

useHead({
  meta: [
    {
      name: 'description',
      content:
        'Interaction designer evaluating how AI-driven products work for the people using them. Master at SUPSI, available from August 2026.',
    },
  ],
})

const hovered = ref<IndexRow | null>(null)
</script>

<template>
  <!-- Hero -->
  <section
    class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 pt-16 md:pt-32 pb-20 md:pb-32"
  >
    <h1
      class="text-[15vw] md:text-[clamp(72px,9.2vw,160px)] leading-[0.92] tracking-[-0.035em] font-medium text-brand-ink"
    >
      Process is<br />the artifact.
    </h1>
    <p
      class="mt-10 md:mt-16 text-[18px] md:text-[22px] leading-[1.45] max-w-[58ch] text-brand-ink"
    >
      Interaction designer evaluating how AI-driven products work for the people using them.
      Master's at SUPSI, available from August 2026.
    </p>
  </section>

  <!-- 01 — Approach -->
  <section class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 py-20 md:py-32">
    <UiSectionHead num="01" label="Approach" class="mb-12 md:mb-20" />
    <div class="grid grid-cols-12 gap-x-6">
      <div class="hidden md:block md:col-span-3">
        <span class="font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink-muted">
          POV — 2026
        </span>
      </div>
      <div class="col-span-12 md:col-span-9">
        <p
          class="text-[22px] md:text-[28px] leading-[1.4] tracking-[-0.005em] max-w-[42ch] text-brand-ink"
        >
          AI made design generation cheap.
          <em class="not-italic [box-shadow:inset_0_-0.35em_0_var(--color-brand-accent)]">
            Evaluation is now the scarce skill
          </em>:
          knowing whether a generated interface actually works for the people who have to use it.
          I bring a media engineering background, four years of electronics training, and a
          research-led process to that question. My work pairs hands-on prototyping with rigorous
          evaluation.
        </p>
      </div>
    </div>
  </section>

  <!-- 02 — Selected work -->
  <section class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 py-12 md:py-20">
    <UiSectionHead num="02" label="Selected work" class="mb-12 md:mb-20" />
    <div>
      <NuxtLink
        v-for="c in featured"
        :key="c.num"
        :to="`/work/${c.slug}`"
        class="group block border-t border-brand-ink pt-8 md:pt-10 pb-16 md:pb-24"
      >
        <div class="grid grid-cols-12 gap-x-6 gap-y-8">
          <div
            class="col-span-12 md:col-span-3 flex md:flex-col gap-3 md:gap-2 items-baseline md:items-start"
          >
            <span
              class="font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink-muted"
            >
              {{ c.num }}
            </span>
            <span
              class="font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink-muted"
            >
              {{ c.meta }}
            </span>
          </div>
          <div class="col-span-12 md:col-span-9">
            <h3
              class="text-[36px] md:text-[56px] leading-[1.02] tracking-[-0.025em] font-medium text-brand-ink max-w-[22ch]"
            >
              {{ c.title }}
            </h3>
          </div>
          <div class="col-span-12 md:col-span-9 md:col-start-4 mt-2">
            <!-- Hero image placeholder. Phase 5 swaps in @nuxt/image. -->
            <div
              class="aspect-[16/9] border border-brand-hairline bg-brand-surface"
              role="img"
              :aria-label="c.alt"
            />
          </div>
          <div class="col-span-12 md:col-span-5 md:col-start-4 flex flex-col gap-4">
            <div>
              <div
                class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted mb-1"
              >
                Problem
              </div>
              <p class="text-[17px] leading-[1.55] text-brand-ink">{{ c.problem }}</p>
            </div>
          </div>
          <div class="col-span-12 md:col-span-4 md:col-start-9 flex flex-col gap-4">
            <div>
              <div
                class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted mb-1"
              >
                Outcome
              </div>
              <p class="text-[17px] leading-[1.55] text-brand-ink">{{ c.outcome }}</p>
            </div>
            <span
              class="inline-flex items-center gap-2 mt-2 text-[15px] self-start pb-[1px] border-b border-brand-ink group-hover:[box-shadow:inset_0_-0.4em_0_var(--color-brand-accent)]"
            >
              Read the case study
              <!-- Lucide ArrowUpRight, stroke 1.5, 16x16 -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </section>

  <!-- 03 — Index -->
  <section class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 py-20 md:py-32">
    <UiSectionHead num="03" label="Index — all other work" class="mb-12 md:mb-20" />

    <div class="grid grid-cols-12 gap-x-6 mb-10 md:mb-16">
      <div class="col-span-12 md:col-span-8">
        <h2
          class="text-[44px] md:text-[88px] leading-[0.95] tracking-[-0.03em] font-medium text-brand-ink"
        >
          Index
        </h2>
      </div>
      <div class="hidden md:flex md:col-span-4 items-end justify-end">
        <span
          class="font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink-muted text-right max-w-[28ch]"
        >
          Eight entries. Some link to case studies, some don't. Both are honest.
        </span>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-x-6">
      <div class="col-span-12 lg:col-span-9 relative">
        <!-- column headers -->
        <div
          class="hidden md:grid grid-cols-12 gap-x-6 pb-3 border-b border-brand-ink"
          aria-hidden="true"
        >
          <div class="col-span-1 font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted">
            №
          </div>
          <div class="col-span-5 font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted">
            Project
          </div>
          <div class="col-span-4 font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted">
            Tags
          </div>
          <div class="col-span-1 font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted">
            Year
          </div>
          <div class="col-span-1" />
        </div>

        <ul>
          <li v-for="r in projects" :key="r.num">
            <component
              :is="r.href ? 'a' : 'div'"
              :href="r.href"
              :class="[
                'group block py-5 md:py-4 border-b border-brand-hairline transition-colors',
                r.href ? 'hover:bg-brand-accent/15' : 'cursor-default',
              ]"
              @mouseenter="hovered = r"
              @mouseleave="hovered = null"
              @focusin="hovered = r"
              @focusout="hovered = null"
            >
              <div class="grid grid-cols-12 gap-x-6 items-baseline">
                <div
                  class="col-span-2 md:col-span-1 font-mono uppercase tracking-[0.08em] text-[12px] text-brand-ink-muted"
                >
                  {{ r.num }}
                </div>
                <div
                  class="col-span-10 md:col-span-5 text-[18px] md:text-[20px] leading-[1.25] text-brand-ink tracking-[-0.005em]"
                >
                  {{ r.title }}
                </div>
                <div
                  class="hidden md:block md:col-span-4 font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink-muted"
                >
                  {{ r.tags.join(' / ') }}
                </div>
                <div
                  class="hidden md:block md:col-span-1 font-mono uppercase tracking-[0.08em] text-[12px] text-brand-ink-muted"
                >
                  {{ r.year }}
                </div>
                <div class="hidden md:flex md:col-span-1 justify-end">
                  <!-- Lucide ArrowUpRight when linked, mono dash when not -->
                  <svg
                    v-if="r.href"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-brand-ink-muted group-hover:text-brand-ink transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                  <span
                    v-else
                    class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted"
                    aria-hidden="true"
                  >
                    —
                  </span>
                </div>
                <!-- Mobile meta row -->
                <div
                  class="md:hidden col-span-12 mt-2 flex items-baseline justify-between gap-4"
                >
                  <span
                    class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted truncate"
                  >
                    {{ r.tags.join(' / ') }}
                  </span>
                  <span
                    class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted"
                  >
                    {{ r.year }}
                  </span>
                </div>
              </div>
            </component>
          </li>
        </ul>
      </div>

      <!-- Hover preview rail (lg+ only). Text-only at v1; Phase 5 swaps in real images. -->
      <aside class="hidden lg:block lg:col-span-3" aria-hidden="true">
        <div class="sticky top-32">
          <div
            class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted mb-3"
          >
            Preview
          </div>
          <div
            class="aspect-[3/4] border border-brand-hairline bg-brand-surface overflow-hidden p-4 flex flex-col justify-end"
          >
            <template v-if="hovered">
              <span class="text-[14px] leading-tight text-brand-ink max-w-[20ch]">
                {{ hovered.title }}
              </span>
              <span
                class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted mt-2"
              >
                {{ hovered.tags.join(' / ') }}
              </span>
            </template>
            <span
              v-else
              class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted"
            >
              Hover a row.
            </span>
          </div>
          <div
            v-if="hovered"
            class="mt-3 flex items-baseline justify-between gap-3"
          >
            <span class="text-[14px] leading-tight text-brand-ink max-w-[20ch]">
              {{ hovered.title }}
            </span>
            <span
              class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted"
            >
              {{ hovered.year }}
            </span>
          </div>
        </div>
      </aside>
    </div>
  </section>

  <!-- 04 — About preview -->
  <section class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 py-20 md:py-32">
    <UiSectionHead num="04" label="About" class="mb-12 md:mb-20" />
    <div class="grid grid-cols-12 gap-x-6 gap-y-10">
      <div class="col-span-12 md:col-span-4">
        <!-- Portrait placeholder. Phase 5 swaps in a real image. -->
        <div
          class="aspect-[4/5] border border-brand-hairline bg-brand-surface"
          role="img"
          aria-label="Portrait of Jérémy Martin — placeholder."
        />
      </div>
      <div class="col-span-12 md:col-span-7 md:col-start-6 flex flex-col gap-8">
        <span
          class="font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink-muted"
        >
          Mendrisio · CH
        </span>
        <p
          class="text-[20px] md:text-[24px] leading-[1.4] text-brand-ink max-w-[42ch] tracking-[-0.005em]"
        >
          Jérémy Martin trained in electronics before moving to media engineering at HEIG-VD and
          a master's at SUPSI. He works at the intersection of research, evaluation, and interface
          design, with a particular interest in how AI features actually behave in product
          contexts.
        </p>
        <NuxtLink
          to="/about"
          class="inline-flex items-center gap-2 text-[15px] self-start pb-[2px] border-b border-brand-ink hover:[box-shadow:inset_0_-0.4em_0_var(--color-brand-accent)]"
        >
          About
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>

  <!-- 05 — Contact -->
  <section class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 py-20 md:py-32">
    <UiSectionHead num="05" label="Contact" class="mb-12 md:mb-20" />
    <div class="grid grid-cols-12 gap-x-6 gap-y-12">
      <div class="col-span-12 md:col-span-8">
        <p
          class="text-[32px] md:text-[56px] leading-[1.05] tracking-[-0.025em] font-medium text-brand-ink max-w-[16ch]"
        >
          Available for internship from
          <span class="[box-shadow:inset_0_-0.32em_0_var(--color-brand-accent)]">
            August 2026
          </span>.
        </p>
      </div>
      <div
        class="col-span-12 md:col-span-8 md:col-start-1 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <div class="flex flex-col gap-2">
          <span
            class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted"
          >
            Email
          </span>
          <a
            href="mailto:hi@jeremymartin.ch"
            class="text-[18px] text-brand-ink pb-[2px] border-b border-brand-ink self-start hover:[box-shadow:inset_0_-0.4em_0_var(--color-brand-accent)]"
          >
            hi@jeremymartin.ch
          </a>
        </div>
        <div class="flex flex-col gap-2">
          <span
            class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted"
          >
            LinkedIn
          </span>
          <a
            href="https://www.linkedin.com/in/jermarti"
            rel="me noopener"
            target="_blank"
            class="text-[18px] text-brand-ink pb-[2px] border-b border-brand-ink self-start hover:[box-shadow:inset_0_-0.4em_0_var(--color-brand-accent)]"
          >
            jermarti
          </a>
        </div>
        <div class="flex flex-col gap-2">
          <span
            class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted"
          >
            Languages
          </span>
          <span class="text-[18px] text-brand-ink">FR · EN</span>
        </div>
      </div>
      <div class="col-span-12 md:col-span-8">
        <p
          class="font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink-muted"
        >
          Replies in French or English, usually within a few working days.
        </p>
      </div>
    </div>
  </section>
</template>
