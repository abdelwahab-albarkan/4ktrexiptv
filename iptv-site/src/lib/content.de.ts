import { SITE } from '../config';
import type { KwPage } from './pages';
import type { PageContent, Section, Faq } from './content';
import { titleCase, pick, trimDesc, relatedFor, hash } from './util';

const BRAND = SITE.name;
const RIGHTS = 'Welche Sender und Übertragungen verfügbar sind, hängt von Ihrer Region und den aktuellen Rechteinhabern ab. Prüfen Sie die Rechtelage für den gewünschten Wettbewerb und testen Sie Ihre Pflicht-Sender im 24-Stunden-Test.';

interface Ent { label: string; re: RegExp; build: (K: string) => Section }

const DEVICES: Ent[] = [
  {
    label: 'Amazon Fire TV / Fire TV Stick',
    re: /fire ?stick|fire ?tv|firetv/,
    build: K => ({
      h2: `${K} auf Amazon Fire TV & Fire TV Stick`,
      paras: [
        'Amazon Fire TV Sticks und Fire TV Cubes zählen zu den beliebtesten Streaming-Geräten für IPTV im deutschsprachigen Raum. Sie bieten eine hervorragende Hardware-Dekodierung für H.265/HEVC-Streams und unterstützen moderne IPTV-Player wie TiviMate oder IPTV Smarters Pro.',
      ],
      steps: [
        'Aktivieren Sie in den Fire TV Einstellungen unter „Mein Fire TV > Entwickleroptionen“ die Option „Apps unbekannter Herkunft“ bzw. erteilen Sie der App „Downloader“ die Berechtigung.',
        'Laden Sie über die Downloader-App Ihren bevorzugten Player (z. B. TiviMate oder IPTV Smarters Pro) herunter.',
        'Öffnen Sie den Player und wählen Sie „Xtream Codes API Login“.',
        'Geben Sie Server-URL, Benutzername und Passwort ein, die Sie nach der Freischaltung erhalten haben.',
        'Aktivieren Sie in den Player-Einstellungen die Hardware-Beschleunigung (HW+) für ruckelfreies 4K-Streaming.',
      ],
    }),
  },
  {
    label: 'Android TV & Streaming-Boxen',
    re: /android|nvidia|shield|\bbox\b|set ?top/,
    build: K => ({
      h2: `${K} auf Android TV & NVIDIA Shield`,
      paras: [
        'Android TV, Google TV sowie High-End-Boxen wie die NVIDIA Shield Pro bieten die höchste Rechenleistung und native Unterstützung für Gigabit-LAN. Dadurch eignen sie sich optimal für hochbitratige 4K-Liveübertragungen mit 60 Bildern pro Sekunde.',
      ],
      list: [
        'Installieren Sie TiviMate oder Smarters Pro direkt aus dem Google Play Store.',
        'Nutzen Sie für 4K-Sportübertragungen nach Möglichkeit eine direkte LAN-Kabelverbindung zum Router.',
        'Deaktivieren Sie Hintergrundbeschränkungen für den Player, um eine unterbrechungsfreie EPG-Aktualisierung zu gewährleisten.',
        'Wählen Sie in den Wiedergabeeinstellungen den ExoPlayer- oder VLC-Codec für minimale Umschaltzeiten.',
      ],
    }),
  },
  {
    label: 'Apple TV, iPhone & iPad',
    re: /apple tv|appletv|iphone|ipad|\bios\b|tvos|\bmac\b/,
    build: K => ({
      h2: `${K} auf Apple TV & iOS-Geräten`,
      paras: [
        'Auf tvOS und iOS stehen leistungsfähige Player wie IPTVX, GSE Smart IPTV oder Smarters Player Lite im offiziellen App Store bereit. Dank der leistungsstarken Apple Bionic Prozessoren laufen 4K-Streams absolut flüssig.',
      ],
      list: [
        'Laden Sie IPTVX oder Smarters Lite aus dem Apple App Store.',
        'Wählen Sie den Xtream Codes Login für automatische Kategorisierung von Live-TV und Mediathek.',
        'Apple TV 4K per LAN-Kabel liefert bei Live-Sport die stabilste Latenz.',
        'Nutzen Sie AirPlay, um Streams von iPhone oder iPad direkt auf Ihren Großbildfernseher zu übertragen.',
      ],
    }),
  },
  {
    label: 'Samsung Smart-TV (Tizen OS)',
    re: /samsung|tizen/,
    build: K => ({
      h2: `${K} auf Samsung Smart-TV`,
      paras: [
        'Samsung Smart-TVs ab Baujahr 2017 nutzen das Betriebssystem Tizen. Im integrierten Samsung App Store finden sich spezialisierte Player wie IBO Player, Nanomid oder Smart STB, die ohne Zusatzhardware direkt funktionieren.',
      ],
      list: [
        'Suchen Sie im Samsung App Store nach „IBO Player“ oder „Smart STB“ und installieren Sie die App.',
        'Notieren Sie die auf dem TV-Bildschirm angezeigte MAC-Adresse und den Geräte-Schlüssel.',
        'Aktivieren Sie Ihre Playlist über das Webportal des Players oder tragen Sie den M3U-Link ein.',
        'Tipp bei älteren Modellen: Ein Fire TV Stick 4K am HDMI-Port liefert oft schnellere Menüs als ältere Tizen-Prozessoren.',
      ],
    }),
  },
  {
    label: 'LG Smart-TV (webOS)',
    re: /\blg\b|webos/,
    build: K => ({
      h2: `${K} auf LG webOS-Fernsehern`,
      paras: [
        'LG Smart-TVs setzen auf webOS und bieten im LG Content Store beliebte Player-Lösungen wie IBO Player Pro, Smart IPTV oder Nanomid. Die OLED- und QNED-Panels von LG bringen 4K-HDR-Streams besonders brillant zur Geltung.',
      ],
      list: [
        'Installieren Sie IBO Player oder IPTV Smarters aus dem LG Content Store.',
        'Tragen Sie Ihre Zugangsdaten ein und lassen Sie die Senderlisten laden.',
        'Deaktivieren Sie in den TV-Einstellungen aggressive Energiesparmodi, um Stream-Abbrüche zu verhindern.',
      ],
    }),
  },
  {
    label: 'Windows & Mac PC',
    re: /\bpc\b|windows|laptop|computer|vlc|desktop/,
    build: K => ({
      h2: `${K} auf dem PC & Laptop einrichten`,
      paras: [
        'Auf dem Computer können Sie IPTV sowohl über vielseitige Player wie VLC Media Player als auch über dedizierte Windows-Programme wie IPTV Smarters Pro oder SFVIP Player nutzen.',
      ],
      steps: [
        'Laden Sie IPTV Smarters Pro für Windows oder VLC Media Player herunter.',
        'In VLC: Öffnen Sie „Medien > Netzwerkstream öffnen“ und fügen Sie Ihren M3U8-Link ein.',
        'In Smarters Pro: Geben Sie Ihre Xtream Codes Zugangsdaten ein, um EPG und Kanalgruppen mit Suchfunktion zu nutzen.',
      ],
    }),
  },
];

