/**
 * @file src/types/client.ts
 * @description TypeScript interfaces yang secara akurat merepresentasikan
 *              skema database Supabase v2 (Multi-Tenant SaaS).
 *
 * Hierarki relasi:
 *   Client (clients)
 *     ├── ClientDetails   (client_details) — relasi 1:1
 *     └── ClientMedia[]   (client_media)   — relasi 1:many
 *
 * PENTING: Tipe di file ini harus selalu sinkron dengan SQL schema.
 * Jika ada perubahan kolom di Supabase, update file ini juga.
 */

// ============================================================
// Tipe Dasar & Enum
// ============================================================

/** Tipe media yang diizinkan. Harus sinkron dengan CHECK constraint di SQL. */
export type MediaType = 'image' | 'audio' | 'video';

// ============================================================
// Interface: BankAccount (untuk kolom JSONB `bank_accounts`)
// ============================================================

/**
 * Satu entri rekening hadiah.
 * Disimpan sebagai elemen dalam array JSONB di kolom `client_details.bank_accounts`.
 *
 * @example
 * { bank: "BCA", name: "Siti Nurhaliza", number: "1234567890" }
 */
export interface BankAccount {
  /** Nama bank. Contoh: "BCA", "Mandiri", "BNI". */
  bank: string;
  /** Nama pemilik rekening (sesuai buku tabungan). */
  name: string;
  /** Nomor rekening (disimpan sebagai string untuk menjaga leading zero). */
  number: string;
}

// ============================================================
// Interface: ClientDetails (tabel `client_details`)
// ============================================================

/**
 * Merepresentasikan satu baris di tabel `public.client_details`.
 * Berisi semua konten teks undangan yang dulu hardcoded di komponen.
 *
 * ⚠️  Tidak ada URL gambar atau audio di interface ini.
 *     Semua media dikelola via {@link ClientMedia}.
 */
export interface ClientDetails {
  /** Primary key dari tabel client_details (UUID). */
  id: string;
  /** Foreign key ke tabel clients (UUID). */
  client_id: string;

  // --- Data Pasangan ---
  /** Nama panggilan mempelai wanita. Contoh: "Siti". */
  bride_name: string;
  /** Nama panggilan mempelai pria. Contoh: "Zaed". */
  groom_name: string;
  /** Nama lengkap mempelai wanita. Null jika belum diisi. */
  bride_full_name: string | null;
  /** Nama lengkap mempelai pria. Null jika belum diisi. */
  groom_full_name: string | null;
  /** Nama orang tua mempelai wanita. Contoh: "Bpk. Ahmad & Ibu Fatimah". */
  bride_parents: string | null;
  /** Nama orang tua mempelai pria. Contoh: "Bpk. Umar & Ibu Khadijah". */
  groom_parents: string | null;

  // --- Data Acara Akad Nikah ---
  /** Waktu akad nikah dalam format ISO 8601 (timestamptz). Null jika belum diisi. */
  akad_datetime: string | null;
  /** Nama venue akad nikah. Null jika belum diisi. */
  akad_venue_name: string | null;
  /** Alamat lengkap venue akad nikah. Null jika belum diisi. */
  akad_venue_address: string | null;

  // --- Data Acara Resepsi ---
  /** Waktu resepsi dalam format ISO 8601 (timestamptz). Null jika belum diisi. */
  resepsi_datetime: string | null;
  /** Nama venue resepsi. Null jika belum diisi. */
  resepsi_venue_name: string | null;
  /** Alamat lengkap venue resepsi. Null jika belum diisi. */
  resepsi_venue_address: string | null;

  // --- Konten Teks ---
  /** Teks pembuka / prolog undangan. Null jika belum diisi. */
  prologue_text: string | null;

  // --- Rekening Hadiah ---
  /**
   * Array rekening hadiah.
   * Disimpan sebagai JSONB di database, dikembalikan sebagai array object.
   * Array kosong `[]` jika tidak ada rekening yang diisi.
   */
  bank_accounts: BankAccount[];

  /** Timestamp pembuatan baris (ISO 8601). */
  created_at: string;
}

// ============================================================
// Interface: ClientMedia (tabel `client_media`)
// ============================================================

