# 🎨 Panduan Viding Engine v3: Menambah Variasi & Widget Baru

Dokumentasi ini dibuat khusus untuk UI/UX Designer & Frontend Developer. Viding Engine v3 didesain sangat modular, sehingga menambah variasi desain (misal: Cover yang berbeda) atau menambah widget baru (misal: Buku Tamu) sangatlah instan tanpa merusak *core engine*.

Semua "otak" tampilan undangan ada di dalam folder:
👉 `src/viding-builder/widgets/`

---

## 🗂️ Memahami Struktur Folder Widget

Jika kamu membuka folder `src/viding-builder/widgets/`, strukturnya seperti ini:

```
widgets/
├── Cover/                 <-- Nama Widget (Seksi)
│   └── variants/
│       ├── Default.tsx    <-- Variasi 1 (Klasik)
│       └── Minimalist.tsx <-- Variasi 2 (Minimalis)
├── Mempelai/
│   └── variants/
│       └── Default.tsx
└── registry.tsx           <-- ✨ FILE PENTING: Buku tamu tempat mendaftarkan widget
```

Setiap file di dalam folder `variants/` adalah murni komponen React (UI) biasa yang menggunakan Tailwind CSS dan Framer Motion. Tidak ada logika *save/load database* di sini, semua itu sudah diurus oleh mesin utama secara otomatis!

---

## 🛠️ SKENARIO 1: Menambah Variasi Desain Baru
*Kasus: Kamu ingin membuat desain "Cover" tipe baru yang bernama "Luxury" gara-gara bosan dengan "Default" dan "Minimalist".*

### Langkah 1: Buat File Variasi Baru
Buat file baru bernama `Luxury.tsx` di dalam folder `src/viding-builder/widgets/Cover/variants/`.

### Langkah 2: Copy-Paste Template Dasar Ini
Buka file `Luxury.tsx` tersebut, dan *paste* kode dasar ini:

```tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { WidgetProps } from "../../registry";

export default function CoverLuxury({ clientData, isOpened, accentColor = "#D4AF37" }: Readonly<WidgetProps>) {
  // Ambil data nama pengantin dari database
  const { bride_name, groom_name } = clientData.client_details || {};

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center text-center px-6">
      
      {/* Jika undangan BUKAN posisi transisi opening, tampilkan konten utama */}
      {!isOpened && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/50 backdrop-blur-md p-10 rounded-3xl border border-white/20 shadow-2xl"
        >
          <p className="text-[10px] uppercase tracking-[0.4em] mb-4 text-white/70">Pernikahan dari</p>
          
          <h1 className="text-6xl font-serif text-white mb-2">
            {bride_name} <span style={{ color: accentColor }}>&</span> {groom_name}
          </h1>
          
          <p className="mt-6 text-xs text-white/50 italic">Desain variasi Luxury yang super mewah!</p>
        </motion.div>
      )}

    </div>
  );
}
```

### Langkah 3: Daftarkan Variasi ke Mesin Viding (Registry)
Buka file `src/viding-builder/widgets/registry.tsx`.

1. Import file-mu di bagian atas:
   ```typescript
   import CoverLuxury from "./Cover/variants/Luxury";
   ```
2. Tambahkan nama variasi-mu ke dalam objek `WIDGET_REGISTRY`:
   ```typescript
   export const WIDGET_REGISTRY: Record<string, Record<string, React.FC<any>>> = {
     cover: {
       default: CoverDefault,
       minimalist: CoverMinimalist,
       luxury: CoverLuxury, // <--- TAMBAH DI SINI! Nama key ("luxury") bebas huruf kecil.
     },
     // ... widget lainnya
   };
   ```

**BOOM! Selesai! 🎉**
Sekarang kalau User membuka Builder Viding, pas mereka klik tab "Visual Blok" di seksi Cover, akan otomatis muncul tombol varian "luxury" berdampingan dengan "default" dan "minimalist".

---

## 🚀 SKENARIO 2: Membuat Jenis Widget (Seksi) Super Baru
*Kasus: Kamu ingin membuat seksi "Cerita Lucu" yang belum pernah ada sebelumnya di sejarah Viding.*

### Langkah 1: Buat Folder Widget Baru
Masuk ke `src/viding-builder/widgets/` dan buat struktur folder baru:
`CeritaLucu/variants/Default.tsx`

### Langkah 2: Isi Komponennya
Isi file `Default.tsx` tersebut dengan kode dasar (mirip Langkah 2 di atas).
*Catatan: Kamu bisa memanggil properti apa saja dari `clientData.client_details` seperti biasa.*

```tsx
"use client";
import React from "react";
import { WidgetProps } from "../../registry";

export default function CeritaLucuDefault({ clientData }: Readonly<WidgetProps>) {
  return (
    <div className="py-20 text-center text-white">
      <h2 className="text-4xl text-amber-500 font-serif">Cerita Lucu Kami</h2>
      <p className="mt-4 opacity-70">Waktu pertama ketemu, dia jatuh di got depan rumah...</p>
    </div>
  )
}
```

### Langkah 3: Daftarkan Widget Barumu (Registry)
Buka file `src/viding-builder/widgets/registry.tsx`.

1. Import file-mu:
   ```typescript
   import CeritaLucuDefault from "./CeritaLucu/variants/Default";
   ```
2. Buat "kamar" baru di `WIDGET_REGISTRY`:
   ```typescript
   export const WIDGET_REGISTRY: Record<string, Record<string, React.FC<any>>> = {
     // ... yang lama
     ceritalucu: { // <--- BUAT KEY BARU DI SINI
       default: CeritaLucuDefault,
     },
   };
   ```

