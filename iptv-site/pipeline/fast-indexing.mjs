import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// ========================================================
// CONFIGURATION & INDEXNOW KEY
// ========================================================
export const INDEXNOW_KEY = 'c9a2f64e10b748239d5e1823746a81f0';

export const MARKETS = {
  us: {
    name: 'United States / Global',
    host: '4ktrexiptv.com',
    url: 'https://4ktrexiptv.com',
    dist: 'dist-us',
    pagesFile: 'src/data/pages.us.json',
  },
  de: {
    name: 'Germany / DACH',
    host: 'de.4ktrexiptv.com',
    url: 'https://de.4ktrexiptv.com',
    dist: 'dist-de',
    pagesFile: 'src/data/pages.de.json',
  },
  au: {
    name: 'Australia',
    host: 'au.4ktrexiptv.com',
    url: 'https://au.4ktrexiptv.com',
    dist: 'dist-au',
    pagesFile: 'src/data/pages.au.json',
  },
};

const STATIC_ROUTES = [
  '',
  'about',
  'contact',
  'privacy',
  'terms',
  'impressum',
  'category/providers',
  'category/reseller',
  'category/locations',
  'category/pricing',
  'category/trial',
  'category/devices',
  'category/apps',
  'category/sports',
  'category/setup',
];

/**
 * Ensures verification key file exists in public/ and dist directories
 */
function ensureKeyFile(marketKey) {
  const pubFile = path.join(rootDir, 'public', `${INDEXNOW_KEY}.txt`);
  if (!fs.existsSync(pubFile)) {
    fs.writeFileSync(pubFile, INDEXNOW_KEY, 'utf8');
    console.log(`🔑 Created IndexNow key file: public/${INDEXNOW_KEY}.txt`);
  }
  
  const m = MARKETS[marketKey];
  if (m) {
    const distFile = path.join(rootDir, m.dist, `${INDEXNOW_KEY}.txt`);
    if (fs.existsSync(path.join(rootDir, m.dist)) && !fs.existsSync(distFile)) {
      fs.writeFileSync(distFile, INDEXNOW_KEY, 'utf8');
    }
  }
}

/**
 * Collects URLs from local dist sitemaps or pages JSON
 */
function getLocalUrls(marketKey) {
  const m = MARKETS[marketKey];
  const urls = new Set();

  // 1. Static Core Pages
  for (const route of STATIC_ROUTES) {
    const cleanRoute = route ? `${route}/` : '';
    urls.add(`${m.url}/${cleanRoute}`);
  }

  // 2. Check local dist XML sitemaps if available
  const distDir = path.join(rootDir, m.dist);
  if (fs.existsSync(distDir)) {
    const xmlFiles = [];
    const walk = (d) => {
      for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
        const full = path.join(d, ent.name);
        if (ent.isDirectory()) walk(full);
        else if (ent.name.endsWith('.xml') && !ent.name.includes('rss')) xmlFiles.push(full);
      }
    };
    walk(distDir);

    for (const xf of xmlFiles) {
      const xml = fs.readFileSync(xf, 'utf8');
      const matches = xml.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g);
      for (const match of matches) {
        const u = match[1].trim();
        if (!u.endsWith('.xml')) {
          urls.add(u.endsWith('/') ? u : `${u}/`);
        }
      }
    }
  }

  // 3. Fallback to programmatic pages.json
  const pagesPath = path.join(rootDir, m.pagesFile);
  if (urls.size <= STATIC_ROUTES.length && fs.existsSync(pagesPath)) {
    try {
      const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));
      for (const p of pages) {
        urls.add(`${m.url}/${p.slug}/`);
      }
    } catch (e) {
      console.warn(`Could not read ${m.pagesFile}:`, e.message);
    }
  }

  return Array.from(urls);
}

/**
 * Fetches and parses remote live sitemap
 */
async function getRemoteLiveUrls(marketKey) {
  const m = MARKETS[marketKey];
  const sitemapUrl = `${m.url}/sitemap.xml`;
  console.log(`📡 Fetching live sitemap from: ${sitemapUrl}`);

  const visited = new Set();
  const urls = new Set();

  async function parseSitemap(url) {
    if (visited.has(url)) return;
    visited.add(url);

    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) IndexNow-Submitter/2026',
          'Accept': 'application/xml, text/xml, */*',
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }

      const text = await res.text();
      const locs = Array.from(text.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)).map(m => m[1].trim());

      for (const loc of locs) {
        if (loc.endsWith('.xml')) {
          await parseSitemap(loc);
        } else {
          urls.add(loc.endsWith('/') ? loc : `${loc}/`);
        }
      }
    } catch (err) {
      console.warn(`⚠️ Warning: Failed to fetch ${url} (${err.message}). Falling back to local pages.`);
    }
  }

  await parseSitemap(sitemapUrl);
  return Array.from(urls);
}

/**
 * Submits URL list to IndexNow API endpoints in batches of 1,000
 */
