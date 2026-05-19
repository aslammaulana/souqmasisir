# Google OAuth + Supabase — Implementation Plan

## Yang Harus Disiapkan

### A. Google Cloud Console
1. Buka [console.cloud.google.com](https://console.cloud.google.com)
2. Buat project baru → `SouqMasisir`
3. **APIs & Services → OAuth consent screen** → External → isi nama app & email
4. **Credentials → Create Credentials → OAuth 2.0 Client ID**
   - Type: **Web application**
   - Authorized redirect URIs:
     ```
     http://localhost:3000/api/auth/callback/google
     https://yourdomain.com/api/auth/callback/google
     ```
5. Salin **Client ID** dan **Client Secret**

### B. Supabase
1. Buka [supabase.com](https://supabase.com) → buat project baru (gratis)
2. Masuk ke **Project Settings → API**
3. Salin:
   - `Project URL`
   - `anon/public` key
   - `service_role` key (untuk server-side)
4. Buat tabel `users` via SQL Editor (lihat schema di bawah)

### C. Environment Variables `.env.local`
```env
# Google OAuth
GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxx

# NextAuth
NEXTAUTH_SECRET=random-string-32-karakter-lebih
NEXTAUTH_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx
SUPABASE_SERVICE_ROLE_KEY=xxxx
```

---

## Database Schema (Supabase)

Jalankan di **SQL Editor** Supabase:

```sql
CREATE TABLE users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  name        TEXT,
  image       TEXT,          -- URL foto dari Google
  bio         TEXT,          -- Deskripsi toko, diisi user
  phone       TEXT,          -- Nomor HP, diisi user
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);
```

---

## File yang Dibuat / Dimodifikasi

```
app/
├── api/auth/[...nextauth]/route.ts   ← [BARU] NextAuth handler
└── api/user/profile/route.ts         ← [BARU] GET & PATCH profil user

lib/
├── auth.ts                           ← [BARU] NextAuth config
└── supabase.ts                       ← [BARU] Supabase client

app/login/page.tsx                    ← [EDIT] Hubungkan tombol Google
app/account/profile/edit/page.tsx     ← [EDIT] Pre-fill dari Google data + simpan bio & phone
```

---

## Alur Data

```
1. User klik "Login dengan Google"
        ↓
2. Google kembalikan: name, email, image
        ↓
3. NextAuth callback → cek apakah user sudah ada di Supabase
   - Jika BELUM → INSERT user baru (name, email, image dari Google)
   - Jika SUDAH → skip (tidak overwrite bio & phone yang sudah diisi)
        ↓
4. Session tersimpan (berisi id, name, email, image)
        ↓
5. /account/profile/edit → tampilkan:
   - name & image → dari Google (pre-filled)
   - bio & phone  → dari tabel Supabase (user isi sendiri)
        ↓
6. User edit bio/phone → PATCH /api/user/profile → UPDATE tabel users
```

---

## Packages yang Diinstall

```bash
npm install next-auth@beta
npm install @supabase/supabase-js
```

---

## Checklist Persiapan

- [ ] Buat project Google Cloud Console
- [ ] Aktifkan OAuth consent screen
- [ ] Buat OAuth 2.0 Client ID → salin Client ID & Secret
- [ ] Buat project Supabase → salin URL & keys
- [ ] Jalankan SQL schema di Supabase → buat tabel `users`
- [ ] Buat file `.env.local` dengan semua variabel di atas
- [ ] Konfirmasi ke saya → siap implementasi kode

---

## Estimasi Waktu

| Langkah | Waktu |
|---|---|
| Setup Google Cloud Console | 15 menit |
| Setup Supabase + tabel | 10 menit |
| Konfigurasi NextAuth + Supabase | 1 jam |
| Update UI `/login` & `/profile/edit` | 30 menit |
| **Total** | **~2 jam** |
