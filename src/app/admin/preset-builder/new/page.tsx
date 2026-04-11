import BuilderLayout from "@/viding-builder/components/BuilderLayout";
import { BuilderHydrator } from "@/viding-builder/components/BuilderHydrator";

/**
 * Rute Admin: Membuat Preset Baru
 */
export default function NewPresetPage() {
  return (
    <>
      <BuilderHydrator idOrSlug="new" config={null} mode="preset" />
      <BuilderLayout />
    </>
  );
}
