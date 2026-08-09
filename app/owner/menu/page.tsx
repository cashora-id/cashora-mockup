"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  CircleHelp,
  ExternalLink,
  Wrench,
  Plus,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Store,
  Utensils,
  Coffee,
  Search,
  ChevronRight,
  Sparkles,
  DollarSign,
  Users,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  PieChart,
  BarChart3,
  CreditCard,
  QrCode,
  Wallet,
  ShoppingBag,
  Receipt,
  Layers,
  ArrowUpRight,
  Filter
} from "lucide-react";

// --- Types & Interfaces ---
const ownerName = "Budi Santoso";

type PeriodType = "today" | "yesterday" | "7d" | "30d";
type MetricTabType = "sales" | "expenses";

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

interface ChartPoint {
  label: string;
  sales: number;
  salesFormatted: string;
  expenses: number;
  expensesFormatted: string;
  topOutlet: string;
}

interface PeriodData {
  periodLabel: string;
  salesTotal: string;
  salesGrowth: string;
  expensesTotal: string;
  expensesGrowth: string;
  netProfit: string;
  netMargin: string;
  totalTransactions: number;
  avgOrderValue: string;
  chartPoints: ChartPoint[];
  storeContributions: { name: string; amount: string; percent: number; color: string }[];
  paymentMethods: { method: string; amount: string; percent: number; icon: any }[];
  expenseCategories: { category: string; amount: string; percent: number; icon: any }[];
}

// --- Data Store ---
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

