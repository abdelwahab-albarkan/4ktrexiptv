// Usage: node pipeline/build-keywords.mjs <us|de|au|all> [maxPages]
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..', '..');

const marketArg = (process.argv[2] || 'us').toLowerCase();
const maxPages = +process.argv[3] || 5000;

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

// Data folders based on target market
const FOLDERS = marketArg === 'de'
  ? ['data seo']
  : marketArg === 'au'
  ? ['dataaustralia']
  : ['data_imports', 'dataaustralia'];

const kw = new Map();
let seenFiles = 0;

for (const folder of FOLDERS) {
  const dir = path.join(ROOT, folder);
  if (!fs.existsSync(dir)) continue;
  for (const fn of fs.readdirSync(dir)) {
    if (!fn.endsWith('.csv') || fn.includes('organic.Positions')) continue;
    seenFiles++;
    try {
      const buf = fs.readFileSync(path.join(dir, fn));
      const content = buf.toString('utf8').replace(/^\uFEFF/, '');
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

        const o = kw.get(k);
        if (!o || v > o.v) {
          kw.set(k, { k, v, kd, rel, cpc, intent, source: fn });
        }
      }
    } catch (e) {}
  }
}

// High intent IPTV inclusion regex (strict context to avoid off-topic matches like dental/aged-care providers)
const INCLUDE = /iptv|ip tv|m3u|xtream|smarters|tivimate|ibo ?(pro|player)|implayer|televizo|kodi|vlc|smart iptv|xciptv|formuler|mag ?(box|\d{3})|epg|streaming (box|device|service|stick|app)|tv (subscription|package|channels|streaming|box)|(\b(iptv|tv|stream\w*|m3u|xtream)\s+(provider|anbieter|panel|reseller)\b)|(\b(reseller|provider|anbieter)\s+(panel|portal|credits?|pricing|wholesale|sub-reseller)\b)|(\b(iptv[- ]reseller|iptv[- ]provider|iptv[- ]panel|iptv[- ]anbieter)\b)|(watch|stream|live|channel|package|pass|subscription|how to).*(nfl|nba|premier league|champions league|super bowl|ufc|boxing|f1|formula|cricket|afl|nrl|a-league|rugby|socceroos|matildas|tennis|golf|sky sports|tnt sports|dazn|kayo|optus sport|fetch|bundesliga)|(fire ?stick|firestick|fire tv|android tv|apple tv|roku|nvidia shield|smart tv|samsung|lg).*(iptv|app|install|setup|set up|stream|jailbreak|channels|einrichten|anleitung)|(iptv|app|install|setup|stream|jailbreak|channels).*(fire ?stick|firestick|fire tv|android tv|apple tv|roku|nvidia shield|smart tv|samsung|lg)/;

const EXCLUDE = /adult|porn|xxx|\bsex\b|illegal|hack|crack|free live sports|rnba|nbabite|buffstream|streameast|stream2watch|gold price|facebook|twitter|instagram|tiktok|salary|meaning|wiki\b|lyrics|jobs|reddit|login|sign in|password|webmail|soundbar|fridge|washer|washing[- ]machine|dryer|galaxy|iphone \d|pixel \d|garmin|sunglasses|walmart|costco|best buy|bestbuy|amazon prime|ebay|speedtest|telstra|handyvertrag|inch|partidos|en vivo|gratis|\bpara\b|remote\b|stand\b|wall mount|wall bracket|flat panel|flat-panel|panel tv|ips panel|tv screen|screen protector|hdmi cable|aged[- ]care|dental|optical|solar|ndis|disability|car[- ]insurance|health[- ]insurance|life[- ]insurance|contents[- ]insurance|job[- ]provider|cleaning|televizor|televizori|televizoriai|televizorji|krankenkasse|stromanbieter|gas[- ]provider/;

// Filter valid pool
const pool = [...kw.values()].filter(x =>
  INCLUDE.test(x.k) &&
  !EXCLUDE.test(x.k) &&
  (marketArg === 'de' || !/\b(anbieter|einrichten|anleitung|funktioniert|fernseh|kostenlos|kaufen|sender|1-1|1und1|1 u 1|1&1)\b/.test(x.k)) &&
  x.k.length >= 4 &&
  x.k.length <= 65 &&
  x.k.split(' ').length <= 8 &&
  x.v >= 10
);