/**
 * Merepresentasikan satu baris di tabel `public.client_media`.
 * Setiap baris = satu aset media dari Cloudinary yang dikaitkan ke satu klien.
 *
 * Desain tabel ini memungkinkan tiap template punya kebutuhan media berbeda
 * tanpa menambah kolom baru di `client_details`.
 *
 * @example
 * Untuk template 'classic-elegant', nilai media_key yang umum:
 *   'cover'     → Foto cover utama
 *   'music'     → File audio musik latar
 *   'gallery_1' → Foto galeri ke-1
 *   'gallery_2' → Foto galeri ke-2
 */
export interface ClientMedia {
  /** Primary key dari tabel client_media (UUID). */
  id: string;
  /** Foreign key ke tabel clients (UUID). */
  client_id: string;

  /**
   * "Nama peran" media dalam template.
   * Harus cocok dengan `key` yang didefinisikan di `manifest.ts` template.
   * Contoh: 'cover', 'music', 'gallery_1', 'gallery_2', 'bg_video'.
   * Kombinasi (client_id + media_key) bersifat UNIQUE di database.
   */
  media_key: string;

  /**
   * Tipe aset media.
   * Dikunci ke union type, sinkron dengan CHECK constraint di SQL.
   */
  media_type: MediaType;

  /**
   * Public ID Cloudinary.
   * Konvensi penamaan: `undangan-digital/{slug}/{media_key}`.
   * Contoh: `undangan-digital/siti-zaed-2026/cover`.
   */
  cloudinary_public_id: string;

  /**
   * URL lengkap aset dari Cloudinary (secure_url).
   * Ini yang langsung dipakai sebagai `src` di tag `<img>` atau `<audio>`.
   * Contoh: `https://res.cloudinary.com/mycloud/image/upload/v1234/undangan-digital/siti-zaed-2026/cover.webp`.
   */
  cloudinary_url: string;

  /** Deskripsi gambar untuk aksesibilitas (alt text) dan SEO. Null jika tidak diisi. */
  alt_text: string | null;

  /** Urutan tampil untuk koleksi seperti galeri foto. 0 = paling atas/depan. */
  display_order: number;

  /** Timestamp pembuatan baris (ISO 8601). */
  created_at: string;
}

// ============================================================
// Interface: Client (tabel `clients` + joined data)
// ============================================================

/**
 * Merepresentasikan satu baris di tabel `public.clients`,
 * dilengkapi dengan data join dari `client_details` dan `client_media`.
 *
 * Ini adalah tipe yang dikembalikan oleh `getClientBySlug()`.
 * Digunakan sebagai prop utama di komponen template.
 *
 * Query Supabase yang menghasilkan tipe ini:
 * ```typescript
 * supabase.from('clients').select('*, client_details(*), client_media(*)')
 * ```
 */
export interface Client {
  /** Primary key dari tabel clients (UUID). */
  id: string;

  /**
   * URL slug unik klien.
   * Digunakan di routing: `undanganku.com/{slug}`.
   * Format: lowercase, hanya huruf/angka dan tanda hubung.
   * Contoh: `siti-zaed-2026`.
   */
  slug: string;

  /**
   * ID template desain yang dipakai.
   * Harus cocok dengan `TEMPLATE_ID` di file `manifest.ts` template.
   * Contoh: `'classic-elegant'`, `'modern-minimal'`.
   */
  template_id: string;

  /**
   * Status aktif klien.
   * `true` → undangan tampil normal.
   * `false` → halaman 404 (kill-switch per klien).
   */
  is_active: boolean;

  /**
   * Tipe template yang digunakan.
   * 'statis' -> Template lawas di folder static-legacy.
   * 'dinamis' -> Template Viding V3 yang di-render via Master Shell.
   */
  template_type: 'statis' | 'dinamis';

  /**
   * Konfigurasi desain spesifik untuk klien ini (JSON JSONB dari Supabase).
   * Hanya berisi data desain (Warna, Posisi Ornamen), bukan data konten.
   */
  custom_config: any | null;

  /** Timestamp pembuatan baris (ISO 8601). */
  created_at: string;

  /**
   * Data detail konten undangan (JOIN dari tabel client_details).
   * Relasi 1:1 — selalu ada satu objek, bukan array.
   *
   * ⚠️  Supabase mengembalikan ini sebagai object tunggal karena JOIN
   *     dengan UNIQUE constraint pada client_id.
   */
  client_details: ClientDetails;

  /**
   * Array semua aset media milik klien ini (JOIN dari tabel client_media).
   * Gunakan helper {@link getMedia} untuk mengambil URL berdasarkan key.
   *
   * Array kosong `[]` jika klien belum punya media yang diupload.
   */
  client_media: ClientMedia[];
}

