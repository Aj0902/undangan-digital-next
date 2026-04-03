import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// ⚠️ Agar build di Vercel tidak crash seketika saat inisialisasi module, 
// kita hanya log error ke console dan tidak melakukan 'throw'.
// User tetap wajib mengisi variabel ini di Vercel Dashboard agar aplikasi berjalan.
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '\n\n[supabase.ts] ❌ ERROR: NEXT_PUBLIC_SUPABASE_URL atau NEXT_PUBLIC_SUPABASE_ANON_KEY tidak ditemukan!\n' +
    'Silakan masukkan variabel ini di Dashboard Vercel (Settings > Environment Variables) agar aplikasi bisa berjalan.\n\n'
  );
}

// Inisialisasi Klien Supabase (dengan fallback string kosong agar tidak crash saat build-time evaluation)
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
