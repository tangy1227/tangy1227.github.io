import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const tracks = [
  { title: 'Resonance Study No. 1', genre: 'Electronic / Ambient', year: '2023', bpm: '120', key: 'A min' },
  { title: 'Signal & Noise', genre: 'Experimental', year: '2023', bpm: '90', key: 'C maj' },
  { title: 'Spectral Drift', genre: 'Ambient / IDM', year: '2024', bpm: '140', key: 'F# min' },
  { title: 'Formant (Live Version)', genre: 'Live Performance', year: '2024', bpm: '128', key: 'D min' },
]

function MiniWave({ active }: { active: boolean }) {
  const bars = Array.from({ length: 20 })
  return (
    <div className="flex items-center gap-[2px] h-6">
      {bars.map((_, i) => (
        <div
          key={i}
          className="wave-bar"
          style={{
            height: `${Math.random() * 70 + 30}%`,
            animationDelay: `${i * 0.06}s`,
            animationPlayState: active ? 'running' : 'paused',
            background: active ? 'linear-gradient(to top, transparent, #00f5ff, transparent)' : 'rgba(255,255,255,0.2)',
          }}
        />
      ))}
    </div>
  )
}

export default function Music() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [playing, setPlaying] = useState<number | null>(null)

  return (
    <section id="music" ref={ref} className="min-h-screen flex flex-col justify-center px-8 md:px-20 py-32 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-num mb-5"
        >
          05 — CREATIVE
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="font-display text-5xl md:text-6xl font-bold mb-4"
        >
          Making
          <br />
          <span className="gradient-text">Music.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-gray-500 max-w-lg mb-16 leading-relaxed"
        >
          Self-taught producer since high school. I release music across platforms and maintain a personal studio.
          Every track is an experiment in combining acoustic intuition with digital precision.
        </motion.p>

        {/* Track list */}
        <div className="border-t border-white/8">
          {tracks.map((track, i) => (
            <motion.div
              key={track.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
              className="group flex items-center gap-6 py-5 border-b border-white/5 hover:bg-white/[0.02] transition-colors px-2 cursor-pointer"
              data-hover
              onClick={() => setPlaying(playing === i ? null : i)}
            >
              {/* Play button */}
              <button className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center shrink-0 group-hover:border-[#00f5ff]/50 transition-colors">
                {playing === i ? (
                  <span className="w-3 h-3 flex gap-0.5 items-center">
                    <span className="w-1 h-3 bg-[#00f5ff]" />
                    <span className="w-1 h-3 bg-[#00f5ff]" />
                  </span>
                ) : (
                  <span className="w-0 h-0 border-y-4 border-y-transparent border-l-6 border-l-white translate-x-0.5" style={{ borderLeftWidth: '7px', borderRightWidth: 0 }} />
                )}
              </button>

              <span className="font-mono-custom text-[#00f5ff]/30 text-xs w-5 shrink-0">{String(i + 1).padStart(2, '0')}</span>

              <div className="flex-1 min-w-0">
                <div className="font-medium text-white group-hover:text-[#00f5ff] transition-colors truncate">{track.title}</div>
                <div className="text-xs text-gray-500 mt-0.5">{track.genre}</div>
              </div>

              <MiniWave active={playing === i} />

              <div className="hidden md:flex gap-6 text-xs text-gray-600 font-mono-custom shrink-0">
                <span>{track.bpm} BPM</span>
                <span>{track.key}</span>
                <span>{track.year}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-10 flex flex-wrap gap-5"
        >
          {['SoundCloud', 'Spotify', 'YouTube', 'Studio Site'].map(platform => (
            <a key={platform} href="#" data-hover
              className="font-mono-custom text-xs text-[#00f5ff]/60 hover:text-[#00f5ff] hover-link transition-colors">
              {platform} →
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
