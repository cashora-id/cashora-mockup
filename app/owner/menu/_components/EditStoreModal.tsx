"use client";

import { useState, useEffect, useCallback } from "react";
import { Pencil, X } from "lucide-react";
import { Business, StoreCategory, storeCategoryOptions } from "../types";

interface EditStoreModalProps {
  target: Business | null;
  onCancel: () => void;
  onSave: (id: string, updates: { name: string; type: string; location: string; category: StoreCategory }) => void;
}

export function EditStoreModal({ target, onCancel, onSave }: EditStoreModalProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState<StoreCategory>("restaurant");

  // Populate fields when target changes
  useEffect(() => {
    if (target) {
      setName(target.name);
      setType(target.type);
      setLocation(target.location);
      setCategory(target.category);
    }
  }, [target?.id]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onCancel]);

  const isValid = name.trim().length >= 3 && type.trim().length > 0 && location.trim().length > 0;

  const handleSave = useCallback(() => {
    if (!target || !isValid) return;
    onSave(target.id, {
      name: name.trim(),
      type: type.trim(),
      location: location.trim(),
      category,
    });
  }, [target, isValid, name, type, location, category, onSave]);

  if (!target) return null;

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-store-title"
        className="relative w-full max-w-md mx-4 bg-white rounded-3xl shadow-2xl p-6 sm:p-8"
      >
        {/* Close button */}
        <button
          onClick={onCancel}
          aria-label="Tutup"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
          <Pencil className="w-6 h-6 text-blue-500" />
        </div>

        <h2 id="edit-store-title" className="text-lg font-extrabold text-[#0A2540] mb-1">
          Edit Toko
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Hanya tersedia saat toko dalam status <span className="font-bold text-amber-600">Maintenance</span>.
        </p>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Nama Toko */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Nama Toko
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all"
              placeholder="Nama toko atau outlet"
            />
            {name.trim().length > 0 && name.trim().length < 3 && (
              <p className="text-[11px] text-red-500 mt-1">Nama toko minimal 3 karakter.</p>
            )}
          </div>

          {/* Jenis Usaha */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Jenis Usaha
            </label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all"
              placeholder="Contoh: Restoran, Coffee Shop"
            />
          </div>

          {/* Lokasi */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Lokasi
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all"
              placeholder="Kota • Alamat singkat"
            />
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Kategori Usaha
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as StoreCategory)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all bg-white"
            >
              {storeCategoryOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            disabled={!isValid}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all ${
              isValid
                ? "bg-blue-600 hover:bg-blue-700 shadow-md"
                : "bg-slate-300 cursor-not-allowed"
            }`}
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
