import fs from 'fs'; import path from 'path';
const dist = path.resolve(import.meta.dirname, '..', 'dist-' + (process.argv[2] || 'us'));
const rows = [];
for (const d of fs.readdirSync(dist, { withFileTypes: true })) {
  if (!d.isDirectory() || ['category','_astro'].includes(d.name)) continue;
  const f = path.join(dist, d.name, 'index.html'); if (!fs.existsSync(f)) continue;
  const h = fs.readFileSync(f, 'utf8');
  const body = (h.match(/<article[\s\S]*<\/article>/) || [''])[0].replace(/<[^>]+>/g, ' ');
  rows.push({ slug: d.name, words: body.split(/\s+/).filter(Boolean).length, title: (h.match(/<title>(.*?)<\/title>/) || [])[1], desc: (h.match(/name="description" content="(.*?)"/) || [])[1], h2: (h.match(/<h2/g) || []).length });
}
const w = rows.map(r => r.words).sort((a, b) => a - b);
console.log('pages', rows.length, 'words min/median/max', w[0], w[w.length >> 1], w[w.length - 1]);
console.log('under 700 words:', rows.filter(r => r.words < 700).length);
const dup = (k) => { const m = {}; rows.forEach(r => (m[r[k]] ||= []).push(r.slug)); return Object.values(m).filter(a => a.length > 1); };
console.log('dup titles:', dup('title').length, 'dup descriptions:', dup('desc').length);
console.log('title >65 chars:', rows.filter(r => r.title.length > 65).length, 'desc >160:', rows.filter(r => r.desc.length > 160).length);

// internal link check
let broken = 0; const seenBroken = new Set();
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : e.name === 'index.html' ? [path.join(d, e.name)] : []);
for (const f of walk(dist)) {
  for (const m of fs.readFileSync(f, 'utf8').matchAll(/href="(\/[^"#?]*)"/g)) {
    const t = path.join(dist, m[1]);
    if (!fs.existsSync(path.join(t, 'index.html')) && !fs.existsSync(t) && !seenBroken.has(m[1])) { seenBroken.add(m[1]); broken++; }
  }
}
console.log('broken internal links:', broken, [...seenBroken].slice(0, 5));

// image reference check: every /images/... or /og/... src/srcset/content target must exist in the build
let missingImg = 0; const missingSet = new Set();
for (const f of walk(dist)) {
  const html = fs.readFileSync(f, 'utf8');
  for (const m of html.matchAll(/(?:src|srcset|content)="([^"]*)"/g)) {
    for (const part of m[1].split(',')) {
      const u = part.trim().split(/\s+/)[0];
      if (!/^(https?:\/\/[^/]+)?\/(images|og)\//.test(u)) continue;
      const rel = decodeURIComponent(u.replace(/^https?:\/\/[^/]+/, ''));
      if (!fs.existsSync(path.join(dist, rel)) && !missingSet.has(rel)) { missingSet.add(rel); missingImg++; }
    }
  }
}
const imgDir = path.join(dist, 'images');
const imgBytes = fs.existsSync(imgDir) ? fs.readdirSync(imgDir).reduce((a, n) => a + fs.statSync(path.join(imgDir, n)).size, 0) : 0;
console.log('missing image files:', missingImg, [...missingSet].slice(0, 5), '| images in build:', (imgBytes / 1048576).toFixed(1), 'MB');
// images without alt attribute (empty alt is allowed for decorative ones)
let noAlt = 0;
for (const f of walk(dist)) for (const m of fs.readFileSync(f, 'utf8').matchAll(/<img\b[^>]*>/g)) if (!/\balt=/.test(m[0])) noAlt++;
console.log('img tags without alt:', noAlt);

// structure / accessibility heuristics (static, not a substitute for an audit tool)
{
  let pages = 0, noH1 = 0, multiH1 = 0, skips = 0, dupIds = 0, emptyLinks = 0, unnamedButtons = 0, emojiLeft = 0, inlineStyle = 0;
  const emojiRe = /[\u{1F300}-\u{1FAFF}☀-➿⭐️]/u;
  for (const f of walk(dist)) {
    const html = fs.readFileSync(f, 'utf8');
    const body = (html.match(/<body[\s\S]*<\/body>/) || [''])[0].replace(/<script[\s\S]*?<\/script>/g, '');
    pages++;
    const h = [...body.matchAll(/<h([1-6])\b/g)].map(m => +m[1]);
    const h1s = h.filter(x => x === 1).length;
    if (h1s === 0) noH1++; if (h1s > 1) multiH1++;
    for (let i = 1; i < h.length; i++) if (h[i] - h[i - 1] > 1) { skips++; break; }
    const ids = [...body.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
    if (new Set(ids).size !== ids.length) dupIds++;
    for (const m of body.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)) {
      const text = m[2].replace(/<[^>]+>/g, '').trim();
      if (!text && !/aria-label=/.test(m[1])) emptyLinks++;
    }
    for (const m of body.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)) {
      if (!/aria-label=/.test(m[1]) && !m[2].replace(/<[^>]+>/g, '').trim()) unnamedButtons++;
    }
    const visible = body.replace(/<[^>]+>/g, ' ');
    if (emojiRe.test(visible)) emojiLeft++;
    if (/\sstyle="/.test(body.replace(/<svg[\s\S]*?<\/svg>/g, ''))) inlineStyle++;
  }
  console.log(`structure over ${pages} pages -> missing h1: ${noH1}, multiple h1: ${multiH1}, heading level skips: ${skips}, duplicate ids: ${dupIds}, empty links: ${emptyLinks}, unnamed buttons: ${unnamedButtons}, pages with emoji: ${emojiLeft}, pages with inline style attrs: ${inlineStyle}`);
}
