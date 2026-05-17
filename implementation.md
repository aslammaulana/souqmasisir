# Ads Listing Components — Implementation Plan

## Ringkasan

Membuat dua komponen card iklan (`HighlightAds` & `StandardAds`) beserta `data.ts` dummy. Di homepage, iklan di-render dalam grid `cols-2` dengan iklan `highlight: true` tampil di baris paling atas (penuh / `col-span-2`).

---

## Proposed Changes

### Data Layer

#### [NEW] `components/theme/listing/data.ts`

Type dan array dummy ads:

```ts
export type Ad = {
  id: number;
  title: string;
  image: string;        // path ke /public/ads/
  price: string;        // format "Rp. X.XXX.XXX"
  seller: string;
  time: string;         // label waktu tampil
  highlight: boolean;
};
```

3 item sesuai permintaan (Tecno Spark · Honda Beat · Lenovo ThinkPad).

---

### Components

#### [NEW] `components/theme/listing/highlight-ads.tsx`

Card **full-width** (col-span-2) untuk ads `highlight: true`.
- Gambar atas, `aspect-[16/10]`, `object-cover`, `rounded-t-xl`
- Banner biru `blue2` di bawah gambar: **⚡ Highlight**
- Body: title (2 baris max, `line-clamp-2`), price bold `black1`, seller bold, time `black3`
- Border `gray1`, rounded-xl, shadow-sm

#### [NEW] `components/theme/listing/standard-ads.tsx`

Card **half-width** (1 kolom dari grid-cols-2) untuk ads `highlight: false`.
- Layout sama tanpa banner highlight
- Gambar `aspect-square` atau `aspect-[4/3]`
- Title, price, seller, time

---

### Homepage Integration

#### [MODIFY] `app/page.tsx`

Tambahkan `<ListingSection />` di bawah `<CategorySection />`.

#### [NEW] `components/homepage/listing-section.tsx`

Komponen yang:
1. Import semua `ads` dari `data.ts`
2. Pisahkan `highlightAds` dan `standardAds`
3. Render dalam `<section>`:
   - Highlight ads: tiap item `col-span-2` di atas
   - Standard ads: tiap item 1 kolom, grid `cols-2`

---

## Verification Plan

### Manual Verification

1. Jalankan dev server: `npm run dev`
2. Buka `http://localhost:3000`
3. Scroll ke bawah CategorySection → pastikan muncul section listing iklan
4. Cek card Tecno Spark (highlight) → tampil full-width dengan banner biru "⚡ Highlight"
5. Cek card Honda Beat & Lenovo → tampil 2 kolom (grid-cols-2) di bawah
6. Pastikan gambar, harga, seller, dan waktu tampil dengan benar
7. Cek di DevTools mobile view (375px) → layout tetap rapi
