import { useRef, useState } from 'react'
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
 * stagger. Used for eyebrows and labels. Once the last character lands it
 * swaps to plain text, so the label can wrap, copies cleanly and stops
 * holding one compositor layer per character.
 */
export default function RevealChars({ text, className = '', show, delay = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' })
  const reduce = useReducedMotion()
  const [done, setDone] = useState(false)
  const visible = show ?? inView

  if (reduce || done) return <span className={className}>{text}</span>

  const chars = Array.from(text)
  return (
    <span ref={ref} className={`inline-flex overflow-hidden ${className}`}>
      <span className="sr-only">{text}</span>
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block"
          initial={{ y: '110%' }}
          animate={visible ? { y: '0%' } : undefined}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: delay + i * CHAR_STAGGER }}
          onAnimationComplete={i === chars.length - 1 && visible ? () => setDone(true) : undefined}
        >
          {ch === ' ' ? '\u00a0' : ch}
        </motion.span>
      ))}
    </span>
  )
}
