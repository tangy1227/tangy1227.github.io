import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const socials = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'YouTube', href: 'https://youtube.com' },
]

const EMAIL = 'owentang1227@gmail.com'

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" ref={ref} className="px-6 md:px-10 pt-24 md:pt-32 pb-10 border-t border-[#e3e2dc]">
      <div className="max-w-7xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="eyebrow mb-8"
        >
          Contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="display text-[clamp(2.5rem,9vw,7rem)] mb-10"
        >
          Let's<br />get in touch.
        </motion.h2>

        <motion.a
          href={`mailto:${EMAIL}`}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="group inline-flex items-center gap-3 font-display font-semibold text-2xl md:text-4xl hover:text-[#ffb800] transition-colors"
        >
          {EMAIL}
          <span className="group-hover:translate-x-2 transition-transform">↗</span>
        </motion.a>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-16 border-t border-[#e3e2dc] pt-8 flex flex-wrap gap-x-10 gap-y-4"
        >
          {socials.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="font-display font-semibold text-sm uppercase tracking-wider link-underline"
            >
              {s.label}
            </a>
          ))}
        </motion.div>

        {/* Footer line */}
        <div className="mt-20 flex flex-col md:flex-row justify-between gap-3 text-xs text-[#9a9a93] font-display uppercase tracking-wider">
          <span>© {new Date().getFullYear()} Yilong Tang</span>
          <span>Academia · Music · Photography</span>
        </div>
      </div>
    </section>
  )
}
