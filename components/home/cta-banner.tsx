'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden py-24" style={{ background: 'linear-gradient(135deg, #0A2540 0%, #0d3560 50%, #00C897 130%)' }}>
      {/* Animated SVG wave at top */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 56C240 0 480 56 720 28C960 0 1200 56 1440 28V0H0V56Z" fill="#F5F7FA" />
        </svg>
      </div>

      {/* Animated SVG wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full rotate-180">
          <path d="M0 56C240 0 480 56 720 28C960 0 1200 56 1440 28V0H0V56Z" fill="#F5F7FA" />
        </svg>
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #00C897, transparent 70%)', top: '-20%', left: '-5%' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.14, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #00C897, transparent 70%)', bottom: '-20%', right: '-5%' }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.06, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-sm font-semibold text-[#00C897] uppercase tracking-widest mb-4 font-body">
          Mulai Sekarang
        </p>
        <h2 className="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-6 text-balance">
          Siap Tingkatkan Operasional Bisnis Anda?
        </h2>
        <p className="text-lg text-white/65 mb-10 max-w-xl mx-auto font-body leading-relaxed">
          Bergabung dengan 10.000+ merchant aktif yang sudah membuktikan manfaat Cashora. Coba gratis 14 hari, tanpa kartu kredit.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-7 py-4 bg-[#00C897] text-[#0A2540] font-semibold rounded-xl hover:bg-[#00a87e] transition-colors text-base"
          >
            Daftar Sekarang — Gratis
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-7 py-4 text-white border border-white/25 rounded-xl hover:bg-white/10 transition-colors text-base font-semibold font-body"
          >
            Jadwalkan Demo
          </Link>
        </div>
        <p className="mt-6 text-sm text-white/40 font-body">
          Tidak perlu kartu kredit · Setup dalam 5 menit · Dibatalkan kapan saja
        </p>
      </motion.div>
    </section>
  )
}
