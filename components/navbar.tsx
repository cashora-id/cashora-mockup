'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/layanan', label: 'Layanan' },
  { href: '/harga', label: 'Harga' },
  { href: '/tentang', label: 'Tentang Kami' },
  { href: '/demo', label: 'Demo' },
  { href: '/blog', label: 'Blog' },
  { href: '/kontak', label: 'Kontak' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A2540]/95 backdrop-blur-md shadow-lg shadow-[#0A2540]/20'
          : 'bg-[#0A2540]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <Image
              src="/cashora-logo.png"
              alt="Cashora logo"
              width={36}
              height={36}
              className="w-9 h-9 object-contain group-hover:scale-105 transition-transform"
              priority
            />
            <span className="font-sans font-extrabold text-xl text-white tracking-tight">
              Cashora<span className="text-[#00C897]">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-[#00C897]'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-semibold text-white border border-white/30 rounded-lg hover:bg-white/10 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm font-semibold text-[#0A2540] bg-[#00C897] rounded-lg hover:bg-[#00a87e] transition-colors"
            >
              Daftar Gratis
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#0A2540] border-t border-white/10 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? 'text-[#00C897] bg-white/5'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <Link
              href="/login"
              className="block text-center px-4 py-2.5 text-sm font-semibold text-white border border-white/30 rounded-lg hover:bg-white/10 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="block text-center px-4 py-2.5 text-sm font-semibold text-[#0A2540] bg-[#00C897] rounded-lg hover:bg-[#00a87e] transition-colors"
            >
              Daftar Gratis
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
