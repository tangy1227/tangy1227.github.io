import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

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
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="photography" ref={ref} className="px-6 md:px-10 py-24 md:py-32 bg-[#f0efea] border-t border-[#e3e2dc]">
      <div className="max-w-7xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="eyebrow mb-6"
        >
          Photography — a hobby
        </motion.p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="display text-5xl md:text-7xl"
          >
            Through<br />the lens.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-[#6b6b66] max-w-sm"
          >
            A rolling selection of frames from wherever I happen to be. Hover to see them in color.
          </motion.p>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-auto gap-3 md:gap-4">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.caption}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.07 }}
              className={photo.span}
            >
              {/* TODO: replace with real photo */}
              <div className={`photo ${photo.ratio} w-full h-full group`}>
                <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/50 to-transparent">
                  <div className="p-4 relative z-10">
                    <p className="font-display font-semibold text-white text-sm">{photo.caption}</p>
                    <p className="text-white/70 text-xs">{photo.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-10"
        >
          {/* TODO: link to Instagram / portfolio */}
          <a href="#" className="font-display font-semibold text-sm uppercase tracking-wider link-underline">
            See more on Instagram →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
