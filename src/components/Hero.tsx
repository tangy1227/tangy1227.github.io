import { motion, type Variants } from 'framer-motion'

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } },
}

// Bottom photo strip — replace each block with a real <img> later
const strip = [
  { label: 'Studio', ratio: 'aspect-[4/5]' },
  { label: 'Live set', ratio: 'aspect-[4/5]' },
  { label: 'Field', ratio: 'aspect-[4/5]' },
  { label: 'Lab', ratio: 'aspect-[4/5]' },
]

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-between pt-28 md:pt-32 pb-10 px-6 md:px-10">
      <motion.div variants={stagger} initial="hidden" animate="show" className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full">
        <motion.p variants={fadeUp} className="eyebrow mb-8">
          Yilong Tang — Atlanta, GA
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="display text-[clamp(2.6rem,11vw,9.5rem)] mb-8"
        >
          <span className="block">Academia.</span>
          <span className="block">Music.</span>
          <span className="block accent">Photography.</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="text-[#6b6b66] text-lg md:text-2xl font-light max-w-2xl leading-snug mb-10">
          Music tech researcher. Producer and photographer on the side.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
          <a href="#academia" className="btn">
            View work <span>→</span>
          </a>
          <a href="#contact" className="btn-outline">
            Get in touch
          </a>
        </motion.div>
      </motion.div>

      {/* Photo strip */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="max-w-7xl mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-3 mt-12"
      >
        {strip.map(item => (
          // TODO: replace with real photo
          <div key={item.label} className={`photo ${item.ratio} flex items-end`}>
            <span className="relative z-10 p-3 text-xs font-display font-semibold uppercase tracking-widest text-white/90 mix-blend-difference">
              {item.label}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
