-- KODE PERBAIKAN: Hapus tabel lama yang rusak / tidak lengkap kolomnya
DROP TABLE IF EXISTS public."mpv-undangan-digital" CASCADE;

-- Buat ulang tabel dengan susunan kolom standar yang 100% lengkap
CREATE TABLE public."mpv-undangan-digital" (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name text NOT NULL,
  attendance_status boolean NOT NULL,
  pax integer NOT NULL DEFAULT 0,
  greeting_message text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Mengaktifkan RLS
ALTER TABLE public."mpv-undangan-digital" ENABLE ROW LEVEL SECURITY;

-- Buka gembok untuk jalur Formulir (Insert)
CREATE POLICY "Enable insert for anonymous guests" 
ON public."mpv-undangan-digital" 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Buka gembok untuk jalur Buku Tamu / Guestbook (Select)
CREATE POLICY "Enable read access for all guests" 
ON public."mpv-undangan-digital" 
FOR SELECT 
TO public 
USING (true);
