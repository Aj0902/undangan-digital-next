# 🚀 ROADMAP: Upgrade MVP → Platform SaaS Undangan Digital (Multi-Tenant)

> **Tujuan:** Mengubah project undangan single-client ini menjadi platform SaaS yang mampu melayani puluhan klien sekaligus dengan satu codebase dan satu database Supabase.

---

## 🔍 Kondisi Saat Ini (MVP)

Sebelum kita mulai, pahami dulu apa yang sudah ada:

| Komponen | Kondisi Saat Ini | Masalah untuk SaaS |
|---|---|---|
| **Routing** | Hanya ada 1 halaman (`/`) di `src/app/page.tsx` | Semua klien memakai URL yang sama |
| **Data Klien** | Nama, tanggal, foto hard-coded langsung di component | Tidak bisa ganti per-klien |
| **Database** | Tabel `mpv-undangan-digital` tanpa kolom `slug` | RSVP semua klien tercampur jadi satu |
| **Template** | Satu desain fixed (Siti & Zaed) | Tidak bisa ganti tema per-klien |

---

## 📋 PHASE 1 — Desain Ulang Database Supabase

> **Analogi:** Bayangkan database kamu seperti buku catatan. Sekarang semua klien nulis di halaman yang sama. Kita akan buat sistem buku yang terpisah per-klien.

### 1.1 — Buat Tabel `clients` (Data Master Klien)

Tabel ini adalah "daftar klien" kamu sebagai agency. Satu baris = satu proyek undangan.

```sql
CREATE TABLE public.clients (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug        text NOT NULL UNIQUE,          -- URL unik, contoh: "siti-zaed-2026"
  template_id text NOT NULL DEFAULT 'classic-elegant', -- Tema desain yang dipakai
  is_active   boolean NOT NULL DEFAULT true, -- On/Off switch per klien
  created_at  timestamptz DEFAULT now() NOT NULL
);
```

**Kenapa perlu `slug`?**
URL klien akan jadi `undanganku.com/siti-zaed-2026`. Kolom `slug` ini yang jadi "kunci" untuk membedakan satu klien dengan klien lainnya.

### 1.2 — Buat Tabel `client_details` (Konten Undangan)

Semua teks yang dulu di-hardcode di component, pindah ke sini.

```sql
CREATE TABLE public.client_details (
  id                 uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id          uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  
  -- Data Pasangan
  bride_name         text NOT NULL,           -- "Siti"
  groom_name         text NOT NULL,           -- "Zaed"
  bride_full_name    text,
  groom_full_name    text,
  bride_parents      text,
  groom_parents      text,
  
  -- Data Acara
  akad_datetime      timestamptz,
  akad_venue_name    text,
  akad_venue_address text,
  resepsi_datetime   timestamptz,
  resepsi_venue_name text,
  resepsi_venue_address text,
  
  -- Konten Teks
  prologue_text      text,
  
  -- Rekening Hadiah
  bank_accounts      jsonb DEFAULT '[]'::jsonb, -- Array rekening: [{bank, name, number}]
  
  created_at         timestamptz DEFAULT now() NOT NULL
);
-- ⚠️ CATATAN: cover_image_url dan music_url TIDAK disimpan di sini.
-- Semua media (gambar & audio) dikelola di tabel `client_media` yang terpisah.
-- Ini agar setiap template punya fleksibilitas untuk kebutuhan media yang berbeda.
```

### 1.3 — Ubah Tabel RSVP (Tambah Kolom `client_id`)

Tabel RSVP yang lama harus dihapus dan dibuat ulang dengan penghubung ke klien.

