<script lang="ts" context="module">
  const apiBase = "https://cms.browsewithnook.com";

  export type CMSImage = {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
  };

  export type ChangelogEntry = {
    id: number | string;
    title: string;
    slug: string;
    version?: string;
    tag?: string;
    publishedAt?: string;
    createdAt?: string;
    summary?: string;
    image?: CMSImage;
  };

  // Export the fetch function so Astro can use it
  export async function fetchLatestChangelog(): Promise<ChangelogEntry | null> {
    try {
      const res = await fetch(`${apiBase}/api/changelog-entries/?limit=1`, {
        cache: "no-store",
      });

      if (!res.ok) return null;

      const data = (await res.json()) as { docs?: ChangelogEntry[] };
      return data?.docs?.[0] || null;
    } catch (err) {
      console.error("Failed to fetch latest changelog:", err);
      return null;
    }
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";

  export let showVersionBanner = true;
  export let latest: ChangelogEntry | null = null;

  async function fetchLatestChangelog() {
    try {
      const res = await fetch(`${apiBase}/api/changelog-entries/?limit=1`, {
        cache: "no-store",
      });

      if (!res.ok) return;

      const data = (await res.json()) as { docs?: ChangelogEntry[] };

      if (data?.docs?.[0]) {
        latest = data.docs[0];
        console.log("Fetched latest changelog:", latest);
      }
    } catch (err) {
      console.error("Failed to fetch latest changelog:", err);
    }
  }

  function dismissVersionBanner() {
    showVersionBanner = false;
  }

  onMount(() => {
    fetchLatestChangelog();
  });
</script>

<!-- Floating Banner (What's new) -->
{#if showVersionBanner && latest?.version}
  <div class="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
    <div
      class="inline-flex items-center gap-2 rounded-full border border-[#0f2b1f]/15 bg-white/80 px-4 py-2 backdrop-blur shadow-[0_10px_24px_-18px_rgba(7,20,15,.25)] hover:bg-white transition-colors duration-200 ease-in-out"
    >
      <a
        href={`/whats-new/${latest.slug}`}
        class="inline-flex items-center gap-2 text-sm text-[#07140f]/85 hover:text-[#07140f]"
      >
        <span class="font-medium">What's new — {latest.version}</span>
      </a>
      <button
        class="ml-1 text-[#07140f]/60 hover:text-[#07140f] cursor-pointer"
        aria-label="Dismiss what's new banner"
        on:click={dismissVersionBanner}>✕</button
      >
    </div>
  </div>
{/if}
