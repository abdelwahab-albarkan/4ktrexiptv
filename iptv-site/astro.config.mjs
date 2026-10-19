import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE, MARKET } from './src/config.ts';

// On Vercel, default output directory is './dist' so Vercel can find the build output
const outDir = process.env.VERCEL && !process.env.SITE_MARKET ? './dist' : `./dist-${MARKET}`;

export default defineConfig({
  site: SITE.url,
  outDir,
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: {
    enabled: false,
  },
});
