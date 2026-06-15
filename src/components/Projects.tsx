import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const projects = [
  {
    num: '01',
    title: 'Audio Emotion Classifier',
    desc: 'Deep learning model that classifies emotional content in speech and music using spectrogram analysis and CNNs trained on curated audio datasets.',
    tags: ['PyTorch', 'librosa', 'CNN', 'Signal Processing'],
    type: 'ML Research',
    link: '#',
  },
  {
    num: '02',
    title: 'Music Structure Analyzer',
    desc: 'Automated segmentation tool that identifies intro, verse, chorus, and bridge sections from raw audio — built with self-similarity matrices and spectral features.',
    tags: ['Python', 'SciPy', 'librosa', 'NumPy'],
    type: 'Audio DSP',
    link: '#',
  },
  {
    num: '03',
    title: 'Generative Melody System',
    desc: 'LSTM-based recurrent network trained on MIDI corpora to generate original melodic sequences, with a Max/MSP patch for real-time performance.',
    tags: ['TensorFlow', 'MIDI', 'Max/MSP', 'LSTM'],
    type: 'Generative AI',
    link: '#',
  },
  {
    num: '04',
    title: 'Speech-Music Interaction Dashboard',
    desc: 'Interactive D3.js visualization exploring correlations between spoken language patterns and musical rhythm — built on large-scale linguistic + audio corpora.',
    tags: ['D3.js', 'Python', 'pandas', 'Hadoop'],
    type: 'Data Visualization',
    link: '#',
  },
]

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" ref={ref} className="min-h-screen flex flex-col justify-center px-8 md:px-20 py-32">
      <div className="max-w-6xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-num mb-5"
        >
          04 — PROJECTS
        </motion.p>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="font-display text-5xl md:text-6xl font-bold"
          >
            Selected
            <br />
            <span className="gradient-text">Work.</span>
          </motion.h2>

          <motion.a
            href="https://github.com"
            target="_blank"
            data-hover
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-[#00f5ff] text-sm font-mono-custom hover-link shrink-0"
          >
            GitHub →
          </motion.a>
        </div>

        <div className="space-y-4">
          {projects.map((p, i) => (
            <motion.a
              key={p.num}
              href={p.link}
              data-hover
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: "easeOut" }}
              className="group flex flex-col md:flex-row md:items-center gap-6 p-6 border border-white/8 bg-[#0f0f0f] card-hover block"
            >
              <span className="font-mono-custom text-[#00f5ff]/40 text-sm shrink-0 w-8">{p.num}</span>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="font-display font-semibold text-white text-lg group-hover:text-[#00f5ff] transition-colors">
                    {p.title}
                  </h3>
                  <span className="tag shrink-0">{p.type}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </div>

              <div className="flex flex-wrap gap-2 shrink-0 max-w-xs">
                {p.tags.map(t => (
                  <span key={t} className="text-xs text-gray-500 font-mono-custom">{t}</span>
                ))}
              </div>

              <span className="text-[#00f5ff] text-xl shrink-0 group-hover:translate-x-2 transition-transform duration-200">
                →
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
