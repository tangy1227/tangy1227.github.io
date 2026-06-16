import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const skillGroups = [
  { label: 'Languages', items: ['Python', 'MATLAB', 'JavaScript', 'SQL', 'R', 'Java'] },
  { label: 'ML & Data', items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'NumPy', 'pandas', 'librosa', 'D3.js'] },
  { label: 'Audio & Tools', items: ['Max/MSP', 'Logic Pro X', 'Ableton Live', 'AWS', 'GCP'] },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="px-6 md:px-10 py-24 md:py-32 border-t border-[#e3e2dc]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="md:col-span-4"
        >
          <p className="eyebrow mb-6">About</p>
          <h2 className="display text-4xl md:text-5xl">
            A little<br />about me.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="md:col-span-8"
        >
          <p className="text-xl md:text-2xl leading-snug text-[#3a3a37] max-w-2xl">
            Music Tech grad student at <span className="text-[#0a0a0a] font-medium">Georgia Tech</span>.
            Piano since four, producing since high school, now researching{' '}
            <span className="text-[#0a0a0a] font-medium">music &amp; speech</span> through signal
            processing and machine learning.
          </p>

          <div className="mt-12 space-y-6">
            {skillGroups.map(group => (
              <div key={group.label} className="grid md:grid-cols-12 gap-3 items-start">
                <p className="md:col-span-3 eyebrow pt-1">{group.label}</p>
                <div className="md:col-span-9 flex flex-wrap gap-2">
                  {group.items.map(item => (
                    <span key={item} className="tag">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
