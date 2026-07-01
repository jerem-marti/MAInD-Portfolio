<script setup lang="ts">
import { carbon } from '~/data/carbon'

const { t, locale } = useI18n()

// Figures are reactive and seeded from the baked homepage snapshot, so SSR /
// no-JS render real values. Task 5 upgrades them to the current page's live
// figure after mount.
const co2 = ref(carbon.co2Grams)
const cleanerThanPct = ref(carbon.cleanerThanPct)

// Locale-aware formatting: EN "0.05" / "90%", FR "0,05" / "90 %".
const co2Display = computed(() =>
  new Intl.NumberFormat(locale.value, { maximumFractionDigits: 2 }).format(co2.value),
)
const percentDisplay = computed(() =>
  new Intl.NumberFormat(locale.value, { style: 'percent', maximumFractionDigits: 0 }).format(
    cleanerThanPct.value / 100,
  ),
)

// --- Live per-page upgrade (client only) ------------------------------------
// Mirror the official badge: one call per URL per day, cached in localStorage.
// The /b endpoint returns { c: grams, p: percentile } on success, or an error
// object otherwise. Any failure leaves the baked fallback in place.
const CACHE_TTL = 864e5 // 24h, matching the official badge

interface CarbonApiResult {
  c: number
  p: number
}

function applyResult(r: CarbonApiResult) {
  co2.value = r.c
  cleanerThanPct.value = r.p
}

function readCache(key: string): CarbonApiResult | null {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const v = JSON.parse(raw)
    if (
      typeof v?.c === 'number' &&
      typeof v?.p === 'number' &&
      typeof v?.t === 'number' &&
      Date.now() - v.t < CACHE_TTL
    ) {
      return { c: v.c, p: v.p }
    }
  } catch {
    // corrupt/blocked storage → ignore, fall through to fetch
  }
  return null
}

onMounted(async () => {
  const href = window.location.href
  const key = `wcb_${encodeURIComponent(href)}`

  const cached = readCache(key)
  if (cached) {
    applyResult(cached)
    return
  }

  try {
    const res = await fetch(`https://api.websitecarbon.com/b?url=${encodeURIComponent(href)}`)
    if (!res.ok) return
    const data = await res.json()
    if (typeof data?.c === 'number' && typeof data?.p === 'number') {
      applyResult({ c: data.c, p: data.p })
      try {
        localStorage.setItem(key, JSON.stringify({ c: data.c, p: data.p, t: Date.now() }))
      } catch {
        // storage full/blocked → the value still shows this session
      }
    }
    // else: error payload (e.g. un-indexed page "Service temporarily
    // unavailable") → keep the baked fallback silently.
  } catch {
    // network/CORS/offline → keep the baked fallback silently.
  }
})
</script>

<template>
  <div class="col-span-12 border-t border-brand-hairline pt-6">
    <p class="flex items-center gap-2 font-mono uppercase tracking-[0.08em] text-[11px] text-brand-ink-muted">
      <!-- Leaf mark (Lucide "leaf"), decorative. Inherits the muted ink color. -->
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        class="size-3 shrink-0"
      >
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
      <span>
        {{ t('footer.carbon.line', { co2: co2Display, percent: percentDisplay }) }}
        <span aria-hidden="true"> · </span>
        <a
          :href="carbon.reportUrl"
          :aria-label="t('footer.carbon.report')"
          target="_blank"
          rel="noopener"
          class="text-brand-ink-muted hover:text-brand-ink transition-colors"
        >Website Carbon<!-- Lucide ArrowUpRight --><svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          class="inline-block size-3 shrink-0 ml-1 align-[-0.15em]"
        ><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg></a>
      </span>
    </p>
  </div>
</template>
