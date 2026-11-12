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

/** The live Lenis instance, or null before mount / after unmount. */
export function useLenis(): Lenis | null {
  return useSyncExternalStore(subscribe, () => instance, () => null)
}
