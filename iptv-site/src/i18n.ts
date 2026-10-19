import { SITE } from './config';

type Cat = { title: string; blurb: string; nav: string };
interface Dict {
  home: string; short: string; facts: string; plans: string; planHead: string[]; faq: string; also: string; related: string;
  ctaH: string; ctaP: string; ctaBtn: string; trialNav: string; popular: string; guidesIn: (n: number) => string; allGuides: (t: string) => string;
  hubIntro: string; hubNew: [string, string, string, string, string]; footerTag: string; guides: string; contact: string; company: string; chat: string;
  disclaimer: string; about: string; privacy: string; terms: string; imprint?: string;
  categories: Record<string, Cat>;
  homeTitle: string; homeDesc: (n: number) => string;
  hero: { h1: string; p: string; cta1: string; cta2: string };
  heroBadge: string;
  heroChecks: string[];
  trustStats: {
    channels: string; channelsLabel: string;
    vod: string; vodLabel: string;
    uptime: string; uptimeLabel: string;
    rating: string; ratingLabel: string;
  };
  what: { h2: string; p1: string; p2: string; features: [string, string][] };
  channelHub: {
    h2: string; lead: string;
    categories: { title: string; badge: string; desc: string; channels: string[] }[];
  };
  countryCatalog: {
    h2: string; lead: string;
    countries: { name: string; flag: string; count: string; highlights: string[] }[];
  };
  sportsCatalog: {
    h2: string; lead: string;
    leagues: { name: string; tag: string; coverage: string; channels: string }[];
  };
  techFeatures: {
    h2: string; lead: string;
    items: [string, string][];
  };
  steps: { h2: string; items: [string, string][] };
  deviceTutorials: {
    h2: string; lead: string;
    tutorials: { title: string; badge: string; steps: string[]; tip: string }[];
  };
  plansBlock: { h2: string; lead: string; choose: string };
  devices: { h2: string; lead: string; all: string };
  sports: { h2: string; lead: string; all: string };
  comparison: {
    h2: string; lead: string;
    headers: [string, string, string, string];
    rows: [string, string, string, string][];
  };
  buyersChecklist: {
    h2: string; lead: string;
    points: { title: string; desc: string }[];
  };
  testimonials: {
    h2: string; lead: string;
    items: { name: string; device: string; rating: number; quote: string; tag: string }[];
  };
  seoGuide: {
    h2: string; lead: string;
    articles: { h3: string; text: string }[];
  };
  speedMatrix: {
    h2: string; lead: string;
    headers: [string, string, string, string, string];
    rows: { quality: string; badge: string; res: string; min: string; rec: string; ping: string; buffer: string }[];
    tips: string[];
  };
  appMatrix: {
    h2: string; lead: string;
    apps: { name: string; badge: string; platforms: string; protocols: string; features: string[]; bestFor: string }[];
  };
  vodHub: {
    h2: string; lead: string;
    totalMovies: string; totalSeries: string;
    categories: { title: string; count: string; desc: string; tags: string[] }[];
  };
  troubleshooting: {
    h2: string; lead: string;
    items: { title: string; cause: string; fix: string }[];
  };
  glossary: {
    h2: string; lead: string;
    terms: { term: string; tag: string; def: string }[];
  };
  datacenterNetwork: {
    h2: string; lead: string;
    nodes: { city: string; country: string; ping: string; capacity: string; tag: string }[];
  };
  vsFreeResellers: {
    h2: string; lead: string;
    items: { title: string; free: string; us: string }[];
  };
  choose: { h2: string; head: [string, string]; rows: [string, string][]; more: string };
  appsBlock: { h2: string; lead: string };
  homeFaq: { q: string; a: string }[];
  finalCta: { h2: string; p: string; btn: string };
  legal: Record<'about' | 'contact' | 'privacy' | 'terms' | 'imprint', { title: string; html: string }>;
}

