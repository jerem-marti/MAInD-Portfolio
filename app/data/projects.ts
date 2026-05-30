/**
 * Controlled vocabulary for Index list tags (CLAUDE.md). Apply consistently;
 * keep each row to 2-4 tags from this set.
 */
export const indexTags = [
  'UX research',
  'Interaction design',
  'Prototyping',
  'Information architecture',
  'UX writing',
  'Design systems',
  'Accessibility',
  'Tangible interface',
  'Front-end build',
  'Brand / Editorial',
  'AI evaluation',
  'Hardware',
] as const

export type IndexTag = (typeof indexTags)[number]

export type IndexRow = {
  num: string
  title: string
  /** 2-4 tags from `indexTags`. TypeScript enforces vocabulary membership. */
  tags: readonly IndexTag[]
  year: string
  /** Internal route (e.g. /work/<slug>) or external URL. Omit for non-linked rows. */
  href?: string
  /** Path under public/images/index/ for the desktop hover preview. Omit until uploaded. */
  preview?: string
  /** Real alt text for the hover-preview image. Required even before Phase 5 images land. */
  alt?: string
}

export const projects: readonly IndexRow[] = [
  {
    num: '01',
    title: 'Energy interface prototype',
    tags: ['Tangible interface', 'UX research'],
    year: '2025',
    href: '/work/household-energy-interface',
    alt: 'Oak enclosure prototype on a workbench beside calibration notes.',
  },
  {
    num: '02',
    title: 'Festival visual identity',
    tags: ['Brand / Editorial'],
    year: '2024',
    alt: 'Festival poster grid pinned to a wall, showing variations on the wordmark.',
  },
  {
    num: '03',
    title: 'Confidential fintech work',
    tags: ['UX research', 'Interaction design'],
    year: '2024',
  },
  {
    num: '04',
    title: 'Scrollytelling data piece',
    tags: ['Front-end build', 'Brand / Editorial'],
    year: '2024',
    alt: 'A long-form web layout with linked annotations following the reader down the page.',
  },
  {
    num: '05',
    title: 'Personal data dashboard',
    tags: ['Information architecture', 'Front-end build'],
    year: '2023',
    alt: 'A spare grid dashboard rendered in monospace with weekly time series.',
  },
  {
    num: '06',
    title: 'Festival presidency materials',
    tags: ['Brand / Editorial', 'Information architecture'],
    year: '2023',
  },
  {
    num: '07',
    title: 'Open-source tool docs',
    tags: ['Information architecture', 'UX writing'],
    year: '2023',
    alt: 'A documentation site with quickstart on the left and live code samples on the right.',
  },
  {
    num: '08',
    title: 'Wearable hardware exploration',
    tags: ['Hardware', 'Prototyping'],
    year: '2022',
    alt: 'A bench full of PCB iterations beside a notebook of skin-contact sketches.',
  },
] as const
