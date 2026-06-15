import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Music', href: '#music' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = links.map(l => document.querySelector(l.href))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(`#${e.target.id}`) })
      },
      { rootMargin: '-40% 0px -40% 0px' }
    )
    sections.forEach(s => s && observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 transition-all duration-500 ${
        scrolled ? 'bg-[#080808]/90 backdrop-blur-md border-b border-white/5' : ''
      }`}
    >
      {/* Logo */}
      <a href="#" className="font-mono-custom text-sm tracking-widest text-[#00f5ff] hover:opacity-70 transition-opacity">
        YT.
      </a>

      {/* Links */}
      <div className="hidden md:flex gap-8">
        {links.map(link => (
          <a
            key={link.href}
            href={link.href}
            data-hover
            className={`text-xs tracking-widest uppercase transition-colors duration-200 hover-link ${
              active === link.href ? 'text-[#00f5ff]' : 'text-gray-400 hover:text-white'
            }`}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <a
        href="mailto:ytang@gatech.edu"
        data-hover
        className="hidden md:block font-mono-custom text-xs px-4 py-2 border border-[#00f5ff]/40 text-[#00f5ff] hover:bg-[#00f5ff]/10 transition-all duration-200 tracking-wider"
      >
        HIRE ME
      </a>
    </motion.nav>
  )
}