const dashboardData: Record<PeriodType, PeriodData> = {
  today: {
    periodLabel: "Hari Ini (9 Agustus 2026)",
    salesTotal: "Rp 11.060.000",
    salesGrowth: "+14.2%",
    expensesTotal: "Rp 3.420.000",
    expensesGrowth: "-4.8%",
    netProfit: "Rp 7.640.000",
    netMargin: "69.1%",
    totalTransactions: 431,
    avgOrderValue: "Rp 25.660",
    chartPoints: [
      { label: "08:00", sales: 850000, salesFormatted: "Rp 850rb", expenses: 320000, expensesFormatted: "Rp 320rb", topOutlet: "Budi Retail Mart" },
      { label: "10:00", sales: 1620000, salesFormatted: "Rp 1,62Jt", expenses: 450000, expensesFormatted: "Rp 450rb", topOutlet: "Budi Retail Mart" },
      { label: "12:00", sales: 2950000, salesFormatted: "Rp 2,95Jt", expenses: 980000, expensesFormatted: "Rp 980rb", topOutlet: "Warung Makan Pak Budi" },
      { label: "14:00", sales: 1840000, salesFormatted: "Rp 1,84Jt", expenses: 510000, expensesFormatted: "Rp 510rb", topOutlet: "Budi Retail Mart" },
      { label: "16:00", sales: 1420000, salesFormatted: "Rp 1,42Jt", expenses: 390000, expensesFormatted: "Rp 390rb", topOutlet: "Budi Retail Mart" },
      { label: "18:00", sales: 2380000, salesFormatted: "Rp 2,38Jt", expenses: 770000, expensesFormatted: "Rp 770rb", topOutlet: "Warung Makan Pak Budi" }
    ],
    storeContributions: [
      { name: "Budi Retail Mart", amount: "Rp 7.210.000", percent: 65.2, color: "#3B82F6" },
      { name: "Warung Makan Pak Budi", amount: "Rp 3.850.000", percent: 34.8, color: "#10B981" },
      { name: "Kopi Budi Sejahtera", amount: "Rp 0", percent: 0, color: "#F59E0B" }
    ],
    paymentMethods: [
      { method: "QRIS TUNTAS", amount: "Rp 6.850.000", percent: 62, icon: QrCode },
      { method: "Tunai / Cash", amount: "Rp 3.090.000", percent: 28, icon: Wallet },
      { method: "SoftPOS / Kartu", amount: "Rp 1.120.000", percent: 10, icon: CreditCard }
    ],
    expenseCategories: [
      { category: "Stok Bahan Baku", amount: "Rp 1.880.000", percent: 55, icon: ShoppingBag },
      { category: "Operasional & Sewa", amount: "Rp 750.000", percent: 22, icon: Store },
      { category: "Gaji & Komisi Staff", amount: "Rp 510.000", percent: 15, icon: Users },
      { category: "Listrik, Air & Wi-Fi", amount: "Rp 280.000", percent: 8, icon: Receipt }
    ]
  },
  yesterday: {
    periodLabel: "Kemarin (8 Agustus 2026)",
    salesTotal: "Rp 9.680.000",
    salesGrowth: "+6.1%",
    expensesTotal: "Rp 3.150.000",
    expensesGrowth: "+2.3%",
    netProfit: "Rp 6.530.000",
    netMargin: "67.4%",
    totalTransactions: 382,
    avgOrderValue: "Rp 25.340",
    chartPoints: [
      { label: "08:00", sales: 710000, salesFormatted: "Rp 710rb", expenses: 290000, expensesFormatted: "Rp 290rb", topOutlet: "Budi Retail Mart" },
      { label: "10:00", sales: 1450000, salesFormatted: "Rp 1,45Jt", expenses: 410000, expensesFormatted: "Rp 410rb", topOutlet: "Budi Retail Mart" },
      { label: "12:00", sales: 2610000, salesFormatted: "Rp 2,61Jt", expenses: 910000, expensesFormatted: "Rp 910rb", topOutlet: "Warung Makan Pak Budi" },
      { label: "14:00", sales: 1680000, salesFormatted: "Rp 1,68Jt", expenses: 480000, expensesFormatted: "Rp 480rb", topOutlet: "Budi Retail Mart" },
      { label: "16:00", sales: 1290000, salesFormatted: "Rp 1,29Jt", expenses: 360000, expensesFormatted: "Rp 360rb", topOutlet: "Budi Retail Mart" },
      { label: "18:00", sales: 1940000, salesFormatted: "Rp 1,94Jt", expenses: 700000, expensesFormatted: "Rp 700rb", topOutlet: "Warung Makan Pak Budi" }
    ],
    storeContributions: [
      { name: "Budi Retail Mart", amount: "Rp 6.130.000", percent: 63.3, color: "#3B82F6" },
      { name: "Warung Makan Pak Budi", amount: "Rp 3.550.000", percent: 36.7, color: "#10B981" },
      { name: "Kopi Budi Sejahtera", amount: "Rp 0", percent: 0, color: "#F59E0B" }
    ],
    paymentMethods: [
      { method: "QRIS TUNTAS", amount: "Rp 5.808.000", percent: 60, icon: QrCode },
      { method: "Tunai / Cash", amount: "Rp 2.904.000", percent: 30, icon: Wallet },
      { method: "SoftPOS / Kartu", amount: "Rp 968.000", percent: 10, icon: CreditCard }
    ],
    expenseCategories: [
      { category: "Stok Bahan Baku", amount: "Rp 1.638.000", percent: 52, icon: ShoppingBag },
      { category: "Operasional & Sewa", amount: "Rp 787.500", percent: 25, icon: Store },
      { category: "Gaji & Komisi Staff", amount: "Rp 472.500", percent: 15, icon: Users },
      { category: "Listrik, Air & Wi-Fi", amount: "Rp 252.000", percent: 8, icon: Receipt }
    ]
  },
  "7d": {
    periodLabel: "7 Hari Terakhir (3 - 9 Agustus 2026)",
    salesTotal: "Rp 74.240.000",
    salesGrowth: "+18.5%",
    expensesTotal: "Rp 22.840.000",
    expensesGrowth: "-1.2%",
    netProfit: "Rp 51.400.000",
    netMargin: "69.2%",
    totalTransactions: 2910,
    avgOrderValue: "Rp 25.510",
    chartPoints: [
      { label: "Senin 3", sales: 9200000, salesFormatted: "Rp 9,2Jt", expenses: 2800000, expensesFormatted: "Rp 2,8Jt", topOutlet: "Budi Retail Mart" },
      { label: "Selasa 4", sales: 10500000, salesFormatted: "Rp 10,5Jt", expenses: 3100000, expensesFormatted: "Rp 3,1Jt", topOutlet: "Budi Retail Mart" },
      { label: "Rabu 5", sales: 8700000, salesFormatted: "Rp 8,7Jt", expenses: 2900000, expensesFormatted: "Rp 2,9Jt", topOutlet: "Warung Makan Pak Budi" },
      { label: "Kamis 6", sales: 11800000, salesFormatted: "Rp 11,8Jt", expenses: 3500000, expensesFormatted: "Rp 3,5Jt", topOutlet: "Budi Retail Mart" },
      { label: "Jumat 7", sales: 12400000, salesFormatted: "Rp 12,4Jt", expenses: 3600000, expensesFormatted: "Rp 3,6Jt", topOutlet: "Budi Retail Mart" },
      { label: "Sabtu 8", sales: 10580000, salesFormatted: "Rp 10,5Jt", expenses: 3520000, expensesFormatted: "Rp 3,5Jt", topOutlet: "Warung Makan Pak Budi" },
      { label: "Minggu 9", sales: 11060000, salesFormatted: "Rp 11,0Jt", expenses: 3420000, expensesFormatted: "Rp 3,4Jt", topOutlet: "Budi Retail Mart" }
    ],
    storeContributions: [
      { name: "Budi Retail Mart", amount: "Rp 47.500.000", percent: 64.0, color: "#3B82F6" },
      { name: "Warung Makan Pak Budi", amount: "Rp 26.740.000", percent: 36.0, color: "#10B981" },
      { name: "Kopi Budi Sejahtera", amount: "Rp 0", percent: 0, color: "#F59E0B" }
    ],
    paymentMethods: [
      { method: "QRIS TUNTAS", amount: "Rp 48.256.000", percent: 65, icon: QrCode },
      { method: "Tunai / Cash", amount: "Rp 18.560.000", percent: 25, icon: Wallet },
      { method: "SoftPOS / Kartu", amount: "Rp 7.424.000", percent: 10, icon: CreditCard }
    ],
    expenseCategories: [
      { category: "Stok Bahan Baku", amount: "Rp 12.562.000", percent: 55, icon: ShoppingBag },
      { category: "Operasional & Sewa", amount: "Rp 4.568.000", percent: 20, icon: Store },
      { category: "Gaji & Komisi Staff", amount: "Rp 3.882.800", percent: 17, icon: Users },
      { category: "Listrik, Air & Wi-Fi", amount: "Rp 1.827.200", percent: 8, icon: Receipt }
    ]
  },
  "30d": {
    periodLabel: "30 Hari Terakhir (10 Juli - 9 Agustus 2026)",
    salesTotal: "Rp 318.500.000",
    salesGrowth: "+22.4%",
    expensesTotal: "Rp 98.400.000",
    expensesGrowth: "+4.1%",
    netProfit: "Rp 220.100.000",
    netMargin: "69.1%",
    totalTransactions: 12480,
    avgOrderValue: "Rp 25.520",
    chartPoints: [
      { label: "W1 (10-16 Jul)", sales: 72500000, salesFormatted: "Rp 72,5Jt", expenses: 22800000, expensesFormatted: "Rp 22,8Jt", topOutlet: "Budi Retail Mart" },
      { label: "W2 (17-23 Jul)", sales: 78100000, salesFormatted: "Rp 78,1Jt", expenses: 24100000, expensesFormatted: "Rp 24,1Jt", topOutlet: "Budi Retail Mart" },
      { label: "W3 (24-30 Jul)", sales: 81400000, salesFormatted: "Rp 81,4Jt", expenses: 25300000, expensesFormatted: "Rp 25,3Jt", topOutlet: "Budi Retail Mart" },
      { label: "W4 (31 Jul-9 Aug)", sales: 86500000, salesFormatted: "Rp 86,5Jt", expenses: 26200000, expensesFormatted: "Rp 26,2Jt", topOutlet: "Warung Makan Pak Budi" }
    ],
    storeContributions: [
      { name: "Budi Retail Mart", amount: "Rp 203.840.000", percent: 64.0, color: "#3B82F6" },
      { name: "Warung Makan Pak Budi", amount: "Rp 114.660.000", percent: 36.0, color: "#10B981" },
      { name: "Kopi Budi Sejahtera", amount: "Rp 0", percent: 0, color: "#F59E0B" }
    ],
    paymentMethods: [
      { method: "QRIS TUNTAS", amount: "Rp 203.840.000", percent: 64, icon: QrCode },
      { method: "Tunai / Cash", amount: "Rp 82.810.000", percent: 26, icon: Wallet },
      { method: "SoftPOS / Kartu", amount: "Rp 31.850.000", percent: 10, icon: CreditCard }
    ],
    expenseCategories: [
      { category: "Stok Bahan Baku", amount: "Rp 53.136.000", percent: 54, icon: ShoppingBag },
      { category: "Operasional & Sewa", amount: "Rp 20.664.000", percent: 21, icon: Store },
      { category: "Gaji & Komisi Staff", amount: "Rp 16.728.000", percent: 17, icon: Users },
      { category: "Listrik, Air & Wi-Fi", amount: "Rp 7.872.000", percent: 8, icon: Receipt }
    ]
  }
};

