import type { CSSProperties } from 'react'

type Props = {
  items: string[]
  /** Seconds for the items to scroll past once. */
  duration?: number
  className?: string
}

// The track holds two identical halves and slides by one half per loop, so a
// half must be wider than the widest screen or a blank tail shows. One pass of
// the ticker is ~1260px; three passes per half cover 2560px+ screens.
const PASSES = 3

/**
 * Infinite CSS marquee ribbon. Content is duplicated so the loop is seamless;
 * pauses on hover; static under prefers-reduced-motion.
 */
export default function Marquee({ items, duration = 38, className = '' }: Props) {
  const half = Array.from({ length: PASSES }, () => items).flat()
  const row = (copy: number) =>
    half.map((item, i) => (
      <span key={`${copy}-${i}`} className="marquee-item">
        {item}
        <span className="marquee-dot" aria-hidden="true" />
      </span>
    ))
  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div className="marquee-track" style={{ '--duration': `${duration * PASSES}s` } as CSSProperties}>
        {row(0)}
        {row(1)}
      </div>
    </div>
  )
}
