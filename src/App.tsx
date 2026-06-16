import './index.css'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Academia from './components/Academia'
import Music from './components/Music'
import Photography from './components/Photography'
import Contact from './components/Contact'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Academia />
        <Music />
        <Photography />
        <Contact />
      </main>
    </>
  )
}
