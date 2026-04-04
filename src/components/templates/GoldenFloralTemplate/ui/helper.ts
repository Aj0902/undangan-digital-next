const getMedia = (mediaArray, type) => 
  mediaArray?.find(m => m.media_type === type)?.media_url || 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80';
// ✂️ ========================================================
// 📂 FILE TUJUAN: utils/helpers.ts (atau letakkan di luar komponen)
// ⚠️ KETERANGAN: Helper untuk mengambil URL media dari array
// ========================================================
