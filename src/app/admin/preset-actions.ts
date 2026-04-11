'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { uploadToCloudinary } from '@/lib/cloudinary'

/**
 * Server Action untuk upload thumbnail preset yang ditangkap lewat html2canvas.
 * @param formData Berisi file 'image' dalam bentuk blob/base64
 */
export async function uploadPresetThumbnailAction(formData: FormData) {
  const file = formData.get('image') as File
  const presetName = (formData.get('name') as string) || 'untitled-preset'
  
  if (!file || file.size === 0) {
    return { error: 'File gambar tidak ditemukan.' }
  }

  try {
    // 1. Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // 2. Upload to Cloudinary
    // Kita gunakan folder khusus 'viding-presets/thumbnails'
    const slug = 'viding-presets'
    const mediaKey = `thumbnails/${presetName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`

    const result = await uploadToCloudinary(
      buffer,
      slug,
      mediaKey,
      'image'
    )

    return { success: true, url: result.secure_url }
  } catch (error: any) {
    console.error('Preset Upload Error:', error)
    return { error: error.message || 'Gagal mengunggah thumbnail preset.' }
  }
}

/**
 * Menghapus preset dari database.
 */
export async function deletePresetAction(presetId: string) {
  const supabase = await createClient()
  try {
    const { error } = await supabase
      .from('presets')
      .delete()
      .eq('id', presetId)

    if (error) throw error
    revalidatePath('/admin/presets')
    return { success: true }
  } catch (error: any) {
    console.error('Delete Preset Error:', error)
    return { error: error.message || 'Gagal menghapus preset.' }
  }
}

/**
 * Menduplikasi preset yang sudah ada.
 */
export async function duplicatePresetAction(presetId: string) {
  const supabase = await createClient()
  try {
    // 1. Fetch source preset
    const { data: source, error: fetchError } = await supabase
      .from('presets')
      .select('*')
      .eq('id', presetId)
      .single()

    if (fetchError || !source) throw new Error('Preset sumber tidak ditemukan')

    // 2. Insert new preset as a copy
    const { error: insertError } = await supabase
      .from('presets')
      .insert({
        nama_preset: `${source.nama_preset} (Copy)`,
        kategori: source.kategori,
        json_config: source.json_config,
        thumbnail_url: source.thumbnail_url
      })

    if (insertError) throw insertError
    
    revalidatePath('/admin/presets')
    return { success: true }
  } catch (error: any) {
    console.error('Duplicate Preset Error:', error)
    return { error: error.message || 'Gagal menduplikasi preset.' }
  }
}

/**
 * Menghubungkan preset ke klien (Dinamis).
 * Meng-copy json_config dari preset ke custom_config klien.
 */
export async function applyPresetToClientAction(clientId: string, presetId: string) {
  const supabase = await createClient()
  try {
    // 1. Fetch preset config
    const { data: preset, error: presetError } = await supabase
      .from('presets')
      .select('json_config, id, nama_preset')
      .eq('id', presetId)
      .single()

    if (presetError || !preset) throw new Error('Preset tidak ditemukan')

    // 2. Update client
    const { error: updateError } = await supabase
      .from('clients')
      .update({
        template_id: preset.id, // Simpan ID preset sebagai template_id
        template_type: 'dinamis',
        custom_config: preset.json_config // COPY Config
      })
      .eq('id', clientId)

    if (updateError) throw updateError

    revalidatePath(`/admin/klien/${clientId}`)
    return { success: true }
  } catch (error: any) {
    console.error('Apply Preset Error:', error)
    return { error: error.message || 'Gagal menerapkan preset ke klien.' }
  }
}
