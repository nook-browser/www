import type { Actions, PageServerLoad } from "./$types";
import { env as privateEnv } from "$env/dynamic/private";

function formatSize(bytes: number) {
  if (!bytes && bytes !== 0) return "";
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let n = bytes;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i++;
  }
  return `${n.toFixed(n >= 100 ? 0 : n >= 10 ? 1 : 2)} ${units[i]}`;
}

function detectOs(userAgent: string | undefined) {
  const ua = (userAgent || "").toLowerCase();
  if (ua.includes("mac") || ua.includes("darwin")) return "mac" as const;
  if (ua.includes("win")) return "windows" as const;
  if (ua.includes("linux")) return "linux" as const;
  return "mac" as const;
}

type Asset = { name: string; browser_download_url: string; size: number };
type Release = {
  tag_name: string;
  name?: string;
  published_at: string;
  assets: Asset[];
};

export const load: PageServerLoad = async ({ fetch, request }) => {
  const repo = privateEnv.GITHUB_DOWNLOAD_REPO || "nook-browser/Nook";
  const token = privateEnv.GITHUB_TOKEN;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(
    `https://api.github.com/repos/${repo}/releases/latest`,
    { headers }
  );
  if (!res.ok) {
    return {
      ok: false as const,
      status: res.status,
      error: "Failed to fetch release info",
    };
  }
  const json = (await res.json()) as Release;
  const assets = json.assets || [];

  const byOs = {
    mac: assets.filter((a) =>
      /\.dmg$|\.pkg$|mac|darwin|universal|arm64|x64/i.test(a.name)
    ),
    windows: assets.filter((a) => /\.exe$|\.msi$|win/i.test(a.name)),
    linux: assets.filter((a) =>
      /\.AppImage$|\.deb$|\.rpm$|linux/i.test(a.name)
    ),
  } as const;

  const uaOs = detectOs(request.headers.get("user-agent") || undefined);

  return {
    ok: true as const,
    release: {
      tag: json.tag_name,
      name: json.name || json.tag_name,
      publishedAt: json.published_at,
    },
    assets: {
      mac: byOs.mac.map((a) => ({
        name: a.name,
        url: a.browser_download_url,
        size: formatSize(a.size),
      })),
      windows: byOs.windows.map((a) => ({
        name: a.name,
        url: a.browser_download_url,
        size: formatSize(a.size),
      })),
      linux: byOs.linux.map((a) => ({
        name: a.name,
        url: a.browser_download_url,
        size: formatSize(a.size),
      })),
    },
    preferredOs: uaOs,
  } as const;
};

export const actions: Actions = {
  default: async () => ({ ok: true } as const),
};
