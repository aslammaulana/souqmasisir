# Tech Stack — SouqMasisir

Dokumen ini merangkum seluruh teknologi yang digunakan dalam proyek SouqMasisir berdasarkan analisis `package.json`, file konfigurasi, dan struktur kode.

---

## 🧱 Core Framework

| Teknologi | Versi | Peran |
|---|---|---|
| **Next.js** | 16.1.6 | Full-stack React framework (App Router) |
| **React** | 19.2.3 | UI library |
| **TypeScript** | ^5 | Static typing di seluruh codebase |

> Menggunakan **App Router** (`app/` directory) dengan dukungan Server Components, Server Actions, dan Streaming SSR.

---

## 🗄️ Database & Backend

| Teknologi | Peran |
|---|---|
| **Supabase** (`@supabase/supabase-js` ^2.106) | Database utama (PostgreSQL), Storage gambar iklan, dan REST API |
| **Supabase Admin Client** | Akses server-side penuh via `service_role` key (dipakai di API routes & Server Components) |
| **Supabase Anon Client** | Akses client-side terbatas via `anon` key |

---

## 🔐 Authentication

| Teknologi | Peran |
|---|---|
| **NextAuth.js v5** (`next-auth` ^5.0.0-beta.31) | Auth layer utama |
| **Google OAuth Provider** | Login via akun Google (Google Cloud OAuth 2.0) |

> Setelah login, data user disinkronkan ke tabel `users` di Supabase secara otomatis melalui callback `signIn` di `lib/auth.ts`.

---

## 🎨 Styling

| Teknologi | Versi | Peran |
|---|---|---|
| **Tailwind CSS** | ^4 | Utility-first CSS framework |
| **PostCSS** | ^4 | Build tool untuk Tailwind |

---

## 🎞️ UI & Animasi

| Teknologi | Versi | Peran |
|---|---|---|
| **Framer Motion** | ^12.39 | Animasi carousel (drag/swipe), transisi halaman |
| **React Icons** | ^5.6 | Iconografi (header, footer navigasi, dll.) |
| **next-themes** | ^0.4.6 | Dark mode / light mode toggle |

---

## 🛠️ Utilities

| Teknologi | Versi | Peran |
|---|---|---|
| **date-fns** | ^4.2.1 | Format tanggal iklan (misal: "2 hari lalu") |

---

## 🔧 Developer Tools

| Teknologi | Versi | Peran |
|---|---|---|
| **ESLint** | ^9 | Linting kode JavaScript/TypeScript |
| **eslint-config-next** | 16.1.6 | Aturan ESLint khusus Next.js |

---

## 📂 Struktur Halaman (App Router)

```
app/
├── page.tsx              → Homepage (Server Component)
├── layout.tsx            → Root layout
├── providers.tsx         → SessionProvider wrapper (Client)
├── login/                → Halaman login (Google OAuth)
├── account/              → Profil user
├── myads/                → Manajemen iklan user (CRUD)
├── ads/                  → Detail iklan
├── category/[id]/        → Listing iklan per kategori
├── settings/             → Pengaturan akun
└── api/                  → API Routes (Next.js Route Handlers)
```

---

## 🌐 External Services & Infrastruktur

| Service | Peran |
|---|---|
| **Supabase Cloud** | Hosting database PostgreSQL + object storage |
| **Google Cloud (OAuth 2.0)** | Provider autentikasi |
| **Google CDN** (`lh3.googleusercontent.com`) | Hosting foto profil Google |
| **Supabase Storage CDN** (`*.supabase.co`) | Hosting gambar iklan yang diupload user |

---

## 📊 Ringkasan Arsitektur

```
Browser (Client)
    │
    ▼
Next.js 16 (App Router)
    ├── Server Components  ──► Supabase Admin (service_role)
    ├── Client Components  ──► Supabase Anon (public)
    └── API Routes         ──► NextAuth + Supabase Admin
                                      │
                                      ▼
                              Supabase PostgreSQL
                              Supabase Storage
                              Google OAuth 2.0
```

