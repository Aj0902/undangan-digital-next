# Karena nama tabel Anda adalah "mpv-undangan-digital" (menggunakan tanda strip / hyphen),
# Anda wajib menggunakan tanda kutip ganda saat memanggil tabelnya di PostgreSQL.
# Copy keseluruhan kode SQL di bawah ini dan jalankan di "SQL Editor" pada dashboard Supabase Anda.

CREATE TABLE IF NOT EXISTS public."mpv-undangan-digital" (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name text NOT NULL,
  attendance_status boolean NOT NULL,
  pax integer NOT NULL DEFAULT 0,
  greeting_message text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Mengaktifkan Keamanan Lapisan Data (Row Level Security / RLS)
ALTER TABLE public."mpv-undangan-digital" ENABLE ROW LEVEL SECURITY;

-- KEBIJAKAN 1: Izinkan publik (anon) untuk memasukkan data (Insert RSVP)
CREATE POLICY "Enable insert for anonymous guests" 
ON public."mpv-undangan-digital" 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- KEBIJAKAN 2: Izinkan publik untuk membaca isi pesan/ucapan (Select) agar bisa dipasang di UI Guestbook
CREATE POLICY "Enable read access for all guests" 
ON public."mpv-undangan-digital" 
FOR SELECT 
TO public 
USING (true);
