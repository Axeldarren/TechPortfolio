// Converts public images to WebP (max 1200px wide) and generates the
// 1200x630 Open Graph image. Run with: npm run optimize-images
import sharp from 'sharp';
import { readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');

async function toWebp(file) {
  const out = file.replace(/\.(jpe?g|png)$/i, '.webp');
  const info = await sharp(file)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(out);
  console.log(`${path.relative(root, file)} -> ${path.basename(out)} (${Math.round(info.size / 1024)} KB)`);
}

const top = (await readdir(root)).filter(f => /\.(jpe?g|png)$/i.test(f) && f !== 'weblogo.png');
const projects = (await readdir(path.join(root, 'projects'))).filter(f => /\.(jpe?g|png)$/i.test(f));

await Promise.all([
  ...top.map(f => toWebp(path.join(root, f))),
  ...projects.map(f => toWebp(path.join(root, 'projects', f))),
]);

// Open Graph preview image (1200x630 JPG — WebP isn't reliably supported by link scrapers)
const og = await sharp(path.join(root, 'Axel_photos.jpeg'))
  .resize(1200, 630, { fit: 'cover', position: 'attention' })
  .jpeg({ quality: 85 })
  .toFile(path.join(root, 'og-image.jpg'));
console.log(`og-image.jpg (${Math.round(og.size / 1024)} KB)`);