---

# 🔍 Analisis Tools Tambahan yang Umum Dipakai Developer

Berikut analisis mendalam apakah 5 tools populer ini **perlu**, **direkomendasikan**, atau **opsional** untuk ditambahkan ke SouqMasisir.

---

## 1. React Hook Form

| Aspek | Detail |
|---|---|
| **Peran** | Manajemen state & validasi form di sisi client |
| **Status saat ini** | Form di-handle manual dengan `useState` per field |
| **Wajib?** | ❌ Tidak wajib |
| **Direkomendasikan?** | ✅ **Ya, sangat direkomendasikan** |

**Kondisi saat ini:** Form di SouqMasisir (post iklan, edit profil, settings) menggunakan `useState` individual untuk setiap field. Ini sudah bekerja, tapi rawan bug saat form makin kompleks.

**Dampak jika ditambahkan:**
- ✅ Performa lebih baik — hanya field yang berubah yang re-render, bukan seluruh form
- ✅ Kode lebih bersih dan lebih sedikit boilerplate
- ✅ Error handling & dirty state (apakah form sudah diubah) jadi mudah
- ✅ Integrasi mulus dengan Zod (lihat poin 2)
- ⚠️ Perlu refactor semua form yang sudah ada

---

## 2. Zod

| Aspek | Detail |
|---|---|
| **Peran** | Schema validation untuk form & API input |
| **Status saat ini** | Validasi dilakukan manual secara ad-hoc di Client Component |
| **Wajib?** | ⚠️ Tidak wajib, tapi **sangat disarankan untuk keamanan API** |
| **Direkomendasikan?** | ✅ **Ya, sangat direkomendasikan** |

**Kondisi saat ini:** API Routes (`/api/ads`, `/api/upload`, dll.) menerima data dari client tanpa validasi schema yang ketat. Ini berisiko menerima data kotor atau malicious.

**Dampak jika ditambahkan:**
- ✅ API Routes lebih aman — input divalidasi sebelum masuk ke Supabase
- ✅ Tipe TypeScript otomatis di-*infer* dari schema Zod (`z.infer<typeof Schema>`)
- ✅ Pesan error validasi yang konsisten di frontend dan backend
- ✅ Satu schema yang dipakai di dua tempat (form + API), menghindari duplikasi
- ⚠️ Menambah sedikit boilerplate schema di awal

> **Rekomendasi praktis:** Pasangkan **Zod + React Hook Form** bersama menggunakan `@hookform/resolvers`. Ini adalah kombinasi paling umum di ekosistem Next.js modern.

---

## 3. TanStack Query (React Query)

| Aspek | Detail |
|---|---|
| **Peran** | Fetching, caching, dan sinkronisasi data di sisi browser |
| **Status saat ini** | Fetch data dilakukan via Server Components atau `useEffect` di Client Components |
| **Wajib?** | ❌ Tidak wajib |
| **Direkomendasikan?** | ⚠️ **Opsional — tergantung arah arsitektur** |

**Kondisi saat ini:** SouqMasisir sudah menggunakan pendekatan Server Components yang kuat. Data listing diambil di server, bukan di browser. Ini justru **lebih baik dari TanStack Query** untuk SEO dan FCP.

**Kapan TanStack Query relevan di SouqMasisir:**
- Jika ada fitur yang butuh data real-time di browser (misal: notifikasi, live chat)
- Jika ada data yang perlu di-refetch otomatis saat window kembali difokus
- Jika halaman `MyAds` butuh optimistic update saat hapus/edit iklan

**Dampak jika ditambahkan:**
- ✅ Fitur seperti `staleTime`, `refetchOnWindowFocus`, dan optimistic update jadi sangat mudah
- ✅ Loading & error state terpusat, tidak perlu `useState` terpisah
- ⚠️ Menambah ~30KB bundle di sisi client
- ⚠️ Bisa redundan jika sebagian besar data sudah diambil via Server Components

