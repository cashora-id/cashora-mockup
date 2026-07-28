'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react'

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // auth logic here
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex">
      {/* Left panel — decorative */}
      <div className="hidden lg:flex lg:w-2/5 bg-[#0A2540] flex-col justify-between p-12 relative overflow-hidden">
        <div
          className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full opacity-10"
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
          {/* Mockup mini dashboard */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-8 border border-white/20">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 flex items-center justify-center">
                <Image src="/cashora-logo.png" alt="" width={24} height={24} className="w-6 h-6 object-contain" />
              </div>
              <span className="text-white text-xs font-sans font-bold">Dashboard Cashora</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-[10px] text-white/50 font-body">Pendapatan Hari Ini</p>
                <p className="text-sm font-bold text-[#00C897] font-sans">Rp 4,2Jt</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-[10px] text-white/50 font-body">Transaksi</p>
                <p className="text-sm font-bold text-[#00C897] font-sans">128x</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-[#00C897] font-body">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00C897] animate-pulse" />
              Semua outlet online
            </div>
          </div>

          <blockquote className="text-white/70 text-sm font-body italic leading-relaxed">
            &ldquo;Cashora mengubah cara kami mengelola 5 cabang. Semuanya dari satu layar.&rdquo;
          </blockquote>
          <p className="text-white/40 text-xs font-body mt-2">— Ahmad Fauzi, Retail Elektronik Fauzi</p>
        </div>

        <div className="flex items-center gap-2 relative">
          <ShieldCheck className="w-4 h-4 text-[#00C897]" />
          <p className="text-white/40 text-xs font-body">Terproteksi enkripsi bank-grade</p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10">
        {/* Mobile logo */}
        <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
          <Image src="/cashora-logo.png" alt="Cashora logo" width={32} height={32} className="w-8 h-8 object-contain" />
          <span className="font-sans font-bold text-xl text-[#0A2540] tracking-tight">Cashora</span>
        </Link>

        <div className="w-full max-w-sm">
          <h1 className="font-sans font-bold text-2xl text-[#0A2540] mb-1">Masuk ke Akun Anda</h1>
          <p className="text-sm text-gray-500 font-body mb-8">
            Belum punya akun?{' '}
            <Link href="/register" className="text-[#00C897] font-semibold hover:underline">
              Daftar gratis
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#0A2540] mb-1.5 font-body">
                Email
              </label>
              <input
                required
                type="email"
                placeholder="email@bisnis.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-body bg-white focus:outline-none focus:ring-2 focus:ring-[#00C897] focus:border-transparent"
                autoComplete="email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-[#0A2540] font-body">Password</label>
                <Link href="#" className="text-xs text-[#00C897] hover:underline font-body">
                  Lupa password?
                </Link>
              </div>
              <div className="relative">
                <input
                  required
                  type={showPass ? 'text' : 'password'}
                  placeholder="Masukkan password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-2.5 pr-11 border border-gray-200 rounded-xl text-sm font-body bg-white focus:outline-none focus:ring-2 focus:ring-[#00C897] focus:border-transparent"
                  autoComplete="current-password"
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

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#00C897] text-[#0A2540] font-semibold rounded-xl hover:bg-[#00a87e] transition-colors text-sm"
            >
              Masuk
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-400 font-body">
            Dengan masuk, Anda menyetujui{' '}
            <a href="#" className="text-[#00C897] hover:underline">Syarat & Ketentuan</a>{' '}
            dan{' '}
            <a href="#" className="text-[#00C897] hover:underline">Kebijakan Privasi</a>{' '}
            Cashora.
          </p>
        </div>
      </div>
    </div>
  )
}
