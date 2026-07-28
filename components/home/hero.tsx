'use client'

import Link from 'next/link'
import { ArrowRight, Play, ShieldCheck, Wifi, Store } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-[#0A2540] overflow-hidden pt-16">
      {/* Subtle decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Accent glow */}
      <div
        className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #00C897, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Copy */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00C897]/15 border border-[#00C897]/30 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00C897] animate-pulse" />
              <span className="text-xs font-semibold text-[#00C897] tracking-wide uppercase">
                Platform POS #1 untuk UMKM Indonesia
              </span>
            </div>

            <h1 className="font-sans font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight mb-6 text-balance">
              Kelola Bisnis Lebih{' '}
              <span className="text-[#00C897]">Mudah</span>{' '}
              dengan Cashora
            </h1>

            <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-xl">
              Platform POS modern dengan mode offline, tanpa biaya per cabang, dan keamanan perbankan. Dari warung hingga korporasi.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Wifi, label: 'Offline-First' },
                { icon: ShieldCheck, label: 'Keamanan 7 Lapis' },
                { icon: Store, label: 'Tanpa Biaya per Cabang' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-white/60 text-sm">
                  <Icon className="w-4 h-4 text-[#00C897]" strokeWidth={2} />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#00C897] text-[#0A2540] font-semibold rounded-xl hover:bg-[#00a87e] transition-colors text-sm"
              >
                <Play className="w-4 h-4" fill="currentColor" strokeWidth={0} />
                Coba Demo Interaktif
              </Link>
              <Link
                href="/layanan"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-white border border-white/25 rounded-xl hover:bg-white/10 transition-colors text-sm font-semibold"
              >
                Lihat Fitur
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Social proof */}
            <p className="mt-6 text-xs text-white/40">
              Dipercaya oleh <strong className="text-white/70">10.000+</strong> merchant di seluruh Indonesia
            </p>
          </div>

          {/* Right — Dashboard mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              {/* Main dashboard card */}
              <div className="bg-white rounded-2xl shadow-2xl shadow-black/40 overflow-hidden border border-white/10">
                {/* Browser chrome */}
                <div className="flex items-center gap-1.5 px-4 py-3 bg-[#F5F7FA] border-b border-gray-100">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <div className="ml-3 flex-1 bg-white rounded px-3 py-1 text-[10px] text-gray-400 font-mono">
                    cashora.id/dashboard
                  </div>
                </div>

                {/* Dashboard UI */}
                <div className="p-4 bg-white">
                  {/* Header */}
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

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[
                      { label: 'Transaksi Hari Ini', value: '128', color: '#00C897' },
                      { label: 'Pendapatan', value: 'Rp 4,2Jt', color: '#0A2540' },
                      { label: 'Produk Terjual', value: '312', color: '#00C897' },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-[#F5F7FA] rounded-xl p-2.5">
                        <p className="text-[9px] text-gray-400 mb-1 font-body">{stat.label}</p>
                        <p
                          className="text-sm font-bold font-sans"
                          style={{ color: stat.color }}
                        >
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Recent transactions */}
                  <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-2 font-body">
                    Transaksi Terbaru
                  </p>
                  <div className="space-y-1.5">
                    {[
                      { name: 'Nasi Goreng + Es Teh', time: '09:42', amount: 'Rp 28.000', method: 'QRIS' },
                      { name: 'Ayam Bakar Komplit', time: '09:38', amount: 'Rp 45.000', method: 'Tunai' },
                      { name: 'Mie Ayam Bakso', time: '09:31', amount: 'Rp 22.000', method: 'QRIS' },
                    ].map((tx) => (
                      <div
                        key={tx.time}
                        className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-[#F5F7FA] transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-[#00C897]/10 flex items-center justify-center">
                            <Store className="w-3 h-3 text-[#00C897]" />
                          </div>
                          <div>
                            <p className="text-[10px] font-medium text-[#0A2540] font-body">{tx.name}</p>
                            <p className="text-[9px] text-gray-400 font-body">{tx.time} • {tx.method}</p>
                          </div>
                        </div>
                        <p className="text-[10px] font-bold text-[#0A2540] font-body">{tx.amount}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating offline badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg px-3 py-2 flex items-center gap-2 border border-gray-100">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                  <Wifi className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-700 font-body">Offline Mode</p>
                  <p className="text-[9px] text-gray-400 font-body">Tetap berjalan!</p>
                </div>
              </div>

              {/* Floating QRIS badge */}
              <div className="absolute -top-4 -right-4 bg-[#0A2540] rounded-xl shadow-lg px-3 py-2">
                <p className="text-[10px] font-bold text-[#00C897] font-body">QRIS TUNTAS</p>
                <p className="text-[9px] text-white/60 font-body">Tarik · Setor · Transfer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="h-12 bg-[#F5F7FA]" style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }} />
    </section>
  )
}
