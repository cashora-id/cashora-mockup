"use client";

import { useEffect } from "react";
import { CheckCircle2, AlertTriangle, XCircle, X } from "lucide-react";

export interface ToastData {
  id: string;
  message: string;
  type: "success" | "warning" | "danger";
}

const TOAST_DURATION = 4000;

export function Toast({
  toast,
  onDismiss,
}: {
  toast: ToastData | null;
  onDismiss: (id: string) => void;
}) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => onDismiss(toast.id), TOAST_DURATION);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  const iconMap = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-500" />,
    danger: <XCircle className="w-4 h-4 text-red-500" />,
  };

  const borderMap = {
    success: "border-emerald-200",
    warning: "border-amber-200",
    danger: "border-red-200",
  };

  const bgMap = {
    success: "bg-emerald-50",
    warning: "bg-amber-50",
    danger: "bg-red-50",
  };

  return (
    <div
      role="alert"
      className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg animate-in slide-in-from-bottom-2 duration-300 ${bgMap[toast.type]} ${borderMap[toast.type]}`}
    >
      {iconMap[toast.type]}
      <p className="text-sm font-semibold text-slate-700">{toast.message}</p>
      <button
        onClick={() => onDismiss(toast.id)}
        aria-label="Tutup notifikasi"
        className="ml-2 text-slate-400 hover:text-slate-600 transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
