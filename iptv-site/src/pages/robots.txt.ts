import type { APIRoute } from 'astro';
import { SITE } from '../config';

export const GET: APIRoute = () => {
  const host = new URL(SITE.url).host;
  const content = `User-agent: *
Allow: /
Disallow: /*?*
Disallow: /api/

# Primary XML Sitemap Index
Sitemap: ${SITE.url}/sitemap-index.xml
Host: ${host}
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
