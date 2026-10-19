import type { Section } from './content';
import { titleCase } from './util';

export interface Entity {
  id: string;
  label: string;
  re: RegExp;
  build: (kw: string) => Section;
}

const NOTE_RIGHTS = 'Availability of channels and sporting events depends on regional broadcast licenses and carriage rights. Always verify coverage for your specific country and test live feeds during peak hours with a free trial.';

export const PROVIDERS: Entity[] = [
  {
    id: 'trex',
    label: 'Trex IPTV',
    re: /trex/i,
    build: kw => ({
      h2: `Trex IPTV Performance & Architecture for ${titleCase(kw)}`,
      paras: [
        'Trex IPTV operates on a Tier-1 multi-continental server network with over 150 dedicated CDN edge nodes. It is recognized as the industry standard for high-bandwidth sports broadcasting, including Premier League, NFL, Champions League, and UFC PPV events with zero lag.',
        'The service features an automated load-balancing engine that prevents server choking during peak match hours. Both M3U links and Xtream Codes API connections are supported with instant channel zapping under 0.4 seconds.',
      ],
      list: [
        '51,000+ worldwide live streams with native 4K UHD and FHD 60fps feeds.',
        'Over 200,000 VOD movies and complete TV series updated every 48 hours.',
        'Full EPG TV guide integration with multi-language metadata.',
        'Reseller panel availability with instantaneous credit top-up and sub-reseller creation.',
      ],
    }),
  },
  {
    id: 'ultra8k',
    label: 'Ultra 8K IPTV',
    re: /ultra ?8k/i,
    build: kw => ({
      h2: `Ultra 8K IPTV UHD Streaming Specifications for ${titleCase(kw)}`,
      paras: [
        'Ultra 8K IPTV is engineered specifically for large-screen 4K and 8K Smart TVs. Utilizing advanced H.265 (HEVC) high-bitrate encoding, it delivers superior color depth, contrast, and crystal-clear image sharpness without demanding extreme internet bandwidth.',
        'Each account allows up to 5 simultaneous multi-room device connections, making it an ideal choice for households and sports bars.',
      ],
      list: [
        'True 8K and 4K Ultra HD streams with 60 FPS refresh rates.',
        'Over 45,000 live channels and 200,000 on-demand titles.',
        'Built-in Anti-Freeze 9.8 algorithm with dynamic packet retransmission.',
        'Comprehensive compatibility with TiviMate, IPTV Smarters Pro, and Formuler MyTVOnline.',
      ],
    }),
  },
  {
    id: '8k',
    label: '8K IPTV',
    re: /\b8k\b/i,
    build: kw => ({
      h2: `8K IPTV Infrastructure & Lineup for ${titleCase(kw)}`,
      paras: [
        '8K IPTV is one of the most established and reliable services in the IPTV ecosystem. It maintains an independently verified 99.98% server uptime track record backed by redundant European and American datacenters.',
      ],
      list: [
        '45,000+ live premium channels with automated backup stream redundancy.',
        '150,000+ movies, documentaries, and TV seasons with multi-language subtitles.',
        'Fast channel switching with zero buffering on 25+ Mbps broadband connections.',
        'Proven reseller credit system with wholesale pricing and no credit expiry.',
      ],
    }),
  },
  {
    id: '5glive',
    label: '5GLive IPTV',
    re: /5glive/i,
    build: kw => ({
      h2: `5GLive IPTV Regional Streaming Features for ${titleCase(kw)}`,
      paras: [
        '5GLive IPTV is the premier choice for Asian, Middle Eastern, and Commonwealth expatriates. It features dedicated server clusters in Mumbai, Dubai, London, and Singapore for ultra-low latency playback.',
      ],
      list: [
        'Unrivaled Bollywood, Hindi, Urdu, Punjabi, Tamil, and Arabic channel catalogs.',
        'Complete Cricket world coverage: IPL, ICC World Cup, Big Bash, and Test series.',
        'Dedicated lightweight Android APK optimized for low-spec TV boxes and mobile devices.',
        'High-profit margin reseller panel program with specialized regional customer support.',
      ],
    }),
  },
  {
    id: 'crystal',
    label: 'Crystal IPTV',
    re: /crystal/i,
    build: kw => ({
      h2: `Crystal IPTV Premium Interface & Stability for ${titleCase(kw)}`,
      paras: [
        'Crystal IPTV is praised for its clean user experience, absence of server noise, and high-quality EPG guide data. It caters to discerning viewers who prioritize stream cleanliness and premium international channel categorization.',
      ],
      list: [
        'Curated selection of top-tier European, North American, and Latin channels.',
        'VIP customer support desk with sub-hour resolution timeframes.',
        'Optimized for smart TV applications (Samsung Tizen, LG webOS) via IBO Player Pro.',
      ],
    }),
  },
  {
    id: 'megaott',
    label: 'MegaOTT',
    re: /mega ?ott/i,
    build: kw => ({
      h2: `MegaOTT Platform Overview for ${titleCase(kw)}`,
      paras: [
        'MegaOTT operates as a modern over-the-top streaming platform offering branded mobile and Android TV apps, 27,000+ channels, 150,000+ VOD titles, and high-uptime European infrastructure.',
      ],
      list: [
        '27,000+ live TV channels spanning 70+ countries with Full HD and 4K quality.',
        'Custom-branded Android and Smart TV apps with automatic playlist synchronization.',
        'Multi-connection household subscriptions supporting simultaneous streams.',
        'High-margin reseller panel with instant credit deployment.',
      ],
    }),
  },
  {
    id: 'zen4k',
    label: 'Zen 4K = King4K',
    re: /zen ?4k|king ?4k/i,
    build: kw => ({
      h2: `Zen 4K (King4K) VIP Streaming Architecture for ${titleCase(kw)}`,
      paras: [
        'Zen 4K (also recognized as King4K) is widely regarded as the French and European benchmark for uncompressed video quality. Feeds are captured directly from satellite sources and broadcast in true 50 FPS without lossy downscaling.',
        'With dedicated private server capacity, Zen 4K eliminates buffering entirely during high-traffic Champions League and derby matches.',
      ],
      list: [
        'Direct satellite 50 FPS feeds for Canal+, BeIN Sports, and RMC in pristine 4K.',
        'Over 180,000 VOD movies and complete series with Dolby Atmos sound.',
        'Compatible with TiviMate, iPlayTV, Apple TV 4K, and Smart TV players.',
        'VIP private clusters with strictly managed subscriber bandwidth.',
      ],
    }),
  },
  {
    id: 'dino',
    label: 'Dino IPTV',
    re: /dino ?(iptv|ott|tv)?/i,
    build: kw => ({
      h2: `Dino IPTV Performance & Channels for ${titleCase(kw)}`,
      paras: [
        'Dino IPTV is celebrated throughout France, Belgium, and North Africa for steady, uninterrupted broadcasting. Operating on multi-CDN nodes, it offers cleanly structured bouquets and fast channel zapping.',
      ],
      list: [
        '38,000+ live channels with constant high-bitrate streaming.',
        'Extensive French, Belgian, Dutch, UK, and Arabic channel packs.',
        '99.96% SLA uptime guarantee tested during peak weekend sports.',
        'Full support for Xtream Codes API and M3U playlists across all players.',
      ],
    }),
  },
  {
    id: 'strong',
    label: 'Strong IPTV',
    re: /strong ?(iptv|4k|8k)?/i,
    build: kw => ({
      h2: `Strong IPTV 4K & 8K Streaming Specifications for ${titleCase(kw)}`,
      paras: [
        'Strong IPTV delivers high-fidelity streams tailored for modern 4K and 8K OLED screens. Utilizing advanced H.265 video compression, it maintains vibrant color contrast and sharp motion clarity.',
      ],
      list: [
        'Native 4K and 8K streaming profiles with 60 FPS refresh rates.',
        '45,000+ live premium channels and 160,000+ on-demand movies.',
        'Multi-language audio tracks and subtitles on live sports feeds.',
        'Anti-freeze protocol filtering internet provider throttling.',
      ],
    }),
  },
  {
    id: 'forever',
    label: 'Forever Server & Apollo IPTV',
    re: /forever|apollo|forever ?vip/i,
    build: kw => ({
      h2: `Forever Server (Apollo IPTV & Forever VIP) for ${titleCase(kw)}`,
      paras: [
        'Forever Server is the undisputed global leader in digital satellite sharing (IKS) and Apollo IPTV. Powering millions of Geant, Starsat, Mediastar, and Tiger receivers, it decrypts encrypted satellite packages across Astra 19.2E and Hotbird with zero broadband delay.',
      ],
      list: [
        'The #1 satellite decoding server globally with Forever VIP (SP1 & SP2) codes.',
        'Unlocks French Canal+, Spanish Movistar+, and Sky via satellite dish.',
        'Includes Apollo IPTV access for streaming without a satellite dish.',
        'Simple annual renewal via the receiver serial number.',
      ],
    }),
  },
  {
    id: 'funcam',
    label: 'Funcam Server',
    re: /funcam/i,
    build: kw => ({
      h2: `Funcam Satellite IKS Server Renewal for ${titleCase(kw)}`,
      paras: [
        'Funcam is the global benchmark for satellite sharing on budget digital decoders (Starsat, Geant, Echolink, Tiger). It decrypts satellite channels using minimal internet bandwidth, making it ideal for rural and DSL connections.',
      ],
      list: [
        'Zero buffering: TV video feeds arrive via satellite dish, not broadband streaming.',
        'Decodes French TNT, Canal+, and European packages on Astra 19.2E and Hotbird.',
        'Instant 12-month renewal via your receiver 12-digit serial number.',
        'Minimal data consumption (runs smoothly even over 2G/3G mobile data).',
      ],
    }),
  },
  {
    id: 'iron',
    label: 'Iron TV Pro',
    re: /iron ?(tv|pro|max)?/i,
    build: kw => ({
      h2: `Iron TV Pro (Iron 4K) Performance & App Setup for ${titleCase(kw)}`,
      paras: [
        'Iron TV Pro has achieved legendary status in France, Algeria, and Morocco. With its dedicated Android application and numeric activation codes, Iron delivers a rock-solid, zero-freeze sports experience.',
      ],
      list: [
        'Dedicated Iron TV Pro APK with sub-second channel tuning.',
        'Guaranteed uptime on French Canal+, beIN Sports, and DAZN feeds.',
        'Vast on-demand cinema library with automatic French subtitles.',
        'Foolproof numeric code activation on Android TV and Firestick.',
      ],
    }),
  },
  {
    id: 'king365',
    label: 'King 365 TV',
    re: /king ?365|king365/i,
    build: kw => ({
      h2: `King 365 TV (King365TV) Private Benchmark for ${titleCase(kw)}`,
      paras: [
        'King 365 (King365TV) is revered across France, Switzerland, and Belgium as the gold standard of private IPTV. By strictly controlling its subscriber quota and operating on dedicated private clusters, King365TV guarantees zero buffering on Canal+, beIN, and RMC even during Champions League finals.',
      ],
      list: [
        'Strictly capped server capacity guarantees zero congestion during peak matches.',
        'Direct satellite capture feeds with pristine 50 FPS and native audio tracks.',
        'Official King365TV application with smooth channel guide and replay.',
        'The most respected name in French IPTV for over 8 consecutive years.',
      ],
    }),
  },
  {
    id: 'orca',
    label: 'Orca IPTV & Orca Pro Plus',
    re: /orca/i,
    build: kw => ({
      h2: `Orca Pro Plus & Icone Satellite Server for ${titleCase(kw)}`,
      paras: [
        'Orca is a household titan across North Africa and the Arab world. Originally built for Icone 4K satellite decoders (Iron, Wegoo), Orca also provides the widely acclaimed Orca Pro Plus Android application.',
      ],
      list: [
        'Dual capability: Icone satellite IKS decoding + standalone Android IPTV.',
        'Official Orca Pro Plus APK with modern dark UI and rapid zapping.',
        'Comprehensive coverage of French, Arabic, and African sports packages.',
        'Vast 4K movie and Ramadan TV series catalog updated daily.',
      ],
    }),
  },
  {
    id: 'atlaspro',
    label: 'Atlas Pro ONTV',
    re: /atlas ?(pro|ontv)?/i,
    build: kw => ({
      h2: `Atlas Pro ONTV Private Infrastructure for ${titleCase(kw)}`,
      paras: [
        'Atlas Pro ONTV is an iconic streaming brand across France and the Maghreb. Powered by a heavily fortified private streaming cluster, Atlas Pro guarantees uninterrupted broadcasting on French, Arabic, and European sports.',
      ],
      list: [
        'Proprietary Atlas Pro ONTV Android APK with built-in player and EPG.',
        'Zero-freeze track record on French Canal+, beIN Sports, and DAZN feeds.',
        'Massive VOD archive with French audio, VOSTFR, and Arabic dubbing.',
        'Simple activation code renewal with instant account provisioning.',
      ],
    }),
  },
  {
    id: 'suptv',
    label: 'Sup TV Enigma2 & Android',
    re: /sup ?tv|suptv/i,
    build: kw => ({
      h2: `Sup TV (SupTV Enigma2 & Android) Hybrid for ${titleCase(kw)}`,
      paras: [
        'Sup TV is the undisputed benchmark for Linux Enigma2 decoders (Vu+, Dreambox) and Android devices. It unifies satellite dish decoding (Astra 19.2E, Hotbird) with high-bitrate IPTV streaming in a single subscription.',
      ],
      list: [
        'Dual capability: Satellite card sharing (IKS) + 4K IPTV streaming.',
        'Custom IPK plugin designed specifically for OpenATV, OpenPLi, and BlackHole.',
        'Instant opening of Canal+, Movistar, and Sky without satellite internet delay.',
        'Official SupTV Android application for mobile and TV box activation.',
      ],
    }),
  },
  {
    id: 'supcam',
    label: 'Supcam Enigma2',
    re: /supcam/i,
    build: kw => ({
      h2: `Supcam Enigma2 Softcam Plugin for ${titleCase(kw)}`,
      paras: [
        'Supcam Enigma is the premier cam plugin for Linux Enigma2 satellite receivers (Vu+ Solo/Zero/Duo, Dreambox, Gigablue, Octagon). It opens Astra and Hotbird encrypted satellite channels with instant channel zapping and zero freeze.',
      ],
      list: [
        'Dedicated Linux Enigma2 softcam plugin engineered for Vu+ and Dreambox receivers.',
        'Flawless decryption of French Canal+, Spanish Movistar+, and Sky channels via dish.',
        'Integrated high-definition IPTV streams for channels outside satellite dish range.',
        'Simple activation code entry directly inside the receiver GUI plugin.',
      ],
    }),
  },
  {
    id: 'myhd',
    label: 'My HD IPTV',
    re: /my ?hd/i,
    build: kw => ({
      h2: `My HD (MyHD IPTV) Arabic & Gulf Streaming for ${titleCase(kw)}`,
      paras: [
        'My HD IPTV is the benchmark across Morocco, Algeria, Tunisia, and the Gulf States. It features comprehensive bouquets for OSN, Shahid VIP, MBC HD, Rotana, and beIN Sports alongside European leagues.',
      ],
      list: [
        'Best-in-class coverage of Arabic cinema, Ramadan series, and Gulf TV.',
        'Full beIN Sports HD & 4K feeds with Arabic commentary options.',
        'Simple activation via username/password or dedicated MyHD APK code.',
        'Dedicated Middle Eastern and European CDN servers for minimal latency.',
      ],
    }),
  },
  {
    id: 'cobra',
    label: 'Cobra IPTV (Cobra Plus)',
    re: /cobra ?(iptv|plus)?/i,
    build: kw => ({
      h2: `Cobra IPTV (Cobra Plus) Setup & Features for ${titleCase(kw)}`,
      paras: [
        'Cobra IPTV is a classic household name with millions of active subscribers across North Africa and the Middle East. Its popularity stems from its foolproof code activation on the official Cobra Plus APK.',
      ],
      list: [
        'Simple activation code entry on the official Cobra Plus Android app.',
        'Millions of satisfied subscribers across Morocco, Algeria, France, and the Middle East.',
        'Massive live television selection covering sports, cinema, news, and kids TV.',
        'Very competitive pricing for 6 and 12-month subscription tiers.',
      ],
    }),
  },
  {
    id: 'espro',
    label: 'ES IPTV Pro',
    re: /es ?(iptv|pro)/i,
    build: kw => ({
      h2: `ES IPTV Pro (ES Pro) Code Activation for ${titleCase(kw)}`,
      paras: [
        'ES IPTV Pro is widely used in Morocco and Europe for its dead-simple 10-digit code activation. It provides instant access to thousands of live channels and fresh VOD movies on any Android device.',
      ],
      list: [
        'Foolproof 10-digit numeric code activation on ES IPTV Pro application.',
        'Huge collection of French, Arabic, Spanish, and international channels.',
        'Dedicated sports categories with multiple stream server backups.',
        'Extensive VOD movies and Ramadan series updated continuously.',
      ],
    }),
  },
];

