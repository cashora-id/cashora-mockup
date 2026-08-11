import { Business, StoreCategory } from "../menu/types";

export type InventoryLevel = "safe" | "low" | "critical";

export interface InventoryItem {
  id: string;
  outletId: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  unit: string;
  minimumStock: number;
  level: InventoryLevel;
  updatedAt: string;
}

export interface OutletSettings {
  businessName: string;
  address: string;
  timezone: "WIB" | "WITA" | "WIT";
  openingHours: string;
  taxEnabled: boolean;
  taxRate: number;
  serviceChargeEnabled: boolean;
  serviceChargeRate: number;
}

export type PaymentMethod = "cash" | "qris" | "card" | "bank_transfer";
export type PaymentStatus = "success" | "pending" | "failed" | "refunded";

export interface PaymentActivity {
  id: string;
  reference: string;
  outletId: string;
  outletName: string;
  method: PaymentMethod;
  amount: number;
  createdAt: string;
  createdAtISO: string;
  status: PaymentStatus;
  statusExplanation: string;
  settlementAt?: string;
  providerLabel?: string;
  isProcessing?: boolean;
}

export const paymentMethodUi: Record<PaymentMethod, { label: string; helper: string }> = {
  cash: { label: "Tunai / Cash", helper: "Dicatat langsung oleh outlet" },
  qris: { label: "QRIS", helper: "Pembayaran digital" },
  card: { label: "Debit / Kartu", helper: "Konfirmasi jaringan dapat diperlukan" },
  bank_transfer: { label: "Transfer Bank", helper: "Konfirmasi transfer dapat tertunda" },
};

export type StaffRole = "owner" | "manager" | "cashier";

export interface StaffMember {
  id: string;
  name: string;
  phone: string;
  role: StaffRole;
  outletIds: string[];
  status: "active" | "inactive" | "invited";
  lastActive: string;
}

export const inventorySeed: InventoryItem[] = [
  { id: "inv-1", outletId: "1", name: "Beras premium", sku: "BB-001", category: "Bahan baku", quantity: 8, unit: "kg", minimumStock: 80, level: "critical", updatedAt: "Hari ini, 08.10" },
  { id: "inv-2", outletId: "1", name: "Bumbu utama", sku: "BB-014", category: "Bahan baku", quantity: 4, unit: "pak", minimumStock: 20, level: "critical", updatedAt: "Hari ini, 08.15" },
  { id: "inv-3", outletId: "1", name: "Minyak goreng", sku: "BB-021", category: "Bahan baku", quantity: 26, unit: "liter", minimumStock: 20, level: "safe", updatedAt: "Kemarin, 18.40" },
  { id: "inv-4", outletId: "1", name: "Kemasan makanan", sku: "PK-004", category: "Kemasan", quantity: 34, unit: "pcs", minimumStock: 80, level: "low", updatedAt: "Hari ini, 07.55" },
  { id: "inv-5", outletId: "2", name: "Minyak goreng 1L", sku: "RT-110", category: "Produk retail", quantity: 120, unit: "botol", minimumStock: 40, level: "safe", updatedAt: "Hari ini, 09.00" },
  { id: "inv-6", outletId: "2", name: "Beras 5kg", sku: "RT-201", category: "Produk retail", quantity: 18, unit: "sak", minimumStock: 35, level: "low", updatedAt: "Hari ini, 08.35" },
  { id: "inv-7", outletId: "2", name: "Air mineral 600ml", sku: "RT-316", category: "Minuman", quantity: 240, unit: "botol", minimumStock: 100, level: "safe", updatedAt: "Kemarin, 20.10" },
  { id: "inv-8", outletId: "3", name: "Biji kopi house blend", sku: "CF-010", category: "Bahan baku", quantity: 6, unit: "kg", minimumStock: 15, level: "critical", updatedAt: "Kemarin, 15.10" },
  { id: "inv-9", outletId: "3", name: "Susu segar", sku: "CF-025", category: "Bahan baku", quantity: 12, unit: "liter", minimumStock: 20, level: "low", updatedAt: "Kemarin, 15.10" },
];

