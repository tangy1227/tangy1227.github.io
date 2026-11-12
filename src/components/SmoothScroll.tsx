import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { setLenisInstance } from '../lib/lenis'

// Lenis gives the whole page the "heavy, buttery" scroll feel — the same lerp
// (0.1) landonorris.com uses. Native scroll events still fire, so framer-motion's
// useScroll / useInView keep working untouched.
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Always start at the top so the intro + hero reveal are seen on reload.
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      autoRaf: true,
      // In-page anchors (nav, hero buttons) glide instead of jumping.
      anchors: { duration: 1.4, easing: (t: number) => 1 - Math.pow(1 - t, 4) },
      respectReducedMotion: true,
    })
    setLenisInstance(lenis)
    return () => {
      lenis.destroy()
      setLenisInstance(null)
    }
  }, [])

  return <>{children}</>
}
