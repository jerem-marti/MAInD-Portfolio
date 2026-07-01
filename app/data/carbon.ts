export interface CarbonMeasurement {
  /** Fallback grams of CO₂ per view (homepage snapshot). */
  co2Grams: number
  /** Fallback "cleaner than N%" percentile (whole number, e.g. 90). */
  cleanerThanPct: number
  /** Live Website Carbon report for the domain (link target). */
  reportUrl: string
}

// Baked fallback shown on SSR / no-JS / first paint. From the 2026-06-30 Website
// Carbon report (rating A, green-hosted; only the two figures below are shown).
// The component upgrades co2/percent to the current page's live value on the
// client. Re-recording later is a one-line edit here.
export const carbon: CarbonMeasurement = {
  co2Grams: 0.05,
  cleanerThanPct: 90,
  reportUrl: 'https://www.websitecarbon.com/website/jeremymartin-ch/',
}