```sql
-- Hapus tabel lama
DROP TABLE IF EXISTS public."mpv-undangan-digital" CASCADE;

-- Buat tabel RSVP baru yang ter-relasi ke tabel clients
CREATE TABLE public.rsvp_responses (
  id                uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id         uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  guest_name        text NOT NULL,
  attendance_status boolean NOT NULL,
  pax               integer NOT NULL DEFAULT 1,
  greeting_message  text,
  created_at        timestamptz DEFAULT now() NOT NULL
);

-- Aktifkan RLS
ALTER TABLE public.clients        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvp_responses ENABLE ROW LEVEL SECURITY;

-- Policy: Semua orang boleh baca data klien yang aktif
CREATE POLICY "Public dapat baca klien aktif"
  ON public.clients FOR SELECT TO public
  USING (is_active = true);

-- Policy: Semua orang boleh baca detail klien
CREATE POLICY "Public dapat baca detail klien"
  ON public.client_details FOR SELECT TO public
  USING (true);

-- Policy: Tamu boleh insert RSVP, tapi hanya untuk klien yang ada
CREATE POLICY "Tamu boleh kirim RSVP"
  ON public.rsvp_responses FOR INSERT TO anon
  WITH CHECK (EXISTS (SELECT 1 FROM public.clients WHERE id = client_id AND is_active = true));

-- Policy: Semua orang boleh baca RSVP (untuk guestbook)
CREATE POLICY "Public dapat baca RSVP"
  ON public.rsvp_responses FOR SELECT TO public
  USING (true);
```

### 1.4 — [BARU] Buat Tabel `client_media` (Manajemen Media dengan Cloudinary)

> **Kenapa tabel terpisah, bukan kolom di `client_details`?**
> Karena setiap template punya kebutuhan media yang berbeda. Template A mungkin butuh 1 foto cover + musik. Template B mungkin butuh 6 foto galeri + video background. Kalau URL disimpan di `client_details`, kita akan ketambahan banyak kolom kosong untuk tiap template. Tabel terpisah jauh lebih fleksibel dan bersih.

> **Kenapa Cloudinary, bukan Supabase Storage?**
> Cloudinary punya transformasi gambar otomatis (resize, crop, format WebP) dan CDN global built-in. Untuk audio juga bisa. Lebih cocok untuk kebutuhan media-heavy seperti undangan pernikahan.

```sql
CREATE TABLE public.client_media (
  id                    uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id             uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  
  -- Kunci media — ini "nama peran" media dalam template
  -- Contoh: 'cover', 'music', 'gallery_1', 'gallery_2', 'bg_video'
  media_key             text NOT NULL,
  
  -- Jenis media: 'image', 'audio', 'video'
  media_type            text NOT NULL CHECK (media_type IN ('image', 'audio', 'video')),
  
  -- Data dari Cloudinary (diisi setelah upload)
  cloudinary_public_id  text NOT NULL,   -- contoh: 'undangan/siti-zaed-2026/cover'
  cloudinary_url        text NOT NULL,   -- URL lengkap dari Cloudinary (auto-generated)
  
  -- Metadata opsional
  alt_text              text,            -- deskripsi gambar untuk aksesibilitas/SEO
  display_order         integer DEFAULT 0, -- urutan untuk galeri
  
  created_at            timestamptz DEFAULT now() NOT NULL,
  
  -- Satu klien tidak boleh punya dua media dengan key yang sama
  UNIQUE(client_id, media_key)
);

-- Aktifkan RLS
ALTER TABLE public.client_media ENABLE ROW LEVEL SECURITY;

-- Policy: Siapa pun boleh baca media (untuk render di halaman undangan)
CREATE POLICY "Public dapat baca media klien"
  ON public.client_media FOR SELECT TO public
  USING (true);
```

**Contoh isi tabel `client_media` untuk klien Siti & Zaed:**

| client_id | media_key | media_type | cloudinary_public_id | cloudinary_url |
|---|---|---|---|---|
| `uuid-abc` | `cover` | `image` | `undangan/siti-zaed-2026/cover` | `https://res.cloudinary.com/.../cover.webp` |
| `uuid-abc` | `music` | `audio` | `undangan/siti-zaed-2026/music` | `https://res.cloudinary.com/.../music.mp3` |
| `uuid-abc` | `gallery_1` | `image` | `undangan/siti-zaed-2026/gallery_1` | `https://res.cloudinary.com/.../gallery_1.webp` |
| `uuid-abc` | `gallery_2` | `image` | `undangan/siti-zaed-2026/gallery_2` | `https://res.cloudinary.com/.../gallery_2.webp` |

---

## 📋 PHASE 2 — Refactor Struktur Folder Next.js

> **Analogi:** Sekarang kamu punya 1 ruang tamu. Kita akan ubah jadi gedung dengan banyak ruangan, tapi desain tiap ruangan bisa berbeda berdasarkan permintaan penyewa.

