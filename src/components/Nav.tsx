import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import RollText from './motion/RollText'
import Magnetic from './motion/Magnetic'
import { useLenis } from '../lib/lenis'
import { socials } from '../data/links'
import { EASE_OUT_EXPO } from '../lib/motion'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Academia', href: '#academia' },
  { label: 'Music', href: '#music' },
  { label: 'Photography', href: '#photography' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const lenis = useLenis()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const lastY = useRef(0)
  const { scrollY } = useScroll()

  // Compact the bar once scrolled; tuck it away on scroll-down, bring it
  // back on scroll-up.
  useMotionValueEvent(scrollY, 'change', y => {
    setScrolled(y > 40)
    const dy = y - lastY.current
    if (y > 200 && dy > 4) setHidden(true)
    else if (dy < -4 || y <= 200) setHidden(false)
    if (y < 120) setActive('')
    lastY.current = y
  })

  useEffect(() => {
    const sections = links.map(l => document.querySelector(l.href))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(`#${e.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    sections.forEach(s => s && observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Freeze the page while the mobile menu is open. Only ever *stop* here and
  // restore on cleanup, so this never overrides the intro's own scroll lock.
  useEffect(() => {
    if (!lenis || !open) return
    lenis.stop()
    return () => lenis.start()
  }, [lenis, open])

  const goTo = (href: string) => {
    setOpen(false)
    lenis?.start()
    lenis?.scrollTo(href, { duration: 1.4, easing: t => 1 - Math.pow(1 - t, 4) })
  }

  return (
    <>
      <motion.nav
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-500 ${
          open
            ? 'border-transparent text-[#fafaf8]'
            : scrolled
              ? 'bg-[#fafaf8]/85 backdrop-blur-md border-[#e3e2dc] text-[#0a0a0a]'
              : 'border-transparent text-[#0a0a0a]'
        }`}
      >
        <div
          className={`flex items-center justify-between px-6 md:px-10 transition-[padding] duration-500 ease-[cubic-bezier(.19,1,.22,1)] ${
            scrolled && !open ? 'py-3' : 'py-5'
          }`}
        >
          {/* Name */}
          <a
            href="#top"
            className="group font-display font-bold uppercase tracking-tight text-lg text-current"
            onClick={open ? e => { e.preventDefault(); goTo('#top') } : undefined}
          >
            <RollText text="Yilong Tang" />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.slice(0, -1).map(link => {
              const isActive = active === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`group relative py-1 font-display text-xs font-semibold uppercase tracking-[0.16em] transition-colors duration-500 ${
                    isActive ? 'text-[#0a0a0a]' : 'text-[#0a0a0a]/65 hover:text-[#0a0a0a]'
                  }`}
                >
                  <RollText text={link.label} />
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-[#ffb800]"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                </a>
              )
            })}
            <Magnetic strength={0.35}>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.12em] px-4 py-2 border border-[#0a0a0a] rounded-full transition-colors duration-500 ease-[cubic-bezier(.19,1,.22,1)] hover:bg-[#0a0a0a] hover:text-[#fafaf8]"
              >
                <RollText text="Contact" />
              </a>
            </Magnetic>
          </div>

          {/* Mobile toggle */}
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
            className="md:hidden flex flex-col gap-1.5 p-1 text-current"
          >
            <span className={`ham-bar ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`ham-bar ${open ? 'opacity-0' : ''}`} />
            <span className={`ham-bar ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile full-screen menu — ellipse clip reveal from the top edge. */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            className="fixed inset-0 z-40 md:hidden flex flex-col justify-end bg-[#0a0a0a] text-[#fafaf8] px-6 pb-10 pt-24"
            initial={{ clipPath: 'ellipse(160% 0% at 50% 0%)' }}
            animate={{ clipPath: 'ellipse(160% 130% at 50% 0%)' }}
            exit={{ clipPath: 'ellipse(160% 0% at 50% 0%)' }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          >
            <nav className="flex flex-col">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={e => { e.preventDefault(); goTo(link.href) }}
                  className="group flex items-baseline gap-4 py-2 display text-[2.6rem] leading-none"
                  initial={{ y: 48, opacity: 0 }}
                  animate={{ y: 0, opacity: 1, transition: { delay: 0.18 + i * 0.06, duration: 0.8, ease: EASE_OUT_EXPO } }}
                  exit={{ y: 24, opacity: 0, transition: { duration: 0.3 } }}
                >
                  <span className="font-display text-xs font-semibold tracking-[0.2em] text-[#ffb800] tabular-nums">
                    0{i + 1}
                  </span>
                  <span className={active === link.href ? 'text-[#ffb800]' : ''}>{link.label}</span>
                </motion.a>
              ))}
            </nav>
            <motion.div
              className="mt-10 pt-6 border-t border-white/15 flex flex-wrap gap-x-6 gap-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.6 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group font-display text-xs font-semibold uppercase tracking-[0.16em] text-[#fafaf8]/70"
                >
                  <RollText text={s.label} />
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
