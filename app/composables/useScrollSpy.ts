/**
 * Tracks which section ID is currently in view as the user scrolls.
 * Uses VueUse's useIntersectionObserver under the hood; SSR-safe because
 * onMounted only fires client-side.
 *
 * @param ids Section element IDs in document order. The first ID is the
 *            initial active value before the observer reports anything.
 * @param rootMargin Matches the prototype's spy window (top 30% / bottom 60%
 *            of the viewport), so a section becomes active once its top edge
 *            crosses ~30% from the viewport top.
 */
export function useScrollSpy(
  ids: readonly string[],
  rootMargin = '-30% 0px -60% 0px',
) {
  const active = ref<string>(ids[0] ?? '')

  onMounted(() => {
    const stops: (() => void)[] = []
    for (const id of ids) {
      const el = document.getElementById(id)
      if (!el) continue
      const { stop } = useIntersectionObserver(
        el,
        ([entry]) => {
          if (entry?.isIntersecting) active.value = id
        },
        { rootMargin, threshold: 0 },
      )
      stops.push(stop)
    }
    onScopeDispose(() => stops.forEach((s) => s()))
  })

  return active
}
