import sharp from 'sharp';
import { statSync, writeFileSync, renameSync, unlinkSync } from 'fs';
import { join, resolve } from 'path';

const assetsDir = resolve('./public/assets');

const images = [
  { file: 'foto_hero(site).webp', width: 1200, quality: 80 },
  { file: 'Advogado_1.webp',      width: 800,  quality: 82 },
  { file: 'Advogado_2.webp',      width: 800,  quality: 82 },
  { file: 'DSC04733.webp',        width: 800,  quality: 82 },
  { file: 'DSC04856.webp',        width: 800,  quality: 82 },
  { file: 'DSC04918.webp',        width: 800,  quality: 82 },
  { file: 'DSC05045.webp',        width: 800,  quality: 82 },
  { file: 'DSC04791.webp',        width: 1000, quality: 80 },
  { file: 'DSC04823.webp',        width: 1000, quality: 80 },
  { file: 'DSC04825.webp',        width: 1000, quality: 80 },
];

for (const { file, width, quality } of images) {
  const filePath = join(assetsDir, file);
  const tmpPath = filePath + '.tmp';
  const before = statSync(filePath).size;

  const img = sharp(filePath);
  const meta = await img.metadata();
  const resizeOpts = meta.width > width ? { width } : {};

  // Escreve para arquivo temporário primeiro
  await img
    .resize(resizeOpts)
    .webp({ quality, effort: 6 })
    .toFile(tmpPath);

  const after = statSync(tmpPath).size;

  if (after < before) {
    try { unlinkSync(filePath); } catch {}
    renameSync(tmpPath, filePath);
    const saving = ((before - after) / before * 100).toFixed(1);
    console.log(`✓ ${file}: ${(before/1024).toFixed(0)} KB → ${(after/1024).toFixed(0)} KB (-${saving}%)`);
  } else {
    try { unlinkSync(tmpPath); } catch {}
    console.log(`– ${file}: já otimizada (${(before/1024).toFixed(0)} KB)`);
  }
}

console.log('\nConcluído!');
