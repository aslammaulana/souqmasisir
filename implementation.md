# Post Ads — 3-Step Form Plan

## Rekomendasi Arsitektur

**Gunakan satu dynamic page** `/myads/new/[category]/page.tsx` dengan `step` state (bukan 3 URL terpisah).

### Alasan:
- Form data (foto, kondisi, judul, harga) perlu di-share antar step → lebih mudah dengan satu `useState`
- Header dan step indicator sama di setiap step
- Navigasi antar step lebih smooth (tidak ada page reload)
- Back button bisa dikontrol manual (kembali ke step sebelumnya, bukan ke URL sebelumnya)
- URL nested dalam seperti `/attribute/detail/description` tidak natural dan sulit di-maintain

---

## URL Structure

```
/myads/new/[category]        ← dynamic segment dari subkategori yang dipilih
```

Contoh: `/myads/new/handphone`, `/myads/new/makanan-siap-saji`

---

## File Structure

```
app/myads/new/
├── page.tsx                     ← grid kategori + popup subkategori
└── [category]/
    └── page.tsx                 ← 3-step form (step dikelola dengan useState)

components/post-ads/
├── data.ts                      ← data kategori & subkategori
├── popup-new.tsx                ← bottom sheet popup subkategori
└── steps/
    ├── step-indicator.tsx       ← komponen 01 ------ 02 ------ 03
    ├── step1-photos.tsx         ← Upload Cover Photo + Photo 1 + Photo 2
    ├── step2-details.tsx        ← Kondisi (dropdown), Lokasi, Google Maps URL
    └── step3-description.tsx    ← Title, Description, Harga
```

---

## Step Details

### Step 1 — Upload Photo
- Cover Photo (wajib) — upload gambar utama
- Photo 1 & Photo 2 (opsional)
- Tombol: **Continue**

### Step 2 — Item Details
- **Kondisi** — dropdown: Baru / Bekas
- **Lokasi** — dropdown area (Hay Asyir, Darrasah, Hay Sabi, dll.)
- **Lokasi Google Maps** — input URL (opsional)
- Tombol: **Continue**

### Step 3 — Description
- **Title of ad*** — input teks, max 30 char, counter `10/30`
- **Description*** — textarea, max 4096 char
- **Harga*** — input angka dengan prefix `Rp.`
- Tombol: **Continue** (submit iklan)

---

## Form State (satu objek)

```ts
type NewAdForm = {
  category: string;
  coverPhoto: File | null;
  photo1: File | null;
  photo2: File | null;
  kondisi: string;
  lokasi: string;
  googleMapsUrl: string;
  title: string;
  description: string;
  harga: string;
};
```

---

## Navigation Flow

```
/myads/new  →  klik kategori  →  popup subkategori  →  klik subkategori
→  /myads/new/[category]  (step=1)
→  Continue  →  (step=2)
→  Continue  →  (step=3)
→  Continue  →  Submit & redirect ke /myads
```
