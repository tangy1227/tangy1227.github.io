import { useEffect, useState } from 'react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Academia', href: '#academia' },
  { label: 'Music', href: '#music' },
  { label: 'Photography', href: '#photography' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = links.map(l => document.querySelector(l.href))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(`#${e.target.id}`) })
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    sections.forEach(s => s && observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-[#fafaf8]/90 backdrop-blur-md border-b border-[#e3e2dc]' : ''
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-10 py-4">
        {/* Name */}
        <a href="#top" className="font-display font-bold uppercase tracking-tight text-lg hover:text-[#ffb800] transition-colors">
          Yilong Tang
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-9">
          {links.slice(0, -1).map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`font-display text-xs font-semibold uppercase tracking-[0.16em] transition-colors ${
                active === link.href ? 'text-[#ffb800]' : 'text-[#0a0a0a] hover:text-[#6b6b66]'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="font-display text-xs font-semibold uppercase tracking-[0.12em] px-4 py-2 border border-[#0a0a0a] rounded-full hover:bg-[#0a0a0a] hover:text-[#fafaf8] transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(o => !o)}
          className="md:hidden flex flex-col gap-1.5 p-1"
        >
          <span className={`block w-6 h-0.5 bg-[#0a0a0a] transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#0a0a0a] transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#0a0a0a] transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-[#fafaf8] border-b border-[#e3e2dc] px-6 pb-6 flex flex-col gap-4">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`font-display text-sm font-semibold uppercase tracking-[0.16em] ${
                active === link.href ? 'text-[#ffb800]' : 'text-[#0a0a0a]'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
