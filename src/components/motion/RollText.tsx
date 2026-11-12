import type { CSSProperties } from 'react'

type Props = {
  text: string
  className?: string
}

/**
 * Character "roll" hover — the OFF+BRAND button/nav eye-candy.
 * Each character is stacked on top of a duplicate (via ::after). When any
 * ancestor with the `group` class (or the element itself with `roll-hover`)
 * is hovered, the characters slide up one line with a per-character delay,
 * so the label ripples out and its copy ripples in from below. Pure CSS.
 */
export default function RollText({ text, className = '' }: Props) {
  return (
    <span className={`roll ${className}`}>
      <span className="sr-only">{text}</span>
      <span className="roll-track" aria-hidden="true">
        {Array.from(text).map((ch, i) => {
          const c = ch === ' ' ? ' ' : ch
          return (
            <span
              key={i}
              className="roll-char"
              data-char={c}
              style={{ '--i': i } as CSSProperties}
            >
              {c}
            </span>
          )
        })}
      </span>
    </span>
  )
}
