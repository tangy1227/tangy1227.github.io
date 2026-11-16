import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { setLenisInstance } from '../lib/lenis'

// How far the page eases toward each scroll target per frame (0–1). Higher is
// more direct. A trackpad already glides on its own, so heavy smoothing on top
// of it reads as lag; a stepped mouse wheel needs smoothing to feel fluid.
// ≈ trails input by 0.12s on a trackpad, 0.33s on a wheel. Tune to taste.
const TRACKPAD_LERP = 0.28
const WHEEL_LERP = 0.115

type LegacyWheel = WheelEvent & { wheelDeltaY?: number }

// Trackpads send many small continuous deltas; wheels send fixed steps.
// Chrome/Safari: a trackpad's legacy wheelDeltaY is exactly -3× deltaY.
// Firefox: wheels report in lines (deltaMode 1), trackpads in fractional pixels.
function isTrackpad(e: LegacyWheel) {
  if (typeof e.wheelDeltaY === 'number' && e.wheelDeltaY !== 0) return e.wheelDeltaY === -3 * e.deltaY
  return e.deltaMode === 0 && !Number.isInteger(e.deltaY)
}

// Lenis gives the whole page the "heavy, buttery" scroll feel landonorris.com
// has. Native scroll events still fire, so framer-motion's useScroll /
// useInView keep working untouched.
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Always start at the top so the intro + hero reveal are seen on reload.
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)

    const lenis: Lenis = new Lenis({
      lerp: WHEEL_LERP,
      smoothWheel: true,
      autoRaf: true,
      // In-page anchors (nav, hero buttons) glide instead of jumping.
      anchors: { duration: 1.4, easing: (t: number) => 1 - Math.pow(1 - t, 4) },
      respectReducedMotion: true,
      // Runs before Lenis reads `options.lerp` for each input event, so the
      // smoothing can follow the device. Unknown input keeps the wheel value.
      virtualScroll: ({ event }) => {
        if (event instanceof WheelEvent) lenis.options.lerp = isTrackpad(event) ? TRACKPAD_LERP : WHEEL_LERP
        return true
      },
    })
    setLenisInstance(lenis)
    return () => {
      lenis.destroy()
      setLenisInstance(null)
    }
  }, [])

  return <>{children}</>
}
