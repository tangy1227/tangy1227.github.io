import RevealLines from './motion/RevealLines'
import RevealChars from './motion/RevealChars'
import RevealImage from './motion/RevealImage'
import RollText from './motion/RollText'
import { ArrowSwap } from './ui/Button'
import { links } from '../data/links'

// TODO: replace each tile with a real <img>. `span` controls grid sizing.
const photos = [
  { caption: 'Morning fog', location: 'Blue Ridge, GA', span: 'md:col-span-2 md:row-span-2', ratio: 'aspect-square' },
  { caption: 'Neon alley', location: 'Atlanta, GA', span: '', ratio: 'aspect-[4/5]' },
  { caption: 'Low tide', location: 'Tybee Island', span: '', ratio: 'aspect-[4/5]' },
  { caption: 'Rooftop', location: 'Midtown', span: '', ratio: 'aspect-[4/5]' },
  { caption: 'Studio light', location: 'Home studio', span: '', ratio: 'aspect-[4/5]' },
  { caption: 'Crowd', location: 'Live show', span: 'md:col-span-2', ratio: 'aspect-[16/9]' },
  { caption: 'Stillness', location: 'Piedmont Park', span: '', ratio: 'aspect-[4/5]' },
]

export default function Photography() {
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
            lines={['A rolling selection of frames from wherever I happen to be. Hover to see them in color.']}
          />
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-auto gap-3 md:gap-4">
          {photos.map((photo, i) => (
            <RevealImage key={photo.caption} className={photo.span} delay={(i % 4) * 0.08} fill>
              {/* TODO: replace with real photo */}
              <div className={`photo ${photo.ratio} w-full h-full group`}>
                <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/50 to-transparent">
                  <div className="p-4 relative z-10">
                    <p className="font-display font-semibold text-white text-sm">{photo.caption}</p>
                    <p className="text-white/70 text-xs">{photo.location}</p>
                  </div>
                </div>
              </div>
            </RevealImage>
          ))}
        </div>

        <div className="mt-10">
          <a
            href={links.instagram || '#'}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 font-display font-semibold text-sm uppercase tracking-wider"
          >
            <RollText text="See more on Instagram" />
            <ArrowSwap up />
          </a>
        </div>
      </div>
    </section>
  )
}
