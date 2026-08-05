"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  CircleHelp,
  ExternalLink,
  Wrench,
  Plus,
  ArrowRight,
  TrendingUp,
  Store,
  Utensils,
  Coffee,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
  DollarSign,
  Users,
  Activity,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

// --- Mock Data ---
const ownerName = "Budi Santoso";

interface Business {
  id: string;
  name: string;
  type: string;
  location: string;
  status: "active" | "maintenance";
  category: "restaurant" | "storefront" | "cafe";
  todaySales: string;
  todayTransactions: number;
  growth: string;
}

const businesses: Business[] = [
  {
    id: "1",
    name: "Warung Makan Pak Budi",
    type: "Restoran & Kuliner",
    location: "Surabaya Gubeng",
    status: "active",
    category: "restaurant",
    todaySales: "Rp 3.850.000",
    todayTransactions: 142,
    growth: "+14.2%"
  },
  {
    id: "2",
    name: "Budi Retail Mart",
    type: "Supermarket & Retail",
    location: "Jakarta Pusat",
    status: "active",
    category: "storefront",
    todaySales: "Rp 7.210.000",
    todayTransactions: 289,
    growth: "+8.5%"
  },
  {
    id: "3",
    name: "Kopi Budi Sejahtera",
    type: "Coffee Shop & Bakery",
    location: "Bandung Dago",
    status: "maintenance",
    category: "cafe",
    todaySales: "Rp 0",
    todayTransactions: 0,
    growth: "0%"
  },
];

export default function OwnerMenuPage() {
  const [businessList] = useState<Business[]>(businesses);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "active" | "maintenance">("all");

  const filteredBusinesses = businessList.filter((b) => {
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.location.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === "active") return matchesSearch && b.status === "active";
    if (activeTab === "maintenance") return matchesSearch && b.status === "maintenance";
    return matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "restaurant":
        return <Utensils className="w-5 h-5 text-emerald-600" />;
      case "cafe":
        return <Coffee className="w-5 h-5 text-amber-600" />;
      default:
        return <Store className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* ========== TOP NAVBAR ========== */}
      <header className="sticky top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/cashora-logo.png"
                alt="CASHORA Logo"
                width={36}
                height={36}
                className="w-9 h-9 object-contain group-hover:scale-105 transition-transform"
                priority
              />
              <span className="text-xl font-extrabold text-[#0A2540] tracking-tight">
                CASHORA<span className="text-[#00C897]">.</span>
              </span>
            </Link>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold border border-slate-200">
              Owner Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              aria-label="Notifikasi"
              className="relative p-2 rounded-xl text-slate-500 hover:text-[#0A2540] hover:bg-slate-100 transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#00C897] ring-2 ring-white animate-pulse" />
            </button>
            <button
              aria-label="Bantuan"
              className="p-2 rounded-xl text-slate-500 hover:text-[#0A2540] hover:bg-slate-100 transition-colors"
            >
              <CircleHelp className="w-5 h-5" />
            </button>
            <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />
            <div className="flex items-center gap-3 pl-1 cursor-pointer group">
              <div className="w-9 h-9 rounded-xl bg-[#0A2540] text-white flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-emerald-500/20 group-hover:ring-emerald-500 transition-all">
                BS
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-bold text-[#0A2540] leading-none mb-0.5">{ownerName}</p>
                <p className="text-[11px] font-medium text-slate-500 leading-none">Pemilik Utama</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ========== HERO BANNER & STATS ========== */}
      <section className="bg-gradient-to-b from-[#0A2540] to-[#0d3154] text-white pt-10 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative background glow */}
        <div
          className="absolute -top-24 right-0 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #00C897, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#00C897] text-xs font-semibold border border-white/10 mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Ringkasan Multi-Cabang
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                Selamat Datang Kembali, {ownerName.split(' ')[0]} 👋
              </h1>
              <p className="text-slate-300 text-base max-w-xl">
                Pilih unit usaha Anda di bawah untuk mengelola transaksi, laporan penjualan, dan manajemen outlet secara realtime.
              </p>
            </div>

            {/* Quick Action Button */}
            <button className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#00C897] text-[#0A2540] font-bold text-sm shadow-lg shadow-emerald-500/20 hover:bg-[#00a87e] transition-all hover:scale-[1.02] active:scale-[0.98]">
              <Plus className="w-4 h-4 stroke-[3]" />
              Tambah Outlet Baru
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#00C897]/20 flex items-center justify-center text-[#00C897]">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-300">Total Omset Hari Ini</p>
                <p className="text-xl font-bold text-white">Rp 11.060.000</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-300">Total Transaksi</p>
                <p className="text-xl font-bold text-white">431 Transaksi</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-300">Outlet Aktif</p>
                <p className="text-xl font-bold text-white">2 dari 3 Outlet</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== MAIN CONTENT AREA ========== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-20">
        {/* Controls Header: Search & Filter Tabs */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/80 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-fit">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === "all"
                  ? "bg-white text-[#0A2540] shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Semua Business ({businessList.length})
            </button>
            <button
              onClick={() => setActiveTab("active")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === "active"
                  ? "bg-white text-emerald-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Aktif ({businessList.filter(b => b.status === "active").length})
            </button>
            <button
              onClick={() => setActiveTab("maintenance")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === "maintenance"
                  ? "bg-white text-amber-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Maintenance ({businessList.filter(b => b.status === "maintenance").length})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama bisnis atau kota..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00C897]/50 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Business Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((biz) => (
            <BusinessCard key={biz.id} business={biz} getIcon={getCategoryIcon} />
          ))}

          {/* Add New Business Card */}
          <div className="group flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-dashed border-slate-300 hover:border-[#00C897] bg-white hover:bg-emerald-50/30 transition-all duration-300 min-h-[300px] text-center shadow-sm hover:shadow-md cursor-pointer">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#00C897] border border-emerald-100 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#00C897] group-hover:text-white transition-all duration-300 shadow-sm">
              <Plus className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#0A2540] mb-1">
              Daftarkan Bisnis Baru
            </h3>
            <p className="text-xs text-slate-500 max-w-xs mb-5">
              Miliki cabang atau konsep usaha baru? Tambahkan ke dalam akun utama Anda dalam beberapa klik.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#00C897] group-hover:underline">
              Buat Profil Bisnis <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Bottom Support & Knowledge Banner */}
        <div className="mt-12 rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-sm relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4 max-w-2xl">
            <div className="w-12 h-12 rounded-2xl bg-[#0A2540] text-[#00C897] flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-[#0A2540] mb-1">
                Butuh bantuan mendesain menu atau mengatur stok multi-cabang?
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tim Support Spesialis Cashora siap mendampingi pengaturan POS pertama Anda secara gratis via WhatsApp atau Video Call.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full lg:w-auto">
            <Link
              href="/kontak"
              className="w-full lg:w-auto text-center px-5 py-3 rounded-xl bg-[#0A2540] text-white font-bold text-sm hover:bg-slate-800 transition-colors"
            >
              Hubungi CS Support
            </Link>
            <Link
              href="/demo"
              className="w-full lg:w-auto text-center px-5 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition-colors inline-flex items-center justify-center gap-1"
            >
              Panduan POS <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- Enhanced Business Card Component ---
