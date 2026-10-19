// node pipeline/build-all.mjs [us au de]  -> keywords + astro build per market into dist-<market>/
import { spawnSync } from 'child_process';
import path from 'path';

const root = path.resolve(import.meta.dirname, '..');
const markets = process.argv.slice(2).length ? process.argv.slice(2) : ['us', 'au', 'de'];
const run = (cmd, args, env = {}) => {
  const r = spawnSync(cmd, args, { cwd: root, stdio: 'inherit', shell: true, env: { ...process.env, ...env } });
  if (r.status !== 0) { console.error('failed:', cmd, args.join(' ')); process.exit(r.status ?? 1); }
};
import fs from 'fs';

for (const m of markets) {
  console.log(`\n=== BUILDING MARKET: ${m.toUpperCase()} ===`);
  const distDir = path.join(root, `dist-${m}`);
  if (fs.existsSync(distDir)) {
    console.log(`Cleaning old dist: dist-${m}...`);
    try {
      fs.rmSync(distDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 });
    } catch (e) {
      console.warn(`Warning: Could not remove all files in ${distDir} immediately (OneDrive lock). Proceeding with overwrite.`);
    }
  }
  run('node', ['pipeline/build-keywords.mjs', m]);
  run('npx', ['astro', 'build'], { SITE_MARKET: m });
  run('node', ['pipeline/qa.mjs', m]);
  run('node', ['pipeline/anti-spam-audit.mjs', m]);
}
