import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import ClientForm from './ClientForm'

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch client including details and media
  const { data: client, error: clientError } = await supabase
    .from('clients')
    .select('*, client_details(*), client_media(*)')
    .eq('id', id)
    .single()

  // Fetch presets for dynamic selection
  const { data: presets } = await supabase
    .from('presets')
    .select('id, nama_preset, kategori')
    .order('nama_preset', { ascending: true })

  if (clientError || !client) {
    console.error('Error fetching client details:', clientError)
    return notFound()
  }

  return (
    <div className="max-w-6xl mx-auto pb-24">
       <ClientForm client={client} availablePresets={presets || []} />
    </div>
  )
}
