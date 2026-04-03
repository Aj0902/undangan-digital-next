# 📚 Panduan Membuat Template Baru (SaaS Undangan Digital)

Halo! Panduan ini dirancang khusus agar siapa pun (termasuk junior programmer) bisa dengan mudah menambahkan **Desain Template Baru** ke dalam sistem undangan digital ini tanpa merusak fitur yang sudah ada.

Sistem kita sudah menganut konsep *Multi-Tenant* (SaaS), artinya **Satu Website Besar bisa melayani banyak klien dengan desain (template) yang berbeda-beda.**

Agar rapi dan tidak saling bentrok, kita sepakat memisahkan setiap template ke dalam "kamar"-nya masing-masing.

---

## 📂 1. Pahami "Kamar" (Struktur Folder) Template

Setiap template baru **WAJIB** diletakkan di dalam folder `src/components/templates/`. 

Misalkan kamu mau membuat template bernama `RusticBoho`, maka strukturnya harus persis seperti ini:

```text
src/
 └── components/
      └── templates/
           └── RusticBoho/                 <-- Folder Utama Template Kamu
                ├── index.tsx              <-- Halaman utama / perakit komponen
                ├── manifest.ts            <-- Daftar "belanja" media (cover, musik, dll)
                ├── sections/              <-- (Opsional) Potongan besar: HeroCover, Guestbook, dll
                └── ui/                    <-- (Opsional) Printilan kecil: Tombol, Animasi
```

Sedangkan untuk gambar-gambar statis (seperti tekstur kertas, ornamen bunga) yang terikat dengan desain ini, simpan di:

```text
public/
 └── assets/
      └── RusticBoho/                      <-- Nama harus sama dengan folder template
           ├── images/                     <-- Simpan ornamen bunga, tekstur di sini
           └── music/
```

---

## 🛠️ 2. Langkah Demi Langkah Pembuatan

### Langkah 1: Mulai dari `manifest.ts`
Ini adalah langkah paling krusial. File manifest berfungsi memberi tahu sistem *database* dan *admin panel* kita nanti tentang: **"Template ini butuh upload gambar/lagu apa saja sih dari klien?"**

Buat file `src/components/templates/RusticBoho/manifest.ts`:

```typescript
// manifest.ts
export const TEMPLATE_ID = 'rustic-boho'; // Gunakan huruf kecil strip (kebab-case)

export const MEDIA_MANIFEST = [
  {
    key: 'cover',
    type: 'image' as const,
    label: 'Foto Cover Utama',
    required: true,
  },
  {
    key: 'music',
    type: 'audio' as const,
    label: 'Musik Latar',
    required: false,
  }
  // Tambah key lain jika butuh gallery_1, gallery_2, dll
] as const;
```

### Langkah 2: Buat Komponen Bagian (`sections`)
Daripada menulis ribuan baris kode di satu file, pecahlah desainmu. 
Misal, buat file `src/components/templates/RusticBoho/sections/HeroCover.tsx`.
Komponen di sini bebas kamu desain sesuka hati, tidak akan mengganggu template milik orang lain.

### Langkah 3: Rangkai di `index.tsx`
Ini adalah panggung utamanya. File `index.tsx` bertugas merakit data dari *database* (seperti nama mempelai, tanggal) dengan komponen visual yang sudah kamu buat.

Buat file `src/components/templates/RusticBoho/index.tsx`:

```tsx
import type { Client } from '@/types/client';
import { getMedia } from '@/types/client';
import HeroCover from './sections/HeroCover';

// Template kamu HANYA akan menerima 1 pintu masuk data, yaitu 'data'
export default function RusticBohoTemplate({ data }: { data: Client }) {
  // 1. Bongkar datanya (Destructuring)
  const { client_details: d, client_media: media } = data;

  // 2. Ambil gambar cover dari Cloudinary
  const coverUrl = getMedia(media, 'cover');

  return (
    <div className="bg-[#FAF5E9] min-h-screen">
      {/* 3. Masukkan datanya ke komponen yang kamu buat */}
      <HeroCover 
        pria={d.groom_name} 
        wanita={d.bride_name} 
        fotoDepan={coverUrl} 
      />
      
      {/* Lanjut masukkan bagian ACARA, RSVP, GUESTBOOK, dll di bawahnya */}
    </div>
  );
}
```

### Langkah 4: Daftarkan Template agar "Hidup"
Setelah selesai digambar, kamu harus mengenalkan template ini ke "Penjaga Pintu" kita agar saat URL tujuan diakses, sistem tahu template mana yang harus dipanggil.

Buka file `src/app/[slug]/page.tsx`, temukan bagian `switch (client.template_id)`, dan tambahkan template kamu:

