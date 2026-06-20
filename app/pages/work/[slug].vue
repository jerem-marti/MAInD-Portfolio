<script setup lang="ts">
const route = useRoute()
const { data: study } = await useAsyncData(`work-${route.params.slug}`, () =>
  queryCollection('work').path(route.path).first(),
)

if (!study.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Case study not found',
    fatal: true,
  })
}

useHead({
  title: () => study.value!.title,
  meta: [
    { name: 'description', content: study.value!.summary },
  ],
})

useSchemaOrg([
  defineArticle({
    '@type': 'Article',
    headline: () => study.value!.title,
    description: () => study.value!.summary,
    author: { '@id': '#/schema/person' },
  }),
])

const isLive = computed(() => study.value?.status === 'live')

// TOC entries derive from which content a study actually has. Numbers come from a
// fixed master order, so a section's number never shifts based on what else exists;
// absent sections simply drop out of the contents list (no dead TOC entries).
const sections = computed(() => {
  const s = study.value
  if (!s) return []
  return [
    { id: 'problem', num: '01', label: 'Problem', present: !!s.problem?.length },
    { id: 'role', num: '02', label: 'Role', present: !!s.role },
    { id: 'approach', num: '03', label: 'Approach', present: !!s.approach?.length },
    { id: 'outcome', num: '04', label: 'Outcome', present: !!s.outcome?.length },
    { id: 'reflection', num: '05', label: 'Reflection', present: !!s.reflection },
    { id: 'gallery', num: '06', label: 'Gallery', present: !!s.gallery?.length },
    { id: 'resources', num: '07', label: 'Resources', present: !!s.resources?.length },
    { id: 'next', num: '08', label: 'More work', present: !!(s.prev || s.next) },
  ]
    .filter((d) => d.present)
    .map(({ id, num, label }) => ({ id, num, label }))
})

const active = useScrollSpy(sections.value.map((s) => s.id))
</script>