function BusinessCard({
  business,
  getIcon,
}: {
  business: Business;
  getIcon: (cat: string) => React.ReactNode;
}) {
  const isActive = business.status === "active";

  return (
    <div
      className={`group flex flex-col bg-white rounded-3xl border border-slate-200/80 hover:border-[#00C897] transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 h-full ${
        !isActive ? "bg-slate-50/50" : ""
      }`}
    >
      {/* Top accent bar */}
      <div
        className={`h-1.5 w-full ${
          isActive ? "bg-gradient-to-r from-[#00C897] to-emerald-400" : "bg-slate-300"
        }`}
      />

      <div className="p-6 flex-1 flex flex-col">
        {/* Header: Icon + Badge */}
        <div className="flex justify-between items-start mb-5">
          <div className="w-13 h-13 p-3 rounded-2xl bg-slate-100 border border-slate-200/60 flex items-center justify-center group-hover:scale-105 transition-transform">
            {getIcon(business.category)}
          </div>

          {isActive ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold border border-emerald-200/60">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Aktif Sync
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-extrabold border border-amber-200/60">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              Maintenance
            </span>
          )}
        </div>

        {/* Business Title & Info */}
        <h3
          className={`text-xl font-bold mb-1 line-clamp-1 group-hover:text-[#00C897] transition-colors ${
            isActive ? "text-[#0A2540]" : "text-slate-500"
          }`}
        >
          {business.name}
        </h3>
        <p className="text-xs font-medium text-slate-500 mb-6 flex items-center gap-1.5">
          <span>{business.type}</span>
          <span className="text-slate-300">•</span>
          <span>{business.location}</span>
        </p>

        {/* Sales Mini Metrics */}
        {isActive ? (
          <div className="mt-auto bg-slate-50 rounded-2xl p-3.5 border border-slate-100 mb-6 grid grid-cols-2 gap-2">
            <div>
              <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">Penjualan Hari Ini</p>
              <p className="text-sm font-extrabold text-[#0A2540]">{business.todaySales}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">Transaksi</p>
              <div className="flex items-center justify-between">
                <p className="text-sm font-extrabold text-[#0A2540]">{business.todayTransactions}x</p>
                <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" /> {business.growth}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-auto bg-amber-50/50 rounded-2xl p-3.5 border border-amber-100 mb-6 text-center">
            <p className="text-xs font-semibold text-amber-800">
              Pembaruan Sistem Bermala
            </p>
            <p className="text-[11px] text-amber-600/80 mt-0.5">
              Transaksi sementara ditangguhkan
            </p>
          </div>
        )}
      </div>

      {/* Footer Action Button */}
      <div className="px-6 pb-6 pt-0 mt-auto">
        {isActive ? (
          <Link
            href={`/owner/menu/${business.id}`}
            className="w-full bg-[#0A2540] hover:bg-[#00C897] text-white hover:text-[#0A2540] text-sm font-bold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group/btn shadow-md shadow-slate-900/10"
          >
            Buka Kasir & POS
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <button
            disabled
            className="w-full bg-slate-100 border border-slate-200 text-slate-400 text-sm font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed"
          >
            Sistem Maintenance
          </button>
        )}
      </div>
    </div>
  );
}
