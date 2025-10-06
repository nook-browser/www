import type { Actions, PageServerLoad } from "./$types";
import { env as privateEnv } from "$env/dynamic/private";
import { env as publicEnv } from "$env/dynamic/public";

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

export const load: PageServerLoad = async ({ request, cookies }) => {
  const allowlist = (privateEnv.ALLOWLIST_EMAILS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const uaOs = detectOs(request.headers.get("user-agent") || undefined);

  const session = cookies.get("nook_session") || "";
  const email = cookies.get("nook_email") || "";
  const isAllowed = email && allowlist.includes(email.toLowerCase());

  return {
    ok: true,
    release: {
      tag: "preview",
      name: "Preview build",
      publishedAt: new Date().toISOString(),
    },
    assets: {
      mac: [
        {
          name: "Nook-macOS.dmg",
          url: "https://picsum.photos/seed/mac/2000/1200",
        },
      ],
    },
    preferredOs: uaOs,
    session: Boolean(session),
    email: email || null,
    isAllowed,
  } as const;
};

export const actions: Actions = {
  default: async ({ request, cookies, fetch }) => {
    const form = await request.formData();
    const email = String(form.get("email") || "")
      .trim()
      .toLowerCase();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return { ok: false, error: "Invalid email" } as const;
    }

    const apiBase = publicEnv.PUBLIC_API_BASE?.replace(/\/$/, "") || "/api";
    const url = `${apiBase}/waitlist/status?email=${encodeURIComponent(email)}`;
    let isAllowed = false;
    try {
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (res.ok) {
        const json = (await res.json()) as
          | { found: true; admitted: boolean }
          | { found: false; admitted: false };
        isAllowed = Boolean((json as any)?.admitted);
      }
    } catch (err) {
      // Network errors treated as not admitted; still set cookies for UX.
      isAllowed = false;
    }
    cookies.set("nook_email", email, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
    });
    cookies.set("nook_session", isAllowed ? "1" : "0", {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
    });

    return { ok: true, email, isAllowed } as const;
  },
};
