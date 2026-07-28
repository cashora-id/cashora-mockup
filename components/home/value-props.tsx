import { Wifi, Store, Utensils, ShoppingBag, Check } from 'lucide-react'

const props = [
  {
    icon: Wifi,
    title: 'Tetap Jualan Saat Internet Mati',
    desc: 'Dengan teknologi offline-first, transaksi terus berjalan tanpa gangguan. Data tersinkronisasi otomatis begitu koneksi kembali—tanpa kehilangan satu transaksi pun.',
    points: [
      'Sinkronisasi otomatis multi-perangkat',
      'Konflik data terselesaikan cerdas',
      'Riwayat transaksi tetap lengkap',
    ],
    visual: (
      <div className="bg-[#0A2540] rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#00C897]/10 -translate-y-8 translate-x-8" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <Wifi className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-white/60 font-body">Status Koneksi</p>
              <p className="text-sm font-bold font-sans text-amber-400">Offline</p>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            {['Transaksi #1023', 'Transaksi #1024', 'Transaksi #1025'].map((t, i) => (
              <div key={t} className="flex items-center justify-between bg-white/10 rounded-lg px-3 py-2">
                <span className="text-xs font-body text-white/80">{t}</span>
                <span className="text-xs font-body text-amber-400">Menunggu sync</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 bg-[#00C897]/20 rounded-lg px-3 py-2">
            <div className="w-2 h-2 rounded-full bg-[#00C897] animate-pulse" />
            <p className="text-xs text-[#00C897] font-body font-semibold">3 transaksi siap disinkronkan</p>
          </div>
        </div>
      </div>
    ),
    reverse: false,
  },
  {
    icon: Store,
    title: 'Bayar Satu Harga, Buka Cabang Sebanyak-banyaknya',
    desc: 'Model harga expansion-neutral kami memastikan biaya langganan tidak naik seiring pertumbuhan bisnis Anda. Buka 1 atau 100 cabang—harganya tetap sama.',
    points: [
      'Tidak ada biaya per outlet',
      'Tidak ada biaya per kasir/user',
      'Upgrade paket kapan saja',
    ],
    visual: (
      <div className="bg-[#F5F7FA] rounded-2xl p-6 border border-gray-100">
        <p className="text-sm font-sans font-bold text-[#0A2540] mb-4">Cabang Aktif</p>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {['Jakarta Pusat', 'Bandung', 'Surabaya', 'Medan', 'Makassar', '+ Buka Cabang'].map((branch, i) => (
            <div
              key={branch}
              className={`rounded-xl p-2 text-center text-[10px] font-body font-semibold ${
                i === 5
                  ? 'border-2 border-dashed border-[#00C897] text-[#00C897] cursor-pointer'
                  : 'bg-[#0A2540] text-white'
              }`}
            >
              {branch}
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl p-3 border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-400 font-body">Biaya Bulanan</p>
            <p className="text-base font-bold text-[#0A2540] font-sans">Rp 299.000</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-400 font-body">Per Cabang</p>
            <p className="text-base font-bold text-[#00C897] font-sans">Rp 0</p>
          </div>
        </div>
      </div>
    ),
    reverse: true,
  },
  {
    icon: Utensils,
    title: 'Dapur dan Meja Restoran Terpadu',
    desc: 'Kelola meja, terima pesanan dari QR menu, dan kirim langsung ke display dapur. Kurangi miskomunikasi, percepat pelayanan, dan tingkatkan kepuasan pelanggan.',
    points: [
      'Kitchen Display System (KDS)',
      'Manajemen meja & reservasi',
      'QR menu self-order',
    ],
    visual: (
      <div className="bg-[#0A2540] rounded-2xl p-6 text-white">
        <p className="text-sm font-sans font-bold mb-4">Denah Restoran</p>
        <div className="grid grid-cols-4 gap-1.5 mb-4">
          {[
            { no: 'M1', status: 'occupied' },
            { no: 'M2', status: 'available' },
            { no: 'M3', status: 'occupied' },
            { no: 'M4', status: 'reserved' },
            { no: 'M5', status: 'available' },
            { no: 'M6', status: 'occupied' },
            { no: 'M7', status: 'available' },
            { no: 'M8', status: 'available' },
          ].map((table) => (
            <div
              key={table.no}
              className={`rounded-lg p-2 text-center text-[10px] font-bold font-body ${
                table.status === 'occupied'
                  ? 'bg-[#00C897]/20 text-[#00C897]'
                  : table.status === 'reserved'
                  ? 'bg-amber-500/20 text-amber-400'
                  : 'bg-white/10 text-white/50'
              }`}
            >
              {table.no}
            </div>
          ))}
        </div>
        <div className="flex gap-3 text-[10px] font-body">
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-[#00C897]/40" /><span className="text-white/60">Terisi</span></div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-amber-500/40" /><span className="text-white/60">Reservasi</span></div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-white/20" /><span className="text-white/60">Kosong</span></div>
        </div>
      </div>
    ),
    reverse: false,
  },
  {
    icon: ShoppingBag,
    title: 'Agregator Pesanan Online Bawaan',
    desc: 'Terima dan kelola pesanan dari GoFood, GrabFood, dan ShopeeFood langsung di satu dashboard tanpa berpindah aplikasi. Kurangi kesalahan dan hemat waktu.',
    points: [
      'GoFood, GrabFood, ShopeeFood',
      'Satu dashboard semua platform',
      'Laporan terintegrasi otomatis',
    ],
    visual: (
      <div className="bg-[#F5F7FA] rounded-2xl p-6 border border-gray-100">
        <p className="text-sm font-sans font-bold text-[#0A2540] mb-4">Pesanan Masuk</p>
        <div className="space-y-2">
          {[
            { platform: 'GoFood', order: 'Nasi + Ayam', time: '2 mnt lalu', status: 'Baru' },
            { platform: 'GrabFood', order: 'Paket Keluarga', time: '5 mnt lalu', status: 'Diproses' },
            { platform: 'ShopeeFood', order: 'Mie Goreng', time: '8 mnt lalu', status: 'Siap' },
          ].map((order) => (
            <div key={order.time} className="bg-white rounded-xl p-3 border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#0A2540] flex items-center justify-center">
                  <ShoppingBag className="w-3.5 h-3.5 text-[#00C897]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#0A2540] font-body">{order.platform}</p>
                  <p className="text-[10px] text-gray-400 font-body">{order.order} · {order.time}</p>
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-body ${
                  order.status === 'Baru'
                    ? 'bg-blue-50 text-blue-600'
                    : order.status === 'Diproses'
                    ? 'bg-amber-50 text-amber-600'
                    : 'bg-[#00C897]/10 text-[#00C897]'
                }`}
              >
                {order.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    reverse: true,
  },
]

export default function ValueProps() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#00C897] uppercase tracking-widest mb-3 font-body">
            Mengapa Cashora?
          </p>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#0A2540] text-balance max-w-2xl mx-auto">
            Solusi Lengkap yang Tumbuh Bersama Bisnis Anda
          </h2>
        </div>

        <div className="space-y-20">
          {props.map((item) => (
            <div
              key={item.title}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                item.reverse ? 'lg:[&>*:first-child]:order-last' : ''
              }`}
            >
              {/* Text */}
              <div>
                <div className="inline-flex w-12 h-12 bg-[#00C897]/10 rounded-xl items-center justify-center mb-5">
                  <item.icon className="w-6 h-6 text-[#00C897]" strokeWidth={2} />
                </div>
                <h3 className="font-sans font-bold text-2xl sm:text-3xl text-[#0A2540] mb-4 text-balance">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed mb-6 font-body">{item.desc}</p>
                <ul className="space-y-2.5">
                  {item.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2.5 text-sm text-gray-600 font-body">
                      <Check className="w-4 h-4 text-[#00C897] shrink-0" strokeWidth={2.5} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual */}
              <div>{item.visual}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
