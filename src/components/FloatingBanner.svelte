<script lang="ts">
  import type { Release } from "../lib/releases";

  export let showVersionBanner = true;
  export let latest: Release | null = null;

  function dismissVersionBanner() {
    showVersionBanner = false;
  }
</script>

<!-- Floating Banner (What's new) -->
{#if showVersionBanner && latest?.version}
  <div class="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
    <div
      class="inline-flex items-center gap-2 rounded-full border border-[#0f2b1f]/15 bg-white/80 px-4 py-2 backdrop-blur shadow-[0_10px_24px_-18px_rgba(7,20,15,.25)] hover:bg-white transition-colors duration-200 ease-in-out"
    >
      <a
        href={`/whats-new/${latest.tag}`}
        class="inline-flex items-center gap-2 text-sm text-[#07140f]/85 hover:text-[#07140f]"
      >
        <span class="font-medium">What's new in {latest.version}</span>
      </a>
      <button
        class="ml-1 text-[#07140f]/60 hover:text-[#07140f] cursor-pointer"
        aria-label="Dismiss what's new banner"
        on:click={dismissVersionBanner}>✕</button
      >
    </div>
  </div>
{/if}
