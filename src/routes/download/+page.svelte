<script lang="ts">
  import Footer from "$lib/components/Footer.svelte";
  import Nav from "$lib/components/Nav.svelte";
  import { reveal } from "$lib/actions/reveal";
  const { data } = $props<{
    data:
      | {
          ok: true;
          release: { tag: string; name: string; publishedAt: string };
          assets: { mac: { name: string; url: string; size?: string }[] };
          preferredOs: "mac" | "windows" | "linux";
        }
      | { ok: false; status: number; error: string };
  }>();

  function dateLabel(d: string) {
    const date = new Date(d);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  }
</script>

<svelte:head>
  <title>Download — Nook Browser</title>
  <meta
    name="description"
    content="Download Nook for macOS. Install and start browsing in seconds."
  />
</svelte:head>

<div class="min-h-screen antialiased bg-[#f9f8f4] text-[#07140f]">
  <!-- NAV -->
  <Nav showDownload={false} />

  <!-- HERO -->
  <section
    class="relative max-w-6xl mx-auto px-6 text-center min-h-[calc(100vh-96px)] flex flex-col items-center justify-center"
  >
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_70%_at_50%_0%,rgba(156,181,127,0.10),transparent)]"
    />
    <div
      class="inline-flex items-center justify-center w-24 h-24 shadow-[0_18px_36px_-24px_rgba(7,20,15,.35)] bg-transparent"
      use:reveal={{ animation: "up", duration: 550, distance: 8 }}
    >
      <img
        src="/lmicon.png"
        alt="Download icon"
        class="w-24 h-24 bg-transparent"
      />
    </div>
    <!-- <div
      class="mt-6 inline-flex items-center gap-2 rounded-full border border-[#0f2b1f]/15 bg-white/70 px-3 py-1 text-[11px] font-medium text-[#07140f]/80"
      use:reveal={{ animation: "up", duration: 500, distance: 8 }}
    >
      Alpha
    </div> -->
    <h1
      class="mt-8 text-[clamp(2.2rem,6vw,3.8rem)] leading-[1.06] tracking-tight font-hero"
      use:reveal={{ animation: "up", duration: 650, distance: 10 }}
    >
      Download <span class="gradient-ink">Nook Alpha</span>
    </h1>
    <p
      class="mt-3 text-[clamp(1rem,2.1vw,1.15rem)] text-[#07140f]/75 max-w-2xl mx-auto"
      use:reveal={{ animation: "up", delay: 90, distance: 8 }}
    >
      Calm browsing, ready in seconds.
    </p>
    <div class="mt-8" use:reveal={{ animation: "up", delay: 140, distance: 8 }}>
      {#if data.ok}
        <a
          href={data.assets.mac[0]?.url}
          class="inline-flex items-center gap-2.5 rounded-3xl bg-[#0f2b1f] text-[#f9f8f4] px-7 py-3.5 text-[15px] font-semibold shadow-[0_22px_40px_-22px_rgba(7,20,15,.55)] hover:-translate-y-0.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform text-center"
        >
          <span class="text-2xl" aria-hidden="true"></span> Download for macOS
        </a>
        <div
          class="mt-3 flex items-center justify-center gap-2 text-xs text-[#07140f]/60"
        >
          <span
            class="rounded-full bg-[#0f2b1f]/5 text-[#0f2b1f] px-2 py-0.5 font-medium"
            >Alpha</span
          >
          <span aria-hidden="true">•</span>
          <span>macOS 13+</span>
          <span aria-hidden="true">•</span>
          <span
            >Latest: {data.release.name} — {dateLabel(
              data.release.publishedAt
            )}</span
          >
        </div>
      {:else}
        <span
          class="inline-flex items-center gap-2 rounded-full bg-[#0f2b1f] text-[#f9f8f4] px-6 py-3.5 text-sm font-semibold opacity-60 cursor-not-allowed"
          >Download temporarily unavailable</span
        >
      {/if}
    </div>
  </section>

  <!-- BODY -->
  <section style="display: none;">
    <!--max-w-6xl mx-auto px-6 mt-20 md:mt-24-->
    {#if !data.ok}
      <div
        class="rounded-2xl border border-[#e2dec7] bg-white/70 p-6 text-center"
        use:reveal={{ animation: "up" }}
      >
        <p class="font-semibold">We couldn’t fetch downloads.</p>
        <p class="text-[#07140f]/70 mt-1">{data.error}</p>
      </div>
    {:else}
      <!-- mac-only card 
      <div class="mt-6">
        <div
          class="rounded-3xl border border-[#e2dec7] bg-white/70 p-6 md:p-8 shadow-[0_32px_64px_-26px_rgba(7,20,15,.35)]"
          use:reveal={{ animation: "up", delay: 20 }}
        >
          <div
            class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <div class="flex items-center gap-2">
                <h2 class="font-semibold text-lg">macOS</h2>
                {#if data.preferredOs === "mac"}
                  <span
                    class="rounded-full bg-[#0f2b1f] text-[#f9f8f4] px-2 py-0.5 text-[10px] font-semibold"
                    >Suggested</span
                  >
                {/if}
              </div>
              <p class="mt-1 text-sm text-[#07140f]/70">
                Apple Silicon and Intel supported.
              </p>
              {#if data.ok}
                <p class="mt-1 text-xs text-[#07140f]/55">
                  Latest: {data.release.name} • {dateLabel(
                    data.release.publishedAt
                  )}
                </p>
              {/if}
            </div>
            <div class="flex flex-col sm:flex-row gap-2">
              {#each data.assets.mac as a}
                <a
                  href={a.url}
                  class="inline-flex items-center justify-center rounded-2xl border border-[#0f2b1f]/15 bg-white/70 px-5 py-3 text-sm font-medium hover:bg-white transition-colors"
                  >{a.name}{#if a.size}<span class="text-[#07140f]/50">
                      • {a.size}</span
                    >{/if}</a
                >
              {/each}
            </div>
          </div>
        </div>
      </div> -->
    {/if}
  </section>

  <Footer />
</div>

<style>
  .font-hero {
    font-feature-settings: "ss01" on;
  }
  :global(.logo-font) {
    text-transform: lowercase;
  }
</style>
