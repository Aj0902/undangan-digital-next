/**
 * @file src/lib/getClientData.ts
 * @description Server-side helper untuk mengambil semua data klien dari Supabase
 *              berdasarkan slug URL. Digunakan di Server Components (tidak di Client).
 *
 * Query ini mengambil clients + client_details + client_media dalam SATU round-trip
 * menggunakan Supabase's nested select syntax.
 */

// Reuse client yang sudah ada — URL & key sudah dikonfigurasi dengan fallback di sana
import { supabase } from '@/lib/supabase';
import type { Client } from '@/types/client';

/**
 * Ambil semua data klien berdasarkan slug URL dalam satu query.
 *
 * Mencakup:
 * - Data master klien (clients)
 * - Detail konten undangan (client_details) — relasi 1:1
 * - Semua aset media Cloudinary (client_media) — relasi 1:many
 *
 * @param slug - URL slug klien. Contoh: `'siti-zaed-2026'`
 * @returns Objek `Client` lengkap jika ditemukan dan aktif, atau `null` jika tidak.
 *
 * @example
 * // Di dalam Server Component / generateMetadata:
 * const client = await getClientBySlug('siti-zaed-2026');
 * if (!client) notFound();
 */
export async function getClientBySlug(slug: string): Promise<Client | null> {
  const { data, error } = await supabase
    .from('clients')
    .select(`
      *,
      client_details (*),
      client_media (*)
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error || !data) {
    // Log error hanya di server (tidak terekspos ke client)
    if (error && error.code !== 'PGRST116') {
      // PGRST116 = "No rows found" — ini normal, bukan error sebenarnya
      console.error(`[getClientBySlug] Error fetching slug "${slug}":`, error.message);
    }
    return null;
  }

  // Supabase mengembalikan client_details sebagai object (bukan array)
  // karena relasi 1:1 (UNIQUE constraint pada client_id).
  // Namun TypeScript dari Supabase JS mungkin menganggapnya array,
  // jadi kita cast secara eksplisit ke tipe Client kita.
  return data as unknown as Client;
}

/**
 * Ambil daftar semua slug klien yang aktif.
 * Berguna untuk `generateStaticParams` jika kamu ingin pre-render halaman
 * undangan saat build time (ISR / Static Generation).
 *
 * @returns Array of slug strings. Contoh: `['siti-zaed-2026', 'budi-ani-2026']`
 *
 * @example
 * // Di src/app/[slug]/page.tsx:
 * export async function generateStaticParams() {
 *   const slugs = await getAllActiveSlugs();
 *   return slugs.map((slug) => ({ slug }));
 * }
 */
export async function getAllActiveSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('clients')
    .select('slug')
    .eq('is_active', true);

  if (error || !data) {
    console.error('[getAllActiveSlugs] Error:', error?.message);
    return [];
  }

  return data.map((row) => row.slug as string);
}