export const outletSettingsSeed: Record<string, OutletSettings> = {
  "1": { businessName: "Warung Makan Pak Budi", address: "Jl. Raya Gubeng No. 48, Surabaya", timezone: "WIB", openingHours: "08.00 – 22.00", taxEnabled: false, taxRate: 0, serviceChargeEnabled: true, serviceChargeRate: 5 },
  "2": { businessName: "Budi Retail Mart", address: "Jl. K.H. Wahid Hasyim No. 24, Jakarta Pusat", timezone: "WIB", openingHours: "08.00 – 22.00", taxEnabled: true, taxRate: 11, serviceChargeEnabled: false, serviceChargeRate: 0 },
  "3": { businessName: "Kopi Budi Sejahtera", address: "Jl. Ir. H. Juanda No. 108, Bandung Dago", timezone: "WIB", openingHours: "07.00 – 23.00", taxEnabled: true, taxRate: 10, serviceChargeEnabled: true, serviceChargeRate: 5 },
};

// Mock seed: status mengikuti aturan baru —
// Tunai: langsung final (Berhasil/Gagal/Dikembalikan, tidak pernah Menunggu).
// Non-tunai: "Menunggu" (pending, isProcessing) saat diproses gateway,
// lalu otomatis menjadi "Berhasil" atau "Gagal" setelah konfirmasi.
export const paymentActivitiesSeed: PaymentActivity[] = [
  // ===== Hari ini, 11 Agustus 2026 =====
  { id: "pay-1", reference: "QRS-110826-00182", outletId: "1", outletName: "Warung Makan Pak Budi", method: "qris", amount: 185000, createdAt: "Hari ini, 10.42", createdAtISO: "2026-08-11T10:42:00", status: "success", statusExplanation: "Pembayaran QRIS berhasil dikonfirmasi oleh payment gateway.", settlementAt: "Hari ini, 10.42", providerLabel: "QRIS TUNTAS" },
  { id: "pay-2", reference: "CRD-110826-00541", outletId: "2", outletName: "Budi Retail Mart", method: "card", amount: 342000, createdAt: "Hari ini, 10.31", createdAtISO: "2026-08-11T10:31:00", status: "success", statusExplanation: "Pembayaran kartu berhasil diterima dan dikonfirmasi jaringan.", providerLabel: "Debit BCA" },
  { id: "pay-3", reference: "QRS-110826-00180", outletId: "1", outletName: "Warung Makan Pak Budi", method: "qris", amount: 76000, createdAt: "Hari ini, 10.19", createdAtISO: "2026-08-11T10:19:00", status: "pending", statusExplanation: "Pembayaran masih diproses. Menunggu konfirmasi dari payment gateway.", providerLabel: "QRIS TUNTAS", isProcessing: true },
  { id: "pay-4", reference: "CRD-110826-00539", outletId: "2", outletName: "Budi Retail Mart", method: "card", amount: 129000, createdAt: "Hari ini, 09.58", createdAtISO: "2026-08-11T09:58:00", status: "failed", statusExplanation: "Pembayaran kartu tidak selesai. Dana tidak dianggap diterima oleh usaha.", providerLabel: "Debit Mandiri" },
  { id: "pay-5", reference: "CSH-110826-00921", outletId: "1", outletName: "Warung Makan Pak Budi", method: "cash", amount: 58000, createdAt: "Hari ini, 09.45", createdAtISO: "2026-08-11T09:45:00", status: "success", statusExplanation: "Pembayaran tunai berhasil diterima dan dicatat oleh outlet.", providerLabel: "Kas Tunai" },
  { id: "pay-6", reference: "TRF-110826-00318", outletId: "3", outletName: "Kopi Budi Sejahtera", method: "bank_transfer", amount: 425000, createdAt: "Hari ini, 09.21", createdAtISO: "2026-08-11T09:21:00", status: "pending", statusExplanation: "Transfer bank sedang diproses, menunggu konfirmasi dari jaringan bank.", providerLabel: "BCA Transfer", isProcessing: true },
  { id: "pay-7", reference: "CSH-110826-00917", outletId: "2", outletName: "Budi Retail Mart", method: "cash", amount: 97000, createdAt: "Hari ini, 09.12", createdAtISO: "2026-08-11T09:12:00", status: "success", statusExplanation: "Pembayaran tunai berhasil diterima dan dicatat oleh outlet.", providerLabel: "Kas Tunai" },
  { id: "pay-8", reference: "QRS-110826-00178", outletId: "2", outletName: "Budi Retail Mart", method: "qris", amount: 248000, createdAt: "Hari ini, 09.04", createdAtISO: "2026-08-11T09:04:00", status: "refunded", statusExplanation: "Transaksi dibatalkan dan dana dikembalikan sesuai proses provider.", providerLabel: "QRIS TUNTAS" },
  { id: "pay-9", reference: "TRF-110826-00316", outletId: "2", outletName: "Budi Retail Mart", method: "bank_transfer", amount: 310000, createdAt: "Hari ini, 08.47", createdAtISO: "2026-08-11T08:47:00", status: "success", statusExplanation: "Transfer bank berhasil dikonfirmasi dan tercatat sebagai pembayaran.", providerLabel: "BCA Transfer" },
  { id: "pay-10", reference: "QRS-110826-00175", outletId: "3", outletName: "Kopi Budi Sejahtera", method: "qris", amount: 64000, createdAt: "Hari ini, 08.32", createdAtISO: "2026-08-11T08:32:00", status: "success", statusExplanation: "Pembayaran QRIS berhasil dikonfirmasi oleh payment gateway.", providerLabel: "QRIS TUNTAS" },
  { id: "pay-11", reference: "CSH-110826-00910", outletId: "3", outletName: "Kopi Budi Sejahtera", method: "cash", amount: 43000, createdAt: "Hari ini, 08.15", createdAtISO: "2026-08-11T08:15:00", status: "success", statusExplanation: "Pembayaran tunai berhasil diterima dan dicatat oleh outlet.", providerLabel: "Kas Tunai" },
  { id: "pay-12", reference: "CRD-110826-00535", outletId: "1", outletName: "Warung Makan Pak Budi", method: "card", amount: 152000, createdAt: "Hari ini, 07.58", createdAtISO: "2026-08-11T07:58:00", status: "failed", statusExplanation: "Pembayaran kartu ditolak oleh jaringan. Dana tidak dianggap diterima.", providerLabel: "Debit BRI" },
  // ===== Kemarin, 10 Agustus 2026 =====
  { id: "pay-13", reference: "QRS-100826-00171", outletId: "1", outletName: "Warung Makan Pak Budi", method: "qris", amount: 210000, createdAt: "Kemarin, 19.45", createdAtISO: "2026-08-10T19:45:00", status: "success", statusExplanation: "Pembayaran QRIS berhasil dikonfirmasi oleh payment gateway.", settlementAt: "Kemarin, 19.45", providerLabel: "QRIS TUNTAS" },
  { id: "pay-14", reference: "CSH-100826-00902", outletId: "2", outletName: "Budi Retail Mart", method: "cash", amount: 125000, createdAt: "Kemarin, 18.20", createdAtISO: "2026-08-10T18:20:00", status: "success", statusExplanation: "Pembayaran tunai berhasil diterima dan dicatat oleh outlet.", providerLabel: "Kas Tunai" },
  { id: "pay-15", reference: "TRF-100826-00310", outletId: "3", outletName: "Kopi Budi Sejahtera", method: "bank_transfer", amount: 540000, createdAt: "Kemarin, 17.05", createdAtISO: "2026-08-10T17:05:00", status: "success", statusExplanation: "Transfer bank berhasil dikonfirmasi dan tercatat sebagai pembayaran.", providerLabel: "Mandiri Transfer" },
  { id: "pay-16", reference: "CRD-100826-00528", outletId: "2", outletName: "Budi Retail Mart", method: "card", amount: 388000, createdAt: "Kemarin, 15.42", createdAtISO: "2026-08-10T15:42:00", status: "failed", statusExplanation: "Pembayaran kartu tidak selesai karena batas waktu jaringan tercapai.", providerLabel: "Debit BCA" },
  { id: "pay-17", reference: "QRS-100826-00168", outletId: "3", outletName: "Kopi Budi Sejahtera", method: "qris", amount: 92000, createdAt: "Kemarin, 14.11", createdAtISO: "2026-08-10T14:11:00", status: "refunded", statusExplanation: "Pesanan dibatalkan pelanggan, dana dikembalikan melalui provider.", providerLabel: "QRIS TUNTAS" },
  { id: "pay-18", reference: "CSH-100826-00895", outletId: "1", outletName: "Warung Makan Pak Budi", method: "cash", amount: 76000, createdAt: "Kemarin, 12.38", createdAtISO: "2026-08-10T12:38:00", status: "success", statusExplanation: "Pembayaran tunai berhasil diterima dan dicatat oleh outlet.", providerLabel: "Kas Tunai" },
  { id: "pay-19", reference: "QRS-100826-00164", outletId: "2", outletName: "Budi Retail Mart", method: "qris", amount: 167000, createdAt: "Kemarin, 11.24", createdAtISO: "2026-08-10T11:24:00", status: "success", statusExplanation: "Pembayaran QRIS berhasil dikonfirmasi oleh payment gateway.", providerLabel: "QRIS TUNTAS" },
  { id: "pay-20", reference: "CRD-100826-00521", outletId: "3", outletName: "Kopi Budi Sejahtera", method: "card", amount: 205000, createdAt: "Kemarin, 10.02", createdAtISO: "2026-08-10T10:02:00", status: "success", statusExplanation: "Pembayaran kartu berhasil diterima dan dikonfirmasi jaringan.", providerLabel: "Debit Mandiri" },
  // ===== 9 Agustus 2026 =====
  { id: "pay-21", reference: "QRS-090826-00158", outletId: "1", outletName: "Warung Makan Pak Budi", method: "qris", amount: 133000, createdAt: "9 Agu, 20.15", createdAtISO: "2026-08-09T20:15:00", status: "success", statusExplanation: "Pembayaran QRIS berhasil dikonfirmasi oleh payment gateway.", providerLabel: "QRIS TUNTAS" },
  { id: "pay-22", reference: "CSH-090826-00884", outletId: "1", outletName: "Warung Makan Pak Budi", method: "cash", amount: 64000, createdAt: "9 Agu, 18.50", createdAtISO: "2026-08-09T18:50:00", status: "success", statusExplanation: "Pembayaran tunai berhasil diterima dan dicatat oleh outlet.", providerLabel: "Kas Tunai" },
  { id: "pay-23", reference: "TRF-090826-00301", outletId: "2", outletName: "Budi Retail Mart", method: "bank_transfer", amount: 275000, createdAt: "9 Agu, 16.33", createdAtISO: "2026-08-09T16:33:00", status: "failed", statusExplanation: "Transfer bank tidak terverifikasi hingga batas waktu konfirmasi.", providerLabel: "BCA Transfer" },
  { id: "pay-24", reference: "CRD-090826-00512", outletId: "3", outletName: "Kopi Budi Sejahtera", method: "card", amount: 118000, createdAt: "9 Agu, 13.27", createdAtISO: "2026-08-09T13:27:00", status: "success", statusExplanation: "Pembayaran kartu berhasil diterima dan dikonfirmasi jaringan.", providerLabel: "Debit BNI" },
  { id: "pay-25", reference: "QRS-090826-00152", outletId: "2", outletName: "Budi Retail Mart", method: "qris", amount: 298000, createdAt: "9 Agu, 10.48", createdAtISO: "2026-08-09T10:48:00", status: "success", statusExplanation: "Pembayaran QRIS berhasil dikonfirmasi oleh payment gateway.", settlementAt: "9 Agu, 10.48", providerLabel: "QRIS TUNTAS" },
  // ===== 8 Agustus 2026 =====
  { id: "pay-26", reference: "CSH-080826-00871", outletId: "3", outletName: "Kopi Budi Sejahtera", method: "cash", amount: 87000, createdAt: "8 Agu, 19.05", createdAtISO: "2026-08-08T19:05:00", status: "success", statusExplanation: "Pembayaran tunai berhasil diterima dan dicatat oleh outlet.", providerLabel: "Kas Tunai" },
  { id: "pay-27", reference: "QRS-080826-00145", outletId: "1", outletName: "Warung Makan Pak Budi", method: "qris", amount: 156000, createdAt: "8 Agu, 17.22", createdAtISO: "2026-08-08T17:22:00", status: "refunded", statusExplanation: "Dana dikembalikan karena duplikasi transaksi terdeteksi.", providerLabel: "QRIS TUNTAS" },
  { id: "pay-28", reference: "TRF-080826-00294", outletId: "2", outletName: "Budi Retail Mart", method: "bank_transfer", amount: 615000, createdAt: "8 Agu, 14.10", createdAtISO: "2026-08-08T14:10:00", status: "success", statusExplanation: "Transfer bank berhasil dikonfirmasi dan tercatat sebagai pembayaran.", providerLabel: "BCA Transfer" },
  { id: "pay-29", reference: "CRD-080826-00503", outletId: "1", outletName: "Warung Makan Pak Budi", method: "card", amount: 94000, createdAt: "8 Agu, 11.55", createdAtISO: "2026-08-08T11:55:00", status: "success", statusExplanation: "Pembayaran kartu berhasil diterima dan dikonfirmasi jaringan.", providerLabel: "Debit BCA" },
  { id: "pay-30", reference: "CSH-080826-00866", outletId: "2", outletName: "Budi Retail Mart", method: "cash", amount: 210000, createdAt: "8 Agu, 09.30", createdAtISO: "2026-08-08T09:30:00", status: "success", statusExplanation: "Pembayaran tunai berhasil diterima dan dicatat oleh outlet.", providerLabel: "Kas Tunai" },
  // ===== 7 Agustus 2026 =====
  { id: "pay-31", reference: "QRS-070826-00139", outletId: "3", outletName: "Kopi Budi Sejahtera", method: "qris", amount: 78000, createdAt: "7 Agu, 21.02", createdAtISO: "2026-08-07T21:02:00", status: "success", statusExplanation: "Pembayaran QRIS berhasil dikonfirmasi oleh payment gateway.", providerLabel: "QRIS TUNTAS" },
  { id: "pay-32", reference: "CRD-070826-00495", outletId: "2", outletName: "Budi Retail Mart", method: "card", amount: 452000, createdAt: "7 Agu, 18.44", createdAtISO: "2026-08-07T18:44:00", status: "failed", statusExplanation: "Pembayaran kartu ditolak karena saldo tidak mencukupi.", providerLabel: "Debit Mandiri" },
  { id: "pay-33", reference: "CSH-070826-00858", outletId: "1", outletName: "Warung Makan Pak Budi", method: "cash", amount: 132000, createdAt: "7 Agu, 13.19", createdAtISO: "2026-08-07T13:19:00", status: "success", statusExplanation: "Pembayaran tunai berhasil diterima dan dicatat oleh outlet.", providerLabel: "Kas Tunai" },
  { id: "pay-34", reference: "TRF-070826-00287", outletId: "3", outletName: "Kopi Budi Sejahtera", method: "bank_transfer", amount: 350000, createdAt: "7 Agu, 10.36", createdAtISO: "2026-08-07T10:36:00", status: "success", statusExplanation: "Transfer bank berhasil dikonfirmasi dan tercatat sebagai pembayaran.", providerLabel: "BNI Transfer" },
  // ===== 5 Agustus 2026 =====
  { id: "pay-35", reference: "QRS-050826-00128", outletId: "2", outletName: "Budi Retail Mart", method: "qris", amount: 189000, createdAt: "5 Agu, 16.28", createdAtISO: "2026-08-05T16:28:00", status: "success", statusExplanation: "Pembayaran QRIS berhasil dikonfirmasi oleh payment gateway.", settlementAt: "5 Agu, 16.28", providerLabel: "QRIS TUNTAS" },
  { id: "pay-36", reference: "CSH-050826-00843", outletId: "3", outletName: "Kopi Budi Sejahtera", method: "cash", amount: 55000, createdAt: "5 Agu, 12.14", createdAtISO: "2026-08-05T12:14:00", status: "success", statusExplanation: "Pembayaran tunai berhasil diterima dan dicatat oleh outlet.", providerLabel: "Kas Tunai" },
  { id: "pay-37", reference: "CRD-050826-00481", outletId: "1", outletName: "Warung Makan Pak Budi", method: "card", amount: 267000, createdAt: "5 Agu, 09.52", createdAtISO: "2026-08-05T09:52:00", status: "success", statusExplanation: "Pembayaran kartu berhasil diterima dan dikonfirmasi jaringan.", providerLabel: "Debit BCA" },
  { id: "pay-38", reference: "QRS-050826-00124", outletId: "1", outletName: "Warung Makan Pak Budi", method: "qris", amount: 104000, createdAt: "5 Agu, 08.21", createdAtISO: "2026-08-05T08:21:00", status: "refunded", statusExplanation: "Transaksi dibatalkan dan dana dikembalikan sesuai proses provider.", providerLabel: "QRIS TUNTAS" },
];

