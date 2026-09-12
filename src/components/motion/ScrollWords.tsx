import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'

export type Token = { text: string; strong?: boolean }

type Props = {
  tokens: Token[]
  className?: string
  strongClassName?: string
}

function Word({
  word,
  strong,
  progress,
  range,
  strongClassName,
}: {
  word: string
  strong?: boolean
  progress: MotionValue<number>
  range: [number, number]
  strongClassName: string
}) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return (
    <motion.span style={{ opacity }} className={strong ? strongClassName : undefined}>
      {word}{' '}
    </motion.span>
  )
}

/**
 * Scroll-scrubbed paragraph: each word brightens as the paragraph moves
 * through the viewport, so the copy "reads itself" as you scroll.
 */
export default function ScrollWords({ tokens, className = '', strongClassName = '' }: Props) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.45'] })

  const words = tokens.flatMap(t =>
    t.text
      .split(' ')
      .filter(Boolean)
      .map(w => ({ w, strong: t.strong }))
  )

  if (reduce) {
    return (
      <p className={className}>
        {tokens.map((t, i) => (
          <span key={i} className={t.strong ? strongClassName : undefined}>
            {t.text}
          </span>
        ))}
      </p>
    )
  }

  const n = words.length
  return (
    <p ref={ref} className={className}>
      {words.map((item, i) => (
        <Word
          key={i}
          word={item.w}
          strong={item.strong}
          progress={scrollYProgress}
          range={[i / n, Math.min(1, (i + 2) / n)]}
          strongClassName={strongClassName}
        />
      ))}
    </p>
  )
}
