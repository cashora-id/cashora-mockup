"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { AlertTriangle, CheckCircle2, Info, LoaderCircle, X, XCircle } from "lucide-react";

export type OwnerToastType = "success" | "warning" | "danger" | "info" | "loading";

export interface OwnerToastAction {
  label: string;
  onClick: () => void;
}

export interface OwnerToastOptions {
  title?: string;
  duration?: number;
  dismissible?: boolean;
  action?: OwnerToastAction;
}

interface OwnerToastState extends OwnerToastOptions {
  id: string;
  type: OwnerToastType;
  message: string;
}

interface OwnerToastContextValue {
  showToast: (type: OwnerToastType, message: string, options?: OwnerToastOptions) => string;
  dismissToast: (id?: string) => void;
}

const OwnerToastContext = createContext<OwnerToastContextValue | null>(null);

const styles: Record<OwnerToastType, { iconComponent: typeof CheckCircle2; shell: string; iconClass: string }> = {
  success: { iconComponent: CheckCircle2, shell: "border-emerald-200 bg-emerald-50", iconClass: "text-emerald-600" },
  warning: { iconComponent: AlertTriangle, shell: "border-amber-200 bg-amber-50", iconClass: "text-amber-600" },
  danger: { iconComponent: XCircle, shell: "border-rose-200 bg-rose-50", iconClass: "text-rose-600" },
  info: { iconComponent: Info, shell: "border-blue-200 bg-blue-50", iconClass: "text-blue-600" },
  loading: { iconComponent: LoaderCircle, shell: "border-slate-200 bg-white", iconClass: "animate-spin text-[#00A87E]" },
};

export function OwnerToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<OwnerToastState | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const counterRef = useRef(0);

  const dismissToast = useCallback((id?: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setToast((current) => (!id || current?.id === id ? null : current));
  }, []);

  const showToast = useCallback((type: OwnerToastType, message: string, options: OwnerToastOptions = {}) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const id = `owner-toast-${Date.now()}-${counterRef.current++}`;
    const nextToast: OwnerToastState = { id, type, message, ...options };
    setToast(nextToast);

    const duration = options.duration ?? (type === "danger" ? 7000 : type === "warning" ? 6000 : 4000);
    if (type !== "loading" && duration > 0) {
      timerRef.current = setTimeout(() => dismissToast(id), duration);
    }
    return id;
  }, [dismissToast]);

  const value = useMemo(() => ({ showToast, dismissToast }), [showToast, dismissToast]);
  const currentStyle = toast ? styles[toast.type] : null;
  const Icon = currentStyle?.iconComponent;

  return (
    <OwnerToastContext.Provider value={value}>
      {children}
      {toast && currentStyle && Icon && (
        <div className="pointer-events-none fixed inset-x-4 bottom-4 z-[10000] flex justify-end sm:inset-x-auto sm:right-6 sm:bottom-6">
          <div
            role={toast.type === "danger" ? "alert" : "status"}
            aria-live={toast.type === "danger" ? "assertive" : "polite"}
            className={`pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-2xl border px-4 py-3 shadow-xl sm:w-[390px] ${currentStyle.shell}`}
          >
            <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${currentStyle.iconClass}`} />
            <div className="min-w-0 flex-1">
              {toast.title && <p className="text-sm font-extrabold text-[#0A2540]">{toast.title}</p>}
              <p className="text-xs leading-relaxed text-slate-700">{toast.message}</p>
              {toast.action && (
                <button onClick={() => { toast.action?.onClick(); dismissToast(toast.id); }} className="mt-2 text-xs font-extrabold text-[#0A2540] underline decoration-[#00C897] decoration-2 underline-offset-4">
                  {toast.action.label}
                </button>
              )}
            </div>
            {toast.dismissible !== false && toast.type !== "loading" && (
              <button onClick={() => dismissToast(toast.id)} aria-label="Tutup notifikasi" className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-black/5 hover:text-slate-700">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </OwnerToastContext.Provider>
  );
}

export function useOwnerToast() {
  const context = useContext(OwnerToastContext);
  if (!context) throw new Error("useOwnerToast must be used within OwnerToastProvider");
  return context;
}
