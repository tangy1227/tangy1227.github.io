import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE_IN_OUT, EASE_OUT_EXPO } from '../lib/motion'
import { useLenis } from '../lib/lenis'

const HOLD_MS = 950
const EXIT_MS = 900

/**
 * Page-load curtain. A dark plate holds for a beat while an accent rule
 * draws across, then the plate slides up to unveil the hero. `onDone` fires
 * as the curtain starts lifting so the hero reveal overlaps the exit.
 */
export default function Intro({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion()
  const lenis = useLenis()
  const [phase, setPhase] = useState<'hold' | 'exit' | 'done'>(reduce ? 'done' : 'hold')

  useEffect(() => {
    if (reduce) {
      onDone()
      return
    }
    const t1 = window.setTimeout(() => {
      setPhase('exit')
      onDone()
    }, HOLD_MS)
    const t2 = window.setTimeout(() => setPhase('done'), HOLD_MS + EXIT_MS)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce])

  // Freeze scrolling while the curtain is up.
  useEffect(() => {
    if (!lenis) return
    if (phase === 'done') lenis.start()
    else lenis.stop()
    return () => lenis.start()
  }, [lenis, phase])

  if (phase === 'done') return null

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-end bg-[#0a0a0a] px-6 pb-8 md:px-10 md:pb-10"
      initial={{ y: '0%' }}
      animate={{ y: phase === 'exit' ? '-100%' : '0%' }}
      transition={{ duration: EXIT_MS / 1000, ease: EASE_IN_OUT }}
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex items-end justify-between gap-6 mb-5">
          <motion.span
            className="font-display font-bold uppercase tracking-tight text-[#fafaf8] text-2xl md:text-4xl"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.05 }}
          >
            Yilong Tang
          </motion.span>
          <motion.span
            className="eyebrow text-[#9a9a93] hidden sm:inline-flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            Academia · Music · Photography
          </motion.span>
        </div>
        <motion.div
          className="h-[2px] w-full origin-left bg-[#ffb800]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: (HOLD_MS - 100) / 1000, ease: EASE_OUT_EXPO }}
        />
      </div>
    </motion.div>
  )
}
