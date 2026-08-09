"use client";

import Link from "next/link";
import {
  Utensils,
  Coffee,
  Store,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  ArrowRight
} from "lucide-react";
import { Business } from "../types";

export function BusinessCard({
  business,
}: {
  business: Business;
}) {
  const isActive = business.status === "active";

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
            {getCategoryIcon(business.category)}
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
