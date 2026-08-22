"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Store,
  UserRound,
  X,
} from "lucide-react";
import { Business } from "../types";
import {
  EmploymentType,
  StaffRegistrationInput,
  StaffRole,
} from "../../_lib/mock-owner-data";

interface StaffRegistrationModalProps {
  isOpen: boolean;
  businesses: Business[];
  onClose: () => void;
  onCreate: (input: StaffRegistrationInput) => void;
}

type RegistrationStep = 1 | 2 | 3;
type FieldErrors = Partial<Record<keyof StaffDraft, string>>;

type StaffDraft = {
  name: string;
  employeeCode: string;
  email: string;
  phone: string;
  address: string;
  role: Exclude<StaffRole, "owner">;
  employmentType: EmploymentType;
  startDate: string;
  outletIds: string[];
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  notes: string;
  workIdentityChecked: boolean;
  agreementConfirmed: boolean;
  accessBriefingCompleted: boolean;
};

const initialDraft: StaffDraft = {
  name: "",
  employeeCode: "",
  email: "",
  phone: "",
  address: "",
  role: "cashier",
  employmentType: "permanent",
  startDate: "",
  outletIds: [],
  emergencyContactName: "",
  emergencyContactPhone: "",
  emergencyContactRelation: "",
  notes: "",
  workIdentityChecked: false,
  agreementConfirmed: false,
  accessBriefingCompleted: false,
};

const steps = [
  { id: 1 as const, label: "Profil", icon: UserRound },
  { id: 2 as const, label: "Penempatan", icon: BriefcaseBusiness },
  { id: 3 as const, label: "Review & Verifikasi", icon: ShieldCheck },
];

const roleLabels: Record<StaffDraft["role"], string> = {
  manager: "Manager Outlet",
  cashier: "Kasir",
};

const employmentLabels: Record<EmploymentType, string> = {
  permanent: "Tetap",
  contract: "Kontrak",
  part_time: "Paruh waktu",
  intern: "Magang",
};