const APPS: Ent[] = [
  {
    label: 'IPTV Smarters Pro',
    re: /smarters/,
    build: K => ({
      h2: `${K} mit IPTV Smarters Pro konfigurieren`,
      paras: [
        'IPTV Smarters Pro ist eine der meistgenutzten IPTV-Apps weltweit. Die Anwendung fungiert als Benutzeroberfläche und benötigt eine aktive Xtream Codes Verbindung oder eine M3U-Playlist Ihres Anbieters.',
      ],
      steps: [
        'Wählen Sie beim ersten Start „Login mit Xtream Codes API“.',
        'Geben Sie einen beliebigen Profilnamen, Ihren Benutzernamen, Ihr Passwort und die Server-URL ein.',
        'Klicken Sie auf „Add User“ und warten Sie, bis Kanäle, EPG und VOD vollständig synchronisiert sind.',
        'Stellen Sie in den App-Einstellungen die Puffergröße auf 3 bis 5 Sekunden, um Mikroruckler bei Live-Events zu vermeiden.',
      ],
    }),
  },
  {
    label: 'TiviMate IPTV Player',
    re: /tivimate/,
    build: K => ({
      h2: `${K} mit TiviMate optimal einrichten`,
      paras: [
        'TiviMate gilt unter Power-Usern auf Android TV und Fire TV als Referenz. Mit seinem modernen TV-Guide, Bild-in-Bild-Funktion (Multi-Screen) und automatischer EPG-Aktualisierung bietet es echten TV-Komfort.',
      ],
      list: [
        'Fügen Sie eine neue Playlist über Xtream Codes API hinzu.',
        'Aktivieren Sie unter „EPG“ die automatische Aktualisierung alle 12 Stunden.',
        'Legen Sie Favoritengruppen an, um aus tausenden Sendern schnell auf Ihre Hauptsender zuzugreifen.',
        'Nutzen Sie Multi-Screen, um zwei oder vier Bundesligaspiele parallel auf einem Bildschirm zu verfolgen.',
      ],
    }),
  },
  {
    label: 'M3U & M3U8 Playlists',
    re: /m3u|playlist/,
    build: K => ({
      h2: `${K}: Funktionsweise von M3U8-Playlists`,
      paras: [
        'Eine M3U-Playlist ist eine strukturierte Textdatei oder eine Web-URL, die Direktlinks zu Videoströmen enthält. M3U8-Links nutzen das moderne HLS-Format (HTTP Live Streaming) für adaptive Bitraten.',
      ],
      list: [
        'Nutzen Sie stets die vollständige M3U8-URL mit persönlichem Sicherheits-Token.',
        'Geben Sie Ihren Playlist-Link niemals öffentlich weiter, da parallele Zugriffe zu Sperrungen führen können.',
        'Verwenden Sie für mehr Übersicht vorzugsweise den Xtream Codes Login statt reiner M3U-Textdateien.',
      ],
    }),
  },
  {
    label: 'Xtream Codes API',
    re: /xtream/,
    build: K => ({
      h2: `${K}: Vorteile der Xtream Codes API`,
      paras: [
        'Die Xtream Codes API ist der Industriestandard für moderne IPTV-Verbindungen. Statt riesige Textdateien herunterzuladen, tauscht der Player strukturierte JSON-Daten mit dem Server aus.',
      ],
      list: [
        'Schnellere Ladezeiten: Sender, Filme und Serien werden separat und auf Abruf geladen.',
        'Automatischer EPG: Der Programmführer synchronisiert sich ohne separate XMLTV-URL.',
        'Catch-Up Funktion: Aufnahmen vergangener Sendungen lassen sich direkt anwählen.',
      ],
    }),
  },
];

const SPORTS: Ent[] = [
  {
    label: 'Bundesliga & Champions League',
    re: /bundesliga|dfb|fußball|fussball|champions league/,
    build: K => ({
      h2: `${K}: Fußball live in 4K & Full HD`,
      paras: [
        'Für flüssigen Live-Sport bei 60 Bildern pro Sekunde ist eine stabile Serveranbindung entscheidend. Moderne H.265-Codecs sorgen dafür, dass selbst schnelle Ballbewegungen ohne Nachzieheffekte oder Ruckler übertragen werden.',
        RIGHTS,
      ],
    }),
  },
  {
    label: 'DAZN, Sky & Pay-TV',
    re: /dazn|sky|waipu|magenta|joyn|rtl\+|rtl plus|zattoo/,
    build: K => ({
      h2: `${K}: Sportübertragungen & Premium-Sender`,
      paras: [
        'Internationale Sportübertragungen erfordern robuste CDN-Kapazitäten, besonders bei zeitgleichen Top-Spielen am Wochenende. Ein hochverfügbares Servernetzwerk mit Anti-Freeze Technologie verhindert Engpässe.',
        RIGHTS,
      ],
    }),
  },
  {
    label: 'Kampfsport (UFC & Boxen)',
    re: /ufc|boxen|boxing|ppv/,
    build: K => ({
      h2: `${K}: Pay-per-View & Kampfabende`,
      paras: [
        'Große UFC Fight Nights und Meisterschafts-Boxkämpfe finden häufig spät nachts statt. Ein verlässlicher IPTV-Service bietet direkte Zugänge zu internationalen PPV-Feeds in voller Auflösung.',
        RIGHTS,
      ],
    }),
  },
  {
    label: 'Formel 1 & Motorsport',
    re: /formel|\bf1\b|motorsport/,
    build: K => ({
      h2: `${K}: Motorsport live verfolgen`,
      paras: [
        'Vom freien Training über das Qualifying bis zum Grand Prix: Motorsport verlangt höchste Bildwiederholraten (60 FPS) für gestochen scharfe Onboard-Kameras und Streckenübersichten.',
        RIGHTS,
      ],
    }),
  },
];

const QUAL: Ent = {
  label: '4K Ultra HD',
  re: /4k|uhd|1080|fhd|\bhd\b/,
  build: K => ({
    h2: `${K}: Bildqualität & Bandbreiten-Anforderungen`,
    paras: [
      'Für echten 4K UHD-Genuss mit HDR und 60 FPS wird eine stabile Bandbreite von mindestens 25 Mbit/s empfohlen. Neben der Download-Geschwindigkeit ist vor allem ein niedriger Jitter (unter 10 ms) für unterbrechungsfreie Wiedergabe ausschlaggebend.',
    ],
  }),
};

