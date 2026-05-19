# CRUD Iklan — Implementation Plan

## Overview

User mengisi iklan dalam **3 step form**, lalu data disimpan ke **Supabase** (database + storage untuk foto).

---

## Data Schema — Tabel `ads` (Supabase)

```sql
CREATE TABLE ads (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID REFERENCES users(id) ON DELETE CASCADE,

  -- Step 1
  category_id    INT NOT NULL,
  subcategory    TEXT NOT NULL,
  kondisi        TEXT NOT NULL,          -- 'Baru' | 'Bekas'
  lokasi         TEXT NOT NULL,
  lokasi_maps    TEXT,                   -- URL Google Maps (opsional)

  -- Step 2
  cover_image    TEXT NOT NULL,          -- URL dari Supabase Storage
  images         TEXT[],                 -- Array URL (maks 2 foto tambahan)

  -- Step 3
  title          TEXT NOT NULL,
  description    TEXT NOT NULL,
  price          BIGINT NOT NULL,        -- dalam Rupiah
  whatsapp       TEXT NOT NULL,

  -- Meta
  status         TEXT DEFAULT 'active',  -- 'active' | 'sold' | 'draft'
  created_at     TIMESTAMPTZ DEFAULT now(),
  updated_at     TIMESTAMPTZ DEFAULT now()
);
```

---

## Form Steps (urutan baru)

| Step | Konten |
|---|---|
| **Step 1** | Subkategori, Kondisi, Lokasi, Google Maps URL |
| **Step 2** | Cover Photo + Photo 1 + Photo 2 |
| **Step 3** | Judul, Deskripsi, Harga, WhatsApp |

> ⚠️ Urutan step berbeda dari UI yang sudah ada (`step1-photos`, `step2-details`, `step3-description`). Perlu di-reorder.

---

## File yang Dibuat / Dimodifikasi

### Database & Storage
```
Supabase:
├── Table: ads                          ← SQL di atas
└── Storage bucket: "ad-images"         ← public bucket untuk foto
```

### API Routes
```
app/api/ads/
├── route.ts                            ← GET (list) + POST (create)
└── [id]/
    └── route.ts                        ← GET (detail) + PATCH (update) + DELETE
```

### Upload Image API
```
app/api/upload/route.ts                 ← terima file, upload ke Supabase Storage, return URL
```

### Form Components (update urutan step)
```
components/post-ads/steps/
├── step1-details.tsx                   ← subkategori + kondisi + lokasi + maps
├── step2-photos.tsx                    ← upload cover + foto tambahan
└── step3-description.tsx               ← judul + deskripsi + harga + WA
```

### Pages
```
app/myads/new/[category]/page.tsx       ← form create (sudah ada, perlu update)
app/myads/[id]/edit/page.tsx            ← form edit (sudah ada, perlu wiring ke API)
```

---

## Alur Create

```
User pilih kategori → popup subkategori
    ↓
/myads/new/[category] — Step 1
  → pilih subkategori, kondisi, lokasi
    ↓
Step 2 — upload foto
  → POST /api/upload → dapat URL foto
    ↓
Step 3 — judul, deskripsi, harga, WA
  → klik "Pasang Iklan"
    ↓
POST /api/ads { semua data }
  → INSERT ke tabel ads
    ↓
Redirect ke /myads (list iklan saya)
```

## Alur Edit

```
/myads/[id]/edit
  → GET /api/ads/[id] → pre-fill semua field
  → user ubah field
  → klik Save
    ↓
PATCH /api/ads/[id]
  → UPDATE di Supabase
```

## Alur Delete

```
Di /myads → swipe atau tombol hapus
  → DELETE /api/ads/[id]
  → Soft delete: set status = 'sold' atau hard delete
```

---

## Sprint Breakdown

### 🏃 Sprint 1 — Backend & Database (1–2 hari)
- [ ] Buat tabel `ads` di Supabase
- [ ] Buat Supabase Storage bucket `ad-images`
- [ ] `POST /api/upload` — upload foto ke Storage
- [ ] `POST /api/ads` — create iklan
- [ ] `GET /api/ads` — list iklan user (filter by `user_id`)
- [ ] `GET /api/ads/[id]` — detail iklan
- [ ] `PATCH /api/ads/[id]` — update iklan
- [ ] `DELETE /api/ads/[id]` — hapus iklan

### 🏃 Sprint 2 — Form Create (1–2 hari)
- [ ] Update urutan steps di `[category]/page.tsx`
- [ ] Rewrite `step1-details.tsx` — subkategori (dari data.ts), kondisi, lokasi, maps
- [ ] Rewrite `step2-photos.tsx` — upload file ke `/api/upload`, preview URL
- [ ] Rewrite `step3-description.tsx` — tambah field `WhatsApp`
- [ ] Connect "Pasang Iklan" → `POST /api/ads`

### 🏃 Sprint 3 — Edit & Delete + My Ads List (1 hari)
- [ ] Wire `/myads/[id]/edit` ke `GET + PATCH /api/ads/[id]`
- [ ] Tambah tombol Hapus di `/myads` → `DELETE /api/ads/[id]`
- [ ] `/myads` fetch iklan real dari `GET /api/ads` (replace dummy data)

---

## Total Estimasi
**3 sprint × 1–2 hari = 3–5 hari kerja**
