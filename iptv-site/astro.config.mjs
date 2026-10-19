import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE, MARKET } from './src/config.ts';

export default defineConfig({
  site: SITE.url,
  outDir: `./dist-${MARKET}`,
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: {
    enabled: false,
  },
});
