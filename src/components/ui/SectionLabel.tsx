import RevealChars from '../motion/RevealChars'

/**
 * Numbered section eyebrow ("— 01 About"). The numbers follow the mobile
 * menu's order (About 01 … Contact 05).
 */
export default function SectionLabel({ n, text, className = '' }: { n: number; text: string; className?: string }) {
  return (
    <p className={`eyebrow ${className}`}>
      <RevealChars text={String(n).padStart(2, '0')} className="text-ink tabular-nums" />
      <RevealChars text={text} delay={0.06} />
    </p>
  )
}