### 2.1 — Struktur Folder Baru (Target)

```
src/
├── app/
│   ├── layout.tsx                        ← (TETAP) Global layout
│   ├── page.tsx                          ← (UBAH) Halaman landing/homepage agency
│   │
│   └── [slug]/                           ← [BARU] Dynamic Route — jantung dari SaaS
│       ├── page.tsx                      ← Render undangan berdasarkan slug
│       ├── loading.tsx                   ← Skeleton loading saat data diambil
│       └── not-found.tsx                 ← Halaman 404 jika slug tidak ditemukan
│
├── components/
│   ├── ui/                               ← (TETAP) Tombol, overlay, audio player, dll.
│   │
│   ├── sections/                         ← (TETAP, tapi di-refactor menerima data via props)
│   │   ├── HeroCover.tsx                 ← Terima props: brideName, groomName, coverImageUrl
│   │   ├── EventDetails.tsx              ← Terima props: akadDatetime, resepsiVenue, dll.
│   │   ├── RsvpSection.tsx               ← Terima props: clientId
│   │   ├── GuestbookView.tsx             ← Terima props: clientId
│   │   └── ...komponen lainnya
│   │
│   └── templates/                        ← [BARU] Kumpulan tema visual
│       ├── ClassicElegant/
│       │   ├── index.tsx                 ← Layout utama template
│       │   └── manifest.ts              ← [KUNCI] Daftar media yang dibutuhkan template ini
│       └── ModernMinimal/
│           ├── index.tsx
│           └── manifest.ts              ← Template baru punya manifest-nya sendiri
│
├── lib/
│   ├── supabase.ts                       ← (TETAP) Supabase client
│   ├── cloudinary.ts                     ← [BARU] Helper upload/transformasi Cloudinary
│   └── getClientData.ts                  ← [BARU] Ambil semua data klien by slug (+ medianya)
│
└── types/
    └── client.ts                         ← [BARU] TypeScript interface untuk data klien & media
```

### 2.2 — Perubahan Kritis pada Setiap File

**File yang DIUBAH total:**
- `src/app/page.tsx` → Jadi halaman "Coming Soon" atau homepage agency
- Semua komponen di `sections/` → Ubah dari data hardcoded → terima `props`

**File yang DIBUAT BARU:**
- `src/app/[slug]/page.tsx` → Ini inti dari multi-tenant
- `src/lib/getClientData.ts` → Helper untuk query Supabase
- `src/types/client.ts` → Type definitions
- `src/components/templates/ClassicElegant/index.tsx` → Template pertama

---

## 📋 PHASE 3 — Implementasi Dynamic Routing (`[slug]`)

> **Analogi:** Ini seperti membuat satu resepsionis cerdas yang bisa membedakan tamu mana yang datang ke acara klien A dan klien B, lalu mengarahkan ke ruang yang tepat.

### 3.1 — Buat Helper `getClientData.ts`

File ini bertugas mengambil semua data klien dari Supabase berdasarkan slug URL.

```typescript
// src/lib/getClientData.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getClientBySlug(slug: string) {
  const { data, error } = await supabase
    .from('clients')
    .select(`
      *,
      client_details (*)
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error || !data) return null;
  return data;
}
```

### 3.2 — Buat Dynamic Page `src/app/[slug]/page.tsx`

```typescript
// src/app/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getClientBySlug } from '@/lib/getClientData';
import ClassicElegantTemplate from '@/components/templates/ClassicElegant';

// Ini adalah Server Component — data diambil di server, tidak perlu useEffect
export default async function InvitationPage({
  params,
}: {
  params: { slug: string };
}) {
  // 1. Ambil data klien berdasarkan slug dari URL
  const clientData = await getClientBySlug(params.slug);

  // 2. Jika slug tidak ditemukan di database, tampilkan halaman 404
  if (!clientData) {
    notFound();
  }

  // 3. Pilih template berdasarkan kolom template_id di database
  if (clientData.template_id === 'classic-elegant') {
    return <ClassicElegantTemplate data={clientData} />;
  }

  // Fallback jika template tidak dikenal
  return <ClassicElegantTemplate data={clientData} />;
}
```

### 3.3 — Buat TypeScript Types

```typescript
// src/types/client.ts

