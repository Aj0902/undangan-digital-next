'use client'

import React, { useState, useTransition } from 'react'
import { 
  ArrowLeft, Save, Upload, Image as ImageIcon, Music, Trash2, Check, Loader2, 
  ExternalLink, Plus, Settings, Heart, PlusCircle, MinusCircle, Calendar,
  Layout, Layers, Paintbrush
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast, Toaster } from 'sonner'

// shadcn/ui components
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { updateClientAction, uploadMediaAction, deleteClientAction } from '../../actions'
import { applyPresetToClientAction } from '../../preset-actions'
import { clientFormSchema, type ClientFormValues } from '@/lib/validations/client'
import { AVAILABLE_TEMPLATES } from '@/lib/templates'

interface ClientFormProps {
  client: any
  availablePresets: any[]
}

export default function ClientForm({ client, availablePresets }: ClientFormProps) {
  const [isUpdating, startUpdate] = useTransition()
  const [isDeleting, startDelete] = useTransition()
  const [isUploading, setIsUploading] = useState<string | null>(null)
  const router = useRouter()

  // Initialize React Hook Form
  const { register, control, handleSubmit, formState: { errors }, watch } = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema) as any,
    defaultValues: {
      id: client.id,
      slug: client.slug || '',
      template_id: client.template_id || '',
      template_type: client.template_type || 'dinamis',
      is_active: client.is_active ?? true,
      
      bride_name: client.client_details?.bride_name || '',
      groom_name: client.client_details?.groom_name || '',
      bride_full_name: client.client_details?.bride_full_name || '',
      groom_full_name: client.client_details?.groom_full_name || '',
      
      bride_parents: client.client_details?.bride_parents || '',
      groom_parents: client.client_details?.groom_parents || '',
      
      akad_datetime: client.client_details?.akad_datetime || '',
      akad_venue_name: client.client_details?.akad_venue_name || '',
      akad_venue_address: client.client_details?.akad_venue_address || '',
      
      resepsi_datetime: client.client_details?.resepsi_datetime || '',
      resepsi_venue_name: client.client_details?.resepsi_venue_name || '',
      resepsi_venue_address: client.client_details?.resepsi_venue_address || '',
      
      prologue_text: client.client_details?.prologue_text || '',
      
      bank_accounts: client.client_details?.bank_accounts || [],
    }
  })

  // Watch the template type to toggle dropdown options
  const templateType = watch('template_type')
  const templateId = watch('template_id')
  const slug = watch('slug')

  const handleTemplateChange = async (val: string) => {
    if (templateType === 'dinamis' && val) {
      if (confirm('Menerapkan preset ini akan mengganti desain kustom yang ada (jika ada). Lanjutkan?')) {
        startUpdate(async () => {
          const result = await applyPresetToClientAction(client.id, val);
          if (result.error) toast.error(result.error);
          else {
            toast.success('Preset applied successfully!');
            router.refresh();
          }
        });
      }
    }
  }

  // Dynamic Array for Bank Accounts
  const { fields: bankFields, append: appendBank, remove: removeBank } = useFieldArray({
    control,
    name: 'bank_accounts'
  })

  const onSubmit = (data: ClientFormValues) => {
    startUpdate(async () => {
      const result = await updateClientAction(data)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success('Klien berhasil diperbarui!')
      }
    })
  }

  const handleDelete = () => {
    if (confirm('Apakah Anda yakin ingin menghapus klien ini secara permanen?')) {
      startDelete(async () => {
        const result = await deleteClientAction(client.id)
        if (result?.error) {
          toast.error(result.error)
        } else {
          toast.success('Klien berhasil dihapus.')
          router.push('/admin')
        }
      })
    }
  }

  const handleMediaUpload = async (mediaKey: string, mediaType: string = 'image', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(mediaKey)
    const formData = new FormData()
    formData.append('client_id', client.id)
    formData.append('media_key', mediaKey)
    formData.append('media_type', mediaType)
    formData.append('file', file)

    const result = await uploadMediaAction(formData)
    setIsUploading(null)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Media berhasil diupload!')
      event.target.value = ''
    }
  }

  const getMediaUrl = (key: string) => {
    return client.client_media?.find((m: any) => m.media_key === key)?.cloudinary_url
  }

  return (
    <div className="space-y-12 relative pb-20">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />
      <Toaster richColors theme="dark" />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
        <div className="flex items-center gap-5">
           <Link href="/admin" className="p-3 bg-[#111] border border-white/10 rounded-2xl hover:bg-white/5 transition-all text-white/50 hover:text-amber-400 shadow-sm relative group overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/0 via-amber-500/0 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
             <ArrowLeft className="w-5 h-5 relative z-10" />
           </Link>
           <div>
             <div className="flex items-center gap-4">
               <h1 className="text-3xl font-serif text-white tracking-tight uppercase">Client <span className="font-sans italic text-amber-500">Details</span></h1>
               <span className={`px-4 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-[0.2em] ${client.is_active ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(52,211,153,0.1)]' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                 {client.is_active ? 'Live Status' : 'Offline'}
               </span>
             </div>
             <p className="text-white/40 font-bold uppercase tracking-widest text-[10px] mt-2 flex items-center gap-2">
               Slug Index: <span className="text-amber-500 font-bold tracking-normal italic ml-1">/{client.slug}</span>
               <Link href={`/${client.slug}`} target="_blank" className="p-1.5 hover:bg-white/5 rounded-lg transition-all text-white/30 hover:text-amber-400 border border-transparent hover:border-white/10">
                 <ExternalLink className="w-3.5 h-3.5" />
               </Link>
             </p>
           </div>
        </div>
        <div className="flex items-center gap-3">
            {templateType === 'dinamis' && (
              <Button asChild className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold h-auto py-3.5 px-8 rounded-2xl shadow-xl shadow-emerald-900/20 uppercase tracking-[0.2em] text-[10px] transition-all transform hover:-translate-y-1">
                <Link href={`/builder/${slug}`}>
                  <Paintbrush className="w-4 h-4 mr-3" />
                  Customize in Builder
                </Link>
              </Button>
            )}
            <Button onClick={handleDelete} disabled={isDeleting} variant="destructive" className="rounded-2xl border border-red-500/20 uppercase tracking-widest text-[10px] font-bold h-auto py-3.5 px-6">
              {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              Delete Identity
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
             
             {/* 1. Konfigurasi Dasar */}
             <Card className="bg-[#111]/80 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl p-8 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[50px] rounded-full" />
                <CardHeader className="p-0 space-y-0">
                  <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                    <div className="p-2.5 bg-amber-500/10 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.1)] border border-amber-500/20">
                      <Settings className="w-5 h-5 text-amber-500" />
                    </div>
                    <CardTitle className="text-xl font-bold text-white uppercase tracking-widest">1. Blueprint Config</CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="p-0 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <div className="space-y-3">
                      <Label className="text-[10px] font-bold text-white/50 block uppercase tracking-widest leading-none mb-1">URL Slug</Label>
                      <Input {...register('slug')} className="bg-black/50 border-white/10 rounded-2xl h-14" />
                      {errors.slug && <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{errors.slug.message}</p>}
                    </div>

                    <div className="space-y-6">
                      {/* Type Switcher */}
                      <div className="space-y-3">
                        <Label className="text-[10px] font-bold text-white/50 block uppercase tracking-widest mb-1">Choose Engine Type</Label>
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

                      {/* Template Display */}
                      <div className="space-y-3">
                        <Label className="text-[10px] font-bold text-white/50 block uppercase tracking-widest mb-1">
                          Select {templateType === 'statis' ? 'Static Base' : 'Design Preset'}
                        </Label>
                        <select 
                          {...register('template_id')} 
                          onChange={(e) => {
                            register('template_id').onChange(e);
                            handleTemplateChange(e.target.value);
                          }}
                          className="w-full px-6 py-4 bg-black/50 border border-white/10 rounded-2xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-white font-bold cursor-pointer text-sm"
                        >
                          <option value="" className="bg-black text-white/50">-- Choose Template --</option>
                          {templateType === 'statis' ? (
                            AVAILABLE_TEMPLATES.map(t => (
                              <option key={t.id} value={t.id} className="bg-black text-white">{t.name}</option>
                            ))
                          ) : (
                            availablePresets.map(p => (
                              <option key={p.id} value={p.id} className="bg-black text-white">
                                {p.nama_preset} {p.kategori ? `(${p.kategori})` : ''}
                              </option>
                            ))
                          )}
                        </select>
                        {errors.template_id && <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{errors.template_id.message}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-5 bg-black/30 rounded-2xl border border-white/5 relative z-10">
                    <div className="flex items-center space-x-2">
                       <Checkbox 
                        id="is_active" 
                        defaultChecked={client.is_active}
                        onCheckedChange={(checked) => {
                          const val = checked === true
                          const event = { target: { name: 'is_active', value: val } }
                          register('is_active').onChange(event as any)
                        }}
                      />
                      <Label htmlFor="is_active" className="text-sm font-bold text-white/70 tracking-wide cursor-pointer">Publish Immediately (Active State)</Label>
                    </div>
                  </div>
                </CardContent>
             </Card>

             {/* 2. Data Pengantin & Keluarga */}
             <Card className="bg-[#111]/80 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl p-8 space-y-6">
                <CardHeader className="p-0">
                  <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                    <div className="p-2.5 bg-rose-500/10 rounded-xl shadow-[0_0_15px_rgba(244,63,94,0.1)] border border-rose-500/20">
                      <Heart className="w-5 h-5 text-rose-500" />
                    </div>
                    <CardTitle className="text-xl font-bold text-white uppercase tracking-widest">2. The Couple</CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="p-0 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Wanita */}
                    <div className="space-y-4 p-8 bg-rose-950/20 rounded-3xl border border-rose-500/20">
                      <h3 className="text-[10px] font-extrabold text-rose-400 uppercase tracking-[0.3em]">The Bride</h3>
                      <Input {...register('bride_name')} placeholder="Nickname" className="bg-black/50 border-white/10" />
                      <Input {...register('bride_full_name')} placeholder="Full Legal Name" className="bg-black/50 border-white/10" />
                      <Input {...register('bride_parents')} placeholder="Parents Name" className="bg-black/50 border-white/10" />
                    </div>
                    
                    {/* Pria */}
                    <div className="space-y-4 p-8 bg-indigo-950/20 rounded-3xl border border-indigo-500/20">
                      <h3 className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-[0.3em]">The Groom</h3>
                      <Input {...register('groom_name')} placeholder="Nickname" className="bg-black/50 border-white/10" />
                      <Input {...register('groom_full_name')} placeholder="Full Legal Name" className="bg-black/50 border-white/10" />
                      <Input {...register('groom_parents')} placeholder="Parents Name" className="bg-black/50 border-white/10" />
                    </div>
                  </div>
                  
                  {/* Prologue */}
                  <div className="space-y-3 mt-6">
                    <Label className="text-[10px] font-extrabold text-white/40 uppercase tracking-[0.2em] px-1">Prologue Text</Label>
                    <Textarea {...register('prologue_text')} rows={3} placeholder="Write something beautiful..." className="bg-black/50 border-white/10 rounded-2xl resize-none" />
                  </div>
                </CardContent>
             </Card>

             {/* 3. Data Acara */}
             <Card className="bg-[#111]/80 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl p-8 space-y-6">
                <CardHeader className="p-0">
                  <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                    <div className="p-2.5 bg-emerald-500/10 rounded-xl shadow-[0_0_15px_rgba(52,211,153,0.1)] border border-emerald-500/20">
                      <Calendar className="w-5 h-5 text-emerald-400" />
                    </div>
                    <CardTitle className="text-xl font-bold text-white uppercase tracking-widest">3. Event Timeline</CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="p-0 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Akad */}
                    <div className="space-y-4 p-8 bg-[#0a0a0a]/50 rounded-3xl border border-white/5">
                      <h3 className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-[0.3em]">Akad Nikah</h3>
                      <Input type="datetime-local" {...register('akad_datetime')} className="bg-black/50 border-white/10 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
                      <Input {...register('akad_venue_name')} placeholder="Venue Name" className="bg-black/50 border-white/10" />
                      <Textarea {...register('akad_venue_address')} placeholder="Full Address" rows={2} className="bg-black/50 border-white/10 rounded-xl resize-none" />
                    </div>
                    
                    {/* Resepsi */}
                    <div className="space-y-4 p-8 bg-[#0a0a0a]/50 rounded-3xl border border-white/5">
                      <h3 className="text-[10px] font-extrabold text-amber-500 uppercase tracking-[0.3em]">Resepsi</h3>
                      <Input type="datetime-local" {...register('resepsi_datetime')} className="bg-black/50 border-white/10 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
                      <Input {...register('resepsi_venue_name')} placeholder="Venue Name" className="bg-black/50 border-white/10" />
                      <Textarea {...register('resepsi_venue_address')} placeholder="Full Address" rows={2} className="bg-black/50 border-white/10 rounded-xl resize-none" />
                    </div>
                  </div>
                </CardContent>
             </Card>

             {/* 4. Rekening Hadiah (Dynamic Array) */}
             <Card className="bg-[#111]/80 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl p-8 space-y-6">
                <CardHeader className="p-0">
                  <div className="flex items-center justify-between border-b border-white/5 pb-6">
                    <CardTitle className="text-xl font-bold text-white uppercase tracking-widest">4. Digital Gift</CardTitle>
                    <Button type="button" variant="outline" onClick={() => appendBank({ bank: '', name: '', number: '' })} className="bg-amber-500/10 border-amber-500/20 text-amber-500 hover:bg-amber-500/20 hover:text-amber-400 font-bold text-[10px] uppercase tracking-widest">
                      <PlusCircle className="w-4 h-4 mr-2" /> Add Row 
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0 space-y-4">
                  {bankFields.map((field, index) => (
                    <div key={field.id} className="flex gap-4 items-start p-6 bg-[#0a0a0a]/50 rounded-3xl border border-white/5 relative group">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input {...register(`bank_accounts.${index}.bank` as const)} placeholder="Bank (ex: BCA)" required className="bg-black/50 border-white/10" />
                        <Input {...register(`bank_accounts.${index}.number` as const)} placeholder="Account No" required className="bg-black/50 border-white/10 font-mono" />
                        <Input {...register(`bank_accounts.${index}.name` as const)} placeholder="A.N Name" required className="bg-black/50 border-white/10" />
                      </div>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeBank(index)} className="text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all">
                        <MinusCircle className="w-6 h-6" />
                      </Button>
                    </div>
                  ))}
                  
                  {bankFields.length === 0 && (
                    <div className="text-center p-12 border-2 border-dashed border-white/10 rounded-3xl bg-[#0a0a0a]/30">
                       <p className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em]">No Bank Accounts Attached</p>
                    </div>
                  )}
                </CardContent>
             </Card>

             <Button type="submit" disabled={isUpdating} className="w-full h-20 bg-amber-500 hover:bg-amber-400 text-black text-lg font-extrabold tracking-widest uppercase rounded-[2rem] transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] flex items-center justify-center gap-3 transform hover:-translate-y-1 active:translate-y-0">
               {isUpdating ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
               Save Master Data
             </Button>
          </form>
        </div>

        {/* Media Management - SIDEBAR */}
        <div className="space-y-10">
          <Card className="bg-[#111]/80 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl p-8 space-y-8 h-full sticky top-28 overflow-hidden relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/5 blur-[40px] rounded-full pointer-events-none" />
            <CardHeader className="p-0">
              <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                  <div className="p-2.5 bg-amber-500/10 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.1)] border border-amber-500/20">
                    <ImageIcon className="w-5 h-5 text-amber-500" />
                  </div>
                  <CardTitle className="text-xl font-bold text-white uppercase tracking-widest">Media Assets</CardTitle>
              </div>
            </CardHeader>
            
            <CardContent className="p-0 space-y-8 h-full">
              <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
                <p className="text-[10px] text-amber-500/70 font-bold leading-relaxed uppercase tracking-wider">
                  Note: Files upload instantly to cloud storage. Use portrait ratios for High-Quality Covers.
                </p>
              </div>

              <div className="space-y-10 relative z-10">
                {['cover', 'bride_photo', 'groom_photo', 'gallery_01', 'gallery_02', 'gallery_03', 'gallery_04', 'gallery_05', 'gallery_06', 'music'].map((key) => {
                  const url = getMediaUrl(key)
                  const isMusic = key === 'music'
                  
                  return (
                    <div key={key} className="group relative">
                      <div className="flex items-center justify-between mb-3 px-1">
                        <Label className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] flex items-center gap-2">
                          {isMusic ? <Music className="w-3.5 h-3.5 text-amber-500/50" /> : <ImageIcon className="w-3.5 h-3.5 text-amber-500/50" />}
                          {key.replace('_', ' ')}
                        </Label>
                        {url && <Check className="w-4 h-4 text-emerald-500" />}
                      </div>

                      <div className={`relative ${isMusic ? 'h-[70px]' : 'aspect-video'} rounded-3xl bg-black/50 overflow-hidden border border-dashed ${isUploading === key ? 'border-amber-500' : 'border-white/20'} transition-all`}>
                          {isUploading === key ? (
                            <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center z-10 border border-amber-500/50 rounded-3xl">
                              <Loader2 className="w-6 h-6 animate-spin text-amber-500 mb-2" />
                              <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.2em]">Uploading</span>
                            </div>
                          ) : url ? (
                            <>
                              {isMusic ? (
                                <div className="flex items-center h-full px-6 gap-4">
                                    <div className="p-3 bg-amber-500/10 rounded-full border border-amber-500/20 text-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                                      <Music className="w-4 h-4" />
                                    </div>
                                    <span className="text-[10px] font-bold text-white/50 truncate uppercase tracking-widest">Audio Active</span>
                                </div>
                              ) : (
                                <img src={url} alt={key} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80" />
                              )}
                              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex justify-end transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                <label className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white cursor-pointer hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all shadow-2xl">
                                    <Upload className="w-4 h-4" />
                                    <input type="file" className="hidden" accept={isMusic ? "audio/*" : "image/*"} onChange={(e) => handleMediaUpload(key, isMusic ? 'audio' : 'image', e)} />
                                </label>
                              </div>
                            </>
                          ) : (
                            <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all group-hover:border-amber-500/50">
                               <div className="p-4 bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] rounded-2xl text-white/30 group-hover:text-amber-500 transition-colors">
                                 <Plus className="w-5 h-5" />
                               </div>
                               <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30 mt-4 group-hover:text-amber-500/70 transition-colors">Upload {key}</span>
                               <input type="file" className="hidden" accept={isMusic ? "audio/*" : "image/*"} onChange={(e) => handleMediaUpload(key, isMusic ? 'audio' : 'image', e)} />
                            </label>
                          )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
