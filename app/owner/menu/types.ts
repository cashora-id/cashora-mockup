import { ComponentType } from "react";

export type PeriodType = "today" | "yesterday" | "7d" | "30d";
export type MetricTabType = "sales" | "expenses";

export interface Business {
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

export interface StoreDataVal {
  sales: number;
  salesFormatted: string;
  expenses: number;
  expensesFormatted: string;
}

export interface ChartPoint {
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

export interface PeriodData {
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
  paymentMethods: { method: string; amount: string; percent: number; icon: ComponentType<{ className?: string }> }[];
  expenseCategories: { category: string; amount: string; percent: number; icon: ComponentType<{ className?: string }> }[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: "info" | "warning" | "success";
  store?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "umum" | "laporan" | "pos" | "pembayaran";
}

export interface TourStep {
  targetId: string;
  title: string;
  description: string;
  position: "top" | "bottom" | "left" | "right";
}