export const RESELLER: Entity[] = [
  {
    id: 'reseller-panel',
    label: 'IPTV Reseller Panel',
    re: /reseller|panel|wholesale|credits?|sub-reseller/i,
    build: kw => ({
      h2: `Understanding the IPTV Reseller Panel System for ${titleCase(kw)}`,
      paras: [
        'An IPTV Reseller Panel is a centralized cloud portal that enables digital entrepreneurs to launch their own streaming brand without purchasing expensive server hardware. Resellers buy credits in bulk at wholesale rates (between $7.50 and $15.00 per 12-month credit) and sell subscriptions at retail prices ($60.00 to $90.00), pocketing up to 85% profit margins.',
        'From the dashboard, you have full administrative authority to generate instant 24-hour test trials, activate monthly or annual subscriptions, lock MAC addresses for MAG boxes, and monitor active viewer statistics.',
      ],
      list: [
        'Instantaneous line generation: Create M3U playlist links or Xtream Codes logins in seconds.',
        'Custom DNS & White-Labeling: Use your own server domain name and logo on customer-facing apps.',
        'Sub-Reseller Management: Sell credit packages to your own network of sub-resellers and earn override profits.',
        'Zero Infrastructure Maintenance: Server patching, channel additions, and VOD updates are handled by the main provider.',
      ],
    }),
  },
];

