// scripts/make-template.js
const fs = require('fs');
const path = require('path');

// Njupuk argumen soko terminal (misal: npm run make:template RusticBoho)
const templateName = process.argv[2];

if (!templateName) {
  console.error('❌ Error: Masukkan nama template! (Contoh: npm run make:template RusticBoho)');
  process.exit(1);
}

// Ngowahi PascalCase dadi kebab-case nggo ID (RusticBoho -> rustic-boho)
const templateId = templateName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

// Path folder sing arep digawe
const baseDir = path.join(__dirname, '../src/components/templates', templateName);
const sectionsDir = path.join(baseDir, 'sections');
const uiDir = path.join(baseDir, 'ui');
const assetsDir = path.join(__dirname, '../public/assets', templateName, 'images');

// Fungsi nggawe folder
const createDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Dibuat: ${dir}`);
  }
};

// Eksekusi nggawe folder
createDir(sectionsDir);
createDir(uiDir);
createDir(assetsDir);

// Isi kodingan index.tsx
const indexContent = `import type { Client } from '@/types/client';

export default function ${templateName}Template({ data, guestName }: { data: Client, guestName: string }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Ganti dengan komponen Hero milikmu */}
      <section className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-serif">The Wedding Of</h1>
        <h2 className="text-6xl font-serif mt-4">{data.client_details?.groom_name} & {data.client_details?.bride_name}</h2>
        <p className="mt-8 text-lg">Kepada Yth: {guestName}</p>
      </section>
      
      {/* Komponen lain taruh di bawahnya */}
    </div>
  );
}
`;

// Isi kodingan manifest.ts
const manifestContent = `export const TEMPLATE_ID = '${templateId}';

export const MEDIA_MANIFEST = [n
  {
    key: 'hero_image',
    type: 'image' as const,
    label: 'Foto Cover Utama',
    required: true,
  }
] as const;
`;

// Eksekusi nggawe file
fs.writeFileSync(path.join(baseDir, 'index.tsx'), indexContent);
fs.writeFileSync(path.join(baseDir, 'manifest.ts'), manifestContent);

console.log(`\n✅ BERHASIL! Template ${templateName} siap dieksekusi di src/components/templates/${templateName}`);