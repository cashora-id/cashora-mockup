import { ComponentType } from "react";

export type PeriodType = "today" | "yesterday" | "7d" | "30d" | "q1" | "q2" | "q3" | "q4" | "h1" | "h2";
export type MetricTabType = "sales" | "expenses";
export type StoreRegistrationStep = 1 | 2 | 3 | 4 | 5;
export type StoreCategory =
  | "restaurant"
  | "storefront"
  | "cafe"
  | "building_materials"
  | "wholesale_distribution"
  | "fashion"
  | "electronics"
  | "health_beauty"
  | "automotive"
  | "services"
  | "education"
  | "agriculture"
  | "hospitality";
export type StoreInitialMode = "activate" | "setup_later";
export type TaxMode = "none" | "inclusive" | "exclusive";

export interface StoreRegistrationDraft {
  outletName: string;
  category: StoreCategory | "";
  businessType: string;
  city: string;
  address: string;
  timezone: "Asia/Jakarta" | "Asia/Makassar" | "Asia/Jayapura";
  openingDate: string;
  currency: "IDR";
  taxMode: TaxMode;
  taxRate: string;
  serviceChargeEnabled: boolean;
  serviceChargeRate: string;
  initialStoreMode: StoreInitialMode;
  qrisSetup: "setup_now" | "setup_later";
  acceptedPaymentMethods: Array<"cash" | "qris" | "card">;
  inviteManagerNow: boolean;
  managerName: string;
  managerPhone: string;
  declarationAccepted: boolean;
}

export type StoreRegistrationFieldErrors = Partial<Record<keyof StoreRegistrationDraft, string>>;

export const initialStoreRegistrationDraft: StoreRegistrationDraft = {
  outletName: "",
  category: "",
  businessType: "",
  city: "",
  address: "",
  timezone: "Asia/Jakarta",
  openingDate: "",
  currency: "IDR",
  taxMode: "none",
  taxRate: "",
  serviceChargeEnabled: false,
  serviceChargeRate: "",
  initialStoreMode: "activate",
  qrisSetup: "setup_later",
  acceptedPaymentMethods: ["cash"],
  inviteManagerNow: false,
  managerName: "",
  managerPhone: "",
  declarationAccepted: false,
};

export const storeCategoryOptions: Array<{ id: StoreCategory; label: string; description: string; types: string[] }> = [
  { id: "restaurant", label: "Restoran & Kuliner", description: "Restoran, warung makan, katering, dan usaha makanan.", types: ["Restoran", "Warung makan", "Katering", "Food truck", "Jasa boga", "Lainnya"] },
  { id: "storefront", label: "Retail & Toko Umum", description: "Toko yang melayani penjualan grosir, eceran, atau keduanya.", types: ["Minimarket", "Toko kelontong", "Toko kebutuhan harian", "Toko serba ada", "Grosir umum", "Lainnya"] },
  { id: "cafe", label: "Coffee Shop & Bakery", description: "Coffee shop, bakery, dessert bar, dan minuman siap saji.", types: ["Coffee shop", "Bakery", "Dessert bar", "Tea house", "Juice bar", "Lainnya"] },
  { id: "building_materials", label: "Material & Bangunan", description: "Distributor, supplier, dan toko material bangunan.", types: ["Distributor besi baja", "Supplier / pemasok", "Toko material / toko bangunan grosir", "Toko material / toko bangunan eceran", "Toko material grosir & eceran", "Toko sanitary dan plumbing", "Toko listrik", "Toko cat dan perlengkapan bangunan", "Lainnya"] },
  { id: "wholesale_distribution", label: "Distributor & Perdagangan", description: "Perdagangan besar, distribusi, supplier, dan B2B.", types: ["Distributor umum", "Distributor FMCG", "Supplier bahan baku", "Agen / sub-distributor", "Importir", "Perdagangan B2B", "Perdagangan grosir", "Lainnya"] },
  { id: "fashion", label: "Fashion & Lifestyle", description: "Produk fashion, aksesoris, dan kebutuhan gaya hidup.", types: ["Pakaian", "Sepatu", "Tas", "Aksesoris", "Kosmetik fashion", "Thrift / preloved", "Lainnya"] },
  { id: "electronics", label: "Elektronik & Teknologi", description: "Penjualan perangkat elektronik, gadget, dan aksesori.", types: ["Toko elektronik", "Gadget dan handphone", "Aksesori komputer", "Komputer dan laptop", "Peralatan rumah tangga elektronik", "Service elektronik", "Lainnya"] },
  { id: "health_beauty", label: "Kesehatan & Kecantikan", description: "Apotek, klinik, salon, spa, dan produk perawatan.", types: ["Apotek", "Toko alat kesehatan", "Klinik", "Salon", "Barbershop", "Spa", "Toko kosmetik dan skincare", "Lainnya"] },
  { id: "automotive", label: "Otomotif", description: "Penjualan kendaraan, suku cadang, dan jasa otomotif.", types: ["Bengkel mobil", "Bengkel motor", "Toko spare part", "Ban dan aki", "Car wash", "Dealer kendaraan", "Aksesori otomotif", "Lainnya"] },
  { id: "services", label: "Jasa & Profesional", description: "Usaha jasa, konsultasi, dan layanan berbasis reservasi.", types: ["Jasa profesional", "Konsultan", "Laundry", "Percetakan", "Fotografi", "Event organizer", "Jasa pengiriman", "Lainnya"] },
  { id: "education", label: "Pendidikan & Pelatihan", description: "Sekolah, kursus, bimbingan belajar, dan pelatihan.", types: ["Bimbingan belajar", "Kursus bahasa", "Lembaga pelatihan", "Studio musik", "Taman kanak-kanak", "Pendidikan nonformal", "Lainnya"] },
  { id: "agriculture", label: "Pertanian & Peternakan", description: "Toko sarana produksi, hasil tani, ternak, dan perikanan.", types: ["Toko pertanian", "Pupuk dan pestisida", "Peternakan", "Pakan ternak", "Perikanan", "Hasil bumi", "Lainnya"] },
  { id: "hospitality", label: "Akomodasi & Rekreasi", description: "Hotel, penginapan, tempat rekreasi, dan hiburan.", types: ["Hotel", "Guest house", "Villa", "Homestay", "Tempat wisata", "Tempat hiburan", "Arena olahraga", "Lainnya"] },
];