export const DEVICES: Entity[] = [
  {
    id: 'firestick',
    label: 'Amazon Fire TV / Firestick',
    re: /fire ?stick|fire ?tv|firetv/i,
    build: kw => ({
      h2: `${titleCase(kw)} Setup Guide on Amazon Fire TV & Firestick 4K`,
      paras: [
        'Amazon Firestick is the most popular streaming device for IPTV due to its high-performance hardware decoding, affordability, and open Fire OS ecosystem. It easily handles 4K 60fps streams when configured with hardware acceleration.',
      ],
      steps: [
        'Install the free "Downloader" app directly from the Amazon Appstore.',
        'Navigate to Settings > My Fire TV > Developer Options and toggle "Install unknown apps" to ON for Downloader.',
        'Open Downloader and enter the quick download code for your chosen IPTV player (e.g., TiviMate or IPTV Smarters Pro).',
        'Launch the installed player app, select "Login with Xtream Codes API", and input your server URL, username, and password.',
        'Allow the channel categories, EPG TV guide, and VOD libraries to synchronize completely before watching.',
      ],
    }),
  },
  {
    id: 'android',
    label: 'Android TV & Google TV',
    re: /android|nvidia|shield|\bbox\b|google tv/i,
    build: kw => ({
      h2: `${titleCase(kw)} on Android TV & Nvidia Shield Pro`,
      paras: [
        'Android TV, Google TV, and dedicated streaming boxes like the Nvidia Shield Pro offer the gold standard in IPTV performance with gigabit Ethernet ports, up to 3 GB of RAM, and native Google Play Store access for player apps.',
      ],
      list: [
        'Install TiviMate Premium or IPTV Smarters Pro directly from Google Play without sideloading.',
        'Utilize a wired Ethernet connection to guarantee zero latency during high-bitrate 4K sports events.',
        'Enable Hardware Acceleration (HW+) in the player settings to reduce CPU load and prevent thermal throttling.',
      ],
    }),
  },
  {
    id: 'apple',
    label: 'Apple TV & iOS Devices',
    re: /apple tv|iphone|ipad|\bios\b|tvos|mac\b/i,
    build: kw => ({
      h2: `${titleCase(kw)} on Apple TV 4K & iPhone / iPad`,
      paras: [
        'Apple TV 4K delivers exceptional color calibration and fast processing power. To stream IPTV on tvOS or iOS, download a certified player app from the Apple App Store such as GSE Smart IPTV, IPTVX, or Smarters Player Lite.',
      ],
      list: [
        'Apple TV 4K with Gigabit Ethernet ensures the smoothest frame pacing for live soccer and basketball.',
        'AirPlay 2 allows you to cast streams instantly from an iPhone or iPad to your living room television.',
        'Ensure automatic app background refresh is enabled so the EPG XMLTV guide updates regularly.',
      ],
    }),
  },
  {
    id: 'samsung-lg',
    label: 'Samsung & LG Smart TVs',
    re: /samsung|tizen|\blg\b|webos/i,
    build: kw => ({
      h2: `${titleCase(kw)} on Samsung Smart TV (Tizen) & LG (webOS)`,
      paras: [
        'Modern Samsung and LG Smart TVs feature dedicated IPTV applications available directly inside the Samsung App Store and LG Content Store. The most reliable native players are IBO Player Pro, Smart IPTV (SIPTV), and Hot Player.',
      ],
      steps: [
        'Open the TV app store and install "IBO Player Pro" or "Smart IPTV".',
        'Open the app and take note of the displayed Device MAC address and Device Key.',
        'Visit the app activation portal on your phone or computer, enter the TV MAC address, and paste your Xtream Codes or M3U playlist link.',
        'Restart the application on your TV; your full channel package and TV guide will load instantly.',
      ],
    }),
  },
  {
    id: 'mag-formuler',
    label: 'MAG & Formuler Boxes',
    re: /\bmag\b|mag ?\d{3}|formuler|z11|z8|portal/i,
    build: kw => ({
      h2: `${titleCase(kw)} on MAG & Formuler Z11 Pro Max`,
      paras: [
        'MAG boxes (Infomir) and Formuler units (MyTVOnline 3) are purpose-built dedicated IPTV receivers. They offer traditional remote control numerical keypad zapping, hardware channel buffering, and STB portal connectivity.',
      ],
      steps: [
        'Connect the MAG or Formuler box to your router using a physical Ethernet cable.',
        'Go to Settings > System Settings > Servers > Portals.',
        'Enter Portal 1 Name (e.g., 4K Trex IPTV) and type the Portal URL supplied by your provider.',
        'Save settings and reboot the device to authenticate your MAC address with the server.',
      ],
    }),
  },
];

