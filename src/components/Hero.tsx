import { useEffect, useRef } from 'react'
import { motion, type Variants } from 'framer-motion'

function Waveform() {
  const bars = Array.from({ length: 60 })
  return (
    <div className="flex items-center gap-[3px] h-20 opacity-60">
      {bars.map((_, i) => {
        const height = Math.sin((i / bars.length) * Math.PI * 3) * 60 + 20
        const delay = (i / bars.length) * 1.2
        return (
          <div
            key={i}
            className="wave-bar"
            style={{
              height: `${height}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${0.8 + Math.random() * 0.8}s`,
            }}
          />
        )
      })}
    </div>
  )
}

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
}
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let w = canvas.width = canvas.offsetWidth
    let h = canvas.height = canvas.offsetHeight
    let frame = 0

    const resize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.strokeStyle = 'rgba(0,245,255,0.12)'
      ctx.lineWidth = 1.5

      for (let i = 0; i < 5; i++) {
        const amp = 30 + i * 18
        const freq = 0.008 + i * 0.002
        const speed = 0.015 + i * 0.006
        const yOffset = h / 2 + (i - 2) * 25

        ctx.globalAlpha = 0.3 - i * 0.04
        ctx.beginPath()
        for (let x = 0; x <= w; x += 3) {
          const y = yOffset + Math.sin(x * freq + frame * speed) * amp
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      frame++
      requestAnimationFrame(draw)
    }
    draw()
    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 overflow-hidden">
      {/* Background canvas waveform */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 70%)' }}
      />

      {/* Grid lines faint */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '80px 80px' }}
      />

      <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10 max-w-5xl">
        <motion.p variants={fadeUp} className="section-num mb-6">
          01 — INTRO
        </motion.p>

        <motion.div variants={fadeUp} className="mb-3">
          <Waveform />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-display text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.95] tracking-tight mb-6"
        >
          <span className="block text-white">Yilong</span>
          <span className="block gradient-text glow-text">Tang</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="text-gray-400 text-lg md:text-xl font-light max-w-xl mb-3 leading-relaxed">
          Music Technologist · Data Scientist · Sound Explorer
        </motion.p>

        <motion.p variants={fadeUp} className="font-mono-custom text-sm text-[#00f5ff]/60 mb-10">
          Georgia Tech · Music Technology MS
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
          <a
            href="#projects"
            data-hover
            className="group flex items-center gap-3 px-6 py-3 bg-[#00f5ff] text-black font-semibold text-sm tracking-wide hover:bg-[#00c8d4] transition-all duration-200"
          >
            VIEW WORK
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
          <a
            href="#contact"
            data-hover
            className="flex items-center gap-3 px-6 py-3 border border-white/20 text-white text-sm tracking-wide hover:border-[#00f5ff]/50 hover:text-[#00f5ff] transition-all duration-200"
          >
            GET IN TOUCH
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="section-num text-[10px]">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-[#00f5ff] to-transparent"
        />
      </motion.div>
    </section>
  )
}