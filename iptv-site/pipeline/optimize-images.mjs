// node pipeline/optimize-images.mjs
// Re-encodes the published copies in public/images (never the source folder) as smaller WebP:
// max 1600px wide, quality ~66 (78 for images with transparency). Files are replaced only when >=5% smaller.
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { pathToFileURL } from 'url';

sharp.cache(false);

const dir = path.resolve(import.meta.dirname, '..', 'public', 'images');
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);

// OneDrive or a running dev server can hold a file for a moment; retry a few times before giving up on it.
async function writeWithRetry(f, buf, tries = 6) {
  for (let i = 0; i < tries; i++) {
    try { fs.writeFileSync(f, buf); return true; } catch { await new Promise(r => setTimeout(r, 350)); }
  }
  return false;
}

export async function optimizeAll() {
  const files = walk(dir).filter(f => /\.webp$/i.test(f));
  let before = 0, after = 0, changed = 0, locked = 0;
  let i = 0;
  for (const f of files) {
    if (++i % 100 === 0) console.log(`  ...${i}/${files.length}`);
    const orig = fs.statSync(f).size;
    before += orig;
    if (orig < 8 * 1024) { after += orig; continue; }
    try {
      const img = sharp(fs.readFileSync(f), { failOn: 'none' }); // read via Buffer: avoids Windows file locks (EBUSY)
      const meta = await img.metadata();
      const pipeline = meta.width > 1600 ? img.resize({ width: 1600, withoutEnlargement: true }) : img;
      const buf = await pipeline.webp({ quality: meta.hasAlpha ? 78 : 66, alphaQuality: 80, effort: 5, smartSubsample: true }).toBuffer();
      if (buf.length < orig * 0.95) {
        if (await writeWithRetry(f, buf)) { after += buf.length; changed++; } else { after += orig; locked++; }
      } else after += orig;
    } catch { after += orig; }
  }
  const mb = n => (n / 1048576).toFixed(1) + ' MB';
  console.log(`optimize-images: ${files.length} files, ${changed} re-encoded, ${mb(before)} -> ${mb(after)} (-${Math.round((1 - after / before) * 100)}%)${locked ? `, ${locked} files were locked and skipped` : ""}`);
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) await optimizeAll();
