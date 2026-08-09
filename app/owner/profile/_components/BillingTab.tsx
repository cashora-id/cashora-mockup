"use client";

import { Zap, CreditCard, Sparkles, ArrowUpRight, CheckCircle2, DollarSign } from "lucide-react";

export function BillingTab() {
  const quotaUsed = 82450;
  const quotaTotal = 100000;
  const quotaPercent = Math.round((quotaUsed / quotaTotal) * 100);

  return (
    <div className="space-y-6">
      {/* Current Plan Overview */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#0A2540]">Paket Langganan Saat Ini</h3>
              <p className="text-xs text-slate-500">Cashora Multi-Outlet Enterprise Plan</p>
            </div>
          </div>

          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-black rounded-full border border-emerald-200">
            Aktif (Tahunan)
          </span>
        </div>

        {/* Quota Progress Bar */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-600 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> Kuota Pemrosesan QRIS Bulanan
            </span>
            <span className="text-[#0A2540]">
              {quotaUsed.toLocaleString("id-ID")} / {quotaTotal.toLocaleString("id-ID")} Transaksi ({quotaPercent}%)
            </span>
          </div>

          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00C897] to-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${quotaPercent}%` }}
            />
          </div>

          <p className="text-[11px] text-slate-400">
            Kuota otomatis diperbarui setiap tanggal 1 bulan berjalan.
          </p>
        </div>

        {/* Features included */}
        <div className="pt-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Fasilitas Lisensi Anda Included:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Restoran & Retail POS Unlimited
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Integrasi Instant Settlement QRIS TUNTAS
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Dashboard Agregat Multi-Cabang
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Support CS Spesialis 24/7
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-slate-100 text-[#0A2540] border border-slate-200/60 flex items-center justify-center">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-[#0A2540]">Metode Pembayaran Tagihan</h3>
            <p className="text-xs text-slate-500">BCA Virtual Account •••• 8829 (Auto-Debit)</p>
          </div>
        </div>

        <button
          onClick={() => alert("Fitur ubah metode pembayaran dibuka.")}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
        >
          Ubah Metode
        </button>
      </div>
    </div>
  );
}