export const APPS: Entity[] = [
  {
    id: 'smarters',
    label: 'IPTV Smarters Pro',
    re: /smarters/i,
    build: kw => ({
      h2: `Configuring IPTV Smarters Pro for ${titleCase(kw)}`,
      paras: [
        'IPTV Smarters Pro is the global benchmark IPTV player application, compatible with Android, iOS, Windows, macOS, Firestick, and Smart TVs. It delivers a modern, intuitive dashboard that separates Live TV, Movies, Series, and Catch-Up.',
      ],
      steps: [
        'Launch IPTV Smarters Pro and select "Login with Xtream Codes API".',
        'Enter Any Name (e.g., My IPTV), your assigned Username, Password, and Server URL (http://domain.com:port).',
        'Click "Add User" and wait for the channel lists and EPG to download.',
        'Navigate to Settings > Stream Format and select "HLS (.m3u8)" or "MPEG-TS (.ts)" depending on your connection stability.',
      ],
    }),
  },
  {
    id: 'tivimate',
    label: 'TiviMate Premium',
    re: /tivimate/i,
    build: kw => ({
      h2: `Optimizing TiviMate IPTV Player for ${titleCase(kw)}`,
      paras: [
        'TiviMate is widely regarded as the most powerful and visually refined IPTV player for Android TV and Firestick. It features a cable-box style electronic program guide, multi-screen viewing (up to 4 channels simultaneously), automated channel sorting, and manual recording.',
      ],
      list: [
        'Add your playlist using Xtream Codes API to automatically bind the EPG XMLTV source.',
        'Set the Buffer Size to "Large" in Settings > Playback to eliminate micro-stutters during live sports.',
        'Customize Channel Groups to hide foreign or unwanted languages, accelerating guide load times.',
      ],
    }),
  },
];