const detect = (kw: string): Section[] => {
  const K = titleCase(kw);
  const out: Section[] = [];
  for (const list of [DEVICES, APPS, SPORTS]) {
    const e = list.find(x => x.re.test(kw));
    if (e) out.push(e.build(K));
  }
  if (QUAL.re.test(kw)) out.push(QUAL.build(K));
  return out;
};

const label = (list: Ent[], kw: string) => list.find(e => e.re.test(kw))?.label;

function detectIntentSectionsDe(kw: string): Section[] {
  const q = kw.toLowerCase();
  const res: Section[] = [];

  // Pufferung, Ruckeln, Störungen
  if (/buffer|puffer|ruckel|freeze|lag|h[aä]ngt|st[oö]rung|fehler|problem|langsam/i.test(q)) {
    res.push({
      h2: 'Fehlerbehebung: Pufferung & Ruckeln dauerhaft beheben',
      paras: [
        'Ruckler bei Live-Übertragungen liegen in über 90 % der Fälle an lokalen WLAN-Paketverlusten, überlasteten Router-DNS-Servern oder unpassenden App-Puffern, selten an den Hauptservern.',
      ],
      steps: [
        'DNS-Server umstellen: Ändern Sie im Router oder Streaming-Gerät den DNS auf Cloudflare (1.1.1.1) oder Google (8.8.8.8), um Drosselungen Ihres Internetproviders zu umgehen.',
        'Puffergröße erhöhen: Stellen Sie in TiviMate oder Smarters Pro die Puffergröße von „Normal“ auf „3–5 Sekunden“ (Groß).',
        'Hardware-Beschleunigung aktivieren: Stellen Sie den Decoder auf Hardware (HW+), um den Hauptprozessor zu entlasten.',
        'LAN-Kabel bevorzugen: Ein 5-GHz-WLAN oder direktes Ethernet-Kabel verhindert Schwankungen im 2,4-GHz-Bereich.',
      ],
    });
  }

  // Test, Probe, Gratis
  if (/test|probe|gratis|kostenlos|trial|demo/i.test(q)) {
    res.push({
      h2: 'Leitfaden: So testen Sie einen IPTV-Dienst richtig',
      paras: [
        'Ein 24-Stunden-Test ist der beste Weg, um Senderangebot, Umschaltzeiten und Bildqualität risikofrei auf der eigenen Hardware zu prüfen.',
      ],
      list: [
        'Hauptsendezeit testen: Prüfen Sie zwischen 19:30 und 22:00 Uhr sowie während zeitgleicher Fußball-Livespiele.',
        'Umschaltzeiten stoppen: Ein erstklassiger Server schaltet Kanäle in unter 0,5 bis 1 Sekunde um.',
        'EPG-Synchronität: Kontrollieren Sie, ob der Programmführer die aktuellen Sendungen korrekt anzeigt.',
        'Keine Kreditkarte nötig: Seriöse Anbieter stellen Testzugänge unverbindlich bereit.',
      ],
    });
  }

  // M3U vs Xtream
  if (/m3u|xtream|api|link|url|playlist|portal/i.test(q)) {
    res.push({
      h2: 'Vergleich: Xtream Codes API vs. M3U8 Playlist',
      paras: [
        'Je nach verwendeter Streaming-App bietet die Xtream Codes API entscheidende Vorteile gegenüber klassischen M3U-Textdateien.',
      ],
      list: [
        'Xtream Codes API: Lädt Live-TV, Filme und Serien strukturiert mit Vorschaubildern und automatischer EPG-Aktualisierung.',
        'M3U8-Weblink: Universell einsetzbar in Programmen wie VLC oder älteren Receivern, jedoch ohne automatische Mediathek-Sortierung.',
        'Empfehlung: Verwenden Sie auf Firestick und Android TV stets den Xtream Codes Login für optimalen Bedienkomfort.',
      ],
    });
  }

  return res;
}

