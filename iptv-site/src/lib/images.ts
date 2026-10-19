import data from '../data/images.json';
import { SITE } from '../config';
import { hash } from './util';
import type { KwPage } from './pages';

const has = (k: string) => k in (data as Record<string, unknown>);

/** Hero image for a keyword page: entity match first, then category pool. */
export function heroImageFor(p: KwPage): string {
  const kw = p.keyword;
  const rules: [RegExp, string][] = [
    [/fire ?stick|fire ?tv|firetv/, 'setup-firestick-guide'],
    [/apple ?tv|appletv|tvos/, 'setup-appletv-guide'],
    [/iphone|ipad|\bios\b/, 'scene-iphone'],
    [/samsung|tizen/, 'setup-samsung-guide'],
    [/\blg\b|webos/, 'setup-lgtv-guide'],
    [/android tv|android box|google tv|shield/, 'setup-androidtv-guide'],
    [/android|phone|mobile|handy/, 'scene-phone-stream'],
    [/windows|\bpc\b|laptop|mac\b|vlc/, 'setup-winpc-guide'],
    [/mag ?(box|\d)|formuler|portal|set top|settop|receiver/, 'dev-mag'],
    [/\bepg\b|tv guide|programm/, 'setup-epg'],
    [/m3u|playlist|xtream/, 'setup-m3u'],
    [/buffer|freeze|ruckel|lag|slow/, 'infra-zerobuffer'],
    [/not working|funktioniert nicht|no picture|kein bild|error/, 'ts-nopicture'],
    [/wifi|wlan|network|router|ethernet|lan\b/, 'setup-network'],
    [/install|einricht|setup|set up/, 'setup-install'],
    [/4k|uhd|8k|hdr/, 'guide-quality-4k-uhd'],
    [/vpn/, 'infra-vpn-guard'],
    [/legal|legality|illegal|rechtlich/, 'guide-legal'],
    [/nfl|redzone|sunday ticket|super bowl|american football/, 'sport-nfl'],
    [/nba|basketball|league pass|wnba/, 'sport-nba'],
    [/ufc|boxing|boxen|fight|ppv/, 'sport-boxing'],
    [/\bf1\b|formula|formel|motorsport/, 'sport-f1'],
    [/baseball|mlb/, 'sport-baseball'],
    [/bundesliga/, 'sport-bundesliga-stadium'],
    [/premier league|champions league|football|fussball|fußball|soccer/, SITE.market === 'de' ? 'sport-fussball-live' : 'sport-football-strike'],
    [/compare|vergleich|versus|\bvs\b|alternative/, 'info-cable-iptv'],
    [/reseller|supplier|suppliers/, 'info-anbieter-2026'],
    [/support|whatsapp/, 'biz-whatsapp'],
  ];
  const auRules: [RegExp, string][] = SITE.market === 'au' ? [
    [/cricket|ipl|ashes|big bash|test match/, 'sport-cricket-aus'],
    [/\bnrl\b|rugby league|state of origin/, 'au-nrl'],
    [/\bafl\b|aussie rules/, 'au-afl'],
    [/\bnbl\b/, 'au-nbl'],
    [/\bf1\b|formula/, 'au-f1'],
  ] : [];
  const extraRules: [RegExp, string][] = [
    [/ufc|mma/, 'sport-ufc'],
    [/premier league/, 'sport-premier'],
    [/roku/, 'prod-roku'],
    [/playstation|ps5|ps4/, 'prod-playstation'],
    [/xbox/, 'prod-xbox'],
    [/chromecast|cast\b/, 'prod-chromecast'],
    [/tivimate/, 'logo-tivimate'],
    [/ibo ?player|ibo pro/, 'logo-ibo'],
    [/smart ?iptv|siptv|ss ?iptv/, 'logo-smartiptv'],
    [/smart ?stb/, 'logo-smartstb'],
    [/hisense/, 'prod-hisense'],
    [/\btcl\b/, 'prod-tcl'],
    [/sony/, 'prod-sony'],
    [/payment|pay\b|paypal|crypto|bitcoin/, 'pay-safe-banner'],
    [/how does iptv work|what is iptv|was ist iptv|wie funktioniert/, 'info-kabel-vs-iptv'],
  ];
  for (const [re, key] of [...auRules, ...rules, ...extraRules]) if (re.test(kw) && has(key)) return key;

  const pools: Record<string, string[]> = {
    providers: ['info-anbieter-2026', 'info-provider-compare', 'biz-providers', 'infra-server', 'scene-living-hero', 'scene-smart-living'],
    reseller: ['biz-providers', 'info-anbieter-2026', 'infra-server', 'pay-safe-banner', 'img-images-provider-comparison', 'img-images-vod-dashboard'],
    locations: ['infra-server', 'scene-living-hero', 'sport-stadium-night', 'scene-smart-living', 'img-images-iptv-deutschland'],
    pricing: ['pay-safe-banner', 'biz-pricing', 'ui-cinema', 'scene-premium'],
    trial: ['scene-family-tv', 'biz-trial', 'scene-living-hero', 'home-streaming'],
    devices: ['devices-collection', 'scene-multi-trio', 'scene-frameless-tv', 'scene-wall-tv', 'img-images-devices-devices-collection'],
    apps: ['ui-beste-apps', 'ui-google-dashboard', 'ui-iptv-apps-hub', 'setup-m3u', 'img-images-apps-dashboard'],
    sports: SITE.market === 'au' ? ['sport-cricket-aus', 'au-nrl', 'au-afl', 'au-f1']
      : SITE.market === 'de' ? ['sport-bundesliga-stadium', 'sport-fussball-live', 'sport-stadium-night']
      : ['sport-football-strike', 'sport-stadium-night', 'sport-nfl', 'sport-nba'],
    setup: ['setup-firestick-guide', 'setup-androidtv-guide', 'setup-samsung-guide', 'setup-steps'],
  };
  const pool = (pools[p.category] ?? pools.providers).filter(has);
  return pool[hash(p.slug) % pool.length];
}

