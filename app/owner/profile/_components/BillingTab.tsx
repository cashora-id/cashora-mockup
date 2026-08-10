"use client";

import {
  ArrowUpRight,
  Building2,
  Check,
  CheckCircle2,
  CircleAlert,
  CreditCard,
  FileText,
  Headphones,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Users,
  WalletCards,
  Zap,
} from "lucide-react";

type UsageItemProps = {
  icon: typeof Building2;
  label: string;
  value: string;
  helper: string;
  percentage?: number;
  tone?: "default" | "warning";
};

const formatNumber = (value: number) => value.toLocaleString("id-ID");

function UsageItem({ icon: Icon, label, value, helper, percentage, tone = "default" }: UsageItemProps) {
  const barColor = tone === "warning" ? "bg-amber-500" : "bg-[#00C897]";

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-[#0A2540]">
            <Icon className="h-4 w-4" />
          </div>
          <p className="text-xs font-extrabold text-[#0A2540]">{label}</p>
        </div>
        {percentage !== undefined && (
          <span className={`text-[11px] font-black ${tone === "warning" ? "text-amber-700" : "text-[#00A87E]"}`}>
            {percentage}%
          </span>
        )}
      </div>
      <p className="mt-4 text-sm font-black text-[#0A2540]">{value}</p>
      <p className="mt-1 text-[11px] leading-relaxed text-slate-500">{helper}</p>
      {percentage !== undefined && (
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div className={`h-full rounded-full ${barColor}`} style={{ width: `${percentage}%` }} />
        </div>
      )}
    </div>
  );
}

const includedFeatures = [
  "POS restoran & retail tanpa batas transaksi",
  "Dashboard agregat multi-outlet",
  "Instant settlement QRIS TUNTAS",
  "Laporan operasional terjadwal",
  "Role manager outlet & kontrol akses",
  "Support spesialis 24/7",
];

const addOns = [
  { icon: ReceiptText, title: "Laporan WhatsApp Otomatis", description: "Ringkasan penjualan harian langsung ke WhatsApp owner.", price: "Rp49.000 / bulan" },
  { icon: WalletCards, title: "Integrasi Akuntansi", description: "Sinkronkan transaksi dengan sistem pembukuan bisnis Anda.", price: "Segera hadir" },
];

