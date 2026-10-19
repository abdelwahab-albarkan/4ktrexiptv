import { ALL, byCategory, type KwPage } from './pages';

const SMALL = new Set(['for', 'to', 'of', 'in', 'on', 'and', 'the', 'a', 'an', 'vs', 'with', 'für', 'und', 'mit', 'auf', 'der', 'die', 'das', 'zu', 'von', 'über', 'aus', 'am', 'im', 'oder']);
const ACRONYMS: Record<string, string> = { iptv: 'IPTV', tv: 'TV', uk: 'UK', usa: 'USA', nfl: 'NFL', nba: 'NBA', ufc: 'UFC', epg: 'EPG', m3u: 'M3U', pc: 'PC', hd: 'HD', '4k': '4K', hdmi: 'HDMI', apk: 'APK', vpn: 'VPN', dazn: 'DAZN', afl: 'AFL', nrl: 'NRL', f1: 'F1', lg: 'LG', ios: 'iOS', tnt: 'TNT', ip: 'IP', mag: 'MAG', roku: 'Roku', tivimate: 'TiviMate', smarters: 'Smarters', firestick: 'Firestick', rtl: 'RTL', zdf: 'ZDF', ard: 'ARD', nvidia: 'NVIDIA', dsl: 'DSL', lan: 'LAN', wlan: 'WLAN', sd: 'SD', fhd: 'FHD', uhd: 'UHD', xtream: 'Xtream', vlc: 'VLC', kodi: 'Kodi', android: 'Android', apple: 'Apple', samsung: 'Samsung' };
export const titleCase = (s: string) =>
  s.split(' ').map((w, i) => ACRONYMS[w] ?? (i > 0 && SMALL.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1))).join(' ');

export const hash = (s: string) => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
export const pick = <T,>(arr: T[], seed: string, salt = 0) => arr[(hash(seed) + salt * 7919) % arr.length];
export const trimDesc = (s: string, n = 155) => (s.length <= n ? s : s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…');

export function relatedFor(p: KwPage, n = 8): KwPage[] {
  const sameCat = byCategory(p.category).filter(x => x.slug !== p.slug);
  const tokens = new Set(p.keyword.split(' ').filter(w => w.length > 3));
  const scored = ALL.filter(x => x.slug !== p.slug).map(x => {
    const overlap = x.keyword.split(' ').filter(w => tokens.has(w)).length;
    return { x, s: overlap * 10 + (x.category === p.category ? 3 : 0) + Math.log10(x.volume + 1) };
  }).sort((a, b) => b.s - a.s || a.x.slug.localeCompare(b.x.slug));
  const out = scored.slice(0, n - 2).map(s => s.x);
  // always add 2 pages from other categories to spread link equity
  const others = ALL.filter(x => x.category !== p.category && !out.includes(x)).sort((a, b) => hash(p.slug + a.slug) - hash(p.slug + b.slug)).slice(0, 2);
  const all = [...out, ...others].slice(0, n);
  return all.length ? all : sameCat.slice(0, n);
}
