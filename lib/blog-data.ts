export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  authorRole: string
  date: string
  readTime: string
  featured: boolean
  tags: string[]
  content: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'kenapa-umkm-butuh-pos-offline',
    title: 'Kenapa UMKM Indonesia Butuh POS yang Bisa Bekerja Offline?',
    excerpt:
      'Koneksi internet yang tidak stabil masih menjadi tantangan nyata bagi banyak pelaku UMKM di Indonesia. Pelajari mengapa solusi POS offline-first bukan sekadar fitur tambahan, melainkan kebutuhan mendasar.',
    category: 'Tips Bisnis',
    author: 'Rani Setiawan',
    authorRole: 'Head of Product',
    date: '22 Juli 2025',
    readTime: '5 menit',
    featured: true,
    tags: ['UMKM', 'Offline', 'POS', 'Konektivitas'],
    content: `
## Masalah yang Sering Diabaikan

Di balik kesibukan pelayanan pelanggan, banyak pemilik warung, kafe, dan toko retail yang pernah mengalami satu skenario menakutkan: internet mati di jam sibuk. Antrian mengular, mesin kasir tidak bisa diakses, dan transaksi terpaksa dicatat di kertas secarik.

Ini bukan cerita fiksi. Ini adalah realita yang dihadapi jutaan UMKM setiap harinya.

## Fakta Infrastruktur Digital Indonesia

Menurut data Kominfo 2024, penetrasi internet di Indonesia memang terus meningkat, namun **kualitas dan kestabilan jaringan** di luar kota-kota besar masih sangat bervariasi. Daerah perbatasan, pasar tradisional di pinggiran, bahkan mal-mal di kota tier-2 masih kerap mengalami gangguan koneksi.

Ketika sistem POS Anda bergantung 100% pada cloud, setiap detik downtime berarti:
- Transaksi tertunda atau gagal
- Pelanggan yang tidak sabar berpindah ke kompetitor
- Potensi kehilangan data transaksi
- Stres yang tidak perlu bagi kasir dan manajer toko

## Arsitektur Offline-First: Bukan Kompromi, tapi Keunggulan

POS dengan arsitektur *offline-first* membalik paradigma: semua data disimpan lokal di perangkat terlebih dahulu, lalu disinkronisasi ke cloud ketika koneksi tersedia. Hasilnya:

**1. Kecepatan Transaksi Lebih Tinggi**
Karena tidak harus menunggu respons server untuk setiap tap, transaksi berjalan lebih cepat — bahkan saat online sekalipun. Latensi jaringan tidak lagi menjadi bottleneck.

**2. Keandalan 100%**
Bisnis Anda tidak pernah berhenti. Kasir bisa melayani pelanggan, mencetak struk, dan memproses berbagai metode pembayaran tanpa terpengaruh kondisi internet.

**3. Sinkronisasi Cerdas**
Begitu koneksi pulih, semua transaksi yang tertunda langsung tersinkron ke dashboard pusat secara otomatis, lengkap dengan resolusi konflik jika ada perubahan data di beberapa cabang secara bersamaan.

## Cashora dan Komitmen Offline-First

Cashora dirancang dari awal dengan filosofi offline-first. Kami menggunakan database lokal berbasis SQLite yang dioptimalkan untuk operasi POS, dikombinasikan dengan mesin sinkronisasi pintar yang memastikan konsistensi data di seluruh cabang Anda.

Hasilnya? Merchant Cashora rata-rata mengalami **0 jam downtime** yang disebabkan oleh masalah koneksi internet — karena koneksi bukan prasyarat untuk beroperasi.

## Kesimpulan

Memilih POS bukan hanya soal fitur laporan atau tampilan antarmuka. Salah satu pertanyaan terpenting yang harus Anda tanyakan kepada vendor adalah: **"Apa yang terjadi jika internet saya mati?"**

Jika jawabannya adalah "kasir tidak bisa beroperasi," maka Anda perlu mempertimbangkan ulang pilihan Anda.

UMKM Indonesia membutuhkan infrastruktur teknologi yang tangguh — sama tangguhnya dengan semangat para pelaku usahanya.
    `.trim(),
  },
  {
    slug: 'strategi-manajemen-inventori-restoran',
    title: '5 Strategi Manajemen Inventori yang Wajib Diterapkan Restoran',
    excerpt:
      'Food cost yang tidak terkontrol adalah salah satu alasan utama restoran gulung tikar. Temukan bagaimana teknologi dan proses yang tepat bisa mengubah inventori dari beban menjadi keunggulan kompetitif.',
    category: 'Restoran',
    author: 'Bimo Prasetyo',
    authorRole: 'Restaurant Success Manager',
    date: '15 Juli 2025',
    readTime: '7 menit',
    featured: true,
    tags: ['Restoran', 'Inventori', 'Food Cost', 'Manajemen'],
    content: `
## Mengapa Inventori Restoran Lebih Kompleks dari Toko Retail

Berbeda dengan retail yang menjual produk jadi, restoran mengelola **bahan baku** yang berubah menjadi produk jadi melalui proses produksi. Satu porsi nasi goreng spesial mungkin menggunakan 12 bahan baku berbeda dengan satuan ukuran yang berbeda pula — gram, butir, sendok makan, hingga mililiter.

Kompleksitas ini membuat kesalahan kecil dalam pencatatan inventori bisa berdampak besar pada profitabilitas.

## 1. Terapkan Resep Digital (Recipe Management)

Langkah pertama adalah mendokumentasikan setiap menu ke dalam resep digital yang detail. Setiap bahan, gramasi, dan unit harus tercatat dengan presisi. Ketika sistem POS mencatat penjualan, otomatis akan mengurangi stok bahan baku sesuai resep — tanpa perlu penghitungan manual.

Ini yang kami sebut **Deduction Inventory**: setiap transaksi penjualan secara otomatis mendeduksi komponen bahan baku dari menu yang terjual.

## 2. Lakukan Stock Opname Terjadwal

Stock opname harian untuk bahan mudah busuk, mingguan untuk bahan kering. Bandingkan hasil hitungan fisik dengan catatan sistem — selisihnya adalah angka yang harus Anda investigasi.

Dengan Cashora, selisih ini otomatis dicatat sebagai **Variance Report** yang bisa difilter per kategori, per periode, dan per item.

## 3. Pantau Food Cost Ratio Secara Real-Time

Food cost ratio ideal untuk restoran berkisar 28–35% dari harga jual. Jika ratio ini merayap naik, ada beberapa kemungkinan:
- Pemborosan di dapur (over-portioning)
- Pencurian bahan baku
- Fluktuasi harga beli yang belum diimbangi penyesuaian harga jual
- Kerusakan/kadaluwarsa yang tidak tercatat

Pantau metrik ini secara real-time, bukan hanya di akhir bulan.

## 4. Tentukan Par Level dan Reorder Point

Par level adalah jumlah minimum stok yang harus selalu tersedia. Reorder point adalah ambang batas yang memicu pemesanan ke supplier. Dengan menetapkan kedua angka ini, Anda menghilangkan dua skenario terburuk: kehabisan bahan di jam makan siang, dan kelebihan stok bahan yang cepat busuk.

## 5. Integrasikan dengan Supplier

Sistem inventori yang benar-benar modern bisa terhubung langsung dengan supplier untuk purchase order otomatis ketika stok mendekati reorder point. Ini menghemat waktu operasional dan meminimalkan risiko human error dalam pemesanan.

## Mulai dari Mana?

Jika Anda baru memulai, fokus pada tiga hal: digitalkan resep, lakukan stock opname rutin, dan pantau food cost mingguan. Tiga kebiasaan ini saja sudah bisa menghemat jutaan rupiah per bulan untuk restoran berukuran sedang.

Cashora menyediakan semua tools ini dalam satu platform yang terintegrasi dengan POS Anda.
    `.trim(),
  },
  {
    slug: 'panduan-qris-untuk-umkm',
    title: 'Panduan Lengkap QRIS untuk UMKM: Dari Daftar hingga Transaksi Pertama',
    excerpt:
      'QRIS menyederhanakan penerimaan pembayaran digital. Pelajari cara mendaftar, biaya yang berlaku, dan bagaimana mengoptimalkan QRIS untuk bisnis Anda.',
    category: 'Pembayaran',
    author: 'Rani Setiawan',
    authorRole: 'Head of Product',
    date: '8 Juli 2025',
    readTime: '6 menit',
    featured: false,
    tags: ['QRIS', 'Pembayaran Digital', 'BI', 'UMKM'],
    content: `
## Apa Itu QRIS?

Quick Response Code Indonesian Standard (QRIS) adalah standar kode QR nasional yang ditetapkan oleh Bank Indonesia. Dengan satu kode QR, pelanggan Anda bisa membayar menggunakan aplikasi dompet digital apapun: GoPay, OVO, Dana, ShopeePay, hingga mobile banking berbagai bank.

Sebelum QRIS, merchant harus memiliki kode QR yang berbeda untuk setiap penyedia. Sekarang, satu QR sudah cukup untuk semua.

## Biaya QRIS

Per regulasi BI yang berlaku, **MDR (Merchant Discount Rate) QRIS untuk UMKM adalah 0,3%** dari nilai transaksi. Tidak ada biaya bulanan, tidak ada minimum transaksi. Biaya ini hanya berlaku saat ada transaksi masuk.

## Langkah Mendaftar QRIS via Cashora

1. Buka menu **Pembayaran** di dashboard Cashora
2. Klik **Aktifkan QRIS**
3. Isi data usaha sesuai KTP dan dokumen SIUP/NIB
4. Upload foto tempat usaha (tampak depan dan dalam)
5. Verifikasi dokumen biasanya memakan waktu 1–3 hari kerja
6. Setelah disetujui, kode QR Anda langsung aktif dan siap dicetak

## Tips Mengoptimalkan QRIS

**Cetak QR di lokasi yang tepat.** Pasang di kasir, meja prasmanan, bahkan di pintu masuk jika memungkinkan. Semakin mudah terlihat, semakin besar kemungkinan pelanggan memilih pembayaran digital.

**Aktifkan notifikasi real-time.** Cashora mengirim notifikasi suara dan visual setiap pembayaran QRIS diterima, sehingga kasir tidak perlu mengecek manual.

**Rekonsiliasi harian.** Laporan QRIS Cashora mencatat setiap transaksi dengan timestamp, nominal, dan referensi bank — memudahkan rekonsiliasi harian tanpa perlu mengunduh laporan terpisah dari setiap penyedia.

## QRIS untuk Multi-Cabang

Jika Anda memiliki beberapa cabang, setiap lokasi mendapatkan QRIS uniknya sendiri namun semua transaksi tercatat di dashboard pusat yang sama. Tidak perlu login ke akun berbeda-beda.

Ini adalah salah satu keunggulan Cashora: semua data terpusat, semua cabang termonitor dari satu layar.
    `.trim(),
  },
  {
    slug: 'laporan-penjualan-yang-benar',
    title: 'Cara Membaca Laporan Penjualan yang Benar untuk Keputusan Bisnis Lebih Baik',
    excerpt:
      'Data penjualan tersedia, tapi apakah Anda tahu metrik mana yang benar-benar penting? Panduan ini membantu Anda membaca laporan dengan cara yang menghasilkan keputusan bisnis, bukan sekadar angka.',
    category: 'Analitik',
    author: 'Dita Kusuma',
    authorRole: 'Data & Analytics Lead',
    date: '1 Juli 2025',
    readTime: '8 menit',
    featured: false,
    tags: ['Laporan', 'Analitik', 'Data', 'Keputusan Bisnis'],
    content: `
## Data Banyak, Insight Sedikit

Ironi digital: kita memiliki lebih banyak data dari sebelumnya, namun banyak pemilik bisnis masih membuat keputusan berdasarkan intuisi semata. Bukan karena datanya tidak ada — tapi karena tidak tahu cara membacanya dengan benar.

Artikel ini membahas lima metrik laporan penjualan yang benar-benar berdampak pada keputusan operasional harian Anda.

## 1. Average Transaction Value (ATV)

ATV = Total Pendapatan / Jumlah Transaksi

Metrik ini menunjukkan seberapa besar rata-rata satu pelanggan belanja di toko Anda. Tren ATV yang turun bisa mengindikasikan:
- Perubahan perilaku pelanggan (downsizing)
- Kurangnya upselling oleh kasir
- Perlu program bundling atau promosi minimum pembelian

## 2. Jam Puncak Transaksi

Bukan hanya "kapan ramai," tapi berapa banyak transaksi per jam dan berapa rata-rata waktu pelayanan. Dari sini Anda bisa mengoptimalkan jadwal staf, kesiapan stok, dan bahkan tata letak toko.

## 3. Product Mix Analysis

Produk mana yang paling banyak terjual? Dan produk mana yang paling menguntungkan? Keduanya tidak selalu sama. Mie ayam biasa mungkin terjual 3x lebih banyak dari wagyu steak, namun kontribusi margin kotor keduanya perlu dilihat secara terpisah.

## 4. Return Customer Rate

Berapa persen pelanggan hari ini adalah pelanggan yang sudah pernah bertransaksi sebelumnya? Angka ini sulit diukur tanpa sistem member/loyalty, namun sangat penting untuk mengukur kesehatan bisnis jangka panjang.

## 5. Sales Void & Refund Rate

Tingginya angka pembatalan dan refund bisa mengindikasikan masalah operasional: input pesanan yang salah, kualitas produk yang tidak konsisten, atau bahkan kebocoran internal.

## Bagaimana Cashora Menyajikan Data Ini

Dashboard Cashora menampilkan semua metrik di atas dalam visualisasi yang bisa difilter per periode, per kasir, per kategori produk, dan per cabang. Export ke Excel tersedia dengan satu klik, lengkap dengan grafik siap presentasi.

Data yang baik adalah aset. Baca dengan benar, dan data Anda akan menjadi panduan bisnis yang lebih andal dari intuisi manapun.
    `.trim(),
  },
  {
    slug: 'cashora-untuk-korporasi-multi-cabang',
    title: 'Skalabilitas Tanpa Batas: Bagaimana Cashora Melayani Korporasi dengan Ratusan Cabang',
    excerpt:
      'Dari 1 cabang ke 500 cabang, Cashora dirancang untuk tumbuh bersama bisnis Anda. Pelajari arsitektur multi-tenant dan fitur enterprise yang kami kembangkan khusus untuk kebutuhan korporasi.',
    category: 'Enterprise',
    author: 'Bimo Prasetyo',
    authorRole: 'Restaurant Success Manager',
    date: '24 Juni 2025',
    readTime: '6 menit',
    featured: false,
    tags: ['Enterprise', 'Multi-Cabang', 'Korporasi', 'Skalabilitas'],
    content: `
## Tantangan POS di Skala Korporasi

Bagi bisnis dengan puluhan hingga ratusan outlet, tantangan bukan lagi soal apakah sistem bisa memproses transaksi — tapi soal:

- Konsistensi data real-time di semua lokasi
- Manajemen menu terpusat dengan override lokal
- Pemisahan laporan per brand, per region, per outlet
- Kontrol akses berbasis peran (RBAC) yang granular
- Kepatuhan regulasi dan audit trail yang lengkap

## Arsitektur Multi-Tenant Cashora

Cashora menggunakan arsitektur multi-tenant dengan isolasi data penuh antar tenant. Untuk korporasi, ini berarti:

**Hierarki Organisasi Fleksibel**
Anda bisa mendefinisikan struktur organisasi sesuai kebutuhan: Holding > Brand > Region > Outlet. Laporan dan kontrol akses mengikuti hierarki ini secara otomatis.

**Menu Management Terpusat**
Tim pusat mengelola master menu. Setiap outlet bisa mengaktifkan/menonaktifkan item sesuai ketersediaan lokal, namun tidak bisa mengubah nama atau harga tanpa otorisasi dari pusat.

**Real-time Monitoring Dashboard**
C-level executives bisa melihat performa seluruh jaringan dalam satu view: total transaksi, total pendapatan, outlet yang sedang offline, dan anomali penjualan — semua dalam real-time.

## Fitur Enterprise Eksklusif

- **Single Sign-On (SSO)** via SAML 2.0 / OIDC, terintegrasi dengan Active Directory perusahaan
- **Dedicated Customer Success Manager** untuk onboarding dan dukungan berkelanjutan
- **SLA 99.9% uptime** dengan kompensasi finansial jika dilanggar
- **Custom Reporting API** untuk integrasi dengan BI tools (Tableau, Power BI, Looker)
- **White-label option** untuk brand korporasi yang ingin tampilan aplikasi sesuai identitas perusahaan

## Studi Kasus: Network 200+ Outlet

Salah satu klien korporasi kami mengelola lebih dari 200 outlet di 15 kota besar Indonesia. Sebelum beralih ke Cashora, tim IT mereka menghabiskan rata-rata 40 jam per minggu hanya untuk rekonsiliasi data penjualan.

Setelah implementasi Cashora Enterprise, rekonsiliasi menjadi otomatis dan real-time. Tim IT bisa fokus pada inisiatif strategis, bukan maintenance harian.

## Mulai Diskusi Enterprise

Kebutuhan enterprise setiap perusahaan berbeda. Tim kami siap mendiskusikan arsitektur, timeline implementasi, dan penawaran khusus untuk volume besar.

Hubungi tim enterprise kami di enterprise@cashora.id atau jadwalkan demo khusus melalui halaman Demo kami.
    `.trim(),
  },
  {
    slug: 'tips-meningkatkan-penjualan-dengan-data',
    title: '7 Cara Meningkatkan Penjualan Menggunakan Data POS Anda',
    excerpt:
      'POS Anda menyimpan harta karun data yang belum dimanfaatkan. Tujuh taktik berbasis data ini bisa langsung diterapkan untuk meningkatkan pendapatan tanpa biaya marketing tambahan.',
    category: 'Tips Bisnis',
    author: 'Dita Kusuma',
    authorRole: 'Data & Analytics Lead',
    date: '17 Juni 2025',
    readTime: '5 menit',
    featured: false,
    tags: ['Penjualan', 'Data', 'Strategi', 'Pertumbuhan'],
    content: `
## Data POS Anda Lebih Berharga dari yang Anda Kira

Setiap transaksi yang masuk ke sistem POS Anda adalah satu titik data. Satu shift kerja bisa menghasilkan ribuan titik data. Dalam setahun, Anda memiliki jutaan data points yang menceritakan perilaku pelanggan, tren produk, dan ritme bisnis Anda dengan detail yang tidak bisa ditandingi oleh riset pasar manapun.

## Taktik 1: Happy Hour Berbasis Data

Cek laporan jam penjualan Anda. Identifikasi 2–3 jam dengan traffic terendah di hari kerja. Itu adalah target happy hour Anda — promo spesifik yang mendorong kunjungan di jam sepi, tanpa memotong margin di jam puncak.

## Taktik 2: Bundle Menu Berdasarkan Asosiasi Produk

Produk apa yang sering dibeli bersama? Analisis market basket ini bisa mengungkap peluang bundling yang natural. Jika 70% pelanggan yang membeli kopi espresso juga membeli croissant, buat bundle dengan harga sedikit lebih murah dari membeli satuan. Konversi upsell meningkat, average transaction value naik.

## Taktik 3: Optimalkan Menu dengan Data Margin

Buat matriks sederhana: sumbu X adalah popularitas (volume terjual), sumbu Y adalah profitabilitas (margin kotor). Empat kuadran menghasilkan empat strategi: promosikan bintang, eliminasi anjing, tingkatkan volume sapi perah, kembangkan tanda tanya.

## Taktik 4: Identifikasi Kasir Terbaik dan Replikasi Praktiknya

Bandingkan ATV (average transaction value) antar kasir. Kasir dengan ATV tertinggi mungkin lebih aktif menawarkan add-on atau upgrade. Jadikan mereka mentor internal dan dokumentasikan script yang mereka gunakan.

## Taktik 5: Reactivation Campaign untuk Pelanggan Lama

Dengan sistem member Cashora, identifikasi pelanggan yang tidak bertransaksi selama 30+ hari. Kirim notifikasi personal via WhatsApp dengan penawaran spesifik. Biaya retensi pelanggan lama rata-rata 5x lebih murah dari akuisisi pelanggan baru.

## Taktik 6: Manajemen Stok Berdasarkan Tren Penjualan

Jangan restock semua produk dalam jumlah sama. Gunakan data tren 30 hari terakhir untuk menyesuaikan quantity order. Produk yang tren naik: order lebih banyak. Produk yang tren turun: order lebih sedikit, investigasi alasannya.

## Taktik 7: Analisis Performa Per Hari dalam Seminggu

Selasa sore mungkin sangat sepi, tapi Minggu pagi bisa menjadi jam tersibuk Anda. Alokasikan staf, persiapan kitchen, dan stok sesuai pola mingguan ini — bukan flat merata setiap hari.

## Mulai dari Satu Taktik

Jangan mencoba menerapkan semua sekaligus. Pilih satu taktik, ukur hasilnya selama 2–4 minggu, lalu lanjutkan ke taktik berikutnya. Perubahan kecil yang konsisten mengalahkan revolusi besar yang tidak berkelanjutan.
    `.trim(),
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((p) => p.featured)
}

export function getRelatedPosts(slug: string, category: string, limit = 3): BlogPost[] {
  return blogPosts
    .filter((p) => p.slug !== slug && p.category === category)
    .slice(0, limit)
}

export const categories = ['Semua', 'Tips Bisnis', 'Restoran', 'Pembayaran', 'Analitik', 'Enterprise']