export const SPORTS: Entity[] = [
  {
    id: 'premier',
    label: 'Premier League & Champions League',
    re: /premier|champions league|epl|soccer|football/i,
    build: kw => ({
      h2: `${titleCase(kw)}: Live Football & 4K Match Day Streaming`,
      paras: [
        'Streaming live Premier League and UEFA Champions League requires sustained 60 FPS feeds so fast ball movement remains razor-sharp. Our server network includes dedicated 4K and FHD feeds for Sky Sports, TNT Sports, Optus Sport, DAZN, and US network broadcasts.',
        NOTE_RIGHTS,
      ],
      list: [
        '60 FPS high frame rate feeds across all major English and European sports channels.',
        'Full Saturday 3:00 PM UK blackout matches available via international feeds.',
        'Backup alternative stream channels available for every high-profile derby match.',
      ],
    }),
  },
  {
    id: 'nfl-nba',
    label: 'NFL & NBA Streaming',
    re: /nfl|nba|super bowl|redzone|sunday ticket|league pass/i,
    build: kw => ({
      h2: `${titleCase(kw)}: NFL RedZone & NBA League Pass Coverage`,
      paras: [
        'Experience every touchdown and buzzer-beater with complete NFL Sunday Ticket, NFL RedZone, and NBA League Pass coverage. All local US CBS, FOX, NBC, and ESPN network affiliates are provided without regional blackouts.',
        NOTE_RIGHTS,
      ],
    }),
  },
  {
    id: 'combat',
    label: 'UFC & Boxing PPV',
    re: /ufc|boxing|ppv|fight|dazn/i,
    build: kw => ({
      h2: `${titleCase(kw)}: UFC Pay-Per-View & Championship Boxing`,
      paras: [
        'Catch every UFC Main Card, Prelims, and blockbuster Boxing championship pay-per-view event included with your service. Dedicated PPV event channels are spun up 4 hours prior to fight time with full 1080p and 4K quality.',
        NOTE_RIGHTS,
      ],
    }),
  },
];

