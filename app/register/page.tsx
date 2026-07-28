'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, EyeOff, Check, ArrowRight } from 'lucide-react'

const businessTypes = ['UMKM / Toko Kecil', 'Restoran / Kafe', 'Retail / Minimarket', 'Korporasi / Franchise', 'Lainnya']

const steps = ['Akun', 'Bisnis']

export default function RegisterPage() {
  const [step, setStep] = useState(0)
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    businessName: '', businessType: '', phone: '',
  })

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 0) setStep(1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const up = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value })

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0A2540] flex-col justify-between p-12 relative overflow-hidden">
        <div
          className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #00C897, transparent 70%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #00C897, transparent 70%)' }}
          aria-hidden="true"
        />

        <Link href="/" className="flex items-center gap-2 relative">
          <Image
            src="/cashora-logo.png"
            alt="Cashora logo"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
          <span className="font-sans font-bold text-xl text-white tracking-tight">Cashora</span>
        </Link>

        <div className="relative">
          <h2 className="font-sans font-bold text-3xl text-white mb-6 leading-tight">
            Mulai Perjalanan Bisnis Anda Bersama Cashora
          </h2>
          <ul className="space-y-4">
            {[
              'Coba gratis 14 hari tanpa kartu kredit',
              'Setup dalam 5 menit, langsung bisa jalan',
              'Dukungan onboarding dari tim kami',
              'Batalkan kapan saja, tanpa penalti',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-white/80 font-body text-sm">
                <div className="w-5 h-5 bg-[#00C897]/20 rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#00C897]" strokeWidth={2.5} />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-white/30 text-xs font-body relative">
          &copy; {new Date().getFullYear()} Cashora · halo@cashora.id
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10">
        {/* Mobile logo */}
        <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
          <Image src="/cashora-logo.png" alt="Cashora logo" width={32} height={32} className="w-8 h-8 object-contain" />
          <span className="font-sans font-bold text-xl text-[#0A2540] tracking-tight">Cashora</span>
        </Link>

        <div className="w-full max-w-md">
          {step < 2 ? (
            <>
              {/* Step indicator */}
              <div className="flex items-center gap-3 mb-8">
                {steps.map((s, i) => (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-body transition-colors ${
                        i < step
                          ? 'bg-[#00C897] text-white'
                          : i === step
                          ? 'bg-[#0A2540] text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {i < step ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : i + 1}
                    </div>
                    <span
                      className={`text-sm font-semibold font-body ${
                        i === step ? 'text-[#0A2540]' : 'text-gray-400'
                      }`}
                    >
                      {s}
                    </span>
                    {i < steps.length - 1 && (
                      <div className={`w-12 h-0.5 rounded ${i < step ? 'bg-[#00C897]' : 'bg-gray-200'}`} />
                    )}
                  </div>
                ))}
              </div>

              <h1 className="font-sans font-bold text-2xl text-[#0A2540] mb-1">
                {step === 0 ? 'Buat Akun Anda' : 'Detail Bisnis'}
              </h1>
              <p className="text-sm text-gray-500 font-body mb-6">
                {step === 0 ? 'Daftar gratis, tanpa kartu kredit.' : 'Ceritakan sedikit tentang bisnis Anda.'}
              </p>

              {step === 0 ? (
                <form onSubmit={nextStep} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#0A2540] mb-1.5 font-body">
                      Nama Lengkap <span className="text-red-400">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Nama lengkap Anda"
                      value={form.name}
                      onChange={up('name')}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-body bg-white focus:outline-none focus:ring-2 focus:ring-[#00C897] focus:border-transparent"
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
                      onChange={up('email')}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-body bg-white focus:outline-none focus:ring-2 focus:ring-[#00C897] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0A2540] mb-1.5 font-body">
                      Password <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        required
                        type={showPass ? 'text' : 'password'}
                        placeholder="Min. 8 karakter"
                        value={form.password}
                        onChange={up('password')}
                        minLength={8}
                        className="w-full px-4 py-2.5 pr-11 border border-gray-200 rounded-xl text-sm font-body bg-white focus:outline-none focus:ring-2 focus:ring-[#00C897] focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        aria-label={showPass ? 'Sembunyikan password' : 'Tampilkan password'}
                      >
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0A2540] mb-1.5 font-body">
                      Konfirmasi Password <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        required
                        type={showConfirm ? 'text' : 'password'}
                        placeholder="Ulangi password"
                        value={form.confirmPassword}
                        onChange={up('confirmPassword')}
                        className="w-full px-4 py-2.5 pr-11 border border-gray-200 rounded-xl text-sm font-body bg-white focus:outline-none focus:ring-2 focus:ring-[#00C897] focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        aria-label={showConfirm ? 'Sembunyikan password' : 'Tampilkan password'}
                      >
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#00C897] text-[#0A2540] font-semibold rounded-xl hover:bg-[#00a87e] transition-colors text-sm"
                  >
                    Lanjut
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#0A2540] mb-1.5 font-body">
                      Nama Bisnis <span className="text-red-400">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Nama bisnis atau toko Anda"
                      value={form.businessName}
                      onChange={up('businessName')}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-body bg-white focus:outline-none focus:ring-2 focus:ring-[#00C897] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0A2540] mb-1.5 font-body">
                      Jenis Bisnis <span className="text-red-400">*</span>
                    </label>
                    <select
                      required
                      value={form.businessType}
                      onChange={up('businessType')}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-body bg-white focus:outline-none focus:ring-2 focus:ring-[#00C897] focus:border-transparent"
                    >
                      <option value="">Pilih jenis bisnis</option>
                      {businessTypes.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0A2540] mb-1.5 font-body">
                      Nomor Telepon <span className="text-red-400">*</span>
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+62 8xx-xxxx-xxxx"
                      value={form.phone}
                      onChange={up('phone')}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-body bg-white focus:outline-none focus:ring-2 focus:ring-[#00C897] focus:border-transparent"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(0)}
                      className="flex-1 py-3.5 border border-gray-200 text-[#0A2540] font-semibold rounded-xl hover:bg-gray-50 transition-colors text-sm"
                    >
                      Kembali
                    </button>
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#00C897] text-[#0A2540] font-semibold rounded-xl hover:bg-[#00a87e] transition-colors text-sm"
                    >
                      Daftar Sekarang
                    </button>
                  </div>
                </form>
              )}

              <p className="mt-6 text-center text-sm text-gray-500 font-body">
                Sudah punya akun?{' '}
                <Link href="/login" className="text-[#00C897] font-semibold hover:underline">
                  Login
                </Link>
              </p>
            </>
          ) : (
            /* Success state */
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-[#00C897]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-[#00C897]" strokeWidth={2} />
              </div>
              <h2 className="font-sans font-bold text-2xl text-[#0A2540] mb-3">
                Selamat Datang di Cashora!
              </h2>
              <p className="text-gray-500 font-body text-sm mb-6 leading-relaxed">
                Akun Anda berhasil dibuat. Cek email untuk verifikasi dan mulai coba Cashora gratis selama 14 hari.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#00C897] text-[#0A2540] font-semibold rounded-xl hover:bg-[#00a87e] transition-colors text-sm"
              >
                Masuk ke Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
