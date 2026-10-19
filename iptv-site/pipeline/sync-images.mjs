// node pipeline/sync-images.mjs
// Copies the curated images listed in src/data/image-manifest.json from ../public/images into public/images,
// creates -w400 / -w800 variants when missing, and writes src/data/images.json (key -> {src,w,h,variants,alt}).
// Also generates 1200x630 Open Graph JPEGs per market into public/og/.
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const srcDir = path.resolve(root, '..', 'public', 'images');
const outDir = path.join(root, 'public', 'images');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'src', 'data', 'image-manifest.json'), 'utf8'));
fs.mkdirSync(outDir, { recursive: true });
// every source image is also published under its original path (public/images/<folder>/<file>)
fs.cpSync(srcDir, outDir, { recursive: true });

const result = {};
let copied = 0, generated = 0, bytes = 0;
for (const [key, m] of Object.entries(manifest)) {
  if (key.startsWith('_')) continue;
  const from = path.join(srcDir, m.file);
  if (!fs.existsSync(from)) { console.warn('MISSING', m.file); continue; }
  const dest = m.dest || m.file.split('/').pop();
  const base = dest.replace(/\.webp$/i, '');
  const to = path.join(outDir, dest);
  fs.copyFileSync(from, to); copied++;
  const meta = await sharp(from).metadata();
  const variants = [];
  for (const w of [400, 800]) {
    if (meta.width <= w) continue;
    const vp = path.join(outDir, `${base}-w${w}.webp`);
    const sibling = from.replace(/\.webp$/i, `-w${w}.webp`);
    if (fs.existsSync(sibling)) fs.copyFileSync(sibling, vp);
    else { await sharp(from).resize({ width: w }).webp({ quality: 78 }).toFile(vp); generated++; }
    variants.push(w);
  }
  bytes += fs.statSync(to).size;
  result[key] = { src: `/images/${dest}`, base: `/images/${base}`, w: meta.width, h: meta.height, variants, alt: m.alt, ...(m.fit ? { fit: m.fit } : {}) };
}
fs.writeFileSync(path.join(root, 'src', 'data', 'images.json'), JSON.stringify(result, null, 1));

// Open Graph images: crop the base image to 1200x630 and add a brand strip
const SITES = { us: ['StreamB4', '24-hour free trial · IPTV setup guides'], au: ['StreamB4', '24-hour free trial · IPTV setup guides'], de: ['StreamB4', '24-Stunden-Gratis-Test · IPTV-Ratgeber'] };
const ogBase = path.join(srcDir, manifest['og-base'].file);
fs.mkdirSync(path.join(root, 'public', 'og'), { recursive: true });
for (const [m, [name, tag]] of Object.entries(SITES)) {
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0.45" stop-color="#050b09" stop-opacity="0"/><stop offset="1" stop-color="#050b09" stop-opacity="0.92"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/><text x="60" y="520" font-family="Arial,Helvetica,sans-serif" font-size="76" font-weight="800" fill="#ffffff">${name}</text><text x="60" y="575" font-family="Arial,Helvetica,sans-serif" font-size="34" font-weight="600" fill="#34d399">${tag}</text></svg>`;
  await sharp(ogBase).resize(1200, 630, { fit: 'cover' }).composite([{ input: Buffer.from(svg) }]).jpeg({ quality: 82 }).toFile(path.join(root, 'public', 'og', `og-${m}.jpg`));
}
console.log(`images: ${Object.keys(result).length} keys, ${copied} copied, ${generated} variants generated, originals ${(bytes / 1048576).toFixed(1)} MB`);

// keep the published copies small (WebP re-encode, max 1600px)
const { optimizeAll } = await import('./optimize-images.mjs');
await optimizeAll();
