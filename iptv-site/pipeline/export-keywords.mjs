// node pipeline/export-keywords.mjs
// Writes exports/focus-keywords-<market>.csv: one row per page with its focus keyword and related keywords.
import fs from 'fs';
import path from 'path';

const root = path.resolve(import.meta.dirname, '..');
const dataDir = path.join(root, 'src', 'data');
const outDir = path.join(root, 'exports');
fs.mkdirSync(outDir, { recursive: true });

const DOMAINS = { us: 'https://4ktrexiptv.com', au: 'https://au.4ktrexiptv.com', de: 'https://de.4ktrexiptv.com' };
const required = JSON.parse(fs.readFileSync(path.join(dataDir, 'required-pages.json'), 'utf8'));
const esc = v => `"${String(v ?? '').replace(/"/g, '""')}"`;

const summary = [];
for (const m of ['us', 'au', 'de']) {
  const base = JSON.parse(fs.readFileSync(path.join(dataDir, `pages.${m}.json`), 'utf8'));
  const have = new Set(base.map(p => p.slug));
  const extra = required.filter(r => !have.has(r.slug)).map(r => ({ slug: r.slug, keyword: r.keyword, category: r.category, volume: 0, totalVolume: 0, kd: 0, cpc: 0, intent: 'informational', score: 0, related: [] }));
  const all = [...base, ...extra];

  const ovRe = new RegExp(`^overrides\\.${m}(\\.\\d+)?\\.json$`);
  const overrides = Object.assign({}, ...fs.readdirSync(dataDir).filter(f => ovRe.test(f)).map(f => JSON.parse(fs.readFileSync(path.join(dataDir, f), 'utf8'))));

  const head = ['market', 'url', 'slug', 'focus_keyword', 'category', 'search_volume', 'cluster_volume', 'keyword_difficulty', 'cpc_usd', 'intent', 'priority_score', 'related_keywords', 'related_count', 'hand_written_content'];
  const rows = all.map(p => [
    m, `${DOMAINS[m]}/${p.slug}/`, p.slug, p.keyword, p.category, p.volume, p.totalVolume, p.kd, p.cpc, p.intent, p.score,
    p.related.map(r => `${r.k} (${r.v})`).join('; '), p.related.length, overrides[p.slug] ? 'yes' : 'no',
  ]);
  const csv = '﻿' + [head, ...rows].map(r => r.map(esc).join(',')).join('\r\n');
  fs.writeFileSync(path.join(outDir, `focus-keywords-${m}.csv`), csv);
  const byCat = {};
  all.forEach(p => { byCat[p.category] = (byCat[p.category] || 0) + 1; });
  summary.push({ market: m, pages: all.length, volume: all.reduce((a, p) => a + p.volume, 0), byCat });
  console.log(`${m}: ${all.length} pages -> exports/focus-keywords-${m}.csv`);
}
console.log(JSON.stringify(summary, null, 1));
