"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, CircleAlert, LockKeyhole, Plus, Search, ShieldCheck, Store, UserCog, Users, X } from "lucide-react";
import { StaffMember, StaffRole, makeNewStaff, staffSeed } from "../_lib/mock-owner-data";
import { businesses } from "../menu/data";
import { useOwnerToast } from "../_components/OwnerToastProvider";

const roleLabel: Record<StaffRole, string> = { owner: "Owner Utama", manager: "Manager Outlet", cashier: "Kasir" };
const roleHelp: Record<StaffRole, string> = {
  owner: "Akses penuh atas seluruh bisnis, staff, dan pengaturan.",
  manager: "Mengelola operasional outlet yang ditugaskan tanpa akses kontrol owner.",
  cashier: "Akses terbatas untuk aktivitas transaksi pada outlet yang ditugaskan.",
};

export default function OwnerStaffPage() {
  const { showToast } = useOwnerToast();
  const [staff, setStaff] = useState<StaffMember[]>(staffSeed);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | StaffRole>("all");
  const [showInvite, setShowInvite] = useState(false);
  const [target, setTarget] = useState<StaffMember | null>(null);
  const [draft, setDraft] = useState({ name: "", phone: "", role: "cashier" as StaffRole, outletIds: [] as string[] });

  const filtered = useMemo(() => staff.filter((member) => (roleFilter === "all" || member.role === roleFilter) && (member.name.toLowerCase().includes(query.toLowerCase()) || member.phone.includes(query))), [staff, query, roleFilter]);

  const addInvite = () => {
    if (draft.name.trim().length < 3 || draft.phone.replace(/\D/g, "").length < 9 || draft.role !== "owner" && draft.outletIds.length === 0) {
      showToast("warning", "Lengkapi nama, nomor WhatsApp, peran, dan minimal satu outlet sebelum membuat undangan.", { title: "Data undangan belum lengkap" });
      return;
    }
    const newMember = makeNewStaff({ name: draft.name.trim(), phone: draft.phone.trim(), role: draft.role, outletIds: draft.role === "owner" ? businesses.map((business) => business.id) : draft.outletIds });
    setStaff((current) => [...current, newMember]);
    setShowInvite(false);
    setDraft({ name: "", phone: "", role: "cashier", outletIds: [] });
    showToast("success", `Undangan untuk ${newMember.name} berhasil dicatat.`, { title: "Undangan dibuat" });
  };

  const toggleStatus = (member: StaffMember) => {
    if (member.role === "owner") {
      showToast("danger", "Owner utama tidak dapat dinonaktifkan atau dihapus dari portal ini.", { title: "Aksi dibatasi" });
      return;
    }
    setStaff((current) => current.map((item) => item.id === member.id ? { ...item, status: item.status === "inactive" ? "active" : "inactive" } : item));
    showToast(member.status === "inactive" ? "success" : "warning", member.status === "inactive" ? `Akses ${member.name} berhasil diaktifkan kembali.` : `Akses ${member.name} berhasil dinonaktifkan.`);
  };

  const changeRole = (member: StaffMember, nextRole: StaffRole) => {
    if (member.role === "owner" || nextRole === "owner") {
      showToast("danger", "Peran Owner Utama tidak dapat diubah dari halaman manajemen staff.", { title: "Aksi dibatasi" });
      return;
    }
    setStaff((current) => current.map((item) => item.id === member.id ? { ...item, role: nextRole } : item));
    showToast("success", `Peran ${member.name} berhasil diubah menjadi ${roleLabel[nextRole]}.`);
    setTarget(null);
  };

  const outletsFor = (member: StaffMember) => member.outletIds.map((id) => businesses.find((business) => business.id === id)?.name).filter(Boolean).join(", ") || "Belum ada outlet";

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md"><div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"><Link href="/owner/menu" className="inline-flex items-center gap-2 rounded-xl px-2 py-2 text-xs font-extrabold text-slate-600 hover:bg-slate-100 hover:text-[#0A2540]"><ArrowLeft className="h-4 w-4" />Kembali ke Dasbor</Link><span className="hidden text-xs font-bold text-slate-400 sm:block">Manajemen akses owner</span></div></header>
      <section className="bg-gradient-to-br from-[#0A2540] to-[#0d3154] px-4 py-10 text-white sm:px-6 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 lg:flex-row lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#00C897]">Akses terkontrol</p><h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">Staff & Hak Akses</h1><p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">Kelola akses berdasarkan peran dan outlet. Perubahan sensitif dilindungi agar kontrol utama tetap berada di tangan owner.</p></div><button onClick={() => setShowInvite(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00C897] px-4 py-2.5 text-xs font-extrabold text-[#0A2540] hover:bg-[#6ae6c3]"><Plus className="h-4 w-4" />Undang Staff</button></div></section>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"><section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7"><div className="grid gap-4 lg:grid-cols-[1fr_auto]"><div className="relative"><Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari nama atau nomor WhatsApp..." className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-xs outline-none focus:border-[#00C897] focus:ring-2 focus:ring-[#00C897]/20" /></div><div className="flex gap-2 overflow-x-auto">{(["all", "owner", "manager", "cashier"] as const).map((role) => <button key={role} onClick={() => setRoleFilter(role)} className={`shrink-0 rounded-xl px-3 py-2.5 text-[11px] font-extrabold ${roleFilter === role ? "bg-[#0A2540] text-[#00C897]" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{role === "all" ? "Semua" : roleLabel[role]}</button>)}</div></div><div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200"><table className="min-w-[950px] w-full text-left text-xs"><thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500"><tr><th className="px-4 py-3">Anggota</th><th className="px-4 py-3">Peran</th><th className="px-4 py-3">Akses outlet</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Terakhir aktif</th><th className="px-4 py-3">Aksi</th></tr></thead><tbody className="divide-y divide-slate-100">{filtered.map((member) => <tr key={member.id}><td className="px-4 py-4"><p className="font-extrabold text-[#0A2540]">{member.name}</p><p className="mt-0.5 text-[10px] text-slate-400">{member.phone}</p></td><td className="px-4 py-4"><span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-extrabold ${member.role === "owner" ? "bg-[#0A2540] text-[#00C897]" : member.role === "manager" ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-700"}`}>{member.role === "owner" && <ShieldCheck className="h-3.5 w-3.5" />}{roleLabel[member.role]}</span></td><td className="max-w-[240px] px-4 py-4 text-slate-600">{outletsFor(member)}</td><td className="px-4 py-4"><span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-extrabold ${member.status === "active" ? "bg-emerald-50 text-emerald-700" : member.status === "invited" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600"}`}>{member.status === "active" ? <CheckCircle2 className="h-3.5 w-3.5" /> : <CircleAlert className="h-3.5 w-3.5" />}{member.status === "active" ? "Aktif" : member.status === "invited" ? "Undangan" : "Nonaktif"}</span></td><td className="px-4 py-4 text-slate-500">{member.lastActive}</td><td className="px-4 py-4"><div className="flex gap-2"><button onClick={() => setTarget(member)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-[11px] font-extrabold text-[#0A2540] hover:bg-slate-50">Kelola</button>{member.role !== "owner" && <button onClick={() => toggleStatus(member)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-[11px] font-extrabold text-slate-600 hover:bg-slate-50">{member.status === "inactive" ? "Aktifkan" : "Nonaktifkan"}</button>}</div></td></tr>)}</tbody></table></div></section></main>
      {showInvite && <InviteModal draft={draft} setDraft={setDraft} onClose={() => setShowInvite(false)} onSubmit={addInvite} />}
      {target && <RoleModal member={target} onClose={() => setTarget(null)} onChangeRole={changeRole} />}
    </div>
  );
}

function InviteModal({ draft, setDraft, onClose, onSubmit }: { draft: { name: string; phone: string; role: StaffRole; outletIds: string[] }; setDraft: React.Dispatch<React.SetStateAction<{ name: string; phone: string; role: StaffRole; outletIds: string[] }>>; onClose: () => void; onSubmit: () => void }) {
  const toggleOutlet = (id: string) => setDraft((current) => ({ ...current, outletIds: current.outletIds.includes(id) ? current.outletIds.filter((outletId) => outletId !== id) : [...current.outletIds, id] }));
  return <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4"><button onClick={onClose} aria-label="Tutup" className="absolute inset-0 cursor-default bg-slate-900/55 backdrop-blur-sm" /><section role="dialog" aria-modal="true" aria-labelledby="invite-title" className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8"><button onClick={onClose} aria-label="Tutup" className="absolute right-4 top-4 rounded-xl p-2 text-slate-400 hover:bg-slate-100"><X className="h-4 w-4" /></button><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-[#00A87E]"><UserCog className="h-5 w-5" /></div><h2 id="invite-title" className="mt-4 text-lg font-extrabold text-[#0A2540]">Undang staff baru</h2><p className="mt-1 text-xs leading-relaxed text-slate-500">Data undangan dicatat sebagai mock. Sistem tidak mengirim WhatsApp atau kredensial asli pada tahap ini.</p><div className="mt-6 space-y-4"><Input label="Nama lengkap" value={draft.name} onChange={(value) => setDraft({ ...draft, name: value })} /><Input label="Nomor WhatsApp" value={draft.phone} onChange={(value) => setDraft({ ...draft, phone: value })} placeholder="Contoh: +62 812-0000-0000" /><label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Peran</span><select value={draft.role} onChange={(event) => setDraft({ ...draft, role: event.target.value as StaffRole, outletIds: [] })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#00C897]"><option value="manager">Manager Outlet</option><option value="cashier">Kasir</option></select><p className="mt-1.5 text-[11px] text-slate-500">{roleHelp[draft.role]}</p></label><div><p className="mb-2 text-xs font-bold text-slate-600">Outlet yang dapat diakses</p><div className="grid gap-2 sm:grid-cols-2">{businesses.map((business) => <label key={business.id} className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 p-3 text-xs font-semibold text-slate-700"><input checked={draft.outletIds.includes(business.id)} onChange={() => toggleOutlet(business.id)} type="checkbox" className="accent-[#00C897]" />{business.name}</label>)}</div></div></div><div className="mt-6 flex justify-end gap-3"><button onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-extrabold text-slate-600">Batal</button><button onClick={onSubmit} className="rounded-xl bg-[#0A2540] px-4 py-2.5 text-xs font-extrabold text-[#00C897]">Buat Undangan</button></div></section></div>;
}

function RoleModal({ member, onClose, onChangeRole }: { member: StaffMember; onClose: () => void; onChangeRole: (member: StaffMember, role: StaffRole) => void }) { return <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4"><button onClick={onClose} aria-label="Tutup" className="absolute inset-0 cursor-default bg-slate-900/55 backdrop-blur-sm" /><section role="dialog" aria-modal="true" aria-labelledby="role-title" className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"><button onClick={onClose} className="absolute right-4 top-4 rounded-xl p-2 text-slate-400 hover:bg-slate-100" aria-label="Tutup"><X className="h-4 w-4" /></button><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"><Users className="h-5 w-5" /></div><h2 id="role-title" className="mt-4 text-lg font-extrabold text-[#0A2540]">Kelola akses {member.name}</h2>{member.role === "owner" ? <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-amber-800"><LockKeyhole className="mb-2 h-4 w-4" />Owner utama memiliki akses penuh dan tidak dapat diubah, dihapus, atau dinonaktifkan melalui halaman ini.</div> : <div className="mt-5 space-y-3">{(["manager", "cashier"] as StaffRole[]).map((role) => <button key={role} onClick={() => onChangeRole(member, role)} className={`w-full rounded-2xl border p-4 text-left ${member.role === role ? "border-[#00C897] bg-emerald-50/50" : "border-slate-200 hover:bg-slate-50"}`}><p className="text-xs font-extrabold text-[#0A2540]">{roleLabel[role]}</p><p className="mt-1 text-[11px] leading-relaxed text-slate-500">{roleHelp[role]}</p></button>)}</div>}<div className="mt-6 flex justify-end"><button onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-extrabold text-slate-600">Tutup</button></div></section></div>; }
function Input({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) { return <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">{label}</span><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#00C897] focus:ring-2 focus:ring-[#00C897]/20" /></label>; }
