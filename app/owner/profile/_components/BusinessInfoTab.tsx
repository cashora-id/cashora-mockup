"use client";

import { Store, ShieldCheck, Sparkles, Building2, CheckCircle2 } from "lucide-react";
import { Business } from "../../menu/types";

interface BusinessInfoTabProps {
  businesses: Business[];
}

export function BusinessInfoTab({ businesses }: BusinessInfoTabProps) {
  return (
    <div className="space-y-6">
      {/* Enterprise Licensing Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0A2540] to-[#0d3154] text-white relative overflow-hidden shadow-md">
        <div
          className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #00C897, transparent 70%)" }}
        />

        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-[#00C897] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Lisensi Cashora Multi-Outlet</h3>
              <p className="text-xs text-slate-300">Paket Enterprise Terverifikasi</p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-[#00C897] text-[#0A2540] text-xs font-black shadow-sm">
            AKTIF
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 relative z-10 text-xs">
          <div>
            <p className="text-slate-400 font-medium">Batas Cabang</p>
            <p className="text-sm font-bold text-white mt-0.5">Tak Terbatas (Unlimited)</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Batas Kasir POS</p>
            <p className="text-sm font-bold text-white mt-0.5">Hingga 50 Kasir / Outlet</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Masa Berlaku Lisensi</p>
            <p className="text-sm font-bold text-[#00C897] mt-0.5">31 Desember 2027</p>
          </div>
        </div>
      </div>

      {/* Registered Outlets List */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Daftar Cabang Bisnis Terdaftar ({businesses.length})
        </h3>

        <div className="space-y-3">
          {businesses.map((biz) => (
            <div
              key={biz.id}
              className="p-4 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-between hover:border-[#00C897] transition-all shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200/60 flex items-center justify-center text-[#0A2540]">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-[#0A2540]">{biz.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">{biz.type} • {biz.location}</p>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${
                    biz.status === "active"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3" />
                  {biz.status === "active" ? "POS Aktif" : "Maintenance"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
