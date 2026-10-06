// Nook's releases, read from GitHub's release feed so the site follows each release on its own.
// The feed is a github.com page, not the REST API, so it does not share the API's per-IP rate
// limit with everyone else on Cloudflare's egress addresses.

export type Release = {
  tag: string; // "v1.2.0"
  version: string; // "1.2.0"
  date: string; // ISO 8601
  html: string; // release notes, rendered by GitHub
  summary: string; // first line of the notes, as text
  url: string; // the release on GitHub
  dmg: string;
};

const repo = "https://github.com/nook-browser/Nook";
export const releasesPage = `${repo}/releases`;

const unescape = (s: string) =>
  s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");

const text = (html: string) =>
  unescape(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

function pick(entry: string, pattern: RegExp): string {
  return entry.match(pattern)?.[1] ?? "";
}

export function parseFeed(xml: string): Release[] {
  const out: Release[] = [];
  for (const [, entry] of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
    const url = pick(entry, /<link[^>]*rel="alternate"[^>]*href="([^"]+)"/);
    const tag = decodeURIComponent(url.split("/releases/tag/")[1] ?? "");
    // Betas carry a suffix ("v1.1.0-beta.1"); the site lists official releases only.
    if (!/^v\d+\.\d+\.\d+$/.test(tag)) continue;
    const html = unescape(pick(entry, /<content type="html">([\s\S]*?)<\/content>/));
    const first = html.match(/<(li|p)>([\s\S]*?)<\/\1>/)?.[2] ?? "";
    out.push({
      tag,
      version: tag.slice(1),
      date: pick(entry, /<updated>([^<]+)<\/updated>/),
      html,
      summary: text(first),
      url,
      dmg: `${repo}/releases/download/${tag}/Nook-${tag}.dmg`,
    });
  }
  return out;
}

export async function fetchReleases(): Promise<Release[]> {
  try {
    const res = await fetch(`${repo}/releases.atom`, {
      headers: { "User-Agent": "browsewithnook.com" },
      // Cloudflare keeps the feed for 10 minutes, so visits do not each go to GitHub.
      cf: { cacheTtl: 600, cacheEverything: true },
    } as RequestInit);
    if (!res.ok) return [];
    return parseFeed(await res.text());
  } catch {
    return [];
  }
}