export const LOCATIONS: Entity[] = [
  {
    id: 'usa',
    label: 'USA',
    re: /\busa\b|\bus\b|america|united states/i,
    build: kw => ({
      h2: `${titleCase(kw)}: USA Market Performance & CDN Routing`,
      paras: [
        'For American viewers, server proximity to East and West Coast datacenters is essential for buffer-free streaming. We maintain high-bandwidth edge servers in New York, Chicago, Dallas, and Los Angeles that bypass common ISP throttling from Comcast Xfinity, AT&T, Spectrum, and Verizon Fios.',
      ],
    }),
  },
  {
    id: 'uk',
    label: 'UK',
    re: /\buk\b|british|united kingdom|england|london/i,
    build: kw => ({
      h2: `${titleCase(kw)}: United Kingdom ISP Optimization`,
      paras: [
        'UK internet service providers (BT, Sky, Virgin Media, TalkTalk) frequently deploy automated dynamic traffic management during Saturday football matches. Utilizing our Anti-Freeze protocol or changing your router DNS to Cloudflare (1.1.1.1) eliminates these throttling slowdowns completely.',
      ],
    }),
  },
  {
    id: 'au',
    label: 'Australia',
    re: /australia|\baus\b|sydney|melbourne/i,
    build: kw => ({
      h2: `${titleCase(kw)}: Australia Low-Latency Streaming`,
      paras: [
        'Australian streaming requires dedicated Sydney and Melbourne edge servers to prevent high round-trip packet latency from Europe. Our Australian streams connect directly to local CDN POPs for seamless AFL, NRL, and cricket broadcasting.',
      ],
    }),
  },
  {
    id: 'ca',
    label: 'Canada',
    re: /canada|toronto|vancouver/i,
    build: kw => ({
      h2: `${titleCase(kw)}: Canada NHL & Local Network Coverage`,
      paras: [
        'Canadian subscribers enjoy complete Sportsnet, TSN, and local CBC/CTV/TVA feeds with regional NHL game coverage without regional blackouts, delivered across low-latency Toronto and Montreal CDN nodes.',
      ],
    }),
  },
];

