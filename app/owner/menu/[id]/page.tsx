"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  Box,
  CheckCircle2,
  CircleAlert,
  Clock3,
  LockKeyhole,
  MapPin,
  PackageSearch,
  Search,
  Settings2,
  ShieldCheck,
  Store,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { businesses } from "../data";
import { InventoryItem, OutletSettings, categoryLabel, inventorySeed, outletSettingsSeed } from "../../_lib/mock-owner-data";
import { useOwnerToast } from "../../_components/OwnerToastProvider";

type DetailTab = "overview" | "inventory" | "settings";

const inventoryTone: Record<InventoryItem["level"], { label: string; shell: string; icon: typeof CheckCircle2 }> = {
  safe: { label: "Aman", shell: "border-emerald-200 bg-emerald-50 text-emerald-700", icon: CheckCircle2 },
  low: { label: "Menipis", shell: "border-amber-200 bg-amber-50 text-amber-700", icon: AlertTriangle },
  critical: { label: "Kritis", shell: "border-rose-200 bg-rose-50 text-rose-700", icon: CircleAlert },
};

export default function OutletDetailPage() {
  const params = useParams<{ id: string }>();
  const outlet = businesses.find((business) => business.id === params.id);
  const { showToast } = useOwnerToast();
  const [activeTab, setActiveTab] = useState<DetailTab>("overview");
  const [inventoryQuery, setInventoryQuery] = useState("");
  const [settings, setSettings] = useState<OutletSettings | null>(outlet ? outletSettingsSeed[outlet.id] : null);

  const items = useMemo(() => inventorySeed.filter((item) => item.outletId === outlet?.id && item.name.toLowerCase().includes(inventoryQuery.toLowerCase())), [inventoryQuery, outlet?.id]);
  const criticalCount = inventorySeed.filter((item) => item.outletId === outlet?.id && item.level === "critical").length;
  const lowCount = inventorySeed.filter((item) => item.outletId === outlet?.id && item.level === "low").length;
  const isEditable = outlet?.status === "maintenance";

  if (!outlet || !settings) {
    return (
      <main className="min-h-screen bg-[#F8FAFC] px-4 py-16">
        <div className="mx-auto max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <Store className="mx-auto h-11 w-11 text-slate-300" />
          <h1 className="mt-4 text-xl font-extrabold text-[#0A2540]">Toko tidak ditemukan</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">Toko yang Anda buka tidak tersedia pada data demo saat ini.</p>
          <Link href="/owner/menu" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0A2540] px-4 py-2.5 text-xs font-extrabold text-white"><ArrowLeft className="h-4 w-4" />Kembali ke Dasbor</Link>
        </div>
      </main>
    );
  }

  const openSettings = () => {
    if (!isEditable) {
      showToast("info", "Pengaturan toko hanya dapat diubah saat status toko Maintenance.", { title: "Pengaturan terkunci" });
      return;
    }
    setActiveTab("settings");
  };

  const saveSettings = () => {
    if (!isEditable) {
      showToast("warning", "Ubah status toko ke Maintenance terlebih dahulu sebelum menyimpan pengaturan.");
      return;
    }
    showToast("success", `Pengaturan ${settings.businessName} berhasil disimpan.`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/owner/menu" className="inline-flex items-center gap-2 rounded-xl px-2 py-2 text-xs font-extrabold text-slate-600 transition-colors hover:bg-slate-100 hover:text-[#0A2540]"><ArrowLeft className="h-4 w-4" />Kembali ke Dasbor</Link>
          <span className="hidden text-xs font-bold text-slate-400 sm:block">Detail outlet & monitoring</span>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A2540] to-[#0d3154] px-4 pb-16 pt-8 text-white sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-25" style={{ background: "radial-gradient(circle, #00C897, transparent 70%)" }} />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2"><span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-extrabold ${outlet.status === "active" ? "border-emerald-300/30 bg-emerald-400/15 text-[#63f0ca]" : "border-amber-300/30 bg-amber-400/15 text-amber-200"}`}>{outlet.status === "active" ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Wrench className="h-3.5 w-3.5" />}{outlet.status === "active" ? "POS Aktif" : "Maintenance"}</span><span className="text-xs text-slate-300">{categoryLabel(outlet.category)}</span></div>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{outlet.name}</h1>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-300"><MapPin className="h-4 w-4 text-[#00C897]" />{outlet.location}</p>
            </div>
            <button onClick={openSettings} aria-disabled={!isEditable} className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold transition-colors ${isEditable ? "bg-[#00C897] text-[#0A2540] hover:bg-[#68e6c1]" : "cursor-not-allowed border border-white/15 bg-white/10 text-slate-400"}`}>
              {isEditable ? <Settings2 className="h-4 w-4" /> : <LockKeyhole className="h-4 w-4" />}{isEditable ? "Pengaturan Toko" : "Pengaturan Terkunci"}
            </button>
          </div>
          {!isEditable && <p className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-slate-300"><LockKeyhole className="h-3.5 w-3.5 text-amber-300" />Untuk menjaga operasional tetap stabil, pengaturan hanya dapat diubah saat toko Maintenance.</p>}
        </div>
      </section>

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="-mt-7 rounded-3xl border border-slate-200/80 bg-white p-3 shadow-xl sm:p-4">
          <div className="flex gap-2 overflow-x-auto">
            {([ ["overview", "Ringkasan"], ["inventory", `Inventori${criticalCount ? ` (${criticalCount} kritis)` : ""}`], ["settings", "Pengaturan"] ] as const).map(([id, label]) => {
              const locked = id === "settings" && !isEditable;
              return <button key={id} onClick={() => id === "settings" ? openSettings() : setActiveTab(id)} className={`inline-flex shrink-0 items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-extrabold transition-all ${activeTab === id ? "bg-[#0A2540] text-[#00C897] shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"} ${locked ? "opacity-65" : ""}`}>{locked && <LockKeyhole className="h-3.5 w-3.5" />}{label}</button>;
            })}
          </div>
        </div>

        {activeTab === "overview" && (
          <div className="mt-7 space-y-6">
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[ ["Penjualan hari ini", outlet.todaySales, TrendingUp, "text-[#00A87E]"], ["Transaksi", `${outlet.todayTransactions} transaksi`, ReceiptIcon, "text-blue-600"], ["Pertumbuhan", outlet.growth, TrendingUp, "text-emerald-600"], ["Kondisi inventori", `${criticalCount} kritis • ${lowCount} menipis`, PackageSearch, criticalCount ? "text-rose-600" : "text-[#00A87E]"] ].map(([label, value, Icon, tone]) => {
                const CardIcon = Icon as typeof TrendingUp;
                return <div key={String(label)} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><p className="text-xs font-bold text-slate-500">{String(label)}</p><CardIcon className={`h-5 w-5 ${String(tone)}`} /></div><p className="mt-3 text-lg font-black tracking-tight text-[#0A2540]">{String(value)}</p></div>;
              })}
            </section>
            <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm"><div className="flex items-start justify-between gap-4"><div><h2 className="text-base font-extrabold text-[#0A2540]">Status operasional</h2><p className="mt-1 text-xs text-slate-500">Ringkasan kondisi outlet untuk pengambilan keputusan owner.</p></div><Clock3 className="h-5 w-5 text-slate-400" /></div><div className="mt-6 space-y-4"><div className="rounded-2xl border border-slate-100 bg-slate-50 p-4"><p className="text-xs font-extrabold text-[#0A2540]">POS & transaksi</p><p className="mt-1 text-xs leading-relaxed text-slate-500">{outlet.status === "active" ? "POS menerima transaksi normal. Pengaturan dilindungi selama operasional aktif." : "Toko sedang Maintenance. Pengaturan dapat diperbarui sebelum POS diaktifkan kembali."}</p></div><button onClick={() => setActiveTab("inventory")} className="flex w-full items-center justify-between rounded-2xl border border-rose-100 bg-rose-50/60 p-4 text-left transition-colors hover:bg-rose-50"><span><span className="block text-xs font-extrabold text-rose-900">{criticalCount} item inventori perlu perhatian</span><span className="mt-1 block text-[11px] text-rose-700">Buka inventori untuk melihat stok dan langkah tindak lanjut.</span></span><PackageSearch className="h-5 w-5 text-rose-600" /></button></div></div>
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm"><h2 className="text-base font-extrabold text-[#0A2540]">Informasi toko</h2><dl className="mt-5 space-y-4 text-sm"><div className="flex justify-between gap-4 border-b border-slate-100 pb-3"><dt className="text-slate-500">Jenis usaha</dt><dd className="text-right font-bold text-[#0A2540]">{outlet.type}</dd></div><div className="flex justify-between gap-4 border-b border-slate-100 pb-3"><dt className="text-slate-500">Lokasi</dt><dd className="text-right font-bold text-[#0A2540]">{outlet.location}</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-500">Zona waktu</dt><dd className="font-bold text-[#0A2540]">{settings.timezone}</dd></div></dl></div>
            </section>
          </div>
        )}

        {activeTab === "inventory" && (
          <section className="mt-7 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#00A87E]">Monitoring inventori</p><h2 className="mt-1 text-xl font-extrabold text-[#0A2540]">Stok {outlet.name}</h2><p className="mt-1 max-w-2xl text-sm text-slate-500">Prioritaskan item kritis lebih dahulu. Angka di bawah adalah data mock untuk desain operasional owner.</p></div><div className="relative w-full md:w-72"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={inventoryQuery} onChange={(event) => setInventoryQuery(event.target.value)} placeholder="Cari produk atau SKU..." className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-xs outline-none transition focus:border-[#00C897] focus:ring-2 focus:ring-[#00C897]/20" /></div></div><div className="mt-6 grid gap-3 sm:grid-cols-3"><InventorySummary label="Stok kritis" count={criticalCount} tone="rose" /><InventorySummary label="Stok menipis" count={lowCount} tone="amber" /><InventorySummary label="Total item terpantau" count={inventorySeed.filter((item) => item.outletId === outlet.id).length} tone="emerald" /></div><div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200"><table className="min-w-[720px] w-full text-left text-xs"><thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500"><tr><th className="px-4 py-3 font-bold">Produk</th><th className="px-4 py-3 font-bold">Kategori</th><th className="px-4 py-3 font-bold">Stok saat ini</th><th className="px-4 py-3 font-bold">Batas minimum</th><th className="px-4 py-3 font-bold">Status</th><th className="px-4 py-3 font-bold">Diperbarui</th></tr></thead><tbody className="divide-y divide-slate-100">{items.map((item) => { const tone = inventoryTone[item.level]; const StatusIcon = tone.icon; return <tr key={item.id} className="bg-white"><td className="px-4 py-4"><p className="font-extrabold text-[#0A2540]">{item.name}</p><p className="mt-0.5 text-[10px] text-slate-400">{item.sku}</p></td><td className="px-4 py-4 text-slate-600">{item.category}</td><td className="px-4 py-4 font-extrabold text-[#0A2540]">{item.quantity} {item.unit}</td><td className="px-4 py-4 text-slate-600">{item.minimumStock} {item.unit}</td><td className="px-4 py-4"><span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-extrabold ${tone.shell}`}><StatusIcon className="h-3.5 w-3.5" />{tone.label}</span></td><td className="px-4 py-4 text-slate-500">{item.updatedAt}</td></tr>; })}{items.length === 0 && <tr><td colSpan={6} className="px-4 py-12 text-center text-slate-500">Produk tidak ditemukan.</td></tr>}</tbody></table></div></section>
        )}

        {activeTab === "settings" && isEditable && (
          <section className="mt-7 max-w-3xl rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8"><div className="flex items-start gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-[#00A87E]"><Settings2 className="h-5 w-5" /></div><div><h2 className="text-lg font-extrabold text-[#0A2540]">Pengaturan toko</h2><p className="mt-1 text-xs leading-relaxed text-slate-500">Toko sedang Maintenance. Perubahan dapat disiapkan dengan aman sebelum operasional diaktifkan kembali.</p></div></div><div className="mt-7 grid gap-5 sm:grid-cols-2"><SettingsField label="Nama toko" value={settings.businessName} onChange={(value) => setSettings({ ...settings, businessName: value })} /><SettingsField label="Alamat" value={settings.address} onChange={(value) => setSettings({ ...settings, address: value })} /><SettingsField label="Jam operasional" value={settings.openingHours} onChange={(value) => setSettings({ ...settings, openingHours: value })} /><label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Zona waktu</span><select value={settings.timezone} onChange={(event) => setSettings({ ...settings, timezone: event.target.value as OutletSettings["timezone"] })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#00C897] focus:ring-2 focus:ring-[#00C897]/20"><option>WIB</option><option>WITA</option><option>WIT</option></select></label></div><div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-extrabold text-[#0A2540]">Pajak & service charge</p><div className="mt-4 grid gap-4 sm:grid-cols-2"><ToggleSetting label="Pajak" enabled={settings.taxEnabled} onToggle={() => setSettings({ ...settings, taxEnabled: !settings.taxEnabled })} /><ToggleSetting label="Service charge" enabled={settings.serviceChargeEnabled} onToggle={() => setSettings({ ...settings, serviceChargeEnabled: !settings.serviceChargeEnabled })} /></div></div><div className="mt-7 flex justify-end gap-3"><button onClick={() => setActiveTab("overview")} className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-extrabold text-slate-600 hover:bg-slate-50">Batal</button><button onClick={saveSettings} className="rounded-xl bg-[#0A2540] px-4 py-2.5 text-xs font-extrabold text-[#00C897] hover:bg-[#0d3154]">Simpan Pengaturan</button></div></section>
        )}
      </main>
    </div>
  );
}

