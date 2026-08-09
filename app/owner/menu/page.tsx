"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  CircleHelp,
  ExternalLink,
  Wrench,
  Plus,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Store,
  Utensils,
  Coffee,
  Search,
  ChevronRight,
  Sparkles,
  DollarSign,
  Users,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  PieChart,
  BarChart3,
  CreditCard,
  QrCode,
  Wallet,
  ShoppingBag,
  Receipt,
  Eye,
  EyeOff,
  Filter
} from "lucide-react";

// --- Types & Interfaces ---
const ownerName = "Budi Santoso";

type PeriodType = "today" | "yesterday" | "7d" | "30d";
type MetricTabType = "sales" | "expenses";

interface Business {
  id: string;
  name: string;
  type: string;
  location: string;
  status: "active" | "maintenance";
  category: "restaurant" | "storefront" | "cafe";
  todaySales: string;
  todayTransactions: number;
  growth: string;
}

interface StoreDataVal {
  sales: number;
  salesFormatted: string;
  expenses: number;
  expensesFormatted: string;
}

interface ChartPoint {
  label: string;
  totalSales: number;
  totalSalesFormatted: string;
  totalExpenses: number;
  totalExpensesFormatted: string;
  stores: {
    budiRetail: StoreDataVal;
    warungPakBudi: StoreDataVal;
    kopiBudi: StoreDataVal;
  };
}

interface PeriodData {
  periodLabel: string;
  salesTotal: string;
  salesGrowth: string;
  expensesTotal: string;
  expensesGrowth: string;
  netProfit: string;
  netMargin: string;
  totalTransactions: number;
  avgOrderValue: string;
  chartPoints: ChartPoint[];
  storeContributions: { name: string; amount: string; percent: number; color: string }[];
  paymentMethods: { method: string; amount: string; percent: number; icon: any }[];
  expenseCategories: { category: string; amount: string; percent: number; icon: any }[];
}

// --- Store Definitions ---
const STORE_SERIES = [
  { key: "total", label: "Total Combined", color: "#0A2540", strokeWidth: 3.5, isTotal: true },
  { key: "budiRetail", label: "Budi Retail Mart", color: "#3B82F6", strokeWidth: 2.5, isTotal: false },
  { key: "warungPakBudi", label: "Warung Makan Pak Budi", color: "#10B981", strokeWidth: 2.5, isTotal: false },
  { key: "kopiBudi", label: "Kopi Budi Sejahtera", color: "#F59E0B", strokeWidth: 2.5, isTotal: false },
];

const businesses: Business[] = [
  {
    id: "1",
    name: "Warung Makan Pak Budi",
    type: "Restoran & Kuliner",
    location: "Surabaya Gubeng",
    status: "active",
    category: "restaurant",
    todaySales: "Rp 3.850.000",
    todayTransactions: 142,
    growth: "+14.2%"
  },
  {
    id: "2",
    name: "Budi Retail Mart",
    type: "Supermarket & Retail",
    location: "Jakarta Pusat",
    status: "active",
    category: "storefront",
    todaySales: "Rp 7.210.000",
    todayTransactions: 289,
    growth: "+8.5%"
  },
  {
    id: "3",
    name: "Kopi Budi Sejahtera",
    type: "Coffee Shop & Bakery",
    location: "Bandung Dago",
    status: "maintenance",
    category: "cafe",
    todaySales: "Rp 0",
    todayTransactions: 0,
    growth: "0%"
  },
];