// High-value programmatic seed keywords for IPTV Reseller & Top Providers if not already present
const CURATED_SEEDS = [
  // Providers & Comparisons
  { k: 'trex iptv', v: 12500, kd: 22, rel: 100, cpc: 1.2, intent: 'commercial' },
  { k: 'ultra 8k iptv', v: 8900, kd: 18, rel: 100, cpc: 1.1, intent: 'commercial' },
  { k: '8k iptv', v: 15200, kd: 25, rel: 100, cpc: 1.4, intent: 'commercial' },
  { k: 'smarter8k iptv', v: 6800, kd: 19, rel: 100, cpc: 0.9, intent: 'commercial' },
  { k: 'crystal iptv', v: 5400, kd: 21, rel: 100, cpc: 1.0, intent: 'commercial' },
  { k: 'cyber iptv', v: 4600, kd: 17, rel: 100, cpc: 0.8, intent: 'commercial' },
  { k: 'megaott iptv', v: 7400, kd: 20, rel: 100, cpc: 1.1, intent: 'commercial' },
  { k: 'dream 4k iptv', v: 5300, kd: 16, rel: 100, cpc: 0.9, intent: 'commercial' },
  { k: 'b1g iptv', v: 3200, kd: 15, rel: 100, cpc: 0.7, intent: 'commercial' },
  { k: 'hot iptv', v: 3500, kd: 18, rel: 100, cpc: 0.8, intent: 'commercial' },
  { k: '5glive iptv', v: 8400, kd: 19, rel: 100, cpc: 1.0, intent: 'commercial' },
  { k: '4k iptv app', v: 4200, kd: 17, rel: 100, cpc: 0.9, intent: 'commercial' },
  { k: 'starshare iptv', v: 2900, kd: 14, rel: 100, cpc: 0.7, intent: 'commercial' },
  { k: 'lion iptv', v: 2400, kd: 15, rel: 100, cpc: 0.6, intent: 'commercial' },
  { k: '8k iptv vs megaott', v: 1900, kd: 12, rel: 100, cpc: 1.0, intent: 'commercial' },
  { k: 'trexiptv vs crystaliptv', v: 1600, kd: 11, rel: 100, cpc: 0.9, intent: 'commercial' },
  { k: 'ultra 8k vs 5glive', v: 1400, kd: 10, rel: 100, cpc: 0.8, intent: 'commercial' },
  { k: 'cyberiptv vs b1giptv', v: 1100, kd: 9, rel: 100, cpc: 0.7, intent: 'commercial' },

  // Reseller Panel & Credits
  { k: 'iptv reseller panel', v: 9900, kd: 28, rel: 100, cpc: 2.2, intent: 'commercial' },
  { k: 'best iptv reseller panel 2026', v: 4800, kd: 24, rel: 100, cpc: 2.0, intent: 'commercial' },
  { k: 'iptv reseller credits', v: 3600, kd: 20, rel: 100, cpc: 1.8, intent: 'transactional' },
  { k: 'trex iptv reseller', v: 5400, kd: 19, rel: 100, cpc: 1.9, intent: 'commercial' },
  { k: 'ultra 8k iptv reseller', v: 3800, kd: 17, rel: 100, cpc: 1.7, intent: 'commercial' },
  { k: '8k iptv reseller panel', v: 4200, kd: 18, rel: 100, cpc: 1.8, intent: 'commercial' },
  { k: 'crystal iptv reseller', v: 2900, kd: 15, rel: 100, cpc: 1.5, intent: 'commercial' },
  { k: 'megaott reseller panel', v: 3400, kd: 17, rel: 100, cpc: 1.6, intent: 'commercial' },
  { k: '5glive reseller panel', v: 3100, kd: 16, rel: 100, cpc: 1.5, intent: 'commercial' },
  { k: 'how to start iptv reseller business', v: 2800, kd: 18, rel: 100, cpc: 1.4, intent: 'informational' },
  { k: 'iptv reseller wholesale pricing', v: 2200, kd: 16, rel: 100, cpc: 1.5, intent: 'transactional' },
  { k: 'white label iptv reseller', v: 1900, kd: 17, rel: 100, cpc: 1.6, intent: 'commercial' },
  { k: 'cheap iptv reseller panel', v: 2600, kd: 18, rel: 100, cpc: 1.7, intent: 'transactional' },

  // Locations
  { k: 'iptv usa', v: 12000, kd: 27, rel: 100, cpc: 1.8, intent: 'commercial' },
  { k: 'uk iptv', v: 9900, kd: 29, rel: 100, cpc: 1.9, intent: 'commercial' },
  { k: 'iptv canada', v: 8100, kd: 25, rel: 100, cpc: 1.6, intent: 'commercial' },
  { k: 'iptv australia', v: 7200, kd: 24, rel: 100, cpc: 1.7, intent: 'commercial' },
  { k: 'iptv europe', v: 6400, kd: 23, rel: 100, cpc: 1.5, intent: 'commercial' },
  { k: 'iptv deutschland', v: 8800, kd: 26, rel: 100, cpc: 1.7, intent: 'commercial' },
  { k: 'iptv new york', v: 1800, kd: 14, rel: 95, cpc: 1.2, intent: 'commercial' },
  { k: 'iptv california', v: 1900, kd: 15, rel: 95, cpc: 1.2, intent: 'commercial' },
  { k: 'iptv london', v: 2400, kd: 16, rel: 95, cpc: 1.3, intent: 'commercial' },
  { k: 'iptv sydney', v: 1700, kd: 13, rel: 95, cpc: 1.2, intent: 'commercial' },
  { k: 'iptv melbourne', v: 1500, kd: 12, rel: 95, cpc: 1.1, intent: 'commercial' },
  { k: 'iptv toronto', v: 1600, kd: 13, rel: 95, cpc: 1.2, intent: 'commercial' },
];

