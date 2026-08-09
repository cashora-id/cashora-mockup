"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Save, CheckCircle2, Loader2 } from "lucide-react";
import { OwnerProfile } from "../../menu/types";

interface PersonalInfoTabProps {
  profile: OwnerProfile;
  onSave: (updated: OwnerProfile) => void;
}

export function PersonalInfoTab({ profile, onSave }: PersonalInfoTabProps) {
  const [formData, setFormData] = useState<OwnerProfile>(profile);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleChange = (field: keyof OwnerProfile, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      onSave(formData);
      setIsSaving(false);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Toast Alert */}
      {showSuccessToast && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-xs font-bold">Data profil berhasil diperbarui!</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nama Lengkap */}
        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-[#0A2540] flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#00C897]" /> Nama Lengkap
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00C897]/50 shadow-sm transition-all"
            required
          />
        </div>

        {/* Alamat Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-[#0A2540] flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-blue-500" /> Alamat Email Usaha
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00C897]/50 shadow-sm transition-all"
            required
          />
        </div>

        {/* Nomor Telepon */}
        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-[#0A2540] flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-amber-500" /> Nomor Telepon / WhatsApp
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00C897]/50 shadow-sm transition-all"
            required
          />
        </div>

        {/* Jabatan / Peran */}
        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-[#0A2540] flex items-center gap-1.5">
            Peran Akun
          </label>
          <input
            type="text"
            value={formData.role}
            disabled
            className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-500 cursor-not-allowed select-none"
          />
        </div>
      </div>

      {/* Alamat Utama */}
      <div className="space-y-1.5">
        <label className="text-xs font-extrabold text-[#0A2540] flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-rose-500" /> Alamat Domisili Utama
        </label>
        <textarea
          rows={3}
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
          className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00C897]/50 shadow-sm transition-all"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setFormData(profile)}
          className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
        >
          Batal
        </button>

        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-2.5 rounded-xl bg-[#00C897] hover:bg-[#00b084] text-[#0A2540] text-xs font-black transition-all shadow-md flex items-center gap-2"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" /> Simpan Perubahan
            </>
          )}
        </button>
      </div>
    </form>
  );
}
