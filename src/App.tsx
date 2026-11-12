import { useState } from 'react'
import './index.css'
import SmoothScroll from './components/SmoothScroll'
import Intro from './components/Intro'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Academia from './components/Academia'
import Music from './components/Music'
import Photography from './components/Photography'
import Contact from './components/Contact'

const ticker = [
  'Music Technology',
  'Signal Processing',
  'Machine Learning',
  'Production',
  'Photography',
  'Georgia Tech',
  'Atlanta, GA',
]

export default function App() {
  // Flips true as the intro curtain starts lifting; the hero waits for it.
  const [ready, setReady] = useState(false)

  return (
    <SmoothScroll>
      <Intro onDone={() => setReady(true)} />
      <Nav />
      <main>
        <Hero ready={ready} />
        {/* First thing to slide over the pinned hero: a thin ticker band. */}
        <div className="section border-t border-b border-line py-3">
          <Marquee items={ticker} />
        </div>
        <About />
        <Academia />
        <Music />
        <Photography />
        <Contact />
      </main>
    </SmoothScroll>
  )
}