### Langkah 4: Tampilkan di Menu Builder "Pustaka Seksi"
Agar user AWAM bisa mengklik / menambahkan seksi ini ke kanvas raksasa mereka, kita harus pasang tombolnya di menu *Library*.

Buka file `src/viding-builder/lib/dummy-library.ts`.
Tambahkan di dalam array `LIBRARY_SECTIONS`:

```typescript
export const LIBRARY_SECTIONS = [
  // ... yang ada sebelumnya
  { 
    id: `lib-sec-${Date.now()}`, // ID Unik (Bebas)
    type: 'ceritalucu',          // ⚠️ WAJIB SAMA persis dengan nama key di Langkah 3 (huruf kecil)
    variant: 'default',          // Variasi awal saat di-klik
    label: 'Seksi Cerita Lucu',  // Nama tombol yang muncul di UI Builder
    bg: '#242a30'                // Preview warna background di menu
  },
];
```

**SELAMAT! 🎉**
Sekarang kalau User membuka *BottomSheet Builder* lalu klik tombol "Pustaka Seksi", akan muncul kotak baru bernama "Seksi Cerita Lucu". Begitu diklik, boom! Tampil di undangan.

---

## 📚 Kamus Data (Database Props)

Di dalam widget, kamu bisa mengakses data dari database lewat objek `clientData`. Berikut adalah daftar "Kunci" (Key) yang bisa kamu panggil:

### 1. Data Teks (`clientData.client_details`)
| Key | Deskripsi | Contoh Penggunaan |
| :--- | :--- | :--- |
| `bride_name` | Nama panggilan wanita | `clientData.client_details.bride_name` |
| `groom_name` | Nama panggilan pria | `clientData.client_details.groom_name` |
| `bride_full_name` | Nama lengkap wanita | `clientData.client_details.bride_full_name` |
| `groom_full_name` | Nama lengkap pria | `clientData.client_details.groom_full_name` |
| `bride_parents` | Nama orang tua wanita | `clientData.client_details.bride_parents` |
| `groom_parents` | Nama orang tua pria | `clientData.client_details.groom_parents` |
| `prologue_text` | Teks pembuka/prolog | `clientData.client_details.prologue_text` |
| `akad_datetime` | Waktu Akad (ISO) | `clientData.client_details.akad_datetime` |
| `akad_venue_name` | Nama Lokasi Akad | `clientData.client_details.akad_venue_name` |
| `resepsi_datetime`| Waktu Resepsi (ISO) | `clientData.client_details.resepsi_datetime` |
| `bank_accounts` | Array Rekening Hadiah | `clientData.client_details.bank_accounts.map(...)` |

### 2. Data Media (Foto & Musik)
Gunakan helper `getMedia(clientData.client_media, 'KEY')` untuk mengambil URL-nya:
- `'cover'`: Foto sampul utama.
- `'music'`: File musik latar.
- `'bride_photo'`: Foto profil mempelai wanita.
- `'groom_photo'`: Foto profil mempelai pria.
- `'gallery_01'` s/d `'gallery_06'`: Foto-foto galeri masonry.

---

## 🛠️ Utility Helpers (Biar Gak Repot)

Kami sudah menyediakan fungsi bantuan agar kamu tidak perlu coding ribet untuk urusan format tanggal atau jam:

### 1. Format Tanggal & Jam
Import fungsinya di bagian atas file:
```tsx
import { formatDate, formatTime } from "@/types/client";
```
Cara pakainya di dalam UI:
```tsx
<p>{formatDate(clientData.client_details.akad_datetime)}</p> 
// Hasil: "12 Desember 2026"

<span>{formatTime(clientData.client_details.akad_datetime)}</span>
// Hasil: "08:00 WIB"
```

### 2. Memanggil Gambar
Import fungsinya:
```tsx
import { getMedia } from "@/types/client";
```
Cara pakainya:
```tsx
<img src={getMedia(clientData.client_media, 'cover') ?? '/fallback.jpg'} />
```

---

## 🎨 Tips Emas untuk UI/UX Designer Mengerjakan Code

1. **Jaga `z-index` tetap relatif rendah (z-10, z-20)**. Jangan pakai `z-50` berhamburan di dalam widget, karena akan menutupi UI editor builder milik sistem.
2. **Animasi Masuk PENTING**. Gunakan `framer-motion` saat komponen *masuk ke layar* (`whileInView`). Ini membedakan Viding Premium dengan undangan PDF murah.
    ```tsx
    // Contoh animasi elegan (muncul saat disentuh kursor/layar)
    <motion.div
       initial={{ opacity: 0, y: 30 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true, margin: "-100px" }}
       transition={{ duration: 0.8 }}
    >
       Kontenku
    </motion.div>
    ```
3. **Handle Data Kosong**. Klien terkadang malas mengisi form (misal: "Nama Ibu" dikosongkan). Pastikan widget tidak *Error/Hancur* walau data tidak ada.
    ```tsx
    // BAGUS:
    {bride_parents && <p>{bride_parents}</p>}
    
    // JELEK (Tampil string kosong yang merusak spacing css):
    <p>{bride_parents}</p> 
    ```
4. **Terima "Warna Aksen" (Accent Color)**. Jangan *harcode* warna (kecuali putih/hitam). Terimalah prop `accentColor` dari user agar desainmu menyesuaikan tema warna pilihan user lewat global settings editor.
    ```tsx
    export default function Aku({ accentColor = "#D4AF37" }: WidgetProps) {
       return <h1 style={{ color: accentColor }}>Warna Bunglon</h1>
    }
    ```
