import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const categories = [
  {
    title: 'Languages',
    icon: '{ }',
    items: ['Python', 'JavaScript', 'MATLAB', 'R', 'Java', 'SQL', 'HTML/CSS'],
  },
  {
    title: 'ML / Data',
    icon: '⚡',
    items: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'NumPy', 'SciPy', 'pandas', 'Hadoop'],
  },
  {
    title: 'Audio & Music',
    icon: '♪',
    items: ['librosa', 'Max/MSP', 'Logic Pro X', 'Ableton Live', 'D3.js', 'Signal Processing'],
  },
  {
    title: 'Tools & Platforms',
    icon: '◈',
    items: ['AWS', 'GCP', 'Git', 'Photoshop', 'Matplotlib', 'Jupyter'],
  },
]

export default function Skills() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" ref={ref} className="min-h-screen flex flex-col justify-center px-8 md:px-20 py-32 bg-[#0a0a0a]">
      {/* Marquee skills ticker */}
      <div className="overflow-hidden border-y border-white/5 py-4 mb-20">
        <div className="marquee-track text-[#00f5ff]/30 font-mono-custom text-sm tracking-widest uppercase">
          {[...categories.flatMap(c => c.items), ...categories.flatMap(c => c.items)].map((item, i) => (
            <span key={i} className="shrink-0">{item} <span className="mx-3 opacity-30">·</span></span>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-num mb-5"
        >
          03 — SKILLS
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="font-display text-5xl md:text-6xl font-bold mb-16"
        >
          Built With
          <br />
          <span className="gradient-text">Purpose.</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + ci * 0.1, ease: "easeOut" }}
              className="card-hover p-6 border border-white/8 bg-[#0f0f0f]"
            >
              <div className="font-mono-custom text-[#00f5ff] text-xl mb-3">{cat.icon}</div>
              <h3 className="font-display font-semibold text-white mb-4 text-sm tracking-widest uppercase">{cat.title}</h3>
              <ul className="space-y-2">
                {cat.items.map(item => (
                  <li key={item} className="flex items-center gap-2 text-gray-400 text-sm">
                    <span className="w-1 h-1 rounded-full bg-[#00f5ff]/50 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
