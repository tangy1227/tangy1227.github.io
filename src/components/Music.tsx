import { useLayoutEffect, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import MediaEmbed from './MediaEmbed'
import RevealLines from './motion/RevealLines'
import RevealChars from './motion/RevealChars'
import RevealImage from './motion/RevealImage'
import { ArrowUpRight } from 'lucide-react'
import Button from './ui/Button'
import SectionLabel from './ui/SectionLabel'
import { useLenis } from '../lib/lenis'
import { FINE_POINTER, useMediaQuery } from '../lib/media'
import { links, youtubeVideo } from '../data/links'
import { EASE_OUT_EXPO } from '../lib/motion'

// Featured releases. YouTube ids are from the Tangy1227 channel.
const releases = [
  {
    type: 'youtube' as const,
    id: 'Y20nS71Qcmw',
    title: 'Night Flowers',
    caption: 'Chill-out electronic woven with guzheng, dizi and pipa. The audio visualizer is made in After Effects.',
  },
  {
    type: 'youtube' as const,
    id: '-O2Q3ILMUdw',
    title: 'Like This',
    caption: 'A melodic original that builds to a dubstep-leaning drop.',
  },
  // TODO: "Duncan + Yilong" (GT Rock & Pop Ensemble, on the Georgia Tech School
  // of Music channel) — add it here once we have the YouTube link.
  {
    type: 'soundcloud' as const,
    id: links.soundcloud,
    title: 'More on SoundCloud',
    caption: 'Beats, experiments, and works in progress.',
  },
]

type Track = { title: string; youtube?: string }

// Chronological archive from the old Tangy Studio site. Tracks with a
// `youtube` id link to the video; the rest were download-only releases.
const archive: { year: string; tracks: Track[]; note?: string }[] = [
  {
    year: '2016',
    tracks: [{ title: 'Dreams and Visions' }, { title: 'Duang' }, { title: 'The North Rain' }],
    note: 'Throwback — where it started.',
  },
  {
    year: '2017',
    tracks: [
      { title: '三葉のテーマ', youtube: 'n9XgNuvHD14' },
      { title: '东 East', youtube: 'aF4-ndSvDm8' },
      { title: '西 West', youtube: 'z5Oz1B7kSYU' },
      { title: '南 South', youtube: 'ClXpkE4AWVs' },
      { title: 'Summer 夏', youtube: 'g4AA_4wUh3Y' },
      { title: "Summer's Glory" },
      { title: 'Shanghai 上海', youtube: 'eu8uOjfBP-A' },
    ],
    note: 'A Chinese-style EDM series: East, West and South.',
  },
  {
    year: '2018',
    tracks: [
      { title: 'PloT Twist', youtube: 'xAhuK7tmLdY' },
      { title: 'Graduation Day', youtube: 'I311mTOICVk' },
      { title: 'East (Remix)', youtube: '23fhwm7s55Q' },
      { title: 'Kiwi', youtube: 'wsdHwnWJdI4' },
    ],
    note: 'The future bass year.',
  },
  { year: '2019', tracks: [{ title: 'Like This', youtube: '-O2Q3ILMUdw' }], note: 'Melodic, dubstep-influenced original.' },
  {
    year: '2020',
    tracks: [{ title: 'Night Flowers', youtube: 'Y20nS71Qcmw' }],
    note: 'Chill fusion with Chinese instruments — guzheng, dizi, pipa.',
  },
]

// Links with an empty href are hidden until filled in.
const tools = [
  {
    title: 'Max for Live Autotune Plugin',
    blurb:
      "A group-built Ableton Live device on Max's retune~ object that recreates the Auto-Tune effect. I designed the interface: a key and scale selector plus a virtual keyboard for choosing which notes to snap to.",
    links: [{ label: 'Download patch', href: '' }], // TODO: patch download URL
  },
  {
    title: 'Generative Drum Machine',
    blurb:
      'A four-voice Max drum machine. Program patterns by hand, or generate them from per-voice probability tables, with envelope controls on every voice.',
    links: [{ label: 'Learn more', href: '' }], // TODO: demo / write-up URL
  },
]

// ---- Archive timeline ----
// Laptop (mouse/trackpad, room to spare): the section pins and vertical scroll
// slides the row sideways. Touch, small screens and reduced motion: a native
// swipeable row with snap points. Both share the intro panel, the year cards
// and the year buttons.

const FIRST = archive[0].year
const LAST = archive[archive.length - 1].year
const N = archive.length

const PINNED_QUERY = '(min-width: 768px) and (min-height: 600px) and (hover: hover) and (pointer: fine)'
// Vertical scroll per pixel of sideways travel. 1 = the row moves in step
// with the wheel; higher = slower. Tweak to taste.
const SCROLL_LENGTH = 1.1
// Share of the pinned scroll held still at each end, so the row arrives and
// settles before the section unpins.
const HOLD = 0.06
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)