export function detect(kw: string): Section[] {
  const out: Section[] = [];
  const hit = (list: Entity[], max: number) =>
    list.filter(e => e.re.test(kw)).slice(0, max).forEach(e => out.push(e.build(kw)));

  hit(PROVIDERS, 1);
  hit(RESELLER, 1);
  hit(DEVICES, 1);
  hit(APPS, 1);
  hit(SPORTS, 1);
  hit(LOCATIONS, 1);

  return out;
}

export function facts(kw: string, cat: string): [string, string][] {
  const find = (list: Entity[]) => list.find(e => e.re.test(kw))?.label;
  const rows: [string, string][] = [['Primary Topic', kw]];

  const p = find(PROVIDERS); if (p) rows.push(['Featured Provider', p]);
  const r = find(RESELLER); if (r) rows.push(['Program Type', r]);
  const d = find(DEVICES); if (d) rows.push(['Hardware Device', d]);
  const a = find(APPS); if (a) rows.push(['Player App', a]);
  const s = find(SPORTS); if (s) rows.push(['Sports Coverage', s]);
  const l = find(LOCATIONS); if (l) rows.push(['Target Region', l]);

  rows.push(['Server SLA Uptime', '99.98% Monitored']);
  rows.push(['Anti-Freeze Version', 'v9.8 AI Load-Balancing']);
  rows.push(['Recommended Bandwidth', '25+ Mbps for 4K UHD']);
  rows.push(['Instant Activation', 'WhatsApp Support (+212 625 218 443)']);

  return rows;
}
