'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from 'next/link'
import { Check, X, ChevronDown, Zap } from 'lucide-react'

const plans = [
  {
    name: 'Basic',
    desc: 'Untuk UMKM dan usaha kecil yang baru memulai.',
    monthly: 149000,
    yearly: 126000,
    popular: false,
    cta: 'Pilih Basic',
    ctaHref: '/register',
    features: [
      '1 outlet',
      'Hingga 3 kasir',
      'Kasir & POS dasar',
      'Manajemen produk & stok',
      'QRIS & pembayaran digital',
      'Laporan harian',
      'Support via email',
      null,
      null,
      null,
    ],
  },
  {
    name: 'Pro',
    desc: 'Untuk restoran, retail berkembang, dan multi-cabang.',
    monthly: 299000,
    yearly: 254000,
    popular: true,
    cta: 'Pilih Pro',
    ctaHref: '/register',
    features: [
      'Cabang tidak terbatas',
      'Kasir tidak terbatas',
      'Semua fitur Basic',
      'Kitchen Display System',
      'Manajemen meja & reservasi',
      'Integrasi GoFood/GrabFood/ShopeeFood',
      'CRM & program loyalitas',
      'Laporan lengkap & ekspor',
      'QRIS Tuntas (tarik/setor)',
      'Support prioritas (chat 24/7)',
    ],
  },
  {
    name: 'Enterprise',
    desc: 'Untuk korporasi dan franchise dengan kebutuhan khusus.',
    monthly: null,
    yearly: null,
    popular: false,
    cta: 'Hubungi Kami',
    ctaHref: '/kontak',
    features: [
      'Semua fitur Pro',
      'White-label & custom branding',
      'Integrasi ERP/akuntansi',
      'SLA premium 99,9% uptime',
      'Onboarding & training tim',
      'Dedicated account manager',
      'Custom report & API',
      'Audit keamanan berkala',
      'Hosting dedicated (opsional)',
      'Kontrak fleksibel',
    ],
  },
]

const comparison = [
  { feature: 'Jumlah outlet', basic: '1', pro: 'Tidak terbatas', enterprise: 'Tidak terbatas' },
  { feature: 'Jumlah kasir', basic: '3', pro: 'Tidak terbatas', enterprise: 'Tidak terbatas' },
  { feature: 'Kasir & POS', basic: true, pro: true, enterprise: true },
  { feature: 'Mode offline', basic: true, pro: true, enterprise: true },
  { feature: 'QRIS & e-wallet', basic: true, pro: true, enterprise: true },
  { feature: 'QRIS Tuntas (tarik/setor)', basic: false, pro: true, enterprise: true },
  { feature: 'Kitchen Display System', basic: false, pro: true, enterprise: true },
  { feature: 'Manajemen meja & reservasi', basic: false, pro: true, enterprise: true },
  { feature: 'Integrasi GoFood/GrabFood', basic: false, pro: true, enterprise: true },
  { feature: 'CRM & loyalitas pelanggan', basic: false, pro: true, enterprise: true },
  { feature: 'Laporan lengkap & ekspor', basic: 'Dasar', pro: true, enterprise: true },
  { feature: 'API & integrasi ERP', basic: false, pro: false, enterprise: true },
  { feature: 'White-label & branding', basic: false, pro: false, enterprise: true },
  { feature: 'Dedicated account manager', basic: false, pro: false, enterprise: true },
  { feature: 'Support', basic: 'Email', pro: 'Chat 24/7', enterprise: 'Dedicated' },
]

