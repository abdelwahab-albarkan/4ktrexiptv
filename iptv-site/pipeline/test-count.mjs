import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..', '..');

function parseCsv(t) {
  const rows = []; let row = [], f = '', q = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (q) {
      if (c === '"') {
        if (t[i + 1] === '"') { f += '"'; i++; }
        else q = false;
      } else f += c;
    } else if (c === '"') {
      q = true;
    } else if (c === ',') {
      row.push(f); f = '';
    } else if (c === '\n') {
      row.push(f); rows.push(row); row = []; f = '';
    } else if (c !== '\r') {
      f += c;
    }
  }
  if (f || row.length) { row.push(f); rows.push(row); }
  return rows;
}

const folders = ['data_imports', 'dataaustralia', 'data seo'];
const allKw = new Map();

for (const folder of folders) {
  const dir = path.join(ROOT, folder);
  if (!fs.existsSync(dir)) continue;
  for (const fn of fs.readdirSync(dir)) {
    if (!fn.endsWith('.csv') || fn.includes('organic.Positions')) continue;
    try {
      const content = fs.readFileSync(path.join(dir, fn), 'utf8').replace(/^\uFEFF/, '');
      const rows = parseCsv(content);
      if (!rows.length) continue;
      const h = rows[0];
      const kIdx = h.indexOf('Keyword');
      const vIdx = h.indexOf('Volume');
      const kdIdx = h.indexOf('Keyword Difficulty');
      const relIdx = h.indexOf('Relevance');
      const cpcIdx = h.indexOf('CPC (USD)');
      const intIdx = h.indexOf('Intent');

      for (let i = 1; i < rows.length; i++) {
        const r = rows[i];
        const k = (r[kIdx] || '').trim().toLowerCase().replace(/\s+/g, ' ');
        if (!k || k.length < 3 || k.length > 70) continue;
        const v = +r[vIdx] || 0;
        const kd = +r[kdIdx] || 0;
        const rel = +r[relIdx] || 0;
        const cpc = +r[cpcIdx] || 0;
        const intent = (r[intIdx] || '').split(',')[0].trim().toLowerCase();

        const existing = allKw.get(k);
        if (!existing || v > existing.v) {
          allKw.set(k, { k, v, kd, rel, cpc, intent, folder });
        }
      }
    } catch (e) {
      console.error('Error reading', fn, e.message);
    }
  }
}

console.log('Total unique raw keywords across all folders:', allKw.size);