```tsx
switch (client.template_id) {
  case 'classic-elegant': {
    const { default: ClassicElegantTemplate } = await import('@/components/templates/ClassicElegant');
    return <ClassicElegantTemplate data={client} />;
  }
  
  // ---> TAMBAHKAN DI SINI <---
  case 'rustic-boho': {
    const { default: RusticBohoTemplate } = await import('@/components/templates/RusticBoho');
    return <RusticBohoTemplate data={client} />;
  }
  // ---------------------------
```

Selesai! Sekarang jika ada klien dengan `template_id = 'rustic-boho'`, wujud undangannya akan berubah menjadi desainmu tanpa merusak desain Classic Elegant yang sebelumnya.

---

## 🗄️ 3. Struktur Data & Props (Penting!)

Agar template tidak mengalami *error* (crash) saat di-render, sangat penting untuk memahami props `data` apa saja yang dikirimkan melalui URL *slug* (pemetaan dari *database*). 
Semua template **hanya menerima satu props utama** bernama `data` dengan tipe bawaan `Client`.

Berikut adalah struktur pemetaan data dari *backend* ke komponen React kamu:

```typescript
// Objek "data" yang kamu terima membawa bentuk struktur ini:
export interface Client {
  id: string;               // UUID klien (wajib dikirim saat submit RSVP/Guestbook)
  slug: string;             // URL tujuan (contoh: 'siti-zaed-2026')
  template_id: string;      // Identitas template (contoh: 'rustic-boho')
  
  // ---> Data Teks Undangan (Tabel: client_details)
  client_details: {
    bride_name: string;             // Panggilan wanita (contoh: "Siti")
    groom_name: string;             // Panggilan pria (contoh: "Zaed")
    bride_parents: string | null;   // Nama orang tua wanita
    groom_parents: string | null;   // Nama orang tua pria
    akad_datetime: string | null;   // Waktu akad (format tanggal ISO)
    resepsi_datetime: string | null;// Waktu resepsi (format tanggal ISO)
    resepsi_venue_name: string | null;
    resepsi_venue_address: string | null;
    bank_accounts: Array<{ bank: string; name: string; number: string }>; // Array Rekening
  };
  
  // ---> Data Array File (Tabel: client_media - Diambil dengan Helper getMedia)
  client_media: Array<{
    media_key: string;       // Nama kunci sesuai manifest (opsi: 'cover', 'music')
    media_type: string;      // 'image' | 'audio' | 'video'
    cloudinary_url: string;  // URL langsung ke gambar
  }>;
}
```

**Aturan Emas:** Selalu bongkar (*destructure*) data secara persis seperti penamaan di atas. Jangan memanggil variabel yang tidak ada dalam daftar untuk mencegah *Undefined Error*.

---

## 💡 4. Tips Anti Error & Rapi

1. **JANGAN Import dari Folder Template Lain!** 
   Template `RusticBoho` **haram** mengambil komponen dari `src/components/templates/MagazineTheme/`. Jika ada komponen yang sepertinya mirip (misal logic Guestbook), silakan di-*copy-paste* ke dalam folder `sections` template kamu sendiri, lalu modifikasi. Ini mencegah efek domino jika suatu saat template A diubah, template B rusak.
2. **Konsistensi Penamaan**
   - **Nama folder template**: gunakan format `PascalCase` (contoh: `RusticBoho`, `ClassicElegant`).
   - **`TEMPLATE_ID` di manifes/skema**: gunakan format `kebab-case` (contoh: `rustic-boho`, `classic-elegant`).
3. **Wajib `'use client'` untuk Interaksi/Animasi**
   Jika komponen di dalam folder `sections/` memiliki interaksi, *hooks* negara (`useState`, `useEffect`), atau animasi (seperti Framer Motion dan Countdown), maka **WAJIB** letakkan direktif `'use client';` pada baris teratas file tersebut.
4. **Penyebutan Gambar Statis & Optimasi Vercel**
   Untuk menghemat kuota *Image Optimization* Vercel, aset statis bawaan template (seperti `daun.png` atau tekstur) **HARUS** menggunakan tag HTML standar `<img src="/assets/RusticBoho/images/daun.png" />`.
   Sebaliknya, komponen `<Image>` bawaan Next.js **HANYA diizinkan** untuk merender foto dinamis klien yang diambil dari Cloudinary.
5. **Data Null / Kosong (Fallback)**
   Selalu siapkan *fallback* (nilai cadangan) agar UI tidak rusak (*crash* / blank) jika klien belum mengunggah file media atau lupa mengisi detail.
   Contoh untuk gambar: `const coverUrl = getMedia(media, 'cover') || '/default.jpg';`
   Contoh untuk teks: `{d.resepsi_venue_address && <p>{d.resepsi_venue_address}</p>}`

Selamat membuat template yang estetik! 🎨🚀
