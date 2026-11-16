import { useId, type MouseEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Monitor, Moon, Sun } from 'lucide-react'
import { setThemePreference, useThemePreference, type ThemePreference } from '../lib/theme'

const options: { value: ThemePreference; label: string; Icon: typeof Sun }[] = [
  { value: 'system', label: 'Match system theme', Icon: Monitor },
  { value: 'light', label: 'Light theme', Icon: Sun },
  { value: 'dark', label: 'Dark theme', Icon: Moon },
]

/**
 * Three-way theme switch (system / light / dark). Colours follow
 * `currentColor`, so it works on the nav bar in either theme and on the
 * always-dark mobile menu. The accent disc slides like the nav's active
 * underline.
 */
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const preference = useThemePreference()
  const reduce = useReducedMotion()
  const id = useId()

  const choose = (value: ThemePreference) => (e: MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setThemePreference(value, { x: r.left + r.width / 2, y: r.top + r.height / 2 })
  }

  return (
    <div
      role="group"
      aria-label="Colour theme"
      className={`inline-flex items-center gap-0.5 rounded-full border border-current/20 p-[3px] ${className}`}
    >
      {options.map(({ value, label, Icon }) => {
        const active = preference === value
        return (
          <button
            key={value}
            type="button"
            aria-label={label}
            aria-pressed={active}
            title={label}
            onClick={choose(value)}
            // Touch: a 32px button whose ::before stretches the hit area to 44px tall.
            className={`relative grid size-[26px] pointer-coarse:size-8 place-items-center rounded-full before:absolute before:-inset-y-1.5 before:inset-x-0 before:content-[''] pointer-fine:before:hidden transition-[color,opacity] duration-500 ease-[cubic-bezier(.19,1,.22,1)] ${
              active ? 'text-on-accent' : 'opacity-60 hover:opacity-100'
            }`}
          >
            {active && (
              <motion.span
                layoutId={`theme-${id}`}
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-accent"
                transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <Icon size={14} strokeWidth={2.25} className="relative" aria-hidden="true" />
          </button>
        )
      })}
    </div>
  )
}
