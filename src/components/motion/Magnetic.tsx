import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

type Props = {
  children: ReactNode
  /** How far the element follows the cursor (0–1). */
  strength?: number
  className?: string
}

/**
 * Magnetic hover: the wrapped element leans toward the cursor while hovered
 * and springs back on leave. Only active on fine pointers (mouse/trackpad).
 */
export default function Magnetic({ children, strength = 0.3, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const spring = { stiffness: 200, damping: 16, mass: 0.25 }
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}
