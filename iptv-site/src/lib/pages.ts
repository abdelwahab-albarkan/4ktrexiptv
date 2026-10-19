import { SITE } from '../config';

export interface KwPage {
  slug: string; keyword: string; volume: number; totalVolume: number; kd: number; cpc: number;
  intent: string; category: string; score: number; related: { k: string; v: number }[];
}

const files = import.meta.glob('../data/pages.*.json', { eager: true }) as Record<string, { default: KwPage[] }>;
const key = Object.keys(files).find(f => f.includes(`pages.${SITE.market}.json`))!;
import required from '../data/required-pages.json';

// Pages that the header, footer and home page link to must always exist, in every market.
const base = files[key].default;
const have = new Set(base.map(p => p.slug));
export const ALL: KwPage[] = [
  ...base,
  ...(required as { slug: string; keyword: string; category: string }[]).filter(r => !have.has(r.slug)).map(r => ({
    slug: r.slug, keyword: r.keyword, volume: 0, totalVolume: 0, kd: 0, cpc: 0, intent: 'informational', category: r.category, score: 0, related: [],
  })),
];

export const bySlug = new Map(ALL.map(p => [p.slug, p]));
export const byCategory = (cat: string) => ALL.filter(p => p.category === cat);
