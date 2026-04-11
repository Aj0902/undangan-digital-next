import { supabase } from '@/lib/supabase';
import { VidingDocument } from '@/types/viding-v3';

export interface Preset {
  id: string;
  nama_preset: string;
  kategori: string;
  thumbnail_url: string | null;
  json_config: VidingDocument | null;
  created_at: string;
}

/**
 * Ambil data preset berdasarkan ID.
 */
export async function getPresetById(id: string): Promise<Preset | null> {
  const { data, error } = await supabase
    .from('presets')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    if (error && error.code !== 'PGRST116') {
      console.error(`[getPresetById] Error fetching ID "${id}":`, error.message);
    }
    return null;
  }

  return data as Preset;
}

/**
 * Ambil semua daftar preset.
 */
export async function getAllPresets(): Promise<Preset[]> {
  const { data, error } = await supabase
    .from('presets')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error('[getAllPresets] Error:', error?.message);
    return [];
  }

  return data as Preset[];
}
