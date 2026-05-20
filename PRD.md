# PRD — SouqMasisir (MasisirPedia.com)

**Versi:** 1.0  
**Status:** MVP Selesai  
**Tanggal:** Mei 2026  
**Author:** Founder / Web Developer

---

## 1. Latar Belakang & Masalah

Komunitas Mahasiswa Indonesia di Mesir (**Masisir**, ~20.000 orang di Cairo) selama ini mengandalkan puluhan grup WhatsApp yang tidak terorganisir untuk kegiatan jual beli, penawaran jasa, dan informasi sewa rumah. Dampaknya:

- Informasi dan iklan **tenggelam** dalam hitungan jam
- Penjual harus **spam setiap hari** agar tetap terlihat
- Pembeli kesulitan **mencari barang/jasa** spesifik yang dibutuhkan
- Tidak ada **sumber terpusat dan terpercaya** untuk kebutuhan komunitas

Kompetitor sebelumnya pernah mencoba mengisi celah ini namun gagal karena UX buruk dan data yang tidak ter-update.

---

## 2. Solusi

**SouqMasisir** adalah platform marketplace berbasis web, seperti OLX, yang dirancang khusus untuk komunitas Masisir di Cairo. Penjual cukup posting iklan sekali dan iklan tetap terlihat selama aktif. Pembeli dapat menemukan apa yang dibutuhkan dalam hitungan detik melalui pencarian dan browsing kategori.

---

## 3. Target Pengguna

| Segmen | Deskripsi |
|---|---|
| **Pembeli / Pencari** | Masisir yang butuh barang, jasa, atau tempat tinggal |
| **Pengusaha Masisir** | Penjual makanan, penyedia jasa, pemilik toko |
| **Pemilik Properti** | Penyewa kamar kost / apartemen |
| **Masisir Baru** | Mahasiswa yang baru tiba dan butuh perlengkapan awal |
| **Mahasiswa Asia Tenggara** | Mahasiswa Malaysia, Thailand, dll di Cairo |

---

## 4. Kategori & Subkategori

| # | Kategori | Subkategori |
|---|---|---|
| 1 | **Makanan & Minuman** | Masakan Indonesia, Katering & Pesanan, Kue & Jajanan, Sembako & Bahan Masak, Minuman & Frozen Food |
| 2 | **Properti & Sewa** | Sewa Kamar/Kost, Sewa Apartemen, Cari Teman Sekamar, Jual Properti |
| 3 | **Jasa Taushil & Transportasi** | Antar Jemput Bandara, Antar Barang & Titip, Sewa Kendaraan, Jasa Pemandu/Guide |
| 4 | **Jasa Harian** | Laundry & Setrika, Potong Rambut, Pijat & Kesehatan, Jasa Kebersihan, Jahit & Bordir |
| 5 | **Elektronik & Gadget** | Handphone & Tablet, Laptop & Komputer, Aksesoris Gadget, Kamera & Foto |
| 6 | **Perabot & Kebutuhan Rumah** | Furnitur Bekas, Peralatan Dapur, Kebutuhan Kamar, Elektronik Rumah Tangga |
| 7 | **Lowongan & Jasa Profesional** | Lowongan Kerja, Jasa Desain & Kreatif, Les & Bimbel, Jasa Terjemah, Jasa IT & Teknis |
| 8 | **Fashion & Keperluan Pribadi** | Pakaian Pria & Wanita, Mukena/Hijab & Aksesoris, Obat & Suplemen, Kosmetik & Perawatan, Buku & Kitab |

---

## 5. Fitur & Halaman (MVP)

### 5.1 Halaman & Routing

