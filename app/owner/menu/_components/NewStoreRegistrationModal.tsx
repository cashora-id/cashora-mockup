"use client";

import { useEffect, useMemo, useRef, useState, type ComponentType, type ReactNode } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  Coffee,
  CreditCard,
  MapPin,
  Receipt,
  ShieldCheck,
  Store,
  Utensils,
  Users,
  WalletCards,
  Warehouse,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { Business, initialStoreRegistrationDraft, StoreCategory, StoreRegistrationDraft, StoreRegistrationFieldErrors, StoreRegistrationStep, getStoreRegistrationAllErrors, storeCategoryOptions, validateStoreRegistrationStep } from "../types";

type NewStoreRegistrationModalProps = {
  isOpen: boolean;
  existingBusinesses: Business[];
  onClose: () => void;
  onCreate: (draft: StoreRegistrationDraft) => void;
};

type CategoryIconProps = { className?: string };

const registrationFieldRef = (element: HTMLElement | null) => element;

const stepItems = [
  { id: 1 as StoreRegistrationStep, label: "Identitas", helper: "Nama & kategori", icon: Building2 },
  { id: 2 as StoreRegistrationStep, label: "Lokasi", helper: "Alamat & waktu", icon: MapPin },
  { id: 3 as StoreRegistrationStep, label: "POS", helper: "Pajak & operasional", icon: Receipt },
  { id: 4 as StoreRegistrationStep, label: "Pembayaran", helper: "QRIS & manager", icon: WalletCards },
  { id: 5 as StoreRegistrationStep, label: "Tinjau", helper: "Konfirmasi", icon: CheckCircle2 },
];

const categoryIcons: Record<StoreCategory, ComponentType<CategoryIconProps>> = {
  restaurant: Utensils,
  storefront: Store,
  cafe: Coffee,
  building_materials: Building2,
  wholesale_distribution: Warehouse,
  fashion: Store,
  electronics: Zap,
  health_beauty: ShieldCheck,
  automotive: Wrench,
  services: Wrench,
  education: Building2,
  agriculture: Warehouse,
  hospitality: Building2,
};

const fieldClass = (error?: string) => `w-full rounded-xl border bg-white px-3.5 py-3 text-sm text-[#0A2540] outline-none transition-all placeholder:text-slate-400 focus:ring-2 ${error ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100" : "border-slate-200 focus:border-[#00C897] focus:ring-[#00C897]/30"}`;

function ErrorMessage({ error, id }: { error?: string; id: string }) {
  if (!error) return null;
  return <p id={id} className="mt-1.5 flex items-start gap-1.5 text-[11px] font-semibold leading-relaxed text-rose-600"><AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />{error}</p>;
}

function FieldLabel({ children, required = false }: { children: ReactNode; required?: boolean }) {
  return <label className="mb-1.5 block text-xs font-extrabold text-[#0A2540]">{children}{required && <span className="ml-1 text-[#00A87E]">*</span>}</label>;
}

