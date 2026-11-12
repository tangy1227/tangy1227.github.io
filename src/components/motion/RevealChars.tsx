import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { CHAR_STAGGER, EASE_OUT_EXPO } from '../../lib/motion'

type Props = {
  text: string
  className?: string
  show?: boolean
  delay?: number
}

/**
 * Small-text reveal: characters slide up out of a clipped box with a tiny
 * stagger. Used for eyebrows and labels.
 */
export default function RevealChars({ text, className = '', show, delay = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' })
  const reduce = useReducedMotion()
  const visible = show ?? inView

  if (reduce) return <span className={className}>{text}</span>

  return (
    <span ref={ref} className={`inline-flex overflow-hidden ${className}`}>
      <span className="sr-only">{text}</span>
      {Array.from(text).map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block will-change-transform"
          initial={{ y: '110%' }}
          animate={visible ? { y: '0%' } : undefined}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: delay + i * CHAR_STAGGER }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </span>
  )
}
