/**
 * @file src/app/[slug]/not-found.tsx
 * @description Halaman 404 kustom untuk route [slug].
 *
 * Ditampilkan secara otomatis oleh Next.js ketika:
 * - getClientBySlug() mengembalikan null (slug tidak ditemukan di DB)
 * - Klien ada di DB tapi is_active = false
 * - notFound() dipanggil secara eksplisit dari page.tsx
 *
 * Desain: Tetap dalam estetika undangan digital agar tidak terasa "rusak".
 */

import Link from 'next/link';

export default function InvitationNotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-8 text-center"
      style={{ backgroundColor: 'var(--bg-cream, #F5F0E8)', color: 'var(--text-primary, #2C2C2C)' }}
    >
      {/* Ornamen vertikal atas */}
      <div
        className="w-px mb-10 opacity-40"
        style={{ height: '80px', backgroundColor: 'var(--text-primary, #2C2C2C)' }}
      />

      {/* Kode 404 */}
      <p
        className="text-xs tracking-[0.4em] uppercase mb-6 opacity-50"
        style={{ fontFamily: 'var(--font-montserrat, sans-serif)' }}
      >
        404
      </p>

      {/* Heading utama */}
      <h1
        className="text-4xl md:text-5xl mb-4 font-light"
        style={{ fontFamily: 'var(--font-cormorant, serif)', fontWeight: 300 }}
      >
        Undangan Tidak Ditemukan
      </h1>

      {/* Kalimat penjelasan */}
      <p
        className="text-xs tracking-[0.2em] uppercase opacity-60 max-w-sm leading-relaxed mb-10"
        style={{ fontFamily: 'var(--font-montserrat, sans-serif)' }}
      >
        Tautan undangan ini tidak tersedia atau telah berakhir.
        <br />
        Pastikan Anda memakai tautan yang benar.
      </p>

      {/* Ornamen vertikal bawah */}
      <div
        className="w-px mb-10 opacity-40"
        style={{ height: '60px', backgroundColor: 'var(--text-primary, #2C2C2C)' }}
      />

      {/* Tombol kembali ke beranda */}
      <Link
        href="/"
        className="text-xs tracking-[0.3em] uppercase px-8 py-3 border transition-opacity hover:opacity-60"
        style={{
          fontFamily: 'var(--font-montserrat, sans-serif)',
          borderColor: 'var(--text-primary, #2C2C2C)',
        }}
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