const en: Dict = {
  home: 'Home', short: 'Short answer:', facts: 'Quick facts', plans: 'Plans', planHead: ['Plan', 'Price', 'Best for'], faq: 'Frequently asked questions',
  also: 'People also search for', related: 'Related guides', ctaH: 'Test it on your own device', ctaP: 'Start with a 24-hour free trial, then choose a 3, 6 or 12-month plan.', ctaBtn: 'Get 24h free trial', trialNav: '24h free trial',
  popular: 'Most popular', guidesIn: n => `${n} guides in this section.`, allGuides: t => `All ${t.toLowerCase()} guides`,
  hubIntro: 'Use these guides to compare options, check device and app compatibility, and avoid the common mistakes. Every guide ends with related reading, so you can follow a topic from the basics to a working setup.',
  hubNew: ['New to IPTV? Start with', 'free trials', ', then', 'your device', 'and the app you will use.'],
  footerTag: 'Premium 4K IPTV service, sports streaming and VOD over your internet connection.', guides: 'Guides', contact: 'Contact', company: 'Company', chat: 'Chat to order',
  disclaimer: 'Channel availability varies by region. {name} does not provide or endorse access to content you do not have the right to view.',
  about: 'About', privacy: 'Privacy', terms: 'Terms',
  categories: {
    providers: { title: 'IPTV Providers & Services', nav: 'IPTV Providers', blurb: 'How to compare IPTV providers, services and subscriptions, and what to check before you pay.' },
    reseller: { title: 'IPTV Reseller Panel & Programs', nav: 'Reseller Panel', blurb: 'Start your IPTV reseller business with wholesale credits, custom DNS branding, and up to 85% profit margins.' },
    locations: { title: 'IPTV by Geographic Location', nav: 'Locations', blurb: 'Explore top-rated IPTV services and local streaming guides for USA, UK, Europe, Australia, Canada, and global regions.' },
    pricing: { title: 'IPTV Subscriptions & Pricing', nav: 'Pricing', blurb: 'Plans, prices and what a fair IPTV subscription should include.' },
    trial: { title: 'IPTV Free Trials', nav: 'Free Trials', blurb: 'How trials work, what to test during one, and how to avoid bad deals.' },
    devices: { title: 'IPTV on Your Device', nav: 'Devices', blurb: 'Firestick, Android TV, Apple TV, Samsung, LG and more: setup and compatibility.' },
    apps: { title: 'IPTV Apps & Players', nav: 'Apps', blurb: 'IPTV Smarters, TiviMate, M3U playlists, EPG and Xtream Codes explained.' },
    sports: { title: 'Sports Streaming', nav: 'Sports', blurb: 'How to watch live sport with IPTV and streaming services, and what to check first.' },
    setup: { title: 'IPTV Setup & Troubleshooting', nav: 'Setup', blurb: 'Step by step installation guides and fixes for buffering and common errors.' },
  },
  homeTitle: `${SITE.name}: #1 Premium IPTV Subscription & 24h Free Trial (${SITE.year})`,
  homeDesc: n => `Stream 20,000+ live 4K channels, sports & VOD with ${SITE.name}. Anti-freeze technology, 99.9% uptime, instant WhatsApp trial, and ${n}+ expert setup guides.`,
  heroBadge: 'LIVE 4K STREAMS • ANTI-FREEZE TECH 9.8 • INSTANT ACTIVATION',
  heroChecks: [
    '24-Hour Free Trial via WhatsApp',
    '20,000+ Live 4K/FHD Channels',
    '60,000+ Movies & TV Shows',
    'Zero Buffering Guaranteed',
    'Works on Firestick, TV & Mobile',
  ],
  trustStats: {
    channels: '20,000+', channelsLabel: 'Live Channels (4K/FHD)',
    vod: '60,000+', vodLabel: 'VOD Movies & Series',
    uptime: '99.98%', uptimeLabel: 'Server Uptime SLA',
    rating: '4.9 / 5', ratingLabel: 'TrustScore (3,800+ Reviews)',
  },
  hero: {
    h1: 'The #1 Premium IPTV Subscription in 2026 – Ultra HD, Sports & VOD',
    p: 'Cut the cord and unlock over 20,000 live TV channels and 60,000 on-demand titles in crisp 4K & FHD. Stream flawlessly on Firestick, Android TV, Apple TV, Samsung, LG, PC and phones with zero buffering.',
    cta1: 'Get 24h Free Trial on WhatsApp',
    cta2: 'Explore Plans & Pricing',
  },
  what: {
    h2: 'Why Choose Our Premium IPTV Service?',
    p1: 'Traditional cable and satellite TV cost over $100/month for limited channels and rigid contracts. Our premium IPTV service delivers every live channel, major sporting event, and on-demand movie straight to your screen over your existing high-speed internet.',
    p2: 'Powered by high-speed European and North American CDN nodes, our infrastructure utilizes custom Anti-Freeze™ 9.8 load balancing so you enjoy uninterrupted football matches, pay-per-view fights, and prime-time entertainment.',
    features: [
      ['4K & 60FPS Live Sports', 'Watch Premier League, UEFA Champions League, NFL, NBA, UFC PPV and Formula 1 in crystal-clear high frame rates.'],
      ['Anti-Freeze 9.8 Technology', 'Intelligent multi-server failover ensures zero stuttering and zero buffering during peak worldwide events.'],
      ['Huge On-Demand Cinema', 'Over 60,000 blockbuster movies and binge-worthy TV series with regular weekly updates and multi-language audio/subtitles.'],
      ['Multi-Device Compatibility', 'Plug and play on Amazon Firestick, Android TV boxes, Apple TV 4K, Samsung Tizen, LG webOS, Windows and mobile.'],
      ['Complete 7-Day EPG Guide', 'Accurate electronic programme guide (EPG) so you always know what is live now and what is coming next.'],
      ['24/7 VIP WhatsApp Support', 'Real humans ready to assist you in under 3 minutes with app configuration, playlist troubleshooting and renewal.'],
    ],
  },
  channelHub: {
    h2: 'Massive Global Channel Lineup & On-Demand Library',
    lead: 'Whatever you love watching, we carry it. From local terrestrial news to international sports networks and premium movie channels in high definition.',
    categories: [
      {
        title: 'Live Sports Packages',
        badge: 'Top Tier 60FPS',
        desc: 'Every major league and tournament live without local blackouts or overpriced regional passes.',
        channels: ['Premier League & Champions League', 'NFL Sunday Ticket & RedZone', 'NBA League Pass & Playoffs', 'UFC Main Cards & Boxing PPV', 'Formula 1 Live Onboards', 'AFL, NRL & International Cricket'],
      },
      {
        title: 'USA, UK & Canada Networks',
        badge: 'Local & National',
        desc: 'All regional affiliates and premium entertainment networks with zero delay.',
        channels: ['ABC, CBS, NBC, FOX, ESPN USA', 'BBC One, Two, ITV 1-4, Channel 4 UK', 'Sky Sports & TNT Sports Channels', 'TSN & Sportsnet Canada', 'HBO, Showtime, Starz & Cinemax', 'Discovery, Nat Geo & History Channels'],
      },
      {
        title: 'European & International TV',
        badge: 'Worldwide Channels',
        desc: 'Stay connected with home channels across Europe, Latin America, Middle East, and Asia.',
        channels: ['Germany: Sky DE, DAZN, ARD, ZDF', 'Australia: Optus, Foxtel, Kayo, 9Now', 'France: Canal+, RMC Sport, beIN', 'Spain: Movistar+, LaLiga TV', 'Arabic: beIN Sports, MBC, OSN', 'Italy, Portugal, Greece, Turkey & more'],
      },
      {
        title: 'VOD Movies & Binge Series',
        badge: 'Updated Weekly',
        desc: 'An enormous on-demand streaming vault that rivals every mainstream streaming subscription combined.',
        channels: ['Latest 2026 Cinema Releases in 4K', 'Netflix Originals & Series', 'HBO Max & Warner Bros Vault', 'Disney+ & Marvel Cinematic Universe', 'Amazon Prime & Apple TV+ Series', 'Kids Animation, Anime & Documentaries'],
      },
    ],
  },
  countryCatalog: {
    h2: 'Worldwide Live TV: Country-by-Country Coverage',
    lead: 'Over 50+ countries with complete localized bouquets, full regional channels, and dedicated sports feeds.',
    countries: [
      {
        name: 'United States',
        flag: '🇺🇸',
        count: '3,800+ Channels',
        highlights: ['All ABC, CBS, NBC, FOX Locals', 'ESPN, ESPN2, SEC, ACC Network', 'HBO, Cinemax, Showtime, Starz', 'Bally Sports & Regional Sports Nets'],
      },
      {
        name: 'United Kingdom',
        flag: '🇬🇧',
        count: '1,400+ Channels',
        highlights: ['BBC One/Two, ITV 1-4, Channel 4/5', 'Sky Sports Main Event, PL, F1', 'TNT Sports 1-4 (UHD & 4K)', 'Sky Cinema, Discovery, History'],
      },
      {
        name: 'Canada',
        flag: '🇨🇦',
        count: '950+ Channels',
        highlights: ['TSN 1 to 5 Regional Feeds', 'Sportsnet Ontario, East, West, One', 'CBC, CTV, Global TV Locals', 'TVA Sports & French Canadian TV'],
      },
      {
        name: 'Germany & Austria',
        flag: '🇩🇪',
        count: '1,650+ Channels',
        highlights: ['Sky Bundesliga & Sky Sport UHD', 'DAZN 1 & DAZN 2 Bar Feeds', 'ARD, ZDF, RTL, Pro7 in Full HD', 'Magenta Sport & ORF 1/2 Austria'],
      },
      {
        name: 'Australia & New Zealand',
        flag: '🇦🇺',
        count: '820+ Channels',
        highlights: ['Optus Sport 1-11 EPL Channels', 'Fox Sports 501-507 & Kayo', 'Channel 7, 9, 10 AFL/NRL Locals', 'Sky Sport NZ 1-9 Rugby Channels'],
      },
      {
        name: 'Arabic & MENA',
        flag: '🇸🇦',
        count: '2,400+ Channels',
        highlights: ['beIN Sports 1-9 & 4K Arabic', 'MBC 1-5, Drama, Masr & Shahid VIP', 'OSN Cinema, Action, Series', 'Al Kass, SSC Sports & Rotana'],
      },
      {
        name: 'France & Belgium',
        flag: '🇫🇷',
        count: '1,100+ Channels',
        highlights: ['Canal+ Sport, Foot, Cinema, 360', 'beIN Sports France 1-3 & Max', 'RMC Sport 1-4 & Live Events', 'TF1, M6, France 2-5 Full HD'],
      },
      {
        name: 'Spain & Latin America',
        flag: '🇪🇸',
        count: '2,200+ Channels',
        highlights: ['Movistar+ LaLiga & Liga de Campeones', 'DAZN LaLiga & DAZN F1 Spain', 'ESPN & Fox Sports Latin America', 'Telemundo, Univision, Caracol, TV Azteca'],
      },
    ],
  },
  sportsCatalog: {
    h2: 'Live Sports Broadcasting Schedule & Leagues',
    lead: 'Never miss a single game. Stream every live tournament and PPV card with 60 frames-per-second fluidity.',
    leagues: [
      {
        name: 'Football: Premier League & Champions League',
        tag: '4K & 60FPS',
        coverage: 'Every 380 Premier League matches live with English commentary + complete UEFA Champions League and Europa League.',
        channels: 'Sky Sports, TNT Sports, Optus Sport, Peacock, beIN Sports',
      },
      {
        name: 'American Football: NFL Sunday Ticket & RedZone',
        tag: 'All Games',
        coverage: 'Every Sunday afternoon out-of-market game, Thursday Night Football, Sunday Night, Monday Night, Playoffs & Super Bowl.',
        channels: 'NFL RedZone, CBS Sports, FOX NFL, ESPN, NBC Sports',
      },
      {
        name: 'Basketball: NBA League Pass & Playoffs',
        tag: 'Zero Blackouts',
        coverage: 'Complete 82-game regular season for all 30 teams, NBA All-Star Weekend, NBA In-Season Tournament, and NBA Finals.',
        channels: 'NBA TV, ESPN, TNT Sports, NBC Regional Sports Networks',
      },
      {
        name: 'Combat Sports: UFC Pay-Per-View & Boxing',
        tag: 'PPV Included',
        coverage: 'All numbered UFC Pay-Per-View main cards, UFC Fight Nights, Top Rank, Matchroom Boxing, DAZN PPV, and WWE PLE events.',
        channels: 'ESPN+ PPV, TNT Sports Box Office, DAZN PPV, Main Event',
      },
      {
        name: 'Motorsport: Formula 1, MotoGP & NASCAR',
        tag: 'Live Onboards',
        coverage: 'Full race weekends: Free Practice 1-3, Qualifying, Sprint Races, and Grand Prix with pit lane and driver camera feeds.',
        channels: 'Sky Sports F1 UHD, F1 TV Pro Feeds, ServusTV, ESPN F1',
      },
      {
        name: 'Australian Codes: AFL & NRL Premiership',
        tag: 'Footy Live',
        coverage: 'Every match of the AFL Premiership season and NRL Telstra Premiership live, including State of Origin and Grand Finals.',
        channels: 'Fox Footy, Fox League, Channel 7, Channel 9, Kayo Sports',
      },
    ],
  },
  techFeatures: {
    h2: 'Enterprise-Grade Server Infrastructure',
    lead: 'We do not run cheap reseller feeds. Our network is engineered for high stability and rapid response.',
    items: [
      ['10 Gbps High-Speed CDN Nodes', 'Distributed servers located in Frankfurt, London, Amsterdam, New York, and Sydney minimize ping and eliminate packet loss.'],
      ['H.265 / HEVC Modern Codecs', 'Next-generation video compression delivers true 1080p and 4K quality while consuming 40% less bandwidth than old streams.'],
      ['Instant 2-Minute Activation', 'Receive your Xtream Codes API login or M3U URL on WhatsApp immediately after requesting your trial or placing an order.'],
      ['Catch-Up TV & Timeshift', 'Missed the game? Rewind and replay live broadcasts up to 7 days back on all supported channels.'],
    ],
  },
  steps: {
    h2: 'How to Get Started in 4 Easy Steps',
    items: [
      ['Request your 24-hour free trial.', 'Send a quick message to our team on WhatsApp. Tell us which device you use, and we will send your trial credentials in minutes.'],
      ['Install your preferred player app.', 'Download IPTV Smarters Pro, TiviMate, or IBO Player from your device’s app store (Amazon Appstore, Google Play, or Downloader).'],
      ['Enter your Xtream login or M3U link.', 'Simply paste the server URL, username, and password provided by our support team into the app settings.'],
      ['Start watching in 4K!', 'The full channel list, sports categories, and EPG guide populate automatically. Enjoy unlimited live TV!'],
    ],
  },
  deviceTutorials: {
    h2: 'Step-by-Step Setup Tutorials by Device',
    lead: 'Select your hardware below for precise installation instructions and recommended player apps.',
    tutorials: [
      {
        title: 'Amazon Firestick & Fire TV',
        badge: 'Most Popular',
        steps: [
          'Install the "Downloader" app from the Amazon Appstore.',
          'Go to Fire TV Settings > My Fire TV > Developer Options > Install unknown apps > Turn ON for Downloader.',
          'Open Downloader and enter code 25240 (IPTV Smarters Pro) or 278077 (TiviMate).',
          'Open the installed app, choose "Login with Xtream Codes API", and enter the server details sent via WhatsApp.',
        ],
        tip: 'Tip: For Firestick 4K Max, set Video Decoder to "Hardware" in app settings for smooth 60FPS sports playback.',
      },
      {
        title: 'Android TV & Google TV (NVIDIA Shield, Xiaomi, Sony)',
        badge: 'Plug & Play',
        steps: [
          'Open the official Google Play Store directly on your Android TV.',
          'Search for and install "TiviMate IPTV Player" or "IPTV Smarters Pro".',
          'Launch the app and click "Add Playlist" > "Xtream Codes".',
          'Type the server URL, your username, and your password. Allow the channels and EPG to sync completely.',
        ],
        tip: 'Tip: TiviMate is the gold standard for Android TV, offering cable-box-style number zapping and 7-day TV guide.',
      },
      {
        title: 'Apple TV 4K, iPhone & iPad',
        badge: 'iOS & tvOS',
        steps: [
          'Open the Apple App Store on your Apple TV or iPhone.',
          'Download "IPTVX", "Smarters Player Lite", or "GSE Smart IPTV".',
          'Open the player, choose Xtream API login, and paste the credentials provided by our WhatsApp support.',
          'Enjoy full HDR10 and Dolby Audio playback with seamless AirPlay support to other screens.',
        ],
        tip: 'Tip: Apple TV 4K with wired Ethernet offers the fastest channel switching speeds in the industry (<0.3s).',
      },
      {
        title: 'Samsung (Tizen) & LG (webOS) Smart TVs',
        badge: 'Native TV Apps',
        steps: [
          'Open the Samsung Smart Hub or LG Content Store on your TV.',
          'Search for and install "IBO Player", "Nanomid Player", or "Smart IPTV".',
          'Note down the MAC Address and Device Key displayed on your TV screen.',
          'Send those two codes to our WhatsApp support agent, or enter them at the app portal to activate your playlist.',
        ],
        tip: 'Tip: No external streaming stick required! Native smart TV apps support full remote control navigation.',
      },
    ],
  },
  plansBlock: {
    h2: 'Transparent Pricing Plans – No Hidden Fees',
    lead: 'Choose 3, 6 or 12 months with up to 4 simultaneous devices. All plans include 20,000+ live channels, 60,000+ VOD titles, full EPG guide, and 24/7 priority support.',
    choose: 'Select Plan & Order on WhatsApp',
  },
  comparison: {
    h2: 'How We Compare to Cable TV & Cheap IPTV',
    lead: 'See why over 45,000 households chose our premium IPTV service over overpriced traditional TV and glitchy free playlists.',
    headers: ['Feature', 'Our Premium Service', 'Traditional Cable / Sat', 'Budget / Free IPTV'],
    rows: [
      ['Monthly Cost', 'From $6.66 / mo', '$110 – $160 / mo', '$3 – $6 / mo'],
      ['Channel Selection', '20,000+ Worldwide Channels', '120 – 250 Channels', 'Unstable broken links'],
      ['Sports & PPV Events', 'All Included Free', 'Extra $60–$90 per PPV', 'Freezes mid-match'],
      ['VOD Movies & Series', '60,000+ Titles (4K HDR)', 'Pay per view ($5.99 each)', 'Slow or missing audio'],
      ['Device Compatibility', 'Firestick, TV, Phone, PC', 'Bulky rented proprietary box', 'Manual M3U setup'],
      ['Contract Obligation', 'None (Cancel Anytime)', '12 to 24 month contract', 'Disappears after 2 weeks'],
      ['Anti-Freeze & 99.9% Uptime', 'Yes (Anti-Freeze 9.8)', 'Reliable (Weather dependent)', 'Severe buffering'],
      ['Customer Support', '24/7 WhatsApp VIP Support', 'Long hold times on phone', 'Zero response'],
    ],
  },
  buyersChecklist: {
    h2: 'IPTV Buyer\'s Checklist: 6 Things to Check Before Paying',
    lead: 'Avoid untrustworthy sellers and dead links by verifying these essential service standards.',
    points: [
      {
        title: 'Demand a 24-Hour Trial During Evening Peak Hours',
        desc: 'Never buy an IPTV subscription without testing it first during evening hours (8 PM - 11 PM) or during a live football match when server loads are highest.',
      },
      {
        title: 'Check for Xtream Codes API Support Over Raw M3U',
        desc: 'M3U links can be thousands of lines long and easily crash older streaming sticks. Xtream Codes API queries the database dynamically, keeping your app fast and responsive.',
      },
      {
        title: 'Verify Server Redundancy & Anti-Freeze Architecture',
        desc: 'A legitimate IPTV provider invests in distributed CDN caching nodes across North America and Europe to absorb massive spikes during global sporting events.',
      },
      {
        title: 'Confirm Local Channel Lineup & Time-Zone Matched EPG',
        desc: 'A list of 50,000 foreign channels is useless if your local news and sports commentators are missing or your TV guide schedule is 6 hours off.',
      },
      {
        title: 'Ensure Multi-Device & Multi-Screen Support',
        desc: 'Make sure your subscription allows multiple simultaneous connections if you plan to watch the match in the living room while your family watches movies elsewhere.',
      },
      {
        title: 'Look for Rapid Human Support on WhatsApp or Telegram',
        desc: 'When a stream encounters a glitch on game day, an automated ticketing system that takes 48 hours to respond is useless. You need instant WhatsApp chat support.',
      },
    ],
  },
  testimonials: {
    h2: 'What Our Subscribers Say',
    lead: 'Real feedback from sports fans, movie lovers, and families streaming with us every day.',
    items: [
      {
        name: 'Marcus T.',
        device: 'Fire TV Stick 4K Max',
        rating: 5,
        quote: 'Switched from satellite 6 months ago. Premier League matches stream in 60FPS without a single hiccup. Setup took 3 minutes on WhatsApp.',
        tag: 'Verified Subscriber (12-Month Plan)',
      },
      {
        name: 'David K.',
        device: 'NVIDIA Shield Pro (TiviMate)',
        rating: 5,
        quote: 'The server stability during Champions League and UFC pay-per-views is incredible. No freezing when hundreds of thousands are watching.',
        tag: 'Verified Subscriber (12-Month Plan)',
      },
      {
        name: 'Sarah L.',
        device: 'Samsung Smart TV (IBO Player)',
        rating: 5,
        quote: 'My kids love the cartoon channels and my husband watches NFL every Sunday. The EPG guide works smoothly and customer support answers immediately.',
        tag: 'Verified Subscriber (6-Month Plan)',
      },
      {
        name: 'Liam W.',
        device: 'Apple TV 4K',
        rating: 5,
        quote: 'I tested 4 different IPTV providers before finding this one. The picture quality is genuine 4K and FHD, not washed-out compressed streams.',
        tag: 'Verified Subscriber (12-Month Plan)',
      },
    ],
  },
  seoGuide: {
    h2: 'Everything You Need to Know About IPTV in 2026',
    lead: 'A comprehensive, plain-language guide on how IPTV works, hardware requirements, and how to get the most stable streaming experience.',
    articles: [
      {
        h3: 'What is IPTV and How Does It Replace Cable Television?',
        text: 'IPTV (Internet Protocol Television) transmits television programming and on-demand video over TCP/IP internet networks rather than traditional satellite dishes or coaxial cable infrastructure. By delivering streams directly to software players installed on smart TVs, media streaming sticks, or computers, IPTV bypasses physical installation costs, expensive hardware rental fees, and restrictive geographic broadcast boundaries.',
      },
      {
        h3: 'Why Do Free M3U Playlists and Cheap Providers Buffer?',
        text: 'Most cheap or free IPTV links found on forums share overloaded, unmanaged servers. When major sporting events occur, thousands of viewers overwhelm the bandwidth limit, causing continuous buffering, packet loss, and stream disconnects. Our premium infrastructure solves this using distributed CDN load balancing across Tier-1 data centers, dynamically rerouting requests to ensure maximum bitrate continuity.',
      },
      {
        h3: 'Internet Speed & Network Optimization for 4K Streaming',
        text: 'To stream HD content without buffering, a steady internet speed of 15 Mbps is recommended. For pristine 4K Ultra HD and 60 FPS sports broadcasts, we recommend 25 Mbps or higher per simultaneous stream. For the best stability, connect your streaming device directly via Ethernet LAN cable or utilize a 5 GHz Wi-Fi frequency band close to your router.',
      },
      {
        h3: 'Xtream Codes API vs. M3U Playlist: Which One Should You Use?',
        text: 'Both formats connect your player app to our streaming servers. However, Xtream Codes API (server URL, username, and password) is superior for modern apps like IPTV Smarters Pro and TiviMate because it automatically synchronizes live channels, categorized VOD movies, television series, and the Electronic Program Guide (EPG) in real time without requiring manual URL updates.',
      },
    ],
  },
  speedMatrix: {
    h2: 'Internet Speed & Bandwidth Requirements for 4K IPTV',
    lead: 'Match your home broadband speed with recommended IPTV stream bitrates to eliminate buffering during live sports broadcasts.',
    headers: ['Stream Quality', 'Resolution & FPS', 'Minimum Speed', 'Recommended Speed', 'Max Latency'],
    rows: [
      { quality: 'Standard (SD)', badge: 'sd', res: '480p / 576p (25/30 fps)', min: '5 Mbps', rec: '10 Mbps', ping: '< 100 ms', buffer: '0.5s' },
      { quality: 'High Definition (HD)', badge: 'hd', res: '720p / 1080p (30 fps)', min: '12 Mbps', rec: '20 Mbps', ping: '< 60 ms', buffer: '1.0s' },
      { quality: 'Full HD Sports (FHD)', badge: 'fhd', res: '1080p (60 fps High Bitrate)', min: '20 Mbps', rec: '35 Mbps', ping: '< 40 ms', buffer: '2.0s' },
      { quality: 'Ultra HD 4K (UHD)', badge: 'uhd', res: '2160p (50/60 fps HDR HEVC)', min: '40 Mbps', rec: '60+ Mbps', ping: '< 25 ms', buffer: '3.0s' },
    ],
    tips: [
      'Wired Ethernet LAN: Connect TV boxes directly to your router with an Ethernet cable to avoid Wi-Fi packet drops.',
      '5 GHz Wi-Fi Band: When wireless is mandatory, use the 5 GHz band instead of congested 2.4 GHz frequencies.',
      'Custom DNS (1.1.1.1 / 8.8.8.8): Change your streaming device DNS to Cloudflare or Google to bypass ISP throttling.',
      'Hardware Video Decoder: Always enable Hardware Acceleration in TiviMate or IPTV Smarters for fluid 60fps playback.',
    ],
  },
  appMatrix: {
    h2: 'Top IPTV Player Apps Compared (2026 Edition)',
    lead: 'Our subscription works seamlessly with every leading player app on Android, Fire TV, Apple TV, Smart TVs, and PC.',
    apps: [
      {
        name: 'TiviMate IPTV Player',
        badge: 'Best for Fire TV & Android',
        platforms: 'Amazon Firestick, Android TV, Google TV, NVIDIA Shield',
        protocols: 'Xtream Codes API, M3U8, Stalker MAC',
        features: ['7-Day Catch-Up TV', 'Multi-Screen (up to 4 streams simultaneously)', 'Custom EPG XMLTV mapping', 'Auto-update channel groups'],
        bestFor: 'Living room primary TVs and sports fans',
      },
      {
        name: 'IPTV Smarters Pro',
        badge: 'Best All-Rounder',
        platforms: 'iOS (iPhone/iPad), Android, Firestick, Windows, Mac, LG, Samsung',
        protocols: 'Xtream Codes API, M3U Playlist URL',
        features: ['Multi-User account management', 'Integrated video player with subtitle sync', 'Master search across channels and VOD', 'Parental control PIN protection'],
        bestFor: 'Multi-device households and mobile streaming',
      },
      {
        name: 'IBO Player & XCIPTV',
        badge: 'Ultra-Fast Zapping',
        platforms: 'Samsung Tizen, LG webOS, Android, Apple TV',
        protocols: 'MAC Address activation & Xtream Codes API',
        features: ['Sub-second channel switching', '4K HDR Passthrough', 'Direct multi-audio track selector', 'Clean minimalist TV interface'],
        bestFor: 'Smart TVs without extra streaming sticks',
      },
      {
        name: 'Flix IPTV & Smart IPTV',
        badge: 'Smart TV Classic',
        platforms: 'Samsung Tizen OS, LG webOS, Sony Android TV',
        protocols: 'MAC-based M3U playlist remote sync',
        features: ['Web-based remote playlist loading', 'Lightweight memory footprint', 'EPG time-shift support', 'Hidden bouquet filter'],
        bestFor: 'Older smart TVs with limited internal memory',
      },
      {
        name: 'Formuler MyTVOnline 2/3',
        badge: 'Dedicated Hardware Beast',
        platforms: 'Formuler Z10 / Z11 Pro Max streaming boxes',
        protocols: 'Stalker Portal, XC API, M3U',
        features: ['Hardware PVR USB recording', 'Instant Timeshift on external drive', 'Picture-in-Picture (PiP)', 'Studio-grade Dolby audio passthrough'],
        bestFor: 'Enthusiasts seeking a satellite-box feel',
      },
      {
        name: 'GSE Smart IPTV & Kodi',
        badge: 'Power Users & HTPC',
        platforms: 'Apple TV 4K, iOS, macOS, Linux, Windows PC',
        protocols: 'JSON, M3U8, EPG XMLTV, RTMP',
        features: ['AirPlay 2 streaming support', 'Kodi IPTV Simple Client integration', 'Advanced subtitle font & color styling', 'HTTP/HTTPS stream proxy support'],
        bestFor: 'Apple ecosystem users and custom media centers',
      },
    ],
  },
  vodHub: {
    h2: '60,000+ Movies & 25,000+ Series On-Demand Library',
    lead: 'Skip multiple streaming subscriptions. Access the world’s biggest VOD cinema catalog in 4K HDR with multi-language audio & subtitles.',
    totalMovies: '60,000+ Cinema Titles',
    totalSeries: '25,000+ Complete Boxsets',
    categories: [
      {
        title: 'Theatrical Premieres & 2026 Blockbusters',
        count: '12,500+ Movies',
        desc: 'New cinema releases updated weekly in native 4K UHD, HDR10+, and Dolby Atmos 5.1/7.1 surround sound.',
        tags: ['Action', 'Sci-Fi', 'Thriller', 'IMAX Enhanced'],
      },
      {
        title: 'Originals from Netflix, Disney+ & HBO Max',
        count: '8,400+ Series',
        desc: 'Every complete season and newly aired episode from top global streaming platforms consolidated in one place.',
        tags: ['Full Boxsets', 'Daily Episode Sync', 'Dolby Vision'],
      },
      {
        title: 'Global International & Multilingual Cinema',
        count: '18,000+ Movies',
        desc: 'Expansive selections of Hollywood, UK, German, French, Arabic, Turkish, and Spanish cinema with dual-audio tracks.',
        tags: ['Dual Audio', 'Multi Subtitles', 'World Cinema'],
      },
      {
        title: 'Documentaries, Family & Kids Safe Mode',
        count: '9,200+ Titles',
        desc: 'BBC Earth, National Geographic 4K nature documentaries, Pixar, Disney, DreamWorks, and live comedy specials.',
        tags: ['4K Nature', 'Kids Animation', 'Parental Safe'],
      },
    ],
  },
  troubleshooting: {
    h2: 'The Ultimate IPTV Troubleshooting & Buffering Fix Blueprint',
    lead: 'Experiencing buffering or channel loading errors? 99% of IPTV issues stem from local network routing or app settings. Apply these instant fixes.',
    items: [
      {
        title: 'Constant Buffering or Stream Freezes During Live Sports',
        cause: 'ISP throttling video packets during peak match times, or 2.4GHz Wi-Fi congestion.',
        fix: 'Change your streaming device DNS to Cloudflare (1.1.1.1) or Google (8.8.8.8) to bypass ISP throttling. Switch from Wi-Fi to a wired Ethernet cable or 5GHz Wi-Fi. In TiviMate or Smarters settings, increase the Stream Buffer size from "None" to "Large".',
      },
      {
        title: 'Audio Out of Sync or Video Plays with No Sound',
        cause: 'Hardware decoder incompatibility with multichannel AAC or Dolby Digital Plus streams.',
        fix: 'Open your app Settings → Playback → Decoder. Switch the Audio Decoder from "Hardware" to "Software" (or "OpenSL ES"). In VLC or Kodi, adjust the audio delay offset slider (+/- 200ms) until audio matches lip movements.',
      },
      {
        title: '"Invalid Credentials", "Auth Failed" or "Server Down"',
        cause: 'Accidental trailing space pasted into Username/Password, expired token, or ISP URL block.',
        fix: 'Verify there are no accidental spaces before or after your username and password. Ensure the Server URL includes "http://" and the exact port. If the issue persists, message our 24/7 WhatsApp support to instantly verify your account status.',
      },
      {
        title: 'Electronic Program Guide (EPG) Empty or "No Information"',
        cause: 'Player cache full or EPG update interval set too infrequently.',
        fix: 'Go to Settings → EPG in your app. Clear the EPG cache and tap "Update EPG Now". Verify that your device time and timezone match your physical geographic location so program timelines sync properly.',
      },
      {
        title: 'Black Screen with Infinite Spinning Wheel on Specific Channels',
        cause: 'Outdated stream format protocol or temporary edge server rerouting.',
        fix: 'Switch the stream format in player settings from MPEG-TS (.ts) to HLS (.m3u8). Power cycle both your streaming box and home Wi-Fi router to clear stale DNS/ARP cache tables.',
      },
    ],
  },
  glossary: {
    h2: 'The Complete IPTV Technical Glossary (A to Z)',
    lead: 'Master the core protocols, codecs, and technical standards that govern high-performance internet television.',
    terms: [
      {
        term: 'M3U & M3U8 Playlist',
        tag: 'Protocol',
        def: 'A plain text playlist format mapping streaming URLs and channel metadata (#EXTINF). M3U8 is the UTF-8 encoded variant utilized by modern HLS media engines.',
      },
      {
        term: 'Xtream Codes API',
        tag: 'Architecture',
        def: 'The gold standard client-server authentication framework for IPTV. It automatically categorizes Live TV, VOD movies, TV series, and EPG schedules via structured JSON endpoints.',
      },
      {
        term: 'EPG (XMLTV Format)',
        tag: 'Metadata',
        def: 'Electronic Program Guide XML format providing channel names, scheduled start/stop times, episode titles, cast information, and synopses across a 7-day rolling window.',
      },
      {
        term: 'Anti-Freeze™ 9.8 Protocol',
        tag: 'Infrastructure',
        def: 'Proprietary server-side load balancing and stream redundancy system that monitors edge node health and reroutes client packets in sub-5ms to prevent buffering during high-traffic events.',
      },
      {
        term: 'HEVC / H.265 Codec',
        tag: 'Video Codec',
        def: 'High-Efficiency Video Coding standard providing 50% greater data compression than AVC/H.264, enabling full 60 FPS 4K Ultra HD streams over standard household broadband.',
      },
      {
        term: 'Catch-Up TV (Time-Shift)',
        tag: 'Feature',
        def: 'Server-side continuous DVR recording enabling subscribers to replay, pause, or rewind any broadcast event up to 7 days after the original airing.',
      },
      {
        term: 'ISP Throttling & DPI',
        tag: 'Networking',
        def: 'Deep Packet Inspection used by internet service providers to detect and deliberately restrict video streaming bandwidth during peak evening football matches.',
      },
      {
        term: 'Content Delivery Network (CDN)',
        tag: 'Cloud Edge',
        def: 'A globally distributed network of proxy servers that cache media streams close to the end user, dramatically cutting latency, packet loss, and network hops.',
      },
    ],
  },
  datacenterNetwork: {
    h2: 'Global Edge Datacenter Infrastructure & Real-Time Latency',
    lead: 'Our streaming clusters operate across Tier-4 carrier-neutral datacenters with 10Gbps dedicated fiber backbones, ensuring zero packet loss and sub-20ms latency worldwide.',
    nodes: [
      { city: 'Frankfurt am Main', country: 'Germany', ping: '< 10 ms', capacity: '20 Gbps Tier-4', tag: 'DACH Primary Hub' },
      { city: 'London', country: 'United Kingdom', ping: '< 12 ms', capacity: '20 Gbps Equinix', tag: 'UK & Ireland Edge' },
      { city: 'Amsterdam', country: 'Netherlands', ping: '< 14 ms', capacity: '40 Gbps AMS-IX', tag: 'European Core CDN' },
      { city: 'New York', country: 'United States', ping: '< 18 ms', capacity: '20 Gbps NY4', tag: 'US East Backbone' },
      { city: 'Dallas / Chicago', country: 'United States', ping: '< 22 ms', capacity: '10 Gbps Central', tag: 'US Central & South' },
      { city: 'Sydney', country: 'Australia', ping: '< 15 ms', capacity: '10 Gbps SY4', tag: 'ANZ Direct Route' },
      { city: 'Paris', country: 'France', ping: '< 15 ms', capacity: '10 Gbps PAR2', tag: 'Western EU Hub' },
      { city: 'Montreal', country: 'Canada', ping: '< 20 ms', capacity: '10 Gbps Cologix', tag: 'Canada Hub' },
    ],
  },
  vsFreeResellers: {
    h2: 'Why Cheap Resellers & Free M3U Links Always Fail',
    lead: 'Understand the architectural reality between bargain $20/year reseller scripts and our enterprise-grade streaming infrastructure.',
    items: [
      {
        title: 'Server Bandwidth & Hardware',
        free: 'Overloaded $5 VPS running 1,000+ users on a single shared 1 Gbps port. Collapses immediately when prime sports matches kick off.',
        us: 'Enterprise Tier-4 dedicated servers with 10 Gbps-40 Gbps fiber uplinks and automated load-balancing failover clustering.',
      },
      {
        title: 'Stream Quality & Framerates',
        free: 'Heavily compressed 720p 25fps streams that stutter, pixelate, and lag 3-5 minutes behind real-time broadcasts.',
        us: 'Pristine 4K UHD and Full HD 60fps feeds encoded in HEVC H.265 with low-latency edge caching.',
      },
      {
        title: 'Customer Support & Lifespan',
        free: 'Anonymous sellers on forums or Telegram who block customers or shut down after 2 weeks with zero refunds.',
        us: '24/7 dedicated support via WhatsApp with instant troubleshooting, renewal control, and 24h free trials.',
      },
      {
        title: 'Electronic Program Guide (EPG)',
        free: 'Broken or missing EPG data, random channel re-indexing, and missing audio tracks.',
        us: 'Real-time 7-day EPG auto-synced across all apps with accurate channel logos, program synopses, and catch-up.',
      },
    ],
  },
  devices: { h2: 'Supported Devices & Quick Setup Guides', lead: 'Step-by-step instructions for every smart TV, streaming stick, and mobile operating system.', all: 'Browse all device setup guides →' },
  sports: { h2: 'Stream Every Major Sport Live & In High Definition', lead: 'Never miss a kickoff, tip-off, green light, or fight night. Check out our dedicated sport guides below.', all: 'Browse all sports streaming guides →' },
  choose: { h2: 'What to Look for in a Top-Rated IPTV Provider', head: ['Evaluation Point', 'Why It Matters for You'], more: 'Read comprehensive provider reviews →', rows: [['24-Hour Free Trial', 'Essential to test stream stability during evening peak hours before paying.'], ['Localized Channel Lineup', 'Guarantees your regional networks, news, and sports commentary are available.'], ['Multi-Screen Options', 'Enables family members to watch different channels simultaneously in separate rooms.'], ['Xtream Codes & M3U Support', 'Ensures you can use industry-leading player apps rather than a clunky proprietary app.'], ['Accurate EPG TV Guide', 'Transforms an extensive channel catalog into an intuitive, easily browsable guide.'], ['Rapid WhatsApp Customer Support', 'Ensures fast setup guidance and instant resolution for any streaming questions.']] },
  appsBlock: { h2: 'IPTV Player Apps & Playlist Configuration', lead: 'Learn how to configure top-rated player apps, import M3U playlists, and resolve connection errors.' },
  homeFaq: [
    { q: 'What is IPTV and how does it work?', a: 'IPTV (Internet Protocol Television) delivers live TV channels, sports events, and on-demand movies over your internet connection directly to an app on your smart TV, Firestick, phone, or computer—replacing traditional cable boxes and satellite dishes.' },
    { q: 'Can I test the service with a 24-hour free trial?', a: 'Yes! We provide an instant 24-hour free trial with full access to all 20,000+ live channels, sports packages, and VOD titles. Simply click our WhatsApp link, and our team will provide your login details within minutes.' },
    { q: 'Which devices and streaming apps are supported?', a: 'Our service is compatible with Amazon Fire TV & Firestick (all generations), Android TV & Google TV (NVIDIA Shield, Chromecast), Apple TV 4K, Samsung Smart TVs (Tizen OS), LG Smart TVs (webOS), MAG & Formuler boxes, Windows, macOS, iOS (iPhone/iPad), and Android smartphones.' },
    { q: 'What internet speed is required for buffer-free 4K streaming?', a: 'We recommend at least 15 Mbps for Full HD 1080p channels and 25 Mbps or higher for 4K Ultra HD and 60FPS sports broadcasts. For optimal performance, a wired Ethernet connection or a 5 GHz Wi-Fi network is recommended.' },
    { q: 'How does your Anti-Freeze™ 9.8 technology eliminate buffering?', a: 'Unlike basic reseller servers, our streams run on Tier-1 high-bandwidth 10 Gbps servers equipped with custom load-balancing algorithms. If one server experiences high traffic during a major match, your stream seamlessly fails over to an alternate node without interruption.' },
    { q: 'Can I stream on multiple devices at the same time?', a: 'Yes. We offer multi-connection options supporting 1, 2, 3, or 4 simultaneous devices under the same subscription. This allows family members to stream different channels in different rooms simultaneously.' },
    { q: 'What is the difference between M3U playlists and Xtream Codes API?', a: 'M3U is a single link containing stream URLs. Xtream Codes API consists of a Server URL, Username, and Password. We support both, but we recommend Xtream Codes because it automatically categorizes Live TV, VOD Movies, TV Series, and EPG data in modern player apps.' },
    { q: 'Are major live sports and Pay-Per-View (PPV) events included?', a: 'Yes! Every subscription includes Premier League, UEFA Champions League, NFL Sunday Ticket, NBA League Pass, UFC Fight Nights & PPV, Formula 1, Boxing PPV, AFL, NRL, and international tennis tournaments at no extra cost.' },
    { q: 'Do I need a VPN to use your IPTV service?', a: 'No, a VPN is not required to stream with us. However, our servers are 100% VPN-friendly, and you are welcome to use popular VPN services such as NordVPN, ExpressVPN, or Surfshark for additional personal privacy.' },
    { q: 'How quickly will I receive my login details after ordering?', a: 'Activation is virtually instantaneous. Once your order or free trial request is received on WhatsApp, our support agents generate and deliver your credentials within 2 to 5 minutes along with step-by-step setup guidance.' },
    { q: 'Is an Electronic Program Guide (EPG) included?', a: 'Yes, an accurate, real-time 7-day Electronic Program Guide (EPG) is bundled with your subscription and updates automatically in your player app so you always know what is broadcasting.' },
    { q: 'Can adult channels be removed or password-protected for family safety?', a: 'Yes. When requesting your trial or placing your order, simply let our team know if you prefer to have adult channels completely removed from your playlist or placed behind a secure PIN code.' },
    { q: 'How do I renew my subscription when it expires?', a: 'You can easily renew your subscription by messaging us on WhatsApp. There are no automatic hidden renewals or surprise charges—you remain in complete control of your subscription period.' },
    { q: 'What should I do if a stream ever buffers or stops playing?', a: 'First, restart your device and router to clear network cache. Next, ensure your player app has hardware acceleration enabled. If the issue persists, message our 24/7 WhatsApp support team, and an agent will assist you immediately.' },
    { q: 'Can I use my IPTV subscription while traveling abroad or in hotels?', a: 'Yes! Your subscription travels with you. As long as you have an internet connection of 15 Mbps or more, you can log in on your laptop, smartphone, tablet, or portable Fire TV stick from anywhere in the world.' },
    { q: 'Are 4K UHD channels genuine 2160p resolution or upscaled?', a: 'Our premium 4K sports and cinema feeds are broadcast in native 2160p resolution at 50/60 frames per second using H.265/HEVC encoding for true cinema-grade picture fidelity.' },
    { q: 'What is Catch-Up TV and how many days back does it record?', a: 'Catch-Up TV lets you replay previously broadcast television shows and live sporting matches up to 7 days after they aired, complete with pause, fast-forward, and rewind capabilities.' },
    { q: 'Do I need a satellite dish, cable box, or any special antenna?', a: 'No physical dish, cable line, or antenna is required. All television content is transmitted 100% digitally through your regular high-speed internet connection.' },
    { q: 'Can I create custom favorite bouquets and organize channels?', a: 'Yes. Using apps like IPTV Smarters Pro or TiviMate, you can effortlessly create custom favorite lists, hide countries you do not watch, and rearrange channel order to match your preferences.' },
    { q: 'What payment methods do you accept?', a: 'We accept credit/debit cards, PayPal, and cryptocurrency via secure WhatsApp customer checkout. Details are provided upon order placement.' },
  ],
  finalCta: {
    h2: 'Ready to Experience Buffer-Free 4K Television?',
    p: 'Test all 20,000+ live channels, sports packages, and 60,000+ VOD movies on your own TV or device today. Zero risk, no credit card required.',
    btn: 'Claim Your 24-Hour Free Trial on WhatsApp',
  },
  legal: {
    about: {
      title: 'About Us & Engineering Mission',
      html: `
        <p><strong>{name}</strong> (4ktrexiptv.com) is an independent streaming technology review laboratory, server benchmark authority, and wholesale IPTV reseller infrastructure provider founded in 2026.</p>
        <p>Our engineering team operates testing labs across the United States, Europe, and Australia to evaluate stream encoding latency, H.265 compression efficiency, channel uptime, and player application compatibility across consumer devices.</p>
        <h2>Our Core Technical Standards</h2>
        <ul>
          <li><strong>Zero Throttling CDN Edge Routing:</strong> We monitor 150+ Tier-1 datacenter edge nodes worldwide (Frankfurt, London, Amsterdam, New York, Dallas, Sydney) to ensure low packet latency and 99.98% SLA uptime during concurrent Sunday sports broadcasts.</li>
          <li><strong>Rigorous Hardware Testing:</strong> Every setup tutorial is empirically verified on physical hardware—including Amazon Fire TV Stick 4K Max, Nvidia Shield Pro, Apple TV 4K, Samsung Smart TVs (Tizen OS), and LG webOS.</li>
          <li><strong>Transparent Wholesale Economics:</strong> We equip independent digital entrepreneurs with high-margin reseller credit panels, custom DNS branding, and automated client activation systems without predatory contract lock-ins.</li>
          <li><strong>24/7 Real-Time Customer Desk:</strong> We provide real-time human engineering support via WhatsApp (<a href="{order}" target="_blank" rel="nofollow noopener noreferrer">{phone}</a>) with typical resolution response times under 5 minutes.</li>
        </ul>
        <h2>Editorial & Review Independence</h2>
        <p>All server performance ratings, frame rate measurements, and player comparisons are independently generated by our senior engineering desk. We prioritize viewer streaming quality, anti-freeze reliability, and consumer transparency above all else.</p>
      `,
    },
    contact: {
      title: 'Technical Support & Customer Desk',
      html: `
        <p>Have technical questions regarding a streaming device, Xtream Codes setup, or opening an IPTV reseller panel? Our engineering team is available 24/7/365.</p>
        <h2>Primary Direct Channels</h2>
        <ul>
          <li><strong>Priority WhatsApp Customer Desk:</strong> <a href="{order}" target="_blank" rel="nofollow noopener noreferrer">{phone}</a> (Average response: 2–5 minutes)</li>
          <li><strong>Direct Engineering Email:</strong> <a href="mailto:{email}">{email}</a></li>
          <li><strong>Operating Hours:</strong> 24 Hours a Day, 7 Days a Week, 365 Days a Year</li>
        </ul>
        <h2>Diagnostic Assistance Guidelines</h2>
        <p>To help us diagnose connection stutter or app configuration issues quickly, please provide your streaming device model, your installed player app (e.g. TiviMate, IPTV Smarters, IBO Player), and your current broadband download speed when contacting support.</p>
      `,
    },
    privacy: {
      title: 'Privacy Policy & Data Protection (GDPR & CCPA)',
      html: `
        <p>Last Updated: October 2026. At <strong>{name}</strong>, user privacy, digital anonymity, and data minimization are fundamental operational principles. This Privacy Policy outlines how technical information is handled when interacting with our website and support services.</p>
        <h2>1. Data Minimization & Collection Standards</h2>
        <p>We do not collect unnecessary personal tracking information. We only process technical data strictly required to deliver customer service and optimize website performance:</p>
        <ul>
          <li><strong>Voluntary Customer Communications:</strong> Contact details you voluntarily transmit to our desk (such as your WhatsApp handle or email address when requesting an activation or technical support).</li>
          <li><strong>Anonymized Technical Telemetry:</strong> Standard server access logs (browser user-agent, operating system category, anonymized IP headers) used strictly for DDOS mitigation and regional CDN load balancing.</li>
        </ul>
        <h2>2. Zero Personal Data Selling or Commercial Brokering</h2>
        <p>We maintain a strict zero-tolerance policy against data brokering. We do not sell, rent, lease, or monetize your contact details, usage logs, or streaming habits to third-party advertising exchanges, marketing aggregators, or analytical brokers.</p>
        <h2>3. Data Retention & Security Encryption</h2>
        <p>All customer communication channels are protected with end-to-end 256-bit SSL/TLS encryption. Temporary setup records and diagnostic trial logs are automatically expunged after 30 days of inactivity.</p>
        <h2>4. Your Rights Under GDPR (Articles 15–22) and CCPA</h2>
        <p>Regardless of your geographic location, you possess the full right to request verification, rectification, export, or immediate erasure of any customer support correspondence held by our desk. To exercise these rights, email our data desk at <a href="mailto:{email}">{email}</a>.</p>
      `,
    },
    terms: {
      title: 'Terms of Service & Operational Guidelines',
      html: `
        <p>Last Updated: October 2026. By accessing <strong>{name}</strong>, purchasing subscription credentials, or opening a wholesale reseller panel, you agree to these Terms of Service.</p>
        <h2>1. Service Scope & High-Availability SLA</h2>
        <p>{name} provides digital IPTV comparison information, server benchmark data, and streaming line credentials. While our multi-continental CDN architecture maintains a verified 99.98% server uptime SLA, individual stream performance is dependent on local broadband stability, router DNS configurations, and device hardware capabilities.</p>
        <h2>2. Authorized Fair Use & Multi-Room Limits</h2>
        <p>Each active streaming subscription is authorized strictly for the number of concurrent connections purchased (1, 2, 3, or 4 simultaneous devices). Unauthorized public re-streaming or distribution of individual account credentials outside purchased limits triggers automated security line suspension.</p>
        <h2>3. 24-Hour Free Trial & Satisfaction Guarantee</h2>
        <p>We provide a 24-hour test period to all prospective clients prior to purchasing extended plans. If a customer encounters an irreconcilable technical incompatibility on their verified hardware within 24 hours of account activation, our support desk provides prompt technical line replacement or credit refund.</p>
        <h2>4. Reseller Account Terms & Credit Protections</h2>
        <p>Purchased wholesale reseller credits carry zero expiration dates. Resellers maintain full pricing autonomy over their retail client base and manage customer accounts directly through their private administrative dashboard.</p>
        <h2>5. DMCA & Intellectual Property Compliance</h2>
        <p>{name} operates as an independent technical review, software configuration, and infrastructure connectivity service. We do not host, broadcast, or store media content streams on local servers. All trademarked logos and network titles belong exclusively to their respective owners.</p>
      `,
    },
    imprint: {
      title: 'Legal Notice & Imprint',
      html: `
        <p>Information pursuant to international online commercial transparency regulations:</p>
        <h2>Platform Operator Information</h2>
        <ul>
          <li><strong>Platform Brand:</strong> {name} (4ktrexiptv.com)</li>
          <li><strong>Direct Technical Desk:</strong> <a href="mailto:{email}">{email}</a></li>
          <li><strong>Priority WhatsApp Support:</strong> <a href="{order}" target="_blank" rel="nofollow noopener noreferrer">{phone}</a></li>
          <li><strong>Operational Hours:</strong> 24/7 Continuous Monitoring & Customer Assistance</li>
        </ul>
        <h2>Online Dispute Resolution (ODR)</h2>
        <p>In accordance with EU regulations on online dispute resolution for consumer affairs, consumers may access the European Commission's Online Dispute Resolution platform at <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="nofollow noopener noreferrer">https://ec.europa.eu/consumers/odr</a>. Our customer service desk is directly reachable via <a href="mailto:{email}">{email}</a>.</p>
      `,
    },
  },
};

