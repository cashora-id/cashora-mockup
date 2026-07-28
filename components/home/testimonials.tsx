'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const stats = [
  { value: '10.000+', label: 'Merchant Aktif' },
  { value: '2,5 Jt', label: 'Transaksi/Hari' },
  { value: '34', label: 'Kota di Indonesia' },
  { value: '99,9%', label: 'Uptime' },
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

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))

  return (
    <section className="bg-[#F5F7FA] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-md transition-shadow"
            >
              <p className="font-sans font-bold text-3xl sm:text-4xl text-[#0A2540] mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500 font-body">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-[#00C897] uppercase tracking-widest mb-3 font-body">
            Kata Merchant Kami
          </p>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#0A2540] text-balance">
            Dipercaya Ribuan Pengusaha Indonesia
          </h2>
        </div>

        {/* Slider */}
        <div className="relative max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-100 shadow-sm">
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
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-sans font-bold text-sm"
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
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-[#0A2540] hover:border-[#0A2540] hover:text-white text-gray-500 transition-all"
              aria-label="Testimoni sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? 'w-6 bg-[#00C897]' : 'w-2 bg-gray-300'
                  }`}
                  aria-label={`Testimoni ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
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
