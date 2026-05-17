# Carousel Component — Implementation Plan

## Pakai Framer Motion atau tidak?

### Opsi A: Framer Motion ✅ (Direkomendasikan)
- **Pro:** Animasi slide yang halus dengan `drag` gesture (bisa swipe di mobile), spring physics yang natural, kode bersih
- **Con:** Tambah dependency ~100KB, perlu install

### Opsi B: CSS Transition + useState (Tanpa library)
- **Pro:** Zero dependency tambahan, bundle lebih kecil
- **Con:** Gesture swipe mobile harus manual (touch events), animasi lebih kaku

**Rekomendasi: Framer Motion** — karena ini app marketplace mobile-first, swipe gesture sangat penting untuk UX. Bundle size-nya sepadan.

---

## Proposed Changes

### Install
```
npm install framer-motion
```

---

### [NEW] `components/homepage/carousel.tsx`

Komponen carousel dengan:
- **Slide images:** `image2.png`, `image3.png`, `image4.png` dari `/public/carousel/`
- **Auto-play:** Ganti slide otomatis setiap 4 detik
- **Swipe gesture:** Drag kiri/kanan via Framer Motion `drag="x"`
- **Dots indicator:** Di bawah carousel, dot aktif lebih panjang (pill shape) warna `blue2`
- **Layout:** Full width, `rounded-2xl`, gambar menggunakan `next/image` dengan `object-cover`
- **Peek efek:** Slide kiri dan kanan sedikit terlihat (seperti referensi gambar)

---

### [MODIFY] `app/page.tsx`

Tambahkan `<Carousel />` di bawah `<Header />` sebelum konten utama.

---

## Verification Plan

### Manual Verification
1. Buka `http://localhost:3000`
2. Pastikan carousel muncul di bawah header dengan 3 gambar
3. Swipe kiri/kanan → slide berpindah dengan animasi smooth
4. Tunggu 4 detik → slide berpindah otomatis
5. Klik dots di bawah → langsung loncat ke slide tersebut
6. Cek di mobile (DevTools device mode) → swipe gesture berfungsi
