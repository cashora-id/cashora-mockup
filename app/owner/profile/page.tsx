"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Building2,
  ShieldCheck,
  Zap,
  Sparkles,
  CheckCircle2,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Camera
} from "lucide-react";
import { OwnerProfile } from "../menu/types";
import { businesses, ownerName } from "../menu/data";
import { PersonalInfoTab } from "./_components/PersonalInfoTab";
import { BusinessInfoTab } from "./_components/BusinessInfoTab";
import { SecurityTab } from "./_components/SecurityTab";
import { BillingTab } from "./_components/BillingTab";

type ActiveTab = "personal" | "business" | "security" | "billing";

const initialProfile: OwnerProfile = {
  name: ownerName,
  email: "budi.santoso@cashoragroup.id",
  phone: "+62 812-3456-7890",
  address: "Jl. Raya Gubeng No. 48, Surabaya, Jawa Timur 60281",
  role: "Pemilik Utama (Main Owner)",
  avatarCode: "BS",
  joinedDate: "Agustus 2024"
};

export default function OwnerProfilePage() {
  const [profile, setProfile] = useState<OwnerProfile>(initialProfile);
  const [activeTab, setActiveTab] = useState<ActiveTab>("personal");

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* ========== TOP NAVIGATION BAR ========== */}
      <header className="sticky top-0 w-full z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/owner/menu"
              className="p-2 rounded-xl text-slate-500 hover:text-[#0A2540] hover:bg-slate-100 transition-colors flex items-center gap-2 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-xs font-bold text-slate-700 group-hover:text-[#0A2540]">
                Kembali ke Dasbor Utama
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/cashora-logo.png"
                alt="CASHORA Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <span className="text-lg font-extrabold text-[#0A2540] tracking-tight">
                CASHORA<span className="text-[#00C897]">.</span>
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* ========== HERO PROFILE BANNER ========== */}
      <section className="bg-gradient-to-b from-[#0A2540] to-[#0d3154] text-white pt-10 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Glow */}
        <div
          className="absolute -top-24 right-0 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #00C897, transparent 70%)" }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {/* Profile Avatar with Camera Overlay */}
              <div className="relative group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#00C897] text-[#0A2540] flex items-center justify-center font-black text-2xl sm:text-3xl shadow-xl ring-4 ring-white/10 group-hover:scale-105 transition-transform">
                  {profile.avatarCode}
                </div>
                <button
                  onClick={() => alert("Fitur ganti foto profil disimulasikan.")}
                  className="absolute bottom-0 right-0 p-2 rounded-xl bg-[#0A2540] text-[#00C897] border border-slate-700 shadow-lg hover:scale-110 transition-transform"
                  aria-label="Ganti Foto Profil"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {profile.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#00C897]/20 text-[#00C897] text-xs font-extrabold border border-[#00C897]/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Terverifikasi
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-medium flex flex-wrap items-center gap-3">
                  <span>{profile.role}</span>
                  <span className="text-slate-500">•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#00C897]" /> Bergabung sejak {profile.joinedDate}
                  </span>
                </p>
              </div>
            </div>

            {/* License Level Badge */}
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/15 text-right">
              <span className="text-[10px] uppercase font-bold text-slate-300 tracking-wider">Status Lisensi</span>
              <p className="text-sm font-black text-[#00C897] flex items-center justify-end gap-1 mt-0.5">
                <Sparkles className="w-4 h-4" /> Premium Enterprise
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== MAIN CONTENT WITH TABS ========== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80">
          {/* Tab Navigation Buttons */}
          <div className="flex items-center gap-2 border-b border-slate-200/80 pb-4 mb-6 overflow-x-auto no-scrollbar">
            {[
              { id: "personal", label: "Informasi Pribadi", icon: User },
              { id: "business", label: "Profil Bisnis & Outlet", icon: Building2 },
              { id: "security", label: "Keamanan & Sesi", icon: ShieldCheck },
              { id: "billing", label: "Paket & Kuota", icon: Zap },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ActiveTab)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-[#0A2540] text-[#00C897] shadow-md"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#00C897]" : "text-slate-500"}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Active Tab Panel */}
          <div>
            {activeTab === "personal" && (
              <PersonalInfoTab profile={profile} onSave={setProfile} />
            )}

            {activeTab === "business" && (
              <BusinessInfoTab businesses={businesses} />
            )}

            {activeTab === "security" && (
              <SecurityTab />
            )}

            {activeTab === "billing" && (
              <BillingTab />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
