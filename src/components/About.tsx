import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'

const stats = [
  { num: '4', label: 'Years Piano', sub: 'started age 4' },
  { num: '5+', label: 'Languages', sub: 'Python · JS · R · Java · MATLAB' },
  { num: '2', label: 'Degrees', sub: 'Georgia Tech' },
  { num: '∞', label: 'Curiosity', sub: 'music × data' },
]

const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, delay } }
})

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="min-h-screen flex flex-col justify-center px-8 md:px-20 py-32">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-20 items-center">
        {/* Left */}
        <div>
          <motion.p
            variants={fadeUp(0)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="section-num mb-5"
          >
            02 — ABOUT
          </motion.p>

          <motion.h2
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="font-display text-5xl md:text-6xl font-bold leading-tight mb-8"
          >
            Where Sound
            <br />
            <span className="gradient-text">Meets Data.</span>
          </motion.h2>

          <motion.div
            variants={fadeUp(0.2)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="space-y-4 text-gray-400 leading-relaxed"
          >
            <p>
              I'm a second-year graduate student at <span className="text-white">Georgia Tech</span> studying Music Technology —
              a field at the crossroads of music, signal processing, and machine learning.
            </p>
            <p>
              My journey began at four years old at a piano bench. By high school I was producing music in Ableton,
              and by college I realized the same mathematical intuition behind chord progressions could unlock
              patterns hidden in audio waveforms and speech.
            </p>
            <p>
              Today I use tools like <span className="text-[#00f5ff]">PyTorch</span>, <span className="text-[#00f5ff]">librosa</span>, and{' '}
              <span className="text-[#00f5ff]">Max/MSP</span> to build systems that listen, analyze, and create.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp(0.3)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="mt-8 flex flex-wrap gap-3"
          >
            {['Music Production', 'Signal Processing', 'Deep Learning', 'Data Science', 'Audio Analysis'].map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </motion.div>
        </div>

        {/* Right — Stats */}
        <div className="grid grid-cols-2 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={fadeUp(0.1 + i * 0.08)}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="card-hover p-6 border border-white/8 bg-[#0f0f0f]"
            >
              <div className="font-display text-5xl font-bold gradient-text mb-1">{s.num}</div>
              <div className="text-white text-sm font-medium mb-1">{s.label}</div>
              <div className="text-gray-500 text-xs font-mono-custom">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
