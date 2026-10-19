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

const folders = ['data_imports', 'dataaustralia'];
const kw = new Map();

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

        const existing = kw.get(k);
        if (!existing || v > existing.v) {
          kw.set(k, { k, v, kd, rel, cpc, intent });
        }
      }
    } catch (e) {}
  }
}

const INCLUDE = /iptv|ip tv|m3u|xtream|smarters|tivimate|ibo ?(pro|player)|implayer|formuler|mag ?(box|\d{3})|epg|streaming (box|device|service|stick|app)|tv (subscription|package|channels|streaming|box)|reseller|provider|anbieter|(watch|stream|live|channel|package|pass|subscription|how to).*(nfl|nba|premier league|champions league|super bowl|ufc|boxing|f1|formula|cricket|afl|nrl|a-league|rugby|socceroos|matildas|tennis|golf|sky sports|tnt sports|dazn|kayo|optus sport|fetch|bundesliga)|(fire ?stick|firestick|fire tv|android tv|apple tv|roku|nvidia shield|smart tv|samsung|lg).*(iptv|app|install|setup|set up|stream|jailbreak|channels|einrichten|anleitung)|(iptv|app|install|setup|stream|jailbreak|channels).*(fire ?stick|firestick|fire tv|android tv|apple tv|roku|nvidia shield|smart tv|samsung|lg)|televizo|kodi|vlc|smart iptv|xciptv/;

const EXCLUDE = /adult|porn|xxx|\bsex\b|illegal|hack|crack|free live sports|rnba|nbabite|buffstream|streameast|stream2watch|gold price|facebook|twitter|instagram|tiktok|salary|meaning|wiki\b|lyrics|jobs|reddit|login|sign in|password|webmail|inch|soundbar|fridge|washer|dryer|galaxy|iphone \d|pixel \d|garmin|sunglasses|walmart|costco|best buy|bestbuy|amazon prime|ebay|speedtest|telstra|handyvertrag/;

const pool = [...kw.values()].filter(x =>
  INCLUDE.test(x.k) &&
  !EXCLUDE.test(x.k) &&
  x.k.length >= 4 &&
  x.k.length <= 65 &&
  x.k.split(' ').length <= 8 &&
  x.v >= 10
);

const STOP = new Set(['for', 'the', 'a', 'an', 'in', 'to', 'of', 'and', 'on', 'with', 'my', 'best', 'top', 'good', 'new', 'how', 'do', 'i', 'is', 'what', 'can', 'where', 'get', 'buy', 'free', 'online', 'live', '2024', '2025', '2026', 'uk', 'usa', 'us', 'au', 'australia', 'united', 'states', 'kingdom']);
const stem = w => w.length > 4 ? w.replace(/(ies)$/, 'y').replace(/(s)$/, '') : w;
const sig = k => [...new Set(k.split(' ').map(stem).filter(w => !STOP.has(w)))].sort().join(' ');
const MOD = ['buy', 'free', 'best', 'uk', 'australia', 'usa', 'cheap', 'trial', 'price', 'review', 'reseller', 'panel', 'credits', 'setup', 'firestick', 'app'];
const fullSig = k => sig(k) + '|' + MOD.filter(m => k.split(' ').includes(m)).join(',');

const groups = new Map();
for (const x of pool) {
  const s = fullSig(x.k);
  if (!groups.has(s)) groups.set(s, []);
  groups.get(s).push(x);
}

console.log('Unique pool:', pool.length, 'Clusters:', groups.size);
