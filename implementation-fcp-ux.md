# Analisis Komponen Halaman Utama (Homepage)

Setelah melakukan pengecekan mendalam terhadap struktur halaman utama (`app/page.tsx`) dan komponen yang berada di dalamnya, berikut adalah rangkuman dari sisi Server vs Client Components:

1. `app/page.tsx`: **Server Component** (tidak ada `"use client"`)
2. `components/theme/header.tsx`: **Client Component** (menggunakan `"use client"` karena ada state seperti `useState`, `useEffect`, `useRouter`)
3. `components/homepage/carousel.tsx`: **Client Component** (menggunakan `"use client"` karena ada animasi dari *framer-motion* dan state drag/swipe)
4. `CategorySection` (`components/homepage/category/category.tsx`): **Server Component** (tidak ada `"use client"`, merupakan UI statik yang langsung me-render array dari objek konstan)
5. `components/homepage/listing-section.tsx`: **Server Component** (tidak ada `"use client"`, merupakan async server component yang melakukan fetch ke `supabaseAdmin`)
6. `components/theme/footer.tsx`: **Client Component** (menggunakan `"use client"` untuk mengecek `usePathname` dan `useSession` dari next-auth)

---

# Strategi Peningkatan FCP (First Contentful Paint) & UX

Saat ini, karena ada `export const dynamic = "force-dynamic"` di `app/page.tsx`, halaman menunggu query Supabase untuk selesai melakukan fetch sebelum HTML awal dikirim ke *browser*. Ini memperburuk metrik **Time to First Byte (TTFB)** dan ujung-ujungnya memperlambat **FCP** pengguna yang baru membuka web.

Agar UX tetap dinamis dan interaktif (pengguna langsung dapat memantau interface baru) dan FCP menjadi lebih cepat, kita dapat mengimplementasikan strategi berikut:

### 1. Menerapkan React Suspense (Streaming SSR)
Pindahkan beban pengecekan query database ke belakang latar dengan *Streaming*.
- Kita bisa membungkus `<ListingSection />` dengan `<Suspense fallback={<LoadingSkeleton />}>` di dalam `app/page.tsx`.
- \*\*Manfaat UX & FCP\*\*: Pengguna seketika akan melihat Header, Carousel, dan Categori. Tidak perlu ada "white screen" (layar putih membosankan) saat *browser* menunggu fetch iklan dari Next.js. Iklan terbaru akan otomatis muncul setelah query kelar di *background*. FCP (waktu catut HTML awal) bisa menjadi sangat rendah.

### 2. Pra-pemuatan Gambar Carousel & Skeleton State
- Carousel kita saat ini adalah Client Component yang membutuhkan waktu untuk *hydrate* di browser.
- \*\*Optimasi\*\*: Pastikan `priority={true}` pada image yang di render di view awal slider. Dengan Suspense diterapkan, image priority ini menjadi bagian dari HTML streaming awal (Pre-load instruksi).
- Di masa jeda `ListingSection` melakukan fetch, `fallback` dari `<Suspense />` haruslah visual skeleton yang menyerupai bentuk card Iklan sesungguhnya. **Secara UX, ini menghindari layout shift (CLS)**.

### 3. Caching dengan Revalidation ketimbang Force-Dynamic
Jika tidak menggunakan Suspense, rute dinamis penuh dapat melemahkan server. Terapkan Next.js Data Cache Strategy dengan `revalidate`.
- Hapus `export const dynamic = "force-dynamic"`.
- Pada *fetch* Supabase di dalam komponen `ListingSection`, gunakan fitur unstable_cache milik Next.js atau implementasikan [Incremental Static Regeneration (ISR)](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating) dengan jeda, misal `revalidate: 60` (di-cache tiap 60 detik). 
- \*\*Manfaat\*\*: Trafik super tinggi tidak mengebom database, TTFB seketika cepat laksana halaman statik, namun data tetap diperbarui setiap selang 1 menit.

### Rekomendasi Eksekusi:
Gabungkan **Suspense (Streaming)** dengan **ISR (Revalidate)**. Tampilkan Skeleton seketika, dan iklan dimuat dari cache per 60 detik. Kombinasi ini memberikan UX instan dan FCP terabaikan!

---

# Revisi & Tambahan Strategi (Analisis Lanjutan)

## ⚠️ Catatan Revisi Strategi ISR (`revalidate: 60`)

