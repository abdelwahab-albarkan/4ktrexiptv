import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const root = path.resolve('c:/Users/clanm/OneDrive/Desktop/IPTVAL/iptv-site');
const imagesDir = path.join(root, 'public', 'images');
const imagesJsonPath = path.join(root, 'src', 'data', 'images.json');
const imagesJson = JSON.parse(fs.readFileSync(imagesJsonPath, 'utf8'));

// Set of already indexed filepaths
const existingPaths = new Set(Object.values(imagesJson).map(v => v.src.replace(/^\//, '')));

function walk(dir, list = []) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      walk(full, list);
    } else if (/\.webp$/i.test(f) && !/-(w400|w800|i52|i80|i96)\.webp$/i.test(f)) {
      list.push(path.relative(path.join(root, 'public'), full).replace(/\\/g, '/'));
    }
  }
  return list;
}

const baseImages = walk(imagesDir);
console.log('Total base webp images found:', baseImages.length);

let added = 0;
for (const relPath of baseImages) {
  if (existingPaths.has(relPath)) continue;

  const fullPath = path.join(root, 'public', relPath);
  let meta;
  try {
    meta = await sharp(fullPath).metadata();
  } catch (err) {
    console.warn('Could not read metadata for', relPath, err.message);
    continue;
  }

  // Base name without extension
  const baseName = relPath.replace(/\.webp$/i, '');
  const fileName = path.basename(baseName);
  const dirName = path.dirname(relPath);

  // Check variants
  const variants = [];
  for (const w of [400, 800]) {
    if (meta.width <= w) continue;
    const variantRel = `${baseName}-w${w}.webp`;
    const variantFull = path.join(root, 'public', variantRel);
    if (fs.existsSync(variantFull)) {
      variants.push(w);
    } else {
      try {
        await sharp(fullPath).resize({ width: w }).webp({ quality: 78 }).toFile(variantFull);
        variants.push(w);
      } catch (e) {
        // Ignore if failed
      }
    }
  }

  // Generate a clean unique key
  let cleanKey = ('img-' + relPath.replace(/\//g, '-').replace(/\.webp$/i, '').replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase()).replace(/-+/g, '-');
  if (imagesJson[cleanKey]) {
    cleanKey = cleanKey + '-' + Math.floor(Math.random() * 1000);
  }

  // Clean label from file name
  const humanLabel = fileName.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  imagesJson[cleanKey] = {
    src: '/' + relPath,
    base: '/' + baseName,
    w: meta.width || 1200,
    h: meta.height || 675,
    variants,
    alt: {
      en: `${humanLabel} - StreamB4 IPTV Reseller Panel & 4K Streaming`,
      de: `${humanLabel} - StreamB4 IPTV Reseller Panel & 4K Streaming`
    }
  };

  added++;
}

fs.writeFileSync(imagesJsonPath, JSON.stringify(imagesJson, null, 1));
console.log(`Successfully indexed ${added} new images. Total keys now: ${Object.keys(imagesJson).length}`);
