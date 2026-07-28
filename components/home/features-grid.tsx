import { Wifi, TrendingUp, ShieldCheck, QrCode } from 'lucide-react'

const features = [
  {
    icon: Wifi,
    title: 'Offline-First',
    desc: 'Tetap berjualan meski internet mati. Semua transaksi tersimpan dan tersinkronisasi otomatis saat koneksi kembali.',
    color: '#00C897',
    bg: 'bg-[#00C897]/10',
  },
  {
    icon: TrendingUp,
    title: 'Harga Expansion-Neutral',
    desc: 'Bayar satu harga tetap, buka cabang sebanyak-banyaknya. Tanpa biaya tambahan per outlet atau per kasir.',
    color: '#0A2540',
    bg: 'bg-[#0A2540]/10',
  },
  {
    icon: ShieldCheck,
    title: 'Keamanan 7 Lapis',
    desc: 'Enkripsi end-to-end, autentikasi dua faktor, dan audit log lengkap. Standar keamanan setara perbankan.',
    color: '#00C897',
    bg: 'bg-[#00C897]/10',
  },
  {
    icon: QrCode,
    title: 'QRIS TUNTAS & SoftPOS',
    desc: 'Terima pembayaran via QRIS, tarik tunai, setor, dan transfer langsung dari aplikasi. Tanpa mesin EDC tambahan.',
    color: '#0A2540',
    bg: 'bg-[#0A2540]/10',
  },
]

export default function FeaturesGrid() {
  return (
    <section className="bg-[#F5F7FA] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-[#00C897] uppercase tracking-widest mb-3 font-body">
            Keunggulan Utama
          </p>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#0A2540] text-balance">
            Dirancang untuk Bisnis Indonesia
          </h2>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:shadow-gray-200/80 hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-4`}
              >
                <f.icon className="w-6 h-6" style={{ color: f.color }} strokeWidth={2} />
              </div>
              <h3 className="font-sans font-bold text-base text-[#0A2540] mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-body">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
