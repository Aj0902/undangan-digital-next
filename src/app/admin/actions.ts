"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadToCloudinary } from "@/lib/cloudinary";

import type { ClientFormValues } from "@/lib/validations/client";

export async function createClientAction(data: ClientFormValues) {
  const supabase = await createClient();

  try {
    // 0. Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Anda harus login terlebih dahulu.");

    // Fetch preset JSON if dynamic template is selected
    let customConfig = null;
    if (data.template_type === "dinamis" && data.template_id) {
      const { data: preset } = await supabase
        .from("presets")
        .select("json_config")
        .eq("id", data.template_id)
        .single();

      if (preset) {
        customConfig = preset.json_config;
      }
    }

    // 1. Insert into 'clients' table
    const { data: newClient, error: clientError } = await supabase
      .from("clients")
      .insert([
        {
          slug: data.slug,
          template_id: data.template_id,
          template_type: data.template_type,
          is_active: data.is_active,
          custom_config: customConfig,
        },
      ])
      .select()
      .single();

    if (clientError) throw clientError;

    // 2. Insert into 'client_details' table
    const { error: detailsError } = await supabase
      .from("client_details")
      .insert([
        {
          client_id: newClient.id,
          bride_name: data.bride_name,
          groom_name: data.groom_name,
          bride_full_name: data.bride_full_name || null,
          groom_full_name: data.groom_full_name || null,
          bride_parents: data.bride_parents || null,
          groom_parents: data.groom_parents || null,
          akad_datetime: data.akad_datetime || null,
          akad_venue_name: data.akad_venue_name || null,
          akad_venue_address: data.akad_venue_address || null,
          resepsi_datetime: data.resepsi_datetime || null,
          resepsi_venue_name: data.resepsi_venue_name || null,
          resepsi_venue_address: data.resepsi_venue_address || null,
          prologue_text: data.prologue_text || null,
          bank_accounts: data.bank_accounts || [],
        },
      ]);

    if (detailsError) throw detailsError;
  } catch (error: any) {
    console.error("Error creating client:", error);
    return { error: error.message || "Gagal membuat klien baru." };
  }

  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteClientAction(clientId: string) {
  const supabase = await createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { error } = await supabase
      .from("clients")
      .delete()
      .match({ id: clientId });

    if (error) throw error;
  } catch (error: any) {
    console.error("Error deleting client:", error);
    return { error: error.message || "Gagal menghapus klien." };
  }

  revalidatePath("/admin");
}

export async function updateClientAction(data: ClientFormValues) {
  const supabase = await createClient();

  if (!data.id) return { error: "Client ID is missing." };

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    // Fetch existing client to check if template changed
    const { data: existingClient } = await supabase
      .from("clients")
      .select("template_id, custom_config")
      .eq("id", data.id)
      .single();

    let customConfig = existingClient?.custom_config;

    if (
      existingClient &&
      data.template_type === "dinamis" &&
      data.template_id &&
      data.template_id !== existingClient.template_id
    ) {
      const { data: preset } = await supabase
        .from("presets")
        .select("json_config")
        .eq("id", data.template_id)
        .single();

      if (preset) {
        customConfig = preset.json_config;
      }
    }

    const { error: clientError } = await supabase
      .from("clients")
      .update({
        slug: data.slug,
        template_id: data.template_id,
        template_type: data.template_type,
        is_active: data.is_active,
        custom_config: customConfig,
      })
      .eq("id", data.id);

    if (clientError) throw clientError;

    const { error: detailsError } = await supabase
      .from("client_details")
      .update({
        bride_name: data.bride_name,
        groom_name: data.groom_name,
        bride_full_name: data.bride_full_name || null,
        groom_full_name: data.groom_full_name || null,
        bride_parents: data.bride_parents || null,
        groom_parents: data.groom_parents || null,
        akad_datetime: data.akad_datetime || null,
        akad_venue_name: data.akad_venue_name || null,
        akad_venue_address: data.akad_venue_address || null,
        resepsi_datetime: data.resepsi_datetime || null,
        resepsi_venue_name: data.resepsi_venue_name || null,
        resepsi_venue_address: data.resepsi_venue_address || null,
        prologue_text: data.prologue_text || null,
        bank_accounts: data.bank_accounts || [],
      })
      .eq("client_id", data.id);

    if (detailsError) throw detailsError;
  } catch (error: any) {
    console.error("Error updating client:", error);
    return { error: error.message || "Gagal memperbarui klien." };
  }

  revalidatePath(`/admin/klien/${data.id}`);
  revalidatePath("/admin");
}

