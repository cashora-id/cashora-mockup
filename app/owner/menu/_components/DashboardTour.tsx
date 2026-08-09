"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  CheckCircle2,
  HelpCircle
} from "lucide-react";
import { TourStep } from "../types";

interface DashboardTourProps {
  isActive: boolean;
  onFinish: () => void;
}

const tourSteps: TourStep[] = [
  {
    targetId: "tour-header",
    title: "Header & Notifikasi Sistem",
    description: "Bagian atas dasbor menampilkan identitas pemilik, bantuan cepat, serta lonceng notifikasi real-time untuk memantau transaksi QRIS & alert stok.",
    position: "bottom"
  },
  {
    targetId: "tour-period-kpis",
    title: "Filter Periode & Ringkasan KPI",
    description: "Pilih rentang waktu (Hari Ini, Kemarin, 7 Hari, 30 Hari) untuk melihat total penjualan, beban biaya, laba bersih, dan volume transaksi secara instan.",
    position: "bottom"
  },
  {
    targetId: "tour-chart",
    title: "Grafik Kurva Perbandingan Outlet",
    description: "Visualisasi tren penjualan/pengeluaran multi-toko. Arahkan kursor ke titik node untuk melihat breakdown detail per cabang atau gunakan Toggle Garis di atas.",
    position: "top"
  },
  {
    targetId: "tour-stores",
    title: "Daftar Outlet & Akses POS Kasir",
    description: "Kelola seluruh cabang bisnis Anda. Cari toko, filter berdasarkan status (Aktif / Maintenance), atau klik 'Masuk Kasir POS' untuk membuka sistem kasir.",
    position: "top"
  }
];

export function DashboardTour({ isActive, onFinish }: DashboardTourProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const currentStep = tourSteps[currentStepIndex];

  // Update bounding rect when active or step changes
  useEffect(() => {
    if (!isActive) return;

    const updateRect = () => {
      const el = document.getElementById(currentStep.targetId);
      if (el) {
        const rect = el.getBoundingClientRect();
        setTargetRect(rect);

        // Scroll element into view smoothly if out of viewport
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    updateRect();
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect);

    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
    };
  }, [isActive, currentStepIndex, currentStep]);

  if (!isActive || !targetRect) return null;

  const handleNext = () => {
    if (currentStepIndex < tourSteps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      onFinish();
      setCurrentStepIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  // Tooltip position calculation
  const isTopPos = currentStep.position === "top";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none select-none">
        {/* Highlight Ring around Target Element */}
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            top: targetRect.top - 8,
            left: targetRect.left - 8,
            width: targetRect.width + 16,
            height: targetRect.height + 16,
          }}
          className="absolute rounded-3xl border-2 border-[#00C897] ring-4 ring-[#00C897]/30 shadow-[0_0_50px_rgba(0,200,151,0.35)] pointer-events-none transition-all duration-300"
        />

        {/* Floating Interactive Tooltip Dialog */}
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          style={{
            top: isTopPos
              ? Math.max(20, targetRect.top - 210)
              : Math.min(window.innerHeight - 240, targetRect.bottom + 20),
            left: Math.max(16, Math.min(window.innerWidth - 380, targetRect.left + targetRect.width / 2 - 180)),
          }}
          className="absolute z-50 w-full max-w-sm bg-[#0A2540] text-white p-6 rounded-3xl shadow-2xl border border-slate-700 pointer-events-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-700/80 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#00C897]/20 text-[#00C897] text-[10px] font-black tracking-wider uppercase border border-[#00C897]/40">
                Langkah {currentStepIndex + 1} dari {tourSteps.length}
              </span>
            </div>

            <button
              onClick={onFinish}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Lewati Tur"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <h3 className="text-base font-extrabold text-white mb-1.5 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#00C897]" />
            {currentStep.title}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed mb-5">
            {currentStep.description}
          </p>

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-700/60">
            <button
              onClick={onFinish}
              className="text-xs font-bold text-slate-400 hover:text-slate-200 transition-colors"
            >
              Lewati Tur
            </button>

            <div className="flex items-center gap-2">
              {currentStepIndex > 0 && (
                <button
                  onClick={handlePrev}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Kembali
                </button>
              )}

              <button
                onClick={handleNext}
                className="px-4 py-1.5 rounded-xl bg-[#00C897] hover:bg-[#00b084] text-[#0A2540] text-xs font-black transition-all shadow-md flex items-center gap-1 group"
              >
                {currentStepIndex === tourSteps.length - 1 ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
                  </>
                ) : (
                  <>
                    Lanjut <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
