import { z } from 'zod'

export const bankAccountSchema = z.object({
  bank: z.string().min(1, 'Nama bank wajib diisi'),
  name: z.string().min(1, 'Nama pemilik wajib diisi'),
  number: z.string().min(1, 'Nomor rekening wajib diisi'),
})

export const clientFormSchema = z.object({
  id: z.string().optional(), // Hanya ada saat edit
  slug: z.string().min(3, 'Slug minimal 3 karakter').regex(/^[a-z0-9-]+$/, 'Hanya boleh huruf kecil, angka, dan strip (-)'),
  template_id: z.string().min(1, 'Template wajib dipilih'),
  is_active: z.boolean().optional(),
  
  bride_name: z.string().min(1, 'Nama panggilan mempelai wanita wajib diisi'),
  groom_name: z.string().min(1, 'Nama panggilan mempelai pria wajib diisi'),
  bride_full_name: z.string().nullable().optional(),
  groom_full_name: z.string().nullable().optional(),
  
  bride_parents: z.string().nullable().optional(),
  groom_parents: z.string().nullable().optional(),
  
  akad_datetime: z.string().nullable().optional(),
  akad_venue_name: z.string().nullable().optional(),
  akad_venue_address: z.string().nullable().optional(),
  
  resepsi_datetime: z.string().nullable().optional(),
  resepsi_venue_name: z.string().nullable().optional(),
  resepsi_venue_address: z.string().nullable().optional(),
  
  prologue_text: z.string().nullable().optional(),
  
  bank_accounts: z.array(bankAccountSchema).optional(),
})

export type ClientFormValues = z.infer<typeof clientFormSchema>