export interface ClientDetails {
  bride_name: string;
  groom_name: string;
  bride_full_name: string | null;
  groom_full_name: string | null;
  bride_parents: string | null;
  groom_parents: string | null;
  akad_datetime: string | null;
  akad_venue_name: string | null;
  akad_venue_address: string | null;
  resepsi_datetime: string | null;
  resepsi_venue_name: string | null;
  resepsi_venue_address: string | null;
  prologue_text: string | null;
  bank_accounts: BankAccount[];
  // ⚠️ Tidak ada cover_image_url/music_url di sini — cek client_media
}

export interface BankAccount {
  bank: string;
  name: string;
  number: string;
}

// Satu baris dari tabel client_media
export interface ClientMedia {
  id: string;
  client_id: string;
  media_key: string;         // 'cover' | 'music' | 'gallery_1' | dst.
  media_type: 'image' | 'audio' | 'video';
  cloudinary_public_id: string;
  cloudinary_url: string;
  alt_text: string | null;
  display_order: number;
}

export interface Client {
  id: string;
  slug: string;
  template_id: string;
  is_active: boolean;
  client_details: ClientDetails;
  client_media: ClientMedia[];  // Array semua media milik klien ini
}

// Helper: ambil satu media berdasarkan key-nya dengan mudah
export function getMedia(mediaList: ClientMedia[], key: string): string | null {
  return mediaList.find(m => m.media_key === key)?.cloudinary_url ?? null;
}
```

---

## 📋 PHASE 4 — Refactor Components (Hapus Data Hardcoded)

> **Analogi:** Sekarang komponen kamu adalah aktor yang hafal naskah satu peran saja (Siti & Zaed). Kita latih mereka jadi aktor profesional yang bisa memerankan siapa saja berdasarkan naskah yang diberikan.

### 4.1 — Contoh Refactor `HeroCover.tsx`

**SEBELUM (hardcoded):**
```tsx
// Data langsung ditulis di dalam component
<h1>Siti & Zaed</h1>
<p>23 Mei 2026</p>
```

**SESUDAH (menerima props):**
```tsx
interface HeroCoverProps {
  brideName: string;
  groomName: string;
  weddingDate: string;
}

export default function HeroCover({ brideName, groomName, weddingDate }: HeroCoverProps) {
  return (
    <h1>{brideName} & {groomName}</h1>
    <p>{weddingDate}</p>
  )
}
```

### 4.2 — Contoh Refactor `RsvpSection.tsx`

Bagian paling kritis: Insert RSVP harus menyertakan `client_id`.

**SESUDAH:**
```tsx
interface RsvpSectionProps {
  clientId: string; // Dikirim dari template, dipakai untuk insert ke DB
}

// Di dalam handleSubmit:
const { error } = await supabase
  .from('rsvp_responses')
  .insert([{
    client_id: clientId, // ← KUNCI: pastikan RSVP masuk ke klien yang benar
    guest_name: formData.name,
    attendance_status: isAttending,
    pax: paxCount,
    greeting_message: formData.message || null
  }]);
```

### 4.3 — Buat Template `ClassicElegant` + Manifest

**File 1: `manifest.ts` — Kontrak Media Template**

Ini adalah "daftar belanja" media yang dibutuhkan template ini. Ketika admin mau input klien baru, sistem tahu media apa saja yang perlu diupload ke Cloudinary.

```typescript
// src/components/templates/ClassicElegant/manifest.ts

export const TEMPLATE_ID = 'classic-elegant';

// Definisi semua media yang dibutuhkan template ini
export const MEDIA_MANIFEST = [
  {
    key: 'cover',        // nama kunci — harus cocok dengan media_key di DB
    type: 'image' as const,
    label: 'Foto Cover Utama',
    required: true,
    hint: 'Foto pre-wedding landscape, min 1200x1600px'
  },
  {
    key: 'music',
    type: 'audio' as const,
    label: 'Musik Latar (BGM)',
    required: false,
    hint: 'File MP3, durasi bebas, max 10MB'
  },
  {
    key: 'gallery_1',
    type: 'image' as const,
    label: 'Foto Galeri 1',
    required: false,
    hint: 'Foto additional, bebas orientasi'
  },
  {
    key: 'gallery_2',
    type: 'image' as const,
    label: 'Foto Galeri 2',
    required: false,
    hint: 'Foto additional, bebas orientasi'
  },
  // Tambah lebih banyak key di sini jika template berkembang
] as const;