async function submitToIndexNow(marketKey, urls, dryRun = false) {
  const m = MARKETS[marketKey];
  const batchSize = 1000;
  const keyLocation = `${m.url}/${INDEXNOW_KEY}.txt`;

  const engines = [
    { name: 'IndexNow Global (Bing/Yandex/Seznam)', url: 'https://api.indexnow.org/IndexNow' },
    { name: 'Bing Direct', url: 'https://www.bing.com/IndexNow' },
  ];

  console.log(`\n======================================================`);
  console.log(`🚀 INDEXNOW SUBMISSION: ${m.name} (${m.host})`);
  console.log(`Total URLs to submit: ${urls.length}`);
  console.log(`Key Location: ${keyLocation}`);
  console.log(`Batch Size: ${batchSize} URLs per request`);
  console.log(`======================================================\n`);

  if (dryRun) {
    console.log(`[DRY RUN] Previewing first 10 URLs:`);
    urls.slice(0, 10).forEach((u, i) => console.log(`  ${i + 1}. ${u}`));
    if (urls.length > 10) console.log(`  ... and ${urls.length - 10} more URLs.`);
    console.log(`\n✅ Dry run complete. No network requests were sent.`);
    return;
  }

  let totalSubmitted = 0;
  const totalBatches = Math.ceil(urls.length / batchSize);

  for (let i = 0; i < urls.length; i += batchSize) {
    const batchIndex = Math.floor(i / batchSize) + 1;
    const batch = urls.slice(i, i + batchSize);
    console.log(`📦 Batch ${batchIndex}/${totalBatches} (${batch.length} URLs)...`);

    const payload = {
      host: m.host,
      key: INDEXNOW_KEY,
      keyLocation: keyLocation,
      urlList: batch,
    };

    for (const engine of engines) {
      try {
        const response = await fetch(engine.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'User-Agent': '4KTrex-FastIndexing/2.0',
          },
          body: JSON.stringify(payload),
        });

        const status = response.status;
        if (status === 200) {
          console.log(`  ✅ ${engine.name}: 200 OK (URLs successfully submitted)`);
        } else if (status === 202) {
          console.log(`  🕒 ${engine.name}: 202 Accepted (Received, key verification pending)`);
        } else if (status === 403) {
          console.log(`  ⚠️ ${engine.name}: 403 Forbidden (Key file not reachable yet at ${keyLocation})`);
        } else if (status === 422) {
          console.log(`  ⚠️ ${engine.name}: 422 Unprocessable (URLs don't match host ${m.host})`);
        } else if (status === 429) {
          console.log(`  ⚠️ ${engine.name}: 429 Too Many Requests (Rate limit reached)`);
        } else {
          console.log(`  ⚠️ ${engine.name}: Status ${status}`);
        }
      } catch (err) {
        console.error(`  ❌ Error submitting to ${engine.name}:`, err.message);
      }
    }

    totalSubmitted += batch.length;
    // Brief 250ms pause between batches to be respectful to search engine endpoints
    if (i + batchSize < urls.length) {
      await new Promise(r => setTimeout(r, 250));
    }
  }

  console.log(`\n🎉 Submission complete! Total URLs notified: ${totalSubmitted}`);
}

/**
 * Main process runner
 */
async function run() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes('--dry-run');
  const isLive = args.includes('--live');
  
  // Specific URLs provided directly in CLI arguments
  const specificUrls = args.filter(a => a.startsWith('http://') || a.startsWith('https://'));

  // Target market: us | de | au | all
  const rawMarket = args.find(a => ['us', 'de', 'au', 'all'].includes(a.toLowerCase())) || 'us';
  const targetMarkets = rawMarket.toLowerCase() === 'all' ? ['us', 'de', 'au'] : [rawMarket.toLowerCase()];

  console.log(`⚡ FAST INDEXING PROTOCOL (IndexNow Engine)`);
  console.log(`Target Markets: ${targetMarkets.join(', ').toUpperCase()}`);

  for (const marketKey of targetMarkets) {
    ensureKeyFile(marketKey);

    let urls = [];
    if (specificUrls.length > 0) {
      urls = specificUrls;
      console.log(`🎯 Using ${urls.length} specific URL(s) provided via CLI.`);
    } else if (isLive) {
      urls = await getRemoteLiveUrls(marketKey);
      if (urls.length === 0) {
        console.log(`ℹ️ Remote sitemap empty or unavailable. Switching to local sitemap...`);
        urls = getLocalUrls(marketKey);
      }
    } else {
      urls = getLocalUrls(marketKey);
    }

    if (urls.length === 0) {
      console.log(`⚠️ No URLs found for market: ${marketKey}. Ensure you have built the market first.`);
      continue;
    }

    await submitToIndexNow(marketKey, urls, isDryRun);
  }
}

run().catch(err => {
  console.error('\n🔥 Fatal Error:', err.message);
  process.exit(1);
});