export function BillingTab() {
  const qrisUsed = 82450;
  const qrisTotal = 100000;
  const qrisPercentage = Math.round((qrisUsed / qrisTotal) * 100);

  return (
    <div className="space-y-7">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#00A87E]">Cashora untuk bisnis Anda</p>
          <h2 className="mt-1 text-xl font-extrabold tracking-tight text-[#0A2540]">Langganan & Penggunaan</h2>
          <p className="mt-1 text-sm text-slate-500">Pahami paket, kapasitas, dan layanan yang menopang operasional bisnis Anda.</p>
        </div>
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-extrabold text-emerald-700">
          <CheckCircle2 className="h-3.5 w-3.5" /> Langganan aktif
        </span>
      </div>

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0A2540] to-[#0d3154] p-6 text-white shadow-md sm:p-7">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full opacity-30" style={{ background: "radial-gradient(circle, #00C897, transparent 70%)" }} />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#00C897]/35 bg-[#00C897]/15 text-[#00C897]">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-300">PAKET AKTIF</p>
                <h3 className="text-lg font-extrabold">Cashora Multi-Outlet Enterprise</h3>
              </div>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300">Kontrol penuh untuk seluruh outlet, laporan agregat, dan dukungan operasional prioritas.</p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs">
              <span><span className="text-slate-400">Siklus tagihan</span> <b className="ml-1 text-white">Tahunan</b></span>
              <span><span className="text-slate-400">Perpanjangan</span> <b className="ml-1 text-white">1 Jan 2028</b></span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => alert("Perbandingan paket akan dibuka.")} className="rounded-xl bg-white px-4 py-2.5 text-xs font-extrabold text-[#0A2540] transition-colors hover:bg-slate-100">Kelola Paket</button>
            <button onClick={() => alert("Pilihan upgrade paket akan dibuka.")} className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-extrabold text-white transition-colors hover:bg-white/15">Lihat Upgrade <ArrowUpRight className="h-3.5 w-3.5" /></button>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between gap-4">
          <div><h3 className="text-sm font-extrabold text-[#0A2540]">Penggunaan bisnis</h3><p className="mt-0.5 text-xs text-slate-500">Kapasitas yang digunakan dalam paket Anda saat ini.</p></div>
          <span className="hidden text-xs font-bold text-slate-400 sm:block">Diperbarui hari ini</span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <UsageItem icon={Building2} label="Outlet" value="3 outlet aktif" helper="Paket Enterprise mendukung outlet tanpa batas." />
          <UsageItem icon={Users} label="Kasir & perangkat" value="8 perangkat aktif" helper="Batas hingga 50 kasir untuk setiap outlet." />
          <UsageItem icon={Zap} label="Transaksi QRIS" value={`${formatNumber(qrisUsed)} dari ${formatNumber(qrisTotal)}`} helper="Sisa sekitar 17.550 transaksi. Diperbarui 1 September 2026." percentage={qrisPercentage} tone="warning" />
          <UsageItem icon={ShieldCheck} label="Pengguna terkelola" value="12 pengguna" helper="Role owner, manager, dan kasir dapat dikelola dari satu tempat." />
        </div>
      </section>

      <section className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 sm:flex sm:items-center sm:justify-between sm:gap-5">
        <div className="flex gap-3"><CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" /><div><h3 className="text-sm font-extrabold text-amber-950">Kapasitas QRIS mulai perlu diperhatikan</h3><p className="mt-1 text-xs leading-relaxed text-amber-800">Penggunaan telah mencapai {qrisPercentage}%. Tinjau kebutuhan kapasitas sebelum periode berikutnya agar transaksi tetap lancar.</p></div></div>
        <button onClick={() => alert("Opsi kapasitas QRIS akan dibuka.")} className="mt-3 shrink-0 rounded-xl border border-amber-300 bg-white px-3.5 py-2 text-xs font-extrabold text-amber-800 transition-colors hover:bg-amber-100 sm:mt-0">Kelola kapasitas</button>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-[#00A87E]"><Check className="h-5 w-5" /></div><div><h3 className="text-sm font-extrabold text-[#0A2540]">Kapabilitas paket Anda</h3><p className="text-xs text-slate-500">Fitur yang siap digunakan oleh organisasi Anda.</p></div></div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">{includedFeatures.map((feature) => <div key={feature} className="flex items-start gap-2.5 text-xs font-semibold leading-relaxed text-slate-700"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00C897]" />{feature}</div>)}</div>
        </div>
        <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-5 sm:p-6"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-[#0A2540]"><CreditCard className="h-5 w-5" /></div><div><h3 className="text-sm font-extrabold text-[#0A2540]">Tagihan berikutnya</h3><p className="text-xs text-slate-500">1 Januari 2028</p></div></div><p className="mt-5 text-2xl font-black tracking-tight text-[#0A2540]">Rp12.000.000<span className="ml-1 text-xs font-bold text-slate-400">/ tahun</span></p><p className="mt-2 text-xs leading-relaxed text-slate-500">BCA Virtual Account •••• 8829<br />Auto-debit aktif</p><button onClick={() => alert("Pengaturan pembayaran akan dibuka.")} className="mt-5 w-full rounded-xl bg-white px-4 py-2.5 text-xs font-extrabold text-[#0A2540] shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-slate-100">Kelola pembayaran</button></div>
      </section>

      <section><div className="mb-3"><h3 className="text-sm font-extrabold text-[#0A2540]">Layanan tambahan</h3><p className="mt-0.5 text-xs text-slate-500">Tambahkan kemampuan tanpa perlu mengganti paket utama.</p></div><div className="grid gap-3 md:grid-cols-2">{addOns.map(({ icon: Icon, title, description, price }) => <div key={title} className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#0A2540]"><Icon className="h-5 w-5" /></div><div className="min-w-0 flex-1"><h4 className="text-xs font-extrabold text-[#0A2540]">{title}</h4><p className="mt-1 text-[11px] leading-relaxed text-slate-500">{description}</p><p className="mt-2 text-[11px] font-bold text-[#00A87E]">{price}</p></div><button onClick={() => alert(`${title} akan ditambahkan ke pilihan Anda.`)} className="rounded-xl bg-[#0A2540] px-3 py-2 text-[11px] font-extrabold text-[#00C897] transition-colors hover:bg-[#0d3154]">Lihat</button></div>)}</div></section>

      <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"><span className="inline-flex items-center gap-1.5"><Headphones className="h-4 w-4 text-[#00A87E]" />Butuh bantuan terkait paket atau tagihan?</span><button onClick={() => alert("Riwayat invoice akan dibuka.")} className="inline-flex items-center gap-1.5 font-extrabold text-[#0A2540] hover:text-[#00A87E]"><FileText className="h-4 w-4" />Lihat riwayat invoice</button></div>
    </div>
  );
}
