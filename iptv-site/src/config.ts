// Build one site per market: SITE_MARKET=us|au|de (see pipeline/build-all.mjs).
export type Market = 'us' | 'au' | 'de';
const env = (globalThis as any).process?.env ?? {};
export const MARKET: Market = (env.SITE_MARKET as Market) || 'us';

const WHATSAPP = '212625218443';
const COMMON = {
  year: 2026,
  orderUrl: `https://wa.me/${WHATSAPP}`,
  trialUrl: `https://wa.me/${WHATSAPP}?text=Hello%2C%20I%20would%20like%20to%20buy%20a%201-year%20subscription`,
  buy1YearUrl: `https://wa.me/${WHATSAPP}?text=Hello%2C%20I%20would%20like%20to%20buy%20a%201-year%20subscription`,
  supportEmail: 'contact@4ktrexiptv.com',
  phone: '+212 625 218 443',
  social: {
    facebook: 'https://web.facebook.com/profile.php?id=61591545360371&_rdc=1&_rdr#',
    instagram: 'https://www.instagram.com/4ktrexiptv/',
    x: 'https://x.com/4ktrexiptv',
    discord: 'https://discord.gg/BFr5HSZfk',
  },
};

// Brand "4K Trex IPTV" (Domain: 4ktrexiptv.com)
const SITES = {
  us: { ...COMMON, market: 'us' as Market, name: '4K Trex IPTV', url: 'https://4ktrexiptv.com', domain: '4ktrexiptv.com', locale: 'en' as const, region: 'USA / UK' },
  au: { ...COMMON, market: 'au' as Market, name: '4K Trex IPTV', url: 'https://au.4ktrexiptv.com', domain: 'au.4ktrexiptv.com', locale: 'en' as const, region: 'Australia' },
  de: { ...COMMON, market: 'de' as Market, name: '4K Trex IPTV', url: 'https://de.4ktrexiptv.com', domain: 'de.4ktrexiptv.com', locale: 'de' as const, region: 'Deutschland' },
};
export const SITE = SITES[MARKET];

// Prices in USD for 1, 2, 3 and 4 accounts (simultaneous connections), per duration.
export const PRICES = [
  { months: 3, prices: [39.99, 59.99, 79.99, 99.99] },
  { months: 6, prices: [56.99, 84.99, 109.99, 134.99] },
  { months: 12, prices: [79.99, 119.99, 149.99, 179.99] },
];
const LABELS = {
  en: {
    names: ['3 Months', '6 Months', '12 Months'],
    notes: ['Good for a single sports season', 'Most popular choice', 'Lowest monthly cost • Full year'],
    badges: ['Seasonal Pass', 'Most Popular', 'Best Value'],
    savings: ['', 'Save 28%', 'Save 50%'],
    acc: (n: number) => `${n} account${n > 1 ? 's' : ''}`,
    perMonth: 'per month from',
  },
  de: {
    names: ['3 Monate', '6 Monate', '12 Monate'],
    notes: ['Ideal für eine Sportsaison', 'Am beliebtesten', 'Niedrigster Monatspreis • 1 Jahr'],
    badges: ['Saison-Pass', 'Am beliebtesten', 'Bester Wert'],
    savings: ['', '28% sparen', '50% sparen'],
    acc: (n: number) => `${n} ${n > 1 ? 'Zugänge' : 'Zugang'}`,
    perMonth: 'pro Monat ab',
  },
}[SITE.locale];
const usd = (n: number) => `$${n.toFixed(2)}`;

export const PLANS = PRICES.map((p, i) => ({
  id: `m${p.months}`,
  months: p.months,
  name: LABELS.names[i],
  note: LABELS.notes[i],
  badge: LABELS.badges[i],
  savings: LABELS.savings[i],
  featured: i === 1,
  tiers: p.prices.map((price, j) => ({
    accounts: j + 1,
    label: LABELS.acc(j + 1),
    price: usd(price),
    rawPrice: price,
    perMonth: usd(price / p.months),
  })),
  perMonthFrom: usd(p.prices[0] / p.months),
  perMonthLabel: LABELS.perMonth,
}));

export const CAT_ORDER = ['providers', 'reseller', 'locations', 'pricing', 'trial', 'devices', 'apps', 'sports', 'setup'];
