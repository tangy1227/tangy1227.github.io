import { useRef, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { EASE_IN_OUT_SOFT, EASE_OUT, LINE_STAGGER } from '../../lib/motion'

type Line =
  | ReactNode
  | {
      content: ReactNode
      className?: string
      /** Colour of the highlighter bar that wipes across this line. */
      bar?: string
    }

type Props = {
  lines: Line[]
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div'
  className?: string
  /** Control visibility externally; if omitted the component reveals when scrolled into view. */
  show?: boolean
  delay?: number
  stagger?: number
  /** Default highlighter colour. */
  bar?: string
}

function isRich(line: Line): line is { content: ReactNode; className?: string; bar?: string } {
  return typeof line === 'object' && line !== null && 'content' in (line as object)
}

/**
 * Line-by-line headline reveal. Each line is clip-path'd open from the left
 * while an accent "highlighter" bar covers it, then the bar retreats to the
 * right — the same recipe OFF+BRAND use for landonorris.com titles.
 */
export default function RevealLines({
  lines,
  as = 'h2',
  className = '',
  show,
  delay = 0,
  stagger = LINE_STAGGER,
  bar = 'var(--accent)',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' })
  // Any of the allowed tags works at runtime; typed as one for the ref.
  const Tag = as as 'div'
  const reduce = useReducedMotion()
  const visible = show ?? inView

  const children = lines.map((line, i) => {
    const rich = isRich(line)
    const content = rich ? line.content : line
    const lineClass = rich ? line.className ?? '' : ''
    const barColor = rich && line.bar ? line.bar : bar
    const t = delay + i * stagger

    if (reduce) {
      return (
        <span key={i} className={`block ${lineClass}`}>
          {content}
        </span>
      )
    }

    return (
      <span key={i} className="block">
        <motion.span
          className={`relative block ${lineClass}`}
          initial={{ clipPath: 'inset(-0.15em 100% -0.15em 0)' }}
          animate={visible ? { clipPath: 'inset(-0.15em 0% -0.15em 0)' } : undefined}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: t }}
        >
          {content}
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 origin-right"
            style={{ background: barColor }}
            initial={{ scaleX: 1 }}
            animate={visible ? { scaleX: 0 } : undefined}
            transition={{ duration: 0.6, ease: EASE_IN_OUT_SOFT, delay: t + 0.32 }}
          />
        </motion.span>
      </span>
    )
  })

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