function ArchiveIntro({ hint, className = '' }: { hint: string; className?: string }) {
  return (
    <div className={className}>
      <p className="eyebrow mb-6">
        <RevealChars text="Archive" />
      </p>
      <RevealLines
        as="h3"
        className="display text-[clamp(2.5rem,4.2vw,4rem)] mb-5"
        lines={[FIRST, { content: `→ ${LAST}`, className: 'text-muted' }]}
      />
      <p className="text-muted leading-relaxed max-w-[32ch]">Five years of bedroom production. {hint}</p>
    </div>
  )
}

function YearCard({
  yr,
  active,
  className = '',
  cardRef,
  onKeyboardFocus,
}: {
  yr: (typeof archive)[number]
  active: boolean
  className?: string
  cardRef?: (el: HTMLElement | null) => void
  onKeyboardFocus?: () => void
}) {
  return (
    <article
      ref={cardRef}
      className={`group relative shrink-0 flex flex-col pt-8 ${className}`}
      onFocus={e => {
        if (onKeyboardFocus && e.target.matches(':focus-visible')) onKeyboardFocus()
      }}
    >
      {/* node on the shared rail */}
      <span
        aria-hidden="true"
        className={`absolute left-0 top-0 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-bg transition-[background-color,scale] duration-500 ${
          active ? 'bg-accent scale-125' : 'bg-line-strong'
        }`}
      />

      <h4 className={`year-num ${active ? '' : 'is-dim'} font-display font-bold text-[clamp(3.75rem,6.5vw,6.5rem)] leading-none mb-6 tabular-nums`}>
        {yr.year}
      </h4>

      <div className="flex flex-col items-start gap-1.5">
        {yr.tracks.map(t =>
          t.youtube ? (
            <a
              key={t.title}
              href={youtubeVideo(t.youtube)}
              target="_blank"
              rel="noreferrer"
              className="group/track inline-flex items-center gap-1.5 font-display font-semibold text-base md:text-lg transition-colors duration-300 hover:text-accent"
            >
              {t.title}
              <ArrowUpRight
                size={15}
                strokeWidth={2.5}
                aria-hidden="true"
                className="opacity-35 transition-[opacity,transform] duration-300 group-hover/track:opacity-100 group-hover/track:-translate-y-0.5 group-hover/track:translate-x-0.5"
              />
            </a>
          ) : (
            <span key={t.title} className="font-display font-semibold text-base md:text-lg">
              {t.title}
            </span>
          ),
        )}
      </div>

      {yr.note && <p className="text-sm text-muted mt-4 leading-relaxed max-w-[30ch]">{yr.note}</p>}
    </article>
  )
}

/** Year buttons over a progress hairline. Jumps to a year on click. */
function YearNav({
  active,
  progress,
  onPick,
  className = '',
}: {
  active: number
  progress: MotionValue<number>
  onPick: (i: number) => void
  className?: string
}) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-3">
        {archive.map((yr, i) => (
          <button
            key={yr.year}
            type="button"
            aria-label={`Go to ${yr.year}`}
            aria-current={i === active ? 'true' : undefined}
            onClick={() => onPick(i)}
            className={`-mx-1.5 -my-2 px-1.5 py-2 pointer-coarse:-my-3.5 pointer-coarse:py-3.5 font-display text-xs font-semibold tracking-[0.2em] tabular-nums transition-colors duration-500 ${
              i === active ? 'text-ink' : 'text-faint hover:text-ink'
            }`}
          >
            {yr.year}
          </button>
        ))}
      </div>
      <div className="relative h-px w-full overflow-hidden bg-line">
        <motion.div style={{ scaleX: progress }} className="absolute inset-0 origin-left bg-accent" />
      </div>
    </div>
  )
}

function PinnedTimeline() {
  const lenis = useLenis()
  const targetRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const [active, setActive] = useState(0)
  const dist = useMotionValue(0)

  // How far the row travels: its full width minus the frame. Re-measured
  // whenever either resizes (window resize, display font loading in).
  useLayoutEffect(() => {
    const track = trackRef.current
    const frame = frameRef.current
    if (!track || !frame) return
    const ro = new ResizeObserver(() => {
      const d = Math.max(0, track.scrollWidth - frame.clientWidth)
      dist.set(d)
      setDistance(d)
    })
    ro.observe(track)
    ro.observe(frame)
    return () => ro.disconnect()
  }, [dist])

  // Scroll the frame is pinned for: the travel at SCROLL_LENGTH, plus the holds.
  const scrollable = (distance * SCROLL_LENGTH) / (1 - 2 * HOLD)

  // 0 when the frame pins, 1 when it releases. Linear in between (the row
  // moves in step with the scroll), held still for HOLD at each end.
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start start', 'end end'] })
  const travel = useTransform(scrollYProgress, [HOLD, 1 - HOLD], [0, 1])
  const x = useTransform(() => -travel.get() * dist.get())
  useMotionValueEvent(travel, 'change', v => setActive(Math.round(v * (N - 1))))

  const jumpTo = (i: number) => {
    const el = targetRef.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const y = top + (HOLD + (i / (N - 1)) * (1 - 2 * HOLD)) * (el.offsetHeight - window.innerHeight)
    if (lenis) lenis.scrollTo(y, { duration: 1.2, easing: easeOutQuart })
    else window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <div ref={targetRef} className="relative" style={{ height: `calc(100svh + ${scrollable}px)` }}>
      {/* overflow-clip, not hidden: a hidden box can still be scrolled by
          focus, which would knock the row out of sync with the page. */}
      <div ref={frameRef} className="sticky top-0 h-svh overflow-clip flex flex-col justify-center pt-16 pb-24">
        <motion.div ref={trackRef} style={{ x }} className="flex items-start w-max pl-6 md:pl-10 pr-[10vw] gap-16 lg:gap-20">
          <ArchiveIntro className="w-[clamp(260px,28vw,420px)] shrink-0" hint="Keep scrolling to move through the years." />
          {/* cards on one continuous rail */}
          <div className="relative mt-2 flex gap-12 lg:gap-16">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-line" />
            {archive.map((yr, i) => (
              <YearCard
                key={yr.year}
                yr={yr}
                active={i === active}
                className="w-[clamp(260px,25vw,400px)]"
                onKeyboardFocus={() => jumpTo(i)}
              />
            ))}
          </div>
        </motion.div>

        <YearNav
          active={active}
          progress={travel}
          onPick={jumpTo}
          className="absolute bottom-10 left-6 right-6 md:left-10 md:right-10"
        />
      </div>
    </div>
  )
}

