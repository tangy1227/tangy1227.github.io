import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import RevealLines from './motion/RevealLines'
import RevealChars from './motion/RevealChars'
import ScrollWords, { type Token } from './motion/ScrollWords'
import { EASE_OUT_EXPO } from '../lib/motion'

const skillGroups = [
  { label: 'Languages', items: ['Python', 'MATLAB', 'JavaScript', 'SQL', 'R', 'Java'] },
  { label: 'ML & Data', items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'NumPy', 'pandas', 'librosa', 'D3.js'] },
  { label: 'Audio & Tools', items: ['Max/MSP', 'Logic Pro X', 'Ableton Live', 'AWS', 'GCP'] },
]

const intro: Token[] = [
  { text: 'Music Tech grad student at ' },
  { text: 'Georgia Tech.', strong: true },
  { text: ' Piano since four, producing since high school, now researching ' },
  { text: 'music & speech', strong: true },
  { text: ' through signal processing and machine learning.' },
]

export default function About() {
  const skillsRef = useRef<HTMLDivElement>(null)
  const skillsInView = useInView(skillsRef, { once: true, margin: '0px 0px -10% 0px' })

  return (
    <section id="about" className="section px-6 md:px-10 py-24 md:py-32">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-4">
          <p className="eyebrow mb-6">
            <RevealChars text="About" />
          </p>
          <RevealLines
            className="display text-4xl md:text-5xl"
            lines={['A little', 'about me.']}
          />
        </div>

        <div className="md:col-span-8">
          <ScrollWords
            tokens={intro}
            className="text-xl md:text-2xl leading-snug text-[#3a3a37] max-w-2xl"
            strongClassName="text-[#0a0a0a] font-medium"
          />

          <div ref={skillsRef} className="mt-12 space-y-6">
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