| Route | Deskripsi |
|---|---|
| `/` | Homepage — carousel, kategori, iklan terbaru |
| `/ads` | Halaman hasil pencarian iklan |
| `/ads/[slug]` | Detail iklan |
| `/category/[slug]` | Listing iklan per kategori |
| `/account` | Halaman profil ringkas + navigasi menu |
| `/account/profile` | Detail profil lengkap user |
| `/account/profile/edit` | Edit profil user |
| `/myads` | Daftar iklan milik user + Tab Favourites |
| `/myads/new` | Pilih kategori untuk pasang iklan |
| `/myads/new/attributes` | Multi-step form pasang iklan (4 langkah) |
| `/myads/[id]/edit` | Edit iklan yang sudah ada |
| `/login` | Halaman login (Google OAuth) |
| `/login/email` | Login dengan email |
| `/login/email/verify` | Verifikasi OTP 4 digit (dikirim ke email) |

### 5.2 Fitur Inti (MVP Selesai)

#### Autentikasi
- Login via **Google OAuth** (NextAuth.js)
- Login via **Email + OTP** (4-digit kode, dikirim ke email)
- Session berbasis JWT dengan data user dari Supabase (nama, foto, bio, telepon)
- Proteksi route: halaman `/myads`, `/account` membutuhkan login

#### Pasang Iklan (Multi-Step Form)
- **Step 0**: Pilih kategori utama
- **Step 1**: Upload foto (cover + galeri), dengan konversi otomatis ke **WebP** di browser sebelum upload ke storage (menghemat storage)
- **Step 2**: Detail iklan (kondisi, lokasi, nomor WhatsApp dengan selector profil/custom)
- **Step 3**: Judul & deskripsi iklan
- Data iklan: `title`, `description`, `price`, `lokasi`, `kondisi`, `category`, `subcategory`, `cover_image`, `images[]`, `whatsapp`
- Status iklan: `active`, `inactive`, `deleted`

#### Edit & Hapus Iklan
- Form edit dengan dynamic category-subcategory dropdown
- Delete iklan dengan konfirmasi
- Update gambar (konversi WebP juga diterapkan)

#### Pencarian Iklan
- Pencarian berdasarkan `title`, `subcategory`, `lokasi`
- Hasil real-time dengan jumlah listing ditemukan

#### Favorit / Wishlist
- Tombol ❤️ di setiap kartu iklan
- Optimistic update (UI berubah instan, rollback jika gagal)
- Redirect ke `/login` jika belum login
- Tab **Favourites** di `/myads` menampilkan semua iklan yang disimpan
- Urutan: iklan yang paling baru difavoritkan muncul paling atas

#### Profil User
- Nama, foto profil, bio, dan nomor WhatsApp
- Edit profil dengan upload foto profil (konversi WebP)
- Integrasi WhatsApp number untuk digunakan saat pasang iklan

#### Konversi Gambar WebP (Client-Side)
- Semua gambar dikonversi ke format **WebP** (kualitas 85%) di browser sebelum dikirim ke Supabase
- Menghemat storage secara signifikan
- Transparansi PNG dipertahankan (background putih)

---

## 6. Arsitektur Teknis

| Layer | Teknologi |
|---|---|
| **Framework** | Next.js 14+ (App Router) |
| **Bahasa** | TypeScript |
| **Styling** | Vanilla CSS + Tailwind CSS |
| **Database** | Supabase (PostgreSQL) |
| **Storage** | Supabase Storage |
| **Auth** | NextAuth.js v5 (Google + Email OTP) |
| **Hosting** | Vercel (Free Tier) |
| **Domain** | masisirpedia.com |

### Tabel Database Utama

| Tabel | Kolom Utama |
|---|---|
| `users` | `id`, `email`, `name`, `image`, `bio`, `phone`, `created_at` |
| `ads` | `id`, `user_id`, `title`, `description`, `price`, `lokasi`, `kondisi`, `category`, `subcategory`, `cover_image`, `images`, `whatsapp`, `status`, `created_at` |
| `favorites` | `id`, `user_email`, `ad_id`, `created_at` |

---

## 7. Algoritma Ranking Iklan