function SwipeTimeline() {
  const reduce = useReducedMotion()
  const fine = useMediaQuery(FINE_POINTER)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const cards = useRef<(HTMLElement | null)[]>([])
  const [active, setActive] = useState(0)
  const { scrollXProgress } = useScroll({ container: scrollerRef })

  // Offset of card i from the scroller's snap line.
  const offsetOf = (i: number) => {
    const sc = scrollerRef.current
    const card = cards.current[i]
    if (!sc || !card) return 0
    const pad = parseFloat(getComputedStyle(sc).scrollPaddingLeft) || 0
    return card.getBoundingClientRect().left - sc.getBoundingClientRect().left - pad
  }

  const onScroll = () => {
    const sc = scrollerRef.current
    if (!sc) return
    if (sc.scrollLeft >= sc.scrollWidth - sc.clientWidth - 2) return setActive(N - 1)
    let best = 0
    for (let i = 1; i < N; i++) if (Math.abs(offsetOf(i)) < Math.abs(offsetOf(best))) best = i
    setActive(best)
  }

  const pick = (i: number) => {
    const sc = scrollerRef.current
    if (!sc) return
    sc.scrollTo({ left: sc.scrollLeft + offsetOf(i), behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <div className="pt-20 md:pt-28">
      <ArchiveIntro
        className="max-w-7xl mx-auto px-6 md:px-10"
        hint={fine ? 'Pick a year below, or scroll sideways.' : 'Swipe through the years.'}
      />
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        data-lenis-prevent-horizontal
        className="no-scrollbar mt-12 overflow-x-auto overscroll-x-contain snap-x snap-mandatory scroll-px-6 md:scroll-px-10"
      >
        <div className="relative flex w-max gap-10 md:gap-12 px-6 md:px-10 pt-2 pb-2">
          <span aria-hidden="true" className="absolute top-2 left-6 right-6 md:left-10 md:right-10 h-px bg-line" />
          {archive.map((yr, i) => (
            <YearCard
              key={yr.year}
              yr={yr}
              active={i === active}
              cardRef={el => {
                cards.current[i] = el
              }}
              className="w-[72vw] sm:w-[44vw] md:w-[34vw] lg:w-[26vw] snap-start"
            />
          ))}
        </div>
      </div>
      <YearNav
        active={active}
        progress={scrollXProgress}
        onPick={pick}
        className="max-w-7xl mx-auto px-6 md:px-10 mt-10"
      />
    </div>
  )
}

function Archive() {
  const reduce = useReducedMotion()
  const pinned = useMediaQuery(PINNED_QUERY) && !reduce
  return pinned ? <PinnedTimeline /> : <SwipeTimeline />
}

export default function Music() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const toolsRef = useRef<HTMLDivElement>(null)
  const toolsInView = useInView(toolsRef, { once: true, margin: '0px 0px -10% 0px' })

  return (
    <section id="music" ref={ref} className="section py-24 md:py-32 border-t border-line">
      <div className="max-w-7xl mx-auto w-full px-6 md:px-10">
        <SectionLabel n={3} text="Music — a hobby" className="mb-6" />

        <RevealLines
          className="display section-title mb-14"
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
      </div>

      {/* Chronological archive: full-bleed, pinned or swipeable. */}
      <Archive />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-10 pt-16 md:pt-20">
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
              <p className="text-muted leading-relaxed flex-1">{t.blurb}</p>
              {t.links.some(l => l.href) && (
                <div className="flex flex-wrap gap-3 mt-5">
                  {t.links.filter(l => l.href).map(l => (
                    <Button key={l.label} href={l.href} variant="outline" external>{l.label}</Button>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
