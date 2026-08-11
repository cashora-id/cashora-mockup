"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Utensils,
  Coffee,
  Store,
  Warehouse,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  MoreVertical,
  PauseCircle,
  PlayCircle,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { Business } from "../types";

interface BusinessCardProps {
  business: Business;
  onToggleStatus: (id: string) => void;
  onDeleteRequest: (id: string) => void;
}

export function BusinessCard({ business, onToggleStatus, onDeleteRequest }: BusinessCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isActive = business.status === "active";

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [menuOpen]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "restaurant": return <Utensils className="h-5 w-5 text-emerald-600" />;
      case "cafe": return <Coffee className="h-5 w-5 text-amber-600" />;
      case "building_materials":
      case "wholesale_distribution": return <Warehouse className="h-5 w-5 text-orange-600" />;
      case "automotive":
      case "services": return <Wrench className="h-5 w-5 text-violet-600" />;
      default: return <Store className="h-5 w-5 text-blue-600" />;
    }
  };

  const invoke = useCallback((callback: () => void) => {
    setMenuOpen(false);
    callback();
  }, []);

  return (
    <article className={`group relative flex h-full flex-col overflow-visible rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00C897] hover:shadow-xl ${!isActive ? "bg-slate-50/50" : ""}`}>
      <div aria-hidden className="pointer-events-none absolute inset-x-px top-px overflow-hidden rounded-t-[22px]">
        <div className={`h-1 w-full transition-[height,background-color] duration-300 group-hover:h-1.5 ${isActive ? "bg-gradient-to-r from-[#00C897] to-emerald-400" : "bg-slate-300 group-hover:bg-slate-400"}`} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-5 flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200/60 bg-slate-100 p-3 transition-transform group-hover:scale-105">
            {getCategoryIcon(business.category)}
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-extrabold ${isActive ? "border-emerald-200/60 bg-emerald-50 text-emerald-700" : "border-amber-200/60 bg-amber-50 text-amber-700"}`}>
              {isActive ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertTriangle className="h-3.5 w-3.5" />}
              {isActive ? "Aktif POS" : "Maintenance"}
            </span>
            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenuOpen((current) => !current)} aria-label={`Menu aksi untuk ${business.name}`} aria-haspopup="menu" aria-expanded={menuOpen} className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00C897]/50">
                <MoreVertical className="h-4 w-4" />
              </button>
              {menuOpen && (
                <div role="menu" className="absolute right-0 top-10 z-50 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white py-1.5 shadow-xl">
                  <button onClick={() => invoke(() => onToggleStatus(business.id))} className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50" role="menuitem">
                    {isActive ? <PauseCircle className="h-4 w-4 text-amber-500" /> : <PlayCircle className="h-4 w-4 text-emerald-500" />}
                    {isActive ? "Jeda Operasional" : "Aktifkan Kembali"}
                  </button>
                  <div className="my-1 border-t border-slate-100" />
                  <button
                    type="button"
                    onClick={() => { if (!isActive) invoke(() => onDeleteRequest(business.id)); }}
                    disabled={isActive}
                    aria-disabled={isActive}
                    title={isActive ? "Toko aktif tidak dapat dihapus. Jeda operasional terlebih dahulu." : undefined}
                    className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-xs font-semibold transition-colors ${isActive ? "cursor-not-allowed text-slate-300" : "text-rose-600 hover:bg-rose-50"}`}
                    role="menuitem"
                  >
                    <Trash2 className="h-4 w-4" />Hapus Toko
                  </button>
                  {isActive && (
                    <p className="px-4 pb-2 pt-1 text-[10px] font-medium leading-snug text-slate-400">
                      Toko yang sedang beroperasi tidak dapat dihapus. Jeda toko terlebih dahulu.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <h3 className={`mb-1 line-clamp-1 text-lg font-bold transition-colors group-hover:text-[#00C897] ${isActive ? "text-[#0A2540]" : "text-slate-500"}`}>{business.name}</h3>
        <p className="mb-6 flex items-center gap-1.5 text-xs font-medium text-slate-500"><span>{business.type}</span><span className="text-slate-300">•</span><span>{business.location}</span></p>

        {isActive ? (
          <div className="mt-auto mb-6 grid grid-cols-2 gap-2 rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
            <div><p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Penjualan Hari Ini</p><p className="text-sm font-extrabold text-[#0A2540]">{business.todaySales}</p></div>
            <div><p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Transaksi</p><div className="flex items-center justify-between"><p className="text-sm font-extrabold text-[#0A2540]">{business.todayTransactions}x</p><span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-600"><TrendingUp className="h-3 w-3" />{business.growth}</span></div></div>
          </div>
        ) : (
          <div className="mt-auto mb-6 rounded-2xl border border-amber-100 bg-amber-50/50 p-3.5 text-center"><p className="text-xs font-semibold text-amber-800">Sistem Dalam Pemeliharaan</p><p className="mt-0.5 text-[11px] text-amber-600/80">Pengaturan dapat diperbarui melalui detail toko.</p></div>
        )}
      </div>
      <div className="px-6 pb-6">
        <Link href={`/owner/menu/${business.id}`} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0A2540] px-4 py-3 text-sm font-bold text-white shadow-md shadow-slate-900/10 transition-all hover:bg-[#00C897] hover:text-[#0A2540]">
          Lihat Detail & Monitoring<ExternalLink className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
