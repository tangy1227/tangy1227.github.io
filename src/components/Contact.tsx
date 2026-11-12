import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import RevealLines from './motion/RevealLines'
import RevealChars from './motion/RevealChars'
import RollText from './motion/RollText'
import Magnetic from './motion/Magnetic'
import { ArrowSwap } from './ui/Button'
import { links, socials } from '../data/links'
import { EASE_OUT_EXPO } from '../lib/motion'

const EMAIL = links.email

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })

  return (
    <section id="contact" ref={ref} className="section px-6 md:px-10 pt-24 md:pt-32 pb-10 border-t border-line">
      <div className="max-w-7xl mx-auto w-full">
        <p className="eyebrow mb-8">
          <RevealChars text="Contact" />
        </p>

        <RevealLines
          className="display text-[clamp(2.5rem,9vw,7rem)] mb-10"
          lines={["Let's", 'get in touch.']}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.45 }}
        >
          <Magnetic strength={0.15}>
            <a
              href={`mailto:${EMAIL}`}
              className="group inline-flex items-center gap-3 font-display font-semibold text-2xl md:text-4xl hover:text-accent transition-colors duration-500"
            >
              <RollText text={EMAIL} />
              <ArrowSwap up size={22} />
            </a>
          </Magnetic>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 border-t border-line pt-8 flex flex-wrap gap-x-10 gap-y-4"
        >
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="group font-display font-semibold text-sm uppercase tracking-wider"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.65 + i * 0.06 }}
            >
              <RollText text={s.label} />
            </motion.a>
          ))}
        </motion.div>

        {/* Footer line */}
        <div className="mt-20 flex flex-col md:flex-row justify-between gap-3 text-xs text-faint font-display uppercase tracking-wider">
          <span>© {new Date().getFullYear()} Yilong Tang</span>
          <span>Academia · Music · Photography</span>
        </div>
      </div>
    </section>
  )
}