// Type helper: ekstrak semua key yang valid untuk template ini
export type ClassicElegantMediaKey = typeof MEDIA_MANIFEST[number]['key'];
// Hasilnya: 'cover' | 'music' | 'gallery_1' | 'gallery_2'
```

**File 2: `index.tsx` — Template yang Merakit Komponen**

```tsx
// src/components/templates/ClassicElegant/index.tsx
import { Client, getMedia } from '@/types/client';
import HeroCover from '@/components/sections/HeroCover';
import EventDetails from '@/components/sections/EventDetails';
import GalleryView from '@/components/sections/GalleryView';
import AudioPlayer from '@/components/ui/AudioPlayer';
import RsvpSection from '@/components/sections/RsvpSection';
// ... import komponen lainnya

export default function ClassicElegantTemplate({ data }: { data: Client }) {
  const { client_details: d, id: clientId, client_media: media } = data;

  // Ambil URL media menggunakan helper getMedia()
  // Hasilnya null jika belum diupload — komponen harus siap handle null
  const coverUrl   = getMedia(media, 'cover');     // 'https://res.cloudinary.com/...'
  const musicUrl   = getMedia(media, 'music');     // atau null
  const gallery1   = getMedia(media, 'gallery_1');
  const gallery2   = getMedia(media, 'gallery_2');

  return (
    <div className="w-full min-h-screen">
      <AudioPlayer musicUrl={musicUrl} />
      <HeroCover
        brideName={d.bride_name}
        groomName={d.groom_name}
        coverImageUrl={coverUrl}         {/* Cloudinary URL */}
      />
      <EventDetails
        akadDatetime={d.akad_datetime}
        resepsiDatetime={d.resepsi_datetime}
        resepsiVenueName={d.resepsi_venue_name}
      />
      <GalleryView images={[gallery1, gallery2].filter(Boolean) as string[]} />
      <RsvpSection clientId={clientId} />
      {/* ...komponen lain */}
    </div>
  );
}
```

---

## 📋 PHASE 5 — Integrasi Cloudinary

> **Cloudinary menggantikan Supabase Storage sepenuhnya** untuk semua kebutuhan media: gambar (cover, galeri) dan audio (musik latar).

### 5.1 — Persiapan Akun & Konfigurasi

1. Daftar di [cloudinary.com](https://cloudinary.com) (free tier cukup untuk awal)
2. Buat folder organisasi: `undangan-digital/{slug}/` — ini konvensi penamaan kita
3. Tambahkan ke `.env.local`:

```bash
# .env.local
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret       # ⚠️ JANGAN pakai NEXT_PUBLIC_ — ini rahasia!
```

### 5.2 — Helper `src/lib/cloudinary.ts`

```typescript
// src/lib/cloudinary.ts
// Fungsi-fungsi untuk berinteraksi dengan Cloudinary API
// Hanya dipakai di server (Server Actions / API Routes)

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload file dan return public_id + secure_url
export async function uploadToCloudinary(
  fileBuffer: Buffer,
  slug: string,
  mediaKey: string,   // 'cover', 'music', 'gallery_1', dst.
  resourceType: 'image' | 'video' | 'raw' = 'image'
) {
  // 'raw' dipakai untuk upload MP3/audio
  const actualType = resourceType === 'audio' ? 'raw' : resourceType;
  
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        public_id: `undangan-digital/${slug}/${mediaKey}`,
        resource_type: actualType,
        overwrite: true,   // Kalau re-upload, timpah yang lama
        folder: `undangan-digital/${slug}`,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(fileBuffer);
  });
}

