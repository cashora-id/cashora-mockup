'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Play, Calendar, Clock, Users, CheckCircle, Send } from 'lucide-react'

const benefits = [
  'Tur 30 menit bersama tim ahli kami',
  'Simulasi transaksi sesuai bisnis Anda',
  'Konsultasi pemilihan paket yang tepat',
  'Tanya jawab bebas tanpa tekanan',
]

const businessTypes = ['UMKM', 'Restoran', 'Retail', 'Kafe', 'Korporasi', 'Lainnya']

export default function DemoPage() {
  const [step, setStep] = useState<'options' | 'form' | 'success'>('options')
  const [demoType, setDemoType] = useState<'virtual' | 'live' | null>(null)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', business: '', type: '', message: '', privacy: false,
  })

  const openForm = (type: 'virtual' | 'live') => {
    setDemoType(type)
    setStep('form')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('success')
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Header */}
        <section className="bg-[#0A2540] py-16 text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="text-sm font-semibold text-[#00C897] uppercase tracking-widest mb-3 font-body">
              Demo
            </p>
            <h1 className="font-sans font-bold text-4xl sm:text-5xl text-white mb-4 text-balance">
              Lihat Cashora dalam Aksi
            </h1>
            <p className="text-white/65 font-body text-lg">
              Pilih cara terbaik untuk mengenal Cashora—eksplorasi mandiri atau demo langsung bersama tim kami.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="bg-[#F5F7FA] py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

            {step === 'options' && (
              <div className="grid md:grid-cols-2 gap-8">
                {/* Virtual demo */}
                <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all hover:border-[#00C897] group">
                  <div className="w-14 h-14 bg-[#00C897]/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#00C897]/20 transition-colors">
                    <Play className="w-7 h-7 text-[#00C897]" fill="currentColor" strokeWidth={0} />
                  </div>
                  <h2 className="font-sans font-bold text-xl text-[#0A2540] mb-3">
                    Demo Interaktif Mandiri
                  </h2>
                  <p className="text-gray-500 font-body text-sm leading-relaxed mb-6">
                    Eksplorasi semua fitur Cashora secara mandiri kapan saja. Tidak perlu jadwal, langsung coba dengan data simulasi.
                  </p>
                  <ul className="space-y-2 mb-8">
                    {['Tersedia 24/7 tanpa jadwal', 'Data simulasi lengkap', 'Semua fitur bisa dicoba', 'Tidak perlu registrasi'].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-600 font-body">
                        <CheckCircle className="w-4 h-4 text-[#00C897] shrink-0" strokeWidth={2} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => openForm('virtual')}
                    className="w-full py-3 bg-[#00C897] text-[#0A2540] font-semibold rounded-xl hover:bg-[#00a87e] transition-colors text-sm"
                  >
                    Mulai Demo Virtual
                  </button>
                </div>

                {/* Live demo */}
                <div className="bg-[#0A2540] rounded-2xl p-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#00C897]/10 -translate-y-8 translate-x-8" aria-hidden="true" />
                  <div className="relative">
                    <div className="w-14 h-14 bg-[#00C897]/20 rounded-2xl flex items-center justify-center mb-5">
                      <Calendar className="w-7 h-7 text-[#00C897]" strokeWidth={2} />
                    </div>
                    <h2 className="font-sans font-bold text-xl text-white mb-3">
                      Jadwalkan Demo Langsung
                    </h2>
                    <p className="text-white/65 font-body text-sm leading-relaxed mb-6">
                      Dapatkan demo personal bersama tim ahli kami. Kami akan menyesuaikan demo dengan kebutuhan spesifik bisnis Anda.
                    </p>
                    <ul className="space-y-2 mb-8">
                      {['Demo personal 1-on-1', 'Disesuaikan dengan bisnis Anda', 'Konsultasi gratis', 'Pilih waktu yang sesuai'].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-white/80 font-body">
                          <CheckCircle className="w-4 h-4 text-[#00C897] shrink-0" strokeWidth={2} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => openForm('live')}
                      className="w-full py-3 bg-[#00C897] text-[#0A2540] font-semibold rounded-xl hover:bg-[#00a87e] transition-colors text-sm"
                    >
                      Pilih Waktu Demo
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 'form' && (
              <div className="max-w-2xl mx-auto">
                <button
                  onClick={() => setStep('options')}
                  className="text-sm text-gray-500 hover:text-[#0A2540] font-body mb-6 flex items-center gap-1"
                >
                  &larr; Kembali
                </button>
                <div className="bg-white rounded-2xl p-8 border border-gray-100">
                  <h2 className="font-sans font-bold text-xl text-[#0A2540] mb-2">
                    {demoType === 'live' ? 'Jadwalkan Demo Langsung' : 'Mulai Demo Virtual'}
                  </h2>
                  <p className="text-sm text-gray-500 font-body mb-6">
                    Isi formulir berikut dan tim kami akan segera menghubungi Anda.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#0A2540] mb-1.5 font-body">
                          Nama Lengkap <span className="text-red-400">*</span>
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Nama lengkap"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:ring-2 focus:ring-[#00C897] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#0A2540] mb-1.5 font-body">
                          Email <span className="text-red-400">*</span>
                        </label>
                        <input
                          required
                          type="email"
                          placeholder="email@bisnis.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:ring-2 focus:ring-[#00C897] focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#0A2540] mb-1.5 font-body">
                          Nomor Telepon <span className="text-red-400">*</span>
                        </label>
                        <input
                          required
                          type="tel"
                          placeholder="+62 8xx-xxxx-xxxx"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:ring-2 focus:ring-[#00C897] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#0A2540] mb-1.5 font-body">
                          Nama Bisnis <span className="text-red-400">*</span>
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Nama bisnis Anda"
                          value={form.business}
                          onChange={(e) => setForm({ ...form, business: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:ring-2 focus:ring-[#00C897] focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#0A2540] mb-1.5 font-body">
                        Jenis Bisnis <span className="text-red-400">*</span>
                      </label>
                      <select
                        required
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:ring-2 focus:ring-[#00C897] focus:border-transparent bg-white"
                      >
                        <option value="">Pilih jenis bisnis</option>
                        {businessTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#0A2540] mb-1.5 font-body">
                        Pesan Tambahan
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Ceritakan sedikit tentang bisnis atau kebutuhan Anda..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:ring-2 focus:ring-[#00C897] focus:border-transparent resize-none"
                      />
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        required
                        type="checkbox"
                        checked={form.privacy}
                        onChange={(e) => setForm({ ...form, privacy: e.target.checked })}
                        className="mt-0.5 accent-[#00C897]"
                      />
                      <span className="text-xs text-gray-500 font-body">
                        Saya menyetujui{' '}
                        <a href="#" className="text-[#00C897] hover:underline">Kebijakan Privasi</a>{' '}
                        Cashora dan bersedia dihubungi oleh tim kami.
                      </span>
                    </label>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#00C897] text-[#0A2540] font-semibold rounded-xl hover:bg-[#00a87e] transition-colors text-sm"
                    >
                      <Send className="w-4 h-4" />
                      Kirim Permintaan Demo
                    </button>
                  </form>
                </div>

                {/* Benefits */}
                <div className="mt-6 bg-[#0A2540] rounded-2xl p-6">
                  <p className="font-sans font-bold text-white text-sm mb-4">Yang Akan Anda Dapatkan</p>
                  <ul className="space-y-2">
                    {benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2.5 text-sm text-white/80 font-body">
                        <CheckCircle className="w-4 h-4 text-[#00C897] shrink-0" strokeWidth={2} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {step === 'success' && (
              <div className="max-w-lg mx-auto text-center py-12">
                <div className="w-20 h-20 bg-[#00C897]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-[#00C897]" strokeWidth={2} />
                </div>
                <h2 className="font-sans font-bold text-2xl text-[#0A2540] mb-3">
                  Permintaan Diterima!
                </h2>
                <p className="text-gray-500 font-body mb-6 leading-relaxed">
                  Terima kasih! Tim kami akan menghubungi Anda dalam 1x24 jam untuk mengkonfirmasi jadwal demo.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <a
                    href="/"
                    className="px-6 py-2.5 bg-[#0A2540] text-white font-semibold rounded-xl hover:bg-[#0A2540]/90 transition-colors text-sm"
                  >
                    Kembali ke Beranda
                  </a>
                  <a
                    href="/harga"
                    className="px-6 py-2.5 border border-gray-200 text-[#0A2540] font-semibold rounded-xl hover:bg-gray-50 transition-colors text-sm"
                  >
                    Lihat Harga
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
