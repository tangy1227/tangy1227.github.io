import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const focus = [
  'Music Information Retrieval',
  'Signal Processing',
  'Machine Learning',
  'Music Production',
  'Photography',
  'Data Science',
]

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="px-6 md:px-10 py-24 md:py-32 border-t border-[#e3e2dc]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="md:col-span-4"
        >
          <p className="eyebrow mb-6">About</p>
          <h2 className="display text-4xl md:text-5xl">
            A little<br />about me.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="md:col-span-8"
        >
          <div className="space-y-5 text-lg md:text-xl leading-relaxed text-[#3a3a37] max-w-2xl">
            <p>
              I'm a graduate student at <span className="text-[#0a0a0a] font-medium">Georgia Tech</span>{' '}
              studying Music Technology — the place where music, signal processing, and machine
              learning overlap.
            </p>
            <p>
              My research is the serious half. The other half is creative: I've been{' '}
              <span className="text-[#0a0a0a] font-medium">producing music</span> since high school and
              shooting <span className="text-[#0a0a0a] font-medium">photography</span> everywhere I go.
              All three feed each other.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-2.5">
            {focus.map(f => (
              <span key={f} className="tag">{f}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
