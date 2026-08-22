"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  ChevronDown,
  Compass,
  MessageSquare,
  FileText,
  HelpCircle,
  Sparkles,
  ExternalLink,
  PhoneCall,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Keyboard,
} from "lucide-react";
import { FAQItem } from "../types";

interface HelpDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTour: () => void;
}

type HelpCategory = FAQItem["category"] | "all";

const categoryLabels: Record<HelpCategory, string> = {
  all: "Semua",
  umum: "Dasar",
  laporan: "Laporan",
  pos: "POS",
  pembayaran: "Pembayaran",
  outlet: "Outlet",
  staff: "Staff",
  inventori: "Inventori",
  akun: "Akun",
  keamanan: "Keamanan",
  langganan: "Langganan",
  teknis: "Troubleshooting",
};

const faqList: FAQItem[] = [
  {
    id: "faq-dashboard-overview",
    category: "umum",
    question: "Apa fungsi Dasbor Owner Cashora?",
    answer: "Dasbor Owner memberikan ringkasan lintas outlet: KPI penjualan, pengeluaran, laba, transaksi, grafik per toko, kontribusi outlet, kanal pembayaran, dan daftar toko. Gunakan dasbor untuk memantau kondisi bisnis; buka Detail & Monitoring untuk mengambil tindakan pada outlet tertentu.",
    keywords: ["dashboard", "owner", "ringkasan", "kpi", "dasbor"],
  },
  {
    id: "faq-period",
    category: "laporan",
    question: "Bagaimana memilih periode Hari Ini, 7 Hari, Quarter, atau Semester?",
    answer: "Gunakan tombol filter cepat untuk Hari Ini, Kemarin, 7 Hari, dan 30 Hari. Untuk analisis bisnis, gunakan dropdown Periode untuk memilih Q1–Q4 atau Semester 1–2. Setelah periode berubah, label periode, KPI, grafik, dan kontribusi outlet ikut diperbarui.",
    keywords: ["periode", "quarter", "semester", "q1", "q2", "q3", "q4", "s1", "s2", "tanggal"],
  },
  {
    id: "faq-chart",
    category: "laporan",
    question: "Bagaimana membaca grafik perbandingan antar toko?",
    answer: "Garis Total Combined menunjukkan gabungan seluruh outlet, sedangkan garis berwarna menunjukkan outlet tertentu. Klik tombol legend untuk menyembunyikan atau menampilkan garis. Gunakan tab Penjualan atau Pengeluaran sesuai analisis yang dibutuhkan.",
    keywords: ["grafik", "chart", "kurva", "legend", "penjualan", "pengeluaran"],
  },
  {
    id: "faq-export",
    category: "laporan",
    question: "Bagaimana cara mengekspor ringkasan laporan?",
    answer: "Klik CSV pada panel grafik untuk mengunduh ringkasan periode aktif beserta kontribusi outlet. Tombol PDF saat ini merupakan placeholder pada mockup dan belum menghasilkan file PDF nyata.",
    keywords: ["csv", "pdf", "export", "unduh", "download", "laporan"],
  },
  {
    id: "faq-outlet-detail",
    category: "outlet",
    question: "Apa yang tersedia di halaman Detail & Monitoring Outlet?",
    answer: "Detail outlet memiliki tab Ringkasan, Inventori, Staff & Akses, dan Pengaturan. Ringkasan untuk kondisi operasional, Inventori untuk stok, Staff & Akses untuk anggota outlet, dan Pengaturan untuk perubahan outlet yang diizinkan.",
    keywords: ["detail", "monitoring", "outlet", "cabang", "tab"],
  },
  {
    id: "faq-active-settings",
    category: "outlet",
    question: "Mengapa pengaturan outlet Aktif tidak bisa diubah?",
    answer: "Untuk mencegah perubahan konfigurasi saat POS sedang beroperasi, pengaturan outlet Aktif dikunci. Pilih Jeda Operasional terlebih dahulu. Setelah status menjadi Maintenance, tab Pengaturan dapat digunakan.",
    keywords: ["aktif", "terkunci", "pengaturan", "jeda", "maintenance", "konfigurasi"],
  },
  {
    id: "faq-outlet-status",
    category: "outlet",
    question: "Apa perbedaan Aktif, Maintenance, Online, dan Offline?",
    answer: "Aktif berarti outlet diizinkan beroperasi. Maintenance berarti operasional dijeda dan pengaturan dapat disiapkan. Online menunjukkan koneksi POS tersedia, sedangkan Offline menunjukkan outlet tidak sedang terhubung. Outlet Maintenance selalu ditampilkan Offline.",
    keywords: ["status", "aktif", "maintenance", "online", "offline", "koneksi"],
  },
  {
    id: "faq-delete-outlet",
    category: "outlet",
    question: "Bagaimana cara menghapus toko?",
    answer: "Toko tidak dapat dihapus saat Aktif. Buka Detail & Monitoring, pilih Jeda Operasional, masuk ke Pengaturan, lalu pilih Hapus Toko. Sistem meminta konfirmasi dengan mengetik nama toko agar penghapusan tidak terjadi secara tidak sengaja.",
    keywords: ["hapus", "delete", "toko", "outlet", "jeda"],
  },
  {
    id: "faq-register-outlet",
    category: "outlet",
    question: "Bagaimana cara mendaftarkan toko baru?",
    answer: "Klik Daftarkan Toko Baru pada daftar outlet, lengkapi wizard identitas usaha, lokasi, konfigurasi POS, pembayaran, dan tinjauan akhir. Pada tahap mockup, data toko dicatat secara lokal dan belum dikirim ke backend produksi.",
    keywords: ["daftar", "tambah", "buat", "toko baru", "wizard", "cabang"],
  },
  {
    id: "faq-staff-scope",
    category: "staff",
    question: "Di mana saya mengelola staff outlet?",
    answer: "Buka Detail & Monitoring pada outlet yang dipilih, lalu masuk ke tab Staff & Akses. Manajemen staff sekarang dibuat scoped per outlet agar akses manager dan kasir tidak tercampur antar cabang.",
    keywords: ["staff", "pegawai", "karyawan", "akses", "manager", "kasir"],
  },
  {
    id: "faq-invite-staff",
    category: "staff",
    question: "Bagaimana cara mengundang manager atau kasir?",
    answer: "Penambahan staff baru dilakukan terpusat melalui menu profil Owner > Tambah Staff Baru. Setelah profil dibuat sebagai Nonaktif, buka tab Staff & Akses pada outlet untuk melakukan assign atau mengaktifkan akses staff tersebut. Mockup ini tidak mengirim WhatsApp atau kredensial asli.",
    keywords: ["undang", "invite", "manager", "kasir", "whatsapp"],
  },
  {
    id: "faq-owner-protection",
    category: "keamanan",
    question: "Mengapa Owner Utama tidak dapat dinonaktifkan?",
    answer: "Owner Utama adalah pemegang kontrol utama organisasi. Untuk mencegah kehilangan akses, status dan hak akses Owner Utama dilindungi. Peran manager dan kasir dapat dikelola dari outlet masing-masing.",
    keywords: ["owner utama", "role", "peran", "proteksi", "akses"],
  },
  {
    id: "faq-inventory",
    category: "inventori",
    question: "Bagaimana membaca status stok di Detail Outlet?",
    answer: "Aman berarti stok berada di atas batas minimum, Menipis berarti perlu dipantau, dan Kritis berarti perlu ditindaklanjuti segera. Gunakan pencarian produk atau SKU untuk menemukan item tertentu.",
    keywords: ["inventori", "inventory", "stok", "sku", "kritis", "menipis"],
  },
  {
    id: "faq-inventory-no-result",
    category: "inventori",
    question: "Mengapa produk tidak muncul di tabel inventori?",
    answer: "Pastikan Anda membuka outlet yang benar dan memeriksa kembali nama produk atau SKU pada kolom pencarian. Jika tetap kosong, hapus kata kunci pencarian untuk menampilkan seluruh data mock outlet.",
    keywords: ["produk", "stok", "tidak muncul", "pencarian", "sku"],
  },
  {
    id: "faq-payment-methods",
    category: "pembayaran",
    question: "Di mana saya melihat kanal pembayaran?",
    answer: "Kanal dan metode pembayaran ditampilkan sebagai bagian dari analytics dashboard. Detail aktivitas pembayaran bukan lagi tabel terpisah di dashboard Owner. Status transaksi dan settlement produksi nantinya mengikuti sumber kebenaran payment gateway/backend.",
    keywords: ["pembayaran", "qris", "tunai", "kartu", "payment", "settlement"],
  },
  {
    id: "faq-qris",
    category: "pembayaran",
    question: "Apakah QRIS sudah terhubung ke gateway pembayaran?",
    answer: "Belum. Aplikasi ini masih berupa mockup UI. Data QRIS, status callback, settlement, refund, dan rekonsiliasi belum merupakan transaksi produksi dan harus dihubungkan oleh backend/payment gateway.",
    keywords: ["qris", "gateway", "callback", "settlement", "refund"],
  },
  {
    id: "faq-account-profile",
    category: "akun",
    question: "Bagaimana cara memperbarui profil owner?",
    answer: "Buka menu profil owner untuk mengubah informasi personal, bisnis, keamanan, dan paket yang tersedia. Perubahan pada mockup masih menggunakan state lokal sesuai area yang telah diimplementasikan.",
    keywords: ["profil", "owner", "nama", "email", "akun"],
  },
  {
    id: "faq-security",
    category: "keamanan",
    question: "Apa yang perlu diperiksa jika ada sesi login yang tidak dikenal?",
    answer: "Buka tab Keamanan pada profil owner, periksa daftar sesi aktif, dan gunakan tindakan keluar dari sesi yang tidak dikenal. Jangan membagikan password, OTP, token, atau kredensial payment gateway kepada siapa pun.",
    keywords: ["keamanan", "sesi", "login", "password", "otp", "token"],
  },
  {
    id: "faq-subscription",
    category: "langganan",
    question: "Di mana saya melihat paket dan penggunaan?",
    answer: "Informasi paket dan kuota tersedia pada area profil owner. Detail entitlement, outlet, staff, perangkat, dan integrasi harus mengikuti konfigurasi paket yang nantinya disediakan backend/billing production.",
    keywords: ["paket", "kuota", "langganan", "billing", "usage"],
  },
  {
    id: "faq-demo-data",
    category: "teknis",
    question: "Apakah data pada dashboard adalah data nyata?",
    answer: "Tidak. Data saat ini adalah mock data untuk memvalidasi alur dan tampilan UI. Jangan menggunakan angka demo sebagai dasar keputusan finansial, rekonsiliasi pembayaran, atau laporan resmi.",
    keywords: ["mock", "demo", "data", "nyata", "backend"],
  },
  {
    id: "faq-refresh",
    category: "teknis",
    question: "Mengapa perubahan saya kembali setelah refresh?",
    answer: "Sebagian besar state pada mockup masih berjalan di memori browser dan belum disimpan ke backend atau localStorage. Karena itu perubahan dapat kembali ke data awal setelah refresh atau membuka sesi baru.",
    keywords: ["refresh", "reload", "hilang", "tersimpan", "localstorage"],
  },
  {
    id: "faq-error",
    category: "teknis",
    question: "Apa yang harus dilakukan ketika halaman error atau tidak merespons?",
    answer: "Catat halaman, tindakan terakhir, waktu kejadian, dan pesan error yang terlihat. Coba refresh satu kali, pastikan koneksi stabil, lalu hubungi support. Jangan mengulang pembayaran atau menghapus data berkali-kali sebelum statusnya jelas.",
    keywords: ["error", "bug", "tidak merespons", "gagal", "troubleshooting"],
  },
];

