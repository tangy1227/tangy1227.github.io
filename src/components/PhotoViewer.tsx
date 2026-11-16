import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'framer-motion'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { holdScroll } from '../lib/lenis'
import { photoAspect, photoSrc, photoSrcSet, type Photo } from '../data/photos'
import { EASE_OUT_EXPO } from '../lib/motion'

type Props = {
  photos: Photo[]
  /** Index of the photo on screen, or null when closed. */
  index: number | null
  onChange: (index: number | null) => void
}

/**
 * Full-screen photo viewer. An always-dark surface like the mobile menu.
 * Esc closes; arrow keys, the buttons or a horizontal swipe step through the
 * photos. The 1200px image (already cached from the grid) shows at once and
 * the 2048px one loads over it in the same box.
 */
export default function PhotoViewer({ photos, index, onChange }: Props) {
  const reduce = useReducedMotion()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [dir, setDir] = useState(1)
  const open = index !== null
  const n = photos.length

  const step = (d: number) => {
    if (index === null) return
    setDir(d)
    onChange((index + d + n) % n)
  }

  // Hold the page still while open.
  useEffect(() => {
    if (!open) return
    return holdScroll()
  }, [open])

  // Focus the dialog on open; hand focus back to the tile on close.
  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    closeRef.current?.focus({ preventScroll: true })
    return () => previous?.focus({ preventScroll: true })
  }, [open])

  // Keyboard: Esc, arrows, keep Tab inside, and no page-scroll keys.
  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onChange(null)
      else if (e.key === 'ArrowRight') {
        setDir(1)
        onChange((index + 1) % n)
      } else if (e.key === 'ArrowLeft') {
        setDir(-1)
        onChange((index - 1 + n) % n)
      } else if (e.key === 'Tab') {
        const buttons = [...(dialogRef.current?.querySelectorAll('button') ?? [])]
        if (!buttons.length) return
        const at = buttons.indexOf(document.activeElement as HTMLButtonElement)
        const next = e.shiftKey ? (at <= 0 ? buttons.length - 1 : at - 1) : (at + 1) % buttons.length
        buttons[next].focus()
      } else if (![' ', 'PageDown', 'PageUp', 'Home', 'End', 'ArrowUp', 'ArrowDown'].includes(e.key)) return
      e.preventDefault()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, n, onChange])

  // Warm up the neighbours.
  useEffect(() => {
    if (index === null) return
    for (const d of [1, -1]) new Image().src = photoSrc(photos[(index + d + n) % n].slug, 2048)
  }, [index, n, photos])

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -70 || info.velocity.x < -500) step(1)
    else if (info.offset.x > 70 || info.velocity.x > 500) step(-1)
  }

  const photo = index === null ? null : photos[index]
  const aspect = photo ? photoAspect(photo.slug) : 1
  const slide = reduce ? 0 : 48

  // Portal to <body>: inside .section (z-10) the viewer would sit under the nav.
  return createPortal(
    <AnimatePresence>
      {photo && (
        <motion.div
          key="viewer"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          // --chrome: height kept free for the top bar and caption. Landscape
          // phones get slimmer bars so the photo can use the screen.
          className="fixed inset-0 z-[80] flex flex-col bg-[#0a0a0a]/[0.97] text-[#fafaf8] [--chrome:13rem] [@media(max-height:520px)]:[--chrome:7rem]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.4, ease: EASE_OUT_EXPO }}
          onClick={e => {
            if (e.target === e.currentTarget) onChange(null)
          }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 md:px-10 py-5 [@media(max-height:520px)]:py-1.5">
            <span className="font-display text-xs font-semibold tracking-[0.2em] tabular-nums text-[#fafaf8]/70">
              {String(index! + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
            </span>
            <button
              ref={closeRef}
              type="button"
              aria-label="Close viewer"
              onClick={() => onChange(null)}
              className="grid size-11 place-items-center rounded-full border border-white/20 transition-colors duration-500 hover:border-accent hover:bg-accent hover:text-on-accent"
            >
              <X size={18} strokeWidth={2.25} />
            </button>
          </div>

          {/* Photo */}
          <div
            className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-20"
            onClick={e => {
              if (e.target === e.currentTarget) onChange(null)
            }}
          >
            <AnimatePresence initial={false} mode="popLayout" custom={dir}>
              <motion.div
                key={photo.slug}
                custom={dir}
                className="relative cursor-grab touch-pan-y active:cursor-grabbing"
                style={{ aspectRatio: aspect, width: `min(100%, calc((100svh - var(--chrome)) * ${aspect}))` }}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * slide }),
                  center: { opacity: 1, x: 0 },
                  exit: (d: number) => ({ opacity: 0, x: -d * slide }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: reduce ? 0 : 0.55, ease: EASE_OUT_EXPO }}
                drag={n > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.5}
                onDragEnd={onDragEnd}
              >
                <img
                  src={photoSrc(photo.slug, 1200)}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <img
                  src={photoSrc(photo.slug, 2048)}
                  srcSet={photoSrcSet(photo.slug)}
                  sizes="92vw"
                  alt={`${photo.caption}, ${photo.location}`}
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Caption + controls */}
          <div className="flex items-end justify-between gap-6 px-6 md:px-10 pt-4 pb-6 md:pb-8 [@media(max-height:520px)]:pt-1.5 [@media(max-height:520px)]:pb-2.5">
            <div className="min-w-0" aria-live="polite">
              <p className="font-display font-semibold text-base md:text-lg line-clamp-2 [@media(max-height:520px)]:line-clamp-1">{photo.caption}</p>
              <p className="text-sm text-[#fafaf8]/60 truncate">{photo.location}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                aria-label="Previous photo"
                onClick={() => step(-1)}
                className="grid size-11 place-items-center rounded-full border border-white/20 transition-colors duration-500 hover:border-accent hover:bg-accent hover:text-on-accent"
              >
                <ArrowLeft size={18} strokeWidth={2.25} />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={() => step(1)}
                className="grid size-11 place-items-center rounded-full border border-white/20 transition-colors duration-500 hover:border-accent hover:bg-accent hover:text-on-accent"
              >
                <ArrowRight size={18} strokeWidth={2.25} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