Urutan tampil iklan ditentukan oleh kombinasi faktor:

**Faktor Profil & Listing:**
1. Kelengkapan profil penjual (foto profil, deskripsi, WA verified)
2. Kelengkapan listing (foto, deskripsi detail, harga jelas)
3. Umur akun penjual
4. Waktu posting iklan

**Sinyal Interaksi (Planned):**
1. Jumlah klik "Hubungi via WA"
2. Jumlah favorit/bookmark
3. Jumlah views listing

**Moderasi (Planned):**
1. Laporan spam → peringkat turun
2. Tidak ada foto atau foto tidak sesuai → peringkat turun

> Saat ini (MVP): iklan diurutkan berdasarkan `created_at` descending.

---

## 8. Model Bisnis

### Fase 1 — 0–6 Bulan: Akuisisi Pengguna
- **Semua fitur gratis**
- Fokus mengisi platform dengan listing dan user pertama
- Onboarding pengusaha secara aktif oleh tim lapangan Cairo
- Distribusi via grup WhatsApp komunitas Masisir

### Fase 2 — 6–12 Bulan: Monetisasi
| Fitur | Model |
|---|---|
| Boost Postingan | Iklan muncul di teratas 7/14 hari |
| Banner Iklan Beranda | Per minggu |
| Paket Toko Pro | Upload foto lebih banyak, badge verified, statistik kunjungan |
| Sponsorship & Partnership | Brand/bisnis yang relevan dengan komunitas |
| Layanan Transfer & Pulsa | Layanan tambahan berbasis komunitas |

### Struktur Biaya
| Item | Biaya |
|---|---|
| Domain | ~Rp 150.000/tahun |
| Hosting (Vercel) | Gratis |
| Storage (Supabase) | Gratis (free tier) |
| Pengembangan | Mandiri (founder = developer) |
| Tim lapangan Cairo | Bagi hasil / volunteer di awal |

---

## 9. Keunggulan Kompetitif

- **Founder adalah mantan Masisir** — memahami masalah secara langsung dari pengalaman
- **Ada tim lapangan aktif di Cairo** — untuk onboarding dan verifikasi data
- **Biaya pengembangan sangat rendah** — founder merangkap developer
- **Kompetitor sebelumnya gagal** karena UX buruk dan data tidak ter-update — kesempatan nyata untuk masuk

---

## 10. Hubungan & Channel

| Channel | Detail |
|---|---|
| Grup WhatsApp Masisir | Promosi awal dan distribusi organik |
| Tim lapangan Cairo | Onboarding langsung pengusaha & penjual |
| PPMI & Organisasi Mahasiswa | Kolaborasi resmi dengan lembaga pelajar |
| Word of Mouth | Senior Masisir berpengaruh sebagai duta |
| Media Sosial Komunitas | Instagram, TikTok komunitas Masisir |

---

## 11. Roadmap

### ✅ MVP (Selesai)
- [x] Autentikasi Google + Email OTP
- [x] Pasang, edit, hapus iklan
- [x] Upload gambar dengan konversi WebP
- [x] Pencarian iklan
- [x] Browse per kategori
- [x] Fitur Favorit / Wishlist
- [x] Profil user + edit profil
- [x] Halaman detail iklan dengan WhatsApp CTA

### 🔄 Fase Berikutnya (Planned)
- [ ] Algoritma ranking berbasis interaksi (views, WA clicks, favorites)
- [ ] Sistem review & rating penjual
- [ ] Push notification (new message, iklan dilihat)
- [ ] Fitur Boost iklan (monetisasi)
- [ ] Statistik kunjungan iklan untuk pengusaha
- [ ] Badge verified untuk penjual
- [ ] Admin panel untuk moderasi konten
- [ ] Laporan / report iklan mencurigakan
- [ ] Peta lokasi terintegrasi (Google Maps)
- [ ] Multi-bahasa (ID + EN + Arab)
