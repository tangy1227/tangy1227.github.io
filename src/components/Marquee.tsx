import type { CSSProperties } from 'react'

type Props = {
  items: string[]
  /** Seconds for one full loop. */
  duration?: number
  className?: string
}

/**
 * Infinite CSS marquee ribbon. Content is duplicated so the loop is seamless;
 * pauses on hover; static under prefers-reduced-motion.
 */
export default function Marquee({ items, duration = 38, className = '' }: Props) {
  const row = items.map((item, i) => (
    <span key={i} className="marquee-item">
      {item}
      <span className="marquee-dot" aria-hidden="true" />
    </span>
  ))
  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div className="marquee-track" style={{ '--duration': `${duration}s` } as CSSProperties}>
        {row}
        {row}
      </div>
    </div>
  )
}