const popularFaqIds = ["faq-dashboard-overview", "faq-period", "faq-outlet-status", "faq-staff-scope", "faq-inventory", "faq-qris"];

export function HelpDrawer({ isOpen, onClose, onStartTour }: HelpDrawerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-dashboard-overview");
  const [activeCategory, setActiveCategory] = useState<HelpCategory>("all");
  const tourTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (tourTimerRef.current) clearTimeout(tourTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const filteredFaqs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return faqList.filter((faq) => {
      const searchable = [faq.question, faq.answer, ...(faq.keywords ?? [])].join(" ").toLowerCase();
      return (!query || searchable.includes(query)) && (activeCategory === "all" || faq.category === activeCategory);
    });
  }, [activeCategory, searchQuery]);

  const popularFaqs = faqList.filter((faq) => popularFaqIds.includes(faq.id));

  const startTourAfterClose = () => {
    onClose();
    if (tourTimerRef.current) clearTimeout(tourTimerRef.current);
    tourTimerRef.current = setTimeout(() => onStartTour(), 260);
  };

  const toggleFaq = (id: string) => setOpenFaqId((prev) => (prev === id ? null : id));
  const resetFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end overflow-hidden" role="presentation">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="help-drawer-title"
            className="relative z-10 flex h-full w-full max-w-xl flex-col overflow-hidden bg-white shadow-2xl"
          >
            <header className="relative overflow-hidden bg-[#0A2540] p-6 text-white">
              <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #00C897, transparent 70%)" }} />
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#00C897]/40 bg-[#00C897]/20 text-[#00C897]"><HelpCircle className="h-5 w-5" /></div>
                  <div><h2 id="help-drawer-title" className="text-lg font-extrabold tracking-tight">Pusat Bantuan Cashora</h2><p className="text-xs text-slate-300">Panduan, solusi, dan dukungan Owner POS</p></div>
                </div>
                <button type="button" onClick={onClose} className="rounded-xl p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white" aria-label="Tutup Pusat Bantuan"><X className="h-5 w-5" /></button>
              </div>
              <div className="relative z-10 mt-5 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                <div className="mb-2 flex items-center justify-between gap-3"><div className="flex items-center gap-2 text-[#00C897]"><Compass className="h-4 w-4" /><span className="text-xs font-bold uppercase tracking-wider">Tur Interaktif</span></div><span className="rounded-full border border-[#00C897]/30 bg-[#00C897]/20 px-2 py-0.5 text-[10px] font-extrabold text-[#00C897]">4 Langkah</span></div>
                <p className="mb-3 text-xs leading-relaxed text-slate-200">Pelajari area utama Dasbor Owner dengan panduan visual singkat.</p>
                <button type="button" onClick={startTourAfterClose} className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#00C897] px-4 py-2.5 text-xs font-black text-[#0A2540] shadow-md transition-all hover:bg-[#00b084]"><Sparkles className="h-4 w-4 transition-transform group-hover:scale-110" />Mulai Tur Dasbor</button>
              </div>
            </header>

            <div className="grid grid-cols-2 gap-2 border-b border-slate-200/80 bg-slate-50 p-4 sm:grid-cols-4">
              <a href="https://wa.me/6281234567890?text=Halo%20Support%20Cashora,%20saya%20butuh%20bantuan" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white p-3 transition-all hover:border-emerald-500 hover:shadow-md"><MessageSquare className="h-4 w-4 shrink-0 text-emerald-600" /><span className="text-[11px] font-extrabold text-[#0A2540] group-hover:text-emerald-600">Live CS</span></a>
              <button type="button" onClick={() => setActiveCategory("teknis")} className="group flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white p-3 text-left transition-all hover:border-amber-400 hover:shadow-md"><AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" /><span className="text-[11px] font-extrabold text-[#0A2540]">Troubleshoot</span></button>
              <button type="button" onClick={() => { setOpenFaqId(null); setActiveCategory("all"); setSearchQuery(""); }} className="group flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white p-3 text-left transition-all hover:border-blue-400 hover:shadow-md"><BookOpen className="h-4 w-4 shrink-0 text-blue-600" /><span className="text-[11px] font-extrabold text-[#0A2540]">Semua Panduan</span></button>
              <button type="button" onClick={startTourAfterClose} className="group flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white p-3 text-left transition-all hover:border-[#00C897] hover:shadow-md"><Compass className="h-4 w-4 shrink-0 text-[#00A87E]" /><span className="text-[11px] font-extrabold text-[#0A2540]">Tur Dasbor</span></button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-6">
              <div className="relative"><Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input autoFocus={isOpen} type="search" placeholder="Cari pertanyaan, fitur, atau kendala..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-100/80 py-3 pl-10 pr-4 text-xs text-slate-800 outline-none transition-all focus:border-[#00C897] focus:ring-2 focus:ring-[#00C897]/50" /></div>

              {!searchQuery && activeCategory === "all" && (
                <section><div className="mb-3 flex items-center justify-between"><h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Paling sering dibutuhkan</h3><span className="text-[10px] font-bold text-slate-400">{faqList.length} panduan</span></div><div className="grid gap-2 sm:grid-cols-2">{popularFaqs.map((faq) => <button type="button" key={faq.id} onClick={() => { setOpenFaqId(faq.id); document.getElementById(`faq-${faq.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" }); }} className="rounded-2xl border border-slate-200/80 bg-white p-3 text-left transition-colors hover:border-[#00C897]/60 hover:bg-emerald-50/30"><p className="line-clamp-2 text-[11px] font-extrabold leading-relaxed text-[#0A2540]">{faq.question}</p></button>)}</div></section>
              )}

              <div className="flex items-center gap-2 overflow-x-auto pb-1" aria-label="Kategori bantuan">{(Object.keys(categoryLabels) as HelpCategory[]).map((category) => <button type="button" key={category} onClick={() => setActiveCategory(category)} className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-extrabold transition-all ${activeCategory === category ? "bg-[#0A2540] text-[#00C897] shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{categoryLabels[category]}</button>)}</div>

              <section aria-live="polite"><div className="mb-3 flex items-center justify-between"><h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Hasil Bantuan ({filteredFaqs.length})</h3>{(searchQuery || activeCategory !== "all") && <button type="button" onClick={resetFilters} className="inline-flex items-center gap-1 text-[11px] font-extrabold text-[#00A87E] hover:underline"><RotateCcw className="h-3 w-3" />Reset</button>}</div>
                {filteredFaqs.length === 0 ? <div className="rounded-2xl border border-slate-100 bg-slate-50 p-7 text-center"><HelpCircle className="mx-auto mb-2 h-8 w-8 text-slate-300" /><p className="text-xs font-bold text-slate-700">Pertanyaan belum ditemukan</p><p className="mt-1 text-[11px] text-slate-400">Coba kata kunci lain atau hubungi Live CS untuk bantuan lanjutan.</p></div> : <div className="space-y-3">{filteredFaqs.map((faq) => { const isOpenFaq = openFaqId === faq.id; return <div id={`faq-${faq.id}`} key={faq.id} className={`overflow-hidden rounded-2xl border transition-all ${isOpenFaq ? "border-[#00C897]/50 bg-emerald-50/30 shadow-sm" : "border-slate-200/80 bg-white hover:border-slate-300"}`}><button type="button" onClick={() => toggleFaq(faq.id)} aria-expanded={isOpenFaq} className="flex w-full items-start justify-between gap-3 p-4 text-left"><span className={`text-xs font-extrabold leading-snug ${isOpenFaq ? "text-[#0A2540]" : "text-slate-700"}`}>{faq.question}</span><ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isOpenFaq ? "rotate-180 text-[#00C897]" : "text-slate-400"}`} /></button><AnimatePresence initial={false}>{isOpenFaq && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}><div className="border-t border-slate-100/80 px-4 pb-4 pt-3 text-xs leading-relaxed text-slate-600">{faq.answer}</div></motion.div>}</AnimatePresence></div>; })}</div>}
              </section>

              <section className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4"><div className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" /><div><p className="text-xs font-extrabold text-[#0A2540]">Belum menemukan jawaban?</p><p className="mt-1 text-[11px] leading-relaxed text-slate-600">Siapkan nama outlet, halaman yang sedang dibuka, langkah terakhir, waktu kejadian, dan screenshot/pesan error sebelum menghubungi support.</p><a href="https://wa.me/6281234567890?text=Halo%20Support%20Cashora,%20saya%20membutuhkan%20bantuan" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-extrabold text-blue-700 hover:underline"><PhoneCall className="h-3.5 w-3.5" />Hubungi Live CS<ExternalLink className="h-3 w-3" /></a></div></div></section>
            </div>

            <footer className="flex items-center justify-between gap-3 border-t border-slate-200/80 bg-slate-50 p-4"><p className="text-[10px] font-semibold text-slate-500">Cashora Business Support • Mockup UI</p><span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400"><Keyboard className="h-3.5 w-3.5" />ESC untuk menutup</span></footer>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

export { faqList };
