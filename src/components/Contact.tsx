import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const socials = [
  { label: 'GitHub', href: 'https://github.com', handle: '@yilongtang' },
  { label: 'LinkedIn', href: 'https://linkedin.com', handle: 'Yilong Tang' },
  { label: 'Instagram', href: 'https://instagram.com', handle: '@yilongtang' },
  { label: 'YouTube', href: 'https://youtube.com', handle: 'Yilong Tang' },
]

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" ref={ref} className="min-h-screen flex flex-col justify-center px-8 md:px-20 py-32 relative overflow-hidden">
      {/* Big background text */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-display font-black text-[20vw] text-white/[0.02] leading-none tracking-tighter whitespace-nowrap">
          CONTACT
        </span>
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-num mb-5"
        >
          06 — CONTACT
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          Let's Build
          <br />
          <span className="gradient-text">Something.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-gray-500 max-w-md mb-14 leading-relaxed"
        >
          Whether it's a research collaboration, creative project, or just a conversation about
          music tech — I'm always open to interesting problems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-16"
        >
          <a
            href="mailto:ytang@gatech.edu"
            data-hover
            className="group inline-flex items-center gap-4"
          >
            <span className="font-display text-2xl md:text-4xl font-bold text-white group-hover:text-[#00f5ff] transition-colors duration-300">
              ytang@gatech.edu
            </span>
            <span className="text-[#00f5ff] text-2xl group-hover:translate-x-2 transition-transform duration-300">↗</span>
          </a>
        </motion.div>

        {/* Socials */}
        <div className="border-t border-white/8 pt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              data-hover
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.07 }}
              className="group"
            >
              <div className="text-xs text-gray-600 font-mono-custom mb-1 uppercase tracking-widest">{s.label}</div>
              <div className="text-sm text-gray-400 group-hover:text-[#00f5ff] transition-colors hover-link">
                {s.handle}
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs text-gray-700 font-mono-custom"
        >
          <span>© 2024 Yilong Tang. All rights reserved.</span>
          <span>Designed & built from scratch.</span>
        </motion.div>
      </div>
    </section>
  )
}
