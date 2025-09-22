export type Entry = {
  id: string;
  date: string; // ISO date
  title: string;
  summary: string;
  tags: string[]; // lowercase tags
  version?: string;
  body: string; // html
};

export const entries: Entry[] = [
  {
    id: "0-3-0",
    date: "2025-09-18",
    title: "Spaces get smarter + a calmer sidebar",
    summary: "Rooms auto-tidy, quicker jumps, and a gentler visual rhythm.",
    tags: ["new", "improved"],
    version: "v0.3.0",
    body: `
      <ul>
        <li><strong>Auto-Tidy</strong> for Rooms: close stale tabs gracefully and pin active work.</li>
        <li><strong>Jump Palette</strong>: switch Rooms with ⇧⌘K and fuzzy-find anything.</li>
        <li><strong>Softer sidebar</strong>: more breathing room, fewer dividers.</li>
        <li><strong>Privacy</strong>: export/delete gets a one-click surface in Settings.</li>
      </ul>
    `,
  },
  {
    id: "0-2-4",
    date: "2025-09-05",
    title: "Local-first sync preview",
    summary: "Device-to-device sync without a cloud account.",
    tags: ["preview", "privacy", "new"],
    version: "v0.2.4",
    body: `
      <p>Peer-to-peer sync (LAN) for Rooms and preferences. No servers. No account. Private by default.</p>
      <p>Toggle in <em>Settings → Sync (Preview)</em>.</p>
    `,
  },
  {
    id: "0-2-0",
    date: "2025-08-20",
    title: "A gentler first-run",
    summary: "Welcome flow, import from Arc/Chrome, and lighter empty states.",
    tags: ["improved", "fixed"],
    version: "v0.2.0",
    body: `
      <ul>
        <li>New welcome flow with 60-second setup.</li>
        <li>Arc/Chrome import for tabs, bookmarks, and profiles.</li>
        <li>Fixed crash when dragging tabs between split views.</li>
      </ul>
    `,
  },
];

/* export const tagPalette: Record<string, string> = {
  New: "bg-[#9cb57f] text-[#07140f]",
  Improved: "bg-[#dfe8cf] text-[#07140f]",
  Fixed: "bg-[#e9d6ce] text-[#07140f]",
  Privacy: "bg-[#0f2b1f] text-[#f9f8f4]",
  Preview: "bg-[#07140f] text-[#f9f8f4]",
}; */

export const TAG_PRIORITY = [
  "New",
  "Improved",
  "Fixed",
  "Preview",
  "Privacy",
] as const;

export const capitalize = (s: string) =>
  s ? s.charAt(0).toUpperCase() + s.slice(1) : s;

export const styleForTag = (t: string) =>
  // tagPalette[capitalize(t)] ??
  //"bg-white text-[#07140f] ring-1 ring-[#0f2b1f]/10";
  "bg-[#dfe8cf] text-[#07140f]";

export function pickTag(tags: string[]): string | undefined {
  if (!tags || tags.length === 0) return undefined;
  const norm = tags.map((t) => capitalize(t));
  for (const key of TAG_PRIORITY) {
    if (norm.includes(key)) return key;
  }
  return norm[0];
}

export function monthKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
export function monthLabel(d: Date) {
  return d.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}
export function shortDay(d: Date) {
  const day = d.getDate().toString().padStart(2, "0");
  const mon = d.toLocaleDateString(undefined, { month: "short" });
  return `${mon} ${day}`;
}

export function getEntryById(id: string): Entry | undefined {
  return entries.find((e) => e.id === id);
}

export function getPrevNext(id: string) {
  const sorted = [...entries].sort(
    (a, b) => +new Date(b.date) - +new Date(a.date)
  );
  const idx = sorted.findIndex((e) => e.id === id);
  return {
    prev: idx > 0 ? sorted[idx - 1] : undefined,
    next: idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : undefined,
  };
}
