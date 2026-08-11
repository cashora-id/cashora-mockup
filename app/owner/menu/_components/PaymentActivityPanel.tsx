"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Banknote,
  CheckCircle2,
  Clock3,
  CreditCard,
  ChevronDown,
  Info,
  Landmark,
  RotateCcw,
  X,
  XCircle,
} from "lucide-react";
import {
  PaymentActivity,
  PaymentMethod,
  PaymentStatus,
  formatRupiah,
  paymentMethodUi,
} from "../../_lib/mock-owner-data";
import { paymentActivityService } from "../../_lib/payment-service";

type MethodFilter = "all" | PaymentMethod;
type StatusFilter = "all" | PaymentStatus;

type StatusUi = {
  label: string;
  hint: string;
  className: string;
  icon: typeof CheckCircle2;
};

const quickStatuses: StatusFilter[] = ["all", "success", "pending", "failed", "refunded"];
const methodOptions: MethodFilter[] = ["all", "cash", "qris", "card", "bank_transfer"];
const pageSizeOptions = [10, 20, 30, 40, 50];

const statusUi: Record<PaymentStatus, StatusUi> = {
  success: {
    label: "Berhasil",
    hint: "Pembayaran berhasil diterima dan diselesaikan.",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: CheckCircle2,
  },
  pending: {
    label: "Menunggu",
    hint: "Konfirmasi dari payment gateway sedang diproses.",
    className: "border-amber-200 bg-amber-50 text-amber-700",
    icon: Clock3,
  },
  failed: {
    label: "Gagal",
    hint: "Pembayaran tidak selesai dan tidak dianggap diterima.",
    className: "border-rose-200 bg-rose-50 text-rose-700",
    icon: XCircle,
  },
  refunded: {
    label: "Dikembalikan",
    hint: "Dana dikembalikan atau transaksi dibatalkan.",
    className: "border-violet-200 bg-violet-50 text-violet-700",
    icon: RotateCcw,
  },
};

const methodIcons: Record<PaymentMethod, typeof CreditCard> = {
  cash: Banknote,
  qris: CreditCard,
  card: CreditCard,
  bank_transfer: Landmark,
};

const getStatusLabel = (status: StatusFilter) =>
  status === "all" ? "Semua status" : statusUi[status].label;
const getMethodLabel = (method: MethodFilter) => method === "all" ? "Semua metode" : paymentMethodUi[method].label;

