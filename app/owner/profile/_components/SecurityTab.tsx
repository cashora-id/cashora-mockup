"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Lock,
  Smartphone,
  Laptop,
  CheckCircle2,
  Trash2,
  AlertTriangle,
  KeyRound,
  Eye,
  EyeOff
} from "lucide-react";
import { ActiveSession } from "../../menu/types";

const initialSessions: ActiveSession[] = [
  {
    id: "sess-1",
    device: "MacBook Pro 16\"",
    os: "macOS Tahoe • Chrome v128",
    location: "Surabaya, Jawa Timur",
    ip: "180.252.114.22",
    isActive: true,
    lastActive: "Sedang Aktif (Perangkat Ini)"
  },
  {
    id: "sess-2",
    device: "iPhone 15 Pro Max",
    os: "iOS 18.1 • Cashora Owner App",
    location: "Surabaya Gubeng",
    ip: "114.124.201.88",
    isActive: false,
    lastActive: "12 menit yang lalu"
  },
  {
    id: "sess-3",
    device: "Windows Desktop POS",
    os: "Windows 11 • Edge v127",
    location: "Jakarta Pusat",
    ip: "36.85.15.109",
    isActive: false,
    lastActive: "2 jam yang lalu"
  }
];

export function SecurityTab() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [sessions, setSessions] = useState<ActiveSession[]>(initialSessions);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordToast, setPasswordToast] = useState(false);

  const handleTerminateSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordToast(true);
    setNewPassword("");
    setTimeout(() => setPasswordToast(false), 3000);
  };

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: "Kosong", color: "bg-slate-200" };
    if (pass.length < 6) return { score: 1, label: "Lemah", color: "bg-rose-500" };
    if (pass.length < 10) return { score: 2, label: "Sedang", color: "bg-amber-500" };
    return { score: 3, label: "Kuat & Aman", color: "bg-emerald-500" };
  };

  const strength = getPasswordStrength(newPassword);

  return (
    <div className="space-y-8">
      {/* Two-Factor Authentication (2FA) */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-[#0A2540]">
              Autentikasi Dua Langkah (2FA)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed max-w-md">
              Lindungi akun Anda dari akses tidak sah dengan mewajibkan verifikasi kode WhatsApp / Authenticator saat login.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIs2FAEnabled((prev) => !prev)}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            is2FAEnabled ? "bg-[#00C897]" : "bg-slate-300"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              is2FAEnabled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* Password Change Form */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-xl bg-[#0A2540] text-[#00C897] flex items-center justify-center">
            <KeyRound className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-extrabold text-[#0A2540]">Ubah Kata Sandi Akun</h3>
        </div>

        {passwordToast && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Kata sandi Anda berhasil diperbarui!
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Kata Sandi Baru</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan kata sandi baru..."
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pr-10 pl-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00C897]/50 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Strength Meter */}
          {newPassword && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-slate-400">Kekuatan Kata Sandi:</span>
                <span className="text-[#0A2540]">{strength.label}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${strength.color}`}
                  style={{ width: `${(strength.score / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={!newPassword}
              className="px-5 py-2.5 rounded-xl bg-[#0A2540] hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md"
            >
              Perbarui Kata Sandi
            </button>
          </div>
        </form>
      </div>

      {/* Active Login Sessions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Sesi Perangkat Login Aktif ({sessions.length})
          </h3>
        </div>

        <div className="space-y-3">
          {sessions.map((sess) => (
            <div
              key={sess.id}
              className="p-4 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-between hover:border-slate-300 transition-all shadow-sm"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200/60 flex items-center justify-center text-[#0A2540]">
                  {sess.device.includes("iPhone") ? (
                    <Smartphone className="w-5 h-5" />
                  ) : (
                    <Laptop className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-extrabold text-[#0A2540]">{sess.device}</h4>
                    {sess.isActive && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black border border-emerald-200">
                        Aktif Sekarang
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    {sess.os} • {sess.location} ({sess.ip})
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{sess.lastActive}</p>
                </div>
              </div>

              {!sess.isActive && (
                <button
                  onClick={() => handleTerminateSession(sess.id)}
                  className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-colors"
                  title="Hentikan Sesi Perangkat"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
