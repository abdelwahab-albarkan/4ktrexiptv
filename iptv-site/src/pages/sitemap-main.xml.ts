import { SITE, CAT_ORDER } from '../config';

export const GET = () => {
  const staticPages = [
    '',
    'about/',
    'contact/',
    ...CAT_ORDER.map(c => `category/${c}/`),
  ];

  const today = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(path => `  <url>
    <loc>${SITE.url}/${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${path === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${path === '' ? '1.0' : path.startsWith('category/') ? '0.9' : '0.6'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
