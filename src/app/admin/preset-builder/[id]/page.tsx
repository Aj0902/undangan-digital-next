import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import BuilderLayout from "@/viding-builder/components/BuilderLayout";
import { BuilderHydrator } from "@/viding-builder/components/BuilderHydrator";

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * Rute Admin: Mengedit Preset yang Sudah Ada
 */
export default async function EditPresetPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: preset, error } = await supabase
    .from("presets")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !preset) {
    console.error("Error fetching preset:", error);
    notFound();
  }

  return (
    <>
      {/* Hydrate store dengan data JSON dari tabel presets */}
      <BuilderHydrator idOrSlug={id} config={preset.json_config} mode="preset" />
      
      {/* Tampilkan UI Builder */}
      <BuilderLayout />
    </>
  );
}