export function StaffRegistrationModal({ isOpen, businesses, onClose, onCreate }: StaffRegistrationModalProps) {
  const [step, setStep] = useState<RegistrationStep>(1);
  const [draft, setDraft] = useState<StaffDraft>(initialDraft);
  const [errors, setErrors] = useState<FieldErrors>({});
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    setStep(1);
    setDraft(initialDraft);
    setErrors({});
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => firstInputRef.current?.focus(), 80);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  const update = <K extends keyof StaffDraft>(key: K, value: StaffDraft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validateStep = (currentStep: RegistrationStep): FieldErrors => {
    const nextErrors: FieldErrors = {};
    if (currentStep === 1) {
      if (draft.name.trim().length < 3) nextErrors.name = "Masukkan nama lengkap minimal 3 karakter.";
      if (draft.employeeCode.trim().length < 3) nextErrors.employeeCode = "Masukkan kode karyawan.";
      if (!/^\S+@\S+\.\S+$/.test(draft.email.trim())) nextErrors.email = "Masukkan email yang valid.";
      if (draft.phone.replace(/\D/g, "").length < 9) nextErrors.phone = "Masukkan nomor WhatsApp yang valid.";
      if (draft.address.trim().length < 8) nextErrors.address = "Masukkan alamat domisili atau alamat kontak kerja.";
    }
    if (currentStep === 2) {
      if (!draft.startDate) nextErrors.startDate = "Pilih tanggal mulai bekerja.";
      if (draft.outletIds.length === 0) nextErrors.outletIds = "Pilih minimal satu outlet.";
      if (draft.emergencyContactName.trim().length < 3) nextErrors.emergencyContactName = "Masukkan nama kontak darurat.";
      if (draft.emergencyContactPhone.replace(/\D/g, "").length < 9) nextErrors.emergencyContactPhone = "Masukkan nomor kontak darurat yang valid.";
      if (draft.emergencyContactRelation.trim().length < 2) nextErrors.emergencyContactRelation = "Masukkan hubungan kontak darurat.";
    }
    if (currentStep === 3) {
      if (!draft.workIdentityChecked) nextErrors.workIdentityChecked = "Konfirmasi pemeriksaan identitas kerja.";
      if (!draft.agreementConfirmed) nextErrors.agreementConfirmed = "Konfirmasi persetujuan kerja.";
      if (!draft.accessBriefingCompleted) nextErrors.accessBriefingCompleted = "Konfirmasi briefing akses POS.";
    }
    return nextErrors;
  };

  const goNext = () => {
    const nextErrors = validateStep(step);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setStep((current) => (current < 3 ? (current + 1) as RegistrationStep : current));
  };

  const goBack = () => {
    setErrors({});
    setStep((current) => (current > 1 ? (current - 1) as RegistrationStep : current));
  };

  const submit = () => {
    const nextErrors = validateStep(3);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    const input: StaffRegistrationInput = {
      name: draft.name.trim(),
      employeeCode: draft.employeeCode.trim(),
      email: draft.email.trim(),
      phone: draft.phone.trim(),
      address: draft.address.trim(),
      role: draft.role,
      employmentType: draft.employmentType,
      startDate: draft.startDate,
      outletIds: draft.outletIds,
      emergencyContactName: draft.emergencyContactName.trim(),
      emergencyContactPhone: draft.emergencyContactPhone.trim(),
      emergencyContactRelation: draft.emergencyContactRelation.trim(),
      notes: draft.notes.trim(),
      verification: {
        workIdentityChecked: draft.workIdentityChecked,
        agreementConfirmed: draft.agreementConfirmed,
        accessBriefingCompleted: draft.accessBriefingCompleted,
      },
    };
    onCreate(input);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.button type="button" aria-label="Tutup registrasi staff" onClick={onClose} className="absolute inset-0 cursor-default bg-slate-950/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.section role="dialog" aria-modal="true" aria-labelledby="staff-registration-title" className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl" initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }}>
            <header className="flex items-start justify-between gap-4 border-b border-slate-200 bg-[#0A2540] p-5 text-white sm:p-6">
              <div><div className="flex items-center gap-2 text-[#00C897]"><UserRound className="h-5 w-5" /><span className="text-[11px] font-extrabold uppercase tracking-[0.16em]">Staff Registry</span></div><h2 id="staff-registration-title" className="mt-2 text-xl font-extrabold">Tambah Staff Baru</h2><p className="mt-1 max-w-xl text-xs leading-relaxed text-slate-300">Buat profil staff terpusat. Profil baru akan tersimpan sebagai Nonaktif sampai owner menugaskan dan mengaktifkan akses outlet.</p></div>
              <button type="button" onClick={onClose} aria-label="Tutup" className="rounded-xl p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"><X className="h-5 w-5" /></button>
            </header>

            <div className="border-b border-slate-200 bg-slate-50 px-5 py-3 sm:px-6"><div className="grid grid-cols-3 gap-2">{steps.map(({ id, label, icon: Icon }) => <div key={id} className={`flex items-center gap-2 rounded-xl px-2 py-2 ${step === id ? "bg-white text-[#0A2540] shadow-sm" : id < step ? "text-emerald-700" : "text-slate-400"}`}><span className={`flex h-7 w-7 items-center justify-center rounded-lg text-[11px] font-black ${step === id ? "bg-[#00C897] text-[#0A2540]" : id < step ? "bg-emerald-100" : "bg-slate-200"}`}><Icon className="h-3.5 w-3.5" /></span><span className="hidden text-[11px] font-extrabold sm:inline">{label}</span></div>)}</div></div>

            <div className="flex-1 overflow-y-auto p-5 sm:p-6">
              <div className="mb-5 flex items-start gap-2 rounded-2xl border border-blue-100 bg-blue-50/70 p-3 text-[11px] leading-relaxed text-blue-800"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" /><span>Untuk privasi dan keamanan, form ini tidak meminta NIK/KTP, password, OTP, data rekening, biometrik, atau riwayat pidana. Checklist verifikasi adalah catatan kontrol internal owner, bukan jaminan pencegahan kriminal.</span></div>

              {step === 1 && <div className="space-y-4"><SectionTitle title="Identitas & kontak kerja" description="Gunakan data yang dapat diverifikasi oleh owner atau HR internal." /><div className="grid gap-4 sm:grid-cols-2"><Field ref={firstInputRef} label="Nama lengkap" required value={draft.name} onChange={(value) => update("name", value)} error={errors.name} placeholder="Contoh: Sari Wijaya" /><Field label="Kode karyawan" required value={draft.employeeCode} onChange={(value) => update("employeeCode", value)} error={errors.employeeCode} placeholder="Contoh: KSR-001" /><Field label="Email kerja" required type="email" value={draft.email} onChange={(value) => update("email", value)} error={errors.email} placeholder="nama@bisnis.id" /><Field label="Nomor WhatsApp" required value={draft.phone} onChange={(value) => update("phone", value)} error={errors.phone} placeholder="08xx atau +62" /><div className="sm:col-span-2"><Field label="Alamat domisili / kontak kerja" required value={draft.address} onChange={(value) => update("address", value)} error={errors.address} placeholder="Alamat yang dapat digunakan untuk kebutuhan administratif" /></div></div></div>}

              {step === 2 && <div className="space-y-5"><SectionTitle title="Penempatan & kontak darurat" description="Tentukan peran awal dan outlet yang dapat dikelola staff." /><div className="grid gap-4 sm:grid-cols-2"><SelectField label="Peran awal" value={draft.role} onChange={(value) => update("role", value as StaffDraft["role"])} options={Object.entries(roleLabels).map(([value, label]) => ({ value, label }))} /><SelectField label="Jenis hubungan kerja" value={draft.employmentType} onChange={(value) => update("employmentType", value as EmploymentType)} options={Object.entries(employmentLabels).map(([value, label]) => ({ value, label }))} /><Field label="Tanggal mulai bekerja" required type="date" value={draft.startDate} onChange={(value) => update("startDate", value)} error={errors.startDate} /><div className="sm:col-span-2"><p className="mb-2 text-xs font-extrabold text-slate-700">Outlet awal yang ditugaskan <span className="text-rose-500">*</span></p><div className="grid gap-2 sm:grid-cols-2">{businesses.map((business) => { const selected = draft.outletIds.includes(business.id); return <label key={business.id} className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3 transition-colors ${selected ? "border-[#00C897] bg-emerald-50/60" : "border-slate-200 bg-white hover:border-slate-300"}`}><input type="checkbox" checked={selected} onChange={() => update("outletIds", selected ? draft.outletIds.filter((id) => id !== business.id) : [...draft.outletIds, business.id])} className="mt-0.5 h-4 w-4 accent-[#00C897]" /><span><span className="block text-xs font-extrabold text-[#0A2540]">{business.name}</span><span className="mt-0.5 block text-[10px] text-slate-500">{business.location}</span></span></label>; })}</div>{errors.outletIds && <ErrorText>{errors.outletIds}</ErrorText>}</div></div><div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-extrabold text-[#0A2540]">Kontak darurat</p><p className="mt-1 text-[11px] text-slate-500">Gunakan kontak yang disetujui staff untuk kebutuhan keadaan darurat kerja.</p><div className="mt-4 grid gap-4 sm:grid-cols-3"><Field label="Nama" required value={draft.emergencyContactName} onChange={(value) => update("emergencyContactName", value)} error={errors.emergencyContactName} placeholder="Nama kontak" /><Field label="Nomor telepon" required value={draft.emergencyContactPhone} onChange={(value) => update("emergencyContactPhone", value)} error={errors.emergencyContactPhone} placeholder="08xx atau +62" /><Field label="Hubungan" required value={draft.emergencyContactRelation} onChange={(value) => update("emergencyContactRelation", value)} error={errors.emergencyContactRelation} placeholder="Keluarga" /></div></div></div>}

              {step === 3 && <div className="space-y-5"><SectionTitle title="Review & verifikasi owner" description="Periksa ringkasan data sebelum profil staff dibuat." /><div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs sm:grid-cols-2"><Summary label="Nama" value={draft.name} /><Summary label="Kode" value={draft.employeeCode} /><Summary label="Peran" value={roleLabels[draft.role]} /><Summary label="Status awal" value="Nonaktif" /><Summary label="Outlet" value={draft.outletIds.map((id) => businesses.find((business) => business.id === id)?.name).filter(Boolean).join(", ")} /><Summary label="Jenis kerja" value={employmentLabels[draft.employmentType]} /></div><Field label="Catatan internal (opsional)" value={draft.notes} onChange={(value) => update("notes", value)} placeholder="Contoh: jadwal training, catatan akses, atau kebutuhan operasional" /><div className="space-y-2"><VerificationCheck label="Identitas kerja sudah diperiksa oleh owner/HR." checked={draft.workIdentityChecked} onChange={(value) => update("workIdentityChecked", value)} error={errors.workIdentityChecked} /><VerificationCheck label="Staff sudah menyetujui aturan kerja dan penggunaan akses POS." checked={draft.agreementConfirmed} onChange={(value) => update("agreementConfirmed", value)} error={errors.agreementConfirmed} /><VerificationCheck label="Briefing keamanan akses (PIN, logout, dan pembatasan role) sudah dijadwalkan/disampaikan." checked={draft.accessBriefingCompleted} onChange={(value) => update("accessBriefingCompleted", value)} error={errors.accessBriefingCompleted} /></div></div>}
            </div>

            <footer className="flex items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 p-4 sm:p-5"><button type="button" onClick={step === 1 ? onClose : goBack} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-extrabold text-slate-600 hover:bg-slate-100">{step === 1 ? "Batal" : <><ChevronLeft className="h-4 w-4" />Kembali</>}</button><div className="flex items-center gap-2"><span className="hidden text-[11px] font-semibold text-slate-400 sm:inline">Langkah {step} dari 3</span>{step < 3 ? <button type="button" onClick={goNext} className="inline-flex items-center gap-1.5 rounded-xl bg-[#0A2540] px-4 py-2.5 text-xs font-extrabold text-[#00C897] hover:bg-[#0d3154]">Lanjut<ChevronRight className="h-4 w-4" /></button> : <button type="button" onClick={submit} className="inline-flex items-center gap-1.5 rounded-xl bg-[#00C897] px-4 py-2.5 text-xs font-extrabold text-[#0A2540] hover:bg-[#68e6c1]"><CheckCircle2 className="h-4 w-4" />Simpan Staff Nonaktif</button>}</div></footer>
          </motion.section>
        </div>
      )}
    </AnimatePresence>
  );
}

function SectionTitle({ title, description }: { title: string; description: string }) { return <div><h3 className="text-base font-extrabold text-[#0A2540]">{title}</h3><p className="mt-1 text-xs leading-relaxed text-slate-500">{description}</p></div>; }
function Summary({ label, value }: { label: string; value: string }) { return <div><dt className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">{label}</dt><dd className="mt-1 break-words font-bold text-[#0A2540]">{value || "—"}</dd></div>; }
function ErrorText({ children }: { children: React.ReactNode }) { return <p className="mt-1.5 flex items-center gap-1 text-[10px] font-semibold text-rose-600"><AlertCircle className="h-3 w-3" />{children}</p>; }
function Field({ ref, label, required, value, onChange, error, placeholder, type = "text" }: { ref?: React.Ref<HTMLInputElement>; label: string; required?: boolean; value: string; onChange: (value: string) => void; error?: string; placeholder?: string; type?: string }) { return <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">{label}{required && <span className="ml-1 text-rose-500">*</span>}</span><input ref={ref} type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} aria-invalid={Boolean(error)} className={`w-full rounded-xl border px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#00C897] focus:ring-2 focus:ring-[#00C897]/20 ${error ? "border-rose-300 bg-rose-50/30" : "border-slate-200 bg-white"}`} />{error && <ErrorText>{error}</ErrorText>}</label>; }
function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: Array<{ value: string; label: string }> }) { return <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#00C897] focus:ring-2 focus:ring-[#00C897]/20">{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>; }
function VerificationCheck({ label, checked, onChange, error }: { label: string; checked: boolean; onChange: (value: boolean) => void; error?: string }) { return <div><label className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 ${error ? "border-rose-300 bg-rose-50/30" : checked ? "border-emerald-200 bg-emerald-50/50" : "border-slate-200 bg-white"}`}><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="mt-0.5 h-4 w-4 accent-[#00C897]" /><span className="text-xs font-semibold leading-relaxed text-slate-700">{label}</span></label>{error && <ErrorText>{error}</ErrorText>}</div>; }
