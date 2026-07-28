import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Mail, Phone, MessageCircle, Link2, Share2 } from 'lucide-react'

const footerLinks = {
  Produk: [
    { label: 'Fitur Kasir & POS', href: '/layanan' },
    { label: 'Manajemen Restoran', href: '/layanan' },
    { label: 'Pembayaran QRIS', href: '/layanan' },
    { label: 'Inventori', href: '/layanan' },
    { label: 'Laporan & Analitik', href: '/layanan' },
  ],
  Perusahaan: [
    { label: 'Tentang Kami', href: '/tentang' },
    { label: 'Blog', href: '/blog' },
    { label: 'Karir', href: '#' },
    { label: 'Press Kit', href: '#' },
  ],
  Dukungan: [
    { label: 'Demo Interaktif', href: '/demo' },
    { label: 'Harga & Paket', href: '/harga' },
    { label: 'Hubungi Kami', href: '/kontak' },
    { label: 'Kebijakan Privasi', href: '#' },
    { label: 'Syarat & Ketentuan', href: '#' },
  ],
}

const badges = [
  'Teregistrasi BI',
  'PCI-DSS',
  'CREST Audited',
  'SNAP BI',
  'UU PDP',
]

export default function Footer() {
  return (
    <footer className="bg-[#0A2540] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/cashora-logo.png"
                alt="Cashora logo"
                width={36}
                height={36}
                className="w-9 h-9 object-contain"
              />
              <span className="font-sans font-bold text-xl tracking-tight">Cashora</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              Platform POS modern untuk semua skala bisnis Indonesia. Offline-first, aman, dan tanpa biaya per cabang.
            </p>
            <div className="space-y-2 text-sm text-white/60">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#00C897]" />
                <span>Jl. Sudirman Kav. 52-53, Jakarta Selatan 12190</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-[#00C897]" />
                <a href="mailto:halo@cashora.id" className="hover:text-white transition-colors">
                  halo@cashora.id
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-[#00C897]" />
                <a href="tel:+6221500123" className="hover:text-white transition-colors">
                  +62 21 500-123
                </a>
              </div>
            </div>
            {/* Social */}
            <div className="flex gap-3 mt-6">
              {[
                { icon: MessageCircle, label: 'WhatsApp' },
                { icon: Link2, label: 'LinkedIn' },
                { icon: Share2, label: 'Sosial' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#00C897] transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="font-sans font-semibold text-sm mb-4 text-white">{heading}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-[#00C897] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Compliance badges */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <p className="text-xs text-white/40 mb-3">Sertifikasi & Kepatuhan</p>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span
                key={badge}
                className="px-3 py-1 text-xs font-medium rounded-full border border-white/20 text-white/60"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Cashora. Hak cipta dilindungi.
          </p>
          <p className="text-xs text-white/40">
            Dibuat dengan <span className="text-[#00C897]">&#9829;</span> di Indonesia
          </p>
        </div>
      </div>
    </footer>
  )
}