ISR dengan jeda 60 detik cocok untuk traffic tinggi, namun ada **trade-off yang perlu disadari**: jika user baru posting iklan, iklan mereka **tidak akan muncul di homepage hingga 60 detik berikutnya**. Untuk marketplace real-time seperti SouqMasisir, ini bisa terasa lambat bagi penjual.

**Alternatif yang lebih baik: On-Demand Revalidation**

Gunakan `revalidatePath('/')` yang dipanggil *tepat setelah* user berhasil posting/edit/hapus iklan. Data tetap di-cache (TTFB cepat), tapi cache di-invalidate hanya saat ada aksi nyata — bukan setiap 60 detik buta.

```ts
// Di server action setelah insert/edit/delete iklan berhasil
import { revalidatePath } from "next/cache";
revalidatePath("/"); // Invalidate cache homepage
```

---

## ⚠️ Catatan: `force-dynamic` Bisa Dipertahankan Bersama Suspense

Dokumen awal menyarankan menghapus `force-dynamic` jika memakai ISR. Namun perlu dicatat: **Suspense + `force-dynamic` adalah kombinasi yang valid**. Streaming SSR tetap berjalan, hanya saja setiap request akan selalu fresh dari DB (tidak ada stale cache). Ini pilihan yang tepat jika prioritas adalah **data real-time** (iklan baru langsung muncul tanpa delay cache). Hapus `force-dynamic` *hanya jika* memang ingin menerapkan caching.

---

## 💡 Tambahan: `app/loading.tsx` sebagai Alternatif Lebih Simpel

Next.js App Router menyediakan konvensi file `app/loading.tsx` yang secara otomatis menjadi Suspense boundary untuk seluruh halaman — tanpa perlu wrapping manual `<Suspense>` per-komponen. Ini **lebih mudah diimplementasikan** jika ingin menampilkan Skeleton untuk seluruh halaman sekaligus.

```tsx
// app/loading.tsx
export default function Loading() {
  return <HomepageSkeleton />;
}
```

Gunakan wrapping `<Suspense>` manual (seperti di Strategi 1) jika hanya ingin skeleton di bagian `<ListingSection />` saja, sementara Header, Carousel, dan Category langsung tampil — ini pengalaman UX yang lebih baik.

---

## 🏆 Strategi Final yang Direkomendasikan

Kombinasi optimal untuk SouqMasisir:

| Layer | Strategi |
|---|---|
| Streaming | `<Suspense>` wrapping `<ListingSection />` |
| Data freshness | Pertahankan `force-dynamic` (atau hapus + pakai on-demand `revalidatePath`) |
| Cache invalidation | `revalidatePath('/')` dipanggil setelah post/edit/delete iklan |
| Skeleton | Fallback Suspense berupa skeleton card yang menyerupai bentuk `AdsCard` |
| Gambar | `priority={true}` pada gambar pertama carousel |

> **Hasil:** FCP cepat (streaming + skeleton instan), data selalu fresh (no stale cache), UX smooth (no CLS), dan database tidak dibebani permintaan berlebih.

---

# 🏃 Rekomendasi Sprint

### Sprint 1 — FCP & Streaming (Prioritas Tinggi)
- [x] Bungkus `<ListingSection />` dengan `<Suspense fallback={<AdsCardSkeleton />}>` di `app/page.tsx`
- [x] Buat komponen `AdsCardSkeleton` yang menyerupai bentuk `AdsCard`
- [x] Tambahkan `priority={true}` pada gambar pertama di `carousel.tsx`

### Sprint 2 — Data Freshness & Cache (Prioritas Tinggi)
- [x] Tambahkan `revalidatePath('/')` di server action setelah post/edit/delete iklan
- [x] Evaluasi apakah `force-dynamic` perlu dipertahankan atau diganti dengan caching strategy

### Sprint 3 — Validasi & Keamanan Form (Prioritas Medium)
- [ ] Install `zod` dan `react-hook-form` + `@hookform/resolvers`
- [ ] Buat schema Zod untuk form post iklan dan validasi API Routes (`/api/ads`, `/api/upload`)
- [ ] Refactor form post/edit iklan ke React Hook Form

### Sprint 4 — Proteksi API (Sebelum Launch)
- [ ] Setup Upstash Rate Limiting di endpoint `/api/ads` (POST) dan `/api/upload`

### Sprint 5 — Opsional / Future
- [ ] Pertimbangkan TanStack Query jika ada fitur real-time (notifikasi, live chat)
- [ ] Pertimbangkan `app/loading.tsx` sebagai fallback global jika perlu skeleton seluruh halaman

