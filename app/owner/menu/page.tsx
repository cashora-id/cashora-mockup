"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  TrendingUp,
  TrendingDown,
  Search,
  ChevronRight,
  Sparkles,
  DollarSign,
  Activity,
  Receipt,
  PieChart,
  Filter,
  Eye,
  EyeOff
} from "lucide-react";
import { useCallback } from "react";
import { Business, MetricTabType, Notification, PeriodType, StoreRegistrationDraft } from "./types";
import { STORE_SERIES, businesses, dashboardData, initialNotifications } from "./data";
import { OwnerHeader } from "./_components/OwnerHeader";
import { NewStoreRegistrationModal } from "./_components/NewStoreRegistrationModal";
import { MultiLineSvgChart } from "./_components/MultiLineSvgChart";
import { BusinessCard } from "./_components/BusinessCard";
import { HelpDrawer } from "./_components/HelpDrawer";
import { DashboardTour } from "./_components/DashboardTour";
import { DeleteStoreModal } from "./_components/DeleteStoreModal";
import { EditStoreModal } from "./_components/EditStoreModal";
import { Toast, ToastData } from "./_components/Toast";

export default function OwnerMenuPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>("today");
  const [activeMetricTab, setActiveMetricTab] = useState<MetricTabType>("sales");
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

  // Line Visibility Toggles
  const [visibleLines, setVisibleLines] = useState<Record<string, boolean>>({
    total: true,
    budiRetail: true,
    warungPakBudi: true,
    kopiBudi: true,
  });

  // Business List States
  const [businessList, setBusinessList] = useState<Business[]>(businesses);
  const [searchQuery, setSearchQuery] = useState("");
  const [isStoreRegistrationOpen, setIsStoreRegistrationOpen] = useState(false);
  const [activeStoreTab, setActiveStoreTab] = useState<"all" | "active" | "maintenance">("all");

  // Notifications State
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  // Help Drawer & Interactive Tour States
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);

  // Store Management States
  const [deleteTarget, setDeleteTarget] = useState<Business | null>(null);
  const [editTarget, setEditTarget] = useState<Business | null>(null);
  const [toast, setToast] = useState<ToastData | null>(null);

  const activeData = dashboardData[selectedPeriod];

  const toggleLineVisibility = (key: string) => {
    setVisibleLines((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const showToast = useCallback((message: string, type: ToastData["type"]) => {
    setToast({ id: `toast-${Date.now()}`, message, type });
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToast((prev) => (prev?.id === id ? null : prev));
  }, []);

  const handleToggleStatus = useCallback((id: string) => {
    setBusinessList((prev) =>
      prev.map((biz) =>
        biz.id === id
          ? { ...biz, status: biz.status === "active" ? "maintenance" : "active" }
          : biz
      )
    );
    const target = businessList.find((b) => b.id === id);
    if (target) {
      const isNowMaintenance = target.status === "active";
      showToast(
        isNowMaintenance
          ? `${target.name} berhasil dijeda (maintenance).`
          : `${target.name} berhasil diaktifkan kembali.`,
        isNowMaintenance ? "warning" : "success"
      );
    }
  }, [businessList, showToast]);

  const handleDeleteRequest = useCallback((id: string) => {
    const target = businessList.find((b) => b.id === id) ?? null;
    setDeleteTarget(target);
  }, [businessList]);

  const handleEditRequest = useCallback((id: string) => {
    const target = businessList.find((b) => b.id === id) ?? null;
    // Strict guard: hanya boleh edit jika status maintenance
    if (target && target.status !== "maintenance") return;
    setEditTarget(target);
  }, [businessList]);

  const handleEditSave = useCallback((id: string, updates: { name: string; type: string; location: string; category: Business["category"] }) => {
    setBusinessList((prev) =>
      prev.map((biz) =>
        biz.id === id ? { ...biz, ...updates } : biz
      )
    );
    setEditTarget(null);
    showToast(`${updates.name} berhasil diperbarui.`, "success");
  }, [showToast]);

  const handleDeleteConfirm = useCallback((id: string) => {
    const target = businessList.find((b) => b.id === id);
    setBusinessList((prev) => prev.filter((biz) => biz.id !== id));
    setDeleteTarget(null);
    if (target) {
      showToast(`${target.name} telah dihapus.`, "danger");
    }
  }, [businessList, showToast]);

  const handleCreateBusiness = (draft: StoreRegistrationDraft) => {
    const newBusiness: Business = {
      id: `store-${Date.now()}`,
      name: draft.outletName.trim(),
      type: draft.businessType.trim(),
      location: `${draft.city.trim()} • ${draft.address.trim()}`,
      status: draft.initialStoreMode === "activate" ? "active" : "maintenance",
      category: draft.category as Business["category"],
      todaySales: "Rp 0",
      todayTransactions: 0,
      growth: "Baru",
    };
    setBusinessList((previous) => [...previous, newBusiness]);

    setActiveStoreTab("all");
    setSearchQuery("");
  };

  const filteredBusinesses = businessList.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.location.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeStoreTab === "active") return matchesSearch && b.status === "active";
    if (activeStoreTab === "maintenance") return matchesSearch && b.status === "maintenance";
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* ========== TOP NAVBAR ========== */}
      <OwnerHeader
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onClearAll={handleClearAll}
        onHelpToggle={() => setIsHelpOpen((prev) => !prev)}
      />

      {/* ========== HERO BANNER & PERIOD SELECTOR (TOUR TARGET 2) ========== */}
      <section id="tour-period-kpis" className="bg-gradient-to-b from-[#0A2540] to-[#0d3154] text-white pt-8 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-all">
        {/* Glow */}
        <div
          className="absolute -top-24 right-0 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #00C897, transparent 70%)" }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#00C897] text-xs font-semibold border border-white/10 mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Dasbor Agregat & Kurva Multi-Toko
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

      {/* ========== MULTI-LINE SVG CHART & BREAKDOWN SECTION (TOUR TARGET 3) ========== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 pb-20">
        <div id="tour-chart" className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 mb-10 transition-all">
          {/* Chart Header & Toggles */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#0A2540] tracking-tight">
                Perbandingan Grafik Kurva per Toko
              </h2>
              <p className="text-xs text-slate-500">
                Bandingkan tren {activeMetricTab === "sales" ? "penjualan" : "pengeluaran"} individual toko dengan garis total agregat
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

          {/* Clickable Legend Pills (Line Visibility Toggles) */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Toggle Garis:
            </span>

            {STORE_SERIES.map((s) => {
              const isVisible = visibleLines[s.key];
              return (
                <button
                  key={s.key}
                  onClick={() => toggleLineVisibility(s.key)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    isVisible
                      ? "bg-slate-50 border-slate-300 text-slate-800 shadow-sm"
                      : "bg-slate-100/60 border-slate-200 text-slate-400 opacity-60 line-through"
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: s.color }}
                  />
                  <span>{s.label}</span>
                  {isVisible ? (
                    <Eye className="w-3 h-3 text-slate-500" />
                  ) : (
                    <EyeOff className="w-3 h-3 text-slate-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Multi-Line SVG Chart */}
          <div className="relative w-full h-72 sm:h-80 mb-8 bg-slate-50/70 rounded-2xl p-2 sm:p-3 border border-slate-100">
            <MultiLineSvgChart
              points={activeData.chartPoints}
              activeTab={activeMetricTab}
              visibleLines={visibleLines}
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

        {/* ========== STORE SEARCH & BENTO GRID SECTION (TOUR TARGET 4) ========== */}
        <div id="tour-stores" className="transition-all">
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
              <BusinessCard
                key={biz.id}
                business={biz}
                onToggleStatus={handleToggleStatus}
                onDeleteRequest={handleDeleteRequest}
                onEditRequest={handleEditRequest}
              />
            ))}

            {/* Add New Business Card */}
            <button
              type="button"
              onClick={() => setIsStoreRegistrationOpen(true)}
              className="group flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:border-[#00C897] hover:bg-emerald-50/30 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#00C897]/50"
            >
              <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-[#00C897] shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-[#00C897] group-hover:text-white">
                <Plus className="h-7 w-7" />
              </span>
              <span className="mb-1 text-base font-bold text-[#0A2540]">Daftarkan Toko Baru</span>
              <span className="mb-4 max-w-xs text-xs text-slate-500">
                Miliki cabang atau konsep bisnis baru? Tambahkan ke portal owner.
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#00C897] group-hover:underline">
                Tambah Profil Bisnis <ChevronRight className="h-4 w-4" />
              </span>
            </button>
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

      {/* ========== HELP DRAWER SLIDE-OVER ========== */}
      <HelpDrawer
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        onStartTour={() => setIsTourActive(true)}
      />

      {/* ========== INTERACTIVE DASHBOARD TOUR OVERLAY ========== */}
      <DashboardTour
        isActive={isTourActive}
        onFinish={() => setIsTourActive(false)}
      />

      <NewStoreRegistrationModal
        isOpen={isStoreRegistrationOpen}
        existingBusinesses={businessList}
        onClose={() => setIsStoreRegistrationOpen(false)}
        onCreate={handleCreateBusiness}
      />

      {/* Delete Store Confirmation Modal */}
      <DeleteStoreModal
        target={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />

      {/* Edit Store Modal — hanya bisa dibuka saat status Maintenance */}
      <EditStoreModal
        target={editTarget}
        onCancel={() => setEditTarget(null)}
        onSave={handleEditSave}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onDismiss={dismissToast} />
    </div>
  );
}
