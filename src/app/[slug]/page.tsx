/**
 * @file src/app/[slug]/page.tsx
 * @description Dynamic route — jantung dari arsitektur SaaS multi-tenant.
 *
 * Setiap URL `/{slug}` akan di-handle oleh halaman ini.
 * Server Component: semua data fetching terjadi di server sebelum HTML dikirim.
 *
 * Alur eksekusi:
 * 1. Next.js menerima request ke /{slug}
 * 2. `params` di-await untuk mendapatkan nilai slug
 * 3. Supabase di-query via getClientBySlug(slug)
 * 4. Jika tidak ditemukan / tidak aktif → notFound() → tampil not-found.tsx
 * 5. Jika ditemukan → pilih template berdasarkan client.template_id
 * 6. Render template dengan data klien sebagai props
 *
 * ⚠️  Next.js 15: params adalah Promise, WAJIB di-await.
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getClientBySlug } from '@/lib/getClientData';

// ================================================================
// generateMetadata — Meta tag dinamis per klien (SEO)
// ================================================================
// ================================================================
// generateMetadata — Meta tag dinamis per klien (SEO)
// ================================================================

export const dynamic = 'force-dynamic';

export async function generateMetadata(
  props: { 
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ to?: string }>; // 1. Tambah searchParams nggo nangkep ?to=
  }
): Promise<Metadata> {
  const { slug } = await props.params;
  
  // 2. Olah jeneng tamu soko URL
  const resolvedSearchParams = await props.searchParams;
  const rawGuestName = resolvedSearchParams?.to || '';
  const guestName = rawGuestName.replace(/\+/g, ' '); 
  
  const client = await getClientBySlug(slug);

  if (!client) {
    return {
      title: 'Undangan Tidak Ditemukan',
      description: 'Halaman undangan ini tidak tersedia.',
    };
  }

  const { bride_name, groom_name } = client.client_details;
  
  // 3. Golek foto cover nggo thumbnail WhatsApp
  const coverMedia = client.client_media?.find((m: any) => m.media_key === 'hero_image');
  const coverUrl = coverMedia?.cloudinary_url || 'https://link-gambar-default-mu.com/cover.jpg'; // Ganti nganggo link gambar aslimu

  const titleText = `Undangan Pernikahan ${bride_name} & ${groom_name}`;
  const guestGreeting = guestName ? ` | Kepada Yth: ${guestName}` : '';

  return {
    title: `${titleText}${guestGreeting}`,
    description: `Anda diundang ke pernikahan ${bride_name} & ${groom_name}. Saksikan momen bahagia mereka bersama kami.`,
    openGraph: {
      title: `${bride_name} & ${groom_name} — Undangan Pernikahan${guestGreeting}`,
      description: `Anda diundang ke pernikahan ${bride_name} & ${groom_name}.`,
      type: 'website',
      images: [
        {
          url: coverUrl, // 4. Pasang fotone neng kene
          width: 1200,
          height: 630,
          alt: `Cover Undangan ${bride_name} & ${groom_name}`,
        },
      ],
    },
  };
}

// ================================================================
// InvitationPage — Server Component utama
// ================================================================

export default async function InvitationPage(
  props: { 
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ to?: string }>;
  }
) {
  // ⚠️  Next.js 15: params adalah Promise — wajib await
  const { slug } = await props.params;
  const resolvedSearchParams = await props.searchParams;
  const rawGuestName = resolvedSearchParams?.to || '';
  const guestName = rawGuestName.replace(/\+/g, ' '); 

  // 1. Ambil semua data klien (clients + client_details + client_media)
  const client = await getClientBySlug(slug);

  // 2. Slug tidak ditemukan di DB atau klien tidak aktif → 404
  if (!client) {
    notFound();
  }

  // 3. Pilih template berdasarkan template_id di database
  //    Setiap template menerima `data` (objek Client) sebagai satu-satunya prop.
  //    Import template secara dinamis menggunakan switch untuk code splitting.
  switch (client.template_id) {
    case 'classic-elegant': {
      // Dynamic import: chunk JS template hanya dimuat saat dibutuhkan
      const { default: ClassicElegantTemplate } = await import(
        '@/components/templates/ClassicElegant'
      );
      return <ClassicElegantTemplate data={client} />;
    }

    case 'modern-minimal': {
      const { default: ModernMinimalTemplate } = await import(
        '@/components/templates/ModernMinimal'
      );
      return <ModernMinimalTemplate data={client} />;
    }

    case 'rustic-boho': {
      const { default: RusticBohoTemplate } = await import(
        '@/components/templates/RusticBoho'
      );
      return <RusticBohoTemplate data={client} />;
    }

    case 'magazine-theme': {
      const { default: MagazineTheme } = await import(
        '@/components/templates/MagazineTheme'
      );
      return <MagazineTheme data={client} />;
    }

    case 'cream-rabbit': {
      const { default: CreamRabbitTemplate } = await import(
        '@/components/templates/CreamRabbit'
      );
      return <CreamRabbitTemplate data={client} />;
    }

    case 'avant-garde-gallery': {
      const { default: AvantGardeGalleryTemplate } = await import(
        '@/components/templates/AvantGardeGallery'
      );
      return <AvantGardeGalleryTemplate data={client} />;
    }

    case 'modern-monarchy': {
      const { default: ModernMonarchyTemplate } = await import(
        '@/components/templates/ModernMonarchy'
      );
      return <ModernMonarchyTemplate data={client} />;
    }

    case 'golden-floral-template': {
      const { default: GoldenFloralTemplate } = await import(
        '@/components/templates/GoldenFloralTemplate'
      );
      return <GoldenFloralTemplate data={client} guestName={guestName} />;
    }



    default: {
      // Fallback: pakai classic-elegant jika template_id tidak dikenal
      // (mencegah halaman blank jika admin input template_id yang typo)
      console.warn(
        `[InvitationPage] Template "${client.template_id}" tidak dikenal untuk slug "${slug}". Fallback ke classic-elegant.`
      );
      const { default: ClassicElegantTemplate } = await import(
        '@/components/templates/ClassicElegant'
      );
      return <ClassicElegantTemplate data={client} />;
    }
  }
}
