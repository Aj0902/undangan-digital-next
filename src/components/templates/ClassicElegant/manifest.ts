/**
 * @file src/components/templates/ClassicElegant/manifest.ts
 * @description Kontrak Media Template untuk 'classic-elegant'
 * 
 * File ini digunakan sebagai "daftar belanja" media yang dibutuhkan template ini. 
 * Ketika admin mau input klien baru, sistem tahu media apa saja yang perlu diupload.
 */

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
] as const;

// Type helper: ekstrak semua key yang valid untuk template ini
export type ClassicElegantMediaKey = typeof MEDIA_MANIFEST[number]['key'];
// Hasilnya: 'cover' | 'music' | 'gallery_1' | 'gallery_2'
