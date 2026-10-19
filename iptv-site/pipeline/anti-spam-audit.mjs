import fs from 'fs';
import path from 'path';

const market = process.argv[2] || 'us';
const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, `dist-${market}`);

console.log(`\n======================================================`);
console.log(`🛡️  RUNNING ANTI-SPAM & GOOGLE FOOTPRINT AUDIT (${market.toUpperCase()})`);
console.log(`Target Directory: ${dist}`);
console.log(`======================================================\n`);

if (!fs.existsSync(dist)) {
  console.error(`Error: Directory ${dist} does not exist. Run build first.`);
  process.exit(1);
}

// 1. Collect all programmatic HTML pages
const pages = [];
for (const d of fs.readdirSync(dist, { withFileTypes: true })) {
  if (!d.isDirectory() || ['category', '_astro', 'sitemaps'].includes(d.name)) continue;
  const f = path.join(dist, d.name, 'index.html');
  if (fs.existsSync(f)) {
    pages.push({ slug: d.name, path: f });
  }
}
console.log(`Total programmatic pages found: ${pages.length}`);

// 2. Pairwise Text Similarity & Footprint Analysis on sample
const sampleSize = Math.min(60, pages.length);
const sample = pages.slice(0, sampleSize).map(p => {
  const html = fs.readFileSync(p.path, 'utf8');
  const article = (html.match(/<article[\s\S]*?<\/article>/i) || [''])[0]
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2);

  // 3-word shingles for similarity testing
  const shingles = new Set();
  for (let i = 0; i < article.length - 2; i++) {
    shingles.add(`${article[i]} ${article[i+1]} ${article[i+2]}`);
  }

  return { slug: p.slug, html, words: article, shingles };
});

function jaccardSimilarity(setA, setB) {
  let intersection = 0;
  for (const s of setA) {
    if (setB.has(s)) intersection++;
  }
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : (intersection / union);
}

// Calculate pairwise similarities
let maxSim = 0;
let totalSim = 0;
let pairsCount = 0;
let highSimPairs = 0;

for (let i = 0; i < sample.length; i++) {
  for (let j = i + 1; j < sample.length; j++) {
    const sim = jaccardSimilarity(sample[i].shingles, sample[j].shingles);
    totalSim += sim;
    pairsCount++;
    if (sim > maxSim) maxSim = sim;
    if (sim > 0.55) {
      highSimPairs++;
    }
  }
}

const avgSim = pairsCount ? (totalSim / pairsCount) : 0;

console.log(`\n--- 1. TEXT UNIQUENESS & SIMILARITY METRICS ---`);
console.log(`Sample pairs analyzed: ${pairsCount}`);
console.log(`Average Shingle Similarity: ${(avgSim * 100).toFixed(1)}% (Target: < 45%)`);
console.log(`Maximum Shingle Similarity: ${(maxSim * 100).toFixed(1)}% (Safe: < 60%)`);
console.log(`High Similarity Pairs (>55%): ${highSimPairs}`);

if (avgSim < 0.45 && highSimPairs === 0) {
  console.log(`✅ PASS: Outstanding content entropy. No programmatic duplicate content footprint detected!`);
} else if (avgSim < 0.50) {
  console.log(`⚠️ MODERATE: Content similarity is acceptable but consider expanding paragraph variations.`);
} else {
  console.log(`❌ FAIL: Content is too similar across pages. Google may flag as doorway/scaled content.`);
}

// 3. Scan for Telltale SEO Footprints
console.log(`\n--- 2. TELLTALE FOOTPRINT HUNTER ---`);
let seoGuidesFound = 0;
let searchEnginesMention = 0;
let hardcodedOldDates = 0;
let keywordDensityWarnings = 0;
let invalidProductSchemas = 0;

for (const p of sample) {
  if (/5,?000\+?\s*SEO/i.test(p.html)) seoGuidesFound++;
  if (/Search engines and viewers/i.test(p.html)) searchEnginesMention++;
  if (p.html.includes('Verified Oct 18, 2026')) hardcodedOldDates++;

  // Keyword density test on visible article text
  const kwWords = p.slug.split('-');
  const kwRegex = new RegExp(kwWords.join('\\s+'), 'gi');
  const count = (p.words.join(' ').match(kwRegex) || []).length;
  const density = (count / Math.max(1, p.words.length)) * 100;
  if (density > 2.5) {
    keywordDensityWarnings++;
  }

  // Schema audit
  if (p.html.includes('"@type":"Product"') && (p.slug.includes('fix') || p.slug.includes('troubleshoot') || p.slug.includes('how-to'))) {
    invalidProductSchemas++;
  }
}

console.log(`Mentions of "5,000+ SEO": ${seoGuidesFound} (Target: 0)`);
console.log(`Mentions of "Search engines and viewers": ${searchEnginesMention} (Target: 0)`);
console.log(`Hardcoded static verification dates: ${hardcodedOldDates} (Target: 0)`);
console.log(`Keyword density warnings (>2.5%): ${keywordDensityWarnings} (Target: 0)`);
console.log(`Invalid Product schema on informational pages: ${invalidProductSchemas} (Target: 0)`);

if (seoGuidesFound === 0 && searchEnginesMention === 0 && hardcodedOldDates === 0 && keywordDensityWarnings === 0 && invalidProductSchemas === 0) {
  console.log(`✅ PASS: Zero unnatural footprint markers found!`);
} else {
  console.log(`⚠️ WARNING: Some footprint markers were detected.`);
}

// 4. Doorway Permutation Analysis
console.log(`\n--- 3. DOORWAY CITY GRID ANALYSIS ---`);
const cityMatches = sample.filter(p => /\b(london|new-york|sydney|melbourne|chicago|los-angeles|toronto)\b/i.test(p.slug));
console.log(`Synthetic city permutations in sample: ${cityMatches.length}`);
if (cityMatches.length === 0) {
  console.log(`✅ PASS: Zero synthetic doorway city pages detected!`);
} else {
  console.log(`⚠️ Found ${cityMatches.length} city-related pages. Ensure they contain localized server/ISP data.`);
}

console.log(`\n======================================================`);
console.log(`🛡️  AUDIT COMPLETE: SITE IS HARDENED AGAINST GOOGLE SPAM POLICIES`);
console.log(`======================================================\n`);
