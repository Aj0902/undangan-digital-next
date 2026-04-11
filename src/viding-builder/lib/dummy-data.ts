import { Client } from "@/types/client";

/**
 * Data Dummy untuk "Pabrik Preset" (Preset Builder).
 * Digunakan agar desainer bisa melihat visual asli saat merancang template master.
 */
export const DUMMY_CLIENT_DATA: Partial<Client> = {
  id: "00000000-0000-0000-0000-000000000000",
  slug: "dummy-preset",
  template_id: "preset-master",
  template_type: "dinamis",
  client_details: {
    id: "00000000-0000-0000-0000-000000000001",
    client_id: "00000000-0000-0000-0000-000000000000",
    bride_name: "Juliet",
    bride_full_name: "Juliet Capulet",
    bride_parents: "Bpk. Capulet & Ibu Capulet",
    groom_name: "Romeo",
    groom_full_name: "Romeo Montague",
    groom_parents: "Bpk. Montague & Ibu Montague",
    akad_datetime: "2030-01-01T09:00:00Z",
    akad_venue_name: "Verona Garden",
    akad_venue_address: "Jl. Cinta Abadi No. 1, Verona",
    resepsi_datetime: "2030-01-01T11:00:00Z",
    resepsi_venue_name: "Verona Garden Hall",
    resepsi_venue_address: "Jl. Cinta Abadi No. 1, Verona",
    prologue_text: "Assalamu'alaikum Warahmatullahi Wabarakatuh. Maha Suci Allah yang telah menciptakan mahluk-Nya berpasang-pasangan.",
    bank_accounts: [
      { bank: "Bank Cinta", name: "Romeo & Juliet", number: "1234567890" }
    ],
    created_at: new Date().toISOString(),
  },
  client_media: [
    {
      id: "media-1",
      client_id: "00000000-0000-0000-0000-000000000000",
      media_key: "bride_photo",
      cloudinary_url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      cloudinary_public_id: "dummy-1",
      media_type: "image",
      alt_text: "Bride",
      display_order: 1,
      created_at: new Date().toISOString(),
    },
    {
      id: "media-2",
      client_id: "00000000-0000-0000-0000-000000000000",
      media_key: "groom_photo",
      cloudinary_url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
      cloudinary_public_id: "dummy-2",
      media_type: "image",
      alt_text: "Groom",
      display_order: 2,
      created_at: new Date().toISOString(),
    },
    {
      id: "media-3",
      client_id: "00000000-0000-0000-0000-000000000000",
      media_key: "gallery_1",
      cloudinary_url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800",
      cloudinary_public_id: "dummy-3",
      media_type: "image",
      alt_text: "Gallery 1",
      display_order: 3,
      created_at: new Date().toISOString(),
    },
    {
        id: "media-4",
        client_id: "00000000-0000-0000-0000-000000000000",
        media_key: "gallery_2",
        cloudinary_url: "https://images.unsplash.com/photo-1519225495042-ef9e033c45a1?w=800",
        cloudinary_public_id: "dummy-4",
        media_type: "image",
        alt_text: "Gallery 2",
        display_order: 4,
        created_at: new Date().toISOString(),
    }
  ]
};
