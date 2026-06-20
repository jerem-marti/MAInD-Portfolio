/**
 * Case-study "Resources" section — shared types and helpers.
 *
 * A resource is either a link row (pdf / github / demo / web) or a video that
 * renders as a click-to-load facade. The Zod schema in `content.config.ts` is the
 * source of truth for validation; these types mirror it for the components.
 */

export type LinkResourceType = 'pdf' | 'github' | 'demo' | 'web'
export type ResourceType = LinkResourceType | 'video'

export interface LinkResource {
  type: LinkResourceType
  title: string
  /** External URL or a path under public/ (e.g. /files/thesis.pdf). Opens in a new tab. */
  url: string
}

export interface VideoResource {
  type: 'video'
  title: string
  /** Poster image shown at rest, under public/. */
  poster: string
  /** Self-hosted file under public/ (e.g. /videos/x.mp4). Mutually exclusive with provider+id. */
  src?: string
  provider?: 'youtube' | 'vimeo'
  id?: string
}

export type Resource = LinkResource | VideoResource

/** Mono type-tag label per type. Rendered uppercase via the `uppercase` class. */
export const RESOURCE_TAG: Record<ResourceType, string> = {
  pdf: 'PDF',
  github: 'GitHub',
  demo: 'Demo',
  video: 'Video',
  web: 'Web',
}

/**
 * Privacy-respecting embed URL for a provider-backed video. youtube-nocookie and
 * Vimeo's `dnt=1` avoid setting cookies until the visitor actually plays.
 * Returns undefined for self-hosted videos (which use `src` directly).
 */
export function resourceEmbedUrl(video: VideoResource): string | undefined {
  if (!video.id) return undefined
  if (video.provider === 'youtube')
    return `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`
  if (video.provider === 'vimeo')
    return `https://player.vimeo.com/video/${video.id}?autoplay=1&dnt=1`
  return undefined
}