export function PaymentActivityPanel() {
  const [activities, setActivities] = useState<PaymentActivity[]>([]);
  const [methodFilter, setMethodFilter] = useState<MethodFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selected, setSelected] = useState<PaymentActivity | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    paymentActivityService.list().then((payments) => {
      if (isMounted) setActivities(payments);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const displayed = useMemo(() => {
    const filtered = activities.filter((payment) => {
      const matchesMethod = methodFilter === "all" || payment.method === methodFilter;
      const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
      const matchesDateFrom = !dateFrom || payment.createdAtISO >= dateFrom;
      const matchesDateTo = !dateTo || payment.createdAtISO <= `${dateTo}T23:59:59`;
      return matchesMethod && matchesStatus && matchesDateFrom && matchesDateTo;
    });
    // Strict descending sort by timestamp (newest first).
    return [...filtered].sort((a, b) => b.createdAtISO.localeCompare(a.createdAtISO));
  }, [activities, methodFilter, statusFilter, dateFrom, dateTo]);

  const totalPages = Math.max(1, Math.ceil(displayed.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = useMemo(
    () => displayed.slice((safePage - 1) * pageSize, safePage * pageSize),
    [displayed, safePage, pageSize],
  );

  const hasActiveFilters = methodFilter !== "all" || statusFilter !== "all" || dateFrom !== "" || dateTo !== "";
  const count = (status: PaymentStatus) => displayed.filter((payment) => payment.status === status).length;

  const applyStatus = (nextStatus: StatusFilter) => {
    setStatusFilter((current) => current === nextStatus && nextStatus !== "all" ? "all" : nextStatus);
    setCurrentPage(1);
    const selectedMatches = nextStatus === "all" || selected?.status === nextStatus;
    if (selected && !selectedMatches) setSelected(null);
  };

  const applyMethod = (nextMethod: MethodFilter) => {
    setMethodFilter(nextMethod);
    setCurrentPage(1);
    if (selected && nextMethod !== "all" && selected.method !== nextMethod) setSelected(null);
  };

  const applyDateFrom = (value: string) => {
    setDateFrom(value);
    setCurrentPage(1);
    setSelected(null);
  };

  const applyDateTo = (value: string) => {
    setDateTo(value);
    setCurrentPage(1);
    setSelected(null);
  };

  const resetFilters = () => {
    setMethodFilter("all");
    setStatusFilter("all");
    setDateFrom("");
    setDateTo("");
    setCurrentPage(1);
    setSelected(null);
  };

  return (
    <section className="mt-10 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#00A87E]">Monitoring pembayaran</p>
          <h2 className="mt-1 text-xl font-extrabold text-[#0A2540]">Aktivitas Pembayaran & Pencairan</h2>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-500">Pantau transaksi dan pencairan dana dari seluruh outlet Anda.</p>
          <p className="mt-1 text-[11px] text-slate-400">Data ini adalah simulasi tampilan.</p>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:flex">
          <SummaryCard label="Berhasil" count={count("success")} active={statusFilter === "success"} onClick={() => applyStatus("success")} tone="emerald" />
          <SummaryCard label="Menunggu" count={count("pending")} active={statusFilter === "pending"} onClick={() => applyStatus("pending")} tone="amber" />
          <SummaryCard label="Gagal" count={count("failed")} active={statusFilter === "failed"} onClick={() => applyStatus("failed")} tone="rose" />
        </div>
      </div>

      <div className="mt-5 border-y border-slate-100 py-4" role="group" aria-labelledby="payment-filter-title">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
          <span id="payment-filter-title" className="shrink-0 text-xs font-extrabold text-[#0A2540]">Filter transaksi</span>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-2" aria-label="Filter status cepat">
              {quickStatuses.map((status) => <button key={status} type="button" aria-pressed={statusFilter === status} onClick={() => applyStatus(status)} className={`rounded-full px-3 py-1.5 text-[11px] font-extrabold transition-colors focus:outline-none focus:ring-2 focus:ring-[#00C897]/50 ${statusFilter === status ? "bg-[#0A2540] text-[#00C897] shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{getStatusLabel(status)}{status !== "all" && <span className="ml-1 opacity-70">{count(status)}</span>}</button>)}
            </div>

            <label className="relative inline-flex items-center">
              <span className="sr-only">Metode pembayaran</span>
              <select value={methodFilter} onChange={(event) => applyMethod(event.target.value as MethodFilter)} className="appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-8 text-[11px] font-extrabold text-slate-700 outline-none transition focus:border-[#00C897] focus:ring-2 focus:ring-[#00C897]/30">
                {methodOptions.map((method) => <option key={method} value={method}>{getMethodLabel(method)}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 h-3.5 w-3.5 text-slate-400" />
            </label>

            <div className="flex flex-wrap items-center gap-2" aria-label="Rentang tanggal">
              <label className="inline-flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-500">Dari</span>
                <input
                  type="date"
                  value={dateFrom}
                  max={dateTo || undefined}
                  onChange={(event) => applyDateFrom(event.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 outline-none transition focus:border-[#00C897] focus:ring-2 focus:ring-[#00C897]/30"
                />
              </label>
              <label className="inline-flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-500">Sampai</span>
                <input
                  type="date"
                  value={dateTo}
                  min={dateFrom || undefined}
                  onChange={(event) => applyDateTo(event.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 outline-none transition focus:border-[#00C897] focus:ring-2 focus:ring-[#00C897]/30"
                />
              </label>
            </div>

            {hasActiveFilters && <button type="button" onClick={resetFilters} className="rounded-xl px-3 py-2 text-[11px] font-extrabold text-slate-500 underline decoration-slate-300 underline-offset-4 transition hover:text-[#0A2540] focus:outline-none focus:ring-2 focus:ring-[#00C897]/50">Reset</button>}
          </div>
        </div>

        {hasActiveFilters && <div className="mt-3 flex flex-wrap items-center gap-2" aria-live="polite"><span className="text-[11px] font-semibold text-slate-400">Filter aktif:</span>{statusFilter !== "all" && <FilterChip label={getStatusLabel(statusFilter)} onRemove={() => applyStatus("all")} />}{methodFilter !== "all" && <FilterChip label={getMethodLabel(methodFilter)} onRemove={() => applyMethod("all")} />}{dateFrom !== "" && <FilterChip label={`Dari ${dateFrom}`} onRemove={() => applyDateFrom("")} />}{dateTo !== "" && <FilterChip label={`Sampai ${dateTo}`} onRemove={() => applyDateTo("")} />}</div>}
      </div>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
        <div className="max-h-[520px] overflow-y-auto scroll-smooth [scrollbar-width:thin] [scrollbar-color:#cbd5e1_transparent]">
          <table className="min-w-[900px] w-full text-left text-xs">
            <thead className="sticky top-0 z-10 bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500"><tr><th className="px-4 py-3">Waktu</th><th className="px-4 py-3">Outlet</th><th className="px-4 py-3">Metode</th><th className="px-4 py-3">Nominal</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Aksi</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {paginated.map((payment) => {
                const status = statusUi[payment.status];
                const method = paymentMethodUi[payment.method];
                const StatusIcon = status.icon;
                const MethodIcon = methodIcons[payment.method];
                return <tr key={payment.id} className="bg-white"><td className="px-4 py-4 text-slate-600"><p className="font-semibold text-[#0A2540]">{payment.createdAt}</p><p className="mt-0.5 text-[10px] text-slate-400">{payment.reference}</p></td><td className="px-4 py-4 font-semibold text-slate-700">{payment.outletName}</td><td className="px-4 py-4"><span className="inline-flex items-center gap-1.5 font-semibold text-slate-700"><MethodIcon className="h-3.5 w-3.5 text-[#00A87E]" />{method.label}</span><p className="mt-1 text-[10px] text-slate-400">{method.helper}</p></td><td className="px-4 py-4 font-extrabold text-[#0A2540]">{formatRupiah(payment.amount)}</td><td className="px-4 py-4"><span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-extrabold ${status.className}`}><StatusIcon className="h-3.5 w-3.5" />{status.label}</span><p className="mt-1 max-w-[185px] text-[10px] leading-relaxed text-slate-500">{status.hint}</p></td><td className="px-4 py-4"><button onClick={() => setSelected(payment)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-[11px] font-extrabold text-[#0A2540] hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#00C897]/50">Lihat detail</button></td></tr>;
              })}
              {paginated.length === 0 && <tr><td colSpan={6} className="px-4 py-12 text-center text-slate-500">Tidak ada transaksi yang sesuai dengan filter ini.</td></tr>}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 sm:flex-row">
          <label className="flex items-center gap-2 text-[11px] font-semibold text-slate-500">
            Tampilkan
            <select
              value={pageSize}
              onChange={(event) => { setPageSize(Number(event.target.value)); setCurrentPage(1); }}
              className="appearance-none rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-bold text-slate-700 outline-none transition focus:border-[#00C897] focus:ring-2 focus:ring-[#00C897]/30"
            >
              {pageSizeOptions.map((size) => <option key={size} value={size}>{size}</option>)}
            </select>
            per halaman
          </label>

          <div className="flex items-center gap-2">
            <button type="button" disabled={safePage === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-extrabold text-[#0A2540] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-[#00C897]/50">← Sebelumnya</button>
            <span className="text-[11px] font-bold text-slate-600">Halaman {safePage} dari {totalPages} ({displayed.length} transaksi)</span>
            <button type="button" disabled={safePage === totalPages} onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-extrabold text-[#0A2540] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-[#00C897]/50">Berikutnya →</button>
          </div>
        </div>
      </div>

      {selected && <PaymentDetail payment={selected} onClose={() => setSelected(null)} />}

      <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
        <button type="button" onClick={() => setIsGuideOpen((current) => !current)} aria-expanded={isGuideOpen} className="flex w-full items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-[#00C897]/50"><span className="flex items-center gap-1.5 text-xs font-extrabold text-blue-900"><Info className="h-4 w-4 text-blue-600" />Bagaimana membaca status?</span><ChevronDown className={`h-4 w-4 text-blue-500 transition-transform ${isGuideOpen ? "rotate-180" : ""}`} /></button>
        {isGuideOpen && <div className="mt-3 grid gap-2 text-[11px] leading-relaxed text-blue-800 sm:grid-cols-2"><p><b>Berhasil:</b> pembayaran berhasil diterima dan diselesaikan.</p><p><b>Menunggu:</b> pembayaran non-tunai sedang diproses, menunggu konfirmasi payment gateway.</p><p><b>Gagal:</b> pembayaran tidak selesai dan tidak dianggap diterima.</p><p><b>Dikembalikan:</b> dana dikembalikan atau transaksi dibatalkan.</p><p className="sm:col-span-2"><b>Catatan:</b> pembayaran tunai langsung berstatus Berhasil saat dicatat outlet. Pembayaran non-tunai (QRIS, kartu, transfer bank) menampilkan Menunggu selama diproses, lalu otomatis diperbarui menjadi Berhasil atau Gagal setelah konfirmasi dari payment gateway diterima.</p></div>}
      </div>
    </section>
  );
}

function SummaryCard({ label, count, active, onClick, tone }: { label: string; count: number; active: boolean; onClick: () => void; tone: "emerald" | "amber" | "rose" }) {
  const colors = { emerald: "border-emerald-200 bg-emerald-50 text-emerald-800", amber: "border-amber-200 bg-amber-50 text-amber-800", rose: "border-rose-200 bg-rose-50 text-rose-800" };
  return <button type="button" aria-pressed={active} onClick={onClick} className={`min-w-[92px] rounded-2xl border px-3 py-2 text-center transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#00C897]/50 ${colors[tone]} ${active ? "ring-2 ring-[#0A2540]/30" : ""}`}><span className="block text-[10px] font-bold leading-tight">{label}</span><span className="text-lg font-black">{count}</span></button>;
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return <button type="button" onClick={onRemove} className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00C897]/50">{label}<X className="h-3 w-3 text-slate-400" /></button>;
}

function PaymentDetail({ payment, onClose }: { payment: PaymentActivity; onClose: () => void }) {
  const status = statusUi[payment.status];
  const method = paymentMethodUi[payment.method];
  return <div className="mt-5 rounded-2xl border border-[#00C897]/25 bg-emerald-50/40 p-4"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-extrabold text-[#0A2540]">Detail transaksi {payment.reference}</p><p className="mt-1 text-xs leading-relaxed text-slate-600">{payment.statusExplanation}</p><dl className="mt-3 grid gap-2 text-[11px] text-slate-600 sm:grid-cols-2"><div><dt className="text-slate-400">Metode</dt><dd className="font-bold text-[#0A2540]">{method.label}</dd></div><div><dt className="text-slate-400">Provider/catatan</dt><dd className="font-bold text-[#0A2540]">{payment.providerLabel ?? "-"}</dd></div>{payment.settlementAt && <div><dt className="text-slate-400">Dana cair</dt><dd className="font-bold text-emerald-700">{payment.settlementAt}</dd></div>}<div><dt className="text-slate-400">Status</dt><dd className="font-bold text-[#0A2540]">{status.label}</dd></div></dl></div><button onClick={onClose} className="text-[11px] font-extrabold text-slate-500 hover:text-[#0A2540]">Tutup</button></div></div>;
}