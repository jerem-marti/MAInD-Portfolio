import { defineCollection, defineContentConfig, z } from '@nuxt/content'

/**
 * Case studies, one collection per locale. English twins live at
 * `content/en/work/<slug>.md`, French twins at `content/fr/work/<slug>.md`. The
 * `prefix: ''` strips the `en`/`fr` segment so both resolve to the same internal
 * content path `/work/<slug>`; the `/fr/projets/<slug>` URL prefix comes from i18n
 * routing, not from Content. `pages/work/[slug].vue` queries `work_<locale>` by
 * slug and renders structured frontmatter directly (the body is unused).
 * `status: 'in-progress'` slugs only need title, summary, status, and heroAlt; the
 * page shows a "case study in progress" stub.
 */
const workSchema = z.object({
  title: z.string(),
  summary: z.string(),
  status: z.enum(['live', 'in-progress']),
  heroAlt: z.string(),

  // Hero image path inside public/images/work/<slug>/. Phase 5 fills these in.
  hero: z.string().optional(),

  // 5-column meta dl on the hero block: Role / Year / Host / Scope / Shipped.
  // Named `brief` rather than `meta` to avoid collision with @nuxt/content's
  // reserved page-meta field (which auto-binds to <head> meta tags).
  brief: z
    .object({
      role: z.string(),
      year: z.string(),
      host: z.string(),
      scope: z.string(),
      shipped: z.string(),
    })
    .optional(),

  problem: z.array(z.string()).optional(),

  role: z
    .object({
      led: z.array(z.string()),
      contributed: z.array(z.string()),
      notTouched: z.array(z.string()),
      team: z.string(),
    })
    .optional(),

  approach: z
    .array(
      z.object({
        label: z.string(),
        title: z.string(),
        prose: z.array(z.string()),
        artifacts: z
          .array(
            z.object({
              src: z.string().optional(),
              alt: z.string(),
              caption: z.string(),
              decision: z.string(),
              width: z.enum(['full', 'wide', 'inset', 'half']),
            }),
          )
          .optional(),
      }),
    )
    .optional(),

  outcome: z.array(z.string()).optional(),
  reflection: z.string().optional(),

  gallery: z
    .array(
      z.object({
        src: z.string().optional(),
        alt: z.string(),
        caption: z.string(),
      }),
    )
    .optional(),

  // Resources section: outbound links + one click-to-load video facade.
  // Each item is either a link row (pdf/github/demo/web) or a video. A video
  // needs exactly one source: a self-hosted `src`, OR `provider` + `id`.
  resources: z
    .array(
      z.union([
        z.object({
          type: z.enum(['pdf', 'github', 'demo', 'web']),
          title: z.string(),
          url: z.string(),
        }),
        z
          .object({
            type: z.literal('video'),
            title: z.string(),
            poster: z.string(),
            src: z.string().optional(),
            provider: z.enum(['youtube', 'vimeo']).optional(),
            id: z.string().optional(),
          })
          .refine(
            (v) => (v.src ? !v.provider && !v.id : !!v.provider && !!v.id),
            {
              message:
                'video resource needs either `src` or both `provider` and `id`, not both',
            },
          ),
      ]),
    )
    .optional(),

  // One canonical card per study, used by the "More work" prev/next on
  // neighbouring pages. Order lives in app/data/workChain.ts. `image` is
  // omitted for studies without a public/images/work/<slug>/adjacent.jpg.
  card: z
    .object({
      title: z.string(),
      image: z.string().optional(),
      alt: z.string(),
    })
    .optional(),
})

export default defineContentConfig({
  collections: {
    work_en: defineCollection({
      type: 'page',
      source: { include: 'en/work/*.md', prefix: '/work' },
      schema: workSchema,
    }),
    work_fr: defineCollection({
      type: 'page',
      source: { include: 'fr/work/*.md', prefix: '/work' },
      schema: workSchema,
    }),
  },
})
