'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { MapPin, Mail, Phone, Instagram, Linkedin, Facebook, Send, CheckCircle } from 'lucide-react'

export default function KontakPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Header */}
        <section className="bg-[#0A2540] py-16 text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="text-sm font-semibold text-[#00C897] uppercase tracking-widest mb-3 font-body">
              Kontak
            </p>
            <h1 className="font-sans font-bold text-4xl sm:text-5xl text-white mb-4 text-balance">
              Hubungi Kami
            </h1>
            <p className="text-white/65 font-body text-lg">
              Tim kami siap membantu Anda. Kirim pesan dan kami akan merespons dalam 1x24 jam.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="bg-[#F5F7FA] py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Form */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100">
                {sent ? (
                  <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                    <div className="w-16 h-16 bg-[#00C897]/10 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-[#00C897]" strokeWidth={2} />
                    </div>
                    <h2 className="font-sans font-bold text-xl text-[#0A2540] mb-2">Pesan Terkirim!</h2>
                    <p className="text-gray-500 font-body text-sm">
                      Terima kasih telah menghubungi kami. Tim kami akan segera merespons pesan Anda.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="mt-6 text-sm font-semibold text-[#00C897] hover:underline font-body"
                    >
                      Kirim pesan lain
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-sans font-bold text-xl text-[#0A2540] mb-6">Kirim Pesan</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-[#0A2540] mb-1.5 font-body">
                            Nama Lengkap <span className="text-red-400">*</span>
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="John Doe"
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
                            placeholder="nama@email.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:ring-2 focus:ring-[#00C897] focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#0A2540] mb-1.5 font-body">
                          Subjek <span className="text-red-400">*</span>
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Pertanyaan seputar fitur kasir"
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:ring-2 focus:ring-[#00C897] focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#0A2540] mb-1.5 font-body">
                          Pesan <span className="text-red-400">*</span>
                        </label>
                        <textarea
                          required
                          rows={5}
                          placeholder="Tuliskan pesan Anda di sini..."
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:ring-2 focus:ring-[#00C897] focus:border-transparent resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 py-3 bg-[#00C897] text-[#0A2540] font-semibold rounded-xl hover:bg-[#00a87e] transition-colors text-sm"
                      >
                        <Send className="w-4 h-4" />
                        Kirim Pesan
                      </button>
                    </form>
                  </>
                )}
              </div>

              {/* Info */}
              <div className="space-y-6">
                {/* Contact info */}
                <div className="bg-white rounded-2xl p-7 border border-gray-100">
                  <h3 className="font-sans font-bold text-lg text-[#0A2540] mb-5">Informasi Kontak</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#00C897]/10 rounded-xl flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-[#00C897]" strokeWidth={2} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0A2540] font-body">Alamat Kantor</p>
                        <p className="text-sm text-gray-500 font-body">
                          Jl. Jenderal Sudirman Kav. 52-53<br />
                          Senayan, Jakarta Selatan 12190
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#00C897]/10 rounded-xl flex items-center justify-center">
                        <Mail className="w-5 h-5 text-[#00C897]" strokeWidth={2} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0A2540] font-body">Email Support</p>
                        <a href="mailto:halo@cashora.id" className="text-sm text-[#00C897] hover:underline font-body">
                          halo@cashora.id
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#00C897]/10 rounded-xl flex items-center justify-center">
                        <Phone className="w-5 h-5 text-[#00C897]" strokeWidth={2} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0A2540] font-body">Telepon / WhatsApp</p>
                        <a href="tel:+6221500123" className="text-sm text-[#00C897] hover:underline font-body">
                          +62 21 500-123
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Social links */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <p className="text-sm font-semibold text-[#0A2540] mb-3 font-body">Ikuti Kami</p>
                    <div className="flex gap-3">
                      {[
                        { icon: Instagram, label: 'Instagram' },
                        { icon: Linkedin, label: 'LinkedIn' },
                        { icon: Facebook, label: 'Facebook' },
                      ].map(({ icon: Icon, label }) => (
                        <a
                          key={label}
                          href="#"
                          aria-label={label}
                          className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#0A2540] hover:border-[#0A2540] hover:text-white transition-all"
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="bg-[#0A2540] rounded-2xl h-48 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                  <div className="text-center relative">
                    <div className="w-10 h-10 bg-[#00C897] rounded-full flex items-center justify-center mx-auto mb-2">
                      <MapPin className="w-5 h-5 text-white" fill="white" strokeWidth={0} />
                    </div>
                    <p className="text-white font-body text-sm font-semibold">Cashora HQ</p>
                    <p className="text-white/50 font-body text-xs">Jakarta Selatan, Indonesia</p>
                  </div>
                </div>

                {/* Office hours */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-sans font-bold text-base text-[#0A2540] mb-4">Jam Operasional</h3>
                  <div className="space-y-2">
                    {[
                      { day: 'Senin – Jumat', hours: '08:00 – 17:00 WIB' },
                      { day: 'Sabtu', hours: '09:00 – 14:00 WIB' },
                      { day: 'Minggu & Libur Nasional', hours: 'Tutup' },
                    ].map((row) => (
                      <div key={row.day} className="flex justify-between text-sm font-body">
                        <span className="text-gray-500">{row.day}</span>
                        <span className={`font-semibold ${row.hours === 'Tutup' ? 'text-gray-400' : 'text-[#0A2540]'}`}>
                          {row.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
