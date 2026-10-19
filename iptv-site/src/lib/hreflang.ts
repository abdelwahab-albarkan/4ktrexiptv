import usPages from '../data/pages.us.json';
import auPages from '../data/pages.au.json';
import dePages from '../data/pages.de.json';
import required from '../data/required-pages.json';

const reqSet = new Set(required.map((r: { slug: string }) => r.slug));
const usSet = new Set([...usPages.map((p: { slug: string }) => p.slug), ...reqSet]);
const auSet = new Set([...auPages.map((p: { slug: string }) => p.slug), ...reqSet]);
const deSet = new Set([...dePages.map((p: { slug: string }) => p.slug), ...reqSet]);

const SHARED_STATIC = new Set([
  '',
  'about',
  'contact',
  'category/providers',
  'category/reseller',
  'category/locations',
  'category/devices',
  'category/apps',
  'category/sports',
  'category/setup',
  'category/pricing',
  'category/trial',
]);

const DOMAINS = {
  us: 'https://4ktrexiptv.com',
  au: 'https://au.4ktrexiptv.com',
  de: 'https://de.4ktrexiptv.com',
};

export interface HreflangTag {
  lang: string;
  href: string;
}

export function getHreflangs(pathname: string, noindex = false): HreflangTag[] {
  if (noindex) return [];

  const clean = pathname.replace(/^\/+|\/+$/g, '');

  if (SHARED_STATIC.has(clean)) {
    const trailing = clean ? `${clean}/` : '';
    return [
      { lang: 'en', href: `${DOMAINS.us}/${trailing}` },
      { lang: 'en-US', href: `${DOMAINS.us}/${trailing}` },
      { lang: 'en-GB', href: `${DOMAINS.us}/${trailing}` },
      { lang: 'en-AU', href: `${DOMAINS.au}/${trailing}` },
      { lang: 'de-DE', href: `${DOMAINS.de}/${trailing}` },
      { lang: 'x-default', href: `${DOMAINS.us}/${trailing}` },
    ];
  }

  // Slug check
  const slug = clean;
  const tags: HreflangTag[] = [];

  const inUs = usSet.has(slug);
  const inAu = auSet.has(slug);
  const inDe = deSet.has(slug);

  if (inUs) {
    tags.push({ lang: 'en', href: `${DOMAINS.us}/${slug}/` });
    tags.push({ lang: 'en-US', href: `${DOMAINS.us}/${slug}/` });
    tags.push({ lang: 'en-GB', href: `${DOMAINS.us}/${slug}/` });
    tags.push({ lang: 'x-default', href: `${DOMAINS.us}/${slug}/` });
  }

  if (inAu) {
    tags.push({ lang: 'en-AU', href: `${DOMAINS.au}/${slug}/` });
  }

  if (inDe) {
    tags.push({ lang: 'de-DE', href: `${DOMAINS.de}/${slug}/` });
  }

  return tags;
}