// Helper: generate URL dengan transformasi otomatis (resize, format webp)
export function getOptimizedImageUrl(publicId: string, width = 1200): string {
  return cloudinary.url(publicId, {
    width,
    crop: 'limit',
    fetch_format: 'auto',   // Otomatis WebP di browser yang support
    quality: 'auto',        // Cloudinary optimasi kualitas otomatis
  });
}
```

### 5.3 — Update `getClientData.ts` (Sertakan Media)

```typescript
// src/lib/getClientData.ts
export async function getClientBySlug(slug: string) {
  const { data, error } = await supabase
    .from('clients')
    .select(`
      *,
      client_details (*),
      client_media (*)        
    `)                         // ← Sertakan semua media sekaligus dalam 1 query
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error || !data) return null;
  return data;
}
```

---

## 📋 PHASE 6 — Sistem Template Manifest (Skalabilitas Jangka Panjang)

> **Masalah yang diselesaikan:** Bagaimana cara kita tahu, ketika menambahkan template baru, media apa saja yang perlu diupload untuk klien yang memakai template tersebut?

**Jawabannya: setiap template wajib punya file `manifest.ts`** (sudah dijelaskan di Phase 4.3).

### Alur Kerja Menambahkan Template Baru

```
1. Desainer buat template baru (misal: "Rustic Boho")
   └── Buat folder: src/components/templates/RusticBoho/

2. Programmer buat manifest.ts
   └── Definisikan media apa yang dibutuhkan:
       - 'cover'       → Foto utama
       - 'music'       → Musik latar
       - 'bg_texture'  → Tekstur background (khusus template ini!)
       - 'gallery_1' s/d 'gallery_4' → 4 foto galeri

3. Programmer buat index.tsx
   └── Template mengambil media via getMedia(media, 'bg_texture')

4. Admin Panel baca manifest.ts secara otomatis
   └── Form upload ditampilkan sesuai kebutuhan template:
       "Silakan upload: Foto Cover, Musik, Tekstur BG, Foto 1-4"

5. Admin upload ke Cloudinary
   └── Data tersimpan di tabel client_media dengan media_key yang benar
```

### Registry Template (Opsional tapi direkomendasikan)

Buat satu file pusat yang mendaftarkan semua template yang tersedia:

```typescript
// src/lib/templateRegistry.ts
import { MEDIA_MANIFEST as ClassicManifest, TEMPLATE_ID as ClassicId }
  from '@/components/templates/ClassicElegant/manifest';
import { MEDIA_MANIFEST as RusticManifest, TEMPLATE_ID as RusticId }
  from '@/components/templates/RusticBoho/manifest';

export const TEMPLATE_REGISTRY = [
  { id: ClassicId, name: 'Classic Elegant', manifest: ClassicManifest },
  { id: RusticId,  name: 'Rustic Boho',     manifest: RusticManifest  },
  // Tambah template baru di sini — satu baris saja!
];