const dashboardData: Record<PeriodType, PeriodData> = {
  today: {
    periodLabel: "Hari Ini (9 Agustus 2026)",
    salesTotal: "Rp 11.060.000",
    salesGrowth: "+14.2%",
    expensesTotal: "Rp 3.420.000",
    expensesGrowth: "-4.8%",
    netProfit: "Rp 7.640.000",
    netMargin: "69.1%",
    totalTransactions: 431,
    avgOrderValue: "Rp 25.660",
    chartPoints: [
      {
        label: "08:00",
        totalSales: 850000,
        totalSalesFormatted: "Rp 850rb",
        totalExpenses: 320000,
        totalExpensesFormatted: "Rp 320rb",
        stores: {
          budiRetail: { sales: 550000, salesFormatted: "Rp 550rb", expenses: 210000, expensesFormatted: "Rp 210rb" },
          warungPakBudi: { sales: 300000, salesFormatted: "Rp 300rb", expenses: 110000, expensesFormatted: "Rp 110rb" },
          kopiBudi: { sales: 0, salesFormatted: "Rp 0", expenses: 0, expensesFormatted: "Rp 0" }
        }
      },
      {
        label: "10:00",
        totalSales: 1620000,
        totalSalesFormatted: "Rp 1,62Jt",
        totalExpenses: 450000,
        totalExpensesFormatted: "Rp 450rb",
        stores: {
          budiRetail: { sales: 1050000, salesFormatted: "Rp 1,05Jt", expenses: 290000, expensesFormatted: "Rp 290rb" },
          warungPakBudi: { sales: 570000, salesFormatted: "Rp 570rb", expenses: 160000, expensesFormatted: "Rp 160rb" },
          kopiBudi: { sales: 0, salesFormatted: "Rp 0", expenses: 0, expensesFormatted: "Rp 0" }
        }
      },
      {
        label: "12:00",
        totalSales: 2950000,
        totalSalesFormatted: "Rp 2,95Jt",
        totalExpenses: 980000,
        totalExpensesFormatted: "Rp 980rb",
        stores: {
          budiRetail: { sales: 1600000, salesFormatted: "Rp 1,60Jt", expenses: 520000, expensesFormatted: "Rp 520rb" },
          warungPakBudi: { sales: 1350000, salesFormatted: "Rp 1,35Jt", expenses: 460000, expensesFormatted: "Rp 460rb" },
          kopiBudi: { sales: 0, salesFormatted: "Rp 0", expenses: 0, expensesFormatted: "Rp 0" }
        }
      },
      {
        label: "14:00",
        totalSales: 1840000,
        totalSalesFormatted: "Rp 1,84Jt",
        totalExpenses: 510000,
        totalExpensesFormatted: "Rp 510rb",
        stores: {
          budiRetail: { sales: 1240000, salesFormatted: "Rp 1,24Jt", expenses: 340000, expensesFormatted: "Rp 340rb" },
          warungPakBudi: { sales: 600000, salesFormatted: "Rp 600rb", expenses: 170000, expensesFormatted: "Rp 170rb" },
          kopiBudi: { sales: 0, salesFormatted: "Rp 0", expenses: 0, expensesFormatted: "Rp 0" }
        }
      },
      {
        label: "16:00",
        totalSales: 1420000,
        totalSalesFormatted: "Rp 1,42Jt",
        totalExpenses: 390000,
        totalExpensesFormatted: "Rp 390rb",
        stores: {
          budiRetail: { sales: 980000, salesFormatted: "Rp 980rb", expenses: 260000, expensesFormatted: "Rp 260rb" },
          warungPakBudi: { sales: 440000, salesFormatted: "Rp 440rb", expenses: 130000, expensesFormatted: "Rp 130rb" },
          kopiBudi: { sales: 0, salesFormatted: "Rp 0", expenses: 0, expensesFormatted: "Rp 0" }
        }
      },
      {
        label: "18:00",
        totalSales: 2380000,
        totalSalesFormatted: "Rp 2,38Jt",
        totalExpenses: 770000,
        totalExpensesFormatted: "Rp 770rb",
        stores: {
          budiRetail: { sales: 1300000, salesFormatted: "Rp 1,30Jt", expenses: 420000, expensesFormatted: "Rp 420rb" },
          warungPakBudi: { sales: 1080000, salesFormatted: "Rp 1,08Jt", expenses: 350000, expensesFormatted: "Rp 350rb" },
          kopiBudi: { sales: 0, salesFormatted: "Rp 0", expenses: 0, expensesFormatted: "Rp 0" }
        }
      }
    ],
    storeContributions: [
      { name: "Budi Retail Mart", amount: "Rp 7.210.000", percent: 65.2, color: "#3B82F6" },
      { name: "Warung Makan Pak Budi", amount: "Rp 3.850.000", percent: 34.8, color: "#10B981" },
      { name: "Kopi Budi Sejahtera", amount: "Rp 0", percent: 0, color: "#F59E0B" }
    ],
    paymentMethods: [
      { method: "QRIS TUNTAS", amount: "Rp 6.850.000", percent: 62, icon: QrCode },
      { method: "Tunai / Cash", amount: "Rp 3.090.000", percent: 28, icon: Wallet },
      { method: "SoftPOS / Kartu", amount: "Rp 1.120.000", percent: 10, icon: CreditCard }
    ],
    expenseCategories: [
      { category: "Stok Bahan Baku", amount: "Rp 1.880.000", percent: 55, icon: ShoppingBag },
      { category: "Operasional & Sewa", amount: "Rp 750.000", percent: 22, icon: Store },
      { category: "Gaji & Komisi Staff", amount: "Rp 510.000", percent: 15, icon: Users },
      { category: "Listrik, Air & Wi-Fi", amount: "Rp 280.000", percent: 8, icon: Receipt }
    ]
  },
  yesterday: {
    periodLabel: "Kemarin (8 Agustus 2026)",
    salesTotal: "Rp 9.680.000",
    salesGrowth: "+6.1%",
    expensesTotal: "Rp 3.150.000",
    expensesGrowth: "+2.3%",
    netProfit: "Rp 6.530.000",
    netMargin: "67.4%",
    totalTransactions: 382,
    avgOrderValue: "Rp 25.340",
    chartPoints: [
      {
        label: "08:00",
        totalSales: 710000,
        totalSalesFormatted: "Rp 710rb",
        totalExpenses: 290000,
        totalExpensesFormatted: "Rp 290rb",
        stores: {
          budiRetail: { sales: 460000, salesFormatted: "Rp 460rb", expenses: 190000, expensesFormatted: "Rp 190rb" },
          warungPakBudi: { sales: 250000, salesFormatted: "Rp 250rb", expenses: 100000, expensesFormatted: "Rp 100rb" },
          kopiBudi: { sales: 0, salesFormatted: "Rp 0", expenses: 0, expensesFormatted: "Rp 0" }
        }
      },
      {
        label: "10:00",
        totalSales: 1450000,
        totalSalesFormatted: "Rp 1,45Jt",
        totalExpenses: 410000,
        totalExpensesFormatted: "Rp 410rb",
        stores: {
          budiRetail: { sales: 920000, salesFormatted: "Rp 920rb", expenses: 260000, expensesFormatted: "Rp 260rb" },
          warungPakBudi: { sales: 530000, salesFormatted: "Rp 530rb", expenses: 150000, expensesFormatted: "Rp 150rb" },
          kopiBudi: { sales: 0, salesFormatted: "Rp 0", expenses: 0, expensesFormatted: "Rp 0" }
        }
      },
      {
        label: "12:00",
        totalSales: 2610000,
        totalSalesFormatted: "Rp 2,61Jt",
        totalExpenses: 910000,
        totalExpensesFormatted: "Rp 910rb",
        stores: {
          budiRetail: { sales: 1450000, salesFormatted: "Rp 1,45Jt", expenses: 490000, expensesFormatted: "Rp 490rb" },
          warungPakBudi: { sales: 1160000, salesFormatted: "Rp 1,16Jt", expenses: 420000, expensesFormatted: "Rp 420rb" },
          kopiBudi: { sales: 0, salesFormatted: "Rp 0", expenses: 0, expensesFormatted: "Rp 0" }
        }
      },
      {
        label: "14:00",
        totalSales: 1680000,
        totalSalesFormatted: "Rp 1,68Jt",
        totalExpenses: 480000,
        totalExpensesFormatted: "Rp 480rb",
        stores: {
          budiRetail: { sales: 1120000, salesFormatted: "Rp 1,12Jt", expenses: 320000, expensesFormatted: "Rp 320rb" },
          warungPakBudi: { sales: 560000, salesFormatted: "Rp 560rb", expenses: 160000, expensesFormatted: "Rp 160rb" },
          kopiBudi: { sales: 0, salesFormatted: "Rp 0", expenses: 0, expensesFormatted: "Rp 0" }
        }
      },
      {
        label: "16:00",
        totalSales: 1290000,
        totalSalesFormatted: "Rp 1,29Jt",
        totalExpenses: 360000,
        totalExpensesFormatted: "Rp 360rb",
        stores: {
          budiRetail: { sales: 880000, salesFormatted: "Rp 880rb", expenses: 240000, expensesFormatted: "Rp 240rb" },
          warungPakBudi: { sales: 410000, salesFormatted: "Rp 410rb", expenses: 120000, expensesFormatted: "Rp 120rb" },
          kopiBudi: { sales: 0, salesFormatted: "Rp 0", expenses: 0, expensesFormatted: "Rp 0" }
        }
      },
      {
        label: "18:00",
        totalSales: 1940000,
        totalSalesFormatted: "Rp 1,94Jt",
        totalExpenses: 700000,
        totalExpensesFormatted: "Rp 700rb",
        stores: {
          budiRetail: { sales: 1300000, salesFormatted: "Rp 1,30Jt", expenses: 440000, expensesFormatted: "Rp 440rb" },
          warungPakBudi: { sales: 640000, salesFormatted: "Rp 640rb", expenses: 260000, expensesFormatted: "Rp 260rb" },
          kopiBudi: { sales: 0, salesFormatted: "Rp 0", expenses: 0, expensesFormatted: "Rp 0" }
        }
      }
    ],
    storeContributions: [
      { name: "Budi Retail Mart", amount: "Rp 6.130.000", percent: 63.3, color: "#3B82F6" },
      { name: "Warung Makan Pak Budi", amount: "Rp 3.550.000", percent: 36.7, color: "#10B981" },
      { name: "Kopi Budi Sejahtera", amount: "Rp 0", percent: 0, color: "#F59E0B" }
    ],
    paymentMethods: [
      { method: "QRIS TUNTAS", amount: "Rp 5.808.000", percent: 60, icon: QrCode },
      { method: "Tunai / Cash", amount: "Rp 2.904.000", percent: 30, icon: Wallet },
      { method: "SoftPOS / Kartu", amount: "Rp 968.000", percent: 10, icon: CreditCard }
    ],
    expenseCategories: [
      { category: "Stok Bahan Baku", amount: "Rp 1.638.000", percent: 52, icon: ShoppingBag },
      { category: "Operasional & Sewa", amount: "Rp 787.500", percent: 25, icon: Store },
      { category: "Gaji & Komisi Staff", amount: "Rp 472.500", percent: 15, icon: Users },
      { category: "Listrik, Air & Wi-Fi", amount: "Rp 252.000", percent: 8, icon: Receipt }
    ]
  },
  "7d": {
    periodLabel: "7 Hari Terakhir (3 - 9 Agustus 2026)",
    salesTotal: "Rp 74.240.000",
    salesGrowth: "+18.5%",
    expensesTotal: "Rp 22.840.000",
    expensesGrowth: "-1.2%",
    netProfit: "Rp 51.400.000",
    netMargin: "69.2%",
    totalTransactions: 2910,
    avgOrderValue: "Rp 25.510",
    chartPoints: [
      {
        label: "Senin 3",
        totalSales: 9200000,
        totalSalesFormatted: "Rp 9,2Jt",
        totalExpenses: 2800000,
        totalExpensesFormatted: "Rp 2,8Jt",
        stores: {
          budiRetail: { sales: 5880000, salesFormatted: "Rp 5.88Jt", expenses: 1790000, expensesFormatted: "Rp 1.79Jt" },
          warungPakBudi: { sales: 3320000, salesFormatted: "Rp 3.32Jt", expenses: 1010000, expensesFormatted: "Rp 1.01Jt" },
          kopiBudi: { sales: 0, salesFormatted: "Rp 0", expenses: 0, expensesFormatted: "Rp 0" }
        }
      },
      {
        label: "Selasa 4",
        totalSales: 10500000,
        totalSalesFormatted: "Rp 10,5Jt",
        totalExpenses: 3100000,
        totalExpensesFormatted: "Rp 3,1Jt",
        stores: {
          budiRetail: { sales: 6720000, salesFormatted: "Rp 6.72Jt", expenses: 1980000, expensesFormatted: "Rp 1.98Jt" },
          warungPakBudi: { sales: 3780000, salesFormatted: "Rp 3.78Jt", expenses: 1120000, expensesFormatted: "Rp 1.12Jt" },
          kopiBudi: { sales: 0, salesFormatted: "Rp 0", expenses: 0, expensesFormatted: "Rp 0" }
        }
      },
      {
        label: "Rabu 5",
        totalSales: 8700000,
        totalSalesFormatted: "Rp 8,7Jt",
        totalExpenses: 2900000,
        totalExpensesFormatted: "Rp 2,9Jt",
        stores: {
          budiRetail: { sales: 5220000, salesFormatted: "Rp 5.22Jt", expenses: 1740000, expensesFormatted: "Rp 1.74Jt" },
          warungPakBudi: { sales: 3480000, salesFormatted: "Rp 3.48Jt", expenses: 1160000, expensesFormatted: "Rp 1.16Jt" },
          kopiBudi: { sales: 0, salesFormatted: "Rp 0", expenses: 0, expensesFormatted: "Rp 0" }
        }
      },
      {
        label: "Kamis 6",
        totalSales: 11800000,
        totalSalesFormatted: "Rp 11,8Jt",
        totalExpenses: 3500000,
        totalExpensesFormatted: "Rp 3,5Jt",
        stores: {
          budiRetail: { sales: 7552000, salesFormatted: "Rp 7.55Jt", expenses: 2240000, expensesFormatted: "Rp 2.24Jt" },
          warungPakBudi: { sales: 4248000, salesFormatted: "Rp 4.24Jt", expenses: 1260000, expensesFormatted: "Rp 1.26Jt" },
          kopiBudi: { sales: 0, salesFormatted: "Rp 0", expenses: 0, expensesFormatted: "Rp 0" }
        }
      },
      {
        label: "Jumat 7",
        totalSales: 12400000,
        totalSalesFormatted: "Rp 12,4Jt",
        totalExpenses: 3600000,
        totalExpensesFormatted: "Rp 3,6Jt",
        stores: {
          budiRetail: { sales: 7936000, salesFormatted: "Rp 7.93Jt", expenses: 2304000, expensesFormatted: "Rp 2.30Jt" },
          warungPakBudi: { sales: 4464000, salesFormatted: "Rp 4.46Jt", expenses: 1296000, expensesFormatted: "Rp 1.29Jt" },
          kopiBudi: { sales: 0, salesFormatted: "Rp 0", expenses: 0, expensesFormatted: "Rp 0" }
        }
      },
      {
        label: "Sabtu 8",
        totalSales: 10580000,
        totalSalesFormatted: "Rp 10,5Jt",
        totalExpenses: 3520000,
        totalExpensesFormatted: "Rp 3,5Jt",
        stores: {
          budiRetail: { sales: 6771200, salesFormatted: "Rp 6.77Jt", expenses: 2252800, expensesFormatted: "Rp 2.25Jt" },
          warungPakBudi: { sales: 3808800, salesFormatted: "Rp 3.80Jt", expenses: 1267200, expensesFormatted: "Rp 1.26Jt" },
          kopiBudi: { sales: 0, salesFormatted: "Rp 0", expenses: 0, expensesFormatted: "Rp 0" }
        }
      },
      {
        label: "Minggu 9",
        totalSales: 11060000,
        totalSalesFormatted: "Rp 11,0Jt",
        totalExpenses: 3420000,
        totalExpensesFormatted: "Rp 3,4Jt",
        stores: {
          budiRetail: { sales: 7210000, salesFormatted: "Rp 7.21Jt", expenses: 2230000, expensesFormatted: "Rp 2.23Jt" },
          warungPakBudi: { sales: 3850000, salesFormatted: "Rp 3.85Jt", expenses: 1190000, expensesFormatted: "Rp 1.19Jt" },
          kopiBudi: { sales: 0, salesFormatted: "Rp 0", expenses: 0, expensesFormatted: "Rp 0" }
        }
      }
    ],
    storeContributions: [
      { name: "Budi Retail Mart", amount: "Rp 47.500.000", percent: 64.0, color: "#3B82F6" },
      { name: "Warung Makan Pak Budi", amount: "Rp 26.740.000", percent: 36.0, color: "#10B981" },
      { name: "Kopi Budi Sejahtera", amount: "Rp 0", percent: 0, color: "#F59E0B" }
    ],
    paymentMethods: [
      { method: "QRIS TUNTAS", amount: "Rp 48.256.000", percent: 65, icon: QrCode },
      { method: "Tunai / Cash", amount: "Rp 18.560.000", percent: 25, icon: Wallet },
      { method: "SoftPOS / Kartu", amount: "Rp 7.424.000", percent: 10, icon: CreditCard }
    ],
    expenseCategories: [
      { category: "Stok Bahan Baku", amount: "Rp 12.562.000", percent: 55, icon: ShoppingBag },
      { category: "Operasional & Sewa", amount: "Rp 4.568.000", percent: 20, icon: Store },
      { category: "Gaji & Komisi Staff", amount: "Rp 3.882.800", percent: 17, icon: Users },
      { category: "Listrik, Air & Wi-Fi", amount: "Rp 1.827.200", percent: 8, icon: Receipt }
    ]
  },
  "30d": {
    periodLabel: "30 Hari Terakhir (10 Juli - 9 Agustus 2026)",
    salesTotal: "Rp 318.500.000",
    salesGrowth: "+22.4%",
    expensesTotal: "Rp 98.400.000",
    expensesGrowth: "+4.1%",
    netProfit: "Rp 220.100.000",
    netMargin: "69.1%",
    totalTransactions: 12480,
    avgOrderValue: "Rp 25.520",
    chartPoints: [
      {
        label: "W1 (10-16 Jul)",
        totalSales: 72500000,
        totalSalesFormatted: "Rp 72,5Jt",
        totalExpenses: 22800000,
        totalExpensesFormatted: "Rp 22,8Jt",
        stores: {
          budiRetail: { sales: 46400000, salesFormatted: "Rp 46,4Jt", expenses: 14592000, expensesFormatted: "Rp 14,5Jt" },
          warungPakBudi: { sales: 26100000, salesFormatted: "Rp 26,1Jt", expenses: 8208000, expensesFormatted: "Rp 8,2Jt" },
          kopiBudi: { sales: 0, salesFormatted: "Rp 0", expenses: 0, expensesFormatted: "Rp 0" }
        }
      },
      {
        label: "W2 (17-23 Jul)",
        totalSales: 78100000,
        totalSalesFormatted: "Rp 78,1Jt",
        totalExpenses: 24100000,
        totalExpensesFormatted: "Rp 24,1Jt",
        stores: {
          budiRetail: { sales: 49984000, salesFormatted: "Rp 49,9Jt", expenses: 15424000, expensesFormatted: "Rp 15,4Jt" },
          warungPakBudi: { sales: 28116000, salesFormatted: "Rp 28,1Jt", expenses: 8676000, expensesFormatted: "Rp 8,6Jt" },
          kopiBudi: { sales: 0, salesFormatted: "Rp 0", expenses: 0, expensesFormatted: "Rp 0" }
        }
      },
      {
        label: "W3 (24-30 Jul)",
        totalSales: 81400000,
        totalSalesFormatted: "Rp 81,4Jt",
        totalExpenses: 25300000,
        totalExpensesFormatted: "Rp 25,3Jt",
        stores: {
          budiRetail: { sales: 52096000, salesFormatted: "Rp 52,0Jt", expenses: 16192000, expensesFormatted: "Rp 16,1Jt" },
          warungPakBudi: { sales: 29304000, salesFormatted: "Rp 29,3Jt", expenses: 9108000, expensesFormatted: "Rp 9,1Jt" },
          kopiBudi: { sales: 0, salesFormatted: "Rp 0", expenses: 0, expensesFormatted: "Rp 0" }
        }
      },
      {
        label: "W4 (31 Jul-9 Aug)",
        totalSales: 86500000,
        totalSalesFormatted: "Rp 86,5Jt",
        totalExpenses: 26200000,
        totalExpensesFormatted: "Rp 26,2Jt",
        stores: {
          budiRetail: { sales: 55360000, salesFormatted: "Rp 55,3Jt", expenses: 16768000, expensesFormatted: "Rp 16,7Jt" },
          warungPakBudi: { sales: 31140000, salesFormatted: "Rp 31,1Jt", expenses: 9432000, expensesFormatted: "Rp 9,4Jt" },
          kopiBudi: { sales: 0, salesFormatted: "Rp 0", expenses: 0, expensesFormatted: "Rp 0" }
        }
      }
    ],
    storeContributions: [
      { name: "Budi Retail Mart", amount: "Rp 203.840.000", percent: 64.0, color: "#3B82F6" },
      { name: "Warung Makan Pak Budi", amount: "Rp 114.660.000", percent: 36.0, color: "#10B981" },
      { name: "Kopi Budi Sejahtera", amount: "Rp 0", percent: 0, color: "#F59E0B" }
    ],
    paymentMethods: [
      { method: "QRIS TUNTAS", amount: "Rp 203.840.000", percent: 64, icon: QrCode },
      { method: "Tunai / Cash", amount: "Rp 82.810.000", percent: 26, icon: Wallet },
      { method: "SoftPOS / Kartu", amount: "Rp 31.850.000", percent: 10, icon: CreditCard }
    ],
    expenseCategories: [
      { category: "Stok Bahan Baku", amount: "Rp 53.136.000", percent: 54, icon: ShoppingBag },
      { category: "Operasional & Sewa", amount: "Rp 20.664.000", percent: 21, icon: Store },
      { category: "Gaji & Komisi Staff", amount: "Rp 16.728.000", percent: 17, icon: Users },
      { category: "Listrik, Air & Wi-Fi", amount: "Rp 7.872.000", percent: 8, icon: Receipt }
    ]
  }
};

