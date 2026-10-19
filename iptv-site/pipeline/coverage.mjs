// node pipeline/coverage.mjs [topN]  -> how many of the top N pages per market have hand-written overrides
import fs from 'fs';
import path from 'path';

const dataDir = path.resolve(import.meta.dirname, '..', 'src', 'data');
const topN = +process.argv[2] || 100;
for (const m of ['us', 'au', 'de']) {
  const re = new RegExp(`^overrides\\.${m}(\\.\\d+)?\\.json$`);
  const ov = Object.assign({}, ...fs.readdirSync(dataDir).filter(f => re.test(f)).map(f => JSON.parse(fs.readFileSync(path.join(dataDir, f), 'utf8'))));
  const pages = JSON.parse(fs.readFileSync(path.join(dataDir, `pages.${m}.json`), 'utf8'));
  const slugs = new Set(pages.map(p => p.slug));
  const missing = pages.slice(0, topN).filter(p => !ov[p.slug]).map(p => p.slug);
  const orphans = Object.keys(ov).filter(k => !slugs.has(k));
  console.log(`${m}: overrides=${Object.keys(ov).length} covered_top${topN}=${topN - missing.length}/${Math.min(topN, pages.length)} orphans=[${orphans.join(', ')}]`);
  if (missing.length) console.log('  missing:', missing.join(', '));
}
