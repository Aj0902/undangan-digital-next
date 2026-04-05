# 👑 Panduan Template: Royal Gold

Template ini dirancang dengan gaya **Timeless Marble & Gold**, memberikan kesan mewah, bersih, dan eksklusif. 

## 🏗️ Struktur Modular
Template ini tidak lagi berada di satu file besar, melainkan dipecah menjadi beberapa bagian (sections) agar mudah dikelola oleh tim:

- `index.tsx`: Jantung dari template. Tempat menyatukan data klien (SaaS) dengan semua bagian visual.
- `manifest.ts`: Daftar "belanja" media. Menentukan foto apa saja yang harus diupload klien (Cover, Foto Pria/Wanita, Gallery).
- `sections/`: Berisi potongan-potongan besar halaman:
    - `HeroGate`: Halaman depan (tombol Buka Undangan).
    - `Couple`: Profil mempelai (Nama & Orang tua).
    - `EventCountdown`: Hitung mundur & Detail acara (Akad/Resepsi).
    - `Gallery`: Susunan foto-foto.
    - `DigitalGift`: Amplop digital (Rekening).
    - `Rsvp`: Form kehadiran & Buku tamu.
- `ui/`: Komponen kecil yang bisa dipakai berulang, seperti animasi `RevealText`.

## 🔄 Cara Menghubungkan ke Database
Untuk mengubah teks agar dinamis (diambil dari database klien), gunakan objek `data` yang diterima di `index.tsx`:

```tsx
// Contoh mengambil nama pengantin pria
const groom = data.client_details.groom_name;

// Contoh mengambil foto dari Cloudinary
const cover = getMedia(data.client_media, 'cover');
```

## 🎨 Kustomisasi Gaya
- **Warna**: Dominan menggunakan `#F2F2F2` (Marble), `#B89F5D` (Gold), dan `#1A1A1A` (Charcoal).
- **Font**: Menggunakan `Cinzel` untuk judul dekoratif dan `Bodoni Moda` untuk teks elegan.

## ⚠️ Catatan Penting untuk Junior
1. **Jangan mengubah file di folder template lain.** Jika butuh logic yang sama, copy kodenya ke folder `RoyalGold`.
2. **Gunakan `'use client'`** di bagian paling atas file jika kamu menggunakan `useState`, `useEffect`, atau `framer-motion`.
3. **getMedia Helper**: Selalu gunakan fungsi `getMedia` untuk mengambil gambar agar aman jika data gambar kosong (fallback).

Selamat mengembangkan! 🚀
