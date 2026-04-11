import { notFound } from "next/navigation";
import { getClientBySlug } from "@/lib/getClientData";
import BuilderLayout from "@/viding-builder/components/BuilderLayout";
import { BuilderHydrator } from "@/viding-builder/components/BuilderHydrator";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Rute Dinamis Builder: /builder/[slug]
 * Server Component yang menarik data JSON (custom_config) dari tabel clients
 * dan menyuapinya ke Builder Store di sisi client.
 */
export default async function BuilderContextPage({ params }: PageProps) {
  const { slug } = await params;
  const client = await getClientBySlug(slug);

  if (!client) {
    notFound();
  }

  return (
    <>
      {/* Hydrate store dengan data JSON (custom_config) + data riil klien (details + media) */}
      <BuilderHydrator idOrSlug={slug} config={client.custom_config} mode="client" clientData={client} />
      
      {/* Tampilkan UI Builder */}
      <BuilderLayout />
    </>
  );
}
