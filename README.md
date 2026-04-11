# 💍 Viding Digital Invitation Engine (v3.0 Premium)

Platform undangan digital modern berbasis **Next.js 16**, **Zustand**, dan **Supabase**. Didesain untuk memberikan pengalaman sinematik yang elegan dengan kecepatan performa tinggi.

## 🚀 Fitur Utama

- **Live Builder**: Editor kontekstual dengan *real-time preview*.
- **Integrated Opening**: Transisi *overlay* otomatis di dalam seksi Cover.
- **Premium Widgets**: Mempelai, Acara, Galeri (Masonry), Love Story (Timeline), Digital Gift, RSVP & Closing.
- **Dynamic Config**: Simpan desain dalam format JSON `VidingDocument` di Supabase.

## 📁 Struktur Proyek

- `src/viding-builder/`: Pusat logika mesin v3 (Widgets & Editor UI).
- `src/legacy/`: Folder khusus untuk template statis versi lama (v1/v2).
- `src/templates/`: Kontainer renderer utama undangan.
- `src/app/admin/`: Panel administrasi manajemen klien dan produksi.

## 🛠️ Pengembangan

1. Install dependencies:
   ```bash
   npm install
   ```
2. Jalankan server lokal:
   ```bash
   npm run dev
   ```
3. Lihat status terbaru proyek di [VIDING_ENGINE_V3_STATUS.md](./VIDING_ENGINE_V3_STATUS.md).

## 📄 Lisensi
Proprietary (Internal Viding Dev Team)
