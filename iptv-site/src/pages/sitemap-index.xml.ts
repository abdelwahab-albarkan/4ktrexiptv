import { SITE, CAT_ORDER } from '../config';
import { ALL } from '../lib/pages';

export const GET = () => {
  const catsWithPages = CAT_ORDER.filter(c => ALL.some(p => p.category === c));
  
  const today = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE.url}/sitemap-main.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
${catsWithPages.map(c => `  <sitemap>
    <loc>${SITE.url}/sitemaps/sitemap-${c}.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
