/**
 * @file src/app/[slug]/loading.tsx
 * @description Skeleton loading UI untuk halaman undangan.
 *
 * Next.js secara otomatis menampilkan file ini sebagai fallback Suspense
 * selama data dari getClientBySlug() sedang di-fetch di server.
 *
 * Desain: Skeleton animasi yang menyerupai layout umum halaman undangan
 * (cover besar → nama mempelai → detail acara) agar terasa natural.
 */

export default function InvitationLoading() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] flex flex-col items-center animate-pulse">
      {/* Hero / Cover Skeleton */}
      <div className="w-full h-screen bg-[#E0D8CC] flex flex-col items-center justify-center gap-6 px-8">
        {/* Ornamen atas */}
        <div className="w-px h-16 bg-[#C8B89A] opacity-60" />

        {/* Nama mempelai */}
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-48 rounded bg-[#C8B89A] opacity-50" />
          <div className="h-4 w-8 rounded bg-[#C8B89A] opacity-40" />
          <div className="h-8 w-40 rounded bg-[#C8B89A] opacity-50" />
        </div>

        {/* Tanggal */}
        <div className="h-3 w-32 rounded bg-[#C8B89A] opacity-40 mt-2" />

        {/* Ornamen bawah */}
        <div className="w-px h-16 bg-[#C8B89A] opacity-60" />

        {/* Tombol buka undangan */}
        <div className="h-10 w-36 rounded-none border border-[#C8B89A] bg-[#C8B89A] opacity-30 mt-4" />
      </div>
    </div>
  );
}
