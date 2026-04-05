'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadToCloudinary } from '@/lib/cloudinary'

import type { ClientFormValues } from '@/lib/validations/client'

export async function createClientAction(data: ClientFormValues) {
  const supabase = await createClient()

  try {
    // 0. Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Anda harus login terlebih dahulu.')

    // 1. Insert into 'clients' table
    const { data: newClient, error: clientError } = await supabase
      .from('clients')
      .insert([{ 
        slug: data.slug, 
        template_id: data.template_id, 
        is_active: data.is_active 
      }])
      .select()
      .single()

    if (clientError) throw clientError

    // 2. Insert into 'client_details' table
    const { error: detailsError } = await supabase
      .from('client_details')
      .insert([{
        client_id: newClient.id,
        bride_name: data.bride_name,
        groom_name: data.groom_name,
        bride_full_name: data.bride_full_name || null,
        groom_full_name: data.groom_full_name || null,
        bride_parents: data.bride_parents || null,
        groom_parents: data.groom_parents || null,
        akad_datetime: data.akad_datetime || null,
        akad_venue_name: data.akad_venue_name || null,
        akad_venue_address: data.akad_venue_address || null,
        resepsi_datetime: data.resepsi_datetime || null,
        resepsi_venue_name: data.resepsi_venue_name || null,
        resepsi_venue_address: data.resepsi_venue_address || null,
        prologue_text: data.prologue_text || null,
        bank_accounts: data.bank_accounts || []
      }])

    if (detailsError) throw detailsError

  } catch (error: any) {
    console.error('Error creating client:', error)
    return { error: error.message || 'Gagal membuat klien baru.' }
  }

  revalidatePath('/admin')
  redirect('/admin')
}

export async function deleteClientAction(clientId: string) {
  const supabase = await createClient()

  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const { error } = await supabase
      .from('clients')
      .delete()
      .match({ id: clientId })

    if (error) throw error
  } catch (error: any) {
    console.error('Error deleting client:', error)
    return { error: error.message || 'Gagal menghapus klien.' }
  }

  revalidatePath('/admin')
}

export async function updateClientAction(data: ClientFormValues) {
  const supabase = await createClient()

  if (!data.id) return { error: 'Client ID is missing.' }

  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const { error: clientError } = await supabase
      .from('clients')
      .update({ 
        slug: data.slug, 
        template_id: data.template_id, 
        is_active: data.is_active 
      })
      .eq('id', data.id)

    if (clientError) throw clientError

    const { error: detailsError } = await supabase
      .from('client_details')
      .update({ 
        bride_name: data.bride_name,
        groom_name: data.groom_name,
        bride_full_name: data.bride_full_name || null,
        groom_full_name: data.groom_full_name || null,
        bride_parents: data.bride_parents || null,
        groom_parents: data.groom_parents || null,
        akad_datetime: data.akad_datetime || null,
        akad_venue_name: data.akad_venue_name || null,
        akad_venue_address: data.akad_venue_address || null,
        resepsi_datetime: data.resepsi_datetime || null,
        resepsi_venue_name: data.resepsi_venue_name || null,
        resepsi_venue_address: data.resepsi_venue_address || null,
        prologue_text: data.prologue_text || null,
        bank_accounts: data.bank_accounts || []
      })
      .eq('client_id', data.id)

    if (detailsError) throw detailsError
  } catch (error: any) {
    console.error('Error updating client:', error)
    return { error: error.message || 'Gagal memperbarui klien.' }
  }

  revalidatePath(`/admin/klien/${data.id}`)
  revalidatePath('/admin')
}

export async function uploadMediaAction(formData: FormData) {
  const supabase = await createClient()

  const clientId = formData.get('client_id') as string
  const mediaKey = formData.get('media_key') as string
  const mediaType = (formData.get('media_type') as string) || 'image'
  const file = formData.get('file') as File

  if (!file || file.size === 0) {
    return { error: 'File tidak ditemukan atau kosong.' }
  }

  try {
    // 1. Get client slug
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .select('slug')
      .eq('id', clientId)
      .single()

    if (clientError || !client) throw new Error('Klien tidak ditemukan.')

    // 2. Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // 3. Upload to Cloudinary
    const result = await uploadToCloudinary(
      buffer,
      client.slug,
      mediaKey,
      mediaType as any
    )

    // 4. Save to client_media (Upsert)
    const { error: mediaError } = await supabase
      .from('client_media')
      .upsert({
        client_id: clientId,
        media_key: mediaKey,
        media_type: mediaType as any,
        cloudinary_public_id: result.public_id,
        cloudinary_url: result.secure_url,
        display_order: 0,
      }, { onConflict: 'client_id, media_key' })

    if (mediaError) throw mediaError

    revalidatePath(`/admin/klien/${clientId}`)
    return { success: true, url: result.secure_url }
  } catch (error: any) {
    console.error('Upload error:', error)
    return { error: error.message || 'Gagal mengupload media.' }
  }
}

export async function signOutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/admin/login')
}
