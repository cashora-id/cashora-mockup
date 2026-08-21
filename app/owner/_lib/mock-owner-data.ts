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
    restaurant: "Restoran & Kuliner",
    storefront: "Retail & Toko Umum",
    cafe: "Coffee Shop & Bakery",
    building_materials: "Material & Bangunan",
    wholesale_distribution: "Distributor & Perdagangan",
    fashion: "Fashion & Lifestyle",
    electronics: "Elektronik & Teknologi",
    health_beauty: "Kesehatan & Kecantikan",
    automotive: "Otomotif",
    services: "Jasa & Profesional",
    education: "Pendidikan & Pelatihan",
    agriculture: "Pertanian & Peternakan",
    hospitality: "Akomodasi & Rekreasi",
  };
  return labels[category];
};

export const formatRupiah = (value: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

export const makeNewStaff = (input: Omit<StaffMember, "id" | "status" | "lastActive">): StaffMember => ({ ...input, id: `staff-${Date.now()}`, status: "invited", lastActive: "Undangan belum diterima" });

export const getOutlet = (businesses: Business[], outletId: string) => businesses.find((business) => business.id === outletId);