// ============================================================
// Interface: RsvpResponse (tabel `rsvp_responses`)
// ============================================================

/**
 * Merepresentasikan satu baris di tabel `public.rsvp_responses`.
 * Digunakan untuk menampilkan data di Guestbook/Buku Tamu.
 */
export interface RsvpResponse {
  /** Primary key dari tabel rsvp_responses (UUID). */
  id: string;
  /** Foreign key ke tabel clients (UUID). Mengikat RSVP ke klien yang spesifik. */
  client_id: string;

  /** Nama tamu yang mengisi RSVP. */
  guest_name: string;
  /** true = tamu hadir, false = tamu tidak hadir. */
  attendance_status: boolean;
  /** Jumlah orang yang hadir bersama tamu. Min: 1, Max: 10. */
  pax: number;
  /** Pesan ucapan dari tamu. Null jika tidak diisi. */
  greeting_message: string | null;

  /** Timestamp pengiriman RSVP (ISO 8601). */
  created_at: string;
}

/**
 * Tipe data untuk payload `INSERT` ke tabel `rsvp_responses`.
 * Omit field yang di-generate otomatis oleh database (id, created_at).
 */
export type NewRsvpResponse = Omit<RsvpResponse, 'id' | 'created_at'>;

// ============================================================
// Utility Functions
// ============================================================

/**
 * Ambil Cloudinary URL dari array `client_media` berdasarkan `media_key`.
 *
 * @param mediaList - Array `ClientMedia` dari data klien (`client.client_media`)
 * @param key - `media_key` yang dicari. Contoh: `'cover'`, `'music'`, `'gallery_1'`
 * @returns URL string Cloudinary jika ditemukan, atau `null` jika belum diupload.
 *
 * @example
 * const coverUrl = getMedia(client.client_media, 'cover');
 * // → 'https://res.cloudinary.com/...' atau null
 *
 * // Dipakai di komponen template:
 * <img src={coverUrl ?? '/placeholder.jpg'} alt="Cover" />
 */
export function getMedia(mediaList: ClientMedia[], key: string): string | null {
  return mediaList.find((m) => m.media_key === key)?.cloudinary_url ?? null;
}

/**
 * Ambil seluruh objek `ClientMedia` berdasarkan `media_key`.
 * Berguna jika kamu perlu mengakses `alt_text` atau `cloudinary_public_id`
 * selain hanya URL-nya.
 *
 * @param mediaList - Array `ClientMedia` dari data klien
 * @param key - `media_key` yang dicari
 * @returns Objek `ClientMedia` jika ditemukan, atau `undefined`.
 */
export function getMediaItem(
  mediaList: ClientMedia[],
  key: string
): ClientMedia | undefined {
  return mediaList.find((m) => m.media_key === key);
}

/**
 * Filter array `ClientMedia` berdasarkan `media_type`.
 * Berguna untuk mengambil semua foto galeri sekaligus.
 *
 * @param mediaList - Array `ClientMedia` dari data klien
 * @param type - Tipe media yang difilter: `'image'`, `'audio'`, atau `'video'`
 * @returns Array `ClientMedia` yang cocok dengan tipe, diurutkan by `display_order`.
 *
 * @example
 * const galleryImages = getMediaByType(client.client_media, 'image');
 * // Kembalikan semua foto, sudah terurut by display_order
 */
export function getMediaByType(
  mediaList: ClientMedia[],
  type: MediaType
): ClientMedia[] {
  return mediaList
    .filter((m) => m.media_type === type)
    .sort((a, b) => a.display_order - b.display_order);
}
/**
 * Format ISO date string ke format tanggal Indonesia.
 * @param value - Tanggal ISO string
 * @returns Tanggal terformat (contoh: "12 Desember 2026") or "-" jika null.
 */
export function formatDate(value?: string | null): string {
  if (!value) return '-';
  try {
    const date = new Date(value);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    });
  } catch (e) {
    return '-';
  }
}

/**
 * Format ISO date string ke format jam Indonesia (24h).
 * @param value - Tanggal ISO string
 * @returns Jam terformat (contoh: "08:00") or "-" jika null.
 */
export function formatTime(value?: string | null): string {
  if (!value) return '-';
  try {
    const date = new Date(value);
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'UTC',
    }) + ' WIB';
  } catch (e) {
    return '-';
  }
}
