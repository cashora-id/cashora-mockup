"use client";

import { CheckCircle2, UserPlus, UserRoundX } from "lucide-react";
import { useOwnerData } from "../../_components/OwnerDataProvider";

export function OutletStaffAccessPanel({ outletId, outletName }: { outletId: string; outletName: string }) {
  const { staff, assignStaffToOutlet, unassignStaffFromOutlet, setStaffStatus } = useOwnerData();
  const availableStaff = staff.filter((member) => member.role !== "owner");

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-start gap-3">
        <UserPlus className="mt-0.5 h-4 w-4 shrink-0 text-[#00A87E]" />
        <div><h3 className="text-xs font-extrabold text-[#0A2540]">Assign staff ke outlet</h3><p className="mt-1 text-[11px] leading-relaxed text-slate-500">Pilih staff yang sudah terdaftar secara terpusat untuk memberikan akses ke {outletName}. Penambahan staff baru dilakukan dari menu profil Owner.</p></div>
      </div>
      <div className="mt-4 space-y-2">
        {availableStaff.map((member) => {
          const assigned = member.outletIds.includes(outletId);
          const isActive = member.status === "active";
          return <div key={member.id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><p className="truncate text-xs font-extrabold text-[#0A2540]">{member.name}</p><p className="mt-0.5 text-[10px] text-slate-500">{member.employeeCode ?? "Tanpa kode"} • {member.role === "manager" ? "Manager Outlet" : "Kasir"} • {member.status === "inactive" ? "Nonaktif" : member.status === "invited" ? "Tersedia" : "Aktif"}</p></div><div className="flex shrink-0 items-center gap-2"><button type="button" onClick={() => assigned ? unassignStaffFromOutlet(member.id, outletId) : assignStaffToOutlet(member.id, outletId)} className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-extrabold ${assigned ? "border-slate-200 text-slate-600 hover:bg-slate-100" : "border-[#00C897] bg-emerald-50 text-emerald-700 hover:bg-emerald-100"}`}>{assigned ? <UserRoundX className="h-3.5 w-3.5" /> : <UserPlus className="h-3.5 w-3.5" />}{assigned ? "Lepas" : "Assign"}</button>{assigned && <button type="button" onClick={() => setStaffStatus(member.id, isActive ? "inactive" : "active")} className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-extrabold ${isActive ? "border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100" : "bg-[#0A2540] text-[#00C897] hover:bg-[#0d3154]"}`}><CheckCircle2 className="h-3.5 w-3.5" />{isActive ? "Nonaktifkan" : "Aktifkan"}</button>}</div></div>;
        })}
        {availableStaff.length === 0 && <p className="rounded-xl border border-dashed border-slate-300 p-4 text-center text-[11px] text-slate-500">Belum ada staff non-owner. Tambahkan staff melalui menu profil Owner.</p>}
      </div>
    </div>
  );
}
