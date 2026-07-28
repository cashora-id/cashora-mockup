'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from 'next/link'
import {
  ShoppingCart,
  Utensils,
  QrCode,
  Package,
  Users,
  BarChart2,
  Check,
  ArrowRight,
  ChevronDown,
} from 'lucide-react'

const tabs = [
  {
    id: 'kasir',
    label: 'Kasir & POS',
    icon: ShoppingCart,
    title: 'Kasir Modern untuk Semua Jenis Bisnis',
    desc: 'Antarmuka kasir yang intuitif dan cepat, dirancang untuk semua level karyawan. Kelola transaksi, diskon, pajak, dan tutup kasir dengan mudah—bahkan saat offline.',
    features: [
      'Antarmuka layar sentuh yang responsif',
      'Mode offline dengan sinkronisasi otomatis',
      'Multi-kasir dalam satu outlet',
      'Manajemen diskon & voucher',
      'Pajak (PPN) otomatis',
      'Retur & pengembalian barang',
      'Split bill & custom tip',
      'Cetak struk termal & digital',
    ],
    screenshot: (
      <div className="bg-[#0A2540] rounded-2xl p-5 text-white">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-sans font-bold">Kasir — Outlet Jakarta</p>
          <span className="text-xs bg-[#00C897]/20 text-[#00C897] px-2 py-0.5 rounded-full font-body font-semibold">Shift 1</span>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {['Nasi Goreng', 'Ayam Bakar', 'Es Teh', 'Soto Ayam', 'Bakso', 'Jus Jeruk'].map((item) => (
            <div key={item} className="bg-white/10 rounded-xl p-2 text-center">
              <div className="w-8 h-8 bg-[#00C897]/20 rounded-lg mx-auto mb-1.5" />
              <p className="text-[10px] font-body text-white/80">{item}</p>
              <p className="text-[10px] font-bold text-[#00C897] font-body">Rp 15rb</p>
            </div>
          ))}
        </div>
        <div className="bg-white/10 rounded-xl p-3">
          <div className="flex justify-between text-xs font-body text-white/70 mb-1">
            <span>Subtotal</span><span>Rp 85.000</span>
          </div>
          <div className="flex justify-between text-xs font-body text-white/70 mb-2">
            <span>PPN 11%</span><span>Rp 9.350</span>
          </div>
          <div className="flex justify-between text-sm font-sans font-bold text-[#00C897]">
            <span>Total</span><span>Rp 94.350</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'restoran',
    label: 'Manajemen Restoran',
    icon: Utensils,
    title: 'Operasional Restoran dari Satu Layar',
    desc: 'Dari QR menu, manajemen meja, hingga kitchen display—semua terintegrasi dalam satu sistem. Kurangi miskomunikasi dapur dan tingkatkan rotasi meja.',
    features: [
      'Kitchen Display System (KDS)',
      'Manajemen meja & denah lantai',
      'QR menu self-order oleh pelanggan',
      'Reservasi meja online',
      'Timer masak otomatis',
      'Pemisahan bill per meja',
      'Integrasi GoFood, GrabFood, ShopeeFood',
      'Laporan penjualan per menu',
    ],
    screenshot: (
      <div className="bg-[#F5F7FA] rounded-2xl p-5 border border-gray-100">
        <p className="text-sm font-sans font-bold text-[#0A2540] mb-3">Kitchen Display</p>
        <div className="space-y-2">
          {[
            { table: 'Meja 3', items: 'Ayam Bakar, Nasi Putih', time: '02:34', urgent: false },
            { table: 'Meja 7', items: 'Soto + Kerupuk', time: '06:12', urgent: true },
            { table: 'Takeaway', items: 'Nasi Goreng Spesial', time: '01:05', urgent: false },
          ].map((order) => (
            <div
              key={order.table}
              className={`rounded-xl p-3 border flex items-center justify-between ${
                order.urgent ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100'
              }`}
            >
              <div>
                <p className="text-xs font-semibold font-body text-[#0A2540]">{order.table}</p>
                <p className="text-[10px] text-gray-500 font-body">{order.items}</p>
              </div>
              <div className={`text-xs font-bold font-body ${order.urgent ? 'text-red-500' : 'text-[#00C897]'}`}>
                {order.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'pembayaran',
    label: 'Pembayaran',
    icon: QrCode,
    title: 'QRIS TUNTAS — Lebih dari Sekedar Pembayaran',
    desc: 'Terima semua metode pembayaran digital, tarik tunai, setor, dan transfer via satu QR. Tidak perlu mesin EDC terpisah—hemat biaya dan meja kasir lebih rapi.',
    features: [
      'QRIS universal (semua e-wallet)',
      'Tarik tunai via QR (QRIS Tuntas)',
      'Setor tunai tanpa ke bank',
      'Transfer ke rekening manapun',
      'SoftPOS (terima kartu via NFC)',
      'Kartu debit & kredit',
      'Virtual Account otomatis',
      'Rekonsiliasi harian otomatis',
    ],
    screenshot: (
      <div className="bg-[#0A2540] rounded-2xl p-5 text-white text-center">
        <p className="text-sm font-sans font-bold mb-4">QRIS TUNTAS</p>
        <div className="bg-white rounded-xl p-4 mx-auto w-36 h-36 flex items-center justify-center mb-4">
          <div className="grid grid-cols-5 gap-0.5">
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-sm ${
                  [0,1,3,5,6,7,8,10,14,18,19,20,21,23,24].includes(i)
                    ? 'bg-[#0A2540]'
                    : 'bg-transparent'
                }`}
              />
            ))}
          </div>
        </div>
        <p className="text-xs text-white/60 font-body mb-3">Scan untuk bayar, tarik, atau setor</p>
        <div className="grid grid-cols-3 gap-2">
          {['Bayar', 'Tarik', 'Setor'].map((action) => (
            <div key={action} className="bg-[#00C897]/20 rounded-lg py-1.5">
              <p className="text-[10px] font-bold text-[#00C897] font-body">{action}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'inventori',
    label: 'Inventori',
    icon: Package,
    title: 'Kontrol Stok Real-Time, Tanpa Kebocoran',
    desc: 'Lacak stok dari semua cabang dalam satu dashboard. Notifikasi stok menipis, manajemen supplier, dan laporan barang terlaris otomatis setiap hari.',
    features: [
      'Stok real-time multi-lokasi',
      'Notifikasi stok minimum',
      'Manajemen supplier & PO',
      'Audit stok & opname digital',
      'Pelacakan kadaluarsa',
      'Bundling & resep produk',
      'Penyesuaian stok manual',
      'Laporan COGS otomatis',
    ],
    screenshot: (
      <div className="bg-[#F5F7FA] rounded-2xl p-5 border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-sans font-bold text-[#0A2540]">Stok Menipis</p>
          <span className="text-xs bg-red-50 text-red-500 px-2 py-0.5 rounded-full font-body font-semibold">3 item</span>
        </div>
        <div className="space-y-2">
          {[
            { name: 'Ayam Fillet', stock: '2 kg', min: '5 kg' },
            { name: 'Minyak Goreng', stock: '1 liter', min: '3 liter' },
            { name: 'Gula Pasir', stock: '500 gr', min: '1 kg' },
          ].map((item) => (
            <div key={item.name} className="bg-white rounded-xl p-3 border border-red-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold font-body text-[#0A2540]">{item.name}</p>
                <p className="text-[10px] text-red-400 font-body">Sisa: {item.stock} (min. {item.min})</p>
              </div>
              <button className="text-[10px] bg-[#00C897] text-white px-2.5 py-1 rounded-lg font-body font-semibold">
                Order
              </button>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'karyawan',
    label: 'Karyawan & Pelanggan',
    icon: Users,
    title: 'Kelola Tim dan Loyalitas Pelanggan',
    desc: 'Atur hak akses karyawan, lacak absensi, dan bangun loyalitas pelanggan dengan program poin dan membership yang terintegrasi langsung di kasir.',
    features: [
      'Multi-role & hak akses granular',
      'Absensi dan shift karyawan',
      'Komisi & insentif otomatis',
      'CRM pelanggan terintegrasi',
      'Program poin & cashback',
      'Membership tier (Bronze/Silver/Gold)',
      'Riwayat belanja pelanggan',
      'Notifikasi promosi via WhatsApp',
    ],
    screenshot: (
      <div className="bg-[#0A2540] rounded-2xl p-5 text-white">
        <p className="text-sm font-sans font-bold mb-4">Profil Pelanggan</p>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#00C897] flex items-center justify-center font-bold font-sans">
            RK
          </div>
          <div>
            <p className="text-sm font-bold font-body">Rina Kartika</p>
            <p className="text-xs text-white/60 font-body">Member Gold · 38 kunjungan</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-white/10 rounded-xl p-2.5 text-center">
            <p className="text-[10px] text-white/60 font-body">Total Belanja</p>
            <p className="text-sm font-bold text-[#00C897] font-sans">Rp 2,8Jt</p>
          </div>
          <div className="bg-white/10 rounded-xl p-2.5 text-center">
            <p className="text-[10px] text-white/60 font-body">Poin Aktif</p>
            <p className="text-sm font-bold text-[#00C897] font-sans">2.840 pts</p>
          </div>
        </div>
        <div className="bg-[#00C897]/20 rounded-xl p-2.5 flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center text-[10px] font-bold text-[#0A2540]">G</div>
          <p className="text-xs text-[#00C897] font-body font-semibold">Member Gold — Diskon 10% semua produk</p>
        </div>
      </div>
    ),
  },
  {
    id: 'laporan',
    label: 'Laporan',
    icon: BarChart2,
    title: 'Data Bisnis Real-Time di Genggaman Anda',
    desc: 'Laporan penjualan, laba-rugi, stok, dan karyawan tersedia real-time di dashboard. Ekspor ke Excel/PDF kapan saja atau terima ringkasan harian otomatis via email.',
    features: [
      'Dashboard ringkasan real-time',
      'Laporan penjualan per produk/kategori',
      'Laporan laba-rugi bulanan',
      'Analitik tren & proyeksi',
      'Perbandingan antar cabang',
      'Ekspor Excel, PDF, CSV',
      'Laporan karyawan & komisi',
      'Ringkasan harian via email otomatis',
    ],
    screenshot: (
      <div className="bg-[#F5F7FA] rounded-2xl p-5 border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-sans font-bold text-[#0A2540]">Pendapatan Bulan Ini</p>
          <span className="text-xs text-[#00C897] font-body font-semibold">+18% vs bulan lalu</span>
        </div>
        <div className="flex items-end gap-1 h-20 mb-3">
          {[40, 55, 35, 70, 60, 80, 90].map((h, i) => (
            <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, backgroundColor: i === 6 ? '#00C897' : '#0A2540', opacity: i === 6 ? 1 : 0.3 }} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white rounded-xl p-2.5 border border-gray-100">
            <p className="text-[10px] text-gray-400 font-body">Produk Terlaris</p>
            <p className="text-xs font-bold text-[#0A2540] font-body">Nasi Goreng (312x)</p>
          </div>
          <div className="bg-white rounded-xl p-2.5 border border-gray-100">
            <p className="text-[10px] text-gray-400 font-body">Jam Tersibuk</p>
            <p className="text-xs font-bold text-[#0A2540] font-body">12:00–13:30</p>
          </div>
        </div>
      </div>
    ),
  },
]

const featured = [
  {
    title: 'QRIS TUNTAS',
    badge: 'Fitur Unggulan',
    desc: 'Satu QR untuk semua—terima pembayaran, tarik tunai, setor, dan transfer tanpa mesin EDC. Inklusif untuk semua skala bisnis.',
    color: '#00C897',
    icon: QrCode,
  },
  {
    title: 'Agregasi GoFood · GrabFood · ShopeeFood',
    badge: 'Integrasi Online',
    desc: 'Kelola semua pesanan online dari platform manapun langsung di satu dashboard Cashora. Stok terupdate otomatis di semua platform.',
    color: '#0A2540',
    icon: ShoppingCart,
  },
]

export default function LayananPage() {
  const [activeTab, setActiveTab] = useState('kasir')
  const active = tabs.find((t) => t.id === activeTab)!

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Header */}
        <section className="bg-[#0A2540] py-16 text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="text-sm font-semibold text-[#00C897] uppercase tracking-widest mb-3 font-body">
              Fitur Lengkap
            </p>
            <h1 className="font-sans font-bold text-4xl sm:text-5xl text-white mb-4 text-balance">
              Semua yang Bisnis Anda Butuhkan
            </h1>
            <p className="text-lg text-white/65 font-body">
              Dari kasir sederhana hingga manajemen multi-cabang korporasi—Cashora hadir dengan fitur yang tumbuh bersama bisnis Anda.
            </p>
          </div>
        </section>

        {/* Tabs */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Tab buttons */}
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#0A2540] text-white shadow-md'
                      : 'bg-[#F5F7FA] text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <tab.icon className="w-4 h-4" strokeWidth={2} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="font-sans font-bold text-2xl sm:text-3xl text-[#0A2540] mb-4">
                  {active.title}
                </h2>
                <p className="text-gray-500 font-body leading-relaxed mb-6">{active.desc}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {active.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600 font-body">
                      <Check className="w-4 h-4 text-[#00C897] mt-0.5 shrink-0" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-[#00C897] text-[#0A2540] font-semibold rounded-xl hover:bg-[#00a87e] transition-colors text-sm"
                >
                  Coba di Demo Interaktif
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div>{active.screenshot}</div>
            </div>
          </div>
        </section>

        {/* Featured */}
        <section className="bg-[#F5F7FA] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-sans font-bold text-2xl sm:text-3xl text-[#0A2540] text-center mb-10">
              Fitur Unggulan Eksklusif Cashora
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featured.map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full mb-4 inline-block font-body"
                    style={{ backgroundColor: item.color + '15', color: item.color }}
                  >
                    {item.badge}
                  </span>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: item.color + '15' }}
                    >
                      <item.icon className="w-5 h-5" style={{ color: item.color }} strokeWidth={2} />
                    </div>
                    <h3 className="font-sans font-bold text-lg text-[#0A2540]">{item.title}</h3>
                  </div>
                  <p className="text-gray-500 font-body text-sm leading-relaxed mb-5">{item.desc}</p>
                  <Link
                    href="/demo"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00C897] hover:underline"
                  >
                    Pelajari Lebih Lanjut <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0A2540] py-16 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="font-sans font-bold text-2xl sm:text-3xl text-white mb-4">
              Tertarik? Coba Semua Fitur di Demo Interaktif
            </h2>
            <p className="text-white/65 font-body mb-6">
              Eksplorasi semua fitur Cashora tanpa batas—tidak perlu daftar, langsung coba.
            </p>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#00C897] text-[#0A2540] font-semibold rounded-xl hover:bg-[#00a87e] transition-colors"
            >
              Mulai Demo Sekarang <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
