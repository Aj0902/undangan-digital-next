'use client'

import React, { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Calendar, Heart, Settings, PlusCircle, MinusCircle, Loader2, Layout, Layers } from 'lucide-react'
import Link from 'next/link'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast, Toaster } from 'sonner'

import { createClientAction } from '../../actions'
import { clientFormSchema, type ClientFormValues } from '@/lib/validations/client'
import { AVAILABLE_TEMPLATES } from '@/lib/templates'

interface NewClientFormProps {
  availablePresets: any[]
}

export default function NewClientForm({ availablePresets }: NewClientFormProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const { register, control, handleSubmit, formState: { errors }, watch, setValue } = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema) as any,
    defaultValues: {
      slug: '',
      template_id: '',
      template_type: 'dinamis',
      is_active: true,
      bride_name: '',
      groom_name: '',
      bride_full_name: '',
      groom_full_name: '',
      bride_parents: '',
      groom_parents: '',
      akad_datetime: '',
      akad_venue_name: '',
      akad_venue_address: '',
      resepsi_datetime: '',
      resepsi_venue_name: '',
      resepsi_venue_address: '',
      prologue_text: '',
      bank_accounts: []
    }
  })

  // Watch the template type to toggle dropdown options
  const templateType = watch('template_type')

  // Dynamic Array for Bank Accounts
  const { fields: bankFields, append: appendBank, remove: removeBank } = useFieldArray({
    control,
    name: 'bank_accounts'
  })

  // Handle auto-formatting slug
  const handleSlugUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')
    setValue('slug', val)
  }

  const onSubmit = (data: ClientFormValues) => {
    startTransition(async () => {
      const result = await createClientAction(data)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success('Klien baru berhasil ditambahkan!')
        router.push('/admin')
      }
    })
  }

  return (
    <div className="space-y-10 max-w-4xl mx-auto pb-20 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />
      <Toaster richColors theme="dark" />
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Link href="/admin" className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-white/50 hover:text-emerald-400 shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-serif text-white tracking-tight uppercase">New <span className="font-sans italic text-emerald-400">Client</span></h1>
            <p className="text-white/40 font-bold uppercase tracking-widest text-[10px] mt-2">Initialize Digital Invitation Profile</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* 1. Konfigurasi Dasar */}
        <section className="bg-black/40 backdrop-blur-xl rounded-[2.5rem] border border-white/5 shadow-2x p-8 space-y-8">
          <div className="flex items-center gap-4 border-b border-white/5 pb-6">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.1)] border border-emerald-500/20">
              <Settings className="w-5 h-5 text-emerald-500" />
            </div>
            <h2 className="text-xl font-bold text-white uppercase tracking-widest">1. Blueprint Config</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Slug */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-white/50 block uppercase tracking-widest leading-none mb-1">
                URL Slug <span className="text-emerald-500/50 italic">(ex: siti-zaed)</span>
              </label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-medium text-sm group-focus-within:text-emerald-500 transition-colors">/</span>
                <input 
                  {...register('slug')}
                  onChange={handleSlugUpdate}
                  placeholder="client-name"
                  className="w-full pl-8 pr-6 py-4 bg-white/5 border border-white/5 rounded-2xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-white font-bold text-sm"
                />
              </div>
              {errors.slug && <p className="text-xs text-red-500 font-bold">{errors.slug.message}</p>}
            </div>

            {/* Template Selection */}
            <div className="space-y-6">
              {/* Type Switcher */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-white/50 block uppercase tracking-widest mb-1">Choose Engine Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`flex items-center justify-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${templateType === 'statis' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10'}`}>
                    <input type="radio" value="statis" {...register('template_type')} className="hidden" />
                    <Layout className="w-4 h-4" />
                    <span className="text-[10px] font-extrabold uppercase tracking-widest">Static</span>
                  </label>
                  <label className={`flex items-center justify-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${templateType === 'dinamis' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10'}`}>
                    <input type="radio" value="dinamis" {...register('template_type')} className="hidden" />
                    <Layers className="w-4 h-4" />
                    <span className="text-[10px] font-extrabold uppercase tracking-widest">Dynamic (v3)</span>
                  </label>
                </div>
              </div>

              {/* Template Dropdown */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-white/50 block uppercase tracking-widest mb-1">
                  Select {templateType === 'statis' ? 'Static Base' : 'Design Preset'}
                </label>
                <select 
                  {...register('template_id')}
                  className="w-full px-6 py-4 bg-white/5 border border-white/5 rounded-2xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-white font-bold cursor-pointer text-sm"
                >
                  <option value="" className="bg-neutral-900 text-white/50">-- Choose Template --</option>
                  {templateType === 'statis' ? (
                    AVAILABLE_TEMPLATES.map(t => (
                      <option key={t.id} value={t.id} className="bg-neutral-900 text-white">{t.name}</option>
                    ))
                  ) : (
                    availablePresets.map(p => (
                      <option key={p.id} value={p.id} className="bg-neutral-900 text-white">
                        {p.nama_preset} {p.kategori ? `(${p.kategori})` : ''}
                      </option>
                    ))
                  )}
                </select>
                {errors.template_id && <p className="text-xs text-red-500 font-bold">{errors.template_id.message}</p>}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-5 bg-white/5 rounded-2xl border border-white/5 group transition-colors">
             <input {...register('is_active')} type="checkbox" className="w-6 h-6 rounded border border-white/10 bg-black/50 text-emerald-500 focus:ring-1 focus:ring-emerald-500/50 cursor-pointer" />
             <label className="flex-1 text-sm font-bold text-white/70 tracking-wide">Publish Immediately (Active State)</label>
          </div>
        </section>

        {/* 2. Data Pengantin & Keluarga */}
        <section className="bg-black/40 backdrop-blur-xl rounded-[2.5rem] border border-white/5 shadow-2xl p-8 space-y-6">
          <div className="flex items-center gap-4 border-b border-white/5 pb-6">
            <div className="p-2.5 bg-rose-500/10 rounded-xl shadow-[0_0_15px_rgba(244,63,94,0.1)] border border-rose-500/20">
              <Heart className="w-5 h-5 text-rose-500" />
            </div>
            <h2 className="text-xl font-bold text-white uppercase tracking-widest">2. The Couple</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Wanita */}
            <div className="space-y-4 p-8 bg-rose-950/10 rounded-3xl border border-rose-500/10">
              <h3 className="text-[10px] font-extrabold text-rose-400 uppercase tracking-[0.3em]">The Bride</h3>
              <input {...register('bride_name')} placeholder="Nickname" className="w-full px-5 py-3.5 bg-black/30 border border-white/5 rounded-xl focus:ring-1 focus:ring-rose-500 focus:border-rose-500 text-sm font-bold text-white placeholder:text-white/20" />
              {errors.bride_name && <p className="text-xs text-red-500 font-bold">{errors.bride_name.message}</p>}
              <input {...register('bride_full_name')} placeholder="Full Legal Name" className="w-full px-5 py-3.5 bg-black/30 border border-white/5 rounded-xl focus:ring-1 focus:ring-rose-500 focus:border-rose-500 text-sm font-medium text-white/80 placeholder:text-white/20" />
              <input {...register('bride_parents')} placeholder="Parents Name" className="w-full px-5 py-3.5 bg-black/30 border border-white/5 rounded-xl focus:ring-1 focus:ring-rose-500 focus:border-rose-500 text-sm font-medium text-white/80 placeholder:text-white/20" />
            </div>
            
            {/* Pria */}
            <div className="space-y-4 p-8 bg-emerald-950/10 rounded-3xl border border-emerald-500/10">
              <h3 className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-[0.3em]">The Groom</h3>
              <input {...register('groom_name')} placeholder="Nickname" className="w-full px-5 py-3.5 bg-black/30 border border-white/5 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-bold text-white placeholder:text-white/20" />
              {errors.groom_name && <p className="text-xs text-red-500 font-bold">{errors.groom_name.message}</p>}
              <input {...register('groom_full_name')} placeholder="Full Legal Name" className="w-full px-5 py-3.5 bg-black/30 border border-white/5 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium text-white/80 placeholder:text-white/20" />
              <input {...register('groom_parents')} placeholder="Parents Name" className="w-full px-5 py-3.5 bg-black/30 border border-white/5 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium text-white/80 placeholder:text-white/20" />
            </div>
          </div>
          
          <div className="space-y-3 mt-6">
            <label className="text-[10px] font-extrabold text-white/40 uppercase tracking-[0.2em] px-1">Prologue Text</label>
            <textarea {...register('prologue_text')} rows={3} placeholder="Write something beautiful..." className="w-full px-6 py-4 bg-black/30 border border-white/5 rounded-2xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium text-white/80 resize-none placeholder:text-white/20" />
          </div>
        </section>

        {/* 3. Data Acara */}
        <section className="bg-black/40 backdrop-blur-xl rounded-[2.5rem] border border-white/5 shadow-2xl p-8 space-y-6">
          <div className="flex items-center gap-4 border-b border-white/5 pb-6">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl shadow-[0_0_15px_rgba(52,211,153,0.1)] border border-emerald-500/20">
              <Calendar className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-white uppercase tracking-widest">3. Event Timeline</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 p-8 bg-black/30 rounded-3xl border border-white/5">
              <h3 className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-[0.3em]">Akad Nikah</h3>
              <input type="datetime-local" {...register('akad_datetime')} className="w-full px-5 py-3.5 bg-black/30 border border-white/5 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium text-white/80 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
              <input {...register('akad_venue_name')} placeholder="Venue Name" className="w-full px-5 py-3.5 bg-black/30 border border-white/5 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium text-white/80" />
              <textarea {...register('akad_venue_address')} placeholder="Full Address" rows={2} className="w-full px-5 py-3.5 bg-black/30 border border-white/5 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium text-white/80 resize-none" />
            </div>
            
            <div className="space-y-4 p-8 bg-black/30 rounded-3xl border border-white/5">
              <h3 className="text-[10px] font-extrabold text-emerald-500 uppercase tracking-[0.3em]">Resepsi</h3>
              <input type="datetime-local" {...register('resepsi_datetime')} className="w-full px-5 py-3.5 bg-black/30 border border-white/5 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium text-white/80 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
              <input {...register('resepsi_venue_name')} placeholder="Venue Name" className="w-full px-5 py-3.5 bg-black/30 border border-white/5 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium text-white/80" />
              <textarea {...register('resepsi_venue_address')} placeholder="Full Address" rows={2} className="w-full px-5 py-3.5 bg-black/30 border border-white/5 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium text-white/80 resize-none" />
            </div>
          </div>
        </section>

        {/* 4. Rekening Hadiah (Dynamic Array) */}
        <section className="bg-black/40 backdrop-blur-xl rounded-[2.5rem] border border-white/5 shadow-2xl p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-widest">4. Digital Gift</h2>
            <button type="button" onClick={() => appendBank({ bank: '', name: '', number: '' })} className="px-5 py-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-xl font-bold text-sm hover:bg-emerald-500/20 transition-all flex items-center gap-2">
              <PlusCircle className="w-4 h-4" /> Add Row 
            </button>
          </div>
          
          <div className="space-y-4">
            {bankFields.map((field, index) => (
              <div key={field.id} className="flex gap-4 items-start p-6 bg-black/30 rounded-3xl border border-white/5 relative group">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input {...register(`bank_accounts.${index}.bank` as const)} placeholder="Bank (ex: BCA)" required className="w-full px-5 py-3.5 bg-black/50 border border-white/10 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-bold text-white" />
                  <input {...register(`bank_accounts.${index}.number` as const)} placeholder="Account No" required className="w-full px-5 py-3.5 bg-black/50 border border-white/10 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-bold text-white font-mono" />
                  <input {...register(`bank_accounts.${index}.name` as const)} placeholder="A.N Name" required className="w-full px-5 py-3.5 bg-black/50 border border-white/10 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-bold text-white" />
                </div>
                <button type="button" onClick={() => removeBank(index)} className="p-3 text-white/20 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
                  <MinusCircle className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>
          
          {bankFields.length === 0 && (
            <div className="text-center p-12 border-2 border-dashed border-white/10 rounded-3xl bg-black/20">
               <p className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em]">No Bank Accounts Attached</p>
            </div>
          )}
        </section>

        {/* Form Footer / Submit */}
        <div className="flex flex-col md:flex-row items-center gap-4 pt-10">
          <button 
            type="submit" 
            disabled={isPending}
            className="w-full md:flex-1 h-[70px] bg-emerald-500 hover:bg-emerald-400 text-black text-lg font-extrabold tracking-widest uppercase rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center justify-center gap-3 transform hover:-translate-y-1 active:translate-y-0"
          >
            {isPending ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Save className="w-6 h-6" />
            )}
            Save & Deploy Profile
          </button>
          
          <Link 
            href="/admin"
            className="w-full md:w-auto h-[70px] px-12 bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 rounded-2xl flex items-center justify-center font-bold transition-all text-sm uppercase tracking-widest"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
