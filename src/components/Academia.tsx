import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import MediaEmbed from './MediaEmbed'
import RevealLines from './motion/RevealLines'
import RevealChars from './motion/RevealChars'
import RevealImage from './motion/RevealImage'
import RollText from './motion/RollText'
import Button, { ArrowSwap } from './ui/Button'
import { EASE_OUT_EXPO } from '../lib/motion'

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

function ProjectCard({ p, flip }: { p: (typeof projects)[number]; flip: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })

  return (
    <article ref={ref} className="grid md:grid-cols-12 gap-6 md:gap-10 items-center">
      <div className={`md:col-span-7 ${flip ? 'md:order-2' : ''}`}>
        <RevealImage className="rounded-[10px] overflow-hidden">
          <MediaEmbed type="youtube" id={p.videoId} title={p.title} />
        </RevealImage>
      </div>
      <div className={`md:col-span-5 ${flip ? 'md:order-1' : ''}`}>
        <RevealLines
          as="h3"
          className="font-display font-semibold text-2xl md:text-3xl mb-3"
          lines={[p.title]}
          delay={0.1}
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.3 }}
          className="text-[#6b6b66] leading-relaxed mb-5"
        >
          {p.blurb}
        </motion.p>
        <div className="flex flex-wrap gap-2 mb-6">
          {p.tags.map((t, i) => (
            <motion.span
              key={t}
              className="tag"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.4 + i * 0.05 }}
            >
              {t}
            </motion.span>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.55 }}
          className="flex flex-wrap gap-3"
        >
          {p.links.map(l => (
            <Button key={l.label} href={l.href} variant="outline">{l.label}</Button>
          ))}
        </motion.div>
      </div>
    </article>
  )
}

export default function Academia() {
  const eduRef = useRef<HTMLDivElement>(null)
  const eduInView = useInView(eduRef, { once: true, margin: '0px 0px -10% 0px' })

  return (
    <section id="academia" className="section px-6 md:px-10 py-24 md:py-32 bg-[#f0efea] border-t border-[#e3e2dc]">
      <div className="max-w-7xl mx-auto w-full">
        <p className="eyebrow mb-6">
          <RevealChars text="Academia" />
        </p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <RevealLines
            className="display text-5xl md:text-7xl"
            lines={['Research', '& projects.']}
          />
          {/* TODO: link to real CV */}
          <a
            href="#"
            className="group inline-flex items-center gap-2 font-display font-semibold text-sm uppercase tracking-wider shrink-0"
          >
            <RollText text="Download CV" />
            <ArrowSwap up />
          </a>
        </div>

        {/* Project cards */}
        <div className="space-y-12 md:space-y-16">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} flip={i % 2 === 1} />
          ))}
        </div>

        {/* Education */}
        <motion.div
          ref={eduRef}
          initial={{ opacity: 0, y: 20 }}
          animate={eduInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          className="mt-20 pt-10 border-t border-[#d6d5cd] grid md:grid-cols-12 gap-3 md:gap-6"
        >
          <p className="md:col-span-4 eyebrow">
            <RevealChars text="Education" />
          </p>
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
