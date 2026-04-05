import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import ClientForm from './ClientForm'

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch client including details and media
  const { data: client, error } = await supabase
    .from('clients')
    .select('*, client_details(*), client_media(*)')
    .eq('id', id)
    .single()

  if (error || !client) {
    console.error('Error fetching client details:', error)
    return notFound()
  }

  return (
    <div className="max-w-6xl mx-auto pb-24">
       <ClientForm client={client} />
    </div>
  )
}
