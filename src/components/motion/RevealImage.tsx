import { useRef, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { EASE_IN_OUT_SOFT, EASE_OUT_EXPO } from '../../lib/motion'

type Props = {
  children: ReactNode
  className?: string
  show?: boolean
  delay?: number
  /** Stretch to the parent's height (for grid tiles with row spans / fixed heights). */
  fill?: boolean
}

/**
 * Media reveal: the tile un-clips from the bottom while its content settles
 * from a slight zoom, and an accent plate wipes upward off it.
 */
export default function RevealImage({ children, className = '', show, delay = 0, fill = false }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const visible = show ?? inView

  const h = fill ? 'h-full' : ''
  if (reduce) return <div className={`${h} ${className}`}>{children}</div>

  return (
    <div ref={ref} className={`relative ${h} ${className}`}>
      <motion.div
        className={`relative ${h}`}
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        animate={visible ? { clipPath: 'inset(0% 0 0 0)' } : undefined}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay }}
      >
        <motion.div
          className={`${h} will-change-transform`}
          initial={{ scale: 1.18 }}
          animate={visible ? { scale: 1 } : undefined}
          transition={{ duration: 1.3, ease: EASE_OUT_EXPO, delay }}
        >
          {children}
        </motion.div>
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 origin-top bg-[var(--accent)]"
          initial={{ scaleY: 1 }}
          animate={visible ? { scaleY: 0 } : undefined}
          transition={{ duration: 0.7, ease: EASE_IN_OUT_SOFT, delay: delay + 0.3 }}
        />
      </motion.div>
    </div>
  )
}