export function buildContentDe(p: KwPage): PageContent {
  const kw = p.keyword, K = titleCase(kw), seed = p.slug, cat = p.category, y = SITE.year;
  const h = hash(seed);
  const rel = relatedFor(p);

  // Dynamic Title Matrix (High CTR, Anti-Spam)
  const titles = [
    `${K}: Leitfaden, Einrichtung & Test ${y} | ${BRAND}`,
    `${K} im Test: Sender, Qualität & Setup ${y} | ${BRAND}`,
    `${K}: Alles zu Streaming, Apps & Stabilität | ${BRAND}`,
    `${K} (${y}): Ratgeber, Geräte & Konfiguration | ${BRAND}`,
  ];
  let title = titles[h % titles.length];
  if (title.length > 60) title = `${K} | ${BRAND}`;
  if (title.length > 60) title = K.length > 57 ? `${K.slice(0, 56)}…` : K;

  const tldrs: Record<string, string[]> = {
    providers: [
      `Sie suchen „${kw}“? Vergleichen Sie IPTV-Dienste nach Serverstabilität, Bitrate bei 60 FPS, Gerätekompatibilität und persönlichem Support statt nur nach dem Preis.`,
      `Bei ${kw} kommt es auf redundante 10-Gbit/s-Server und ausfallsicheres CDN-Routing an, um Ruckler bei Top-Sportevents zuverlässig zu vermeiden.`,
    ],
    pricing: [
      `Faire IPTV-Preise bieten flexible Laufzeiten von 3, 6 oder 12 Monaten. Längere Pakete bieten den günstigsten Monatspreis, starten Sie am besten mit einem unverbindlichen Test.`,
      `Für „${kw}“ empfiehlt sich ein transparenter Tarif ohne automatische Abo-Falle mit vollem Zugriff auf 4K-UHD-Sender und Mediathek.`,
    ],
    trial: [
      `Ein unverbindlicher 24-Stunden-Test für „${kw}“ gibt Ihnen die Sicherheit, Senderstabilität und Umschaltzeiten zur Hauptsendezeit auf Ihrem eigenen TV zu testen.`,
      `Testen Sie ${kw} vor dem Kauf unverbindlich: Prüfen Sie Live-Sport in 60 FPS, EPG-Aktualität und Reaktionszeiten des Supports.`,
    ],
    devices: [
      `„${kw}“ lässt sich in wenigen Minuten auf Fire TV Stick, Android TV, Smart-TV (Samsung/LG) oder Apple TV über erprobte Player wie TiviMate oder Smarters Pro einrichten.`,
      `Hardware-Optimierung für ${kw}: Aktivieren Sie Hardware-Dekodierung (HW+) und bevorzugen Sie LAN-Verbindungen für unterbrechungsfreies 4K-Streaming.`,
    ],
    apps: [
      `Für „${kw}“ benötigen Sie eine moderne Player-App gepaart mit Ihren persönlichen Xtream-Codes-Zugangsdaten oder einer M3U8-Playlist.`,
      `Moderne IPTV-Apps wie TiviMate oder Smarters Pro strukturieren ${kw} mit übersichtlichem TV-Programmführer (EPG) und Mehrkanal-Tonspuren.`,
    ],
    sports: [
      `Live-Sport mit „${kw}“ verlangt konstante 60 Bilder pro Sekunde und niedrige Latenz. Redundante Backup-Streams sichern Bundesliga, Champions League und Motorsport ab.`,
      `Verfolgen Sie mit ${kw} alle wichtigen Spiele in nativer Full-HD- und 4K-Auflösung ohne lästige Verzögerungen gegenüber dem Satellitenbild.`,
    ],
    setup: [
      `Schritt-für-Schritt-Lösung für „${kw}“: Überprüfen Sie App-Cache, DNS-Einstellungen (1.1.1.1) und Verbindungsgeschwindigkeit für sofortige Bildstabilisierung.`,
      `Optimale Einrichtung von ${kw}: Mit wenigen Handgriffen konfigurieren Sie Puffergrößen und Decoder für flüssige Wiedergabe auf allen Endgeräten.`,
    ],
  };

  const catTldrArr = tldrs[cat] || [
    `Alle wichtigen Informationen, Praxistipps und technische Hintergründe zu „${kw}“ für modernes Streaming im Jahr ${y}.`,
    `Umfassender Ratgeber zu ${kw}: So konfigurieren Sie Ihre Streaming-Umgebung für maximale Bildqualität und Ausfallsicherheit.`,
  ];
  const tldr = catTldrArr[h % catTldrArr.length];

  const h1Options: Record<string, string[]> = {
    providers: [
      `${K}: Ratgeber zur Anbieterauswahl ${y}`,
      `${K}: Stabilität, Server & Qualität im Vergleich`,
    ],
    pricing: [
      `${K}: Tarife, Laufzeiten & Preis-Leistungs-Vergleich`,
      `${K}: Kostenübersicht & transparente Pakete ${y}`,
    ],
    trial: [
      `${K}: 24-Stunden-Test vor dem Kauf nutzen`,
      `${K}: So testen Sie Bildqualität und Sender live`,
    ],
    devices: [
      `${K}: Einrichtung auf Firestick, Smart-TV & Android`,
      `${K}: Kompatibilität, Hardware & Player-Setup`,
    ],
    apps: [
      `${K}: Die besten Player-Apps & Playlist-Formate`,
      `${K}: Xtream Codes API & Konfigurations-Anleitung`,
    ],
    sports: [
      `${K}: Live-Sport in 4K UHD & 60 FPS streamen`,
      `${K}: Fußball, Motorsport & Events ohne Verzögerung`,
    ],
    setup: [
      `${K}: Schritt-für-Schritt-Anleitung & Optimierung`,
      `${K}: Einrichtung, Fehlersuche & stabile Einstellungen`,
    ],
  };
  const catH1Arr = h1Options[cat] || [`${K}: Praxis-Leitfaden ${y}`, `${K}: Übersicht & Optimierung`];
  const h1 = catH1Arr[h % catH1Arr.length];

  // Dynamic Intro Matrix (4 distinct angles to avoid identical shingles)
  const introMatrix = [
    [
      `Wer nach **${kw}** sucht, erwartet ein stabiles, gestochen scharfes Fernseherlebnis ohne ständige Pufferpausen oder Bildaussetzer. Modernes IPTV übermittelt Fernsehsignale über Hochgeschwindigkeits-Datenpakete direkt an Ihr Abspielgerät – unabhängig von Kabelanschluss oder Satellitenschüssel.`,
      `In diesem Praxisratgeber für ${y} erfahren Sie, worauf es bei Serverstabilität, der Wahl des passenden Players und der Konfiguration Ihres Heimnetzwerks wirklich ankommt.`,
    ],
    [
      `Das Thema **${kw}** gewinnt rasant an Bedeutung, da immer mehr Haushalte von klassischen Kabelanschlüssen auf flexibles Internet-Fernsehen umsteigen. Die Vorteile liegen auf der Hand: Tausende Live-Kanäle, weltweiter Sport und umfangreiche Mediatheken auf Abruf.`,
      `Damit Sie das Beste aus Ihrer Verbindung herausholen, beleuchten wir hier die technischen Grundlagen, Hardware-Empfehlungen und Konfigurationsschritte für das laufende Jahr ${y}.`,
    ],
    [
      `Bei der Recherche zu **${kw}** stößt man häufig auf verwirrende technische Fachbegriffe wie Xtream Codes, M3U8, EPG oder HLS-Streaming. Ein gutes IPTV-Setup sollte jedoch vor allem eines sein: unkompliziert in der Bedienung und absolut zuverlässig im Alltag.`,
      `Auf dieser Seite finden Sie eine verständliche Zusammenfassung aller relevanten Aspekte, von der Wahl des richtigen Decoders bis zur Vermeidung typischer Übertragungsfehler.`,
    ],
    [
      `Für Live-Sport in 4K, internationale Spielfilme oder regionale Nachrichtensender: **${kw}** erfordert eine leistungsfähige Serverinfrastruktur mit Anti-Freeze Technologie, um selbst bei extremen Zuschauerzahlen am Wochenende flüssig zu laufen.`,
      `Erfahren Sie nachfolgend, wie moderne Content Delivery Networks (CDNs) funktionieren und wie Sie Ihr Streaming-Gerät optimal darauf abstimmen.`,
    ],
  ];
  const intro = introMatrix[h % introMatrix.length];

  const sections: Section[] = [];

  // Dynamic First Section: 4 Distinct Technical Angles
  const sec1Matrix: Section[] = [
    {
      h2: `Funktionsweise & Architektur von ${K}`,
      paras: [
        `Im Gegensatz zu herkömmlichem Rundfunk via DVB-C oder DVB-S nutzt ${kw} das Internet-Protokoll zur Signalübertragung. Beim Umschalten fordert Ihre Streaming-App einen verschlüsselten Datenstrom von redundanten Serverknotenpunkten an, der sekundenschnell decodiert wird.`,
        `Professionelle Netzwerke setzen auf H.265 (HEVC) Videokomprimierung. Dieser Codec halbiert den benötigten Bandbreitenbedarf gegenüber älteren H.264-Standards bei gleichzeitig sichtbar schärferen Konturen und lebendigeren Farben.`,
      ],
      list: [
        'Dedizierte 10-Gbit/s-Server-Uplinks für störungsfreie Übertragungen während großer Sportereignisse.',
        'Verteilung über europäische Edge-Server für minimale Signallaufzeiten (Ping unter 20 ms).',
        'Automatisches Failover: Fällt ein Stream aus, schaltet das System in Millisekunden auf eine Backup-Quelle.',
        'Unterstützung für Mehrkanal-Tonspuren und Originalkommentar bei internationalen Übertragungen.',
      ],
    },
    {
      h2: `Bandbreite & Netzwerk-Voraussetzungen für ${K}`,
      paras: [
        `Für ruckelfreies Streaming bei ${kw} ist eine stabile Übertragungsrate entscheidender als reines Marketing-Tempo. Ein konstanter 25-Mbit/s-VDSL- oder Glasfaseranschluss mit geringen Paketverlusten liefert oft bessere Ergebnisse als ein schwankender Gigabit-WLAN-Anschluss.`,
        `Wir empfehlen für HD-Sender mindestens 10–15 Mbit/s, während native 4K-UHD-Streams mit 60 Bildern pro Sekunde ab 25–30 Mbit/s unterbrechungsfrei laufen.`,
      ],
      list: [
        'LAN-Kabel oder 5-GHz-WLAN bevorzugen: Das 2,4-GHz-Band wird in Mehrfamilienhäusern oft gestört.',
        'DNS-Optimierung: Nutzen Sie neutrale DNS-Server wie 1.1.1.1 (Cloudflare) für schnellere Verbindungsaufbauten.',
        'Pufferreserve im Player: Eine Vorhaltezeit von 3 bis 5 Sekunden fängt kurze WLAN-Schwankungen mühelos ab.',
        'Router-Neustart: Ein gelegentlicher Neustart leert Zwischenspeicher und optimiert die Kanalauswahl.',
      ],
    },
    {
      h2: `Verbindungsprotokolle: Xtream Codes vs. M3U bei ${K}`,
      paras: [
        `Die Wahl des Übertragungsprotokolls beeinflusst maßgeblich den Bedienkomfort bei ${kw}. Während M3U-Playlists reine Textlisten sind, bietet die Xtream Codes API eine intelligente Serverschnittstelle.`,
        `Über die API synchronisiert der Player automatisch Kanalaktualisierungen, EPG-Programmdaten und die Cover-Art der Mediathek, ohne dass die Playlist manuell neu eingelesen werden muss.`,
      ],
      list: [
        'Xtream Codes API: Schnelle Kanalsuche, sortierte Bouquets und 7-Tage-EPG-Vorschau.',
        'M3U8 Streaming: Direkte HLS-Wiedergabe, ideal für einfache Mediaplayer wie VLC.',
        'Multi-Screen Unterstützung: Mehrere Kanäle parallel anzeigen (z. B. Konferenz und Einzelspiel).',
        'Ende-zu-Ende-Sicherheit: Sichere Token-Authentifizierung verhindert unbefugten Zugriff.',
      ],
    },
    {
      h2: `Server-Infrastruktur & Anti-Freeze Technologie`,
      paras: [
        `Egal ob Bundesligaspieltag, Formel 1 oder Serien-Marathon: Die Serverstabilität ist das wichtigste Qualitätsmerkmal bei ${kw}. Überlastete Billig-Server führen zu den gefürchteten Ladekreisen und asynchronem Ton.`,
        `Hochwertige Dienste arbeiten mit adaptiver Lastverteilung (Load Balancing). Steigt die Zuschauerzahl sprunghaft an, werden neue Verbindungen automatisch auf freie Server-Cluster umgeleitet.`,
      ],
      list: [
        'Anti-Freeze Algorithmen zur Glättung kurzzeitiger Datenrateneinbrüche.',
        'Geografisch verteilte Rechenzentren in Frankfurt, Amsterdam und London.',
        'Regelmäßige EPG-Synchronisation für exakte Sendungszeiten.',
        'Umschaltzeiten von unter einer Sekunde bei optimierten Playern.',
      ],
    },
  ];
  sections.push(sec1Matrix[h % sec1Matrix.length]);

  // Dynamic Category Deep-Dive Section (Multiple implementations per category to ensure shingle uniqueness)
  const catBodies: Record<string, Section[][]> = {
    providers: [
      [
        {
          h2: `Qualitätskriterien bei der Auswahl von ${K}`,
          list: [
            'Echte 60 FPS bei Sportsendern: Verhindert Bildruckeln bei schnellen Ballbewegungen.',
            'Lückenloser 7-Tage-EPG: Sendungsinformationen und Vorschau direkt in der Menüleiste.',
            'Persönlicher Support via WhatsApp: Schnelle Hilfe bei Routing- oder App-Fragen.',
            'Transparente Tarife: Keine versteckten Abo-Verlängerungen oder automatische Abbuchungen.',
          ],
        },
        {
          h2: 'Warnsignale vor unseriösen Anbietern',
          paras: [
            'Seien Sie vorsichtig bei Verkäufern, die „Lifetime-Zugänge“ für Spottpreise anbieten. Seriöse Serverinfrastruktur verursacht laufende Bandbreitenkosten und kann nicht dauerhaft für Einmalzahlungen betrieben werden.',
            'Bestehen Sie immer auf einem unverbindlichen 24-Stunden-Gratistest zur Hauptsendezeit.',
          ],
        },
      ],
      [
        {
          h2: `Server-Redundanz & Uptime-Garantie bei ${K}`,
          paras: [
            'Die Serverarchitektur entscheidet darüber, ob Ihr Bild bei Top-Spielen einfriert oder stabil durchläuft. Durch dezentrale Cloud-Edges in Frankfurt, Amsterdam und London werden Lastspitzen abgefedert.',
            'Automatisierte Monitoring-Skripte überprüfen die Datenströme im Minutentakt und wechseln bei Störungen unterbrechungsfrei auf Backup-Transponder.',
          ],
          list: [
            '10 Gbps Uplinks an europäischen Internet-Knotenpunkten.',
            'Anti-Freeze Puffertechnologie zur Eliminierung von Mikrorucklern.',
            'Direkte Integration mit Player-Apps über verschlüsselte Tokens.',
          ],
        },
      ],
      [
        {
          h2: `Senderumfang & Mediathek im Detail`,
          paras: [
            `Für ${kw} kommt es nicht auf unübersichtliche Senderberge an, sondern auf die verlässliche Verfügbarkeit der wichtigsten HD- und 4K-Feeds.`,
            'Neben den deutschen Hauptsendern, Regionalsendern und Pay-TV-Sportkanälen steht eine regelmäßig kuratierte Mediathek mit aktuellen Filmen und Serien bereit.',
          ],
        },
      ],
    ],
    pricing: [
      [
        {
          h2: 'Transparente Tarifmodelle ohne Vertragslaufzeit',
          paras: [
            'Verlässliche IPTV-Tarife bieten planbare Laufzeiten von 3, 6 oder 12 Monaten ohne automatische Verlängerung oder Kündigungsfristen.',
            `Bei ${kw} sinkt der rechnerische Monatspreis mit längerer Paketdauer, während 3-Monats-Pakete die flexibelste Testbasis bieten.`,
          ],
          list: [
            '3 Monate: Geringe Anfangsinvestition, ideal für die Bundesliga-Hinrunde.',
            '6 Monate: Ausgewogenes Preis-Leistungs-Verhältnis für Vielseher.',
            '12 Monate: Maximaler Preisvorteil mit vollständigem Zugriff auf alle 4K-Pakete.',
          ],
        },
      ],
      [
        {
          h2: 'Preis-Leistung & Zahlungssicherheit im Überblick',
          paras: [
            'Ein erstklassiger Dienst rechtfertigt faire Preise durch permanente Serverwartung und Ausfallsicherheit. Vermeiden Sie unregulierte Bezahlwege ohne Kundensupport.',
            'Achten Sie darauf, dass alle 4K-Feeds, der EPG und der VIP-Support ohne Aufpreis inbegriffen sind.',
          ],
        },
      ],
    ],
    trial: [
      [
        {
          h2: 'Checkliste für den 24-Stunden-Gratistest',
          steps: [
            'Fordern Sie Ihren Testzugang unkompliziert per WhatsApp an.',
            'Geben Sie Ihr Endgerät an (z. B. Fire TV Stick, Samsung TV oder Android).',
            'Tragen Sie die Test-Zugangsdaten in Ihren Player ein.',
            'Testen Sie abends ab 20:00 Uhr die Umschaltzeiten und Bildqualität auf Ihren Lieblingskanälen.',
          ],
        },
      ],
      [
        {
          h2: 'Worauf Sie während der Testphase achten sollten',
          paras: [
            'Nutzen Sie den 24-Stunden-Test gezielt während paralleler Live-Spiele, um die tatsächliche Belastbarkeit des Servers zu überprüfen.',
            'Prüfen Sie außerdem, ob die Tonspuren synchron laufen und der Programmführer (EPG) alle Sendungen übersichtlich darstellt.',
          ],
        },
      ],
    ],
    devices: [
      [
        {
          h2: 'Empfohlene Streaming-Hardware für flüssiges 4K',
          paras: [
            'Für das beste Gesamterlebnis empfehlen wir moderne Streaming-Geräte mit eigenem Grafikprozessor wie den Amazon Fire TV Stick 4K Max, Apple TV 4K oder die NVIDIA Shield TV Pro.',
          ],
          list: [
            'Amazon Fire TV: Einfaches Sideloading via Downloader-App und flüssige Navigation.',
            'Apple TV 4K: Schnellste Umschaltzeiten und brillante Farbwiedergabe über IPTVX.',
            'Android & Google TV: Volle Flexibilität mit TiviMate aus dem Play Store.',
            'Samsung & LG TVs: Direkte Installation spezialisierter TV-Apps ohne Zusatzkabel.',
          ],
        },
      ],
      [
        {
          h2: 'Hardware-Optimierung & Decoder-Einstellungen',
          paras: [
            'Um Mikroruckler auf schwächeren TV-Prozessoren zu verhindern, sollte in der Player-App die Hardware-Beschleunigung (HW+) aktiviert werden.',
            'Bei älteren Smart-TVs entlastet ein externer HDMI-Streaming-Stick den internen Fernseher-Speicher und beschleunigt das Laden umfangreicher Senderlisten enorm.',
          ],
        },
      ],
    ],
    apps: [
      [
        {
          h2: 'Die besten IPTV-Player im Vergleich',
          paras: [
            'TiviMate Premium gilt auf Android TV und Firestick als unangefochtener Spitzenreiter mit edler TV-Oberfläche und Multi-Screen-Funktion. IPTV Smarters Pro bleibt die bewährteste Allround-Lösung für Einsteiger auf iOS, Android und PC.',
          ],
          list: [
            'TiviMate: Unübertroffene Menüführung, programmierbare Fernbedienungstasten.',
            'IPTV Smarters Pro: Schneller Einstieg über Server-URL, Benutzername und Passwort.',
            'IBO Player: Perfekt optimiert für Samsung Tizen und LG webOS Smart-TVs.',
          ],
        },
      ],
      [
        {
          h2: 'Player-Konfiguration für maximale Stabilität',
          paras: [
            'Stellen Sie in Ihrer bevorzugten Player-App die Puffergröße auf 3 bis 5 Sekunden ein. Dadurch gleicht der Player kurzzeitige WLAN-Schwankungen automatisch aus, ohne das Bild anzuhalten.',
            'Aktivieren Sie die automatische EPG-Aktualisierung alle 12 bis 24 Stunden, damit Sendedaten stets auf dem neuesten Stand bleiben.',
          ],
        },
      ],
    ],
    sports: [
      [
        {
          h2: 'Live-Sport ohne Verzögerung & Bildaussetzer',
          paras: [
            'Bei schnellen Ballsportarten wie Fußball, Tennis oder Motorsport sind 60 Bilder pro Sekunde unverzichtbar. Dank dedizierter Sport-Serverknoten laufen Spiele flüssig wie im linearen Kabelfernsehen.',
            RIGHTS,
          ],
        },
      ],
      [
        {
          h2: 'Optimale Einstellungen am Spieltag',
          paras: [
            'Öffnen Sie den gewünschten Stream bereits einige Minuten vor Spielbeginn, um die Verbindung aufzubauen. Nutzen Sie nach Möglichkeit ein Ethernet-Kabel statt WLAN, um Signalstörungen im Heimnetzwerk auszuschließen.',
            RIGHTS,
          ],
        },
      ],
    ],
    setup: [
      [
        {
          h2: 'Praxis-Leitfaden zur Ersteinrichtung',
          steps: [
            'Starten Sie Ihren Router und das Streaming-Gerät neu.',
            'Laden Sie die passende Player-App herunter.',
            'Geben Sie Ihre persönlichen Xtream Codes Zugangsdaten ein.',
            'Warten Sie kurz, bis Kanallisten und EPG geladen sind.',
            'Fügen Sie Ihre Lieblingssender der Favoritenliste hinzu.',
          ],
        },
      ],
      [
        {
          h2: 'Fehlersuche & schnelle Lösungen',
          paras: [
            'Sollte ein Kanal einmal nicht starten, hilft meist das Leeren des App-Caches in den Geräteeinstellungen oder das Umschalten des Video-Decoders von Software auf Hardware.',
            'Überprüfen Sie bei anhaltenden Problemen Ihre Internetverbindung mit einem Speedtest direkt am Abspielgerät.',
          ],
        },
      ],
    ],
  };

  const catOptions = catBodies[cat] || catBodies.providers;
  const chosenCatBody = catOptions[h % catOptions.length];
  sections.push(...chosenCatBody);

  // Dynamic Intent-Specialized Sections (Anti-Spam & Query Matching)
  const seenH2 = new Set(sections.map(s => s.h2));
  for (const sec of detectIntentSectionsDe(kw)) {
    if (!seenH2.has(sec.h2)) {
      seenH2.add(sec.h2);
      sections.push(sec);
    }
  }

  // Entity Specific Sections (Devices, Apps, Sports)
  for (const sec of detect(kw)) {
    if (!seenH2.has(sec.h2)) {
      seenH2.add(sec.h2);
      sections.push(sec);
    }
  }

  // Rotating Modular Reference Section (Only 1 per page to eliminate boilerplate similarity!)
  const modularBonusSections: Section[] = [
    {
      h2: 'Häufige Fehler beim Streaming & Praxislösungen',
      list: [
        'WLAN-Störungen: Nutzen Sie bei Rucklern ein LAN-Kabel oder wechseln Sie auf das 5-GHz-Frequenzband.',
        'Veraltete App-Versionen: Aktualisieren Sie Ihren Player regelmäßig für optimale Codec-Kompatibilität.',
        'Voller Gerätespeicher: Halten Sie auf Streaming-Sticks mindestens 1 bis 2 GB freien Speicherplatz.',
        'DNS-Drosselung: Viele Standard-DNS von Internetanbietern verlangsamen Streaming-Anfragen. Wechseln Sie zu 1.1.1.1.',
      ],
    },
    {
      h2: 'Kleines Glossar der IPTV-Fachbegriffe',
      list: [
        'EPG (Electronic Program Guide): Digitaler Programmführer mit Sendungsinformationen und Sendezeiten.',
        'Xtream Codes API: Komfortables Login-Verfahren über Server-URL, Benutzername und Kennwort.',
        'M3U8: Dateiformat für HLS-Streams, das flexible Bitratenübertragung ermöglicht.',
        'H.265 / HEVC: Moderner Videokompressionsstandard für gestochen scharfes 4K bei reduzierter Datenlast.',
      ],
    },
    {
      h2: 'Checkliste zur Geräte- und App-Optimierung',
      steps: [
        'Prüfen Sie Ihre reale Internet-Bandbreite mit einem Speedtest auf dem Streaming-Gerät.',
        'Aktivieren Sie in den Player-Einstellungen die Hardware-Dekodierung (HW/HW+).',
        'Stellen Sie die Puffergröße bei Bedarf auf 3 bis 5 Sekunden.',
        'Erstellen Sie Favoritenordner, um schnell auf Ihre Hauptsender zuzugreifen.',
      ],
    },
    {
      h2: 'CDN-Architektur & Ausfallsicherheit im Detail',
      paras: [
        `Um bei Großereignissen wie der UEFA Champions League oder Formel 1 eine unterbrechungsfreie Bildqualität zu sichern, stützt sich ${BRAND} auf ein dezentrales Content Delivery Network.`,
        'Datenströme werden bei lokalen Netzüberlastungen in Echtzeit über redundante Rechenzentren umgeleitet, um Verbindungsabbrüche vollständig auszuschließen.',
      ],
    },
  ];

  const chosenModule = modularBonusSections[h % modularBonusSections.length];
  if (!seenH2.has(chosenModule.h2)) {
    seenH2.add(chosenModule.h2);
    sections.push(chosenModule);
  }

  // Dynamic Related Topics
  if (p.related && p.related.length > 0) {
    const relItems = p.related.slice(0, 4);
    sections.push({
      h2: `Verwandte Themen & Alternativen zu ${K}`,
      paras: [
        `Wenn Sie sich für **${kw}** interessieren, bieten auch folgende Konfigurationen und Player-Setups nützliche Lösungsansätze:`,
      ],
      list: relItems.map(r => `**${titleCase(r.k)}**: Vertiefende Einstellungen, Geräte-Tipps und Konfigurationsschritte für diesen Einsatzzweck.`),
    });
  }

  // Verdict Matrix
  const verdicts = [
    `${K} bietet im Jahr ${y} eine hervorragende Grundlage für modernes, flexibles Fernsehen in nativer 4K-Qualität mit erstklassiger Serverstabilität.`,
    `Mit der passenden Player-App und einer stabilen Internetverbindung liefert ${K} erstklassigen Live-Sport und Fernsehkomfort auf allen modernen Endgeräten.`,
    `Ob auf dem Fire TV Stick, Smart-TV oder Smartphone: ${K} überzeugt durch schnelle Umschaltzeiten, lückenlosen EPG und zuverlässigen Support.`,
    `Dank robuster CDN-Infrastruktur und moderner H.265-Decodierung setzt ${K} Maßstäbe für flüssiges Streaming im deutschsprachigen Raum.`,
  ];
  const verdict = verdicts[h % verdicts.length];

  // Dynamic Intent-Aware German FAQs (Multi-Set to prevent cross-page identical shingles)
  const getFaqsDe = (): Faq[] => {
    const q = kw.toLowerCase();
    if (/buffer|puffer|ruckel|freeze|lag|störung/i.test(q)) {
      return [
        {
          q: `Warum ruckelt der Stream bei ${kw}?`,
          a: 'Ruckeln liegt meist an temporären WLAN-Schwankungen oder DNS-Drosselungen des Internetanbieters. Die Umstellung auf LAN-Kabel und Cloudflare-DNS (1.1.1.1) behebt das Problem in der Regel sofort.',
        },
        {
          q: 'Welche Puffergröße sollte in der Player-App gewählt werden?',
          a: 'Eine Puffergröße von 3 bis 5 Sekunden in TiviMate oder IPTV Smarters Pro gleicht kurze Verbindungsschwankungen zuverlässig aus.',
        },
        {
          q: 'Hilft ein VPN gegen Ruckeln?',
          a: 'Wenn Ihr Internetanbieter zu Stoßzeiten Streaming-Ports drosselt, kann ein schnelles VPN mit WireGuard-Protokoll Abhilfe schaffen.',
        },
      ];
    }
    if (/test|probe|gratis|kostenlos|trial/i.test(q)) {
      return [
        {
          q: `Wie erhalte ich einen Testzugang für ${kw}?`,
          a: `Sie können direkt über WhatsApp (${SITE.phone}) einen unverbindlichen 24-Stunden-Test anfordern. Die Freischaltung erfolgt meist innerhalb weniger Minuten.`,
        },
        {
          q: 'Sind im Test alle Sender und 4K-Inhalte enthalten?',
          a: 'Ja, der Testzugang gewährt vollen Zugriff auf alle Live-Sender, Sportkanäle und die Mediathek.',
        },
        {
          q: 'Verlängert sich der Test automatisch?',
          a: 'Nein, der Testzugang läuft nach 24 Stunden automatisch aus. Es ist keine Kreditkarte oder Kündigung erforderlich.',
        },
      ];
    }

    const faqPool: Faq[] = [
      {
        q: `Was bedeutet ${kw}?`,
        a: `Es beschreibt die Nutzung und Einrichtung von IPTV-Diensten für diesen Themenbereich. Fernsehsignale werden dabei in hoher Auflösung über das Internet übertragen.`,
      },
      {
        q: 'Welche Internetgeschwindigkeit wird für 4K-Streaming benötigt?',
        a: 'Für Full HD empfehlen wir mindestens 15 Mbit/s, für ruckelfreies 4K UHD mit 60 FPS sind 25–30 Mbit/s pro Gerät optimal.',
      },
      {
        q: 'Welche Streaming-Geräte werden unterstützt?',
        a: 'Amazon Fire TV Stick, Android TV, Google TV, Samsung Smart-TV (Tizen), LG webOS, Apple TV sowie Windows PC und Mobilgeräte.',
      },
      {
        q: 'Was ist der Unterschied zwischen M3U und Xtream Codes?',
        a: 'Xtream Codes ist ein modernes Login-Verfahren (Server, Benutzername, Passwort), das Kanäle, EPG und Mediathek automatisch und übersichtlich synchronisiert.',
      },
      {
        q: 'Kann ich das Abo auf mehreren Geräten gleichzeitig nutzen?',
        a: 'Das hängt vom gewählten Tarif ab. Standard-Pakete unterstützen 1 bis 2 Geräte gleichzeitig, Multi-Room-Optionen sind auf Anfrage verfügbar.',
      },
      {
        q: 'Wie funktioniert die EPG-Aktualisierung?',
        a: 'Der elektronische Programmführer aktualisiert sich automatisch alle 12 bis 24 Stunden direkt über die Serververbindung.',
      },
      {
        q: 'Benötige ich eine Satellitenschüssel oder einen Kabelanschluss?',
        a: 'Nein, sämtliche Inhalte werden ausschließlich über Ihre bestehende Breitband-Internetverbindung gestreamt.',
      },
    ];

    // Pick 4-5 rotated FAQs per page deterministically
    const selectedFaqs: Faq[] = [faqPool[0]];
    const others = faqPool.slice(1);
    for (let i = 0; i < 4; i++) {
      selectedFaqs.push(others[(h + i) % others.length]);
    }
    return selectedFaqs;
  };

  const facts: [string, string][] = [['Thema', kw]];
  const d = label(DEVICES, kw); if (d) facts.push(['Gerät', d]);
  const a = label(APPS, kw); if (a) facts.push(['App / Format', a]);
  const s = label(SPORTS, kw); if (s) facts.push(['Sport / Dienst', s]);
  facts.push(['Empfohlene Geschwindigkeit', /4k|uhd/.test(kw) ? '25+ Mbit/s (4K 60FPS)' : '15–20 Mbit/s (Full HD)']);
  facts.push(['Optimale Verbindung', 'LAN-Kabel oder 5-GHz-WLAN']);

  const specsList: [string, string][][] = [
    [
      ['Auflösung', '4K UHD, Full HD 1080p, HD 720p'],
      ['Bildwiederholrate', 'Bis zu 60 FPS für flüssigen Live-Sport'],
      ['Verbindungstyp', 'Xtream Codes API & M3U8 HLS'],
      ['EPG-Unterstützung', '7-Tage elektronischer Programmführer'],
      ['Anti-Freeze', 'Version 9.8 mit automatischer Lastverteilung'],
    ],
    [
      ['Video-Codec', 'H.265 (HEVC) & H.264 AVC'],
      ['Server-Uplink', '10 Gbit/s redundante Glasfaser-Knoten'],
      ['Audioformate', 'Stereo 2.0 & Dolby Digital 5.1'],
      ['Umschaltzeit', 'Unter 1 Sekunde bei optimierten Playern'],
      ['Kompatibilität', 'Fire TV, Android, Apple TV, Smart TV, PC'],
    ],
  ];
  const specs = specsList[h % specsList.length];

  const prosList = [
    [
      'Umfangreiche Auswahl an Live-TV, 4K-Sport und VOD-Mediatheken.',
      'Hervorragende Serverstabilität dank redundanter 10-Gbit/s-Infrastruktur.',
      'Schnelle und unkomplizierte Einrichtung auf allen modernen Geräten.',
      'Unverbindlicher 24-Stunden-Test und persönlicher Support per WhatsApp.',
    ],
    [
      'Flüssige 60 Bilder pro Sekunde bei Bundesliga, Formel 1 und Champions League.',
      'Schnelle Umschaltzeiten ohne lange Pufferpausen dank modernem CDN.',
      'Keine Vertragsbindung oder versteckte automatische Verlängerung.',
      'Lückenloser elektronischer Programmführer (EPG) für alle Hauptsender.',
    ],
    [
      'Vollständige Unterstützung für TiviMate, Smarters Pro und Smart STB.',
      'Sichere und verschlüsselte Verbindung ohne Weitergabe persönlicher Daten.',
      'Direkte Einrichtung via Xtream Codes Login in weniger als 5 Minuten.',
      '24/7 technischer Support für schnelle Problemlösung.',
    ],
  ];
  const pros = prosList[h % prosList.length];

  const consList = [
    [
      'Für hochbitratiges 4K-Streaming wird eine stabile Internetleitung mit min. 25 Mbit/s empfohlen.',
      'Bei älteren Smart-TVs sorgt ein externer Streaming-Stick für schnellere Menü-Reaktionszeiten.',
    ],
    [
      'WLAN-Verbindungen im 2,4-GHz-Band können in Mehrfamilienhäusern störanfällig sein (LAN empfohlen).',
      'Für die volle Funktionsvielfalt auf Android empfiehlt sich ein dedizierter Player wie TiviMate.',
    ],
  ];
  const cons = consList[h % consList.length];

  return {
    title,
    description: trimDesc(`${K}: ${tldr.replace(/[„“"]/g, '')}`),
    h1,
    intro,
    sections,
    faqs: getFaqsDe(),
    related: rel,
    alsoSearched: p.related.map(r => r.k),
    tldr,
    facts,
    specs,
    pros,
    cons,
    verdict,
  };
}