> **Keputusan:** Terapkan TanStack Query **hanya** untuk fitur interaktif yang butuh data browser-side. Jangan replace Server Components dengan TanStack Query — itu kemunduran arsitektur.

---

## 4. Clerk

| Aspek | Detail |
|---|---|
| **Peran** | Layanan autentikasi all-in-one (managed service) |
| **Status saat ini** | Sudah menggunakan **NextAuth.js v5 + Google OAuth** yang fully custom |
| **Wajib?** | ❌ Sama sekali tidak wajib |
| **Direkomendasikan?** | ❌ **Tidak direkomendasikan** |

**Kondisi saat ini:** Auth SouqMasisir sudah lengkap dengan NextAuth v5. Sinkronisasi user ke Supabase sudah berjalan melalui callback di `lib/auth.ts`. Sistem ini sudah *production-ready*.

**Kenapa tidak perlu Clerk:**
- ❌ Clerk adalah *managed service* berbayar — ada batasan free tier dan biaya di production
- ❌ Migrasi dari NextAuth ke Clerk = refactor besar di seluruh codebase (`session`, `auth()`, middleware)
- ❌ Menambah ketergantungan pada vendor eksternal
- ❌ Fitur Clerk seperti UI pre-built tidak sesuai dengan desain custom SouqMasisir

> **Kesimpulan:** NextAuth v5 yang sudah ada **lebih dari cukup** dan lebih fleksibel. Clerk cocok untuk proyek *greenfield* yang belum punya sistem auth, bukan untuk migrasi.

---

## 5. Upstash

| Aspek | Detail |
|---|---|
| **Peran** | Rate limiting, Redis cache, dan queue berbasis serverless |
| **Status saat ini** | Belum ada rate limiting di API Routes |
| **Wajib?** | ❌ Tidak wajib di fase awal |
| **Direkomendasikan?** | ✅ **Direkomendasikan saat traffic mulai tumbuh** |

**Kondisi saat ini:** API Routes seperti `/api/ads` dan `/api/upload` tidak memiliki rate limiting. Pengguna jahat bisa melakukan abuse (spam posting iklan, upload file tak terbatas, dll.).

**Dampak jika ditambahkan:**
- ✅ Proteksi API dari abuse dan spam iklan
- ✅ Serverless-friendly — tidak butuh Redis server sendiri, Upstash bekerja per-request
- ✅ Mudah diintegrasikan dengan Next.js via `@upstash/ratelimit`
- ✅ Juga bisa dipakai untuk caching query yang sering dipanggil (alternatif ISR)
- ⚠️ Tidak kritis saat user masih sedikit, tapi penting sebelum launch public

> **Rekomendasi:** Tambahkan Upstash Rate Limiting **sebelum launch publik**, terutama di endpoint `/api/ads` (POST) dan `/api/upload`.

---

## 📋 Tabel Keputusan Akhir

| Tool | Wajib? | Direkomendasikan? | Prioritas | Catatan |
|---|---|---|---|---|
| **React Hook Form** | ❌ | ✅ Ya | 🟡 Medium | Segera jika form makin kompleks |
| **Zod** | ❌ | ✅ Ya | 🟡 Medium | Pasangkan bersama React Hook Form |
| **TanStack Query** | ❌ | ⚠️ Opsional | 🟢 Low | Hanya untuk fitur browser-side |
| **Clerk** | ❌ | ❌ Tidak | 🔴 Skip | NextAuth sudah memadai |
| **Upstash** | ❌ | ✅ Ya | 🟡 Medium | Tambah sebelum launch publik |

### Urutan Implementasi yang Disarankan:
1. **Zod** — Amankan API Routes sekarang, risiko rendah dan benefit tinggi
2. **React Hook Form + Zod resolver** — Saat form edit/post iklan makin berkembang
3. **Upstash Rate Limiting** — Sebelum promosi/launch ke publik
4. **TanStack Query** — Hanya jika ada fitur real-time/interaktif baru
5. **Clerk** — Tidak perlu

