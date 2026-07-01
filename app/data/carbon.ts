export interface CarbonMeta {
  /** Live Website Carbon report for the domain (link target). */
  reportUrl: string
}

// The badge fetches each page's live CO₂ figure client-side from Website Carbon
// (per-page); this holds only the domain-level report link the badge points to.
export const carbon: CarbonMeta = {
  reportUrl: 'https://www.websitecarbon.com/website/jeremymartin-ch/',
}