export const validateStoreRegistrationStep = (
  step: StoreRegistrationStep,
  draft: StoreRegistrationDraft,
  existingNames: string[] = [],
): StoreRegistrationFieldErrors => {
  const errors: StoreRegistrationFieldErrors = {};
  const required = (key: keyof StoreRegistrationDraft, message: string) => {
    if (!String(draft[key] ?? "").trim()) errors[key] = message;
  };

  if (step === 1) {
    required("outletName", "Masukkan nama toko atau outlet.");
    if (draft.outletName.trim() && draft.outletName.trim().length < 3) errors.outletName = "Nama toko minimal 3 karakter.";
    if (existingNames.some((name) => name.trim().toLowerCase() === draft.outletName.trim().toLowerCase())) errors.outletName = "Nama toko ini sudah terdaftar.";
    required("category", "Pilih kategori usaha.");
    required("businessType", "Pilih jenis usaha.");
  }

  if (step === 2) {
    required("city", "Masukkan kota atau kabupaten.");
    required("address", "Masukkan alamat lengkap outlet.");
    if (draft.address.trim() && draft.address.trim().length < 10) errors.address = "Alamat perlu dibuat lebih lengkap.";
    required("timezone", "Pilih zona waktu.");
    required("openingDate", "Pilih tanggal mulai operasional.");
    if (draft.openingDate && draft.openingDate < new Date().toISOString().slice(0, 10)) errors.openingDate = "Gunakan hari ini atau tanggal yang akan datang.";
  }

  if (step === 3) {
    if (draft.taxMode !== "none" && (!draft.taxRate || Number(draft.taxRate) < 0 || Number(draft.taxRate) > 100)) errors.taxRate = "Masukkan tarif pajak antara 0–100%.";
    if (draft.serviceChargeEnabled && (!draft.serviceChargeRate || Number(draft.serviceChargeRate) < 0 || Number(draft.serviceChargeRate) > 100)) errors.serviceChargeRate = "Masukkan service charge antara 0–100%.";
  }

  if (step === 4) {
    if (draft.acceptedPaymentMethods.length === 0) errors.acceptedPaymentMethods = "Pilih minimal satu metode pembayaran.";
    if (draft.inviteManagerNow) {
      required("managerName", "Masukkan nama manager outlet.");
      required("managerPhone", "Masukkan nomor WhatsApp manager.");
      if (draft.managerPhone && draft.managerPhone.replace(/\\D/g, "").length < 9) errors.managerPhone = "Masukkan nomor WhatsApp yang valid.";
    }
  }

  if (step === 5 && !draft.declarationAccepted) errors.declarationAccepted = "Centang pernyataan sebelum membuat toko.";
  return errors;
};

export const getStoreRegistrationAllErrors = (draft: StoreRegistrationDraft, existingNames: string[]) => ({
  ...validateStoreRegistrationStep(1, draft, existingNames),
  ...validateStoreRegistrationStep(2, draft, existingNames),
  ...validateStoreRegistrationStep(3, draft, existingNames),
  ...validateStoreRegistrationStep(4, draft, existingNames),
  ...validateStoreRegistrationStep(5, draft, existingNames),
});

export interface Business {
  id: string;
  name: string;
  type: string;
  location: string;
  status: "active" | "maintenance";
  onlineStatus: "online" | "offline";
  category: StoreCategory;
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
  category: "umum" | "laporan" | "pos" | "pembayaran" | "outlet" | "staff" | "inventori" | "akun" | "keamanan" | "langganan" | "teknis";
  keywords?: string[];
}

export interface TourStep {
  targetId: string;
  title: string;
  description: string;
  position: "top" | "bottom" | "left" | "right";
}

export interface OwnerProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  avatarCode: string;
  joinedDate: string;
}

export interface ActiveSession {
  id: string;
  device: string;
  os: string;
  location: string;
  ip: string;
  isActive: boolean;
  lastActive: string;
}