export const staffSeed: StaffMember[] = [
  { id: "staff-1", name: "Budi Santoso", phone: "+62 812-3456-7890", role: "owner", outletIds: ["1", "2", "3"], status: "active", lastActive: "Aktif sekarang" },
  { id: "staff-2", name: "Rina Kusuma", phone: "+62 811-9922-145", role: "manager", outletIds: ["1"], status: "active", lastActive: "12 menit lalu" },
  { id: "staff-3", name: "Dimas Pratama", phone: "+62 857-1188-320", role: "manager", outletIds: ["2"], status: "active", lastActive: "35 menit lalu" },
  { id: "staff-4", name: "Sari Wijaya", phone: "+62 813-7761-909", role: "cashier", outletIds: ["1"], status: "active", lastActive: "1 jam lalu" },
  { id: "staff-5", name: "Andi Saputra", phone: "+62 856-4410-278", role: "cashier", outletIds: ["2"], status: "inactive", lastActive: "3 hari lalu" },
  { id: "staff-6", name: "Maya Putri", phone: "+62 812-8890-426", role: "manager", outletIds: ["3"], status: "invited", lastActive: "Undangan belum diterima" },
];

export const categoryLabel = (category: StoreCategory) => {
  const labels: Record<StoreCategory, string> = {
    restaurant: "Restoran & Kuliner", storefront: "Retail & Toko Umum", cafe: "Coffee Shop & Bakery", building_materials: "Material & Bangunan", wholesale_distribution: "Distributor & Perdagangan", fashion: "Fashion & Lifestyle", electronics: "Elektronik & Teknologi", health_beauty: "Kesehatan & Kecantikan", automotive: "Otomotif", services: "Jasa & Profesional", education: "Pendidikan & Pelatihan", agriculture: "Pertanian & Peternakan", hospitality: "Akomodasi & Rekreasi",
  };
  return labels[category];
};

export const formatRupiah = (value: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

export const makeNewStaff = (input: Omit<StaffMember, "id" | "status" | "lastActive">): StaffMember => ({ ...input, id: `staff-${Date.now()}`, status: "invited", lastActive: "Undangan belum diterima" });

export const getOutlet = (businesses: Business[], outletId: string) => businesses.find((business) => business.id === outletId);
