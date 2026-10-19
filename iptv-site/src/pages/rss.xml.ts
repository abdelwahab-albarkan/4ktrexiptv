import type { APIRoute } from 'astro';
import { SITE } from '../config';
import { ALL } from '../lib/pages';
import { titleCase } from '../lib/util';

export const GET: APIRoute = async () => {
  const topPages = ALL.slice(0, 50);

  const itemsXml = topPages
    .map(p => {
      const title = `${titleCase(p.keyword)} Guide ${SITE.year}`;
      const link = `${SITE.url}/${p.slug}/`;
      const desc = `Comprehensive streaming guide, server specifications, setup instructions, and pricing for ${p.keyword}.`;
      return `    <item>
      <title><![CDATA[${title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description><![CDATA[${desc}]]></description>
      <pubDate>Fri, 10 Jan 2026 00:00:00 GMT</pubDate>
      <category><![CDATA[${p.category}]]></category>
    </item>`;
    })
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${SITE.name} - IPTV Streaming & Reseller Guides]]></title>
    <link>${SITE.url}/</link>
    <description><![CDATA[Latest 4K IPTV reviews, reseller panel tutorials, device setups, and server benchmarks.]]></description>
    <language>${SITE.locale}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
