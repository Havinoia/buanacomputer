# Buana Computer - Service & Production Showcase Platform

![Buana Computer Showcase](https://images.unsplash.com/photo-1588702590204-8d63306e0000?q=80&w=1200&auto=format&fit=crop)

**Buana Computer** adalah platform web modern untuk showcase produk laptop, sparepart, dan layanan jasa servis (Toko & Panggilan). Dibangun dengan performa tinggi dan desain premium untuk memberikan pengalaman terbaik bagi pelanggan.

## ✨ Fitur Utama

-   **🎯 Showcase Terkategori**: Menampilkan Laptop dan Sparepart dalam grid yang rapi dengan filter kategori.
-   **🔍 Pencarian Real-time**: Memudahkan pelanggan mencari unit produk berdasarkan nama atau brand secara instan.
-   **📅 Form Pemesanan Dinamis**: Form pemesanan yang cerdas di halaman detail menyesuaikan dengan apa yang sedang dilihat (Produk vs Jasa).
-   **🛠️ Layanan Fleksibel**: Informasi servis yang jelas mencakup layanan di Toko maupun Panggilan (On-site) ke lokasi pelanggan.
-   **🔐 Sistem Autentikasi**: Manajemen akun pengguna yang aman menggunakan Supabase Auth.
-   **📱 Responsif & Modern**: Desain premium yang berjalan mulus di perangkat mobile, tablet, maupun desktop.

## 🚀 Teknologi

-   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **Database & Auth**: [Supabase](https://supabase.com/)
-   **Ikon**: [Lucide React](https://lucide.dev/)
-   **Bahasa**: [TypeScript](https://www.typescriptlang.org/)

## 🛠️ Instalasi & Persiapan

### 1. Clone Repositori
```bash
git clone https://github.com/Havinoia/buanacomputer.git
cd buanacomputer
```

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment
Buat file `.env.local` dan masukkan konfigurasi Supabase Anda:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_public_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 4. Setup Database
Salin isi dari `supabase_schema.sql` dan jalankan di SQL Editor dashboard Supabase Anda.

### 5. Jalankan Seeder (Data Dummy)
Untuk memunculkan data produk dan layanan contoh:
```bash
npx tsx scripts/seed.ts
```

### 6. Jalankan Server Development
```bash
npm run dev
```
Akses di `http://localhost:3000`.

## 📄 Lisensi
Proyek ini dikembangkan oleh **Buana Computer Team**.

---
*Solusi perbaikan digital yang cepat, transparan, dan bergaransi.*
