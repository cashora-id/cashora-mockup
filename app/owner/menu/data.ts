import {
  QrCode,
  Wallet,
  CreditCard,
  ShoppingBag,
  Store,
  Users,
  Receipt
} from "lucide-react";
import { Business, PeriodData, PeriodType, Notification } from "./types";

export const ownerName = "Budi Santoso";

export const STORE_SERIES = [
  { key: "total", label: "Total Combined", color: "#0A2540", strokeWidth: 3.5, isTotal: true },
  { key: "budiRetail", label: "Budi Retail Mart", color: "#3B82F6", strokeWidth: 2.5, isTotal: false },
  { key: "warungPakBudi", label: "Warung Makan Pak Budi", color: "#10B981", strokeWidth: 2.5, isTotal: false },
  { key: "kopiBudi", label: "Kopi Budi Sejahtera", color: "#F59E0B", strokeWidth: 2.5, isTotal: false },
];

export const businesses: Business[] = [
  {
    id: "1",
    name: "Warung Makan Pak Budi",
    type: "Restoran & Kuliner",
    location: "Surabaya Gubeng",
    status: "active",
    onlineStatus: "online",
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
    onlineStatus: "offline",
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
    onlineStatus: "offline",
    category: "cafe",
    todaySales: "Rp 0",
    todayTransactions: 0,
    growth: "0%"
  },
];

export const initialNotifications: Notification[] = [
  {
    id: "notif-1",
    title: "Pembayaran QRIS Berhasil",
    message: "Warung Makan Pak Budi menerima transaksi Rp 185.000 via QRIS TUNTAS.",
    time: "5 menit yang lalu",
    isRead: false,
    type: "success",
    store: "Warung Makan Pak Budi"
  },
  {
    id: "notif-2",
    title: "Peringatan Stok Bahan Baku",
    message: "Stok beras dan bumbu utama di Warung Makan Pak Budi tersisa di bawah 10%.",
    time: "32 menit yang lalu",
    isRead: false,
    type: "warning",
    store: "Warung Makan Pak Budi"
  },
  {
    id: "notif-3",
    title: "Status Sistem POS",
    message: "Sistem POS Kopi Budi Sejahtera dijadwalkan selesai pemeliharaan pukul 15:00 WIB.",
    time: "1 jam yang lalu",
    isRead: false,
    type: "info",
    store: "Kopi Budi Sejahtera"
  },
  {
    id: "notif-4",
    title: "Laporan Harian Siap",
    message: "Laporan keuangan harian Budi Retail Mart tanggal 8 Agustus 2026 telah diarsipkan.",
    time: "3 jam yang lalu",
    isRead: true,
    type: "success",
    store: "Budi Retail Mart"
  }
];

const baseDashboardData: Record<"today" | "yesterday" | "7d" | "30d", PeriodData> = {
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

const makeBusinessPeriod = (periodLabel: string, source: PeriodData, multiplier: number): PeriodData => ({
  ...source,
  periodLabel,
  salesTotal: source.salesTotal,
  expensesTotal: source.expensesTotal,
  netProfit: source.netProfit,
  chartPoints: source.chartPoints.map((point) => ({
    ...point,
    label: point.label,
    totalSales: Math.round(point.totalSales * multiplier),
    totalSalesFormatted: point.totalSalesFormatted,
    totalExpenses: Math.round(point.totalExpenses * multiplier),
    totalExpensesFormatted: point.totalExpensesFormatted,
  })),
});

export const dashboardData: Record<PeriodType, PeriodData> = {
  ...baseDashboardData,
  q1: makeBusinessPeriod("Q1 2026 (Januari – Maret)", baseDashboardData["30d"], 2.9),
  q2: makeBusinessPeriod("Q2 2026 (April – Juni)", baseDashboardData["30d"], 3.2),
  q3: makeBusinessPeriod("Q3 2026 (Juli – September)", baseDashboardData["30d"], 3.5),
  q4: makeBusinessPeriod("Q4 2026 (Oktober – Desember)", baseDashboardData["30d"], 3.8),
  h1: makeBusinessPeriod("Semester 1 2026 (Januari – Juni)", baseDashboardData["30d"], 6.1),
  h2: makeBusinessPeriod("Semester 2 2026 (Juli – Desember)", baseDashboardData["30d"], 6.8),
};
