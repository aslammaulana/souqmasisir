# PRD: Favorite / Wishlist Feature

## Goals
- User dapat menyimpan iklan yang menarik untuk ditinjau kembali nanti
- Meningkatkan engagement dan waktu yang dihabiskan di platform
- Mendorong user yang belum login untuk membuat akun (gated feature)
- Mempermudah user menemukan kembali iklan yang diminati tanpa harus mencari ulang

---

## Overview
Tombol favorit pada AdsCard yang memungkinkan user menyimpan iklan. Hanya user yang sudah login yang bisa memfavoritkan. Iklan yang difavoritkan muncul di `/myads` tab Favorite.

---

## Database

Buat tabel baru di Supabase:

```sql
create table favorites (
    id         uuid primary key default gen_random_uuid(),
    user_email text not null,
    ad_id      text not null,
    created_at timestamptz default now(),
    unique(user_email, ad_id)
);
```

---

## API

### `POST /api/favorites`
- Auth required: ya — kembalikan 401 jika tidak ada session
- Body: `{ adId: string }`
- Logic: jika `(user_email, ad_id)` sudah ada di tabel → DELETE (unfavorite), jika belum → INSERT (favorite)
- Response: `{ favorited: boolean }`

---

## Hook

Buat `hooks/useFavorite.ts` yang menerima `(adId: string, initialFavorited: boolean, isLoggedIn: boolean)` dan mengembalikan `{ favorited, toggle, loading }`.

Logic `toggle`:
1. Jika `!isLoggedIn` → `router.push("/login")`, stop
2. Optimistic update: langsung flip state `favorited`
3. `POST /api/favorites` dengan `{ adId }`
4. Sukses: sync state dengan `data.favorited` dari response
5. Gagal: rollback state ke nilai sebelumnya

---

## Komponen: AdsCard

File: `components/AdsCard.tsx`

Tambah 2 props baru:
- `initialFavorited?: boolean` (default `false`)
- `isLoggedIn?: boolean` (default `false`)

Gunakan hook `useFavorite(id, initialFavorited, isLoggedIn)`.

Update tombol wishlist yang sudah ada:
- `onClick` → `toggle` dari hook
- `disabled` saat `loading === true`
- Icon `FiHeart`: jika `favorited` → `className="text-red-500 fill-red-500"`, jika tidak → `className="text-white"`

---

## Halaman: /myads tab Favorite

File: `app/myads/page.tsx` (atau tab component yang sudah ada)

- Fetch dari tabel `favorites` join `ads` berdasarkan `user_email` session yang login
- Urutkan by `created_at` descending
- Render menggunakan komponen `AdsCard` yang sudah ada dengan `initialFavorited={true}` dan `isLoggedIn={true}`
- Jika kosong: tampilkan empty state "Belum ada iklan yang difavoritkan"

---

## Behavior

| Kondisi | Aksi |
|---|---|
| User belum login, klik ❤️ | Redirect ke `/login` |
| User login, klik ❤️ belum difavoritkan | Tambah ke favorites, icon merah |
| User login, klik ❤️ sudah difavoritkan | Hapus dari favorites, icon putih |
| Request gagal | Rollback UI ke state sebelumnya |
| User di dalam `<Link>` card | `e.preventDefault()` pada toggle agar tidak navigasi ke detail iklan |