import React from 'react'
import { createClient } from '@/utils/supabase/server'
import NewClientForm from './NewClientForm'

export default async function NewClientPage() {
  const supabase = await createClient()

  // Fetch all available presets for Dynamic Template option
  const { data: presets, error } = await supabase
    .from('presets')
    .select('id, nama_preset, kategori')
    .order('nama_preset', { ascending: true })

  if (error) {
    console.error('Error fetching presets:', error)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <NewClientForm availablePresets={presets || []} />
    </div>
  )
}
