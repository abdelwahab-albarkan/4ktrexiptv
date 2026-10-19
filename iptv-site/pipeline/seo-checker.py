import glob
import re
import html
import json
import os
import sys
import urllib.parse

MARKET_DOMAINS = {
    "us": "https://4ktrexiptv.com",
    "de": "https://de.4ktrexiptv.com",
    "au": "https://au.4ktrexiptv.com",
}

def check(market="us"):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

    dist_dir = f"dist-{market}"
    if not os.path.exists(dist_dir):
        print(f"Directory {dist_dir} not found. Please build the site first: npm run build")
        return

    domain = MARKET_DOMAINS.get(market, "https://4ktrexiptv.com")
    html_files = sorted(glob.glob(f"{dist_dir}/**/*.html", recursive=True))
    print(f"\n=======================================================", flush=True)
    print(f"[+] ANALYZING MARKET: {market.upper()} ({dist_dir})", flush=True)
    print(f"Target Domain: {domain}", flush=True)
    print(f"Total HTML files analyzed: {len(html_files)}", flush=True)
    print(f"=======================================================\n", flush=True)
    
    title_issues = []
    desc_issues = []
    h1_issues = []
    heading_skips = []
    alt_issues = []
    canonical_issues = []
    schema_issues = []
    all_routes = set()
    ids_per_route = {}
    file_contents = {}

    # First pass: load, check on-page metrics, register routes & IDs
    for hf in html_files:
        if "404.html" in hf:
            continue
        
        rel = os.path.relpath(hf, dist_dir).replace("\\", "/")
        if rel.endswith("index.html"):
            route = "/" + rel[:-10]
            if route == "//": route = "/"
        elif rel.endswith(".html"):
            route = "/" + rel[:-5]
        else:
            route = "/" + rel
        
        if not route.endswith("/") and route != "/":
            route += "/"
        all_routes.add(route)
        all_routes.add(route.rstrip("/"))

        with open(hf, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()

        file_contents[route] = content
        ids = set(re.findall(r'id=["\']([a-zA-Z0-9_-]+)["\']', content))
        ids_per_route[route] = ids

        # Title check
        m_title = re.search(r"<title>(.*?)</title>", content)
        if not m_title:
            title_issues.append((hf, "No title"))
        else:
            raw_title = html.unescape(m_title.group(1))
            t_len = len(raw_title)
            if "| 4K Trex IPTV | 4K Trex IPTV" in raw_title or "| Trex IPTV | Trex IPTV" in raw_title:
                title_issues.append((hf, f"Double brand: {raw_title} ({t_len} chars)"))
            elif t_len < 30 or t_len > 70:
                title_issues.append((hf, f"Length {t_len} (expected 35-65): {raw_title}"))

        # Description check
        m_desc = re.search(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', content)
        if not m_desc:
            desc_issues.append((hf, "No description"))
        else:
            raw_desc = html.unescape(m_desc.group(1))
            d_len = len(raw_desc)
            if d_len < 110 or d_len > 165:
                desc_issues.append((hf, f"Length {d_len} (target 120-160): {raw_desc}"))

        # Canonical check
        m_canon = re.search(r'<link\s+rel=["\']canonical["\']\s+href=["\'](.*?)["\']', content)
        if not m_canon:
            canonical_issues.append((hf, "Missing canonical tag"))
        else:
            canon = m_canon.group(1)
            if not canon.startswith(domain):
                canonical_issues.append((hf, f"Non-absolute/wrong domain canonical: {canon}"))

        # H1 check
        h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', content, re.DOTALL)
        if len(h1s) == 0:
            h1_issues.append((hf, "Zero <h1> tags"))
        elif len(h1s) > 1:
            h1_issues.append((hf, f"{len(h1s)} <h1> tags found"))

        # Heading hierarchy check
        headings = re.findall(r'<(h[1-6])[^>]*>', content)
        prev_level = 0
        for h in headings:
            lvl = int(h[1])
            if prev_level > 0 and lvl > prev_level + 1:
                heading_skips.append((hf, f"Skipped heading level: h{prev_level} -> h{lvl}"))
                break
            prev_level = lvl

        # Image alt checks
        imgs = re.findall(r'<img([^>]*)/?>', content)
        for img in imgs:
            m_alt = re.search(r'alt=["\'](.*?)["\']', img)
            if not m_alt:
                alt_issues.append((hf, f"Missing alt attribute in img: {img[:80]}"))
            elif m_alt.group(1).strip() == "" and 'role="presentation"' not in img and 'aria-hidden' not in img and 'class="flag"' not in img and 'class="server-flag"' not in img:
                alt_issues.append((hf, f"Empty alt attribute in img: {img[:80]}"))

        # Schema JSON-LD checks
        schemas = re.findall(r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', content, re.DOTALL)
        for s in schemas:
            try:
                data = json.loads(s)
            except Exception as e:
                schema_issues.append((hf, f"Invalid JSON-LD: {e}"))

    # Link & Anchor checks in memory
    broken_links = []
    broken_anchors = []
    for current_route, c in file_contents.items():
        hrefs = re.findall(r'href=["\']([^"\']+)["\']', c)
        for href in hrefs:
            if href.startswith("mailto:") or href.startswith("tel:") or href.startswith("javascript:") or href.startswith("#"):
                if href.startswith("#") and href != "#":
                    frag = href[1:]
                    if current_route in ids_per_route and frag not in ids_per_route[current_route]:
                        broken_anchors.append((current_route, href, f"id #{frag} not in {current_route}"))
                continue

            clean_href = href
            if clean_href.startswith(domain):
                clean_href = clean_href[len(domain):]
                if not clean_href.startswith("/"): clean_href = "/" + clean_href
            elif clean_href.startswith("http://") or clean_href.startswith("https://"):
                continue

            parsed = urllib.parse.urlparse(clean_href)
            path = parsed.path
            fragment = parsed.fragment
            target_route = path if path else current_route
            
            is_public_asset = (
                target_route.startswith("/_astro/")
                or target_route.startswith("/images/")
                or target_route.startswith("/og/")
                or target_route.startswith("/sitemaps/")
                or target_route in [
                    "/manifest.json",
                    "/favicon.ico",
                    "/icon.svg",
                    "/apple-touch-icon.png",
                    "/sitemap.xml",
                    "/sitemap-index.xml",
                    "/sitemap-main.xml",
                    "/robots.txt",
                    "/rss.xml",
                ]
            )
            
            norm_target = target_route if target_route.endswith("/") or "." in target_route else target_route + "/"
            file_exists = os.path.exists(os.path.join(dist_dir, target_route.lstrip("/")))
            if not is_public_asset and not file_exists and target_route not in all_routes and norm_target not in all_routes:
                broken_links.append((current_route, href))

            if fragment:
                rfg = norm_target if norm_target in ids_per_route else current_route
                if rfg in ids_per_route and fragment not in ids_per_route[rfg]:
                    broken_anchors.append((current_route, href, f"id #{fragment} not in {rfg}"))

    print("--- 1. TITLE AUDIT ---", flush=True)
    print(f"Issues: {len(title_issues)}", flush=True)
    for item in title_issues[:5]:
        print(f"  {item[0]}: {item[1]}", flush=True)
    if len(title_issues) > 5:
        print(f"  ... and {len(title_issues) - 5} more", flush=True)

    print("\n--- 2. DESCRIPTION AUDIT ---", flush=True)
    print(f"Issues: {len(desc_issues)}", flush=True)
    for item in desc_issues[:5]:
        print(f"  {item[0]}: {item[1]}", flush=True)
    if len(desc_issues) > 5:
        print(f"  ... and {len(desc_issues) - 5} more", flush=True)

    print("\n--- 3. CANONICAL AUDIT ---", flush=True)
    print(f"Issues: {len(canonical_issues)}", flush=True)
    for item in canonical_issues[:5]:
        print(f"  {item[0]}: {item[1]}", flush=True)

    print("\n--- 4. H1 AUDIT ---", flush=True)
    print(f"Issues: {len(h1_issues)}", flush=True)
    for item in h1_issues[:5]:
        print(f"  {item[0]}: {item[1]}", flush=True)

    print("\n--- 5. HEADING HIERARCHY SKIPS ---", flush=True)
    print(f"Issues: {len(heading_skips)}", flush=True)
    for item in heading_skips[:5]:
        print(f"  {item[0]}: {item[1]}", flush=True)

    print("\n--- 6. IMAGE ALT AUDIT ---", flush=True)
    print(f"Issues: {len(alt_issues)}", flush=True)
    for item in alt_issues[:5]:
        print(f"  {item[0]}: {item[1]}", flush=True)

    print("\n--- 7. SCHEMA JSON-LD AUDIT ---", flush=True)
    print(f"Issues: {len(schema_issues)}", flush=True)
    for item in schema_issues[:5]:
        print(f"  {item[0]}: {item[1]}", flush=True)

    print("\n--- 8. BROKEN INTERNAL LINKS ---", flush=True)
    print(f"Issues: {len(broken_links)}", flush=True)
    for item in broken_links[:5]:
        print(f"  {item[0]} -> {item[1]}", flush=True)

    print("\n--- 9. BROKEN ANCHOR IDS ---", flush=True)
    print(f"Issues: {len(broken_anchors)}", flush=True)
    for item in broken_anchors[:5]:
        print(f"  {item[0]} -> {item[1]}: {item[2]}", flush=True)

    print("\n=======================================================", flush=True)
    print(f"QA SCAN COMPLETE FOR {market.upper()}", flush=True)
    print("=======================================================\n", flush=True)

if __name__ == "__main__":
    m = sys.argv[1].lower() if len(sys.argv) > 1 else "us"
    check(m)
