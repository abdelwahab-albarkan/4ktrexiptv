# IPTV SEO sites (US/UK, AU, DE)

Three static Astro sites generated from the keyword CSV exports in the parent folder.

## Commands (run inside `iptv-site/`)

| Command | What it does |
|---|---|
| `node pipeline/build-all.mjs` | keywords + build + QA for us, au, de → `dist-us/`, `dist-au/`, `dist-de/` |
| `node pipeline/build-all.mjs de` | same, one market |
| `node pipeline/build-keywords.mjs us 1500` | only regenerate `src/data/pages.us.json` (max 1500 pages) |
| `node pipeline/qa.mjs us` | word counts, duplicate titles, broken internal links for an existing build |

Dev: `SITE_MARKET=de npx astro dev` (PowerShell: `$env:SITE_MARKET='de'; npx astro dev`).

## Where things live

- `pipeline/build-keywords.mjs` – merge/dedupe CSVs, filter noise and piracy terms, cluster, classify. Per-market regexes at the top.
- `src/config.ts` – brand, domain, order link, plans, market switch. **Replace the placeholders before launch.**
- `src/i18n.ts` – all UI/home/legal text for EN and DE.
- `src/lib/content.ts` (EN) and `content.de.ts` (DE) – page generators; `entities.ts` – device/app/sport/region blocks (EN).
- `src/data/overrides.<market>.json` – hand-written sections and FAQs for top pages, keyed by slug. Add more here.

## Before launch

1. Set real brand, domains, prices and order links in `src/config.ts`; update the `robots`/sitemap domain (it uses `SITE.url`).
2. Replace the privacy, terms and imprint templates with lawyer-reviewed text (DE needs a full Impressum).
3. Add hand-written overrides for more pages (target top 100–150 per market).
4. Confirm licensing for any content you sell; the site copy makes no claims about channel counts.

## Deploy (Cloudflare Pages or Netlify), one project per market

| Setting | Value |
|---|---|
| Build command | `node pipeline/build-keywords.mjs <us\|au\|de> && npx astro build` |
| Environment variable | `SITE_MARKET=<us\|au\|de>` |
| Output directory | `dist-<us\|au\|de>` |

The keyword CSVs live outside `iptv-site/`, so for CI either commit the generated `src/data/pages.<market>.json` and use only `npx astro build`, or upload the CSV folders next to the project. Committing the JSON is simpler.

`public/_headers` sets security and cache headers (supported by both hosts). `src/pages/404.astro` is the custom 404.

## Hand-written content

`node pipeline/coverage.mjs 100` lists which of the top 100 pages per market still lack an entry in `src/data/overrides.<market>[.N].json`. Later batches (higher N) override earlier ones for the same slug.

## Images

- Source images live in `../public/images` (not committed to the site). `src/data/image-manifest.json` lists the curated ones (key, file, alt EN/DE).
- `node pipeline/sync-images.mjs` copies them to `public/images`, creates `-w400/-w800` variants, writes `src/data/images.json` and generates the Open Graph JPEGs in `public/og/`.
- Use `<Img k="key" />` (src/components/Img.astro): responsive srcset, width/height, lazy loading, alt per locale. `src/lib/images.ts` picks hero/inline images per page.
- `node pipeline/images-inventory.mjs` builds contact sheets of every source image for review.
- Not used on purpose: stock portraits (`revriw/`), athlete/league photos, competitor and manufacturer screenshots, payment-method logos, third-party app logos. Check licences before adding any of them.

## Design system

- Tokens and base styles live in `src/styles/global.css`; `src/styles/v2.css` is loaded after it and holds the current component layer (buttons, header and mobile menu, cards, hub tiles, FAQ, footer, responsive rules). Prefer editing `v2.css`.
- Icons: one family in `src/lib/icons.ts` (24px grid, 1.75 stroke, round caps), rendered with `<Icon name="..." />`. Do not use emoji or text glyphs as icons.
- Buttons: `.btn` (primary), `.btn.ghost`, sizes `.btn-sm` / default / `.btn-lg`. Dark ink on accent green keeps contrast above 7:1.
- Layout helpers: `.block` / `.block.alt` sections, `.bento`, `.rows-grid`, `.tile-list`, `.split`, `.logo-grid`.
- QA (`node pipeline/qa.mjs <market>`): duplicate titles, broken links, missing images, alt text, heading order, duplicate ids, unnamed links/buttons, emoji and inline-style leftovers.