/** A second, different image to break up long articles. */
export function inlineImageFor(p: KwPage, heroKey: string): string {
  const pools: Record<string, string[]> = {
    providers: ['infra-server', 'info-vergleich-editorial', 'ui-vod', 'infra-vpn-guard'],
    reseller: ['infra-server', 'pay-safe-banner', 'biz-whatsapp', 'img-images-safe-payment'],
    locations: ['scene-living-hero', 'sport-sunset-stadium', 'ui-vod', 'scene-heimkino'],
    pricing: ['pay-safe-banner', 'ui-vod', 'scene-family-tv'],
    trial: ['biz-whatsapp', 'ui-beste-apps', 'scene-smart-living'],
    devices: ['scene-frameless-tv', 'scene-smart-remote', 'setup-network', 'devices-collection', 'img-images-devices-smart-tv-wall'],
    apps: ['ui-google-iptv', 'setup-epg', 'ui-samsung-apps', 'ui-beste-apps'],
    sports: ['sport-sunset-stadium', 'sport-stadium-night', 'ui-family', 'scene-heimkino', 'img-images-stadium-sunset-match'],
    setup: ['guide-howto', 'infra-zerobuffer', 'setup-network', 'ts-connection'],
  };
  const pool = (pools[p.category] ?? pools.providers).filter(k => has(k) && k !== heroKey);
  return pool[hash(p.slug + 'inline') % pool.length];
}

export const categoryImage: Record<string, string> = {
  providers: 'info-anbieter-2026',
  reseller: 'biz-providers',
  locations: 'infra-server',
  pricing: 'pay-safe-banner',
  trial: 'scene-family-tv',
  devices: 'devices-collection',
  apps: 'ui-beste-apps',
  sports: 'sport-stadium-night',
  setup: 'setup-firestick-guide',
};
