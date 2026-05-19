# Authentication Plan — Email OTP vs Google OAuth

## Perbandingan: Email OTP vs Login Google

### Kompleksitas

| Aspek | Email OTP | Login Google (OAuth) |
|---|---|---|
| Setup awal | Sedang | Mudah |
| Infrastruktur | Butuh email service | Cukup Google Console |
| Biaya | Berbayar (atau gratis terbatas) | **Gratis** |
| Keamanan | Tinggi (OTP expire) | Tinggi (dikelola Google) |
| UX | Lebih banyak langkah | 1-2 klik selesai |
| Maintenance | Perlu kelola token, expiry | Minimal |

> **Kesimpulan:** Login Google **jauh lebih mudah** diimplementasi dan gratis. Email OTP membutuhkan email service pihak ketiga dan lebih banyak backend logic.

---

## Plan: Email OTP Login

### Pilihan Email Service

| Service | Gratis | Batas Gratis | Rekomendasi |
|---|---|---|---|
| **Resend** | ✅ | 3.000 email/bulan | ⭐ Paling mudah untuk Next.js |
| **Nodemailer + Gmail** | ✅ | ~500/hari | Cocok untuk dev/testing |
| SendGrid | ✅ | 100/hari | Populer tapi setup lebih panjang |
| Mailgun | ✅ | 100/hari (trial) | Berbayar setelah trial |

**Rekomendasi: [Resend](https://resend.com)** — SDK resmi untuk Next.js, gratis 3.000 email/bulan, setup 5 menit.

---

## Alur Implementasi Email OTP

```
User input email (/login/email)
    ↓
POST /api/auth/send-otp
    → Generate 4-digit OTP
    → Simpan OTP + expiry (5 menit) di database / Redis
    → Kirim email via Resend
    ↓
Redirect ke /login/email/verify
    ↓
User input OTP
    ↓
POST /api/auth/verify-otp
    → Cocokkan OTP dengan database
    → Jika cocok: buat session/JWT → login
    → Jika salah/expired: return error
```

---

## File yang Perlu Dibuat

### Backend (API Routes)

```
app/api/auth/
├── send-otp/route.ts      # Generate & kirim OTP via Resend
└── verify-otp/route.ts    # Verifikasi OTP, buat session
```

### Database (minimal)

Tabel `otp_tokens`:
```sql
id        | string  | primary key
email     | string
otp       | string  (4 digit, bisa di-hash)
expires_at| datetime (now + 5 menit)
used      | boolean
```

Bisa gunakan: **Supabase** (gratis, PostgreSQL), **PlanetScale**, atau **SQLite (development)**.

### Package yang Dibutuhkan

```bash
npm install resend         # Email service
npm install jsonwebtoken   # JWT session (jika tidak pakai NextAuth)
# ATAU
npm install next-auth      # Lebih lengkap, support banyak provider
```

---

## Opsi Arsitektur Session

### Opsi A: Manual JWT (lebih kontrol)
- Buat JWT sendiri setelah OTP verified
- Simpan di cookie `httpOnly`
- Middleware Next.js untuk proteksi route

### Opsi B: NextAuth.js dengan Email Provider (rekomendasi)
- NextAuth sudah handle session, cookie, JWT secara otomatis
- Tinggal konfigurasi email provider
- Support tambah Google OAuth di masa depan dengan mudah

```ts
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";

export const { handlers } = NextAuth({
    providers: [
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: "noreply@souqmasisir.com",
        }),
    ],
});
```

---

## Estimasi Waktu Setup

| Langkah | Waktu |
|---|---|
| Daftar Resend + dapat API key | 10 menit |
| Setup database (Supabase) | 15 menit |
| Buat API route send-otp | 1 jam |
| Buat API route verify-otp + session | 1 jam |
| Connect ke UI (/login/email & /verify) | 30 menit |
| **Total** | **~3 jam** |

Login Google OAuth: **~30 menit** total.

---

## Rekomendasi Final

Untuk **SouqMasisir**, gunakan keduanya:

1. **Mulai dengan Google OAuth** (cepat, gratis, mudah)
2. **Tambahkan Email OTP** setelahnya menggunakan **NextAuth + Resend**

Dengan NextAuth, kedua provider bisa hidup berdampingan dengan konfigurasi minimal.