const faqs = [
  {
    q: 'Apakah ada biaya transaksi per pembayaran?',
    a: 'Tidak ada biaya transaksi tersembunyi dari Cashora. Biaya QRIS mengikuti MDR (Merchant Discount Rate) standar BI sebesar 0,3% untuk usaha mikro dan 0,7% untuk usaha lainnya, yang langsung dikenakan oleh penyedia QRIS—bukan Cashora.',
  },
  {
    q: 'Bisakah saya upgrade atau downgrade paket kapan saja?',
    a: 'Ya, Anda bisa upgrade kapan saja dan efektif langsung. Untuk downgrade, berlaku di awal siklus penagihan berikutnya. Tidak ada biaya penalti untuk perubahan paket.',
  },
  {
    q: 'Apakah harga berubah jika saya buka cabang baru?',
    a: 'Tidak! Inilah keunggulan model expansion-neutral kami. Paket Pro dan Enterprise memperbolehkan cabang tidak terbatas dengan harga tetap. Buka 1 atau 50 cabang—biayanya sama.',
  },
  {
    q: 'Apa yang terjadi setelah trial 14 hari berakhir?',
    a: 'Setelah masa trial, akun Anda akan beralih ke paket Basic (gratis dengan fitur terbatas) atau Anda bisa pilih paket berbayar. Data Anda aman dan tidak akan dihapus.',
  },
  {
    q: 'Apakah tersedia dukungan dalam bahasa Indonesia?',
    a: 'Tentu! Seluruh tim support kami adalah orang Indonesia, siap membantu via chat, email, dan telepon dalam Bahasa Indonesia. Paket Pro dan Enterprise mendapatkan akses support 24/7.',
  },
]

function fmt(n: number) {
  return new Intl.NumberFormat('id-ID').format(n)
}

