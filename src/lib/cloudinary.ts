// src/lib/cloudinary.ts
// Fungsi-fungsi untuk berinteraksi dengan Cloudinary API
// ⚠️ Hanya dipakai di server (Server Actions / API Routes) — JANGAN import di Client Component

import { v2 as cloudinary } from 'cloudinary';
import type { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

// ---------------------------------------------------------------------------
// Inisialisasi Cloudinary — membaca kredensial dari process.env
// ---------------------------------------------------------------------------
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ---------------------------------------------------------------------------
// Tipe hasil upload
// ---------------------------------------------------------------------------
export interface CloudinaryUploadResult {
  public_id: string;    // contoh: 'undangan-digital/siti-zaed-2026/cover'
  secure_url: string;   // URL HTTPS lengkap dari Cloudinary CDN
  url: string;          // URL HTTP (gunakan secure_url saja)
  format: string;       // ekstensi file: 'jpg', 'mp3', dst.
  resource_type: string; // 'image', 'video', atau 'raw'
  width?: number;
  height?: number;
}

// ---------------------------------------------------------------------------
// uploadToCloudinary
// ---------------------------------------------------------------------------
/**
 * Upload file (gambar, audio, video) ke Cloudinary.
 * Folder dikelola dinamis dengan konvensi: undangan-digital/{slug}/{mediaKey}
 *
 * @param fileBuffer   Buffer berisi data file.
 * @param slug         Slug klien, contoh: 'siti-zaed-2026'
 * @param mediaKey     Peran media dalam template, contoh: 'cover' | 'music' | 'gallery_1'
 * @param resourceType Tipe resource Cloudinary. Gunakan 'raw' untuk audio (MP3, WAV, dll.)
 *                     Default: 'image'
 * @returns            Promise yang resolve dengan detail hasil upload dari Cloudinary.
 * @throws             Error dengan pesan dari Cloudinary bila upload gagal.
 *
 * @example
 * // Upload foto cover untuk klien Siti & Zaed
 * const result = await uploadToCloudinary(buffer, 'siti-zaed-2026', 'cover', 'image');
 * // result.public_id → 'undangan-digital/siti-zaed-2026/cover'
 * // result.secure_url → 'https://res.cloudinary.com/.../cover.jpg'
 *
 * @example
 * // Upload musik latar (audio harus pakai resourceType 'raw')
 * const result = await uploadToCloudinary(buffer, 'siti-zaed-2026', 'music', 'raw');
 */
export async function uploadToCloudinary(
  fileBuffer: Buffer,
  slug: string,
  mediaKey: string,
  resourceType: 'image' | 'video' | 'raw' = 'image'
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        public_id:     `undangan-digital/${slug}/${mediaKey}`,
        resource_type: 'auto',
        overwrite:     true,  // Re-upload akan menimpa file lama secara otomatis
        // Catatan: folder TIDAK perlu ditulis terpisah karena public_id sudah
        // memuat path lengkap. Menulis keduanya menyebabkan path terduplikasi.
      },
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error) {
          reject(new Error(`Upload ke Cloudinary gagal [${slug}/${mediaKey}]: ${error.message}`));
          return;
        }
        if (!result) {
          reject(new Error('Upload ke Cloudinary gagal: tidak ada response dari server.'));
          return;
        }
        resolve(result as CloudinaryUploadResult);
      }
    );

    stream.end(fileBuffer);
  });
}

// ---------------------------------------------------------------------------
// getOptimizedImageUrl
// ---------------------------------------------------------------------------
/**
 * Menghasilkan URL Cloudinary dengan transformasi otomatis:
 * - Format WebP di browser yang mendukung (fetch_format: 'auto')
 * - Kompresi kualitas otomatis (quality: 'auto')
 * - Resize width dengan crop 'limit' (tidak memaksakan crop, hanya batasi lebar)
 *
 * @param publicId  Public ID gambar di Cloudinary, contoh: 'undangan-digital/siti-zaed-2026/cover'
 * @param width     Lebar maksimum gambar dalam piksel. Default: 1200
 * @returns         URL string yang sudah di-optimasi.
 *
 * @example
 * const url = getOptimizedImageUrl('undangan-digital/siti-zaed-2026/cover', 1200);
 * // → 'https://res.cloudinary.com/my-cloud/image/upload/w_1200,c_limit,q_auto,f_auto/undangan-digital/...'
 */
export function getOptimizedImageUrl(publicId: string, width = 1200): string {
  return cloudinary.url(publicId, {
    width,
    crop:         'limit',   // Tidak memaksakan crop — hanya batasi maksimum lebar
    fetch_format: 'auto',    // Otomatis WebP di browser yang support, fallback ke JPEG/PNG
    quality:      'auto',    // Cloudinary optimalkan kualitas secara cerdas
    secure:       true,      // Selalu gunakan HTTPS
  });
}
