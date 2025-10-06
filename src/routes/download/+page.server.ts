import type { Actions, PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

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

export const load: PageServerLoad = async () => {
  throw redirect(307, "/");
};

export const actions: Actions = {
  default: async () => {
    throw redirect(307, "/");
  },
};