<template>
  <article v-if="study">
    <!-- Scroll progress + TOC (live case studies only) -->
    <template v-if="isLive">
      <WorkScrollProgress />
      <WorkMobileTOC :sections="sections" :active="active" />
      <WorkDesktopTOC :sections="sections" :active="active" />
    </template>

    <!-- Hero -->
    <section class="pt-8 md:pt-12">
      <div
        class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 mb-8 md:mb-12 flex items-baseline gap-4"
      >
        <NuxtLink
          to="/"
          class="font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink-muted hover:text-brand-ink inline-flex items-center gap-2"
        >
          <!-- Lucide ArrowLeft -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Index
        </NuxtLink>
      </div>

      <UiMediaPlaceholder
        :src="study.hero"
        :alt="study.heroAlt"
        aspect="aspect-[21/9] md:aspect-[21/8]"
        sizes="sm:100vw md:100vw lg:100vw xl:100vw 2xl:100vw"
        full-bleed
        eager
        class="w-full"
      />

      <div class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 pt-12 md:pt-20 pb-16 md:pb-24">
        <h1
          class="text-[44px] md:text-[clamp(64px,7.5vw,128px)] leading-[0.95] tracking-[-0.03em] font-medium max-w-[18ch]"
        >
          {{ study.title }}
        </h1>
        <p
          class="mt-8 md:mt-12 text-[20px] md:text-[26px] leading-[1.4] tracking-[-0.005em] max-w-[58ch] text-brand-ink"
        >
          {{ study.summary }}
        </p>
        <dl
          v-if="study.brief"
          class="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-6 border-t border-brand-ink pt-8"
        >
          <div class="flex flex-col gap-1">
            <dt class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted">
              Role
            </dt>
            <dd class="font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink leading-[1.5]">
              {{ study.brief.role }}
            </dd>
          </div>
          <div class="flex flex-col gap-1">
            <dt class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted">
              Year
            </dt>
            <dd class="font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink leading-[1.5]">
              {{ study.brief.year }}
            </dd>
          </div>
          <div class="flex flex-col gap-1">
            <dt class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted">
              Host
            </dt>
            <dd class="font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink leading-[1.5]">
              {{ study.brief.host }}
            </dd>
          </div>
          <div class="flex flex-col gap-1">
            <dt class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted">
              Scope
            </dt>
            <dd class="font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink leading-[1.5]">
              {{ study.brief.scope }}
            </dd>
          </div>
          <div class="flex flex-col gap-1">
            <dt class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted">
              Shipped
            </dt>
            <dd class="font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink leading-[1.5]">
              {{ study.brief.shipped }}
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- In-progress stub -->
    <section
      v-if="!isLive"
      class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 py-16 md:py-28"
    >
      <UiSectionHead num="01" label="Case study in progress" class="mb-10 md:mb-16" />
      <div class="grid grid-cols-12 gap-x-6">
        <div class="col-span-12 md:col-span-8 md:col-start-3 flex flex-col gap-6">
          <p
            class="text-[20px] md:text-[24px] leading-[1.4] tracking-[-0.005em] text-brand-ink max-w-[58ch]"
          >
            The write-up is in progress. Until it lands, the project sits in the Index list on
            the home page and surfaces in the Selected work card you came from.
          </p>
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-2 text-[15px] self-start pb-[2px] border-b border-brand-ink hover:[box-shadow:inset_0_-0.4em_0_var(--color-brand-accent)]"
          >
            Back to Index
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

    <!-- Live case study sections -->
    <template v-else>
      <!-- 01 Problem -->
      <section
        v-if="study.problem"
        id="problem"
        class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 py-16 md:py-28 scroll-mt-32"
      >
        <UiSectionHead num="01" label="Problem" class="mb-10 md:mb-16" />
        <div class="grid grid-cols-12 gap-x-6">
          <div class="col-span-12 md:col-span-8 md:col-start-3 flex flex-col gap-6">
            <p
              v-for="(p, i) in study.problem"
              :key="i"
              :class="[
                'leading-[1.55] text-brand-ink max-w-[64ch]',
                i === 0
                  ? 'text-[20px] md:text-[24px] tracking-[-0.005em]'
                  : 'text-[17px] md:text-[18px]',
              ]"
            >
              {{ p }}
            </p>
          </div>
        </div>
      </section>

      <!-- 02 Role -->
      <section
        v-if="study.role"
        id="role"
        class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 py-16 md:py-28 scroll-mt-32"
      >
        <UiSectionHead num="02" label="Role" class="mb-10 md:mb-16" />
        <WorkRoleColumns
          :led="study.role.led"
          :contributed="study.role.contributed"
          :not-touched="study.role.notTouched"
          :team="study.role.team"
        />
      </section>

      <!-- 03 Approach -->
      <section
        v-if="study.approach"
        id="approach"
        class="py-16 md:py-28 scroll-mt-32 border-t border-brand-hairline bg-brand-surface/40"
      >
        <div class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16">
          <UiSectionHead num="03" label="Approach" class="mb-10 md:mb-16" />
        </div>
        <div class="flex flex-col gap-24 md:gap-32">
          <!--
            w-full is required: this wrapper is a flex item (parent is flex-col). Without a
            definite width, mx-auto makes a flex item shrink-to-fit its content and centre,
            so each step sizes independently and the labels misalign between steps at wide
            viewports. w-full forces fill-then-cap, matching the block <section> wrappers.
          -->
          <div
            v-for="(sub, i) in study.approach"
            :key="sub.label"
            class="mx-auto w-full max-w-[1280px] px-5 md:px-10 lg:px-16"
          >
            <div class="grid grid-cols-12 gap-x-6">
              <div class="col-span-12 md:col-span-2 mb-4 md:mb-0">
                <span class="font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink-muted">
                  03.{{ String(i + 1).padStart(2, '0') }} / {{ sub.label.toUpperCase() }}
                </span>
              </div>
              <div class="col-span-12 md:col-span-8 md:col-start-3">
                <h2
                  class="text-[28px] md:text-[40px] leading-[1.05] tracking-[-0.02em] font-medium text-brand-ink max-w-[28ch] mb-8"
                >
                  {{ sub.title }}
                </h2>
                <div class="flex flex-col gap-5 max-w-[64ch]">
                  <p
                    v-for="(p, j) in sub.prose"
                    :key="j"
                    class="text-[17px] md:text-[18px] leading-[1.55] text-brand-ink"
                  >
                    {{ p }}
                  </p>
                </div>
              </div>
            </div>
            <div
              v-if="sub.artifacts"
              class="mt-12 md:mt-16 grid grid-cols-12 gap-x-6 gap-y-0"
            >
              <WorkArtifactBlock
                v-for="a in sub.artifacts"
                :key="a.caption"
                :src="a.src"
                :alt="a.alt"
                :caption="a.caption"
                :decision="a.decision"
                :width="a.width"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- 04 Outcome -->
      <section
        v-if="study.outcome"
        id="outcome"
        class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 py-16 md:py-28 scroll-mt-32"
      >
        <UiSectionHead num="04" label="Outcome" class="mb-10 md:mb-16" />
        <div class="grid grid-cols-12 gap-x-6">
          <div class="col-span-12 md:col-span-8 md:col-start-3 flex flex-col gap-6">
            <p
              v-for="(p, i) in study.outcome"
              :key="i"
              class="text-[22px] md:text-[28px] leading-[1.35] tracking-[-0.01em] text-brand-ink max-w-[36ch]"
            >
              {{ p }}
            </p>
          </div>
        </div>
      </section>

      <!-- 05 Reflection -->
      <section
        v-if="study.reflection"
        id="reflection"
        class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 py-16 md:py-28 scroll-mt-32"
      >
        <UiSectionHead num="05" label="Reflection" class="mb-10 md:mb-16" />
        <div class="grid grid-cols-12 gap-x-6">
          <div class="col-span-12 md:col-span-8 md:col-start-3">
            <p
              class="text-[18px] md:text-[20px] leading-[1.6] text-brand-ink max-w-[60ch] border-l-2 border-brand-accent pl-6"
            >
              {{ study.reflection }}
            </p>
          </div>
        </div>
      </section>

      <!-- 06 Gallery -->
      <section
        v-if="study.gallery"
        id="gallery"
        class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 py-16 md:py-28 scroll-mt-32"
      >
        <UiSectionHead num="06" label="Gallery" class="mb-10 md:mb-16" />
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <figure
            v-for="(g, i) in study.gallery"
            :key="i"
            class="flex flex-col gap-2"
          >
            <UiMediaPlaceholder
              :src="g.src"
              :alt="g.alt"
              aspect="aspect-[4/3]"
              sizes="sm:50vw md:33vw lg:33vw xl:33vw 2xl:33vw"
            />
            <figcaption
              class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted"
            >
              {{ String(i + 1).padStart(2, '0') }} · {{ g.caption }}
            </figcaption>
          </figure>
        </div>
      </section>

      <!-- 07 Resources -->
      <section
        v-if="study.resources?.length"
        id="resources"
        class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 py-16 md:py-28 scroll-mt-32"
      >
        <UiSectionHead num="07" label="Resources" class="mb-10 md:mb-16" />
        <WorkResources :resources="study.resources" />
      </section>

      <!-- 08 Next / Previous -->
      <section
        v-if="study.prev || study.next"
        id="next"
        class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 py-16 md:py-28 scroll-mt-32"
      >
        <UiSectionHead num="08" label="More work" class="mb-10 md:mb-16" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <WorkAdjacentCard v-if="study.prev" dir="prev" :item="study.prev" />
          <WorkAdjacentCard v-if="study.next" dir="next" :item="study.next" />
        </div>
      </section>
    </template>
  </article>
</template>