// ✅ MIME types dan file size limits untuk validasi
const ALLOWED_MIME_TYPES: Record<string, string[]> = {
  audio: ["audio/mpeg", "audio/wav", "audio/mp4", "audio/x-m4a"], // MP3, WAV, M4A
  image: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  video: ["video/mp4", "video/webm", "video/quicktime"],
};

const MAX_FILE_SIZES: Record<string, number> = {
  audio: 10 * 1024 * 1024, // 10MB untuk audio
  image: 20 * 1024 * 1024, // 20MB untuk gambar
  video: 100 * 1024 * 1024, // 100MB untuk video
};

const MAX_AUDIO_DURATION_SECONDS = 300; // 5 menit

/**
 * Validasi MIME type file berdasarkan media type
 */
function validateMimeType(file: File, mediaType: string): string | null {
  const allowedTypes = ALLOWED_MIME_TYPES[mediaType];
  if (!allowedTypes) {
    return `Tipe media '${mediaType}' tidak didukung.`;
  }

  if (!allowedTypes.includes(file.type)) {
    if (mediaType === "audio") {
      return `Format audio tidak didukung. Gunakan MP3, WAV, atau M4A. (Terdeteksi: ${file.type || "unknown"})`;
    }
    return `Format file tidak didukung. (${file.type || "unknown"})`;
  }

  return null;
}

/**
 * Validasi file size
 */
function validateFileSize(file: File, mediaType: string): string | null {
  const maxSize = MAX_FILE_SIZES[mediaType];
  if (!maxSize) return null;

  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(0);
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
    return `Ukuran file terlalu besar. Maksimal ${maxSizeMB}MB, tapi file Anda ${fileSizeMB}MB.`;
  }

  return null;
}

/**
 * Validasi durasi audio menggunakan Web Audio API
 */
async function getAudioDuration(fileBuffer: Buffer): Promise<number> {
  // Untuk keperluan server-side, kita bisa menggunakan file metadata parsing
  // Sebagai alternatif sederhana, kita asumsikan bitrate dan hitung durasi
  // Cara lebih akurat bisa menggunakan library seperti 'music-metadata'
  // Untuk saat ini, kami pass dan biarkan validasi di Cloudinary
  return 0; // Placeholder
}

export async function uploadMediaAction(formData: FormData) {
  const supabase = await createClient();

  const clientId = formData.get("client_id") as string;
  const mediaKey = formData.get("media_key") as string;
  const mediaType = (formData.get("media_type") as string) || "image";
  const file = formData.get("file") as File;

  // ✅ Validasi file ada
  if (!file || file.size === 0) {
    return { error: "File tidak ditemukan atau kosong." };
  }

  // ✅ Validasi MIME type
  const mimeError = validateMimeType(file, mediaType);
  if (mimeError) {
    return { error: mimeError };
  }

  // ✅ Validasi file size
  const sizeError = validateFileSize(file, mediaType);
  if (sizeError) {
    return { error: sizeError };
  }

  try {
    // 1. Get client slug
    const { data: client, error: clientError } = await supabase
      .from("clients")
      .select("slug")
      .eq("id", clientId)
      .single();

    if (clientError || !client) throw new Error("Klien tidak ditemukan.");

    // 2. Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 3. Map mediaType to Cloudinary resource_type
    let resourceType: "image" | "video" | "raw" = "image";
    if (mediaType === "audio") {
      resourceType = "raw"; // ✅ Audio harus 'raw' di Cloudinary
    } else if (mediaType === "video") {
      resourceType = "video";
    }

    // 4. Upload to Cloudinary
    const result = await uploadToCloudinary(
      buffer,
      client.slug,
      mediaKey,
      resourceType,
    );

    // 5. Save to client_media (Upsert)
    const { error: mediaError } = await supabase.from("client_media").upsert(
      {
        client_id: clientId,
        media_key: mediaKey,
        media_type: mediaType as any,
        cloudinary_public_id: result.public_id,
        cloudinary_url: result.secure_url,
        display_order: 0,
      },
      { onConflict: "client_id, media_key" },
    );

    if (mediaError) throw mediaError;

    revalidatePath(`/admin/klien/${clientId}`);
    return { success: true, url: result.secure_url };
  } catch (error: any) {
    console.error("Upload error:", error);
    // ✅ Better error messages untuk user
    const errorMessage = error.message || "Gagal mengupload media.";
    console.error("[uploadMediaAction] Error details:", {
      clientId,
      mediaKey,
      mediaType,
      fileName: file.name,
      fileSize: file.size,
      error: errorMessage,
    });
    return { error: errorMessage };
  }
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/admin/login");
}