// Lookup: ambil manifest berdasarkan template_id
export function getTemplateManifest(templateId: string) {
  return TEMPLATE_REGISTRY.find(t => t.id === templateId)?.manifest ?? [];
}
```

---

## 📋 PHASE 7 — Admin Panel (Manajemen Klien)

> **Catatan:** Sangat direkomendasikan agar tidak perlu buka Supabase Dashboard atau Cloudinary Dashboard manual setiap kali ada klien baru.

### Fitur Admin Panel:
- **Halaman:** `src/app/admin/page.tsx` (dilindungi Supabase Auth)
- **Fungsi:**
  - Tambah klien baru → pilih template → form muncul sesuai `manifest.ts` template tersebut
  - Upload media langsung dari admin panel → otomatis ke Cloudinary → URL tersimpan di `client_media`
  - Lihat daftar klien aktif/non-aktif (toggle `is_active`)
  - Lihat statistik RSVP per klien

---

## 📊 Ringkasan Perubahan (Checklist Eksekusi)

### Database Supabase
- [ ] Buat tabel `clients`
- [ ] Buat tabel `client_details` (tanpa kolom media URL)
- [ ] Buat tabel `client_media` (untuk Cloudinary URLs)
- [ ] Hapus tabel `mpv-undangan-digital` dan buat `rsvp_responses` yang baru
- [ ] Setup RLS policies untuk semua tabel baru
- [ ] Insert data klien pertama (Siti & Zaed) sebagai test seed

### Cloudinary Setup
- [ ] Daftar akun Cloudinary & dapatkan credentials
- [ ] Tambah `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` ke `.env.local`
- [ ] Buat file `src/lib/cloudinary.ts`
- [ ] Install package: `npm install cloudinary`
- [ ] Upload media Siti & Zaed ke Cloudinary (cover + musik)
- [ ] Insert URL hasil upload ke tabel `client_media`

### Struktur Folder & File Baru
- [ ] Buat folder `src/app/[slug]/`
- [ ] Buat `src/app/[slug]/page.tsx` (Dynamic Page)
- [ ] Buat `src/app/[slug]/loading.tsx`
- [ ] Buat `src/app/[slug]/not-found.tsx`
- [ ] Buat `src/types/client.ts`
- [ ] Buat `src/lib/getClientData.ts`
- [ ] Buat folder `src/components/templates/ClassicElegant/`
- [ ] Buat `src/components/templates/ClassicElegant/manifest.ts` ← **Template Manifest**
- [ ] Buat `src/components/templates/ClassicElegant/index.tsx`
- [ ] Buat `src/lib/cloudinary.ts`
- [ ] Buat `src/lib/templateRegistry.ts`

### Refactor Komponen (Hapus Hardcoded Data)
- [ ] `HeroCover.tsx` → Terima props
- [ ] `CoupleInfo.tsx` → Terima props
- [ ] `EventDetails.tsx` → Terima props
- [ ] `CountdownTimer.tsx` → Terima prop `targetDate` dari DB
- [ ] `PrologueSection.tsx` → Terima prop `prologueText`
- [ ] `GiftBox.tsx` → Terima prop `bankAccounts` (array dari JSONB)
- [ ] `GalleryView.tsx` → Terima prop `galleryImages` (array URL)
- [ ] `RsvpSection.tsx` → Terima prop `clientId`
- [ ] `GuestbookView.tsx` → Terima prop `clientId` untuk filter query
- [ ] `WelcomeOverlay.tsx` → Terima prop `brideName`, `groomName`
- [ ] `AudioPlayer.tsx` → Terima prop `musicUrl` (URL dari Cloudinary, bukan hardcoded)
- [ ] `GalleryView.tsx` → Terima prop `images` (array Cloudinary URLs, bukan lokal)
- [ ] `HeroCover.tsx` → `coverImageUrl` sekarang dari Cloudinary

### Testing & Deployment
- [ ] Test URL `localhost:3000/siti-zaed-2026` → tampil undangan Siti & Zaed
- [ ] Test URL `localhost:3000/klien-baru-2026` → tampil 404
- [ ] Test submit RSVP → data masuk ke tabel `rsvp_responses` dengan `client_id` yang benar
- [ ] Pastikan `npm run build` tidak ada TypeScript errors
- [ ] Push ke GitHub → Deploy ke Vercel

---

## 🗺️ Urutan Eksekusi yang Disarankan

```
Minggu 1: Database (Phase 1) → Cloudinary Setup (Phase 5) → Types (3.3)
Minggu 2: getClientData (3.1) → Dynamic Route (3.2) → Manifest + Template (4.3 & Phase 6)
Minggu 3: Refactor semua Components (Phase 4)
Minggu 4: Testing + Admin Panel dasar (Phase 7)
```

---

## ⚠️ Hal-hal yang Perlu Diperhatikan

1. **Jangan hapus tabel `mpv-undangan-digital` sebelum** data RSVP lama sudah di-migrate ke tabel baru
2. **Cloudinary menggantikan Supabase Storage sepenuhnya** — tidak perlu setup Storage bucket di Supabase sama sekali
3. **`CLOUDINARY_API_SECRET` tidak boleh punya prefix `NEXT_PUBLIC_`** — ini credentials server-side yang rahasia. Jika bocor, orang bisa upload/hapus file dari akun Cloudinary kamu
4. **Slug harus URL-friendly** — gunakan huruf kecil, tanda hubung, tanpa spasi (contoh: `siti-zaed-2026`)
5. **Konvensi penamaan folder Cloudinary:** `undangan-digital/{slug}/{media_key}` — patuhi konvensi ini agar mudah di-manage di Cloudinary Dashboard
6. **Saat menambahkan template baru:** wajib buat `manifest.ts` terlebih dahulu, baru buat `index.tsx`. Manifest adalah "spesifikasi teknis" yang harus disepakati tim designer dan programmer sebelum coding dimulai

---

*Issue ini dibuat otomatis oleh AI Assistant berdasarkan analisis codebase pada 2026-04-02.*
*Labels: `enhancement`, `saas`, `architecture`, `roadmap`*
