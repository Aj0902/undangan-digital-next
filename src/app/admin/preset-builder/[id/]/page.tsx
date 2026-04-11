import { notFound } from "next/navigation";
import { getPresetById } from "@/lib/getPresetData";
import BuilderLayout from "@/viding-builder/components/BuilderLayout";
import { BuilderHydrator } from "@/viding-builder/components/BuilderHydrator";

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * Rute Admin: Edit Preset
 */
export default async function EditPresetPage({ params }: PageProps) {
  const { id } = await params;
  const preset = await getPresetById(id);

  if (!preset) {
    notFound();
  }

  return (
    <>
      <BuilderHydrator idOrSlug={id} config={preset.json_config} mode="preset" />
      <BuilderLayout />
    </>
  );
}
