import { ArrowRight, ArrowUpRight } from 'lucide-react'
import RollText from '../motion/RollText'
import Magnetic from '../motion/Magnetic'

/**
 * Two stacked arrows in a clipped box. On `.group` hover the first exits
 * to the right (or up-right) while the duplicate slides in behind it.
 */
export function ArrowSwap({ up = false, size = 14 }: { up?: boolean; size?: number }) {
  const Icon = up ? ArrowUpRight : ArrowRight
  return (
    <span className={`btn-arrow ${up ? 'is-up' : ''}`} aria-hidden="true">
      <Icon size={size} strokeWidth={2.5} />
      <Icon size={size} strokeWidth={2.5} />
    </span>
  )
}

type Props = {
  href: string
  children: string
  variant?: 'solid' | 'outline'
  arrow?: boolean | 'up'
  magnetic?: boolean
  external?: boolean
  className?: string
}

export default function Button({
  href,
  children,
  variant = 'solid',
  arrow = true,
  magnetic = false,
  external = false,
  className = '',
}: Props) {
  const link = (
    <a
      href={href}
      className={`group ${variant === 'solid' ? 'btn' : 'btn-outline'} ${className}`}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      <RollText text={children} />
      {arrow && <ArrowSwap up={arrow === 'up'} />}
    </a>
  )
  return magnetic ? <Magnetic>{link}</Magnetic> : link
}
