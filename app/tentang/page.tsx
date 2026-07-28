import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Eye, Target, Lightbulb, ShieldCheck, TrendingUp, MapPin } from 'lucide-react'

const values = [
  {
    icon: Lightbulb,
    title: 'Inovasi untuk Semua',
    desc: 'Kami percaya teknologi terbaik seharusnya bisa diakses oleh warung kecil sekalipun. Inovasi kami selalu berpusat pada kemudahan pengguna.',
  },
  {
    icon: ShieldCheck,
    title: 'Keamanan Tanpa Kompromi',
    desc: 'Data bisnis Anda adalah aset terpenting. Kami menerapkan standar keamanan setara perbankan—enkripsi, audit, dan kepatuhan regulasi.',
  },
  {
    icon: TrendingUp,
    title: 'Tumbuh Bersama UMKM',
    desc: 'Keberhasilan merchant adalah keberhasilan kami. Model harga expansion-neutral memastikan biaya tidak menghalangi pertumbuhan bisnis Anda.',
  },
]

const team = [
  {
    name: 'Arif Wibowo',
    role: 'CEO & Co-Founder',
    quote: '"Cashora lahir dari frustrasi saya sendiri saat mengelola warung keluarga tanpa alat yang tepat."',
    initials: 'AW',
    color: '#00C897',
  },
  {
    name: 'Dewi Ratnasari',
    role: 'CTO & Co-Founder',
    quote: '"Saya percaya sistem offline-first adalah kunci inklusi digital yang sejati untuk Indonesia."',
    initials: 'DR',
    color: '#0A2540',
  },
  {
    name: 'Hendra Gunawan',
    role: 'CPO & Co-Founder',
    quote: '"Produk terbaik adalah yang bisa digunakan tanpa manual—itulah standar desain kami."',
    initials: 'HG',
    color: '#00C897',
  },
  {
    name: 'Sari Permatasari',
    role: 'CFO & Co-Founder',
    quote: '"Model bisnis yang berkelanjutan dimulai dari harga yang adil dan transparan untuk semua."',
    initials: 'SP',
    color: '#0A2540',
  },
]

const badges = [
  { label: 'Teregistrasi BI', sub: 'Bank Indonesia' },
  { label: 'PCI-DSS Compliant', sub: 'Level 1' },
  { label: 'Diaudit CREST', sub: 'Security Audit' },
  { label: 'SNAP BI Ready', sub: 'Open API' },
  { label: 'UU PDP Compliant', sub: 'Data Protection' },
]

export default function TentangPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Header */}
        <section className="bg-[#0A2540] py-20 text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="text-sm font-semibold text-[#00C897] uppercase tracking-widest mb-3 font-body">
              Tentang Kami
            </p>
            <h1 className="font-sans font-bold text-4xl sm:text-5xl text-white mb-6 text-balance">
              Cerita di Balik Cashora
            </h1>
            <p className="text-lg text-white/65 font-body leading-relaxed">
              Cashora lahir dari keprihatinan mendalam terhadap jutaan UMKM Indonesia yang masih berjuang dengan sistem pencatatan manual dan teknologi yang terlalu rumit atau terlalu mahal.
            </p>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="bg-[#F5F7FA] rounded-2xl p-8">
                <div className="w-12 h-12 bg-[#00C897]/15 rounded-xl flex items-center justify-center mb-5">
                  <Eye className="w-6 h-6 text-[#00C897]" strokeWidth={2} />
                </div>
                <h2 className="font-sans font-bold text-xl text-[#0A2540] mb-3">Visi</h2>
                <p className="text-gray-500 font-body leading-relaxed">
                  Menjadi platform POS paling inklusif di Asia Tenggara—di mana setiap pelaku usaha, dari warung pinggir jalan hingga korporasi, memiliki akses ke teknologi terbaik dengan harga yang adil.
                </p>
              </div>
              <div className="bg-[#F5F7FA] rounded-2xl p-8">
                <div className="w-12 h-12 bg-[#0A2540]/10 rounded-xl flex items-center justify-center mb-5">
                  <Target className="w-6 h-6 text-[#0A2540]" strokeWidth={2} />
                </div>
                <h2 className="font-sans font-bold text-xl text-[#0A2540] mb-3">Misi</h2>
                <p className="text-gray-500 font-body leading-relaxed">
                  Memberdayakan UMKM Indonesia dengan teknologi POS yang mudah, andal, dan terjangkau—sehingga mereka bisa fokus berkembang, bukan mengelola sistem.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="bg-[#F5F7FA] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-sans font-bold text-2xl sm:text-3xl text-[#0A2540] text-center mb-10">
              Nilai Inti Kami
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {values.map((v) => (
                <div key={v.title} className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-[#00C897]/10 rounded-xl flex items-center justify-center mb-5">
                    <v.icon className="w-6 h-6 text-[#00C897]" strokeWidth={2} />
                  </div>
                  <h3 className="font-sans font-bold text-lg text-[#0A2540] mb-3">{v.title}</h3>
                  <p className="text-gray-500 font-body text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-sans font-bold text-2xl sm:text-3xl text-[#0A2540] text-center mb-10">
              Tim Pendiri
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <div key={member.name} className="text-center">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-sans font-bold text-2xl mx-auto mb-4"
                    style={{ backgroundColor: member.color }}
                  >
                    {member.initials}
                  </div>
                  <h3 className="font-sans font-bold text-[#0A2540] mb-0.5">{member.name}</h3>
                  <p className="text-sm text-[#00C897] font-semibold font-body mb-3">{member.role}</p>
                  <p className="text-sm text-gray-500 font-body italic leading-relaxed">{member.quote}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance */}
        <section className="bg-[#0A2540] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-sans font-bold text-2xl text-white mb-3">
              Sertifikasi & Kepatuhan
            </h2>
            <p className="text-white/60 font-body mb-10">
              Cashora mematuhi standar regulasi dan keamanan tertinggi di Indonesia.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.label}
                  className="bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-center"
                >
                  <p className="font-sans font-bold text-white text-sm">{badge.label}</p>
                  <p className="text-[11px] text-white/50 font-body">{badge.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Office */}
        <section className="bg-white py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex w-12 h-12 bg-[#00C897]/10 rounded-xl items-center justify-center mb-5">
              <MapPin className="w-6 h-6 text-[#00C897]" strokeWidth={2} />
            </div>
            <h2 className="font-sans font-bold text-2xl text-[#0A2540] mb-4">Kantor Kami</h2>
            <p className="text-gray-500 font-body mb-2">
              Jl. Jenderal Sudirman Kav. 52-53, Senayan, Jakarta Selatan 12190, DKI Jakarta, Indonesia
            </p>
            <p className="text-gray-500 font-body mb-6">
              <a href="mailto:halo@cashora.id" className="text-[#00C897] hover:underline">halo@cashora.id</a>
              {' '}·{' '}
              <a href="tel:+6221500123" className="text-[#00C897] hover:underline">+62 21 500-123</a>
            </p>
            {/* Map placeholder */}
            <div className="bg-[#F5F7FA] rounded-2xl h-56 flex items-center justify-center border border-gray-100">
              <p className="text-gray-400 font-body text-sm">Jakarta, Indonesia — Google Maps</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
