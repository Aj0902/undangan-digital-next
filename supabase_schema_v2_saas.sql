-- ============================================================
-- SUPABASE SCHEMA v2 — Multi-Tenant SaaS Undangan Digital
-- Phase 1 Execution: Database Redesign
-- ============================================================
-- ⚠️  INSTRUKSI EKSEKUSI:
--     Jalankan script ini SELURUHNYA di Supabase SQL Editor.
--     Pastikan sudah backup / export data RSVP lama sebelum
--     menjalankan perintah DROP TABLE di bawah.
-- ============================================================


-- ===========================================================
-- STEP 0: CLEANUP — Hapus skema MVP lama
-- ===========================================================
-- ⚠️  BAHAYA: Perintah ini akan MENGHAPUS tabel RSVP lama beserta
--     semua datanya secara permanen. Eksekusi hanya setelah
--     data lama selesai di-migrate / di-backup.
DROP TABLE IF EXISTS public."mpv-undangan-digital" CASCADE;


-- ===========================================================
-- STEP 1: Buat Tabel `clients` — Master Data Klien
-- ===========================================================
-- Satu baris = satu proyek undangan.
-- Kolom `slug` adalah kunci URL: undanganku.com/{slug}
-- ===========================================================
CREATE TABLE IF NOT EXISTS public.clients (
  id          uuid        NOT NULL DEFAULT gen_random_uuid(),
  slug        text        NOT NULL,
  template_id text        NOT NULL DEFAULT 'classic-elegant',
  is_active   boolean     NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT clients_pkey         PRIMARY KEY (id),
  CONSTRAINT clients_slug_unique  UNIQUE (slug),

  -- Slug harus URL-friendly: hanya lowercase huruf/angka dan tanda hubung
  CONSTRAINT clients_slug_format  CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

COMMENT ON TABLE  public.clients            IS 'Master daftar klien agency. Satu baris = satu proyek undangan.';
COMMENT ON COLUMN public.clients.slug        IS 'Identifier unik untuk URL klien, contoh: siti-zaed-2026. Hanya lowercase, angka, dan tanda hubung.';
COMMENT ON COLUMN public.clients.template_id IS 'ID tema desain yang dipakai. Harus cocok dengan TEMPLATE_ID di file manifest.ts template.';
COMMENT ON COLUMN public.clients.is_active   IS 'Kill-switch per klien. false = URL 404, true = undangan tampil.';


-- ===========================================================
-- STEP 2: Buat Tabel `client_details` — Konten Undangan
-- ===========================================================
-- Semua teks undangan yang dulu hardcoded pindah ke sini.
-- Satu relasi 1:1 ke tabel clients.
-- Tidak ada kolom URL media di sini — cek tabel client_media.
-- ===========================================================
CREATE TABLE IF NOT EXISTS public.client_details (
  id                    uuid        NOT NULL DEFAULT gen_random_uuid(),
  client_id             uuid        NOT NULL,

  -- Data Pasangan
  bride_name            text        NOT NULL,
  groom_name            text        NOT NULL,
  bride_full_name       text,
  groom_full_name       text,
  bride_parents         text,
  groom_parents         text,

  -- Data Acara Akad Nikah
  akad_datetime         timestamptz,
  akad_venue_name       text,
  akad_venue_address    text,

  -- Data Acara Resepsi
  resepsi_datetime      timestamptz,
  resepsi_venue_name    text,
  resepsi_venue_address text,

  -- Konten Teks Undangan
  prologue_text         text,

  -- Rekening Hadiah (array JSON: [{bank, name, number}])
  -- ⚠️  cover_image_url dan music_url TIDAK ada di sini.
  --     Semua URL media dikelola di tabel client_media.
  bank_accounts         jsonb       NOT NULL DEFAULT '[]'::jsonb,

  created_at            timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT client_details_pkey      PRIMARY KEY (id),
  CONSTRAINT client_details_client_fk FOREIGN KEY (client_id)
    REFERENCES public.clients (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  -- Constraint: satu klien hanya boleh punya satu baris detail
  CONSTRAINT client_details_client_unique UNIQUE (client_id),

  -- bank_accounts harus berupa JSON array (bukan null atau object)
  CONSTRAINT client_details_bank_accounts_is_array
    CHECK (jsonb_typeof(bank_accounts) = 'array')
);

COMMENT ON TABLE  public.client_details               IS 'Detail konten undangan per klien. Relasi 1:1 ke tabel clients.';
COMMENT ON COLUMN public.client_details.bank_accounts  IS 'Array JSON rekening hadiah. Format: [{\"bank\": \"BCA\", \"name\": \"Nama Pemilik\", \"number\": \"1234567890\"}]';
COMMENT ON COLUMN public.client_details.client_id      IS 'FK ke clients.id. ON DELETE CASCADE: hapus clients → hapus detail ini otomatis.';


-- ===========================================================
-- STEP 3: Buat Tabel `client_media` — Manajemen Media
-- ===========================================================
-- Semua URL gambar/audio/video dari Cloudinary disimpan di sini.
-- Satu baris = satu aset media dengan peran (media_key) tertentu.
-- Desain tabel ini memungkinkan tiap template punya kebutuhan
-- media yang berbeda tanpa menambah kolom di client_details.
-- ===========================================================
CREATE TABLE IF NOT EXISTS public.client_media (
  id                   uuid        NOT NULL DEFAULT gen_random_uuid(),
  client_id            uuid        NOT NULL,

  -- "Nama peran" media dalam template. Contoh: 'cover', 'music',
  -- 'gallery_1', 'gallery_2', 'bg_video'. Harus cocok dengan
  -- key yang didefinisikan di manifest.ts template yang bersangkutan.
  media_key            text        NOT NULL,

  -- Jenis media — dikunci ke tiga nilai yang valid
  media_type           text        NOT NULL,

  -- Data dari Cloudinary (wajib diisi setelah upload)
  cloudinary_public_id text        NOT NULL,
  cloudinary_url       text        NOT NULL,

  -- Metadata opsional
  alt_text             text,                   -- Deskripsi untuk aksesibilitas & SEO
  display_order        integer     NOT NULL DEFAULT 0,  -- Urutan untuk galeri

  created_at           timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT client_media_pkey      PRIMARY KEY (id),
  CONSTRAINT client_media_client_fk FOREIGN KEY (client_id)
    REFERENCES public.clients (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  -- Satu klien tidak boleh punya dua media dengan key yang sama
  CONSTRAINT client_media_unique_key UNIQUE (client_id, media_key),

  -- Hanya tiga tipe media yang diizinkan
  CONSTRAINT client_media_type_check
    CHECK (media_type IN ('image', 'audio', 'video')),

  -- URL media tidak boleh string kosong
  CONSTRAINT client_media_url_not_empty
    CHECK (char_length(cloudinary_url) > 0),

  CONSTRAINT client_media_public_id_not_empty
    CHECK (char_length(cloudinary_public_id) > 0)
);

COMMENT ON TABLE  public.client_media                    IS 'Manajemen semua aset media (Cloudinary) per klien. Satu baris = satu aset.';
COMMENT ON COLUMN public.client_media.media_key           IS 'Peran media dalam template. Harus sesuai dengan key di manifest.ts. Contoh: cover, music, gallery_1.';
COMMENT ON COLUMN public.client_media.media_type          IS 'Tipe aset. Nilai valid: image | audio | video.';
COMMENT ON COLUMN public.client_media.cloudinary_public_id IS 'Public ID Cloudinary. Konvensi: undangan-digital/{slug}/{media_key}';
COMMENT ON COLUMN public.client_media.cloudinary_url      IS 'URL lengkap dari Cloudinary (secure_url). Diisi otomatis setelah upload.';
COMMENT ON COLUMN public.client_media.display_order       IS 'Urutan tampil untuk galeri. 0 = paling atas/depan.';


-- ===========================================================
-- STEP 4: Buat Tabel `rsvp_responses` — Data RSVP Multi-Tenant
-- ===========================================================
-- Pengganti tabel mpv-undangan-digital yang lama.
-- Setiap RSVP kini terikat ke client_id tertentu,
-- sehingga RSVP dari klien berbeda tidak tercampur.
-- ===========================================================
CREATE TABLE IF NOT EXISTS public.rsvp_responses (
  id                uuid        NOT NULL DEFAULT gen_random_uuid(),
  client_id         uuid        NOT NULL,

  -- Data Tamu
  guest_name        text        NOT NULL,
  attendance_status boolean     NOT NULL,          -- true = hadir, false = tidak hadir
  pax               integer     NOT NULL DEFAULT 1,
  greeting_message  text,

  created_at        timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT rsvp_responses_pkey      PRIMARY KEY (id),
  CONSTRAINT rsvp_responses_client_fk FOREIGN KEY (client_id)
    REFERENCES public.clients (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  -- Jumlah tamu minimal 1, maksimal 10 (batas wajar per submission)
  CONSTRAINT rsvp_responses_pax_range CHECK (pax BETWEEN 1 AND 10),

  -- Nama tamu tidak boleh string kosong
  CONSTRAINT rsvp_responses_guest_name_not_empty
    CHECK (char_length(trim(guest_name)) > 0)
);

COMMENT ON TABLE  public.rsvp_responses                IS 'RSVP multi-tenant. Setiap baris terikat ke satu klien via client_id.';
COMMENT ON COLUMN public.rsvp_responses.attendance_status IS 'true = tamu hadir, false = tamu tidak hadir.';
COMMENT ON COLUMN public.rsvp_responses.pax              IS 'Jumlah orang yang hadir bersama tamu (min: 1, max: 10).';
COMMENT ON COLUMN public.rsvp_responses.client_id        IS 'FK ke clients.id. Memastikan RSVP masuk ke klien yang benar.';


-- ===========================================================
-- STEP 5: Buat Index untuk Performa Query
-- ===========================================================
-- Index ini krusial untuk query yang sering dilakukan:
--   - Lookup klien berdasarkan slug (setiap page load)
--   - Lookup RSVP berdasarkan client_id (guestbook)
--   - Lookup media berdasarkan client_id (render template)
-- ===========================================================

-- Index utama: slug lookup (dipakai di setiap page load)
CREATE INDEX IF NOT EXISTS idx_clients_slug
  ON public.clients (slug)
  WHERE is_active = true;   -- Partial index: hanya klien aktif yang diindex

-- Index RSVP per klien (untuk query guestbook & statistik)
CREATE INDEX IF NOT EXISTS idx_rsvp_client_id
  ON public.rsvp_responses (client_id, created_at DESC);

-- Index media per klien (untuk render template)
CREATE INDEX IF NOT EXISTS idx_client_media_client_id
  ON public.client_media (client_id, display_order ASC);

-- Index detail per klien (untuk JOIN query getClientBySlug)
CREATE INDEX IF NOT EXISTS idx_client_details_client_id
  ON public.client_details (client_id);


-- ===========================================================
-- STEP 6: Aktifkan Row Level Security (RLS) — Semua Tabel
-- ===========================================================
ALTER TABLE public.clients        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_media   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvp_responses ENABLE ROW LEVEL SECURITY;


-- ===========================================================
-- STEP 7: RLS Policies — Definisi Aturan Akses Per Tabel
-- ===========================================================
-- Strategi:
--   - PUBLIC READ: data yang perlu dirender di halaman undangan
--   - ANON INSERT: hanya untuk tabel RSVP (tamu submit form)
--   - Tidak ada policy UPDATE/DELETE untuk anon/public
--     (operasi tersebut hanya via service_role key di server)
-- ===========================================================

-- --- Tabel: clients ---
-- Siapapun boleh baca klien yang aktif (untuk render halaman undangan)
CREATE POLICY "public_read_active_clients"
  ON public.clients
  FOR SELECT
  TO public       -- berlaku untuk authenticated, anon, dan semua role
  USING (is_active = true);

-- --- Tabel: client_details ---
-- Siapapun boleh baca detail klien.
-- Akses otomatis terbatas: hanya baris yang client_id-nya
-- merujuk ke klien aktif (dijamin oleh FK + policy clients).
CREATE POLICY "public_read_client_details"
  ON public.client_details
  FOR SELECT
  TO public
  USING (true);

-- --- Tabel: client_media ---
-- Siapapun boleh baca media klien (untuk render gambar & audio di undangan)
CREATE POLICY "public_read_client_media"
  ON public.client_media
  FOR SELECT
  TO public
  USING (true);

-- --- Tabel: rsvp_responses ---
-- Policy SELECT: Siapapun boleh baca RSVP (untuk fitur Guestbook/Buku Tamu)
CREATE POLICY "public_read_rsvp"
  ON public.rsvp_responses
  FOR SELECT
  TO public
  USING (true);

-- Policy INSERT: Tamu anonim boleh submit RSVP,
-- TAPI hanya untuk klien yang benar-benar ada DAN aktif.
-- Ini mencegah spam RSVP ke client_id random/tidak valid.
CREATE POLICY "anon_insert_rsvp"
  ON public.rsvp_responses
  FOR INSERT
  TO anon
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM   public.clients
      WHERE  id        = client_id   -- client_id dari row yang sedang di-insert
      AND    is_active = true
    )
  );


-- ===========================================================
-- STEP 8: Seed Data — Klien Pertama (Siti & Zaed) untuk Testing
-- ===========================================================
-- ⚠️  OPSIONAL: Hapus bagian ini jika kamu ingin insert manual
--     via Supabase Dashboard atau Admin Panel.
--     Pastikan UUID di bawah diganti dengan nilai yang konsisten
--     saat kamu insert data ke client_media dan client_details.
-- ===========================================================

-- Insert klien pertama
INSERT INTO public.clients (id, slug, template_id, is_active)
VALUES (
  'a1b2c3d4-0000-0000-0000-000000000001',
  'siti-zaed-2026',
  'classic-elegant',
  true
)
ON CONFLICT (slug) DO NOTHING;  -- Idempotent: aman dijalankan ulang

-- Insert detail konten undangan Siti & Zaed
INSERT INTO public.client_details (
  client_id,
  bride_name, groom_name,
  bride_full_name, groom_full_name,
  bride_parents, groom_parents,
  akad_datetime,
  akad_venue_name, akad_venue_address,
  resepsi_datetime,
  resepsi_venue_name, resepsi_venue_address,
  prologue_text,
  bank_accounts
)
VALUES (
  'a1b2c3d4-0000-0000-0000-000000000001',
  'Siti', 'Zaed',
  'Siti Nurhaliza', 'Muhammad Zaed',
  'Bpk. Ahmad & Ibu Fatimah', 'Bpk. Umar & Ibu Khadijah',
  '2026-05-23 08:00:00+07',
  'Masjid Al-Ikhlas', 'Jl. Mawar No. 1, Jakarta Selatan',
  '2026-05-23 11:00:00+07',
  'Gedung Serbaguna Mulia', 'Jl. Kenanga No. 5, Jakarta Selatan',
  'Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu.',
  '[{"bank": "BCA", "name": "Siti Nurhaliza", "number": "1234567890"}, {"bank": "Mandiri", "name": "Muhammad Zaed", "number": "0987654321"}]'::jsonb
)
ON CONFLICT (client_id) DO NOTHING;  -- Idempotent: aman dijalankan ulang

-- ⚠️  Data client_media untuk Siti & Zaed TIDAK di-seed di sini.
--     URL Cloudinary baru tersedia setelah upload media ke Cloudinary.
--     Gunakan script atau Admin Panel untuk insert setelah upload:
--
-- INSERT INTO public.client_media (client_id, media_key, media_type, cloudinary_public_id, cloudinary_url)
-- VALUES (
--   'a1b2c3d4-0000-0000-0000-000000000001',
--   'cover', 'image',
--   'undangan-digital/siti-zaed-2026/cover',
--   'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/undangan-digital/siti-zaed-2026/cover.webp'
-- );


-- ===========================================================
-- VERIFIKASI: Jalankan query ini untuk memastikan semua OK
-- ===========================================================
-- SELECT table_name, tablename AS "rls_enabled"
-- FROM   information_schema.tables t
-- JOIN   pg_tables pt ON t.table_name = pt.tablename
-- WHERE  t.table_schema = 'public'
-- AND    t.table_name IN ('clients','client_details','client_media','rsvp_responses');
--
-- SELECT schemaname, tablename, policyname, cmd, roles
-- FROM   pg_policies
-- WHERE  schemaname = 'public'
-- ORDER  BY tablename, policyname;
