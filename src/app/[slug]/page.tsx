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

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getClientBySlug } from "@/lib/getClientData";
import VidingTemplate from "@/templates/viding-v3";
import { VidingDocument } from "@/types/viding-v3";

// ================================================================
// generateMetadata — Meta tag dinamis per klien (SEO)
// ================================================================
// ================================================================
// generateMetadata — Meta tag dinamis per klien (SEO)
// ================================================================

export const dynamic = "force-dynamic";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ to?: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const resolvedSearchParams = await props.searchParams;
  const rawGuestName = resolvedSearchParams?.to || "";

  // Standard decoding (handles spaces and special characters)
  const guestName = decodeURIComponent(rawGuestName.replace(/\+/g, " "));

  const client = await getClientBySlug(slug);

  if (!client) {
    return {
      title: "Undangan Tidak Ditemukan",
      description: "Halaman undangan ini tidak tersedia.",
    };
  }

  const { bride_name, groom_name } = client.client_details;

  // Robust Image Selection: check common keys or fallback to first media
  const coverMedia =
    client.client_media?.find((m) =>
      ["hero_image", "cover", "main_image"].includes(m.media_key),
    ) || client.client_media?.[0];

  const coverUrl =
    coverMedia?.cloudinary_url ||
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622";

  const titleText = `${bride_name} & ${groom_name} — Undangan Pernikahan`;
  const guestGreeting = guestName ? ` | Menuju: ${guestName}` : "";

  return {
    title: `${titleText}${guestGreeting}`,
    description: `Selamat datang di hari bahagia ${bride_name} & ${groom_name}. Saksikan momen sakral penyatuan janji suci mereka.`,
    openGraph: {
      title: `${bride_name} & ${groom_name} — Official Invitation${guestGreeting}`,
      description: `Buka undangan digital resmi ${bride_name} & ${groom_name}. Kami sangat berharap kehadiran Anda.`,
      type: "website",
      images: [
        {
          url: coverUrl,
          width: 1200,
          height: 630,
          alt: `Invitation Image for ${bride_name} & ${groom_name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${bride_name} & ${groom_name} — Wedding Invitation`,
      description: `Anda diundang ke pernikahan ${bride_name} & ${groom_name}.`,
      images: [coverUrl],
    },
  };
}

// ================================================================
// InvitationPage — Server Component utama
// ================================================================

export default async function InvitationPage(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ to?: string }>;
}) {
  const { slug } = await props.params;
  const resolvedSearchParams = await props.searchParams;
  const rawGuestName = resolvedSearchParams?.to || "";
  const guestName = decodeURIComponent(rawGuestName.replace(/\+/g, " "));

  const client = await getClientBySlug(slug);

  if (!client) {
    notFound();
  }

  // ================================================================
  // TRAFFIC LIGHT ROUTER: Statis vs Dinamis (Viding Engine v3.0)
  // ================================================================
  if (client.template_type === 'dinamis' && client.custom_config) {
    return (
      <VidingTemplate 
        document={client.custom_config as VidingDocument} 
        mode="preview" 
        clientData={client} 
      />
    );
  }


  switch (client.template_id) {
    case "classic-elegant": {
      const { default: ClassicElegantTemplate } =
        await import("@/legacy/templates/ClassicElegant");
      return <ClassicElegantTemplate data={client} guestName={guestName} />;
    }

    case "modern-minimal": {
      const { default: ModernMinimalTemplate } =
        await import("@/legacy/templates/ModernMinimal");
      return <ModernMinimalTemplate data={client} guestName={guestName} />;
    }

    case "rustic-boho": {
      const { default: RusticBohoTemplate } =
        await import("@/legacy/templates/RusticBoho");
      return <RusticBohoTemplate data={client} guestName={guestName} />;
    }

    case "magazine-theme": {
      const { default: MagazineTemplate } =
        await import("@/legacy/templates/MagazineTheme");
      return <MagazineTemplate data={client} guestName={guestName} />;
    }

    case "cream-rabbit": {
      const { default: CreamRabbitTemplate } =
        await import("@/legacy/templates/CreamRabbit");
      return <CreamRabbitTemplate data={client} guestName={guestName} />;
    }

    case "avant-garde-gallery": {
      const { default: AvantGardeTemplate } =
        await import("@/legacy/templates/AvantGardeGallery");
      return <AvantGardeTemplate data={client} guestName={guestName} />;
    }

    case "modern-monarchy": {
      const { default: ModernMonarchyTemplate } =
        await import("@/legacy/templates/ModernMonarchy");
      return <ModernMonarchyTemplate data={client} guestName={guestName} />;
    }

    case "golden-floral": {
      const { default: GoldenFloralTemplate } =
        await import("@/legacy/templates/GoldenFloralTemplate");
      return <GoldenFloralTemplate data={client} guestName={guestName} />;
    }

    case "royal-gold": {
      const { default: RoyalGoldTemplate } =
        await import("@/legacy/templates/RoyalGold");
      return <RoyalGoldTemplate data={client} guestName={guestName} />;
    }

    case "neon-vogue": {
      const { default: NeonVogueTemplate } =
        await import("@/legacy/templates/NeonVogue");
      return <NeonVogueTemplate data={client} guestName={guestName} />;
    }

    default: {
      const { default: ClassicElegantTemplate } =
        await import("@/legacy/templates/ClassicElegant");
      return <ClassicElegantTemplate data={client} guestName={guestName} />;
    }
  }
}
