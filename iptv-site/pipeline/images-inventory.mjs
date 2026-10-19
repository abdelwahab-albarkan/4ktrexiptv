// node pipeline/images-inventory.mjs [sourceDir] [outDir]
// Writes images.inventory.json (path, width, height, bytes) and contact sheets (sheet-N.jpg) for visual review.
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const src = path.resolve(process.argv[2] || path.join(import.meta.dirname, '..', '..', 'public', 'images'));
const out = path.resolve(process.argv[3] || path.join(import.meta.dirname, '..', '.scratch'));
fs.mkdirSync(out, { recursive: true });

const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const all = walk(src).filter(f => /\.(webp|png|jpe?g|svg)$/i.test(f));
const isVariant = f => /-(w400|w800|i52|i80|i96)\.webp$/i.test(f);
const inv = [];
for (const f of all) {
  const rel = path.relative(src, f).split(path.sep).join('/');
  let w = 0, h = 0;
  try { const m = await sharp(f).metadata(); w = m.width || 0; h = m.height || 0; } catch {}
  inv.push({ path: rel, w, h, bytes: fs.statSync(f).size, variant: isVariant(f) });
}
fs.writeFileSync(path.join(out, 'images.inventory.json'), JSON.stringify(inv, null, 1));

const base = inv.filter(i => !i.variant && !i.path.endsWith('.svg'));
const COLS = 6, ROWS = 5, T = 300, L = 26;
let sheet = 0;
for (let i = 0; i < base.length; i += COLS * ROWS) {
  const chunk = base.slice(i, i + COLS * ROWS);
  const layers = [];
  for (let k = 0; k < chunk.length; k++) {
    const it = chunk[k];
    const x = (k % COLS) * T, y = Math.floor(k / COLS) * (T * 0.68 + L);
    const buf = await sharp(path.join(src, it.path)).resize(T - 4, Math.round(T * 0.68) - 4, { fit: 'contain', background: '#777' }).flatten({ background: '#777' }).jpeg({ quality: 70 }).toBuffer();
    layers.push({ input: buf, left: x + 2, top: Math.round(y) + 2 });
    const label = `${i + k}: ${it.path.slice(-34)} ${it.w}x${it.h}`.replace(/&/g, '+').replace(/</g, '');
    layers.push({ input: Buffer.from(`<svg width="${T}" height="${L}"><rect width="100%" height="100%" fill="#111"/><text x="4" y="17" font-size="12" fill="#fff" font-family="Arial">${label}</text></svg>`), left: x, top: Math.round(y + T * 0.68) });
  }
  await sharp({ create: { width: COLS * T, height: Math.round(ROWS * (T * 0.68 + L)), channels: 3, background: '#000' } }).composite(layers).jpeg({ quality: 72 }).toFile(path.join(out, `sheet-${sheet++}.jpg`));
}
console.log(`images=${all.length} base=${base.length} sheets=${sheet} -> ${out}`);
