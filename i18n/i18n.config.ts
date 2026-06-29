// Vue I18n runtime behavior only (no messages here — those are the lazy
// per-locale catalogs under i18n/locales/*.json). `legacy: false` selects the
// Composition API; `fallbackLocale: 'en'` means any key missing from the French
// catalog falls back to the English string rather than rendering the raw key.
export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: 'en',
}))