export default function OwnerMenuPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>("today");
  const [activeMetricTab, setActiveMetricTab] = useState<MetricTabType>("sales");
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

  // Line Visibility Toggles
  const [visibleLines, setVisibleLines] = useState<Record<string, boolean>>({
    total: true,
    budiRetail: true,
    warungPakBudi: true,
    kopiBudi: true,
  });

  // Business List States
  const [businessList] = useState<Business[]>(businesses);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStoreTab, setActiveStoreTab] = useState<"all" | "active" | "maintenance">("all");

  const activeData = dashboardData[selectedPeriod];

  const toggleLineVisibility = (key: string) => {
    setVisibleLines((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredBusinesses = businessList.filter((b) => {
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.location.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeStoreTab === "active") return matchesSearch && b.status === "active";
    if (activeStoreTab === "maintenance") return matchesSearch && b.status === "maintenance";
    return matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "restaurant":
        return <Utensils className="w-5 h-5 text-emerald-600" />;
      case "cafe":
        return <Coffee className="w-5 h-5 text-amber-600" />;
      default:
        return <Store className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* ========== TOP NAVBAR ========== */}
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

          <div className="flex items-center gap-3">
            <button
              aria-label="Notifikasi"
              className="relative p-2 rounded-xl text-slate-500 hover:text-[#0A2540] hover:bg-slate-100 transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#00C897] ring-2 ring-white animate-pulse" />
            </button>
            <button
              aria-label="Bantuan"
              className="p-2 rounded-xl text-slate-500 hover:text-[#0A2540] hover:bg-slate-100 transition-colors"
            >
              <CircleHelp className="w-5 h-5" />
            </button>
            <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />
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

      {/* ========== HERO BANNER & PERIOD SELECTOR ========== */}
      <section className="bg-gradient-to-b from-[#0A2540] to-[#0d3154] text-white pt-8 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Glow */}
        <div
          className="absolute -top-24 right-0 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #00C897, transparent 70%)" }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#00C897] text-xs font-semibold border border-white/10 mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Dasbor Agregat & Kurva Multi-Toko
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Ringkasan Kinerja Bisnis
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                {activeData.periodLabel}
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 flex flex-wrap gap-1">
              {[
                { id: "today", label: "Hari Ini" },
                { id: "yesterday", label: "Kemarin" },
                { id: "7d", label: "7 Hari Terakhir" },
                { id: "30d", label: "30 Hari Terakhir" },
              ].map((period) => (
                <button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id as PeriodType)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedPeriod === period.id
                      ? "bg-[#00C897] text-[#0A2540] shadow-md shadow-emerald-500/20 scale-105"
                      : "text-slate-200 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>

          {/* ========== KPI CARDS GRID ========== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Total Sales */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-300">Total Penjualan</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-[#00C897] flex items-center justify-center">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-black text-white tracking-tight">{activeData.salesTotal}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-xs font-extrabold text-[#00C897] flex items-center gap-0.5">
                    <TrendingUp className="w-3.5 h-3.5" /> {activeData.salesGrowth}
                  </span>
                  <span className="text-[11px] text-slate-400">vs periode lalu</span>
                </div>
              </div>
            </div>

            {/* Card 2: Total Expenses */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-300">Total Pengeluaran</span>
                <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                  <Receipt className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-black text-white tracking-tight">{activeData.expensesTotal}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-xs font-extrabold text-rose-400 flex items-center gap-0.5">
                    <TrendingDown className="w-3.5 h-3.5" /> {activeData.expensesGrowth}
                  </span>
                  <span className="text-[11px] text-slate-400">efisiensi biaya</span>
                </div>
              </div>
            </div>

            {/* Card 3: Net Profit */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-300">Laba Bersih</span>
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <PieChart className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-black text-white tracking-tight">{activeData.netProfit}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-400/20 text-blue-300">
                    Margin {activeData.netMargin}
                  </span>
                </div>
              </div>
            </div>

            {/* Card 4: Total Transactions */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-300">Volume Transaksi</span>
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-black text-white tracking-tight">{activeData.totalTransactions} Transaksi</p>
                <p className="text-xs text-slate-300 mt-1">
                  Rata-rata: <span className="font-bold text-white">{activeData.avgOrderValue}</span> / order
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== MULTI-LINE SVG CHART & BREAKDOWN SECTION ========== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 pb-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 mb-10">
          {/* Chart Header & Toggles */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#0A2540] tracking-tight">
                Perbandingan Grafik Kurva per Toko
              </h2>
              <p className="text-xs text-slate-500">
                Bandingkan tren {activeMetricTab === "sales" ? "penjualan" : "pengeluaran"} individual toko dengan garis total agregat
              </p>
            </div>

            {/* Penjualan vs Pengeluaran Tabs */}
            <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl w-fit">
              <button
                onClick={() => setActiveMetricTab("sales")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                  activeMetricTab === "sales"
                    ? "bg-[#0A2540] text-[#00C897] shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 text-[#00C897]" />
                Penjualan
              </button>
              <button
                onClick={() => setActiveMetricTab("expenses")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                  activeMetricTab === "expenses"
                    ? "bg-[#0A2540] text-rose-400 shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
                Pengeluaran
              </button>
            </div>
          </div>

          {/* Clickable Legend Pills (Line Visibility Toggles) */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Toggle Garis:
            </span>

            {STORE_SERIES.map((s) => {
              const isVisible = visibleLines[s.key];
              return (
                <button
                  key={s.key}
                  onClick={() => toggleLineVisibility(s.key)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    isVisible
                      ? "bg-slate-50 border-slate-300 text-slate-800 shadow-sm"
                      : "bg-slate-100/60 border-slate-200 text-slate-400 opacity-60 line-through"
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: s.color }}
                  />
                  <span>{s.label}</span>
                  {isVisible ? (
                    <Eye className="w-3 h-3 text-slate-500" />
                  ) : (
                    <EyeOff className="w-3 h-3 text-slate-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Multi-Line SVG Chart */}
          <div className="relative w-full h-72 sm:h-80 mb-8 bg-slate-50/70 rounded-2xl p-4 border border-slate-100">
            <MultiLineSvgChart
              points={activeData.chartPoints}
              activeTab={activeMetricTab}
              visibleLines={visibleLines}
              hoveredIndex={hoveredPointIndex}
              onHover={setHoveredPointIndex}
            />
          </div>

          {/* Contextual Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            {/* Left Breakdown: Store Contributions / Expense Categories */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-extrabold text-[#0A2540]">
                  {activeMetricTab === "sales" ? "Kontribusi Penjualan per Toko" : "Rincian Kategori Pengeluaran"}
                </h3>
                <span className="text-[11px] font-bold text-slate-400">Distribusi %</span>
              </div>

              <div className="space-y-3.5">
                {activeMetricTab === "sales"
                  ? activeData.storeContributions.map((store) => (
                      <div key={store.name}>
                        <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                          <span className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: store.color }} />
                            {store.name}
                          </span>
                          <span className="font-bold text-[#0A2540]">{store.amount} ({store.percent}%)</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${store.percent}%`, backgroundColor: store.color }}
                          />
                        </div>
                      </div>
                    ))
                  : activeData.expenseCategories.map((exp) => (
                      <div key={exp.category} className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200/60">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center">
                            <exp.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#0A2540]">{exp.category}</p>
                            <p className="text-[10px] text-slate-400">{exp.percent}% dari total beban</p>
                          </div>
                        </div>
                        <p className="text-xs font-extrabold text-slate-800">{exp.amount}</p>
                      </div>
                    ))}
              </div>
            </div>

            {/* Right Breakdown: Payment Methods / Financial Summary */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-extrabold text-[#0A2540]">
                  {activeMetricTab === "sales" ? "Kanal & Metode Pembayaran" : "Statistik Efisiensi Operasional"}
                </h3>
                <span className="text-[11px] font-bold text-slate-400">Total Sah</span>
              </div>

              {activeMetricTab === "sales" ? (
                <div className="space-y-3">
                  {activeData.paymentMethods.map((pay) => (
                    <div key={pay.method} className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200/60">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#0A2540] text-[#00C897] flex items-center justify-center">
                          <pay.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#0A2540]">{pay.method}</p>
                          <p className="text-[10px] font-semibold text-emerald-600">{pay.percent}% dari total transaksi</p>
                        </div>
                      </div>
                      <p className="text-xs font-extrabold text-[#0A2540]">{pay.amount}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-4 bg-white rounded-xl border border-slate-200/60 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#0A2540]">Rasio Beban Operasional</p>
                      <p className="text-[11px] text-slate-500">Beban / Total Penjualan</p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-extrabold rounded-full">
                      30.9% (Sangat Sehat)
                    </span>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-slate-200/60 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#0A2540]">Penghematan Multi-Cabang</p>
                      <p className="text-[11px] text-slate-500">Tanpa Biaya Tambahan Per Outlet</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-extrabold rounded-full">
                      Rp 4.500.000 / bln
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========== STORE SEARCH & BENTO GRID SECTION ========== */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#0A2540] tracking-tight">Daftar Toko & Outlet Anda</h2>
            <p className="text-xs text-slate-500">Pilih toko untuk mengelola setting & sistem kasir</p>
          </div>

          <div className="flex items-center gap-2">
            {/* Tabs */}
            <div className="flex items-center gap-1 bg-slate-200/60 p-1 rounded-xl">
              <button
                onClick={() => setActiveStoreTab("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeStoreTab === "all" ? "bg-white text-[#0A2540] shadow-sm" : "text-slate-600"
                }`}
              >
                Semua ({businessList.length})
              </button>
              <button
                onClick={() => setActiveStoreTab("active")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeStoreTab === "active" ? "bg-white text-emerald-700 shadow-sm" : "text-slate-600"
                }`}
              >
                Aktif ({businessList.filter((b) => b.status === "active").length})
              </button>
              <button
                onClick={() => setActiveStoreTab("maintenance")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeStoreTab === "maintenance" ? "bg-white text-amber-700 shadow-sm" : "text-slate-600"
                }`}
              >
                Maintenance ({businessList.filter((b) => b.status === "maintenance").length})
              </button>
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative mb-6">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama toko atau kota..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200/80 rounded-2xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00C897]/50 shadow-sm transition-all"
          />
        </div>

        {/* Business Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((biz) => (
            <BusinessCard key={biz.id} business={biz} getIcon={getCategoryIcon} />
          ))}

          {/* Add New Business Card */}
          <div className="group flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-dashed border-slate-300 hover:border-[#00C897] bg-white hover:bg-emerald-50/30 transition-all duration-300 min-h-[260px] text-center shadow-sm hover:shadow-md cursor-pointer">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#00C897] border border-emerald-100 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-[#00C897] group-hover:text-white transition-all duration-300 shadow-sm">
              <Plus className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-[#0A2540] mb-1">Daftarkan Toko Baru</h3>
            <p className="text-xs text-slate-500 max-w-xs mb-4">
              Miliki cabang atau konsep bisnis baru? Tambahkan ke portal owner.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#00C897] group-hover:underline">
              Tambah Profil Bisnis <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Support Banner */}
        <div className="mt-12 rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-sm relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4 max-w-2xl">
            <div className="w-12 h-12 rounded-2xl bg-[#0A2540] text-[#00C897] flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#0A2540] mb-1">
                Butuh bantuan mengoptimalkan laporan keuangan multi-toko?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Tim Support Spesialis Cashora siap mendampingi pengaturan integrasi laporan & kasir POS secara gratis.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full lg:w-auto">
            <Link
              href="/kontak"
              className="w-full lg:w-auto text-center px-5 py-3 rounded-xl bg-[#0A2540] text-white font-bold text-xs sm:text-sm hover:bg-slate-800 transition-colors"
            >
              Hubungi CS Support
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- Multi-Line SVG Chart Component ---
function MultiLineSvgChart({
  points,
  activeTab,
  visibleLines,
  hoveredIndex,
  onHover,
}: {
  points: ChartPoint[];
  activeTab: MetricTabType;
  visibleLines: Record<string, boolean>;
  hoveredIndex: number | null;
  onHover: (idx: number | null) => void;
}) {
  const isSales = activeTab === "sales";

  // Calculate Max Value across all series to normalize scaling
  let allVals: number[] = [];
  points.forEach((p) => {
    if (isSales) {
      allVals.push(p.totalSales, p.stores.budiRetail.sales, p.stores.warungPakBudi.sales, p.stores.kopiBudi.sales);
    } else {
      allVals.push(p.totalExpenses, p.stores.budiRetail.expenses, p.stores.warungPakBudi.expenses, p.stores.kopiBudi.expenses);
    }
  });

  const maxVal = Math.max(...allVals, 1) * 1.15;
  const minVal = 0;

  const width = 700;
  const height = 220;
  const paddingX = 40;
  const paddingY = 30;

  // Helper to get series value for a point
  const getVal = (pt: ChartPoint, seriesKey: string): number => {
    if (seriesKey === "total") return isSales ? pt.totalSales : pt.totalExpenses;
    if (seriesKey === "budiRetail") return isSales ? pt.stores.budiRetail.sales : pt.stores.budiRetail.expenses;
    if (seriesKey === "warungPakBudi") return isSales ? pt.stores.warungPakBudi.sales : pt.stores.warungPakBudi.expenses;
    if (seriesKey === "kopiBudi") return isSales ? pt.stores.kopiBudi.sales : pt.stores.kopiBudi.expenses;
    return 0;
  };

  // Build Bezier Path string for a series
  const buildPath = (seriesKey: string) => {
    const coords = points.map((pt, idx) => {
      const x = paddingX + (idx / (points.length - 1 || 1)) * (width - 2 * paddingX);
      const val = getVal(pt, seriesKey);
      const y = height - paddingY - ((val - minVal) / (maxVal - minVal)) * (height - 2 * paddingY);
      return { x, y };
    });

    if (coords.length === 0) return "";
    let d = `M ${coords[0].x} ${coords[0].y}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const curr = coords[i];
      const next = coords[i + 1];
      const cpX = (curr.x + next.x) / 2;
      d += ` C ${cpX} ${curr.y}, ${cpX} ${next.y}, ${next.x} ${next.y}`;
    }
    return { d, coords };
  };

  // Build Area Path for Total Line
  const totalPathData = buildPath("total");
  const totalAreaD = totalPathData.coords && totalPathData.coords.length > 0
    ? `${totalPathData.d} L ${totalPathData.coords[totalPathData.coords.length - 1].x} ${height - paddingY} L ${totalPathData.coords[0].x} ${height - paddingY} Z`
    : "";

  const activeHoverPt = hoveredIndex !== null ? points[hoveredIndex] : null;
  const activeHoverX = hoveredIndex !== null
    ? paddingX + (hoveredIndex / (points.length - 1 || 1)) * (width - 2 * paddingX)
    : 0;

  return (
    <div className="w-full h-full relative flex flex-col justify-between">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="multiChartGradientSales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0A2540" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0A2540" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="multiChartGradientExpenses" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal Grid lines */}
        {[0.2, 0.5, 0.8].map((ratio) => {
          const yPos = height - paddingY - ratio * (height - 2 * paddingY);
          return (
            <line
              key={ratio}
              x1={paddingX}
              y1={yPos}
              x2={width - paddingX}
              y2={yPos}
              stroke="#E2E8F0"
              strokeDasharray="4 4"
              strokeWidth="1"
            />
          );
        })}

        {/* Shaded Area Fill under Total Line */}
        {visibleLines.total && (
          <path
            d={totalAreaD}
            fill={isSales ? "url(#multiChartGradientSales)" : "url(#multiChartGradientExpenses)"}
            className="transition-all duration-500"
          />
        )}

        {/* Render Each Enabled Store Line */}
        {STORE_SERIES.map((s) => {
          if (!visibleLines[s.key]) return null;
          const { d, coords } = buildPath(s.key);
          const isTotal = s.isTotal;

          return (
            <g key={s.key}>
              <path
                d={d}
                fill="none"
                stroke={s.color}
                strokeWidth={isTotal ? "3.5" : "2.5"}
                strokeDasharray={isTotal ? undefined : "none"}
                strokeLinecap="round"
                className="transition-all duration-500"
              />

              {/* Data Point Nodes for this line */}
              {coords.map((c, idx) => (
                <circle
                  key={idx}
                  cx={c.x}
                  cy={c.y}
                  r={hoveredIndex === idx ? (isTotal ? "6" : "5") : (isTotal ? "4" : "3")}
                  fill={s.color}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  className="transition-all duration-200 cursor-pointer"
                  onMouseEnter={() => onHover(idx)}
                />
              ))}
            </g>
          );
        })}

        {/* Hover Vertical Guideline */}
        {hoveredIndex !== null && (
          <line
            x1={activeHoverX}
            y1={paddingY}
            x2={activeHoverX}
            y2={height - paddingY}
            stroke="#0A2540"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        )}
      </svg>

      {/* Multi-Series Hover Tooltip */}
      {hoveredIndex !== null && activeHoverPt && (
        <div
          className="absolute z-30 bg-[#0A2540] text-white p-3 rounded-2xl shadow-2xl border border-slate-700 pointer-events-none transform -translate-x-1/2 -translate-y-full transition-all duration-150 min-w-[210px]"
          style={{
            left: `${(activeHoverX / width) * 100}%`,
            top: `20%`,
          }}
        >
          <div className="flex items-center justify-between border-b border-slate-700 pb-1.5 mb-2">
            <span className="text-[11px] font-bold text-slate-300">{activeHoverPt.label}</span>
            <span className="text-[10px] font-extrabold text-[#00C897]">
              {isSales ? activeHoverPt.totalSalesFormatted : activeHoverPt.totalExpensesFormatted} Total
            </span>
          </div>

          <div className="space-y-1.5 text-[10px]">
            <div className="flex items-center justify-between text-blue-300 font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Budi Retail Mart:
              </span>
              <span className="font-extrabold text-white">
                {isSales ? activeHoverPt.stores.budiRetail.salesFormatted : activeHoverPt.stores.budiRetail.expensesFormatted}
              </span>
            </div>

            <div className="flex items-center justify-between text-emerald-300 font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Warung Pak Budi:
              </span>
              <span className="font-extrabold text-white">
                {isSales ? activeHoverPt.stores.warungPakBudi.salesFormatted : activeHoverPt.stores.warungPakBudi.expensesFormatted}
              </span>
            </div>

            <div className="flex items-center justify-between text-amber-300 font-semibold opacity-70">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Kopi Budi Sejahtera:
              </span>
              <span className="font-extrabold text-white">
                {isSales ? activeHoverPt.stores.kopiBudi.salesFormatted : activeHoverPt.stores.kopiBudi.expensesFormatted}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* X-Axis Labels */}
      <div className="flex justify-between px-6 pt-2 text-[11px] font-bold text-slate-500">
        {points.map((pt, i) => (
          <span
            key={i}
            className={`cursor-pointer transition-colors ${
              hoveredIndex === i ? "text-[#0A2540] underline font-extrabold" : ""
            }`}
            onMouseEnter={() => onHover(i)}
            onMouseLeave={() => onHover(null)}
          >
            {pt.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// --- Enhanced Business Card Component ---
function BusinessCard({
  business,
  getIcon,
}: {
  business: Business;
  getIcon: (cat: string) => React.ReactNode;
}) {
  const isActive = business.status === "active";

  return (
    <div
      className={`group flex flex-col bg-white rounded-3xl border border-slate-200/80 hover:border-[#00C897] transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 h-full ${
        !isActive ? "bg-slate-50/50" : ""
      }`}
    >
      {/* Top accent bar */}
      <div
        className={`h-1.5 w-full ${
          isActive ? "bg-gradient-to-r from-[#00C897] to-emerald-400" : "bg-slate-300"
        }`}
      />

      <div className="p-6 flex-1 flex flex-col">
        {/* Header: Icon + Badge */}
        <div className="flex justify-between items-start mb-5">
          <div className="w-12 h-12 p-3 rounded-2xl bg-slate-100 border border-slate-200/60 flex items-center justify-center group-hover:scale-105 transition-transform">
            {getIcon(business.category)}
          </div>

          {isActive ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold border border-emerald-200/60">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Aktif POS
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-extrabold border border-amber-200/60">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              Maintenance
            </span>
          )}
        </div>

        {/* Business Title & Info */}
        <h3
          className={`text-lg font-bold mb-1 line-clamp-1 group-hover:text-[#00C897] transition-colors ${
            isActive ? "text-[#0A2540]" : "text-slate-500"
          }`}
        >
          {business.name}
        </h3>
        <p className="text-xs font-medium text-slate-500 mb-6 flex items-center gap-1.5">
          <span>{business.type}</span>
          <span className="text-slate-300">•</span>
          <span>{business.location}</span>
        </p>

        {/* Sales Mini Metrics */}
        {isActive ? (
          <div className="mt-auto bg-slate-50 rounded-2xl p-3.5 border border-slate-100 mb-6 grid grid-cols-2 gap-2">
            <div>
              <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">Penjualan Hari Ini</p>
              <p className="text-sm font-extrabold text-[#0A2540]">{business.todaySales}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">Transaksi</p>
              <div className="flex items-center justify-between">
                <p className="text-sm font-extrabold text-[#0A2540]">{business.todayTransactions}x</p>
                <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" /> {business.growth}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-auto bg-amber-50/50 rounded-2xl p-3.5 border border-amber-100 mb-6 text-center">
            <p className="text-xs font-semibold text-amber-800">
              Sistem Dalam Pemeliharaan
            </p>
            <p className="text-[11px] text-amber-600/80 mt-0.5">
              Transaksi sementara ditangguhkan
            </p>
          </div>
        )}
      </div>

      {/* Footer Action Button */}
      <div className="px-6 pb-6 pt-0 mt-auto">
        {isActive ? (
          <Link
            href={`/owner/menu`}
            className="w-full bg-[#0A2540] hover:bg-[#00C897] text-white hover:text-[#0A2540] text-sm font-bold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group/btn shadow-md shadow-slate-900/10"
          >
            Masuk Kasir POS
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <button
            disabled
            className="w-full bg-slate-100 border border-slate-200 text-slate-400 text-sm font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed"
          >
            Sistem Maintenance
          </button>
        )}
      </div>
    </div>
  );
}
