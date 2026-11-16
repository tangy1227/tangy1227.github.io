import { useCallback, useSyncExternalStore } from 'react'

/** Live result of a CSS media query, e.g. `useMediaQuery('(hover: hover)')`. */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (cb: () => void) => {
      const m = window.matchMedia(query)
      m.addEventListener('change', cb)
      return () => m.removeEventListener('change', cb)
    },
    [query],
  )
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false)
}

/** Mouse or trackpad (hover-capable, precise pointer). */
export const FINE_POINTER = '(hover: hover) and (pointer: fine)'
