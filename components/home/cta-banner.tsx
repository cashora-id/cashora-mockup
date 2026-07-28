import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CtaBanner() {
  return (
    <section className="bg-[#0A2540] py-20 relative overflow-hidden">
      {/* Decoration */}
      <div
        className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #00C897, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #00C897, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
            className="inline-flex items-center gap-2 px-7 py-4 text-white border border-white/25 rounded-xl hover:bg-white/10 transition-colors text-base font-semibold"
          >
            Jadwalkan Demo
          </Link>
        </div>
        <p className="mt-6 text-sm text-white/40 font-body">
          Tidak perlu kartu kredit · Setup dalam 5 menit · Dibatalkan kapan saja
        </p>
      </div>
    </section>
  )
}
