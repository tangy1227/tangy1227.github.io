import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// TODO: replace with real releases and streaming links
const tracks = [
  { title: 'Resonance Study No. 1', genre: 'Electronic / Ambient', year: '2023', link: '#' },
  { title: 'Signal & Noise', genre: 'Experimental', year: '2023', link: '#' },
  { title: 'Spectral Drift', genre: 'Ambient / IDM', year: '2024', link: '#' },
  { title: 'Formant (Live Version)', genre: 'Live Performance', year: '2024', link: '#' },
]

const platforms = [
  { label: 'Spotify', href: '#' },
  { label: 'SoundCloud', href: '#' },
  { label: 'YouTube', href: '#' },
]

export default function Music() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="music" ref={ref} className="px-6 md:px-10 py-24 md:py-32 border-t border-[#e3e2dc]">
      <div className="max-w-7xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="eyebrow mb-6"
        >
          Music — a hobby
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="display text-5xl md:text-7xl mb-6"
        >
          Things I've<br />produced.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg text-[#6b6b66] max-w-xl mb-14 leading-relaxed"
        >
          Self-taught producer since high school. Every track is a small experiment in blending
          acoustic intuition with digital precision.
        </motion.p>

        {/* Track list */}
        <div className="border-t border-[#e3e2dc]">
          {tracks.map((track, i) => (
            <motion.a
              key={track.title}
              href={track.link}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
              className="group flex items-center gap-5 md:gap-8 py-6 border-b border-[#e3e2dc] hover:bg-[#f0efea] transition-colors px-2 -mx-2"
            >
              <span className="font-display text-sm text-[#9a9a93] w-6 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-display font-semibold text-xl md:text-2xl group-hover:text-[#ffb800] transition-colors truncate">
                  {track.title}
                </div>
                <div className="text-sm text-[#6b6b66] mt-0.5">{track.genre}</div>
              </div>
              <span className="hidden md:block font-display text-sm text-[#6b6b66] shrink-0">{track.year}</span>
              <span className="font-display text-sm font-semibold uppercase tracking-wider shrink-0 flex items-center gap-1.5">
                Listen
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </motion.a>
          ))}
        </div>

        {/* Platform links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-wrap gap-8"
        >
          {platforms.map(p => (
            <a key={p.label} href={p.href} className="font-display font-semibold text-sm uppercase tracking-wider link-underline">
              {p.label} →
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
