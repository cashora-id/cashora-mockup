"use client";

import { useState } from "react";
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
  ShieldCheck,
  Zap,
  PhoneCall
} from "lucide-react";
import { FAQItem } from "../types";

interface HelpDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTour: () => void;
}

const faqList: FAQItem[] = [
  {
    id: "faq-1",
    category: "laporan",
    question: "Bagaimana cara membaca grafik kurva per perbandingan toko?",
    answer: "Grafik kurva memetakan penjualan atau pengeluaran setiap cabang secara individual (Budi Retail, Warung Pak Budi, Kopi Budi) disandingkan dengan garis Total Combined. Anda dapat mematikan atau menghidupkan garis cabang tertentu dengan mengklik pill legend di atas grafik."
  },
  {
    id: "faq-2",
    category: "pembayaran",
    question: "Berapa lama pencairan dana transaksi QRIS TUNTAS ke rekening?",
    answer: "Transaksi QRIS TUNTAS diproses secara real-time dan dicairkan secara otomatis (Instant Settlement) dalam waktu kurang dari 5 detik langsung ke rekening bank usaha yang Anda daftarkan."
  },
  {
    id: "faq-3",
    category: "pos",
    question: "Apa yang harus dilakukan jika outlet berstatus 'Maintenance'?",
    answer: "Status Maintenance menandakan sistem kasir di cabang tersebut ditangguhkan sementara untuk pemeliharaan. Anda dapat mengaktifkannya kembali melalui tombol Pengaturan Outlet pada kartu cabang terkait."
  },
  {
    id: "faq-4",
    category: "umum",
    question: "Apakah ada batasan jumlah outlet yang bisa didaftarkan di Cashora?",
    answer: "Tidak ada batasan. Paket Owner Cashora memungkinkan Anda mengelola dari 1 hingga puluhan cabang bisnis kuliner & retail dalam 1 dasbor agregat tanpa biaya tambahan per outlet."
  },
  {
    id: "faq-5",
    category: "laporan",
    question: "Bisakah laporan keuangan diekspor ke format Excel / PDF?",
    answer: "Ya, Anda dapat mengunduh laporan ringkasan berkala (Hari Ini, 7 Hari, atau 30 Hari) dalam format PDF resmi atau file Excel melalui menu Laporan di dasbor cabang."
  }
];

export function HelpDrawer({ isOpen, onClose, onStartTour }: HelpDrawerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-1");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredFaqs = faqList.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Dimmed Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
          />

          {/* Sliding Side Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col overflow-hidden"
          >
            {/* Drawer Header */}
            <div className="p-6 bg-[#0A2540] text-white relative overflow-hidden">
              {/* Background Glow */}
              <div
                className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-20 pointer-events-none"
                style={{ background: "radial-gradient(circle, #00C897, transparent 70%)" }}
              />

              <div className="flex items-center justify-between relative z-10 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#00C897]/20 border border-[#00C897]/40 flex items-center justify-center text-[#00C897] shadow-inner">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-white tracking-tight">
                      Pusat Bantuan Cashora
                    </h2>
                    <p className="text-xs text-slate-300">Panduan & Dukungan Spesialis</p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Tutup Bantuan"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Start Guided Tour Banner Card */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 relative z-10">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 text-[#00C897]">
                    <Compass className="w-4 h-4 animate-spin-slow" />
                    <span className="text-xs font-bold uppercase tracking-wider">Tur Interaktif</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#00C897]/20 text-[#00C897] text-[10px] font-extrabold border border-[#00C897]/30">
                    4 Langkah Mudah
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed mb-3">
                  Baru di Dasbor Owner Cashora? Ikuti panduan visual langkah demi langkah untuk memahami seluruh fitur dasbor.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onStartTour();
                  }}
                  className="w-full bg-[#00C897] hover:bg-[#00b084] text-[#0A2540] font-black text-xs py-2.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Mulai Tur Dasbor Sekarang
                </button>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200/80 grid grid-cols-2 gap-2">
              <a
                href="https://wa.me/6281234567890?text=Halo%20Support%20Cashora,%20saya%20butuh%20bantuan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-500 hover:shadow-md transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0A2540] group-hover:text-emerald-600 transition-colors">
                    Live CS WhatsApp
                  </p>
                  <p className="text-[10px] text-slate-400">Respon &lt; 2 menit</p>
                </div>
              </a>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Panduan Pengguna Cashora (PDF) sedang diunduh...");
                }}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-500 hover:shadow-md transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0A2540] group-hover:text-blue-600 transition-colors">
                    Panduan PDF
                  </p>
                  <p className="text-[10px] text-slate-400">Manual Laporan</p>
                </div>
              </a>
            </div>

            {/* FAQ Search & Accordions Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari kendala atau pertanyaan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-100/80 border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00C897]/50 transition-all"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {[
                  { id: "all", label: "Semua FAQ" },
                  { id: "laporan", label: "Laporan" },
                  { id: "pembayaran", label: "QRIS & Kasir" },
                  { id: "pos", label: "Outlet" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold whitespace-nowrap transition-all ${
                      activeCategory === cat.id
                        ? "bg-[#0A2540] text-[#00C897] shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Accordion List */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Pertanyaan Sering Diajukan ({filteredFaqs.length})
                </h3>

                {filteredFaqs.length === 0 ? (
                  <div className="p-6 text-center bg-slate-50 rounded-2xl border border-slate-100">
                    <HelpCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-700">Pertanyaan Tidak Ditemukan</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Coba gunakan kata kunci lain atau hubungi CS Support kami.
                    </p>
                  </div>
                ) : (
                  filteredFaqs.map((faq) => {
                    const isOpenFaq = openFaqId === faq.id;
                    return (
                      <div
                        key={faq.id}
                        className={`rounded-2xl border transition-all overflow-hidden ${
                          isOpenFaq
                            ? "bg-emerald-50/30 border-[#00C897]/50 shadow-sm"
                            : "bg-white border-slate-200/80 hover:border-slate-300"
                        }`}
                      >
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full p-4 text-left flex items-start justify-between gap-3 cursor-pointer"
                        >
                          <span
                            className={`text-xs font-extrabold leading-snug ${
                              isOpenFaq ? "text-[#0A2540]" : "text-slate-700"
                            }`}
                          >
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                              isOpenFaq ? "rotate-180 text-[#00C897]" : "text-slate-400"
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {isOpenFaq && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="px-4 pb-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100/80">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200/80 text-center">
              <p className="text-[11px] font-semibold text-slate-500">
                Cashora Business Support System • v2.4.0
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
