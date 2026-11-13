import { useState } from 'react'
import RevealLines from './motion/RevealLines'
import RevealChars from './motion/RevealChars'
import RevealImage from './motion/RevealImage'
import RollText from './motion/RollText'
import PhotoViewer from './PhotoViewer'
import { ArrowSwap } from './ui/Button'
import { links } from '../data/links'
import { gallery, galleryRows, photoAspect, photoSrc, photoSrcSet } from '../data/photos'

const indexOf = new Map(gallery.map((p, i) => [p.slug, i]))

export default function Photography() {
  const [viewer, setViewer] = useState<number | null>(null)

  return (
    <section id="photography" className="section px-6 md:px-10 py-24 md:py-32 bg-bg-alt border-t border-line">
      <div className="max-w-7xl mx-auto w-full">
        <p className="eyebrow mb-6">
          <RevealChars text="Photography — a hobby" />
        </p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <RevealLines
            className="display text-5xl md:text-7xl"
            lines={['Through', 'the lens.']}
          />
          <RevealLines
            as="p"
            className="text-muted max-w-sm"
            delay={0.3}
            bar="var(--bg-alt)"
            lines={['National parks out west, the Oregon coast, and home cities. Hover for color, click to view full size.']}
          />
        </div>

        {/* Gallery: justified rows. Each photo's flex-grow and aspect-ratio are
            its own width/height, so a row fills the width at one shared height
            with nothing cropped. */}
        <div className="flex flex-col gap-3 md:gap-4">
          {galleryRows.map((row, r) => (
            <div key={r} className="flex flex-wrap items-start gap-3 md:gap-4">
              {row.map((photo, i) => {
                const aspect = photoAspect(photo.slug)
                return (
                  <div
                    key={photo.slug}
                    className="min-w-0 basis-0 max-md:first:basis-full"
                    style={{ flexGrow: aspect, aspectRatio: aspect }}
                  >
                    <RevealImage className="h-full" delay={i * 0.08} fill>
                      <button
                        type="button"
                        onClick={() => setViewer(indexOf.get(photo.slug) ?? 0)}
                        aria-label={`View ${photo.caption}, ${photo.location}`}
                        className="photo group block h-full w-full cursor-zoom-in text-left focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent"
                      >
                        <img
                          src={photoSrc(photo.slug)}
                          srcSet={photoSrcSet(photo.slug)}
                          sizes="(min-width: 768px) 40vw, 100vw"
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <span className="absolute inset-0 flex items-end opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 bg-gradient-to-t from-black/55 to-transparent">
                          <span className="relative z-10 p-4">
                            <span className="block font-display font-semibold text-white text-sm">{photo.caption}</span>
                            <span className="block text-white/70 text-xs">{photo.location}</span>
                          </span>
                        </span>
                      </button>
                    </RevealImage>
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        <div className="mt-10">
          <a
            href={links.instagram}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 font-display font-semibold text-sm uppercase tracking-wider"
          >
            <RollText text="See more on Instagram" />
            <ArrowSwap up />
          </a>
        </div>
      </div>

      <PhotoViewer photos={gallery} index={viewer} onChange={setViewer} />
    </section>
  )
}
