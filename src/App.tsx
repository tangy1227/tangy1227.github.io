import './index.css'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Music from './components/Music'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="noise">
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Music />
        <Contact />
      </main>
    </div>
  )
}