for (const seed of CURATED_SEEDS) {
  if (!kw.has(seed.k) || (kw.get(seed.k)?.v || 0) < seed.v) {
    kw.set(seed.k, { ...seed, source: 'curated' });
    pool.push(kw.get(seed.k));
  }
}

// Clustering: Stop words and stemmer
const STOP = new Set(['for', 'the', 'a', 'an', 'in', 'to', 'of', 'and', 'on', 'with', 'my', 'best', 'top', 'good', 'new', 'how', 'do', 'i', 'is', 'what', 'can', 'where', 'get', 'buy', 'free', 'online', 'live', '2024', '2025', '2026', 'uk', 'usa', 'us', 'au', 'australia', 'united', 'states', 'kingdom']);
const stem = w => (w.length > 4 ? w.replace(/(ies)$/, 'y').replace(/(s)$/, '') : w);
const sig = k => [...new Set(k.split(' ').map(stem).filter(w => !STOP.has(w)))].sort().join(' ');
const MOD = ['buy', 'free', 'best', 'uk', 'australia', 'usa', 'canada', 'europe', 'germany', 'cheap', 'trial', 'price', 'review', 'reseller', 'panel', 'credits', 'setup', 'firestick', 'app'];
const fullSig = k => sig(k) + '|' + MOD.filter(m => k.split(' ').includes(m)).join(',');

const groups = new Map();
for (const x of pool) {
  const s = fullSig(x.k);
  if (!groups.has(s)) groups.set(s, []);
  groups.get(s).push(x);
}

// Classification into 9 robust categories
const CATS = [
  ['reseller', /reseller|panel|wholesale|credit|sub-reseller|reselling|portal/],
  ['trial', /trial|test|kostenlos|free iptv/],
  ['pricing', /price|cost|cheap|buy|subscri|kaufen|abo|plan|deal|promo|package/],
  ['locations', /usa|uk|united kingdom|canada|australia|europe|germany|deutschland|london|sydney|melbourne|new york|california|toronto|florida|texas|bavaria|berlin/],
  ['setup', /setup|set up|install|einricht|installieren|how to|fix|not working|buffering|funktioniert|jailbreak|apk|troubleshoot|dns/],
  ['sports', /nfl|nba|premier|champions|super bowl|ufc|boxing|f1|formula|cricket|afl|nrl|rugby|tennis|golf|sport|dazn|tnt|a-league|bundesliga|matilda|socceroo|kayo|optus|redzone|league pass/],
  ['devices', /fire ?stick|firestick|fire tv|android|apple tv|smart tv|samsung|\blg\b|roku|shield|formuler|mag ?(box|\d)|receiver|streaming (box|device|stick)|hdmi|converter|\bpc\b|windows|mac\b|iphone|ios/],
  ['apps', /smarters|tivimate|player|\bapp\b|kodi|vlc|m3u|xtream|playlist|epg|ibo|implayer|smart iptv|televizo/],
];
const classify = k => (CATS.find(([, re]) => re.test(k)) || ['providers'])[0];

const pages = [];
for (const [, members] of groups) {
  members.sort((a, b) => b.v - a.v);
  const head = members[0];
  const total = members.reduce((a, m) => a + m.v, 0);
  const commercial = (head.intent && (head.intent.includes('commercial') || head.intent.includes('transactional'))) ? 1.3 : 1;
  const score = (total / (head.kd + 12)) * commercial;
  pages.push({
    slug: head.k
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, ''),
    keyword: head.k,
    volume: head.v,
    totalVolume: total,
    kd: head.kd,
    cpc: head.cpc || 1.0,
    intent: head.intent || 'commercial',
    category: classify(head.k),
    score: Math.round(score * 10) / 10,
    related: members.slice(1, 15).map(m => ({ k: m.k, v: m.v })),
  });
}

// Sort by score
pages.sort((a, b) => b.score - a.score);

// Filter duplicates and cap to maxPages
// Filter duplicates and cap to maxPages
const seen = new Set();
const final = pages.filter(p => p.slug && !seen.has(p.slug) && seen.add(p.slug)).slice(0, maxPages);

// Write out to data directory
const out = path.resolve(import.meta.dirname, '..', 'src', 'data');
fs.mkdirSync(out, { recursive: true });

// Always write out the target market file
const targetFile = marketArg === 'all' ? 'pages.us.json' : `pages.${marketArg}.json`;
fs.writeFileSync(path.join(out, targetFile), JSON.stringify(final, null, 1));

const cats = {};
for (const p of final) cats[p.category] = (cats[p.category] || 0) + 1;

console.log(`\n========================================================`);
console.log(`SUCCESS! Generated ${final.length} pages for market: ${marketArg}`);
console.log(`Output: src/data/${targetFile}`);
console.log(`Categories distribution:`, cats);
console.log(`Sample top 10 pages:`);
console.log(final.slice(0, 10).map((p, i) => `  ${i + 1}. [${p.category}] /${p.slug}/ (Vol: ${p.volume}, Score: ${p.score})`).join('\n'));
console.log(`========================================================\n`);