function ChoiceCard({ selected, onClick, icon: Icon, title, description, name }: { selected: boolean; onClick: () => void; icon: React.ComponentType<{ className?: string }>; title: string; description: string; name: string }) {
  return <button type="button" role="radio" aria-checked={selected} onClick={onClick} className={`group flex min-h-[106px] flex-1 items-start gap-3 rounded-2xl border p-4 text-left transition-all ${selected ? "border-[#00C897] bg-emerald-50/70 shadow-sm ring-2 ring-[#00C897]/15" : "border-slate-200 bg-white hover:border-[#00C897]/60 hover:bg-emerald-50/20"}`}>
    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${selected ? "bg-[#00C897] text-[#0A2540]" : "bg-slate-100 text-[#0A2540] group-hover:bg-emerald-50"}`}><Icon className="h-4.5 w-4.5" /></span>
    <span className="min-w-0 flex-1"><span className="flex items-center justify-between gap-2"><span className="text-xs font-extrabold text-[#0A2540]">{title}</span><span className={`flex h-4 w-4 items-center justify-center rounded-full border ${selected ? "border-[#00C897] bg-[#00C897] text-[#0A2540]" : "border-slate-300 text-transparent"}`}><Check className="h-2.5 w-2.5" /></span></span><span className="mt-1 block text-[11px] leading-relaxed text-slate-500">{description}</span></span>
  </button>;
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="mb-5"><p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#00A87E]">{eyebrow}</p><h3 className="mt-1 text-lg font-extrabold tracking-tight text-[#0A2540]">{title}</h3><p className="mt-1 text-xs leading-relaxed text-slate-500">{description}</p></div>;
}

export function NewStoreRegistrationModal({ isOpen, existingBusinesses, onClose, onCreate }: NewStoreRegistrationModalProps) {
  const [step, setStep] = useState<StoreRegistrationStep>(1);
  const [draft, setDraft] = useState<StoreRegistrationDraft>(initialStoreRegistrationDraft);
  const [errors, setErrors] = useState<StoreRegistrationFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMode, setSuccessMode] = useState<StoreRegistrationDraft["initialStoreMode"]>("activate");
  const firstFieldRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLElement | null>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  const existingNames = useMemo(() => existingBusinesses.map((business) => business.name), [existingBusinesses]);
  const selectedCategory = storeCategoryOptions.find((category) => category.id === draft.category);
  const currentStepIndex = step - 1;
  const isDirty = JSON.stringify(draft) !== JSON.stringify(initialStoreRegistrationDraft);

  useEffect(() => {
    if (!isOpen) return;
    lastFocusedElement.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => firstFieldRef.current?.focus(), 80);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
      lastFocusedElement.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) {
        if (!isDirty || window.confirm("Batalkan pendaftaran toko dan hapus data yang sudah diisi?")) onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex=\"0\"]"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isDirty, isOpen, isSubmitting, onClose]);

  useEffect(() => {
    const timer = window.setTimeout(() => firstFieldRef.current?.focus(), 50);
    return () => window.clearTimeout(timer);
  }, [step]);

  if (!isOpen) return null;

  const updateDraft = <K extends keyof StoreRegistrationDraft>(key: K, value: StoreRegistrationDraft[K]) => {
    setDraft((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
  };

  const updatePaymentMethod = (method: "cash" | "qris" | "card") => {
    const next = draft.acceptedPaymentMethods.includes(method) ? draft.acceptedPaymentMethods.filter((item) => item !== method) : [...draft.acceptedPaymentMethods, method];
    updateDraft("acceptedPaymentMethods", next);
  };

  const validateCurrentStep = () => {
    const nextErrors = validateStoreRegistrationStep(step, draft, existingNames);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      window.setTimeout(() => {
        const firstInvalid = dialogRef.current?.querySelector<HTMLElement>("[aria-invalid=\"true\"]");
        firstInvalid?.focus();
      }, 20);
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    if (step < 5) setStep((step + 1) as StoreRegistrationStep);
  };

  const handleSubmit = async () => {
    const allErrors = getStoreRegistrationAllErrors(draft, existingNames);
    if (Object.keys(allErrors).length) {
      setErrors(allErrors);
      const firstErrorStep = ([1, 2, 3, 4, 5] as StoreRegistrationStep[]).find((candidate) => Object.keys(validateStoreRegistrationStep(candidate, draft, existingNames)).length);
      if (firstErrorStep) setStep(firstErrorStep);
      return;
    }
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSuccessMode(draft.initialStoreMode);
    await new Promise((resolve) => window.setTimeout(resolve, 500));
    onCreate(draft);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleClose = () => {
    if (isSubmitting) return;
    if (isDirty && !isSuccess && !window.confirm("Batalkan pendaftaran toko dan hapus data yang sudah diisi?")) return;
    setStep(1);
    setDraft(initialStoreRegistrationDraft);
    setErrors({});
    setIsSuccess(false);
    onClose();
  };

  const renderStep = () => {
    if (step === 1) return <div className="space-y-5"><SectionHeading eyebrow="Langkah 1 dari 5" title="Mulai dari identitas usaha" description="Berikan nama dan kategori agar outlet mudah dikenali di laporan serta kasir POS." /><div><FieldLabel required>Nama toko atau outlet</FieldLabel><input ref={(element) => { firstFieldRef.current = registrationFieldRef(element); }} value={draft.outletName} onChange={(event) => updateDraft("outletName", event.target.value)} aria-invalid={Boolean(errors.outletName)} aria-describedby="outletName-help outletName-error" className={fieldClass(errors.outletName)} placeholder="Contoh: Kopi Senja Gubeng" autoComplete="organization" /><p id="outletName-help" className="mt-1.5 text-[11px] text-slate-500">Nama ini tampil pada laporan, kasir POS, dan pengaturan outlet.</p><ErrorMessage id="outletName-error" error={errors.outletName} /></div><div><FieldLabel required>Kategori usaha</FieldLabel><div role="radiogroup" aria-label="Kategori usaha" className="grid max-h-[360px] gap-3 overflow-y-auto pr-1 sm:grid-cols-2 xl:grid-cols-3">{storeCategoryOptions.map((option) => { const Icon = categoryIcons[option.id]; return <ChoiceCard key={option.id} name="category" selected={draft.category === option.id} onClick={() => { updateDraft("category", option.id); updateDraft("businessType", ""); }} icon={Icon} title={option.label} description={option.description} />; })}</div><ErrorMessage id="category-error" error={errors.category} /></div><div><FieldLabel required>Jenis usaha</FieldLabel><select ref={firstFieldRef as React.RefObject<HTMLSelectElement>} value={draft.businessType} onChange={(event) => updateDraft("businessType", event.target.value)} aria-invalid={Boolean(errors.businessType)} aria-describedby="businessType-error" disabled={!selectedCategory} className={`${fieldClass(errors.businessType)} disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400`}><option value="">{selectedCategory ? "Pilih jenis usaha" : "Pilih kategori terlebih dahulu"}</option>{selectedCategory?.types.map((type) => <option key={type} value={type}>{type}</option>)}</select><ErrorMessage id="businessType-error" error={errors.businessType} /></div></div>;

    if (step === 2) return <div className="space-y-5"><SectionHeading eyebrow="Langkah 2 dari 5" title="Atur lokasi dan waktu operasional" description="Data ini membantu membedakan outlet, laporan, dan jadwal operasional di kemudian hari." /><div className="grid gap-5 md:grid-cols-2"><div><FieldLabel required>Kota atau kabupaten</FieldLabel><input ref={(element) => { firstFieldRef.current = registrationFieldRef(element); }} value={draft.city} onChange={(event) => updateDraft("city", event.target.value)} aria-invalid={Boolean(errors.city)} className={fieldClass(errors.city)} placeholder="Contoh: Surabaya" autoComplete="address-level2" /><ErrorMessage id="city-error" error={errors.city} /></div><div><FieldLabel required>Zona waktu</FieldLabel><select value={draft.timezone} onChange={(event) => updateDraft("timezone", event.target.value as StoreRegistrationDraft["timezone"])} aria-invalid={Boolean(errors.timezone)} className={fieldClass(errors.timezone)}><option value="Asia/Jakarta">WIB (UTC+7) — Asia/Jakarta</option><option value="Asia/Makassar">WITA (UTC+8) — Asia/Makassar</option><option value="Asia/Jayapura">WIT (UTC+9) — Asia/Jayapura</option></select><ErrorMessage id="timezone-error" error={errors.timezone} /></div></div><div><FieldLabel required>Alamat lengkap outlet</FieldLabel><textarea ref={firstFieldRef as React.RefObject<HTMLTextAreaElement>} value={draft.address} onChange={(event) => updateDraft("address", event.target.value)} aria-invalid={Boolean(errors.address)} className={`${fieldClass(errors.address)} min-h-24 resize-y`} placeholder="Nama jalan, nomor, kecamatan, dan patokan" autoComplete="street-address" /><ErrorMessage id="address-error" error={errors.address} /></div><div><FieldLabel required>Tanggal mulai operasional</FieldLabel><input type="date" value={draft.openingDate} onChange={(event) => updateDraft("openingDate", event.target.value)} aria-invalid={Boolean(errors.openingDate)} className={fieldClass(errors.openingDate)} min={new Date().toISOString().slice(0, 10)} /><p className="mt-1.5 text-[11px] text-slate-500">Gunakan tanggal rencana buka. Pengaturan dapat dilanjutkan setelah toko dibuat.</p><ErrorMessage id="openingDate-error" error={errors.openingDate} /></div></div>;

    if (step === 3) return <div className="space-y-5"><SectionHeading eyebrow="Langkah 3 dari 5" title="Siapkan konfigurasi POS" description="Mulai dari pengaturan sederhana. Detail pajak dan biaya dapat disesuaikan kembali oleh Owner." /><div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0A2540] shadow-sm"><CreditCard className="h-5 w-5" /></div><div><p className="text-xs font-extrabold text-[#0A2540]">Mata uang transaksi</p><p className="mt-0.5 text-xs text-slate-500">Rupiah Indonesia (IDR)</p></div><span className="ml-auto rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-black text-slate-500">Standar Cashora</span></div><div><FieldLabel required>Pajak pada transaksi</FieldLabel><div role="radiogroup" aria-label="Mode pajak" className="grid gap-3 md:grid-cols-3"><ChoiceCard name="taxMode" selected={draft.taxMode === "none"} onClick={() => updateDraft("taxMode", "none")} icon={Receipt} title="Belum diterapkan" description="Atur pajak pada tahap berikutnya." /><ChoiceCard name="taxMode" selected={draft.taxMode === "inclusive"} onClick={() => updateDraft("taxMode", "inclusive")} icon={Receipt} title="Termasuk harga" description="Harga produk sudah termasuk pajak." /><ChoiceCard name="taxMode" selected={draft.taxMode === "exclusive"} onClick={() => updateDraft("taxMode", "exclusive")} icon={Receipt} title="Ditambahkan" description="Pajak ditambahkan saat pembayaran." /></div></div>{draft.taxMode !== "none" && <div><FieldLabel required>Tarif pajak (%)</FieldLabel><div className="relative"><input type="number" min="0" max="100" step="0.1" value={draft.taxRate} onChange={(event) => updateDraft("taxRate", event.target.value)} aria-invalid={Boolean(errors.taxRate)} className={`${fieldClass(errors.taxRate)} pr-10`} placeholder="Contoh: 11" /><span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">%</span></div><ErrorMessage id="taxRate-error" error={errors.taxRate} /></div>}<div className="rounded-2xl border border-slate-200 p-4"><label className="flex cursor-pointer items-center justify-between gap-4"><span><span className="block text-xs font-extrabold text-[#0A2540]">Service charge</span><span className="mt-1 block text-[11px] text-slate-500">Tambahkan biaya layanan pada transaksi restoran/cafe.</span></span><input type="checkbox" checked={draft.serviceChargeEnabled} onChange={(event) => updateDraft("serviceChargeEnabled", event.target.checked)} className="h-5 w-5 accent-[#00C897]" /></label>{draft.serviceChargeEnabled && <div className="mt-4"><FieldLabel required>Tarif service charge (%)</FieldLabel><div className="relative"><input type="number" min="0" max="100" step="0.1" value={draft.serviceChargeRate} onChange={(event) => updateDraft("serviceChargeRate", event.target.value)} aria-invalid={Boolean(errors.serviceChargeRate)} className={`${fieldClass(errors.serviceChargeRate)} pr-10`} placeholder="Contoh: 5" /><span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">%</span></div><ErrorMessage id="serviceChargeRate-error" error={errors.serviceChargeRate} /></div>}</div><div><FieldLabel required>Status setelah dibuat</FieldLabel><div role="radiogroup" aria-label="Status awal toko" className="grid gap-3 md:grid-cols-2"><ChoiceCard name="initialStoreMode" selected={draft.initialStoreMode === "activate"} onClick={() => updateDraft("initialStoreMode", "activate")} icon={Zap} title="Aktifkan POS" description="Toko siap dilanjutkan ke setup POS." /><ChoiceCard name="initialStoreMode" selected={draft.initialStoreMode === "setup_later"} onClick={() => updateDraft("initialStoreMode", "setup_later")} icon={ShieldCheck} title="Simpan untuk nanti" description="Toko dibuat sebagai setup tertunda." /></div></div></div>;

    if (step === 4) return <div className="space-y-5"><SectionHeading eyebrow="Langkah 4 dari 5" title="Siapkan pembayaran dan tim" description="Pilih niat setup awal. Cashora tidak meminta kredensial bank atau rahasia QRIS di tahap ini." /><div><FieldLabel required>Setup QRIS</FieldLabel><div className="grid gap-3 md:grid-cols-2"><ChoiceCard name="qrisSetup" selected={draft.qrisSetup === "setup_later"} onClick={() => updateDraft("qrisSetup", "setup_later")} icon={WalletCards} title="Atur nanti" description="Selesaikan pengajuan QRIS setelah profil toko dibuat." /><ChoiceCard name="qrisSetup" selected={draft.qrisSetup === "setup_now"} onClick={() => updateDraft("qrisSetup", "setup_now")} icon={WalletCards} title="Mulai pengajuan" description="Simpan sebagai task onboarding pembayaran." /></div></div><div><FieldLabel required>Metode pembayaran yang disiapkan</FieldLabel><div className="grid gap-2 sm:grid-cols-3">{(["cash", "qris", "card"] as const).map((method) => { const labels = { cash: ["Tunai", "Pembayaran cash"], qris: ["QRIS", "Pembayaran digital"], card: ["Kartu", "Debit/kredit"] }[method]; const checked = draft.acceptedPaymentMethods.includes(method); return <label key={method} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-all ${checked ? "border-[#00C897] bg-emerald-50/60" : "border-slate-200 bg-white hover:border-slate-300"}`}><input type="checkbox" checked={checked} onChange={() => updatePaymentMethod(method)} className="h-4 w-4 accent-[#00C897]" /><span><span className="block text-xs font-extrabold text-[#0A2540]">{labels[0]}</span><span className="mt-0.5 block text-[10px] text-slate-500">{labels[1]}</span></span></label>; })}</div><ErrorMessage id="payment-methods-error" error={errors.acceptedPaymentMethods} /></div><div className="rounded-2xl border border-slate-200 p-4"><label className="flex cursor-pointer items-center justify-between gap-4"><span><span className="block text-xs font-extrabold text-[#0A2540]">Tambahkan manager outlet sekarang</span><span className="mt-1 block text-[11px] text-slate-500">Undangan aktual dapat dilakukan dari pengaturan akses setelah toko dibuat.</span></span><input type="checkbox" checked={draft.inviteManagerNow} onChange={(event) => updateDraft("inviteManagerNow", event.target.checked)} className="h-5 w-5 accent-[#00C897]" /></label>{draft.inviteManagerNow && <div className="mt-4 grid gap-4 sm:grid-cols-2"><div><FieldLabel required>Nama manager</FieldLabel><input ref={(element) => { firstFieldRef.current = registrationFieldRef(element); }} value={draft.managerName} onChange={(event) => updateDraft("managerName", event.target.value)} aria-invalid={Boolean(errors.managerName)} className={fieldClass(errors.managerName)} placeholder="Nama lengkap" /><ErrorMessage id="managerName-error" error={errors.managerName} /></div><div><FieldLabel required>Nomor WhatsApp</FieldLabel><input value={draft.managerPhone} onChange={(event) => updateDraft("managerPhone", event.target.value)} aria-invalid={Boolean(errors.managerPhone)} className={fieldClass(errors.managerPhone)} placeholder="08xx atau +62" inputMode="tel" /><ErrorMessage id="managerPhone-error" error={errors.managerPhone} /></div></div>}</div></div>;

    return <div className="space-y-5"><SectionHeading eyebrow="Langkah 5 dari 5" title="Tinjau sebelum membuat toko" description="Pastikan informasi dasar sudah benar. Anda dapat mengubah bagian mana pun sebelum konfirmasi." /><div className="space-y-3">{[{ step: 1 as StoreRegistrationStep, title: "Identitas usaha", rows: [["Nama", draft.outletName], ["Kategori", storeCategoryOptions.find((item) => item.id === draft.category)?.label ?? "—"], ["Jenis", draft.businessType || "—"]] }, { step: 2 as StoreRegistrationStep, title: "Lokasi & operasional", rows: [["Lokasi", `${draft.city || "—"} • ${draft.timezone}`], ["Alamat", draft.address || "—"], ["Mulai", draft.openingDate || "—"]] }, { step: 3 as StoreRegistrationStep, title: "Konfigurasi POS", rows: [["Pajak", draft.taxMode === "none" ? "Belum diterapkan" : `${draft.taxMode === "inclusive" ? "Termasuk" : "Ditambahkan"} • ${draft.taxRate}%`], ["Service charge", draft.serviceChargeEnabled ? `${draft.serviceChargeRate}%` : "Tidak diaktifkan"], ["Status", draft.initialStoreMode === "activate" ? "Aktifkan POS" : "Setup tertunda"]] }, { step: 4 as StoreRegistrationStep, title: "Pembayaran & tim", rows: [["QRIS", draft.qrisSetup === "setup_now" ? "Mulai pengajuan" : "Atur nanti"], ["Metode", draft.acceptedPaymentMethods.map((method) => method === "cash" ? "Tunai" : method === "qris" ? "QRIS" : "Kartu").join(", ") || "—"], ["Manager", draft.inviteManagerNow ? draft.managerName || "Belum diisi" : "Atur nanti"]] }].map((section) => <div key={section.title} className="rounded-2xl border border-slate-200 bg-white p-4"><div className="flex items-center justify-between gap-3"><h4 className="text-xs font-extrabold text-[#0A2540]">{section.title}</h4><button type="button" onClick={() => setStep(section.step)} className="text-[11px] font-extrabold text-[#00A87E] hover:underline">Ubah</button></div><dl className="mt-3 grid gap-2 text-[11px] sm:grid-cols-3">{section.rows.map(([label, value]) => <div key={label} className="min-w-0"><dt className="font-bold uppercase tracking-wide text-slate-400">{label}</dt><dd className="mt-0.5 break-words font-semibold text-slate-700">{value}</dd></div>)}</dl></div>)}</div><label className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 ${errors.declarationAccepted ? "border-rose-300 bg-rose-50/40" : "border-slate-200 bg-slate-50"}`}><input type="checkbox" checked={draft.declarationAccepted} onChange={(event) => updateDraft("declarationAccepted", event.target.checked)} className="mt-0.5 h-4 w-4 accent-[#00C897]" /><span className="text-xs font-semibold leading-relaxed text-slate-700">Saya memastikan informasi dasar toko ini benar dan memahami bahwa pengaturan lanjutan dapat diselesaikan setelah toko dibuat.</span></label><ErrorMessage id="declaration-error" error={errors.declarationAccepted} /></div>;
  };

  const successName = draft.outletName.trim();
  return <div className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-5" onMouseDown={(event) => { if (event.target === event.currentTarget && !isSubmitting) handleClose(); }}><div className="absolute inset-0 bg-[#061a2c]/60 backdrop-blur-[2px]" /><section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="store-registration-title" className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl bg-[#F8FAFC] shadow-2xl sm:max-h-[90vh] sm:rounded-3xl" onMouseDown={(event) => event.stopPropagation()}><header className="relative overflow-hidden bg-gradient-to-br from-[#0A2540] to-[#0d3154] px-5 py-5 text-white sm:px-7"><div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full opacity-25" style={{ background: "radial-gradient(circle, #00C897, transparent 70%)" }} /><div className="relative flex items-start justify-between gap-4"><div className="flex items-start gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#00C897]/35 bg-[#00C897]/15 text-[#00C897]"><Store className="h-5 w-5" /></div><div><p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#00C897]">Portal Owner Cashora</p><h2 id="store-registration-title" className="mt-1 text-lg font-extrabold tracking-tight sm:text-xl">Daftarkan Toko Baru</h2><p className="mt-1 max-w-xl text-xs leading-relaxed text-slate-300">Buat profil outlet baru dengan beberapa langkah sederhana.</p></div></div><button type="button" onClick={handleClose} aria-label="Tutup pendaftaran toko" className="rounded-xl p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"><X className="h-5 w-5" /></button></div></header><div className="border-b border-slate-200 bg-white px-5 py-4 sm:px-7"><div className="flex items-center justify-between gap-1 sm:gap-3">{stepItems.map((item, index) => { const Icon = item.icon; const active = step === item.id; const complete = step > item.id; return <div key={item.id} className="flex min-w-0 flex-1 items-center"><div className="flex min-w-0 items-center gap-2"><div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-black transition-all ${complete ? "border-[#00C897] bg-[#00C897] text-[#0A2540]" : active ? "border-[#0A2540] bg-[#0A2540] text-[#00C897] shadow-md" : "border-slate-200 bg-slate-50 text-slate-400"}`}>{complete ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}</div><div className="hidden min-w-0 sm:block"><p className={`truncate text-[11px] font-extrabold ${active || complete ? "text-[#0A2540]" : "text-slate-400"}`}>{item.label}</p><p className="truncate text-[10px] text-slate-400">{item.helper}</p></div></div>{index < stepItems.length - 1 && <div className={`mx-1 h-px flex-1 sm:mx-3 ${complete ? "bg-[#00C897]" : "bg-slate-200"}`} />}</div>; })}</div></div>{isSuccess ? <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-12 text-center"><div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-[#00A87E] shadow-sm ring-8 ring-emerald-50/50"><CheckCircle2 className="h-10 w-10" /></div><h3 className="mt-6 text-xl font-extrabold text-[#0A2540]">{successMode === "activate" ? "Toko berhasil dibuat" : "Toko disimpan untuk diselesaikan"}</h3><p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">{successMode === "activate" ? <><strong className="text-[#0A2540]">{successName}</strong> telah aktif di portal owner. Lengkapi produk, perangkat kasir, staff, dan pembayaran pada tahap berikutnya.</> : <><strong className="text-[#0A2540]">{successName}</strong> muncul sebagai setup tertunda. Lengkapi pengaturan sebelum mulai bertransaksi.</>}</p><div className="mt-7 flex flex-wrap justify-center gap-3"><button type="button" onClick={handleClose} className="rounded-xl bg-[#0A2540] px-5 py-3 text-xs font-extrabold text-white transition-colors hover:bg-[#0d3154]">Tutup</button></div></div> : <><div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-7"><div aria-live="polite" className="sr-only">{Object.keys(errors).length ? `Ada ${Object.keys(errors).length} kesalahan pada formulir.` : ""}</div>{renderStep()}</div><footer className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-200 bg-white px-5 py-4 sm:px-7"><button type="button" onClick={step === 1 ? handleClose : () => setStep((step - 1) as StoreRegistrationStep)} className="inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-extrabold text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#0A2540]"><ArrowLeft className="h-4 w-4" />{step === 1 ? "Batal" : "Kembali"}</button>{step < 5 ? <button type="button" onClick={handleNext} className="inline-flex items-center gap-2 rounded-xl bg-[#0A2540] px-5 py-3 text-xs font-extrabold text-white shadow-md shadow-slate-900/10 transition-all hover:bg-[#00C897] hover:text-[#0A2540]">Lanjut <ArrowRight className="h-4 w-4" /></button> : <button type="button" onClick={handleSubmit} disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-xl bg-[#00C897] px-5 py-3 text-xs font-black text-[#0A2540] shadow-md shadow-emerald-500/20 transition-all hover:bg-[#00b084] disabled:cursor-wait disabled:opacity-70">{isSubmitting ? "Membuat toko..." : draft.initialStoreMode === "activate" ? "Buat & Aktifkan Toko" : "Simpan Toko untuk Setup"}<ArrowRight className="h-4 w-4" /></button>}</footer></>}</section></div>;
}