function ReceiptIcon({ className }: { className?: string }) { return <Box className={className} />; }
function InventorySummary({ label, count, tone }: { label: string; count: number; tone: "rose" | "amber" | "emerald" }) { const colors = { rose: "border-rose-100 bg-rose-50 text-rose-700", amber: "border-amber-100 bg-amber-50 text-amber-700", emerald: "border-emerald-100 bg-emerald-50 text-emerald-700" }; return <div className={`rounded-2xl border p-4 ${colors[tone]}`}><p className="text-[11px] font-bold">{label}</p><p className="mt-1 text-2xl font-black">{count}</p></div>; }
function SettingsField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">{label}</span><input value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#00C897] focus:ring-2 focus:ring-[#00C897]/20" /></label>; }
function ToggleSetting({ label, enabled, onToggle }: { label: string; enabled: boolean; onToggle: () => void }) { return <button type="button" onClick={onToggle} className="flex items-center justify-between rounded-xl bg-white p-3 text-left text-xs font-bold text-slate-700 shadow-sm"><span>{label}</span><span className={`h-5 w-9 rounded-full p-0.5 transition-colors ${enabled ? "bg-[#00C897]" : "bg-slate-200"}`}><span className={`block h-4 w-4 rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-4" : "translate-x-0"}`} /></span></button>; }
