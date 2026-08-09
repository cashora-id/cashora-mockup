"use client";

import { motion } from "framer-motion";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  AlertTriangle,
  Info,
  CheckCircle2,
  X
} from "lucide-react";
import { Notification } from "../types";

interface NotificationDropdownProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onClose: () => void;
}

export function NotificationDropdown({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
  onClose,
}: NotificationDropdownProps) {
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getTypeIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return (
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        );
      case "warning":
        return (
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
            <AlertTriangle className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
            <Info className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.96 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/90 z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#0A2540] text-[#00C897]">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-[#0A2540] leading-none">
              Notifikasi Sistem
            </h3>
            <p className="text-[11px] font-medium text-slate-500 mt-0.5">
              {unreadCount > 0
                ? `${unreadCount} notifikasi belum dibaca`
                : "Semua notifikasi sudah dibaca"}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          aria-label="Tutup"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Action Toolbar */}
      {notifications.length > 0 && (
        <div className="px-4 py-2 bg-slate-100/60 border-b border-slate-100 flex items-center justify-between text-[11px]">
          <button
            onClick={onMarkAllAsRead}
            disabled={unreadCount === 0}
            className={`flex items-center gap-1 font-bold transition-colors ${
              unreadCount > 0
                ? "text-emerald-700 hover:text-emerald-800 cursor-pointer"
                : "text-slate-400 cursor-not-allowed"
            }`}
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Tandai Semua Dibaca
          </button>

          <button
            onClick={onClearAll}
            className="flex items-center gap-1 font-bold text-rose-600 hover:text-rose-700 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Bersihkan
          </button>
        </div>
      )}

      {/* Notification List */}
      <div className="max-h-[360px] overflow-y-auto divide-y divide-slate-100">
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <Bell className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-[#0A2540]">Tidak Ada Notifikasi</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Semua aktivitas dan informasi terbaru akan muncul di sini.
            </p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => onMarkAsRead(notif.id)}
              className={`p-4 flex items-start gap-3 transition-colors cursor-pointer group ${
                notif.isRead
                  ? "bg-white hover:bg-slate-50/80 opacity-75"
                  : "bg-emerald-50/20 hover:bg-emerald-50/40"
              }`}
            >
              {getTypeIcon(notif.type)}

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <h4
                    className={`text-xs font-extrabold line-clamp-1 ${
                      notif.isRead ? "text-slate-700" : "text-[#0A2540]"
                    }`}
                  >
                    {notif.title}
                  </h4>
                  {!notif.isRead && (
                    <span className="w-2 h-2 rounded-full bg-[#00C897] shrink-0" />
                  )}
                </div>

                <p className="text-[11px] text-slate-600 leading-snug mb-1.5">
                  {notif.message}
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>{notif.time}</span>
                  {notif.store && (
                    <span className="font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {notif.store}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
        <p className="text-[10px] font-semibold text-slate-400">
          Notifikasi Diperbarui Secara Real-Time
        </p>
      </div>
    </motion.div>
  );
}
