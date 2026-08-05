'use client'

import Link from 'next/link'
import { ArrowRight, Play, ShieldCheck, Wifi, Store } from 'lucide-react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

/* ─── Particle dots background ─────────────────────────────────────────────── */
const PARTICLES = [
  { id: 0, x: 12.5, y: 34.2, size: 2.1, dur: 18, delay: 0.5 },
  { id: 1, x: 85.3, y: 15.6, size: 1.8, dur: 14, delay: 1.2 },
  { id: 2, x: 45.1, y: 78.4, size: 3.0, dur: 22, delay: 2.0 },
  { id: 3, x: 67.8, y: 52.1, size: 1.5, dur: 16, delay: 0.8 },
  { id: 4, x: 28.4, y: 88.9, size: 2.4, dur: 20, delay: 1.5 },
  { id: 5, x: 92.1, y: 64.3, size: 1.9, dur: 12, delay: 2.8 },
  { id: 6, x: 55.6, y: 22.7, size: 2.8, dur: 24, delay: 0.2 },
  { id: 7, x: 38.2, y: 41.5, size: 1.6, dur: 15, delay: 1.9 },
  { id: 8, x: 74.9, y: 83.1, size: 2.2, dur: 19, delay: 3.1 },
  { id: 9, x: 19.3, y: 61.8, size: 2.7, dur: 17, delay: 0.6 },
  { id: 10, x: 81.7, y: 44.2, size: 1.4, dur: 13, delay: 2.3 },
  { id: 11, x: 63.4, y: 11.9, size: 2.5, dur: 21, delay: 1.1 },
  { id: 12, x: 31.8, y: 73.6, size: 1.7, dur: 16, delay: 2.6 },
  { id: 13, x: 96.2, y: 29.8, size: 2.9, dur: 23, delay: 0.4 },
  { id: 14, x: 49.5, y: 94.1, size: 1.8, dur: 15, delay: 1.7 },
];

