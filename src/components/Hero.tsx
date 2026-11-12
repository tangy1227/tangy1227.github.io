import { useEffect, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import RevealLines from './motion/RevealLines'
import RevealChars from './motion/RevealChars'
import RevealImage from './motion/RevealImage'
import Button from './ui/Button'
import { EASE_OUT_EXPO } from '../lib/motion'

// Bottom photo strip — replace each block with a real <img> later
const strip = [
  { label: 'Studio' },
  { label: 'Live set' },
  { label: 'Field' },
  { label: 'Lab' },
]

/**
 * The hero is `position: sticky` at the top of <main>. Every later section
 * is `.section` (relative, z-10, opaque) so they slide over it. Meanwhile the
 * first viewport of scroll scrubs the headline down in scale and opacity —
 * the "text zooms out as you scroll" move from landonorris.com.
 */
export default function Hero({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const [vh, setVh] = useState(900)

  useEffect(() => {
    const measure = () => setVh(window.innerHeight)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Headline block: shrink + lift + fade over ~one viewport of scroll.
  const scale = useTransform(scrollY, [0, vh * 0.9], [1, 0.84])
  const y = useTransform(scrollY, [0, vh * 0.9], [0, -vh * 0.14])
  const opacity = useTransform(scrollY, [0, vh * 0.65], [1, 0])
  const visibility = useTransform(opacity, v => (v <= 0.01 ? 'hidden' : 'visible'))
  // Photo strip: slower parallax so it separates from the text.
  const stripY = useTransform(scrollY, [0, vh], [0, -vh * 0.28])
  const stripOpacity = useTransform(scrollY, [0, vh * 0.8], [1, 0])
  const hintOpacity = useTransform(scrollY, [0, 120], [1, 0])

  const textStyle = reduce ? undefined : { scale, y, opacity, visibility }
  const stripStyle = reduce ? undefined : { y: stripY, opacity: stripOpacity }

  return (
    <section
      id="top"
      className="sticky top-0 z-0 h-svh flex flex-col justify-between overflow-hidden pt-24 md:pt-28 pb-8 px-6 md:px-10"
    >
      <motion.div
        style={textStyle}
        className="flex-1 min-h-0 flex flex-col justify-center-safe max-w-7xl mx-auto w-full origin-[50%_65%] will-change-transform"
      >
        <p className="eyebrow mb-5 md:mb-7">
          <RevealChars text="Yilong Tang — Atlanta, GA" show={ready} delay={0.15} />
        </p>

        <RevealLines
          as="h1"
          show={ready}
          delay={0.25}
          className="display hero-title mb-5 md:mb-7"
          lines={[
            'Academia.',
            'Music.',
            { content: 'Photography.', className: 'accent', bar: 'var(--ink)' },
          ]}
        />

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.8 }}
          className="text-muted text-lg md:text-2xl font-light max-w-2xl leading-snug mb-7 md:mb-9"
        >
          Music tech researcher. Producer and photographer on the side.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.95 }}
          className="flex flex-wrap gap-3"
        >
          <Button href="#academia" magnetic>View work</Button>
          <Button href="#contact" variant="outline" magnetic>Get in touch</Button>
        </motion.div>
      </motion.div>

      {/* Photo strip */}
      <motion.div
        style={stripStyle}
        className="hero-strip-wrap max-w-7xl mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 will-change-transform"
      >
        {strip.map((item, i) => (
          <RevealImage key={item.label} show={ready} delay={1 + i * 0.08} className="hero-strip" fill>
            {/* TODO: replace with real photo */}
            <div className="photo h-full w-full flex items-end">
              <span className="relative z-10 p-3 text-xs font-display font-semibold uppercase tracking-widest text-white/90 mix-blend-difference">
                {item.label}
              </span>
            </div>
          </RevealImage>
        ))}
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        style={reduce ? undefined : { opacity: hintOpacity }}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="pointer-events-none absolute bottom-3 right-6 md:right-10 hidden md:flex items-center gap-3 font-display text-[10px] font-semibold uppercase tracking-[0.3em] text-muted"
      >
        Scroll <span className="scroll-line" />
      </motion.div>
    </section>
  )
}
