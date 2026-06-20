import { defineCollection, defineContentConfig, z } from '@nuxt/content'

/**
 * Featured case studies. Each markdown lives at `content/work/<slug>.md` and resolves
 * to `/work/<slug>` via `pages/work/[slug].vue`. Body is unused — the page renders
 * structured frontmatter directly. `status: 'in-progress'` slugs only need title,
 * summary, status, and heroAlt; the page shows a "case study in progress" stub.
 */
export default defineContentConfig({
  collections: {
    work: defineCollection({
      type: 'page',
      source: 'work/*.md',
      schema: z.object({
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

        prev: z
          .object({
            slug: z.string(),
            title: z.string(),
            image: z.string().optional(),
            alt: z.string(),
          })
          .optional(),

        next: z
          .object({
            slug: z.string(),
            title: z.string(),
            image: z.string().optional(),
            alt: z.string(),
          })
          .optional(),
      }),
    }),
  },
})
