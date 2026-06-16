import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import MediaEmbed from './MediaEmbed'

// TODO: replace videoId / SoundCloud URL placeholders with your real media
const releases = [
  {
    type: 'youtube' as const,
    id: 'TODO_NIGHT_FLOWERS',
    title: 'Night Flowers',
    caption: 'Chinese traditional instruments — Guzheng, Dizi, Pipa — woven into electronic.',
  },
  {
    type: 'youtube' as const,
    id: 'TODO_DUNCAN_YILONG',
    title: 'Duncan + Yilong',
    caption: 'GT Rock & Pop Ensemble — a live band collaboration.',
  },
  {
    type: 'soundcloud' as const,
    id: 'https://soundcloud.com/TODO_YOUR_PROFILE',
    title: 'More on SoundCloud',
    caption: 'Beats, experiments, and works in progress.',
  },
]

// TODO: replace links with real repo / patch download URLs
const tools = [
  {
    title: 'Max for Live Autotune Plugin',
    blurb: 'A user-friendly Ableton pitch-correction device with a key selector and virtual keyboard.',
    links: [{ label: 'Download patch', href: '#' }],
  },
  {
    title: 'Generative Drum Machine',
    blurb: 'A four-voice Max drum machine that generates patterns from adjustable probability tables.',
    links: [{ label: 'Learn more', href: '#' }],
  },
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
          className="display text-5xl md:text-7xl mb-14"
        >
          Things I've<br />produced.
        </motion.h2>

        {/* Releases */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {releases.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
            >
              <MediaEmbed type={r.type} id={r.id} title={r.title} />
              <h3 className="font-display font-semibold text-lg mt-4">{r.title}</h3>
              <p className="text-sm text-[#6b6b66] mt-1 leading-relaxed">{r.caption}</p>
            </motion.div>
          ))}
        </div>

        {/* Production tools */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="eyebrow mt-20 mb-8"
        >
          Production tools — Max/MSP
        </motion.p>
        <div className="grid md:grid-cols-2 gap-5">
          {tools.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 + i * 0.1 }}
              className="border border-[#e3e2dc] rounded-xl p-6 bg-[#fafaf8] flex flex-col"
            >
              <h3 className="font-display font-semibold text-xl mb-2">{t.title}</h3>
              <p className="text-[#6b6b66] leading-relaxed mb-5 flex-1">{t.blurb}</p>
              <div className="flex flex-wrap gap-3">
                {t.links.map(l => (
                  <a key={l.label} href={l.href} className="btn-outline">{l.label} →</a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
