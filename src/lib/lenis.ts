import { useSyncExternalStore } from 'react'
import type Lenis from 'lenis'

// Tiny external store so any component can read the live Lenis instance
// without a context/provider dance or setState-in-effect.
let instance: Lenis | null = null
const listeners = new Set<() => void>()

export function setLenisInstance(next: Lenis | null) {
  instance = next
  listeners.forEach(l => l())
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}

/** The live Lenis instance for non-React code (event handlers, other stores). */
export function getLenis(): Lenis | null {
  return instance
}

let holds = 0
const blockScroll = (e: Event) => {
  // Leave pinch-zoom alone.
  if (typeof TouchEvent !== 'undefined' && e instanceof TouchEvent && e.touches.length > 1) return
  e.preventDefault()
  e.stopPropagation() // keep it from reaching Lenis's own wheel listener
}
const blockOpts = { capture: true, passive: false } as const

/**
 * Freeze page scrolling: stop any glide in place and swallow wheel/touch
 * input until released. Use this instead of `lenis.stop()` for overlays,
 * because that sets `overflow: clip` on <html>, which drops the scrollbar and
 * reflows the page. Ref-counted; call the returned release function once.
 */
export function holdScroll(): () => void {
  if (instance && !instance.isStopped) instance.scrollTo(instance.animatedScroll, { immediate: true, force: true })
  if (holds++ === 0) {
    window.addEventListener('wheel', blockScroll, blockOpts)
    window.addEventListener('touchmove', blockScroll, blockOpts)
  }
  let released = false
  return () => {
    if (released) return
    released = true
    if (--holds === 0) {
      window.removeEventListener('wheel', blockScroll, blockOpts)
      window.removeEventListener('touchmove', blockScroll, blockOpts)
    }
  }
}

/** The live Lenis instance, or null before mount / after unmount. */
export function useLenis(): Lenis | null {
  return useSyncExternalStore(subscribe, () => instance, () => null)
}
