<script setup lang="ts">
useHead({
  title: 'About',
  meta: [
    {
      name: 'description',
      content:
        'Interaction design master at SUPSI Mendrisio, coming to design from electronics and media engineering. Available from August 2026.',
    },
  ],
})

useSchemaOrg([defineWebPage({ '@type': 'AboutPage' })])

const facts = [
  { key: 'Currently', value: 'Master in Interaction Design, SUPSI Mendrisio · graduating 2027' },
  {
    key: 'Previously',
    value:
      'BSc Media Engineering, HEIG-VD · one semester Microengineering, EPFL · CMS preparatory bridge year, EPFL · CFC Electronics, HEIA-FR',
  },
  { key: 'Languages', value: 'French (native) · English (B2)' },
  { key: 'Based', value: 'Mendrisio, Switzerland' },
  { key: 'Available', value: 'From August 2026' },
  { key: 'Festival', value: "Baleinev: programmer (2023), head of comms (2024), president (2025). Committee ~25, ~1'000 attendees." },
] as const
</script>

<template>
  <!-- Hero -->
  <section class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 pt-16 md:pt-28 pb-16 md:pb-24">
    <div class="grid grid-cols-12 gap-x-6 gap-y-10 items-end">
      <div class="col-span-12 md:col-span-7">
        <span
          class="font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink-muted mb-6 md:mb-10 block"
        >
          About
        </span>
        <p
          class="text-[28px] md:text-[44px] leading-[1.15] tracking-[-0.02em] text-brand-ink max-w-[22ch] font-medium"
        >
          I'm Jérémy Martin, an interaction and product designer currently working on
          <span class="[box-shadow:inset_0_-0.32em_0_var(--color-brand-accent)]">agentic experiences (AX)</span>
          designed around human intent and its consequences. I'm finishing a Master's in Interaction
          Design at SUPSI in Mendrisio, with a background in electronics and media engineering.
        </p>
      </div>
      <div class="col-span-12 md:col-span-5 md:col-start-8">
        <UiMediaPlaceholder
          :src="null"
          alt="Portrait of Jérémy Martin in the workshop at HEIG-VD."
          aspect="aspect-[4/5]"
          sizes="(min-width: 768px) 500px, 100vw"
          eager
        />
        <span
          class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted mt-3 block"
        >
          Workshop · HEIG-VD · 2024
        </span>
      </div>
    </div>
  </section>

  <!-- Story -->
  <section class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 py-16 md:py-28">
    <UiSectionHead num="01" label="How I got here" class="mb-10 md:mb-16" />
    <div class="grid grid-cols-12 gap-x-6">
      <div class="col-span-12 md:col-span-8 md:col-start-3 flex flex-col gap-6">
        <p
          class="text-[22px] md:text-[26px] leading-[1.4] tracking-[-0.005em] text-brand-ink max-w-[58ch]"
        >
          Take agentic experiences: the hard part there isn't generation. Generation became
          cheap;
          <em class="not-italic [box-shadow:inset_0_-0.35em_0_var(--color-brand-accent)]">
            knowing whether what you generated is any good
          </em>
          did not. The prompt itself isn't free either: it deserves the same grounding as any
          other design decision.
        </p>
        <p class="text-[17px] md:text-[18px] leading-[1.6] text-brand-ink max-w-[64ch]">
          I'm finishing a master of arts in Interaction Design at SUPSI in Mendrisio. It's a
          practice-driven programme: each course is a real project, taught by people working in
          their field. It has expanded the way I think and given me two areas I now build around:
          physical prototyping, and designing for agentic experiences.
        </p>
        <p class="text-[17px] md:text-[18px] leading-[1.6] text-brand-ink max-w-[64ch]">
          Before SUPSI I completed a BSc in Media Engineering at HEIG-VD. The curriculum gave me
          a 360° view on digital projects, and the craft skills I still rely on: UX/UI design,
          front-end and back-end web development, digital marketing, project management.
        </p>
        <p class="text-[17px] md:text-[18px] leading-[1.6] text-brand-ink max-w-[64ch]">
          Before HEIG-VD I spent one semester at EPFL in Microengineering. I left because the fit
          was wrong for what I was trying to become, and staying would have been more comfortable
          than honest. I reached that EPFL semester via CMS, EPFL's demanding bridge year for
          students with a maturité professionnelle rather than the gymnasiale that EPFL normally
          requires.
        </p>
        <p class="text-[17px] md:text-[18px] leading-[1.6] text-brand-ink max-w-[64ch]">
          Underneath all of this is a four-year electronics apprenticeship (CFC) at HEIA-FR that
          I rarely mention up front and quietly rely on every day.
        </p>
        <p class="text-[17px] md:text-[18px] leading-[1.6] text-brand-ink max-w-[64ch]">
          What I'm building toward is a design practice that takes
          <span class="[box-shadow:inset_0_-0.32em_0_var(--color-brand-accent)]">AI as material, not as marketing</span>.
          That means experiences shaped around user intent, prompts grounded like any
          other design decision, and aesthetics earned rather than applied at the end. The
          projects on this portfolio website are how I've been putting it into practice.
        </p>
      </div>
    </div>
  </section>

  <!-- Field experience -->
  <section class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 py-16 md:py-28">
    <UiSectionHead num="02" label="Field experience" class="mb-10 md:mb-16" />
    <div class="grid grid-cols-12 gap-x-6 gap-y-12">
      <div class="col-span-12 md:col-span-8 md:col-start-3 flex flex-col gap-12">
        <div class="flex flex-col gap-4">
          <span class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted">
            Bachelor thesis · 2024 — 2025
          </span>
          <p
            class="text-[20px] md:text-[24px] leading-[1.4] tracking-[-0.005em] text-brand-ink max-w-[60ch]"
          >
            For my Bachelor thesis at HEIG-VD I designed
            <span class="[box-shadow:inset_0_-0.32em_0_var(--color-brand-accent)]">DataBloom</span>,
            a tangible interface that makes the energy impact of digital usage perceptible at home.
            A flower whose stem wilts as the household's weekly data consumption grows, and whose
            centre lights up to signal the live data rate. Built at the Media Engineering Institute
            on simulated data from CarbonViz Home, and published on the MEI research blog. It's the
            piece I would point to if you only had one minute to look at my work.
          </p>
        </div>
        <div class="flex flex-col gap-4">
          <span class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted">
            Festival · 2023 — 2025
          </span>
          <p class="text-[17px] md:text-[18px] leading-[1.65] text-brand-ink max-w-[64ch]">
            Three years on the organising committee of Baleinev, a student-run music festival of
            around 1'000 attendees: programmer in 2023, head of communications in 2024, then
            president in 2025 (committee of about 25). The head-of-comms year put the digital
            marketing and brand strategy from my BSc into a much bigger test, and the presidency
            made the project management and budgeting training meet the real schedule, the
            missing volunteers, and
            <span class="[box-shadow:inset_0_-0.32em_0_var(--color-brand-accent)]">the very small decisions that compound</span>.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Thinking -->
  <section class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 py-16 md:py-28">
    <UiSectionHead num="03" label="What I'm thinking about" class="mb-10 md:mb-16" />
    <div class="grid grid-cols-12 gap-x-6">
      <div class="col-span-12 md:col-span-8 md:col-start-3">
        <p class="text-[18px] md:text-[20px] leading-[1.6] text-brand-ink max-w-[60ch]">
          Right now: how to keep designing for the user when the technological possibilities
          won't stop changing. AI doesn't change the discipline, but it makes it tempting
          to start with the tool instead of the user's intent. So my current question is the
          inverse: how do we anchor design around intent first, and only then bring AI generation in?
          None of these are positions I've concluded. They are live questions in my current work.
        </p>
      </div>
    </div>
  </section>

  <!-- Facts -->
  <section class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 py-16 md:py-28">
    <UiSectionHead num="04" label="Facts" class="mb-10 md:mb-16" />
    <dl class="border-t border-brand-ink">
      <div
        v-for="f in facts"
        :key="f.key"
        class="grid grid-cols-12 gap-x-6 py-5 border-b border-brand-hairline items-baseline"
      >
        <dt
          class="col-span-12 md:col-span-3 font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink-muted mb-2 md:mb-0"
        >
          {{ f.key }}
        </dt>
        <dd
          class="col-span-12 md:col-span-9 text-[17px] md:text-[18px] leading-[1.5] text-brand-ink max-w-[64ch]"
        >
          {{ f.value }}
        </dd>
      </div>
    </dl>
  </section>

  <!-- Downloads -->
  <section class="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-16 py-16 md:py-28">
    <UiSectionHead num="05" label="Downloads" class="mb-10 md:mb-16" />
    <div class="grid grid-cols-12 gap-x-6">
      <div class="col-span-12 md:col-span-8 md:col-start-3 flex flex-col md:flex-row gap-4">
        <a
          href="/jeremy-martin-cv-en.pdf"
          download
          class="inline-flex items-center justify-between gap-3 px-5 py-3.5 bg-brand-ink text-brand-bg hover:bg-[#1f1f1f] min-w-[240px] transition-colors"
        >
          <span class="text-[14px]">Download CV (English)</span>
          <!-- Lucide Download, stroke 1.5, 16x16 -->
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
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" x2="12" y1="15" y2="3" />
          </svg>
        </a>
        <span
          class="inline-flex items-center justify-between gap-3 px-5 py-3.5 border border-brand-hairline text-brand-ink-muted min-w-[240px]"
          aria-disabled="true"
        >
          <span class="text-[14px]">CV (Français)</span>
          <span class="font-mono uppercase tracking-[0.08em] text-[10px]">soon</span>
        </span>
      </div>
    </div>
  </section>
</template>
