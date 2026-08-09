"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { Bell, CircleHelp } from "lucide-react";
import { Notification } from "../types";
import { ownerName } from "../data";
import { NotificationDropdown } from "./NotificationDropdown";

interface OwnerHeaderProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

export function OwnerHeader({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
}: OwnerHeaderProps) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/cashora-logo.png"
              alt="CASHORA Logo"
              width={36}
              height={36}
              className="w-9 h-9 object-contain group-hover:scale-105 transition-transform"
              priority
            />
            <span className="text-xl font-extrabold text-[#0A2540] tracking-tight">
              CASHORA<span className="text-[#00C897]">.</span>
            </span>
          </Link>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold border border-slate-200">
            Owner Dashboard
          </span>
        </div>

        <div className="flex items-center gap-3 relative" ref={dropdownRef}>
          {/* Bell Notification Button */}
          <button
            aria-label="Notifikasi"
            onClick={() => setIsNotifOpen((prev) => !prev)}
            className={`relative p-2 rounded-xl transition-colors ${
              isNotifOpen
                ? "bg-[#0A2540] text-[#00C897]"
                : "text-slate-500 hover:text-[#0A2540] hover:bg-slate-100"
            }`}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#00C897] text-[10px] font-black text-[#0A2540] ring-2 ring-white animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Animated Notification Dropdown */}
          <AnimatePresence>
            {isNotifOpen && (
              <NotificationDropdown
                notifications={notifications}
                onMarkAsRead={onMarkAsRead}
                onMarkAllAsRead={onMarkAllAsRead}
                onClearAll={onClearAll}
                onClose={() => setIsNotifOpen(false)}
              />
            )}
          </AnimatePresence>

          <button
            aria-label="Bantuan"
            className="p-2 rounded-xl text-slate-500 hover:text-[#0A2540] hover:bg-slate-100 transition-colors"
          >
            <CircleHelp className="w-5 h-5" />
          </button>

          <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-1 cursor-pointer group">
            <div className="w-9 h-9 rounded-xl bg-[#0A2540] text-white flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-emerald-500/20 group-hover:ring-emerald-500 transition-all">
              BS
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-bold text-[#0A2540] leading-none mb-0.5">{ownerName}</p>
              <p className="text-[11px] font-medium text-slate-500 leading-none">Pemilik Utama</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
