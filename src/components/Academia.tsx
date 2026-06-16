import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import MediaEmbed from './MediaEmbed'

// TODO: replace videoId placeholders + links with your real YouTube ids / URLs
const projects = [
  {
    title: 'Automatic Drum Loop Transcription Tool',
    blurb: 'Detects onsets via spectral flux and classifies each hit (kick, snare, hat) with a kNN model trained on 1000+ one-shots, evaluated on the MDB Drum Dataset.',
    tags: ['Python', 'librosa', 'kNN', 'MFCC', 'Onset Detection'],
    videoId: 'TODO_DRUM_TRANSCRIPTION', // YouTube demo / presentation
    links: [
      { label: 'GitHub', href: '#' },
      { label: 'Slides', href: '#' },
    ],
  },
  {
    title: 'Audio Alignment Tool',
    blurb: 'Aligns two recordings of the same song by measuring spectral similarity over time — useful for syncing covers, takes, and live versions.',
    tags: ['Python', 'DSP', 'DTW', 'Similarity'],
    videoId: 'TODO_AUDIO_ALIGNMENT',
    links: [{ label: 'GitHub', href: '#' }],
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

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="display text-5xl md:text-7xl"
          >
            Research<br />&amp; projects.
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

        {/* Project cards */}
        <div className="space-y-12 md:space-y-16">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
              className="grid md:grid-cols-12 gap-6 md:gap-10 items-center"
            >
              <div className={`md:col-span-7 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                <MediaEmbed type="youtube" id={p.videoId} title={p.title} />
              </div>
              <div className={`md:col-span-5 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                <h3 className="font-display font-semibold text-2xl md:text-3xl mb-3">{p.title}</h3>
                <p className="text-[#6b6b66] leading-relaxed mb-5">{p.blurb}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <div className="flex flex-wrap gap-3">
                  {p.links.map(l => (
                    <a key={l.label} href={l.href} className="btn-outline">{l.label} →</a>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-20 pt-10 border-t border-[#d6d5cd] grid md:grid-cols-12 gap-3 md:gap-6"
        >
          <p className="md:col-span-4 eyebrow">Education</p>
          <div className="md:col-span-8 space-y-4">
            <div>
              <p className="font-display font-semibold text-lg">Georgia Institute of Technology</p>
              <p className="text-[#6b6b66]">M.S. Music Technology · Atlanta, GA</p>
            </div>
            <div>
              <p className="font-display font-semibold text-lg">Georgia Institute of Technology</p>
              <p className="text-[#6b6b66]">B.S. — add your undergraduate degree · Year</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
