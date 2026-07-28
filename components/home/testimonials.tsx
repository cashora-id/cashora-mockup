'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Animated counter hook ── */
function useCountUp(target: number, duration = 1500, shouldStart = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!shouldStart) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, shouldStart])
  return count
}

const stats = [
  { raw: 10000, display: (n: number) => `${(n / 1000).toFixed(0)}rb+`, label: 'Merchant Aktif' },
  { raw: 2500000, display: (n: number) => `${(n / 1000000).toFixed(1)} Jt`, label: 'Transaksi/Hari' },
  { raw: 34, display: (n: number) => `${n}`, label: 'Kota di Indonesia' },
  { raw: 999, display: (n: number) => `${(n / 10).toFixed(1)}%`, label: 'Uptime' },
]

const testimonials = [
  {
    name: 'Budi Santoso',
    role: 'Pemilik Warung Makan Pak Budi',
    city: 'Surabaya',
    text: 'Sejak pakai Cashora, omzet naik 30% karena saya bisa pantau semua cabang dari HP. Offline mode-nya penyelamat banget waktu internet mati!',
    rating: 5,
    initials: 'BS',
    color: '#00C897',
  },
  {
    name: 'Siti Rahayu',
    role: 'Manajer Operasional, Restoran Nusantara',
    city: 'Jakarta',
    text: 'Fitur Kitchen Display System benar-benar mengubah cara kerja tim kami. Tidak ada lagi pesanan terlewat dan pelanggan lebih puas.',
    rating: 5,
    initials: 'SR',
    color: '#0A2540',
  },
  {
    name: 'Ahmad Fauzi',
    role: 'Direktur, Retail Elektronik Fauzi',
    city: 'Bandung',
    text: 'Harga expansion-neutral bikin saya berani buka 5 cabang baru tahun ini. Biaya sama, fitur lengkap, support responsif. Recommended!',
    rating: 5,
    initials: 'AF',
    color: '#00C897',
  },
  {
    name: 'Dewi Kusuma',
    role: 'Pemilik Kafe Dewi',
    city: 'Yogyakarta',
    text: 'QRIS Tuntas sangat memudahkan. Pelanggan bisa bayar pakai apa saja, dan saya bisa tarik tunai langsung dari saldo tanpa ribet.',
    rating: 5,
    initials: 'DK',
    color: '#0A2540',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  /* Intersection observer for counter trigger */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  /* Auto-advance testimonials every 5 s */
  useEffect(() => {
    const id = setInterval(() => {
      setDirection(1)
      setCurrent((c) => (c + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  const navigate = (dir: 1 | -1) => {
    setDirection(dir)
    setCurrent((c) => (c + dir + testimonials.length) % testimonials.length)
  }

  /* Counts */
  const c0 = useCountUp(stats[0].raw, 1500, inView)
  const c1 = useCountUp(stats[1].raw, 1500, inView)
  const c2 = useCountUp(stats[2].raw, 1500, inView)
  const c3 = useCountUp(stats[3].raw, 1500, inView)
  const counts = [c0, c1, c2, c3]

  const slideVariants = {
    enter: (d: number) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
    exit: (d: number) => ({ opacity: 0, x: d * -40, transition: { duration: 0.3, ease: 'easeIn' as const } }),
  }

  return (
    <section ref={sectionRef} className="bg-[#F5F7FA] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Stats with count-up */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              className="bg-[#0A2540] rounded-2xl p-6 text-center border border-[#0A2540]/10"
            >
              <p className="font-sans font-bold text-3xl sm:text-4xl text-[#00C897] mb-1">
                {stat.display(counts[i])}
              </p>
              <p className="text-sm text-white/60 font-body">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className="text-sm font-semibold text-[#00C897] uppercase tracking-widest mb-3 font-body">
            Kata Merchant Kami
          </p>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#0A2540] text-balance">
            Dipercaya Ribuan Pengusaha Indonesia
          </h2>
        </motion.div>

        {/* Slider */}
        <div className="relative max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="p-8 sm:p-10"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <blockquote className="text-lg sm:text-xl text-[#0A2540] leading-relaxed font-body mb-8">
                  &ldquo;{testimonials[current].text}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-sans font-bold text-sm shrink-0"
                    style={{ backgroundColor: testimonials[current].color }}
                  >
                    {testimonials[current].initials}
                  </div>
                  <div>
                    <p className="font-sans font-bold text-[#0A2540]">{testimonials[current].name}</p>
                    <p className="text-sm text-gray-500 font-body">
                      {testimonials[current].role} · {testimonials[current].city}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-[#0A2540] hover:border-[#0A2540] hover:text-white text-gray-500 transition-all"
              aria-label="Testimoni sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'w-6 bg-[#00C897]' : 'w-2 bg-gray-300'
                  }`}
                  aria-label={`Testimoni ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => navigate(1)}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-[#0A2540] hover:border-[#0A2540] hover:text-white text-gray-500 transition-all"
              aria-label="Testimoni berikutnya"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