export default function OwnerMenuPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>("today");
  const [activeMetricTab, setActiveMetricTab] = useState<MetricTabType>("sales");
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

  // Business List States
  const [businessList] = useState<Business[]>(businesses);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStoreTab, setActiveStoreTab] = useState<"all" | "active" | "maintenance">("all");

  const activeData = dashboardData[selectedPeriod];

  const filteredBusinesses = businessList.filter((b) => {
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.location.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeStoreTab === "active") return matchesSearch && b.status === "active";
    if (activeStoreTab === "maintenance") return matchesSearch && b.status === "maintenance";
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
              Owner Dashboard
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

      {/* ========== HERO BANNER & PERIOD SELECTOR ========== */}
      <section className="bg-gradient-to-b from-[#0A2540] to-[#0d3154] text-white pt-8 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Glow */}
        <div
          className="absolute -top-24 right-0 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #00C897, transparent 70%)" }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#00C897] text-xs font-semibold border border-white/10 mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Dasbor Agregat Multi-Toko
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Ringkasan Kinerja Bisnis
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                {activeData.periodLabel}
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 flex flex-wrap gap-1">
              {[
                { id: "today", label: "Hari Ini" },
                { id: "yesterday", label: "Kemarin" },
                { id: "7d", label: "7 Hari Terakhir" },
                { id: "30d", label: "30 Hari Terakhir" },
              ].map((period) => (
                <button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id as PeriodType)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedPeriod === period.id
                      ? "bg-[#00C897] text-[#0A2540] shadow-md shadow-emerald-500/20 scale-105"
                      : "text-slate-200 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>

          {/* ========== KPI CARDS GRID ========== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Total Sales */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-300">Total Penjualan</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-[#00C897] flex items-center justify-center">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-black text-white tracking-tight">{activeData.salesTotal}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-xs font-extrabold text-[#00C897] flex items-center gap-0.5">
                    <TrendingUp className="w-3.5 h-3.5" /> {activeData.salesGrowth}
                  </span>
                  <span className="text-[11px] text-slate-400">vs periode lalu</span>
                </div>
              </div>
            </div>

            {/* Card 2: Total Expenses */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-300">Total Pengeluaran</span>
                <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                  <Receipt className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-black text-white tracking-tight">{activeData.expensesTotal}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-xs font-extrabold text-rose-400 flex items-center gap-0.5">
                    <TrendingDown className="w-3.5 h-3.5" /> {activeData.expensesGrowth}
                  </span>
                  <span className="text-[11px] text-slate-400">efisiensi biaya</span>
                </div>
              </div>
            </div>

            {/* Card 3: Net Profit */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-300">Laba Bersih</span>
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <PieChart className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-black text-white tracking-tight">{activeData.netProfit}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-400/20 text-blue-300">
                    Margin {activeData.netMargin}
                  </span>
                </div>
              </div>
            </div>

            {/* Card 4: Total Transactions */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-300">Volume Transaksi</span>
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-black text-white tracking-tight">{activeData.totalTransactions} Transaksi</p>
                <p className="text-xs text-slate-300 mt-1">
                  Rata-rata: <span className="font-bold text-white">{activeData.avgOrderValue}</span> / order
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== DYNAMIC VISUAL CHART & BREAKDOWN SECTION ========== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 pb-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 mb-10">
          {/* Chart Header & Toggles */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#0A2540] tracking-tight">
                Tren & Agregasi Grafik Global
              </h2>
              <p className="text-xs text-slate-500">
                Visualisasi kumulatif dari seluruh cabang usaha Cashora
              </p>
            </div>

            {/* Penjualan vs Pengeluaran Tabs */}
            <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl w-fit">
              <button
                onClick={() => setActiveMetricTab("sales")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                  activeMetricTab === "sales"
                    ? "bg-[#0A2540] text-[#00C897] shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 text-[#00C897]" />
                Penjualan
              </button>
              <button
                onClick={() => setActiveMetricTab("expenses")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                  activeMetricTab === "expenses"
                    ? "bg-[#0A2540] text-rose-400 shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
                Pengeluaran
              </button>
            </div>
          </div>

          {/* Dynamic SVG Area / Line Chart */}
          <div className="relative w-full h-64 sm:h-72 mb-8 bg-slate-50/70 rounded-2xl p-4 border border-slate-100">
            <InteractiveSvgChart
              points={activeData.chartPoints}
              activeTab={activeMetricTab}
              hoveredIndex={hoveredPointIndex}
              onHover={setHoveredPointIndex}
            />
          </div>

          {/* Contextual Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            {/* Left Breakdown: Store Contributions / Expense Categories */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-extrabold text-[#0A2540]">
                  {activeMetricTab === "sales" ? "Kontribusi Penjualan per Toko" : "Rincian Kategori Pengeluaran"}
                </h3>
                <span className="text-[11px] font-bold text-slate-400">Distribusi %</span>
              </div>

              <div className="space-y-3.5">
                {activeMetricTab === "sales"
                  ? activeData.storeContributions.map((store) => (
                      <div key={store.name}>
                        <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                          <span className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: store.color }} />
                            {store.name}
                          </span>
                          <span className="font-bold text-[#0A2540]">{store.amount} ({store.percent}%)</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${store.percent}%`, backgroundColor: store.color }}
                          />
                        </div>
                      </div>
                    ))
                  : activeData.expenseCategories.map((exp) => (
                      <div key={exp.category} className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200/60">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center">
                            <exp.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#0A2540]">{exp.category}</p>
                            <p className="text-[10px] text-slate-400">{exp.percent}% dari total beban</p>
                          </div>
                        </div>
                        <p className="text-xs font-extrabold text-slate-800">{exp.amount}</p>
                      </div>
                    ))}
              </div>
            </div>

            {/* Right Breakdown: Payment Methods / Financial Summary */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-extrabold text-[#0A2540]">
                  {activeMetricTab === "sales" ? "Kanal & Metode Pembayaran" : "Statistik Efisiensi Operasional"}
                </h3>
                <span className="text-[11px] font-bold text-slate-400">Total Sah</span>
              </div>

              {activeMetricTab === "sales" ? (
                <div className="space-y-3">
                  {activeData.paymentMethods.map((pay) => (
                    <div key={pay.method} className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200/60">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#0A2540] text-[#00C897] flex items-center justify-center">
                          <pay.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#0A2540]">{pay.method}</p>
                          <p className="text-[10px] font-semibold text-emerald-600">{pay.percent}% dari total transaksi</p>
                        </div>
                      </div>
                      <p className="text-xs font-extrabold text-[#0A2540]">{pay.amount}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-4 bg-white rounded-xl border border-slate-200/60 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#0A2540]">Rasio Beban Operasional</p>
                      <p className="text-[11px] text-slate-500">Beban / Total Penjualan</p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-extrabold rounded-full">
                      30.9% (Sangat Sehat)
                    </span>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-slate-200/60 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#0A2540]">Penghematan Multi-Cabang</p>
                      <p className="text-[11px] text-slate-500">Tanpa Biaya Tambahan Per Outlet</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-extrabold rounded-full">
                      Rp 4.500.000 / bln
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========== STORE SEARCH & BENTO GRID SECTION ========== */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#0A2540] tracking-tight">Daftar Toko & Outlet Anda</h2>
            <p className="text-xs text-slate-500">Pilih toko untuk mengelola setting & sistem kasir</p>
          </div>

          <div className="flex items-center gap-2">
            {/* Tabs */}
            <div className="flex items-center gap-1 bg-slate-200/60 p-1 rounded-xl">
              <button
                onClick={() => setActiveStoreTab("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeStoreTab === "all" ? "bg-white text-[#0A2540] shadow-sm" : "text-slate-600"
                }`}
              >
                Semua ({businessList.length})
              </button>
              <button
                onClick={() => setActiveStoreTab("active")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeStoreTab === "active" ? "bg-white text-emerald-700 shadow-sm" : "text-slate-600"
                }`}
              >
                Aktif ({businessList.filter((b) => b.status === "active").length})
              </button>
              <button
                onClick={() => setActiveStoreTab("maintenance")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeStoreTab === "maintenance" ? "bg-white text-amber-700 shadow-sm" : "text-slate-600"
                }`}
              >
                Maintenance ({businessList.filter((b) => b.status === "maintenance").length})
              </button>
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative mb-6">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama toko atau kota..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200/80 rounded-2xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00C897]/50 shadow-sm transition-all"
          />
        </div>

        {/* Business Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((biz) => (
            <BusinessCard key={biz.id} business={biz} getIcon={getCategoryIcon} />
          ))}

          {/* Add New Business Card */}
          <div className="group flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-dashed border-slate-300 hover:border-[#00C897] bg-white hover:bg-emerald-50/30 transition-all duration-300 min-h-[260px] text-center shadow-sm hover:shadow-md cursor-pointer">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#00C897] border border-emerald-100 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-[#00C897] group-hover:text-white transition-all duration-300 shadow-sm">
              <Plus className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-[#0A2540] mb-1">Daftarkan Toko Baru</h3>
            <p className="text-xs text-slate-500 max-w-xs mb-4">
              Miliki cabang atau konsep bisnis baru? Tambahkan ke portal owner.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#00C897] group-hover:underline">
              Tambah Profil Bisnis <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Support Banner */}
        <div className="mt-12 rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-sm relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4 max-w-2xl">
            <div className="w-12 h-12 rounded-2xl bg-[#0A2540] text-[#00C897] flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#0A2540] mb-1">
                Butuh bantuan mengoptimalkan laporan keuangan multi-toko?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Tim Support Spesialis Cashora siap mendampingi pengaturan integrasi laporan & kasir POS secara gratis.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full lg:w-auto">
            <Link
              href="/kontak"
              className="w-full lg:w-auto text-center px-5 py-3 rounded-xl bg-[#0A2540] text-white font-bold text-xs sm:text-sm hover:bg-slate-800 transition-colors"
            >
              Hubungi CS Support
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- Interactive SVG Chart Component ---
function InteractiveSvgChart({
  points,
  activeTab,
  hoveredIndex,
  onHover,
}: {
  points: ChartPoint[];
  activeTab: MetricTabType;
  hoveredIndex: number | null;
  onHover: (idx: number | null) => void;
}) {
  const isSales = activeTab === "sales";
  const strokeColor = isSales ? "#00C897" : "#F43F5E";
  const fillColor = isSales ? "rgba(0, 200, 151, 0.15)" : "rgba(244, 63, 94, 0.15)";

  const values = points.map((p) => (isSales ? p.sales : p.expenses));
  const maxVal = Math.max(...values, 1) * 1.15;
  const minVal = 0;

  const width = 700;
  const height = 200;
  const paddingX = 40;
  const paddingY = 30;

  // Calculate coordinates
  const coords = points.map((pt, idx) => {
    const x = paddingX + (idx / (points.length - 1 || 1)) * (width - 2 * paddingX);
    const val = isSales ? pt.sales : pt.expenses;
    const y = height - paddingY - ((val - minVal) / (maxVal - minVal)) * (height - 2 * paddingY);
    return { x, y, pt };
  });

  // Construct SVG Path String (Smooth Bezier Curve)
  let d = "";
  if (coords.length > 0) {
    d = `M ${coords[0].x} ${coords[0].y}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const curr = coords[i];
      const next = coords[i + 1];
      const cpX = (curr.x + next.x) / 2;
      d += ` C ${cpX} ${curr.y}, ${cpX} ${next.y}, ${next.x} ${next.y}`;
    }
  }

  // Area Path
  const areaD = coords.length > 0
    ? `${d} L ${coords[coords.length - 1].x} ${height - paddingY} L ${coords[0].x} ${height - paddingY} Z`
    : "";

  const activeHover = hoveredIndex !== null ? coords[hoveredIndex] : null;

  return (
    <div className="w-full h-full relative flex flex-col justify-between">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="chartGradientSales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00C897" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00C897" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="chartGradientExpenses" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal Grid lines */}
        {[0.2, 0.5, 0.8].map((ratio) => {
          const yPos = height - paddingY - ratio * (height - 2 * paddingY);
          return (
            <line
              key={ratio}
              x1={paddingX}
              y1={yPos}
              x2={width - paddingX}
              y2={yPos}
              stroke="#E2E8F0"
              strokeDasharray="4 4"
              strokeWidth="1"
            />
          );
        })}

        {/* Shaded Area Fill */}
        <path
          d={areaD}
          fill={isSales ? "url(#chartGradientSales)" : "url(#chartGradientExpenses)"}
          className="transition-all duration-500"
        />

        {/* Curve Path */}
        <path
          d={d}
          fill="none"
          stroke={strokeColor}
          strokeWidth="3.5"
          strokeLinecap="round"
          className="transition-all duration-500"
        />

        {/* Interactive Data Point Nodes */}
        {coords.map((c, idx) => (
          <g key={idx} className="cursor-pointer" onMouseEnter={() => onHover(idx)}>
            <circle
              cx={c.x}
              cy={c.y}
              r={hoveredIndex === idx ? "7" : "4.5"}
              fill={strokeColor}
              stroke="#FFFFFF"
              strokeWidth="2.5"
              className="transition-all duration-200"
            />
          </g>
        ))}

        {/* Hover Guideline */}
        {activeHover && (
          <line
            x1={activeHover.x}
            y1={paddingY}
            x2={activeHover.x}
            y2={height - paddingY}
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        )}
      </svg>

      {/* Hover Floating Tooltip */}
      {activeHover && (
        <div
          className="absolute z-30 bg-[#0A2540] text-white p-2.5 rounded-xl shadow-xl border border-slate-700 pointer-events-none transform -translate-x-1/2 -translate-y-full transition-all duration-150"
          style={{
            left: `${(activeHover.x / width) * 100}%`,
            top: `${(activeHover.y / height) * 100 - 10}%`,
          }}
        >
          <p className="text-[10px] text-slate-300 font-medium">{activeHover.pt.label}</p>
          <p className="text-xs font-black text-[#00C897]">
            {isSales ? activeHover.pt.salesFormatted : activeHover.pt.expensesFormatted}
          </p>
          <p className="text-[9px] text-slate-400 mt-0.5">Top: {activeHover.pt.topOutlet}</p>
        </div>
      )}

      {/* X-Axis Labels */}
      <div className="flex justify-between px-6 pt-2 text-[11px] font-bold text-slate-500">
        {points.map((pt, i) => (
          <span
            key={i}
            className={`cursor-pointer transition-colors ${
              hoveredIndex === i ? "text-[#0A2540] underline font-extrabold" : ""
            }`}
            onMouseEnter={() => onHover(i)}
            onMouseLeave={() => onHover(null)}
          >
            {pt.label}
          </span>
        ))}
      </div>
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
          <div className="w-12 h-12 p-3 rounded-2xl bg-slate-100 border border-slate-200/60 flex items-center justify-center group-hover:scale-105 transition-transform">
            {getIcon(business.category)}
          </div>

          {isActive ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold border border-emerald-200/60">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Aktif POS
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
          className={`text-lg font-bold mb-1 line-clamp-1 group-hover:text-[#00C897] transition-colors ${
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
              Sistem Dalam Pemeliharaan
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
            href={`/owner/menu`}
            className="w-full bg-[#0A2540] hover:bg-[#00C897] text-white hover:text-[#0A2540] text-sm font-bold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group/btn shadow-md shadow-slate-900/10"
          >
            Masuk Kasir POS
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