const de: Dict = {
  home: 'Startseite', short: 'Kurz gesagt:', facts: 'Auf einen Blick', plans: 'Tarife', planHead: ['Tarif', 'Preis', 'Geeignet für'], faq: 'Häufige Fragen',
  also: 'Ähnliche Suchanfragen', related: 'Weitere Ratgeber', ctaH: 'Auf dem eigenen Gerät testen', ctaP: 'Starten Sie mit einem 24-Stunden-Gratis-Test und wählen Sie dann 3, 6 oder 12 Monate.', ctaBtn: '24h Gratis-Test anfragen', trialNav: '24h Gratis-Test',
  popular: 'Am beliebtesten', guidesIn: n => `${n} Ratgeber in diesem Bereich.`, allGuides: t => `Alle Ratgeber: ${t}`,
  hubIntro: 'Mit diesen Ratgebern vergleichen Sie Angebote, prüfen Geräte- und App-Kompatibilität und vermeiden typische Fehler. Jeder Ratgeber endet mit weiterführenden Links, damit Sie vom Grundlagenwissen bis zur funktionierenden Einrichtung kommen.',
  hubNew: ['Neu bei IPTV? Beginnen Sie mit dem', 'Gratis-Test', ', dann', 'Ihrem Gerät', 'und der App, die Sie nutzen werden.'],
  footerTag: 'Premium 4K IPTV-Dienst, Sport-Streaming und Mediathek über Ihre Internetverbindung.', guides: 'Ratgeber', contact: 'Kontakt', company: 'Unternehmen', chat: 'Per Chat bestellen',
  disclaimer: 'Die Verfügbarkeit von Sendern hängt von der Region ab. {name} bietet keinen Zugang zu Inhalten an, für die Sie keine Nutzungsrechte haben.',
  about: 'Über uns', privacy: 'Datenschutz', terms: 'AGB', imprint: 'Impressum',
  categories: {
    providers: { title: 'IPTV-Anbieter & Dienste', nav: 'IPTV-Anbieter', blurb: 'So vergleichen Sie IPTV-Anbieter, Dienste und Abos und worauf Sie vor dem Kauf achten sollten.' },
    reseller: { title: 'IPTV-Reseller-Panel & Programme', nav: 'Reseller', blurb: 'Reseller-Panels, Credits und Programme für den Weiterverkauf von IPTV-Abos im Überblick.' },
    locations: { title: 'IPTV nach Standort', nav: 'Standorte', blurb: 'IPTV-Dienste und lokale Streaming-Ratgeber für Deutschland, Europa und weitere Regionen.' },
    pricing: { title: 'IPTV-Abo & Preise', nav: 'Preise', blurb: 'Tarife, Preise und was ein faires IPTV-Abo enthalten sollte.' },
    trial: { title: 'IPTV kostenlos testen', nav: 'Gratis testen', blurb: 'Wie Testzugänge funktionieren, was Sie prüfen sollten und wie Sie schlechte Angebote erkennen.' },
    devices: { title: 'IPTV auf Ihrem Gerät', nav: 'Geräte', blurb: 'Fire TV, Android TV, Apple TV, Samsung, LG und mehr: Einrichtung und Kompatibilität.' },
    apps: { title: 'IPTV-Apps & Player', nav: 'Apps', blurb: 'IPTV Smarters, TiviMate, M3U-Playlists, EPG und Xtream Codes erklärt.' },
    sports: { title: 'Sport streamen', nav: 'Sport', blurb: 'So sehen Sie Live-Sport per IPTV und Streaming-Diensten und was Sie vorher prüfen sollten.' },
    setup: { title: 'IPTV einrichten & Fehler beheben', nav: 'Einrichten', blurb: 'Schritt-für-Schritt-Anleitungen zur Installation und Lösungen bei Ruckeln und typischen Fehlern.' },
  },
  homeTitle: `${SITE.name}: #1 Premium IPTV Anbieter & 24h Gratis Test (${SITE.year})`,
  homeDesc: n => `Über 20.000 Live-Sender & 60.000 VOD in 4K streamen mit ${SITE.name}. Anti-Freeze-Technologie, 99.9% Uptime, WhatsApp-Test und über ${n} Ratgeber.`,
  heroBadge: 'LIVE 4K SENDER • ANTI-FREEZE TECH 9.8 • SOFORT-AKTIVIERUNG',
  heroChecks: [
    '24-Stunden Gratis-Test per WhatsApp',
    '20.000+ Live-Sender in 4K & FHD',
    '60.000+ Filme & Serien auf Abruf',
    'Garantiert ohne Ruckeln & Buffering',
    'Läuft auf Fire TV, Smart-TV & Smartphone',
  ],
  trustStats: {
    channels: '20.000+', channelsLabel: 'Live-Sender (4K & FHD)',
    vod: '60.000+', vodLabel: 'Filme & Serien (VOD)',
    uptime: '99.98%', uptimeLabel: 'Server-Verfügbarkeit SLA',
    rating: '4.9 / 5', ratingLabel: 'Bewertung (3.800+ Kunden)',
  },
  hero: {
    h1: 'Der #1 Premium IPTV Anbieter 2026 – 4K Live-TV, Sport & VOD',
    p: 'Erleben Sie über 20.000 Live-Sender und 60.000 Filme & Serien in gestochen scharfem 4K & FHD. Streamen Sie Bundesliga, Champions League und weltweite Sender auf Fire TV Stick, Smart-TV, Apple TV und Smartphone ohne Ruckeln.',
    cta1: '24h Gratis-Test per WhatsApp anfordern',
    cta2: 'Tarife & Preise ansehen',
  },
  what: {
    h2: 'Warum unser Premium-IPTV-Dienst die beste Wahl ist',
    p1: 'Kabel- und Satellitenfernsehen kosten oft über 80 € monatlich bei langen Vertragslaufzeiten. Unser IPTV-Dienst bringt alle Live-Sender, internationalen Sport und eine riesige Mediathek direkt über Ihren Internetanschluss auf Ihren Fernseher.',
    p2: 'Dank leistungsstarker europäischer Serverknoten und intelligenter Anti-Freeze™ 9.8 Lastverteilung laufen selbst Top-Fußballspiele zur Hauptsendezeit flüssig und ohne Unterbrechung.',
    features: [
      ['Live-Sport in 4K & 60 FPS', 'Bundesliga, Champions League, Formel 1, Darts, NFL und Kampfsport in nativer Bildwiederholrate ohne Verzögerung.'],
      ['Anti-Freeze 9.8 Technologie', 'Automatische Server-Lastverteilung verhindert Ruckeln und Aussetzer auch bei Millionen zeitgleicher Zuschauer.'],
      ['Riesige Filme- & Serien-Mediathek', 'Über 60.000 aktuelle Filme und Serien auf Abruf mit deutscher Tonspur und wöchentlichen Neuerscheinungen.'],
      ['Auf allen Geräten nutzbar', 'Einfache Einrichtung auf Amazon Fire TV Stick, Android TV, Apple TV 4K, Samsung, LG, PC und Mobilgeräten.'],
      ['Kompletter 7-Tage-Programmführer (EPG)', 'Übersichtlicher elektronischer Programmführer, damit Sie immer wissen, was läuft.'],
      ['24/7 Persönlicher WhatsApp-Support', 'Direkte Hilfe bei Einrichtung und App-Auswahl in wenigen Minuten per WhatsApp.'],
    ],
  },
  channelHub: {
    h2: 'Riesige Senderauswahl & Weltweite Mediathek',
    lead: 'Alles, was Sie sehen möchten, an einem Ort. Von deutschen öffentlich-rechtlichen und privaten Sendern bis zu internationalen Sport- und Pay-TV-Kanälen.',
    categories: [
      {
        title: 'Live-Sport & Fußball',
        badge: 'Top 60FPS Feeds',
        desc: 'Alle Spiele und Wettbewerbe live ohne teure Einzelabonnements.',
        channels: ['Bundesliga & 2. Bundesliga live', 'UEFA Champions League & Europa League', 'Premier League & La Liga', 'Formel 1, Moto GP & Darts', 'NFL Game Pass & NBA League Pass', 'UFC Kampfabende & Boxen PPV'],
      },
      {
        title: 'Deutschland, Österreich & Schweiz',
        badge: 'DACH-Paket',
        desc: 'Vollständige Senderlisten in Full HD und 4K.',
        channels: ['ARD, ZDF, RTL, ProSieben, Sat.1 in FHD', 'Sky Deutschland Sport & Cinema', 'DAZN 1 & DAZN 2 Bar Feeds', 'MagentaTV & Sportkanäle', 'ORF 1 & ORF 2 (Österreich)', 'SRF 1 & SRF zwei (Schweiz)'],
      },
      {
        title: 'Internationales Fernsehen',
        badge: 'Weltweite Sender',
        desc: 'Sender aus ganz Europa, Nordamerika und aller Welt.',
        channels: ['UK: BBC One/Two, ITV, Sky Sports, TNT', 'USA: ABC, CBS, NBC, FOX, ESPN', 'Türkei: beIN Sports TR, Exxen, TRT', 'Arabisch: beIN Sports, MBC, Shahid', 'Ex-Yu, Polen, Italien, Spanien', 'Frankreich: Canal+, RMC Sport'],
      },
      {
        title: 'VOD Mediathek (Filme & Serien)',
        badge: 'Wöchentliche Updates',
        desc: 'Tausende Blockbuster und Serienhits auf Knopfdruck abrufen.',
        channels: ['Aktuelle Kinofilme 2026 in 4K', 'Beliebte Serienhits aller Streamingdienste', 'Kinderfilme, Animation & Disney', 'Dokus von Discovery & National Geographic', 'Klassiker & Filmreihen', 'Deutsche Synchronisation & Originalton'],
      },
    ],
  },
  countryCatalog: {
    h2: 'Weltweites Live-Fernsehen: Sender nach Ländern',
    lead: 'Über 50+ Länder mit vollständigen regionalen Senderpaketen und Sportkanälen.',
    countries: [
      {
        name: 'Deutschland, Österreich, Schweiz',
        flag: '🇩🇪',
        count: '1.650+ Sender',
        highlights: ['Sky Sport Bundesliga & Sport UHD', 'DAZN 1 & DAZN 2 Bar Feeds', 'ARD, ZDF, RTL, Pro7 in Full HD', 'ORF 1 & 2, SRF 1 & zwei'],
      },
      {
        name: 'Vereinigtes Königreich (UK)',
        flag: '🇬🇧',
        count: '1.400+ Sender',
        highlights: ['BBC One/Two, ITV 1-4, Channel 4/5', 'Sky Sports Main Event, PL, F1 UHD', 'TNT Sports 1-4 in Full HD & 4K', 'Sky Cinema & Entertainment'],
      },
      {
        name: 'USA & Nordamerika',
        flag: '🇺🇸',
        count: '3.800+ Sender',
        highlights: ['ABC, CBS, NBC, FOX Regionalsender', 'ESPN, ESPN2, FS1, CBS Sports', 'HBO, Showtime, Cinemax, Starz', 'Bally Sports & NFL Network'],
      },
      {
        name: 'Türkei & Balkan',
        flag: '🇹🇷',
        count: '1.250+ Sender',
        highlights: ['beIN Sports 1-5 Süper Lig live', 'Exxen Spor & TV8,5 Europa', 'TRT 1, ATV, Show TV, Kanal D', 'Ex-Jugoslawien: Arena Sport, SportKlub'],
      },
      {
        name: 'Frankreich & Belgien',
        flag: '🇫🇷',
        count: '1.100+ Sender',
        highlights: ['Canal+, Canal+ Sport & Cinema', 'beIN Sports France 1-3 & Max', 'RMC Sport 1-4 & Live-Events', 'TF1, M6, France 2-5 Full HD'],
      },
      {
        name: 'Arabische Welt (MENA)',
        flag: '🇸🇦',
        count: '2.400+ Sender',
        highlights: ['beIN Sports 1-9 & 4K Arabisch', 'MBC 1-5, Drama, Masr & Shahid VIP', 'OSN Cinema, Action, Series', 'Al Kass & SSC Sports Saudi'],
      },
      {
        name: 'Spanien & Lateinamerika',
        flag: '🇪🇸',
        count: '2.200+ Sender',
        highlights: ['Movistar+ LaLiga & Champions League', 'DAZN LaLiga & DAZN F1 Spanien', 'ESPN & Fox Sports Lateinamerika', 'Telemundo, Univision, Caracol'],
      },
      {
        name: 'Polen & Osteuropa',
        flag: '🇵🇱',
        count: '950+ Sender',
        highlights: ['Canal+ Sport & Eleven Sports Polen', 'Polsat Sport & TVP 1/2 Full HD', 'Tschechien, Slowakei, Ungarn', 'Griechenland & Rumänien TV'],
      },
    ],
  },
  sportsCatalog: {
    h2: 'Live-Sport-Programm & Wettbewerbe',
    lead: 'Verpassen Sie kein einziges Spiel mehr. Alle Ligen und Großevents mit flüssigen 60 Bildern pro Sekunde.',
    leagues: [
      {
        name: 'Fußball: Bundesliga & Champions League',
        tag: '4K & 60FPS',
        coverage: 'Alle Spiele der 1. und 2. Bundesliga, DFB-Pokal sowie UEFA Champions League und Europa League komplett live.',
        channels: 'Sky Sport Bundesliga, DAZN 1 & 2, Magenta Sport, Amazon Prime Feeds',
      },
      {
        name: 'Premier League & Internationale Ligen',
        tag: 'Alle Spiele',
        coverage: 'Englische Premier League, spanische La Liga, italienische Serie A und französische Ligue 1 ohne Unterbrechung.',
        channels: 'Sky Sports PL, TNT Sports, Movistar+, beIN Sports',
      },
      {
        name: 'Motorsport: Formel 1 & Moto GP',
        tag: 'Live Onboards',
        coverage: 'Jedes Rennwochenende von Training über Qualifying bis zum Rennen mit deutschen und internationalen Kommentatoren.',
        channels: 'Sky Sport F1 UHD, ServusTV Österreich, SRF zwei, F1 TV Pro',
      },
      {
        name: 'Kampfsport: UFC & Boxen Pay-per-View',
        tag: 'PPV Inklusive',
        coverage: 'Alle UFC-Hauptkämpfe (UFC 300+), Fight Nights, DAZN Boxing und exklusive Pay-per-View-Events ohne Zusatzgebühr.',
        channels: 'DAZN, TNT Sports Box Office, ESPN+ PPV, Main Event',
      },
      {
        name: 'US-Sport: NFL & NBA',
        tag: 'Keine Blackouts',
        coverage: 'NFL Regular Season, RedZone-Konferenz, Playoffs & Super Bowl sowie NBA League Pass mit allen 82 Spielen pro Team.',
        channels: 'NFL Network, DAZN NFL Game Pass, NBA TV, ESPN',
      },
      {
        name: 'Darts, Tennis & Eishockey',
        tag: 'Full HD',
        coverage: 'PDC Darts-WM, Grand Slam Turniere (Wimbledon, US Open, Roland Garros) und DEL Deutsche Eishockey Liga.',
        channels: 'Sport1, DAZN Darts, Eurosport 1 & 2, Magenta Sport',
      },
    ],
  },
  techFeatures: {
    h2: 'Erstklassige Server-Infrastruktur',
    lead: 'Wir setzen auf professionelle Hochleistungsserver statt billiger Wiederverkäufer-Feeds.',
    items: [
      ['10 Gbit/s Hochgeschwindigkeits-Server', 'Rechenzentren in Frankfurt, Amsterdam und London garantieren minimale Latenz und stabilen Datendurchsatz.'],
      ['Moderne H.265 / HEVC Enkodierung', 'Kristallklares Bild bei bis zu 40% geringerem Bandbreitenbedarf im Vergleich zu alten H.264-Streams.'],
      ['Sofortige Freischaltung in 2 Minuten', 'Erhalten Sie Ihren Xtream-Codes-Login oder M3U-Link unmittelbar nach Ihrer Anfrage per WhatsApp.'],
      ['Catch-Up TV & 7-Tage-Replay', 'Verpasste Sendungen oder Spiele bis zu 7 Tage rückwirkend auf vielen Hauptsendern ansehen.'],
    ],
  },
  steps: {
    h2: 'In 4 einfachen Schritten startklar',
    items: [
      ['24-Stunden-Gratis-Test anfragen.', 'Schreiben Sie uns kurz auf WhatsApp. Nennen Sie Ihr Gerät und erhalten Sie Ihre Zugangsdaten in wenigen Minuten.'],
      ['Player-App installieren.', 'Laden Sie IPTV Smarters Pro, TiviMate oder IBO Player auf Ihren Fire TV Stick oder Fernseher herunter.'],
      ['Zugangsdaten eintragen.', 'Geben Sie Server-Adresse, Benutzername und Passwort (Xtream Codes) oder den M3U-Link in die App ein.'],
      ['In 4K genießen!', 'Senderliste und Programmführer laden automatisch. Viel Spaß beim Fernsehen!'],
    ],
  },
  deviceTutorials: {
    h2: 'Schritt-für-Schritt-Anleitungen nach Gerät',
    lead: 'Wählen Sie Ihre Hardware für die genaue Installationsanleitung und empfohlene Apps.',
    tutorials: [
      {
        title: 'Amazon Fire TV Stick & Fire TV Cube',
        badge: 'Am Beliebtesten',
        steps: [
          'Installieren Sie die App „Downloader“ kostenlos aus dem Amazon Appstore.',
          'Öffnen Sie Einstellungen > Mein Fire TV > Entwickleroptionen > Unbekannte Apps installieren > Downloader auf AN.',
          'Geben Sie im Downloader den Zahlencode 25240 (IPTV Smarters Pro) oder 278077 (TiviMate) ein.',
          'Starten Sie die App, wählen Sie „Login mit Xtream Codes API“ und tragen Sie Ihre WhatsApp-Zugangsdaten ein.',
        ],
        tip: 'Tipp: Stellen Sie in den App-Einstellungen den Hardware-Decoder ein für ruckelfreien 60FPS-Sport.',
      },
      {
        title: 'Android TV & Google TV (NVIDIA Shield, Chromecast, Sony)',
        badge: 'Play Store Direkt',
        steps: [
          'Öffnen Sie den Google Play Store direkt auf Ihrem Fernseher oder Ihrer Box.',
          'Suchen Sie nach „TiviMate IPTV Player“ oder „IPTV Smarters Pro“ und installieren Sie die App.',
          'Klicken Sie auf „Playlist hinzufügen“ und wählen Sie „Xtream Codes API“.',
          'Tragen Sie Server-Adresse, Benutzername und Passwort ein. Senderliste und EPG laden automatisch.',
        ],
        tip: 'Tipp: TiviMate gilt als bester Player für Android TV mit Zifferntasten-Unterstützung und 7-Tage-EPG.',
      },
      {
        title: 'Apple TV 4K, iPhone & iPad',
        badge: 'iOS & tvOS',
        steps: [
          'Öffnen Sie den Apple App Store auf Ihrem Apple TV oder iPhone.',
          'Laden Sie „IPTVX“, „Smarters Player Lite“ oder „GSE Smart IPTV“ herunter.',
          'Wählen Sie Xtream API Login und fügen Sie die erhaltenen Zugangsdaten ein.',
          'Genießen Sie native 4K-Wiedergabe mit Dolby Audio und AirPlay-Unterstützung.',
        ],
        tip: 'Tipp: Der Apple TV 4K mit LAN-Kabel bietet die schnellsten Umschaltzeiten der gesamten Branche (<0,3s).',
      },
      {
        title: 'Samsung (Tizen) & LG (webOS) Smart-TVs',
        badge: 'Ohne Extra-Stick',
        steps: [
          'Öffnen Sie den Samsung Smart Hub oder den LG Content Store auf Ihrem Fernseher.',
          'Suchen Sie nach „IBO Player“, „Nanomid Player“ oder „Smart IPTV“ und installieren Sie die App.',
          'Notieren Sie sich die auf dem Bildschirm angezeigte MAC-Adresse und den Device Key.',
          'Senden Sie diese zwei Angaben an unseren WhatsApp-Support zur direkten Freischaltung.',
        ],
        tip: 'Tipp: Kein zusätzlicher Streaming-Stick nötig! Native Smart-TV-Apps lassen sich bequem per TV-Fernbedienung steuern.',
      },
    ],
  },
  plansBlock: {
    h2: 'Faire Tarife – Keine versteckten Kosten',
    lead: 'Wählen Sie 3, 6 oder 12 Monate mit bis zu 4 gleichzeitigen Geräten. Alle Tarife enthalten über 20.000 Sender, 60.000 VOD-Titel, EPG und VIP-Support.',
    choose: 'Tarif wählen & per WhatsApp bestellen',
  },
  comparison: {
    h2: 'Unser Service im Vergleich zu Kabel-TV & Gratis-IPTV',
    lead: 'Warum sich über 45.000 Kunden für unseren stabilen Premium-Dienst entschieden haben.',
    headers: ['Kriterium', 'Unser Premium-IPTV', 'Klassisches Kabel / Sky', 'Gratis- / Billig-IPTV'],
    rows: [
      ['Monatlicher Preis', 'Ab ca. 6,66 € / Monat', '80 – 130 € / Monat', '0 – 5 € / Monat'],
      ['Senderauswahl', '20.000+ Sender weltweit', '80 – 150 Sender', 'Häufig tote Links'],
      ['Live-Sport & Pay-per-View', 'Alle Sender inklusive', 'Teure Zusatzpakete', 'Stürzt beim Anpfiff ab'],
      ['Filme & Serien (VOD)', '60.000+ Titel in 4K', 'Zusatzkosten pro Abruf', 'Fehlende deutsche Tonspur'],
      ['Geräteunterstützung', 'Fire TV, Smart-TV, Handy', 'Nur Miet-Receiver', 'Schwierige Einrichtung'],
      ['Vertragslaufzeit', 'Keine Bindung (endet von selbst)', '12 bis 24 Monate Vertrag', 'Verschwindet nach Tagen'],
      ['Anti-Freeze & Stabilität', 'Ja (Anti-Freeze 9.8)', 'Stabil (wetterabhängig)', 'Ständiges Puffern'],
      ['Support', '24/7 WhatsApp VIP-Hilfe', 'Lange Telefon-Warteschleifen', 'Kein Support vorhanden'],
    ],
  },
  buyersChecklist: {
    h2: 'IPTV-Käufer-Checkliste: 6 Punkte vor dem Kauf',
    lead: 'Schützen Sie sich vor unzuverlässigen Anbietern durch Prüfung dieser Qualitätskriterien.',
    points: [
      {
        title: 'Bestehen Sie auf einen 24h-Test zur Hauptsendezeit',
        desc: 'Kaufen Sie niemals ein IPTV-Abo, ohne es vorher abends zwischen 20 und 23 Uhr oder während eines Bundesliga-Topspiels getestet zu haben.',
      },
      {
        title: 'Nutzen Sie Xtream Codes API statt reiner M3U-Dateien',
        desc: 'Riesige M3U-Dateien verlangsamen viele Streaming-Sticks. Xtream Codes API lädt Inhalte dynamisch und hält Ihre App blitzschnell.',
      },
      {
        title: 'Prüfen Sie Anti-Freeze und Server-Redundanz',
        desc: 'Ein seriöser Anbieter betreibt redundante CDN-Server in Frankfurt und Amsterdam, um Zuschaueranstürme bei Champions-League-Spielen abzufangen.',
      },
      {
        title: 'Achten Sie auf deutsche Sender und synchronisierten EPG',
        desc: 'Tausende ausländische Sender nützen nichts, wenn die deutschen Hauptsender fehlen oder der Programmführer um Stunden verschoben ist.',
      },
      {
        title: 'Stellen Sie parallele Streams im Haushalt sicher',
        desc: 'Wählen Sie einen Tarif mit mehreren Verbindungen, damit im Wohnzimmer Fußball und im Schlafzimmer Serien gestreamt werden können.',
      },
      {
        title: 'Bevorzugen Sie direkten WhatsApp-Support',
        desc: 'Wenn am Spieltag Fragen auftreten, hilft kein Ticket-System mit 48 Stunden Wartezeit. Schnelle WhatsApp-Hilfe ist unverzichtbar.',
      },
    ],
  },
  testimonials: {
    h2: 'Das sagen unsere Kunden',
    lead: 'Echte Rückmeldungen von Sportfans, Filmbegeisterten und Familien.',
    items: [
      {
        name: 'Michael B.',
        device: 'Fire TV Stick 4K Max',
        rating: 5,
        quote: 'Habe mein teures Pay-TV gekündigt und bin begeistert. Bundesliga läuft in 60 Bildern pro Sekunde glasklar und ohne Hänger.',
        tag: 'Verifizierter Kunde (12-Monats-Abo)',
      },
      {
        name: 'Stefan K.',
        device: 'Samsung Smart-TV (TiviMate)',
        rating: 5,
        quote: 'Die Einrichtung war per WhatsApp in 5 Minuten erledigt. Der EPG-Programmführer ist vollständig und die Umschaltzeiten sind extrem schnell.',
        tag: 'Verifizierter Kunde (12-Monats-Abo)',
      },
      {
        name: 'Christian M.',
        device: 'Apple TV 4K',
        rating: 5,
        quote: 'Hervorragende Bildqualität bei Champions League und Formel 1. Man merkt sofort, dass hier echte Hochleistungsserver dahinterstehen.',
        tag: 'Verifizierter Kunde (6-Monats-Abo)',
      },
      {
        name: 'Laura S.',
        device: 'LG OLED TV',
        rating: 5,
        quote: 'Riesige Auswahl an Filmen für die Familie und der Kundenservice auf WhatsApp antwortet auch am Wochenende sofort.',
        tag: 'Verifizierter Kunde (12-Monats-Abo)',
      },
    ],
  },
  seoGuide: {
    h2: 'Alles Wissenswerte über IPTV im Jahr 2026',
    lead: 'Der ausführliche Leitfaden zu Technik, Voraussetzungen und ruckelfreiem Streaming auf allen Geräten.',
    articles: [
      {
        h3: 'Was ist IPTV und wie funktioniert modernes Internet-Fernsehen?',
        text: 'IPTV (Internet Protocol Television) überträgt Fernsehsender und Videoinhalte digital über das Internet anstelle von herkömmlichen Satellitenschüsseln oder Kabelbuchsen. Die Signale werden über ein IP-Netzwerk an Player-Apps auf Smart-TVs, Streaming-Sticks oder Smartphones gesendet, wodurch keine teure Empfangshardware mehr gemietet werden muss.',
      },
      {
        h3: 'Warum ruckeln kostenlose Playlists und wie hilft Anti-Freeze?',
        text: 'Kostenlose oder billige Playlists aus dem Internet laufen auf überlasteten Servern ohne Bandbreitenreserven. Sobald viele Nutzer zeitgleich zuschauen, bricht die Datenrate ein. Unsere Infrastruktur nutzt intelligente Anti-Freeze™ Lastverteilung auf 10 Gbit/s Glasfaser-Servern, um Datenströme dynamisch umzuleiten und konstante Bitraten zu garantieren.',
      },
      {
        h3: 'Welche Internetgeschwindigkeit wird für 4K-Streaming benötigt?',
        text: 'Für flüssiges Full HD empfehlen wir eine stabile Datenrate von mindestens 15 Mbit/s. Für echtes 4K Ultra HD und 60 FPS Sportübertragungen sind 25 Mbit/s oder mehr pro Gerät ideal. Um WLAN-Störungen zu vermeiden, empfiehlt sich bei Smart-TVs und Streaming-Boxen der Anschluss per LAN-Kabel.',
      },
      {
        h3: 'Xtream Codes API oder M3U: Welches Format ist besser?',
        text: 'Beide Formate stellen die Verbindung zu den Servern her. Xtream Codes (Server-URL, Benutzername und Passwort) ist jedoch moderner und komfortabler: Es lädt Live-TV, Filme, Serien und den elektronischen Programmführer (EPG) strukturiert in die App, ohne dass Sie Playlist-Dateien manuell aktualisieren müssen.',
      },
    ],
  },
  speedMatrix: {
    h2: 'Internet-Geschwindigkeit & Bandbreiten-Bedarf für 4K-IPTV',
    lead: 'Passen Sie Ihre Internetgeschwindigkeit an die empfohlenen IPTV-Bitraten an, um Ruckler und Aussetzer bei Live-Sportübertragungen zu vermeiden.',
    headers: ['Stream-Qualität', 'Auflösung & FPS', 'Mindest-Datenrate', 'Empfohlene Geschwindigkeit', 'Max. Ping-Latenz'],
    rows: [
      { quality: 'Standard (SD)', badge: 'sd', res: '480p / 576p (25/30 fps)', min: '5 Mbit/s', rec: '10 Mbit/s', ping: '< 100 ms', buffer: '0.5s' },
      { quality: 'High Definition (HD)', badge: 'hd', res: '720p / 1080p (30 fps)', min: '12 Mbit/s', rec: '20 Mbit/s', ping: '< 60 ms', buffer: '1.0s' },
      { quality: 'Full HD Sport (FHD)', badge: 'fhd', res: '1080p (60 fps High Bitrate)', min: '20 Mbit/s', rec: '35 Mbit/s', ping: '< 40 ms', buffer: '2.0s' },
      { quality: 'Ultra HD 4K (UHD)', badge: 'uhd', res: '2160p (50/60 fps HDR HEVC)', min: '40 Mbit/s', rec: '60+ Mbit/s', ping: '< 25 ms', buffer: '3.0s' },
    ],
    tips: [
      'Direktes LAN-Kabel: Verbinden Sie Ihren Streaming-Stick oder TV per Ethernet-Kabel, um WLAN-Paketverluste auszuschließen.',
      '5-GHz-WLAN-Frequenz: Wenn WLAN unvermeidbar ist, nutzen Sie das 5-GHz-Band anstelle des überlasteten 2,4-GHz-Bandes.',
      'Eigener DNS-Server (1.1.1.1 / 8.8.8.8): Stellen Sie im Gerät Cloudflare- oder Google-DNS ein, um Provider-Drosselungen zu umgehen.',
      'Hardware-Videodecoder: Aktivieren Sie in TiviMate oder Smarters immer die Hardware-Beschleunigung für flüssige 60 FPS.',
    ],
  },
  appMatrix: {
    h2: 'Die besten IPTV-Player-Apps im Vergleich (2026)',
    lead: 'Unser Dienst ist vollständig kompatibel mit allen führenden Player-Apps auf Android, Fire TV, Apple TV, Smart-TVs und PC.',
    apps: [
      {
        name: 'TiviMate IPTV Player',
        badge: 'Beste App für Fire TV & Android',
        platforms: 'Amazon Fire TV Stick, Android TV, Google TV, NVIDIA Shield',
        protocols: 'Xtream Codes API, M3U8, Stalker MAC',
        features: ['7-Tage Catch-Up Replay', 'Multi-View (bis zu 4 Sender gleichzeitig)', 'Individuelle EPG-Zuordnung', 'Automatische Senderlisten-Updates'],
        bestFor: 'Wohnzimmer-Hauptfernseher und Sportbegeisterte',
      },
      {
        name: 'IPTV Smarters Pro',
        badge: 'Bester Allrounder',
        platforms: 'iOS (iPhone/iPad), Android, Firestick, Windows, Mac, LG, Samsung',
        protocols: 'Xtream Codes API, M3U-Playlist-URL',
        features: ['Mehrbenutzer-Verwaltung', 'Integrierter Mediaplayer mit Untertitel-Sync', 'Globale Sendersuche & VOD-Filter', 'Kindersicherung per PIN-Code'],
        bestFor: 'Haushalte mit verschiedenen Geräten und unterwegs',
      },
      {
        name: 'IBO Player & XCIPTV',
        badge: 'Ultraschnelles Umschalten',
        platforms: 'Samsung Tizen, LG webOS, Android, Apple TV',
        protocols: 'MAC-Aktivierung & Xtream Codes API',
        features: ['Umschaltzeiten unter 1 Sekunde', '4K HDR Passthrough', 'Direkte Tonspurauswahl', 'Übersichtliches, modernes Menü'],
        bestFor: 'Smart-TVs ohne zusätzlichen Streaming-Stick',
      },
      {
        name: 'Flix IPTV & Smart IPTV',
        badge: 'Smart-TV Klassiker',
        platforms: 'Samsung Tizen OS, LG webOS, Sony Android TV',
        protocols: 'MAC-basierte M3U-Synchronisation',
        features: ['Webbasierter Playlist-Upload', 'Minimaler Speicherbedarf', 'EPG-Zeitzonenkorrektur', 'Ausblenden ungenutzter Länderpakete'],
        bestFor: 'Ältere Smart-TVs mit begrenztem Speicher',
      },
      {
        name: 'Formuler MyTVOnline 2/3',
        badge: 'Dedizierte Hardware-Spitze',
        platforms: 'Formuler Z10 / Z11 Pro Max Streaming-Boxen',
        protocols: 'Stalker Portal, XC API, M3U',
        features: ['Hardware-USB-Aufnahmefunktion (PVR)', 'Nahtloses Timeshift auf Festplatte', 'Bild-in-Bild (PiP)', 'Echtes Satelliten-Receiver-Gefühl'],
        bestFor: 'Heimkino-Enthusiasten mit höchsten Ansprüchen',
      },
      {
        name: 'GSE Smart IPTV & Kodi',
        badge: 'Für Power-User & HTPC',
        platforms: 'Apple TV 4K, iOS, macOS, Linux, Windows PC',
        protocols: 'JSON, M3U8, EPG XMLTV, RTMP',
        features: ['AirPlay 2 Streaming', 'Kodi IPTV Simple Client Integration', 'Erweiterte Untertitel-Einstellungen', 'Proxy- & HTTP-Stream-Unterstützung'],
        bestFor: 'Apple-Nutzer und individuelle Media-Center',
      },
    ],
  },
  vodHub: {
    h2: 'Über 60.000 Filme & 25.000 Serien in der 4K-Mediathek',
    lead: 'Sparen Sie sich mehrere teure Streaming-Abos. Zugriff auf die weltgrößte VOD-Mediathek in 4K HDR mit deutscher Tonspur und Untertiteln.',
    totalMovies: '60.000+ Spielfilme',
    totalSeries: '25.000+ Komplette Serienstaffeln',
    categories: [
      {
        title: 'Kinofilme & Blockbuster 2026',
        count: '12.500+ Filme',
        desc: 'Aktuelle Kino-Neuerscheinungen wöchentlich aktualisiert in echtem 4K UHD, HDR10+ und Dolby Atmos Ton.',
        tags: ['Action', 'Sci-Fi', 'Thriller', 'IMAX Enhanced'],
      },
      {
        title: 'Originals von Netflix, Disney+ & HBO Max',
        count: '8.400+ Serien',
        desc: 'Alle Staffeln und frisch ausgestrahlten Episoden der beliebtesten Streaming-Dienste gebündelt an einem Ort.',
        tags: ['Komplette Staffeln', 'Tägliche Updates', 'Dolby Vision'],
      },
      {
        title: 'Deutsche & Internationale Film-Highlights',
        count: '18.000+ Filme',
        desc: 'Riesige Auswahl deutscher Filmklassiker sowie Hollywood- und europäische Produktionen mit deutscher Tonspur.',
        tags: ['Deutsche Tonspur', 'Originalversion', 'Untertitel'],
      },
      {
        title: 'Dokumentationen, Familie & Kinderbereich',
        count: '9.200+ Titel',
        desc: 'Faszinierende 4K-Naturdokus von BBC Earth & National Geographic sowie kindersichere Zeichentrickfilme von Pixar & Disney.',
        tags: ['4K Natur', 'Kinderbereich', 'Kindersicher'],
      },
    ],
  },
  troubleshooting: {
    h2: 'Der ultimative IPTV-Fehlerbehebungs-Leitfaden',
    lead: 'Sender stockt oder lädt nicht? 99 % aller Probleme liegen an Router, Provider-Drosselung oder App-Einstellungen. Hier sind die Sofortlösungen.',
    items: [
      {
        title: 'Ständiges Buffern oder Ruckeln bei Live-Fussballspielen',
        cause: 'Provider-Drosselung von Videopaketen zur Hauptsendezeit oder WLAN-Störungen auf 2,4 GHz.',
        fix: 'Ändern Sie den DNS-Server in Ihrem Gerät auf Cloudflare (1.1.1.1) oder Google (8.8.8.8). Wechseln Sie von WLAN auf ein LAN-Kabel oder 5-GHz-WLAN. Erhöhen Sie in den App-Einstellungen die Puffergröße (Stream Buffer) von "Kein" auf "Groß".',
      },
      {
        title: 'Ton und Bild sind asynchron oder kein Ton vorhanden',
        cause: 'Inkompatibilität des Hardware-Decoders mit mehrkanaligen AAC- oder Dolby-Digital-Plus-Tonspuren.',
        fix: 'Öffnen Sie in Ihrer App Einstellungen → Wiedergabe → Decoder. Stellen Sie den Audio-Decoder von "Hardware" auf "Software" (oder "OpenSL ES") um. In VLC/Kodi können Sie die Audioverzögerung manuell anpassen (+/- 200ms).',
      },
      {
        title: '"Zugangsdaten ungültig", "Auth Failed" oder Server nicht erreichbar',
        cause: 'Versehentliches Leerzeichen beim Kopieren von Benutzername/Passwort oder abgelaufener Testzugang.',
        fix: 'Prüfen Sie, ob vor oder nach Benutzername und Passwort ein Leerzeichen steht. Stellen Sie sicher, dass die Server-URL das "http://" und den korrekten Port enthält. Schreiben Sie uns auf WhatsApp für eine sofortige Überprüfung.',
      },
      {
        title: 'Programmführer (EPG) ist leer oder zeigt "Keine Information"',
        cause: 'App-Zwischenspeicher ist voll oder Aktualisierungsintervall zu selten eingestellt.',
        fix: 'Gehen Sie in den Einstellungen der App auf EPG. Löschen Sie den EPG-Cache und klicken Sie auf "EPG jetzt aktualisieren". Prüfen Sie zudem, ob Uhrzeit und Zeitzone auf Ihrem Gerät exakt eingestellt sind.',
      },
      {
        title: 'Schwarzer Bildschirm mit Laderad bei einzelnen Sendern',
        cause: 'Veraltetes Stream-Format oder kurzzeitige Server-Umleitung.',
        fix: 'Stellen Sie das Stream-Format in den App-Einstellungen von MPEG-TS (.ts) auf HLS (.m3u8) um. Starten Sie Ihren Streaming-Stick und Router einmal neu, um den DNS-Cache zu leeren.',
      },
    ],
  },
  glossary: {
    h2: 'Das große IPTV-Fachbegriffe-Lexikon (A bis Z)',
    lead: 'Verstehen Sie die wichtigsten Protokolle, Video-Codecs und Fachbegriffe rund um modernes Internet-Fernsehen.',
    terms: [
      {
        term: 'M3U & M3U8 Playlist',
        tag: 'Protokoll',
        def: 'Ein einfaches Textdateiformat, das Stream-Adressen und Senderbeschriftungen (#EXTINF) enthält. M3U8 ist die moderne UTF-8-Variante für HLS-Streaming.',
      },
      {
        term: 'Xtream Codes API',
        tag: 'Architektur',
        def: 'Die führende Schnittstelle zur Authentifizierung bei IPTV. Sie lädt Sender, Filme, Serien und Programmführer geordnet über JSON direkt in die App.',
      },
      {
        term: 'EPG (XMLTV-Format)',
        tag: 'Metadaten',
        def: 'Elektronischer Programmführer im XML-Format mit Sendezeiten, Sendungsbeschreibungen, Episodentiteln und Vorschauen für die nächsten 7 Tage.',
      },
      {
        term: 'Anti-Freeze™ 9.8 Protokoll',
        tag: 'Infrastruktur',
        def: 'Intelligentes Server-Lastverteilungssystem, das Datenströme bei hoher Belastung in Millisekunden auf freie Rechenzentrumsknoten umleitet, um Ruckler zu verhindern.',
      },
      {
        term: 'HEVC / H.265 Codec',
        tag: 'Videokompression',
        def: 'Moderner Videokompressionsstandard mit doppelter Effizienz gegenüber H.264, der gestochen scharfes 4K UHD bei 60 FPS über normale Internetleitungen ermöglicht.',
      },
      {
        term: 'Catch-Up TV (Replay)',
        tag: 'Funktion',
        def: 'Serverbasierte Aufnahmefunktion, mit der Sie verpasste Sendungen und Livespiele bis zu 7 Tage rückwirkend auf Knopfdruck abrufen können.',
      },
      {
        term: 'Provider-Drosselung (Throttling)',
        tag: 'Netzwerk',
        def: 'Gezielte Bandbreitenbegrenzung bestimmter Internetanbieter während populärer Fußballspiele, die durch DNS-Anpassungen umgangen werden kann.',
      },
      {
        term: 'Content Delivery Network (CDN)',
        tag: 'Cloud-Knoten',
        def: 'Weltweit verteiltes Netzwerk von Serverknoten, die Videostreams in geografischer Nähe des Zuschauers vorhalten, um Latenzen zu minimieren.',
      },
    ],
  },
  datacenterNetwork: {
    h2: 'Weltweites Server-Netzwerk & Echtzeit-Latenzzeiten',
    lead: 'Unsere Streaming-Cluster laufen in europäischen Tier-4-Rechenzentren mit redundanten 10-Gbit/s-Glasfaseranbindungen für verzögerungsfreie Übertragung.',
    nodes: [
      { city: 'Frankfurt am Main', country: 'Deutschland', ping: '< 10 ms', capacity: '20 Gbit/s Tier-4', tag: 'DACH Hauptknoten' },
      { city: 'London', country: 'Großbritannien', ping: '< 12 ms', capacity: '20 Gbit/s Equinix', tag: 'UK & Irland Knoten' },
      { city: 'Amsterdam', country: 'Niederlande', ping: '< 14 ms', capacity: '40 Gbit/s AMS-IX', tag: 'EU Core Backbone' },
      { city: 'New York', country: 'USA', ping: '< 18 ms', capacity: '20 Gbit/s NY4', tag: 'US Ostküste' },
      { city: 'Dallas / Chicago', country: 'USA', ping: '< 22 ms', capacity: '10 Gbit/s Central', tag: 'US Zentralknoten' },
      { city: 'Sydney', country: 'Australien', ping: '< 15 ms', capacity: '10 Gbit/s SY4', tag: 'ANZ Direktroute' },
      { city: 'Paris', country: 'Frankreich', ping: '< 15 ms', capacity: '10 Gbit/s PAR2', tag: 'Westeuropa Hub' },
      { city: 'Montreal', country: 'Kanada', ping: '< 20 ms', capacity: '10 Gbit/s Cologix', tag: 'Kanada Knoten' },
    ],
  },
  vsFreeResellers: {
    h2: 'Warum Billig-Reseller und kostenlose Playlists versagen',
    lead: 'Die technischen Unterschiede zwischen unzuverlässigen 20-Euro-Bastellösungen und unserer professionellen Server-Infrastruktur.',
    items: [
      {
        title: 'Server-Bandbreite & Hardware',
        free: 'Überfüllte 5-Euro-VPS-Server mit 1.000 Nutzern auf einer Leitung. Brechen bei Spitzenspielen sofort zusammen.',
        us: 'Dedizierte Tier-4-Unternehmensserver mit 10–40 Gbit/s Glasfaser und automatischer Lastverteilung.',
      },
      {
        title: 'Bildqualität & Bildwiederholrate',
        free: 'Stark komprimierte 720p 25 FPS Feeds mit ständigem Nachladen und 3–5 Minuten Zeitverzögerung.',
        us: 'Echtes 4K UHD und Full HD mit 60 FPS in HEVC H.265 ohne Zeitverzögerung zur TV-Ausstrahlung.',
      },
      {
        title: 'Kundenservice & Zuverlässigkeit',
        free: 'Anonyme Verkäufer in Foren oder Telegram, die nach 2 Wochen nicht mehr erreichbar sind.',
        us: '24/7 persönlicher deutschsprachiger WhatsApp-Kundendienst mit 2 Minuten Reaktionszeit.',
      },
      {
        title: 'Elektronischer Programmführer (EPG)',
        free: 'Fehlende oder falsche EPG-Daten, ständiges manuelles Nachpflegen von Links erforderlich.',
        us: 'Automatisch synchronisierter 7-Tage-EPG mit Senderlogos, Sendungsbeschreibungen und Replay-Funktion.',
      },
    ],
  },
  devices: { h2: 'Unterstützte Geräte & Einrichtungsanleitungen', lead: 'Anleitungen für jeden Smart-TV, Streaming-Stick und jedes Smartphone.', all: 'Alle Geräte-Ratgeber ansehen →' },
  sports: { h2: 'Live-Sport in brillanter Qualität streamen', lead: 'Verpassen Sie kein Tor und keinen Zweikampf mehr. Entdecken Sie unsere Sport-Ratgeber.', all: 'Alle Sport-Ratgeber ansehen →' },
  choose: { h2: 'Worauf Sie bei einem IPTV-Anbieter achten sollten', head: ['Prüfpunkt', 'Warum es wichtig ist'], more: 'Alle Anbieter-Ratgeber lesen →', rows: [['24h Gratis-Test', 'Prüfen Sie Bildqualität und Stabilität zur Hauptsendezeit vor dem Kauf.'], ['Vollständige Senderliste', 'Stellen Sie sicher, dass Ihre gewünschten regionalen und Sport-Sender enthalten sind.'], ['Mehrere Zugänge', 'Ermöglicht gleichzeitiges Fernsehen auf mehreren Geräten im Haushalt.'], ['Xtream-Codes-Unterstützung', 'Garantiert Kompatibilität mit den besten Apps wie TiviMate und IPTV Smarters.'], ['EPG-Programmführer', 'Macht die riesige Senderauswahl erst übersichtlich und komfortabel bedienbar.'], ['Schneller WhatsApp-Support', 'Sofortige Unterstützung bei Fragen zur Einrichtung oder Verlängerung.']] },
  appsBlock: { h2: 'Apps, Playlists und Einrichtung', lead: 'Neu dabei? Beginnen Sie mit den App-Ratgebern und lesen Sie dann den Bereich Einrichtung und Fehlerbehebung.' },
  homeFaq: [
    { q: 'Was ist IPTV und wie funktioniert es?', a: 'IPTV (Internet Protocol Television) überträgt Live-TV, Sport und Filme über Ihre bestehende Internetverbindung direkt auf Smart-TV, Fire TV Stick, Smartphone oder PC – ganz ohne Satellitenschüssel oder Kabelvertrag.' },
    { q: 'Gibt es einen unverbindlichen Gratis-Test?', a: 'Ja! Wir bieten einen 24-stündigen kostenlosen Testzugang mit vollem Zugriff auf alle 20.000+ Sender, Sportkanäle und Filme. Schreiben Sie uns einfach auf WhatsApp, und wir senden Ihnen Ihre Zugangsdaten in 2 Minuten.' },
    { q: 'Welche Geräte und Apps werden unterstützt?', a: 'Unser Dienst ist kompatibel mit Amazon Fire TV Stick (alle Modelle), Android TV / Google TV, Apple TV 4K, Samsung Smart-TVs (Tizen), LG Smart-TVs (webOS), MAG- & Formuler-Boxen, Windows, Mac, iPhone und Android-Smartphones.' },
    { q: 'Welche Internetgeschwindigkeit brauche ich für 4K?', a: 'Wir empfehlen mindestens 15 Mbit/s für Full HD und ab 25 Mbit/s für 4K Ultra HD. Ein LAN-Kabel oder 5-GHz-WLAN sorgt für die beste Verbindung.' },
    { q: 'Wie verhindert die Anti-Freeze-Technologie Ruckeln?', a: 'Unsere Streams laufen auf europäischen 10 Gbit/s Hochleistungsservern mit automatischer Lastverteilung. Bei hohem Zuschaueraufkommen wird der Stream automatisch auf freie Server umgeleitet, sodass kein Buffern entsteht.' },
    { q: 'Kann ich auf mehreren Geräten gleichzeitig schauen?', a: 'Ja, wir bieten Tarife mit 1, 2, 3 oder 4 gleichzeitigen Verbindungen an, damit die ganze Familie in verschiedenen Räumen unterschiedliche Sender sehen kann.' },
    { q: 'Was ist der Unterschied zwischen Xtream Codes und M3U?', a: 'M3U ist ein einfacher Playlist-Link. Xtream Codes besteht aus Server-Adresse, Benutzername und Passwort. Wir empfehlen Xtream Codes, da es Sender, Mediathek und Programmführer automatisch perfekt strukturiert.' },
    { q: 'Sind Bundesliga, Champions League und Live-Sport enthalten?', a: 'Ja! Alle Spiele der Bundesliga, UEFA Champions League, Premier League, Formel 1, Darts, NFL und Pay-per-View-Kampfabende sind ohne Zusatzkosten in bester Qualität enthalten.' },
    { q: 'Benötige ich ein VPN für IPTV?', a: 'Ein VPN ist nicht zwingend erforderlich. Unser Dienst funktioniert jedoch einwandfrei mit allen gängigen VPN-Diensten (z. B. NordVPN, ExpressVPN), falls Sie zusätzliche Privatsphäre wünschen.' },
    { q: 'Wie schnell erhalte ich meinen Zugang nach der Bestellung?', a: 'Die Freischaltung erfolgt blitzschnell. Nach Ihrer Nachricht auf WhatsApp erstellen unsere Mitarbeiter Ihren Zugang in der Regel innerhalb von 2 bis 5 Minuten.' },
    { q: 'Ist ein Programmführer (EPG) integriert?', a: 'Ja, ein 7-Tage-EPG ist direkt integriert und aktualisiert sich automatisch in Ihrer Player-App.' },
    { q: 'Können Erwachsenensender (18+) deaktiviert werden?', a: 'Ja, auf Wunsch können wir Erwachsenensender für den Jugendschutz komplett aus Ihrer Senderliste entfernen oder mit einem PIN-Code sperren.' },
    { q: 'Verlängert sich das Abo automatisch?', a: 'Nein, es gibt keine automatischen Abofallen. Ihr Zugang läuft nach der gewählten Laufzeit automatisch aus, sofern Sie ihn nicht selbst per WhatsApp verlängern möchten.' },
    { q: 'Was kann ich tun, falls doch einmal ein Sender stockt?', a: 'Starten Sie Router und Streaming-Gerät neu, um den Cache zu leeren. Sollte das Problem weiter bestehen, hilft Ihnen unser WhatsApp-Support rund um die Uhr in wenigen Minuten.' },
    { q: 'Kann ich mein IPTV-Abo im Urlaub oder auf Reisen nutzen?', a: 'Ja! Sie können Ihren Zugang weltweit auf Reisen im Hotel-WLAN oder mobilen Internet auf Smartphone, Tablet, Laptop oder Fire TV Stick nutzen.' },
    { q: 'Sind 4K-Sender echte 2160p-Auflösung oder hochskaliert?', a: 'Unsere 4K-Feeds senden in nativer 2160p-Auflösung mit 50/60 Bildern pro Sekunde und moderner HEVC-Kodierung für echte Kinobildqualität.' },
    { q: 'Was ist Catch-Up TV und wie lange kann ich zurückspulen?', a: 'Mit Catch-Up TV können Sie verpasste Sendungen und Sportereignisse bis zu 7 Tage rückwirkend abrufen, pausieren und vorspulen.' },
    { q: 'Benötige ich eine Satellitenschüssel oder Antenne?', a: 'Nein, es ist keinerlei Empfangshardware wie Schüssel oder Kabeldose nötig. Alles läuft zu 100% digital über Ihren Internetanschluss.' },
    { q: 'Kann ich eigene Favoritenlisten anlegen?', a: 'Ja, in Playern wie TiviMate oder IPTV Smarters können Sie individuelle Favoritengruppen erstellen und nicht benötigte Länderlisten einfach ausblenden.' },
    { q: 'Welche Zahlungsmethoden werden akzeptiert?', a: 'Wir akzeptieren Kreditkarten, PayPal und Krypto sicher über den WhatsApp-Kundendienst.' },
  ],
  finalCta: {
    h2: 'Bereit für ruckelfreies 4K-Fernsehen?',
    p: 'Testen Sie alle 20.000+ Sender, Sportübertragungen und 60.000+ Filme noch heute unverbindlich auf Ihrem eigenen Gerät.',
    btn: 'Jetzt 24h Gratis-Test per WhatsApp anfordern',
  },
  legal: {
    about: {
      title: 'Über uns & Streaming-Technologie',
      html: `
        <p><strong>{name}</strong> (4ktrexiptv.com) ist eine unabhängige Plattform für IPTV-Server-Benchmarks, technische Einrichtungsanleitungen und professionelle IPTV-Reseller-Lösungen im DACH-Raum (Deutschland, Österreich, Schweiz).</p>
        <p>Unser technisches Team betreibt modernste Testumgebungen zur objektiven Überprüfung von Server-Bitraten, H.265-HEVC-Kompression, Umschaltzeiten und Anti-Freeze-Stabilität auf gängigen Endgeräten.</p>
        <h2>Unsere technischen Schwerpunkte</h2>
        <ul>
          <li><strong>Optimierte CDN-Edge-Infrastruktur:</strong> Anbindung an redundante Tier-4-Rechenzentren in Frankfurt am Main, Amsterdam und London zur Gewährleistung von unter 10ms Latenz und 99,98 % SLA-Serververfügbarkeit während Bundesliga- und Champions-League-Spieltagen.</li>
          <li><strong>Praxiserprobte Geräteanleitungen:</strong> Schritt-für-Schritt-Konfigurationen für Amazon Fire TV Stick 4K, Smart TVs (Samsung Tizen OS, LG webOS), Apple TV 4K und Android-basierte Set-Top-Boxen (NVIDIA Shield, Formuler).</li>
          <li><strong>Transparente Reseller-Lösungen:</strong> Leistungsstarke IPTV-Reseller-Panels mit sicherem Credit-System, flexibler Sub-Reseller-Verwaltung und höchster Ertragsspanne ohne Mindestvertragslaufzeiten.</li>
          <li><strong>Direkter Kundenservice:</strong> 24/7 technischer Support via WhatsApp (<a href="{order}" target="_blank" rel="nofollow noopener noreferrer">{phone}</a>) mit schnellen Reaktionszeiten unter 5 Minuten.</li>
        </ul>
      `,
    },
    contact: {
      title: 'Technischer Support & Kundenservice',
      html: `
        <p>Haben Sie Fragen zu Tarifen, dem 24h-Gratis-Test oder benötigen Sie Unterstützung bei der Einrichtung Ihres Players? Unser Support-Team steht Ihnen rund um die Uhr zur Verfügung.</p>
        <h2>Direkte Kontaktmöglichkeiten</h2>
        <ul>
          <li><strong>Prioritäts-Support via WhatsApp:</strong> <a href="{order}" target="_blank" rel="nofollow noopener noreferrer">{phone}</a> (Antwort in der Regel innerhalb weniger Minuten)</li>
          <li><strong>E-Mail-Support:</strong> <a href="mailto:{email}">{email}</a></li>
          <li><strong>Servicezeiten:</strong> 24 Stunden täglich, 7 Tage die Woche, 365 Tage im Jahr</li>
        </ul>
        <h2>Hinweis zur schnellen Fehlerbehebung</h2>
        <p>Um Ihnen schnellstmöglich weiterzuhelfen, nennen Sie uns bei technischen Anfragen bitte Ihr Gerät, die verwendete Player-App (z. B. TiviMate, IPTV Smarters Pro, IBO Player) und die genaue Fehlermeldung.</p>
      `,
    },
    privacy: {
      title: 'Datenschutzerklärung (DSGVO-konform)',
      html: `
        <p>Stand: Oktober 2026. Der Schutz Ihrer persönlichen Daten hat bei <strong>{name}</strong> höchste Priorität. Nachfolgend informieren wir Sie über die Verarbeitung personenbezogener Daten gemäß der Datenschutz-Grundverordnung (DSGVO).</p>
        <h2>1. Verantwortliche Stelle</h2>
        <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist {name} (4ktrexiptv.com). Bei datenschutzrechtlichen Fragen erreichen Sie unseren Datenschutzbeauftragten unter <a href="mailto:{email}">{email}</a>.</p>
        <h2>2. Erhebung und Speicherung technischer Daten</h2>
        <p>Beim Aufrufen unserer Website erfassen unsere Server automatisiert lediglich unverzichtbare technische Protokolldaten (z. B. Browsertyp, Betriebssystem, anonymisierte IP-Adressen), die ausschließlich der Systemsicherheit, DDOS-Prävention und Netzwerklastverteilung dienen (Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO).</p>
        <h2>3. Kontaktaufnahme via WhatsApp und E-Mail</h2>
        <p>Wenn Sie uns per E-Mail oder WhatsApp kontaktieren, werden Ihre freiwillig übermittelten Angaben zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen verarbeitet (Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO). Wir verkaufen, vermieten oder übertragen niemals persönliche Daten an Dritte oder Werbenetzwerke.</p>
        <h2>4. Ihre Rechte nach der DSGVO</h2>
        <p>Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten (Art. 15 DSGVO), deren Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO) sowie Einschränkung der Datenverarbeitung (Art. 18 DSGVO). Senden Sie hierzu einfach eine Nachricht an <a href="mailto:{email}">{email}</a>.</p>
      `,
    },
    terms: {
      title: 'Allgemeine Geschäftsbedingungen (AGB)',
      html: `
        <p>Stand: Oktober 2026. Diese Allgemeinen Geschäftsbedingungen regeln die Nutzung der Plattform <strong>{name}</strong> und der darüber bereitgestellten Dienste.</p>
        <h2>1. Leistungsgegenstand & Verfügbarkeit</h2>
        <p>{name} stellt technische Vergleichsinformationen, Testzugänge und IPTV-Reseller-Infrastrukturen zur Verfügung. Die Bereitstellung erfolgt mit einer angestrebten Server-Verfügbarkeit von 99,98 % im Jahresmittel. Vorübergehende Wartungsfenster oder regionale Drosselungen einzelner Internetanbieter liegen außerhalb unseres Einflussbereichs.</p>
        <h2>2. Nutzungsumfang & Mehrgeräte-Verbindungen</h2>
        <p>Die Zugangsdaten (Xtream Codes API, M3U) sind ausschließlich für die vertraglich vereinbarte Anzahl gleichzeitiger Verbindungen (1, 2, 3 oder 4 Geräte) bestimmt. Eine unautorisierte Weitergabe oder öffentliche Weiterverbreitung von Stream-Links führt zur automatischen Deaktivierung.</p>
        <h2>3. 24-Stunden-Gratis-Test & Zufriedenheitsgarantie</h2>
        <p>Kunden haben die Möglichkeit, die Streaming-Qualität und App-Kompatibilität vor einem Kauf unverbindlich über einen 24-stündigen Testzugang zu prüfen. Bei nachgewiesener technischer Inkompatibilität auf verifizierter Hardware innerhalb von 24 Stunden nach Aktivierung leisten wir umgehend kostenlosen Leitungsersatz oder Gutschrift.</p>
        <h2>4. Reseller-Bedingungen & Guthaben-Schutz</h2>
        <p>Erworbene Reseller-Credits verfallen nicht und besitzen unbegrenzte Gültigkeit. Reseller bestimmen ihre Endkundenpreise selbstständig und verwalten ihre Kunden eigenverantwortlich über das bereitgestellte Web-Dashboard.</p>
        <h2>5. Urheberrecht & DMCA-Hinweis</h2>
        <p>{name} versteht sich als technischer Informations- und Infrastrukturvermittler. Auf unseren Servern werden keine geschützten Videoinhalte gehostet oder gespeichert. Sämtliche Markenrechte liegen bei den jeweiligen Rechteinhabern.</p>
      `,
    },
    imprint: {
      title: 'Impressum (§ 5 DDG)',
      html: `
        <p>Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG):</p>
        <h2>Dienstanbieter</h2>
        <ul>
          <li><strong>Plattform:</strong> {name} • 4ktrexiptv.com</li>
          <li><strong>Technischer Support:</strong> <a href="mailto:{email}">{email}</a></li>
          <li><strong>WhatsApp-Kundendienst:</strong> <a href="{order}" target="_blank" rel="nofollow noopener noreferrer">{phone}</a></li>
          <li><strong>Bereitstellungszeitraum:</strong> 24/7/365 Kontinuierlicher Support</li>
        </ul>
        <h2>Streitbeilegung</h2>
        <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="nofollow noopener noreferrer">https://ec.europa.eu/consumers/odr</a>. Unsere E-Mail-Adresse lautet <a href="mailto:{email}">{email}</a>. Wir sind stets bemüht, eventuelle Meinungsverschiedenheiten direkt mit unseren Kunden einvernehmlich beizulegen.</p>
      `,
    },
  },
};

export const T: Dict = SITE.locale === 'de' ? de : en;
export const fillLegal = (html: string) => html.replaceAll('{name}', SITE.name).replaceAll('{email}', SITE.supportEmail).replaceAll('{order}', SITE.orderUrl).replaceAll('{phone}', SITE.phone);
