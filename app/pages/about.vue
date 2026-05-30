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
      'BSc Media Engineering, HEIG-VD · one semester Microengineering, EPFL · CFC Electronics',
  },
  { key: 'Languages', value: 'French (native) · English (B2) · Italian (working)' },
  { key: 'Based', value: 'Mendrisio, Switzerland' },
  { key: 'Available', value: 'From August 2026' },
  { key: 'Other', value: 'Festival president (30-person committee, 1,000 attendees)' },
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
          I'm Jérémy Martin, an interaction design master's student at SUPSI in Mendrisio. I came to
          design through electronics and media engineering, and I write about evaluating AI-driven
          products.
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
    <UiSectionHead num="01" label="The Maker-Engineer story" class="mb-10 md:mb-16" />
    <div class="grid grid-cols-12 gap-x-6">
      <div class="col-span-12 md:col-span-8 md:col-start-3 flex flex-col gap-6">
        <p
          class="text-[22px] md:text-[26px] leading-[1.4] tracking-[-0.005em] text-brand-ink max-w-[58ch]"
        >
          I work at the intersection of research, evaluation, and interface design, with a
          particular focus on how AI-driven products actually behave for the people using them.
          Generation became cheap;
          <em class="not-italic [box-shadow:inset_0_-0.35em_0_var(--color-brand-accent)]">
            knowing whether what you generated is any good
          </em>
          did not.
        </p>
        <p class="text-[17px] md:text-[18px] leading-[1.6] text-brand-ink max-w-[64ch]">
          I'm finishing a master's in Interaction Design at SUPSI in Mendrisio. The programme's
          strength, for me, is its insistence on building things and then evaluating them honestly,
          not as a final defence, but as the everyday method. I arrived expecting design school; I
          found an evaluation school in disguise, and that framing has shaped how I think about
          every project since.
        </p>
        <p class="text-[17px] md:text-[18px] leading-[1.6] text-brand-ink max-w-[64ch]">
          Before SUPSI I completed a BSc in Media Engineering at HEIG-VD, where I learned the craft
          skills that still do most of the work: signal processing, front-end engineering, UX
          research methods, and the rigour of a final-year thesis. I spent one semester at EPFL in
          Microengineering. I left because the fit was wrong for what I was trying to become;
          staying would have been more comfortable than honest, and I prefer the latter.
        </p>
        <p class="text-[17px] md:text-[18px] leading-[1.6] text-brand-ink max-w-[64ch]">
          Underneath all of this is a four-year electronics apprenticeship (CFC) that I rarely
          mention up front and quietly rely on every day. It taught me that systems have
          substrates, that something always has to actually carry the signal, and that the
          difference between a clever idea and a working thing is mostly measurement. That
          apprenticeship is the reason I find software interfaces interesting and the reason I
          don't entirely trust them.
        </p>
        <p class="text-[17px] md:text-[18px] leading-[1.6] text-brand-ink max-w-[64ch]">
          What I'm building toward is a practice that sits one step before the screen. Design that
          takes the substrate seriously, that treats evaluation as the work rather than a quality
          gate at the end, and that earns its aesthetic decisions instead of decorating around
          them. Most of the writing on this site is me thinking out loud about what that practice
          looks like in product contexts.
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
            I designed a tangible household energy interface as my final-year thesis at HEIG-VD.
            <span class="[box-shadow:inset_0_-0.32em_0_var(--color-brand-accent)]">
              A working prototype is still in use at the host institution
            </span>
            after the study closed, and the calibration routine has been picked up by another
            student project. It's the artifact I would point to if you only had one minute to look
            at my work.
          </p>
        </div>
        <div class="flex flex-col gap-4">
          <span class="font-mono uppercase tracking-[0.08em] text-[10px] text-brand-ink-muted">
            Festival · 2022 — 2024
          </span>
          <p class="text-[17px] md:text-[18px] leading-[1.65] text-brand-ink max-w-[64ch]">
            Three years involved with a music festival of around 1,000 attendees, one of them as
            president of a roughly 30-person organising committee. It taught me, with no
            ambiguity, that the hard part of design is not the design; it is the schedule, the
            budget, the volunteers who didn't show up, and the very small decisions that compound.
            I list it on this page because it shaped my practice more than any class.
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
          Right now: how product teams should evaluate AI-driven features before they become
          promises. The substrate beneath a screen (what hardware, what data path, what the object
          actually is) and how that substrate quietly determines the interface. Evidence before
          aesthetics, and substance over surface as a working discipline rather than a slogan.
          None of these are positions I've concluded; they're the live questions I'm carrying into
          the next year of work.
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
