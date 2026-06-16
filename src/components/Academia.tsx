import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// TODO: replace placeholders with real publications / research / projects
const work = [
  {
    title: 'Audio Emotion Classification with Spectrogram CNNs',
    role: 'Research Project · Georgia Tech',
    year: '2024',
    desc: 'Deep learning model classifying emotional content in speech and music from spectrogram features.',
    link: '#',
  },
  {
    title: 'Automatic Music Structure Segmentation',
    role: 'Course Research',
    year: '2024',
    desc: 'Identifying intro, verse, chorus, and bridge boundaries using self-similarity matrices.',
    link: '#',
  },
  {
    title: 'Generative Melody System (LSTM + Max/MSP)',
    role: 'Independent Study',
    year: '2023',
    desc: 'Recurrent network trained on MIDI corpora with a real-time performance patch.',
    link: '#',
  },
  {
    title: 'Speech–Music Rhythm Interaction Dashboard',
    role: 'Data Visualization',
    year: '2023',
    desc: 'Interactive exploration of correlations between spoken-language patterns and musical rhythm.',
    link: '#',
  },
]

export default function Academia() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="academia" ref={ref} className="px-6 md:px-10 py-24 md:py-32 bg-[#f0efea] border-t border-[#e3e2dc]">
      <div className="max-w-7xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="eyebrow mb-6"
        >
          Academia
        </motion.p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="display text-5xl md:text-7xl"
          >
            Research<br />& projects.
          </motion.h2>
          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="font-display font-semibold text-sm uppercase tracking-wider link-underline shrink-0"
          >
            {/* TODO: link to real CV */}
            Download CV →
          </motion.a>
        </div>

        {/* Work list */}
        <div className="border-t border-[#d6d5cd]">
          {work.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.link}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
              className="group grid md:grid-cols-12 gap-3 md:gap-6 items-baseline py-7 border-b border-[#d6d5cd] hover:bg-[#e7e6df] transition-colors px-2 -mx-2"
            >
              <span className="md:col-span-1 font-display text-sm text-[#9a9a93]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="md:col-span-7">
                <h3 className="font-display font-semibold text-xl md:text-2xl group-hover:text-[#ffb800] transition-colors">
                  {p.title}
                </h3>
                <p className="text-[#6b6b66] mt-1 leading-relaxed">{p.desc}</p>
              </div>
              <span className="md:col-span-3 text-sm text-[#6b6b66]">{p.role}</span>
              <span className="md:col-span-1 font-display text-sm text-[#6b6b66] md:text-right">{p.year}</span>
            </motion.a>
          ))}
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-14 grid md:grid-cols-12 gap-3 md:gap-6"
        >
          <p className="md:col-span-4 eyebrow">Education</p>
          <div className="md:col-span-8 space-y-4">
            <div>
              <p className="font-display font-semibold text-lg">Georgia Institute of Technology</p>
              <p className="text-[#6b6b66]">M.S. Music Technology · Atlanta, GA</p>
            </div>
            {/* TODO: add undergraduate institution */}
            <div>
              <p className="font-display font-semibold text-lg">B.S. — Add your undergrad</p>
              <p className="text-[#6b6b66]">Degree · Institution · Year</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