/* ─── Stagger helpers ───────────────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}
const navbarVariants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Hero() {
  /* ── Mouse parallax for mockup ── */
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 60, damping: 18 })
  const springY = useSpring(my, { stiffness: 60, damping: 18 })
  const rotateY = useTransform(springX, [-300, 300], [6, -6])
  const rotateX = useTransform(springY, [-300, 300], [-5, 5])

  const [mounted, setMounted] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      mx.set(e.clientX - rect.left - rect.width / 2)
      my.set(e.clientY - rect.top - rect.height / 2)
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [mx, my])

  return (
    <section
      ref={heroRef}
      className="relative bg-[#0A2540] overflow-hidden pt-16"
      style={{ perspective: '1200px' }}
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Radial accent glow */}
      <div
        className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full opacity-[0.12] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00C897, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00C897, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Animated particle dots */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {PARTICLES.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-[#00C897]/40"
              style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
              animate={{ y: [0, -18, 0], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: Copy (staggered entry) ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00C897]/15 border border-[#00C897]/30 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00C897] animate-pulse" />
              <span className="text-xs font-semibold text-[#00C897] tracking-wide uppercase">
                Platform POS #1 untuk UMKM Indonesia
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-sans font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight mb-6 text-balance"
            >
              Kelola Bisnis Lebih{' '}
              <span className="text-[#00C897]">Mudah</span>{' '}
              dengan Cashora
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-white/70 leading-relaxed mb-8 max-w-xl font-body"
            >
              Platform POS modern dengan mode offline, tanpa biaya per cabang, dan keamanan perbankan. Dari warung hingga korporasi.
            </motion.p>

            {/* Trust indicators */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Wifi, label: 'Offline-First' },
                { icon: ShieldCheck, label: 'Keamanan 7 Lapis' },
                { icon: Store, label: 'Tanpa Biaya per Cabang' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-white/60 text-sm font-body">
                  <Icon className="w-4 h-4 text-[#00C897]" strokeWidth={2} />
                  <span>{label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              {/* Pulse CTA */}
              <Link href="/demo" className="relative inline-flex items-center gap-2 px-6 py-3.5 bg-[#00C897] text-[#0A2540] font-semibold rounded-xl text-sm group">
                {/* Pulse rings */}
                <span className="absolute inset-0 rounded-xl bg-[#00C897] opacity-0 group-hover:opacity-0 animate-ping-slow pointer-events-none" aria-hidden="true" />
                <Play className="w-4 h-4" fill="currentColor" strokeWidth={0} />
                Coba Demo Interaktif
              </Link>
              <Link
                href="/layanan"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-white border border-white/25 rounded-xl hover:bg-white/10 transition-colors text-sm font-semibold font-body"
              >
                Lihat Fitur
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.p variants={itemVariants} className="mt-6 text-xs text-white/40 font-body">
              Dipercaya oleh <strong className="text-white/70">10.000+</strong> merchant di seluruh Indonesia
            </motion.p>
          </motion.div>

          {/* ── Right: 3D Parallax Mockup ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            <motion.div
              style={{ rotateY, rotateX, transformStyle: 'preserve-3d' }}
              className="relative w-full max-w-lg"
            >
              {/* Main dashboard card */}
              <div className="bg-white rounded-2xl shadow-2xl shadow-black/40 overflow-hidden border border-white/10">
                {/* Browser chrome */}
                <div className="flex items-center gap-1.5 px-4 py-3 bg-[#F5F7FA] border-b border-gray-100">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <div className="ml-3 flex-1 bg-white rounded px-3 py-1 text-[10px] text-gray-400 font-mono">
                    cashora.id/owner/menu
                  </div>
                </div>

                {/* Dashboard UI */}
                <div className="p-4 bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[10px] text-gray-400 font-body">Selamat pagi, Budi 👋</p>
                      <p className="text-sm font-sans font-bold text-[#0A2540]">Dashboard Kasir</p>
                    </div>
                    <div className="flex items-center gap-1 bg-[#00C897]/10 px-2 py-1 rounded-full">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00C897]" />
                      <span className="text-[10px] font-semibold text-[#00C897]">Online</span>
                    </div>
                  </div>

                  {/* Stats row — animate reveal */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[
                      { label: 'Transaksi Hari Ini', value: '128', color: '#00C897' },
                      { label: 'Pendapatan', value: 'Rp 4,2Jt', color: '#0A2540' },
                      { label: 'Produk Terjual', value: '312', color: '#00C897' },
                    ].map((stat) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.5, delay: 0.9, ease: 'easeOut' }}
                        style={{ transformOrigin: 'left' }}
                        className="bg-[#F5F7FA] rounded-xl p-2.5"
                      >
                        <p className="text-[9px] text-gray-400 mb-1 font-body">{stat.label}</p>
                        <p className="text-sm font-bold font-sans" style={{ color: stat.color }}>
                          {stat.value}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-2 font-body">
                    Transaksi Terbaru
                  </p>
                  <div className="space-y-1.5">
                    {[
                      { name: 'Nasi Goreng + Es Teh', time: '09:42', amount: 'Rp 28.000', method: 'QRIS' },
                      { name: 'Ayam Bakar Komplit', time: '09:38', amount: 'Rp 45.000', method: 'Tunai' },
                      { name: 'Mie Ayam Bakso', time: '09:31', amount: 'Rp 22.000', method: 'QRIS' },
                    ].map((tx, i) => (
                      <motion.div
                        key={tx.time}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 1 + i * 0.1, ease: 'easeOut' }}
                        className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-[#F5F7FA] transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-[#00C897]/10 flex items-center justify-center">
                            <Store className="w-3 h-3 text-[#00C897]" />
                          </div>
                          <div>
                            <p className="text-[10px] font-medium text-[#0A2540] font-body">{tx.name}</p>
                            <p className="text-[9px] text-gray-400 font-body">{tx.time} · {tx.method}</p>
                          </div>
                        </div>
                        <p className="text-[10px] font-bold text-[#0A2540] font-body">{tx.amount}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating offline badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2, ease: 'easeOut' }}
                className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg px-3 py-2 flex items-center gap-2 border border-gray-100"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                  <Wifi className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-700 font-body">Offline Mode</p>
                  <p className="text-[9px] text-gray-400 font-body">Tetap berjalan!</p>
                </div>
              </motion.div>

              {/* Floating QRIS badge */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.3, ease: 'easeOut' }}
                className="absolute -top-4 -right-4 bg-[#0A2540] rounded-xl shadow-lg px-3 py-2"
              >
                <p className="text-[10px] font-bold text-[#00C897] font-body">QRIS TUNTAS</p>
                <p className="text-[9px] text-white/60 font-body">Tarik · Setor · Transfer</p>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Wave divider */}
      <div className="h-12 bg-[#F5F7FA]" style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }} />
    </section>
  )
}
