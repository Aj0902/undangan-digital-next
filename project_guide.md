# 📘 Panduan Komprehensif Proyek: Sistem Web Undangan Digital Premium

## 1. 📌 Visi & Deskripsi Proyek
Proyek ini bertujuan untuk membangun sebuah **Platform Web Undangan Digital** yang berskala penuh (Production-Ready), estetik, berkinerja tinggi, dan siap dipublikasikan ke publik. Aplikasi ini dirancang untuk melampaui standar MVP (Minimum Viable Product) dengan struktur kode yang modular, skalabel, serta mengimplementasikan *Best Practices* modern dalam rekayasa *frontend* dan iterasi performa.

Panduan ini ditujukan baik bagi programmer junior yang ingin belajar arsitektur rapi maupun asisten AI (*Cursor*, *Copilot*) yang membutuhkan *prompt/context* berstandar tinggi.

## 2. 🏗️ Arsitektur & Teknologi Utama
- **Framework Core:** [Next.js](https://nextjs.org/) (Menggunakan **App Router** di dalam `/src/app`)
- **Bahasa Pengecekan:** TypeScript (Strict Mode aktif untuk meminimalisasi bug di *runtime*)
- **Styling UI:** [Tailwind CSS](https://tailwindcss.com/) dengan arsitektur kombinasi modular (utilitas `cn()` / `clsx` + `tailwind-merge`)
- **Komponen & Animasi:** [Radix UI](https://www.radix-ui.com/) (Opsional untuk aksesibilitas *headless*) & [Framer Motion](https://www.framer.com/motion/) (Untuk memanjakan mata melalui animasi scroll)
- **State & Data Mutating:** Next.js Server Actions & React Hook Form + Zod (Untuk validasi formulir berlapis yang aman)
- **Database & Backend:** [Supabase](https://supabase.com/) (PostgreSQL dengan integrasi Row Level Security)
- **Deployment & Edge CDN:** Vercel Hosting

## 3. 📂 Standar Struktur Folder (Directory Layout)
Wajib menggunakan struktur terorganisir berikut guna kemudahan *maintenance* dalam jangka panjang.

```text
/
├── public/                 # Aset statis (font custom, ikon, og-image, musik mp3)
├── src/
│   ├── app/                # Next.js App Router (Sistem Rute)
│   │   ├── (invite)/       # Route group undangan (misal: /[guestName])
│   │   ├── api/            # Route handlers (Jika tidak pakai Server Actions)
│   │   ├── layout.tsx      # Global layout, penerapan Meta SEO, & Font Providers
│   │   └── page.tsx        # Halaman Root / Fallback
│   ├── components/         # Direktori UI Modular
│   │   ├── ui/             # Reusable base/atom component (Button, Modal, Input)
│   │   └── sections/       # Komponen block besar (HeroCover, RsvpBlock, Timeline)
│   ├── lib/                # Konfigurasi library (supabase client `supabase.ts`, utilitas helper)
│   ├── types/              # Deklarasi global TypeScript (`database.types.ts`)
│   ├── hooks/              # Custom Hooks (`useAudioPlayer`, `useIntersectionObserver`)
│   └── actions/            # Next.js Server Actions untuk interaksi langsung ke Supabase
├── tailwind.config.ts      # Aturan *Design Token* proyek (Warna, Font, Breakpoints)
└── .env.local              # Penyimpanan Kredensial Environment
```

## 4. ✨ Spesifikasi Fitur Skala Produksi
Platform memiliki kompleksitas visual layaknya aplikasi *high-end*. Fitur-fiturnya mencakup:

1. **Dinamisasi Tautan Undangan (URL Params Tracker)**
   - Mendukung format *slug* khusus: `domain.com/[nama-tamu]` atau `domain.com/?to=[nama-tamu]`
   - Tulisan ucapan sapaan di cover akan menyesuaikan otomatis dengan nama tamu (tanpa konfigurasi DB terpisah jika diset ringan).
2. **Visual & Animations First-Class**
   - Transisi masuk (*fade-up*, *zoom-out*) yang berjalan presisi menggunakan Intersection Observer/Framer Motion.
   - *Audio Player Auto-play Mechanism* yang *browser-compliant* (otomatis play saat pengguna klik/buka cover pertama kali).
3. **Data Management & RSVP Absensi (Zod Validation)**
   - Form pintar: Pilihan opsi "Tidak Hadir" akan menonaktifkan input "Jumlah Orang".
   - Form RSVP menggunakan ekosistem *React Hook Form* divalidasi oleh *Zod* (mencegah SQL Injection/spam dan menjamin data *typesafe*).
   - Buku Tamu ter-load elegan dengan fitur simulasi *realtime* (via Supabase Subscriptions) atau Polling ringan, beserta filter urutan waktu.
4. **Wedding Gift / Amplop Pintar**
   - Interaksi dompet digital yang intuitif dengan fitur "Salin Nomor Rekening/Virtual Account" yang mengeluarkan *Toast Notification* saat berhasil disalin.
5. **SEO & OpenGraph Optimizations**
   - Impelementasi Meta Tags otomatis.
   - Apabila URL diposting ke WhatsApp/Telegram/Instagram, akan otomatis muncul gambar *Preview (OG Image)* dengan resolusi apik, Judul eksklusif, dan Deskripsi sapaan undangan.

## 5. 🗄️ Desain Skema Database (Supabase)
### Tabel: `rsvp_responses`
Tabel tunggal untuk menampung presensi guna efisiensi proyek tunggal.
- `id` (uuid, Primary Key)
- `guest_name` (text, Not Null)
- `attendance_status` (boolean, Not Null)
- `pax` (integer, Not Null, minimal: 0, default: 0)
- `greeting_message` (text)
- `created_at` (timestamptz, Not Null, default: now())

> **Keamanan Lapisan Data (RLS - Row Level Security)**
> Di Supabase, aktifkan RLS dengan kebijakan:
> - `Enable Select`: Perbolehkan public anon untuk memanggil data ulasan (`SELECT`).
> - `Enable Insert`: Perbolehkan public anon untuk `INSERT` row baru, namun batasi ukuran *string* text pada *form rules* Zod agar database tidak *overflow*.
> - `Update/Delete`: Blokir secara publik (Hanya *authenticated admin*).

## 6. 🚀 Rencana Eksekusi Bertahap (Roadmap Development)

### Tahap 1: Inisiasi Infrastruktur (Day 1)
- Lakukan bootstrap `npx create-next-app@latest .` dan pastikan konfigurasi App Router, TS, serta integrasi Tailwind mematuhi direktori `src`.
- Setup Linter (`ESLint`) dan Formatter (`Prettier`), termasuk integrasi *Husky* & *lint-staged* (Jika untuk tim).
- Buat *Project* di Supabase Dashboard, eksekusi Query SQL pendaftaran `rsvp_responses`, aktifkan RLS.

### Tahap 2: Pembentukan *Design System* (Day 2)
- Integrasikan *Google Fonts* khusus menggunakan modul lokal Next.js (`next/font/google`). Siapkan sepasang font (misal: *Cormorant Garamond* & *Montserrat*).
- Pindahkan *Color Palettes* referensi figma ke config utilitas `tailwind.config.ts` (jangan menggunakan string arbitrer pada class, biasakan pakai misal: `bg-brand-primary`).
- Bangun UI Primitives awal: Tombol standar, Input Text standar, *Section Wrapper*.

### Tahap 3: Konstruksi UI Layar Utama - Statis (Day 3-4)
- Bangun satu per satu hierarki seksi komponen di `/components/sections`: `Cover`, `HeroProfile`, `EventDetails`, `GalleryView`, `GiftBox`, `RsvpSection`.
- Lakukan *Testing Viewport* menggunakan alat DevTools. Layar *mobile-first* (max-width: 500px pada pembungkus luar/box body jika menginginkan desain terpusat seperti undangan digital pada umumnya).

### Tahap 4: Menjadikannya Dinamis & State Integration (Day 5)
- Terapkan validasi `Zod` bersamaan dengan `React Hook Form` pada *Form* di komponen `RsvpSection`.
- Konversi aksi tombol *Submit Form* menggunakan server action `submitRsvp` di direktori `src/actions/rsvp.ts`.
- Konversi komponen penampil buku tamu menggunakan Fetch data *Server Component* yang dilengkapi mode paralelisasi (*Suspense Fallback* / `loading.tsx`).

### Tahap 5: Sentuhan Ajaib (*Polishing* & Animasi) (Day 6)
- Tambahkan library animasi `framer-motion` untuk mengatur kemunculan elegan saat setiap sub-komponen ter-deteksi melintasi garis pandang layar.
- Perhalus interaktivitas seperti *Hover State* dan *Toast Feedback*.
- Sisipkan integrasi audio (`useRef` pada instance elemen `<audio>`) yang diatur oleh satu tombol kontrol melayang (*floating button*).

### Tahap 6: Performa & Deployment Produksi (Day 7)
- Cek tab *Network* di inspect element untuk memastikan gambar resolusi tinggi terkalkulasi & dikonversi menjadi format Next.js `<Image />` (`.webp`/`.avif`) yang optimal.
- Lakukan `npm run build` dan identifikasi apabila ada kebocoran TS errors.
- Hubungkan dengan repository Vercel untuk mempublikasikan proyek.

## 7. 💡 Aturan *Clean Code* & Kolaborasi
- **Prinsip Modular**: Segala hal yang dipanggil lebih dari 2 kali (Misal *Card* ucapan tamu, atau ikon SVG *divider*) **wajib** dipisahkan menjadi komponen unik.
- **Strict Typing**: Hindari pemakaian tipe `any`. Seluruh parameter yang dilempar antar komponen harus memiliki definisi *interface* atau *type* mandiri.
- **SEO & Meta Aware**: Jangan membiarkan *title* halaman berisi *Create Next App*. Lakukan injeksi meta di dalam file root `layout.tsx` secara eksplisit.
- **Error Boundaries**: Untuk setiap proses eksekusi fungsionalitas asinkron yang dapat memicu *timeout*, berikan UI Error State (Bisa berupa Alert atau Toast), jangan sampai layarnya *freeze* putih tanpa ada interaksi untuk pengguna.