export default function HargaPage() {
  const [yearly, setYearly] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i)

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Header */}
        <section className="bg-[#0A2540] py-16 text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="text-sm font-semibold text-[#00C897] uppercase tracking-widest mb-3 font-body">
              Harga Transparan
            </p>
            <h1 className="font-sans font-bold text-4xl sm:text-5xl text-white mb-4 text-balance">
              Harga Sederhana,<br />Skalakan Tanpa Beban
            </h1>
            <p className="text-white/65 font-body text-lg">
              Satu harga, cabang tidak terbatas. Tidak ada biaya kejutan.
            </p>
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-[#F5F7FA] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={`text-sm font-semibold font-body ${!yearly ? 'text-[#0A2540]' : 'text-gray-400'}`}>Bulanan</span>
              <button
                onClick={() => setYearly(!yearly)}
                className={`relative w-14 h-7 rounded-full transition-colors ${yearly ? 'bg-[#00C897]' : 'bg-gray-300'}`}
                aria-label="Toggle billing period"
              >
                <div
                  className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${yearly ? 'translate-x-8' : 'translate-x-1'}`}
                />
              </button>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-semibold font-body ${yearly ? 'text-[#0A2540]' : 'text-gray-400'}`}>Tahunan</span>
                <span className="text-xs font-bold text-white bg-[#00C897] px-2 py-0.5 rounded-full font-body">Hemat 15%</span>
              </div>
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative bg-white rounded-2xl p-7 border transition-shadow ${
                    plan.popular
                      ? 'border-[#00C897] shadow-xl shadow-[#00C897]/10'
                      : 'border-gray-100 hover:shadow-md'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="bg-[#00C897] text-[#0A2540] text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1.5 font-body whitespace-nowrap">
                        <Zap className="w-3 h-3" fill="currentColor" strokeWidth={0} />
                        Paling Populer
                      </span>
                    </div>
                  )}

                  <h3 className="font-sans font-bold text-xl text-[#0A2540] mb-1">{plan.name}</h3>
                  <p className="text-sm text-gray-500 font-body mb-6">{plan.desc}</p>

                  {plan.monthly !== null ? (
                    <div className="mb-6">
                      {yearly && (
                        <p className="text-sm text-gray-400 line-through font-body">
                          Rp {fmt(plan.monthly)}/bln
                        </p>
                      )}
                      <p className="font-sans font-bold text-3xl text-[#0A2540]">
                        Rp {fmt(yearly ? plan.yearly! : plan.monthly)}
                        <span className="text-base font-normal text-gray-400 font-body">/bln</span>
                      </p>
                      {yearly && (
                        <p className="text-xs text-[#00C897] font-semibold mt-1 font-body">
                          Ditagih Rp {fmt((plan.yearly!) * 12)}/tahun
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="mb-6">
                      <p className="font-sans font-bold text-3xl text-[#0A2540]">Custom</p>
                      <p className="text-sm text-gray-500 font-body mt-1">Disesuaikan kebutuhan</p>
                    </div>
                  )}

                  <Link
                    href={plan.ctaHref}
                    className={`block text-center py-3 rounded-xl text-sm font-semibold transition-colors mb-6 ${
                      plan.popular
                        ? 'bg-[#00C897] text-[#0A2540] hover:bg-[#00a87e]'
                        : plan.name === 'Enterprise'
                        ? 'border border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white'
                        : 'bg-[#0A2540] text-white hover:bg-[#0A2540]/90'
                    }`}
                  >
                    {plan.cta}
                  </Link>

                  <ul className="space-y-2.5">
                    {plan.features.map((f, i) =>
                      f === null ? null : (
                        <li key={i} className="flex items-start gap-2 text-sm font-body text-gray-600">
                          <Check className="w-4 h-4 text-[#00C897] mt-0.5 shrink-0" strokeWidth={2.5} />
                          {f}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ))}
            </div>

            {/* Comparison toggle */}
            <div className="text-center mb-8">
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0A2540] hover:text-[#00C897] transition-colors font-body"
              >
                {showComparison ? 'Sembunyikan' : 'Tampilkan'} Perbandingan Fitur Lengkap
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${showComparison ? 'rotate-180' : ''}`}
                />
              </button>
            </div>

            {/* Full comparison table */}
            {showComparison && (
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left px-6 py-4 font-sans font-bold text-[#0A2540] text-sm w-2/5">Fitur</th>
                        {['Basic', 'Pro', 'Enterprise'].map((p) => (
                          <th key={p} className="text-center px-6 py-4 font-sans font-bold text-[#0A2540] text-sm">
                            {p}
                            {p === 'Pro' && (
                              <span className="ml-1.5 text-[10px] bg-[#00C897]/15 text-[#00C897] px-1.5 py-0.5 rounded-full font-body">
                                Populer
                              </span>
                            )}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparison.map((row, i) => (
                        <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F5F7FA]'}>
                          <td className="px-6 py-3 text-sm text-gray-600 font-body">{row.feature}</td>
                          {[row.basic, row.pro, row.enterprise].map((val, j) => (
                            <td key={j} className="px-6 py-3 text-center text-sm font-body">
                              {typeof val === 'boolean' ? (
                                val ? (
                                  <Check className="w-4 h-4 text-[#00C897] mx-auto" strokeWidth={2.5} />
                                ) : (
                                  <X className="w-4 h-4 text-gray-300 mx-auto" strokeWidth={2} />
                                )
                              ) : (
                                <span className="text-gray-600">{val}</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="font-sans font-bold text-2xl sm:text-3xl text-[#0A2540] text-center mb-10">
              Pertanyaan Seputar Harga
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="border border-gray-100 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[#F5F7FA] transition-colors"
                    aria-expanded={openFaq === i}
                  >
                    <span className="font-sans font-semibold text-[#0A2540] text-sm pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${
                        openFaq === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-4">
                      <p className="text-sm text-gray-500 font-body leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0A2540] py-16 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="font-sans font-bold text-2xl sm:text-3xl text-white mb-4">
              Mulai Gratis Selama 14 Hari
            </h2>
            <p className="text-white/65 font-body mb-6">
              Tidak perlu kartu kredit. Batalkan kapan saja. Setup dalam 5 menit.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-7 py-4 bg-[#00C897] text-[#0A2540] font-semibold rounded-xl hover:bg-[#00a87e] transition-colors"
            >
              Coba Gratis Sekarang
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
