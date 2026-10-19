import { ALL, byCategory, type KwPage } from './pages';
import { CAT_ORDER } from '../config';
import { hash } from './util';

interface LinkTarget {
  phrase: RegExp;
  slug: string;
  label: string;
}

const TARGETS_EN: LinkTarget[] = [
  { phrase: /\b(IPTV Smarters Pro|IPTV Smarters)\b/i, slug: 'iptv-smarters-pro', label: 'IPTV Smarters Pro' },
  { phrase: /\b(TiviMate IPTV Player|TiviMate Player|TiviMate)\b/i, slug: 'tivimate-iptv-player', label: 'TiviMate Player' },
  { phrase: /\b(Amazon Fire TV Stick|Amazon Firestick|Fire TV Stick|Firestick 4K|Firestick)\b/i, slug: 'firestick', label: 'Firestick' },
  { phrase: /\b(Android TV Box|Android TV)\b/i, slug: 'android-tv-box', label: 'Android TV Box' },
  { phrase: /\b(Apple TV 4K|Apple TV)\b/i, slug: 'apple-tv', label: 'Apple TV' },
  { phrase: /\b(Samsung Smart TV|Samsung Tizen)\b/i, slug: 'samsung-smart-tv', label: 'Samsung Smart TV' },
  { phrase: /\b(LG Smart TV|LG webOS)\b/i, slug: 'lg-smart-tv', label: 'LG Smart TV' },
  { phrase: /\b(IBO Player Pro|IBO Player)\b/i, slug: 'ibo-player', label: 'IBO Player' },
  { phrase: /\b(XCIPTV Player|XCIPTV)\b/i, slug: 'xciptv-for-windows', label: 'XCIPTV Player' },
  { phrase: /\b(Trex IPTV)\b/i, slug: 'trex-iptv', label: 'Trex IPTV' },
  { phrase: /\b(Ultra 8K IPTV)\b/i, slug: 'ultra-8k-iptv', label: 'Ultra 8K IPTV' },
  { phrase: /\b(8K IPTV)\b/i, slug: '8k-iptv', label: '8K IPTV' },
  { phrase: /\b(5GLive IPTV|5GLive)\b/i, slug: '5glive-iptv', label: '5GLive IPTV' },
  { phrase: /\b(MegaOTT IPTV|MegaOTT)\b/i, slug: 'megaott-iptv', label: 'MegaOTT' },
  { phrase: /\b(IPTV reseller panel|reseller panel|reseller credits)\b/i, slug: 'category/reseller', label: 'reseller panel' },
  { phrase: /\b(24-hour free trial|24h free trial|free trial)\b/i, slug: 'category/trial', label: '24-hour free trial' },
  { phrase: /\b(live sports streams|live sports in 4K|sports streaming)\b/i, slug: 'category/sports', label: 'live sports streaming' },
];

const TARGETS_DE: LinkTarget[] = [
  { phrase: /\b(Fire TV Stick|Fire TV|Firestick)\b/i, slug: 'firestick', label: 'Fire TV Stick' },
  { phrase: /\b(IPTV Smarters)\b/i, slug: 'iptv-smarters-pro', label: 'IPTV Smarters' },
  { phrase: /\b(TiviMate)\b/i, slug: 'tivimate-iptv-player', label: 'TiviMate' },
  { phrase: /\b(Android TV|Android-Box)\b/i, slug: 'android-tv-box', label: 'Android TV' },
  { phrase: /\b(Apple TV)\b/i, slug: 'apple-tv', label: 'Apple TV' },
  { phrase: /\b(Samsung Smart-TV|Samsung TV)\b/i, slug: 'samsung-smart-tv', label: 'Samsung Smart-TV' },
  { phrase: /\b(LG webOS-Fernseher|LG Smart-TV)\b/i, slug: 'lg-smart-tv', label: 'LG Smart-TV' },
  { phrase: /\b(Trex IPTV)\b/i, slug: 'trex-iptv', label: 'Trex IPTV' },
  { phrase: /\b(Reseller-Panel|Reseller Panel)\b/i, slug: 'category/reseller', label: 'Reseller-Panel' },
  { phrase: /\b(Gratis-Test|kostenloser Test|Test-Account)\b/i, slug: 'category/trial', label: 'Gratis-Test' },
  { phrase: /\b(Bundesliga live|Fußball live)\b/i, slug: 'category/sports', label: 'Live-Sport' },
];

/**
 * Enriches a paragraph with at most ONE natural contextual internal link to avoid spamming.
 */
export function enrichContextLinks(text: string, currentSlug: string, isDe = false): string {
  if (!text || text.includes('<a ')) return text;

  const targets = isDe ? TARGETS_DE : TARGETS_EN;
  let linked = text;
  let linksAdded = 0;

  for (const t of targets) {
    if (t.slug === currentSlug) continue;
    if (t.phrase.test(linked)) {
      // Replace only the first occurrence
      linked = linked.replace(t.phrase, `<a href="/${t.slug}/" class="contextual-link" style="color: var(--primary-light, #c084fc); text-decoration: underline; text-underline-offset: 3px; font-weight: 500;">$1</a>`);
      linksAdded++;
      if (linksAdded >= 1) break; // Maximum 1 link per paragraph block
    }
  }

  return linked;
}

/**
 * Generates an unbroken ring-linked internal web so no page in any category is ever an orphan.
 */
export function getClusterLinks(p: KwPage, semanticRelated: KwPage[] = []): { related: KwPage[]; popular: KwPage[] } {
  const catItems = byCategory(p.category);
  const currentIndex = catItems.findIndex(item => item.slug === p.slug);

  // Ring neighbors within the same category (prev 2, next 2)
  const ringNeighbors: KwPage[] = [];
  if (catItems.length > 1) {
    const prev1 = catItems[(currentIndex - 1 + catItems.length) % catItems.length];
    const next1 = catItems[(currentIndex + 1) % catItems.length];
    const prev2 = catItems[(currentIndex - 2 + catItems.length) % catItems.length];
    const next2 = catItems[(currentIndex + 2) % catItems.length];
    for (const neighbor of [prev1, next1, prev2, next2]) {
      if (neighbor && neighbor.slug !== p.slug && !ringNeighbors.some(x => x.slug === neighbor.slug)) {
        ringNeighbors.push(neighbor);
      }
    }
  }

  // Combine semantic related with ring neighbors, deduplicating
  const seen = new Set<string>([p.slug]);
  const related: KwPage[] = [];

  for (const item of [...semanticRelated, ...ringNeighbors]) {
    if (item && !seen.has(item.slug)) {
      seen.add(item.slug);
      related.push(item);
    }
    if (related.length >= 8) break;
  }

  // Cross-category link equity: select 1 page per other category deterministically
  const otherCats = CAT_ORDER.filter(c => c !== p.category);
  const popular: KwPage[] = [];

  for (const cat of otherCats) {
    const items = byCategory(cat);
    if (items.length > 0) {
      const idx = Math.abs(hash(p.slug + cat)) % items.length;
      popular.push(items[idx]);
    }
    if (popular.length >= 6) break;
  }

  return { related, popular };
}
