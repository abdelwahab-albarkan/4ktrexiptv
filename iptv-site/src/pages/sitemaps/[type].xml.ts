import { SITE, CAT_ORDER } from '../../config';
import { ALL } from '../../lib/pages';
import { hash } from '../../lib/util';

export function getStaticPaths() {
  const catsWithPages = CAT_ORDER.filter(c => ALL.some(p => p.category === c));
  return catsWithPages.map(cat => ({
    params: { type: `sitemap-${cat}` },
    props: { cat },
  }));
}

export const GET = ({ props }: { props: { cat: string } }) => {
  const cat = props.cat;
  const pages = ALL.filter(p => p.category === cat);
  const refDate = new Date('2026-10-18T12:00:00Z');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => {
  const hVal = Math.abs(hash(p.slug));
  const modDaysAgo = 3 + (hVal % 22);
  const lastmod = new Date(refDate.getTime() - modDaysAgo * 86400000).toISOString().split('T')[0];
  const priority = p.volume > 1000 ? '0.9' : p.volume > 200 ? '0.8' : '0.7';
  return `  <url>
    <loc>${SITE.url}/${p.slug}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
