import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import RevealLines from './motion/RevealLines'
import RevealChars from './motion/RevealChars'
import SectionLabel from './ui/SectionLabel'
import RevealImage from './motion/RevealImage'
import ScrollWords, { type Token } from './motion/ScrollWords'
import { EASE_OUT_EXPO } from '../lib/motion'
import { photoSrc, photoSrcSet, portrait } from '../data/photos'

const skillGroups = [
  { label: 'Code', items: ['Python', 'Rust', 'C#', 'MATLAB', 'JavaScript', 'HTML/CSS', 'SQL', 'R', 'Java'] },
  { label: 'ML & Data', items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'NumPy', 'SciPy', 'pandas', 'Matplotlib', 'librosa', 'D3.js'] },
  { label: 'Cloud', items: ['AWS', 'GCP', 'Docker', 'Hadoop'] },
  { label: 'Audio & Tools', items: ['Max/MSP', 'Ableton Live', 'Logic Pro X', 'REAPER', 'Unity', 'After Effects', 'Photoshop'] },
  { label: 'Speaks', items: ['English', 'Mandarin'] },
]

const intro: Token[] = [
  { text: 'AI engineer at ' },
  { text: 'Satelytics,', strong: true },
  { text: ' with a B.S. and M.S. in Music Technology from ' },
  { text: 'Georgia Tech.', strong: true },
  { text: ' Piano since four, producing since high school. My research centered on ' },
  { text: 'music & speech', strong: true },
  { text: ' through signal processing and machine learning.' },
]

export default function About() {
  const skillsRef = useRef<HTMLDivElement>(null)
  const skillsInView = useInView(skillsRef, { once: true, margin: '0px 0px -10% 0px' })

  return (
    <section id="about" className="section px-6 md:px-10 py-24 md:py-32">
      {/* Tablet: heading + portrait | intro, skills full width below.
          lg: the left column spans both rows, skills sit under the intro. */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 lg:grid-rows-[auto_1fr] gap-10 md:gap-x-12 md:gap-y-14 lg:gap-x-16 lg:gap-y-12">
        <div className="md:col-span-5 lg:col-span-4 lg:row-span-2">
          <SectionLabel n={1} text="About" className="mb-6" />
          <RevealLines
            className="display text-4xl md:text-5xl"
            lines={['A little', 'about me.']}
          />
          <RevealImage className="mt-10 max-w-[340px] md:max-w-none" delay={0.15}>
            <img
              src={photoSrc(portrait.slug, 2048)}
              srcSet={photoSrcSet(portrait.slug)}
              sizes="(min-width: 768px) 40vw, 340px"
              alt={portrait.alt}
              loading="lazy"
              decoding="async"
              className="block aspect-[4/5] w-full object-cover"
            />
          </RevealImage>
        </div>

        <div className="md:col-span-7 lg:col-span-8">
          <ScrollWords
            tokens={intro}
            className="text-xl md:text-2xl leading-snug text-ink-soft max-w-2xl"
            strongClassName="text-ink font-medium"
          />
        </div>

        <div className="md:col-span-12 lg:col-span-8 lg:col-start-5">
          <div ref={skillsRef} className="space-y-6">
            {skillGroups.map((group, g) => (
              <div key={group.label} className="grid md:grid-cols-12 gap-3 items-start">
                <p className="md:col-span-3 eyebrow pt-1">
                  <RevealChars text={group.label} />
                </p>
                <div className="md:col-span-9 flex flex-wrap gap-2">
                  {group.items.map((item, i) => (
                    <motion.span
                      key={item}
                      className="tag"
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={skillsInView ? { opacity: 1, y: 0, scale: 1 } : undefined}
                      transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: g * 0.12 + i * 0.04 }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
