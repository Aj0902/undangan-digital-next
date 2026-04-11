import React from 'react'
import Link from 'next/link'
import { 
  BarChart3, 
  Users, 
  Settings, 
  LogOut, 
  PlusCircle, 
  ShieldCheck,
  ChevronRight,
  Palette
} from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { signOutAction } from './actions'

import AdminShell from '@/viding-builder/components/AdminShell'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <AdminShell user={user}>
      {children}
    </AdminShell>
  )
}
