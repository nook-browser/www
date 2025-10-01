import type { PageServerLoad } from "./$types";
import { env as privateEnv } from "$env/dynamic/private";
import { CORE_TEAM } from "./team";

type GhUserLite = {
  login: string;
  avatar_url: string;
  html_url: string;
  type?: string;
};

export const load: PageServerLoad = async ({ fetch }) => {
  const org = privateEnv.GITHUB_ORG || "nook-browser";
  const repo = privateEnv.GITHUB_REPO || "nook";
  const token = privateEnv.GITHUB_TOKEN;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "nook-browser-team",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  headers["X-GitHub-Api-Version"] = "2022-11-28";

  try {
    const [contributorsRes, wwwContributorsRes, membersRes] = await Promise.all(
      [
        fetch(
          `https://api.github.com/repos/${org}/${repo}/contributors?per_page=100`,
          { headers }
        ),
        fetch(
          `https://api.github.com/repos/${org}/www/contributors?per_page=100`,
          {
            headers,
          }
        ),
        fetch(
          `https://api.github.com/orgs/${org}/public_members?per_page=100`,
          {
            headers,
          }
        ),
      ]
    );

    if (!contributorsRes.ok && !wwwContributorsRes.ok && !membersRes.ok) {
      return { team: [], contributors: [] };
    }

    const rawContrib =
      (contributorsRes.ok
        ? ((await contributorsRes.json()) as GhUserLite[])
        : []) || [];
    const rawWwwContrib =
      (wwwContributorsRes.ok
        ? ((await wwwContributorsRes.json()) as GhUserLite[])
        : []) || [];
    const rawMembers =
      (membersRes.ok ? ((await membersRes.json()) as GhUserLite[]) : []) || [];

    // Build hard-coded team using CORE_TEAM and enrich with avatars via member list
    const memberAvatar = new Map<string, string>();
    const memberUrl = new Map<string, string>();
    for (const m of rawMembers) {
      if (!m?.login) continue;
      memberAvatar.set(m.login.toLowerCase(), m.avatar_url);
      memberUrl.set(m.login.toLowerCase(), m.html_url);
    }

    const team = (CORE_TEAM || []).map((cm) => {
      const key = cm.login ? cm.login.toLowerCase() : undefined;
      const ghAvatar = cm.login
        ? memberAvatar.get(key!) || `https://github.com/${cm.login}.png`
        : null;
      const avatar_url = cm.customPfp || ghAvatar || "";

      const ghUrl = cm.login
        ? memberUrl.get(key!) || `https://github.com/${cm.login}`
        : null;
      const customUrl =
        cm.url === "github" && cm.login
          ? `https://github.com/${cm.login}`
          : cm.url || null;
      const html_url = customUrl || ghUrl || "#";

      return {
        login: cm.login,
        name: cm.name || cm.login || "",
        role: cm.role || "",
        avatar_url,
        html_url,
        email: cm.email || "",
      };
    });

    // Exclude team logins and bots from contributors
    /* const exclude = new Set<string>();
    for (const t of team) {
      if (t.login) exclude.add(t.login.toLowerCase());
    } */
    const seenLogins = new Set<string>(["nook-browser"]);

    // Create a map to store unique contributors by login
    const uniqueContributors = new Map<string, GhUserLite>();

    // Process both contributor lists, keeping only one entry per login
    [...rawContrib, ...rawWwwContrib].forEach((c) => {
      if (c && c.login && c.type !== "Bot" && !seenLogins.has(c.login)) {
        uniqueContributors.set(c.login, c);
      }
    });

    const contributors = Array.from(uniqueContributors.values())
      .map((c) => ({
        login: c.login,
        avatar_url: c.avatar_url,
        html_url: c.html_url,
      }))
      .slice(0, 128);

    return { team, contributors };
  } catch {
    return { team: [], contributors: [] };
  }
};
