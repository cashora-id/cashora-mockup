# Cashora POS Mockup

A modern Point of Sale (POS) platform designed to help Indonesian MSMEs manage multi-branch operations seamlessly, securely, and efficiently.

---

## 🚀 Getting Started

This repository has been fully migrated to **pnpm** for faster installation and optimized dependency tree resolution.

### Prerequisites
Make sure you have Node.js (v18+) and `pnpm` installed globally.

### 1. Installation
Clean up any legacy `node_modules` folders or package locks, then run:
```bash
pnpm install
```

### 2. Run Development Server
To launch the Hot Module Replacement (HMR) development server:
```bash
pnpm dev
```

### 3. Run Light Demo Mode (Highly Recommended)
To run the optimized production bundle locally (RAM footprint < 50MB, prevents system lag during review):
```bash
pnpm demo
```
Access the application in your browser at: **[http://localhost:3000](http://localhost:3000)**

---

## 🛠️ Key Architectural Updates & Refactoring (March 2026)

This section documents the technical adjustments and styling optimizations applied to the repository to assist developer onboarding.

### 1. Route Migration & Owner Portal Redesign (`/owner/menu`)
* **Path Migration**: Transferred the main owner management view from the legacy `/dashboard` route to the new `/owner/menu` route.
* **Aggregated Performance Metrics**: Introduced a quick metrics dashboard banner at the top of the Owner Menu page displaying real-time business statistics:
  - *Total Sales Today* (Rp 11.060.000)
  - *Total Transactions* (431)
  - *Active Outlets Status* (2 of 3)
* **Search and State Filters**:
  - Embedded an interactive client-side Search input filtering branches by name or city.
  - Implemented state tabs (`All`, `Active`, `Maintenance`) to filter branch listings dynamically.
* **Bento Grid Cards**: Redesigned individual business cards to display today's sales summary, transactional count, growth rate (`+14.2%`), and high-contrast action buttons mapped to `/owner/menu/[id]`.

### 2. Branding Assets & Logo Container Refactoring
* **Transparent Asset Integration**: Replaced the legacy logo asset with the new 3D ribbon "C" design at `/public/cashora-logo.png`. The white background has been digitally removed to ensure transparency.
* **Box Container Removal**: Cleaned up the dark wrapper boxes around the logo inside the Global Header, Footer, and Owner Menu Header, allowing the transparent PNG to blend naturally on dark navy and light surfaces.

### 3. Navbar Spacing & Layout Alignment (Gap Resolution)
* **The Spacing Bug**: Rescaling the brand logo to a crisp `w-9 h-9` size decreased the fixed global Navbar height to exactly **60px**. The legacy subpages utilized `<main className="pt-16">` (64px), resulting in a visible 4px layout gap of background color bleeding under the fixed header.
* **The Spacing Fix**: Re-aligned the padding top of all main subpages to **`pt-[60px]`** to achieve pixel-perfect alignment:
  - `app/layanan/page.tsx`
  - `app/kontak/page.tsx`
  - `app/harga/page.tsx`
  - `app/tentang/page.tsx`
  - `app/blog/page.tsx`
  - `app/blog/[slug]/page.tsx`
  - `app/demo/page.tsx`

### 4. Performance Tuning & CPU/RAM Optimization
* **Turbopack Root Scoping**: Configured `turbopack: { root: process.cwd() }` in `next.config.mjs` to block the Rust compiler from recursively scanning the user's home/system directory (which was causing memory spikes and OS hangs).
* **Strict Mode Disabling**: Configured `reactStrictMode: false` in development to halt double-render lifecycles, dropping CPU overhead by roughly 50%.
* **Client-Side Hydration Guard**: Implemented a mounting state check (`mounted` guard) in `Hero` component particles, eliminating hydration mismatches and DOM element discrepancies between SSR and client builds.

---

## 📂 Core Project Directory
```
cashora-mockup/
├── app/
│   ├── owner/menu/page.tsx   # Owner Portal branch selector
│   ├── layanan/page.tsx      # Core features showcase
│   ├── kontak/page.tsx       # Contact and Support form
│   └── page.tsx              # Landing page (Home)
├── components/
│   ├── navbar.tsx            # Global fixed header navbar
│   └── footer.tsx            # Global brand footer
└── public/
    └── cashora-logo.png      # Transparent 3D C-logo asset
```

---

## 🚀 Future Development Roadmap
- [ ] Implement secure authentication using Supabase / Firebase Auth.
- [ ] Build dynamic branch-specific details view at `/owner/menu/[id]`.
- [ ] Configure role-based access control (Owner vs Cashier/Staff).
