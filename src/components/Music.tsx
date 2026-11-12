import { useLayoutEffect, useRef, useState } from 'react'
import { easeInOut, motion, useInView, useScroll, useTransform } from 'framer-motion'
import MediaEmbed from './MediaEmbed'
import RevealLines from './motion/RevealLines'
import RevealChars from './motion/RevealChars'
import RevealImage from './motion/RevealImage'
import Button from './ui/Button'
import { links } from '../data/links'
import { EASE_OUT_EXPO } from '../lib/motion'

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
    id: links.soundcloud,
    title: 'More on SoundCloud',
    caption: 'Beats, experiments, and works in progress.',
  },
]

// Chronological archive — five years of releases, pulled from the early catalog
const archive = [
  { year: '2016', tracks: ['Dreams and Visions', 'Duang', 'The North Rain'], note: 'Throwback — where it started.' },
  { year: '2017', tracks: ['三葉のテーマ', '东 / 西 / 南', 'Summer 夏', "Summer's Glory", 'Shanghai'] },
  { year: '2018', tracks: ['PloT Twist', 'Graduation Day', 'East — Remix', 'Kiwi'] },
  { year: '2019', tracks: ['Like This'], note: 'Melodic, dubstep-influenced original.' },
  { year: '2020', tracks: ['Night Flowers'], note: 'Chill fusion with Chinese instruments — guzheng, dizi, pipa.' },
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

// Scroll-pinned horizontal timeline: vertical scroll progress drives the track's
// translateX, so the years slide left→right while the section stays pinned.
// How much vertical scroll the timeline consumes relative to its horizontal
// travel. 1 = 1:1 (fast); higher = the years slide more slowly. Tweak to taste.
const SCROLL_LENGTH = 2

function HorizontalTimeline() {
  const targetRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)

  // Measure how far the track must travel: its full width minus the viewport.
  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (!track) return
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
    }
    measure()
    window.addEventListener('resize', measure)
    // Display fonts change the measured width once loaded — re-measure then.
    document.fonts?.ready.then(measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // progress is 0 when the section pins (top hits viewport top) and 1 when it
  // releases (bottom hits viewport bottom) — a 1:1 scroll-to-slide mapping.
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  })
  // easeInOut so the track eases in on entry and decelerates into the final
  // cards on exit — the timeline visually "settles" before the section unpins,
  // so scroll momentum doesn't shoot you straight past the next section.
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance], { ease: easeInOut })

  return (
    <div
      ref={targetRef}
      style={{ height: `calc(100vh + ${distance * SCROLL_LENGTH}px)` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* persistent label while the timeline scrolls */}
        <div className="absolute top-8 left-6 md:left-10 z-10">
          <span className="eyebrow">Archive — the back catalog</span>
        </div>

        {/* sliding track */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex items-stretch w-max pl-6 md:pl-10 pr-[12vw] gap-10 md:gap-16"
        >
          {archive.map((yr) => (
            <article
              key={yr.year}
              className="group relative shrink-0 w-[78vw] sm:w-[48vw] md:w-[32vw] lg:w-[24vw] flex flex-col"
            >
              {/* timeline rail + node */}
              <div className="relative w-full mb-7">
                <div className="h-px w-full bg-line" />
                <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-accent ring-4 ring-bg transition-transform duration-300 group-hover:scale-125" />
              </div>

              <span className="font-display font-bold text-5xl md:text-7xl leading-none mb-6 tabular-nums transition-colors duration-500 group-hover:text-accent">
                {yr.year}
              </span>

              <div className="flex flex-col gap-1.5">
                {yr.tracks.map((t) => (
                  <span key={t} className="font-display font-semibold text-base md:text-lg">
                    {t}
                  </span>
                ))}
              </div>

              {yr.note && (
                <p className="text-sm text-muted mt-4 leading-relaxed max-w-[30ch]">
                  {yr.note}
                </p>
              )}
            </article>
          ))}
        </motion.div>

        {/* scroll-linked progress indicator */}
        <div className="absolute bottom-10 left-6 md:left-10 right-6 md:right-10 z-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-display font-semibold tracking-[0.2em] text-muted">2016</span>
            <span className="text-xs font-display font-semibold tracking-[0.2em] text-muted">2020</span>
          </div>
          <div className="h-px w-full bg-line relative overflow-hidden">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="absolute inset-0 origin-left bg-accent"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Music() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const toolsRef = useRef<HTMLDivElement>(null)
  const toolsInView = useInView(toolsRef, { once: true, margin: '0px 0px -10% 0px' })

  return (
    <section id="music" ref={ref} className="section py-24 md:py-32 border-t border-line">
      <div className="max-w-7xl mx-auto w-full px-6 md:px-10">
        <p className="eyebrow mb-6">
          <RevealChars text="Music — a hobby" />
        </p>

        <RevealLines
          className="display text-5xl md:text-7xl mb-14"
          lines={["Things I've", 'produced.']}
        />

        {/* Releases */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {releases.map((r, i) => (
            <div key={r.title}>
              <RevealImage className="rounded-[10px] overflow-hidden" delay={i * 0.1}>
                <MediaEmbed type={r.type} id={r.id} title={r.title} />
              </RevealImage>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.35 + i * 0.1 }}
              >
                <h3 className="font-display font-semibold text-lg mt-4">{r.title}</h3>
                <p className="text-sm text-muted mt-1 leading-relaxed">{r.caption}</p>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Chronological archive — lead-in */}
        <p className="eyebrow mt-20 mb-3">
          <RevealChars text="Archive — 2016 → 2020" />
        </p>
        <RevealLines
          as="p"
          className="text-muted max-w-xl leading-relaxed"
          bar="var(--bg-alt)"
          lines={['Five years of bedroom production — keep scrolling to move through the timeline.']}
        />
      </div>

      {/* full-bleed scroll-pinned timeline */}
      <HorizontalTimeline />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-10 pt-20 md:pt-28">
        {/* Production tools */}
        <p className="eyebrow mb-8">
          <RevealChars text="Production tools — Max/MSP" />
        </p>
        <div ref={toolsRef} className="grid md:grid-cols-2 gap-5">
          {tools.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 28 }}
              animate={toolsInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: i * 0.12 }}
              className="tool-card border border-line rounded-xl p-6 bg-bg flex flex-col"
            >
              <h3 className="font-display font-semibold text-xl mb-2">{t.title}</h3>
              <p className="text-muted leading-relaxed mb-5 flex-1">{t.blurb}</p>
              <div className="flex flex-wrap gap-3">
                {t.links.map(l => (
                  <Button key={l.label} href={l.href} variant="outline">{l.label}</Button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
