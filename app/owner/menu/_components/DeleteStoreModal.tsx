"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";
import { Business } from "../types";

interface DeleteStoreModalProps {
  target: Business | null;
  onCancel: () => void;
  onConfirm: (id: string) => void;
}

export function DeleteStoreModal({ target, onCancel, onConfirm }: DeleteStoreModalProps) {
  const [confirmText, setConfirmText] = useState("");
  const isMatch = confirmText.trim() === target?.name.trim();

  // Reset input when target changes
  useEffect(() => {
    setConfirmText("");
  }, [target?.id]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onCancel]);

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
        aria-labelledby="delete-store-title"
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
        <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6 text-red-500" />
        </div>

        <h2 id="delete-store-title" className="text-lg font-extrabold text-[#0A2540] mb-2">
          Hapus Toko
        </h2>

        <p className="text-sm text-slate-600 mb-1">
          Anda akan menghapus{" "}
          <span className="font-bold text-[#0A2540]">&quot;{target.name}&quot;</span>.
        </p>

        <p className="text-sm text-slate-600 mb-4">Tindakan ini akan:</p>

        <ul className="text-sm text-slate-600 space-y-1.5 mb-6 list-none">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
            Menghapus seluruh data transaksi toko
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
            Mencabut akses kasir &amp; manager
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
            Menghapus toko dari dashboard Anda
          </li>
        </ul>

        {/* Type-to-confirm */}
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
          Ketik nama toko untuk konfirmasi
        </label>
        <input
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder={target.name}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-300 transition-all mb-6"
          autoFocus
        />

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={() => onConfirm(target.id)}
            disabled={!isMatch}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all ${
              isMatch
                ? "bg-red-600 hover:bg-red-700 shadow-md"
                : "bg-slate-300 cursor-not-allowed"
            }`}
          >
            Hapus Permanen
          </button>
        </div>
      </div>
    </div>
  );
}
