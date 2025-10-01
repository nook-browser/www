<script lang="ts">
  import Logo from "$lib/components/Logo.svelte";
  import { reveal } from "$lib/actions/reveal";
  import Footer from "$lib/components/Footer.svelte";

  import { styleForTag, pickTag, TAG_PRIORITY } from "$lib/changelog/data";
  export let data: { entries: Array<any> };
  type Entry = (typeof data.entries)[number];

  let activeTag: string | null = null;
  let query = "";

  const capitalize = (s: string) =>
    s ? s.charAt(0).toUpperCase() + s.slice(1) : s;

  $: filtered = data.entries
    .filter(
      (e) =>
        !activeTag ||
        (Array.isArray(e.tag) ? e.tag : [e.tag])
          .map((t: string) => t.toLowerCase())
          .includes(activeTag.toLowerCase())
    )
    .filter((e) => {
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        (e.title || "").toLowerCase().includes(q) ||
        (e.summary || "").toLowerCase().includes(q)
      );
    })
    .sort(
      (a, b) =>
        +new Date(b.publishedAt || b.date) - +new Date(a.publishedAt || a.date)
    );

  type Group = { key: string; label: string; items: Entry[] };
  function monthKey(d: Date) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  }
  function monthLabel(d: Date) {
    return d.toLocaleDateString(undefined, { month: "long", year: "numeric" });
  }
  function shortDay(d: Date) {
    const day = d.getDate().toString().padStart(2, "0");
    const mon = d.toLocaleDateString(undefined, { month: "short" });
    return `${mon} ${day}`;
  }
  $: groups = (() => {
    const map = new Map<string, Group>();
    for (const e of filtered) {
      const d = new Date(e.publishedAt || e.date);
      const key = monthKey(d);
      let g = map.get(key);
      if (!g) {
        g = { key, label: monthLabel(d), items: [] };
        map.set(key, g);
      }
      g.items.push(e);
    }
    return Array.from(map.values());
  })();
</script>

<svelte:head>
  <title>Nook Browser — Changelog</title>
  <meta
    name="description"
    content="What’s new in Nook. Calm, open, and community-led."
  />
</svelte:head>

<div class="min-h-screen antialiased bg-[#f9f8f4] text-[#07140f]">
  <!-- NAV -->
  <header class="max-w-6xl mx-auto px-6 pt-8">
    <nav class="flex items-center justify-between">
      <a href="/" class="flex items-center gap-3">
        <Logo className="w-10 h-10" />
        <span class="font-semibold text-xl logo-font">nook browser</span>
      </a>
      <div class="flex items-center gap-2">
        <a
          href="https://github.com/nook-browser"
          rel="noopener"
          class="hidden rounded-full border border-[#0f2b1f]/15 bg-white/70 px-5 py-2.5 text-sm font-medium
                   shadow-[0_8px_18px_-14px_rgba(7,20,15,.25)] hover:bg-white focus:outline-none
                   focus-visible:ring-2 focus-visible:ring-[#9cb57f] md:inline-flex items-center justify-center gap-1.5"
        >
          <svg
            class="h-4 w-auto cursor-pointer"
            viewBox="0 0 1024 1024"
            fill="#333"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
              transform="scale(64)"
            />
          </svg>
          GitHub
        </a>
        <button
          data-tally-open="n0XQp9"
          data-tally-width="520"
          data-tally-overlay="1"
          class="inline-flex items-center justify-center rounded-full bg-[#0f2b1f] px-5 py-2.5 text-sm font-semibold text-[#f9f8f4] shadow-[0_18px_30px_-18px_rgba(7,20,15,.45)] hover:-translate-y-0.5 transition"
        >
          Join Waitlist
        </button>
      </div>
    </nav>
  </header>

  <!-- HERO -->
  <section class="max-w-5xl mx-auto px-6 pt-24 md:pt-32">
    <h1
      class="text-[clamp(2.1rem,5.6vw,4rem)] leading-[1.06] tracking-tight"
      use:reveal={{ animation: "up", delay: 0, duration: 650, distance: 10 }}
    >
      What’s new <span
        class="text-[#9cb57f] instrument-serif-regular-italic gradient-ink"
        >in Nook.</span
      >
    </h1>
    <p
      class="mt-4 text-[clamp(1rem,2.1vw,1.2rem)] text-[#07140f]/70"
      use:reveal={{ animation: "up", delay: 90, distance: 10 }}
    >
      Stay up to date with the latest changes to Nook Browser.
    </p>

    <!-- Controls -->
    <div
      class="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
      use:reveal={{ animation: "up", delay: 140, distance: 10 }}
    >
      <div class="flex flex-wrap gap-2">
        {#if !activeTag}
          <button
            on:click={() => (activeTag = null)}
            class="cursor-pointer rounded-full px-4 py-2 text-sm text-[#f9f8f4] font-medium border border-[#0f2b1f]/15 bg-[#0f2b1f] transition hover:-translate-y-0.5"
            aria-label="Clear tag filter"
          >
            All
          </button>
        {:else}
          <button
            on:click={() => (activeTag = null)}
            class="cursor-pointer rounded-full px-4 py-2 text-sm font-medium ring-1 ring-[#0f2b1f]/10 shadow-[0_10px_24px_-18px_rgba(7,20,15,.2)] transition hover:-translate-y-0.5 bg-white"
            aria-label="Clear tag filter"
            style={`background: "#0f2b1f" : "rgba(255,255,255,.7)"};border:1px solid rgba(15,43,31,.12)`}
          >
            All
          </button>
        {/if}
        {#each TAG_PRIORITY as t}
          <!-- cursor-pointer rounded-full px-4 py-2 text-sm font-medium ring-1 ring-[#0f2b1f]/10 shadow-[0_10px_24px_-18px_rgba(7,20,15,.2)] transition hover:-translate-y-0.5 bg-[#0f2b1f] text-[#f9f8f4] -->
          <button
            on:click={() => (activeTag = activeTag === t ? null : t)}
            class="cursor-pointer rounded-full px-4 py-2 text-sm font-medium ring-1 ring-[#0f2b1f]/10 shadow-[0_10px_24px_-18px_rgba(7,20,15,.2)] transition hover:-translate-y-0.5"
            class:bg-[#0f2b1f]={activeTag === t}
            class:text-[#f9f8f4]={activeTag === t}
            class:border={activeTag !== t}
            style={`background:${activeTag === t ? "#0f2b1f" : "rgba(255,255,255,.7)"};border:1px solid rgba(15,43,31,.12)`}
            aria-pressed={activeTag === t}
          >
            <!-- cursor-pointer rounded-full px-4 py-2 text-sm font-medium ring-1 ring-[#0f2b1f]/10 shadow-[0_10px_24px_-18px_rgba(7,20,15,.2)] transition hover:-translate-y-0.5 bg-[#0f2b1f] text-[#f9f8f4] -->
            {t}
          </button>
        {/each}
      </div>
    </div>
  </section>

  <!-- LIST -->
  <section class="max-w-5xl mx-auto px-6 mt-12 md:mt-16">
    {#each groups as g, gi}
      <div class="mb-8" use:reveal={{ animation: "up", delay: gi * 40 }}>
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">{g.label}</h2>
        </div>
        <ol
          class="mt-4 divide-y divide-[#e2dec7] rounded-2xl border border-[#e2dec7] bg-white/70 backdrop-blur-sm"
        >
          {#each g.items as entry, i}
            <li class="group">
              <a
                href={`/whats-new/${entry.slug?.current || entry.id}`}
                class="flex items-start gap-4 p-5 md:p-6 transition block"
              >
                <div class="w-24 shrink-0 text-xs text-[#07140f]/60">
                  {shortDay(new Date(entry.publishedAt || entry.date))}
                </div>
                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-3 flex-wrap">
                    <h3
                      class="text-[15px] md:text-[16px] font-medium tracking-tight"
                    >
                      {entry.title}
                    </h3>
                    {#if entry.version}
                      <span
                        class="rounded-full bg-[#0f2b1f] text-[#f9f8f4] px-2 py-0.5 text-[10px] font-semibold"
                      >
                        {entry.version}
                      </span>
                    {/if}
                    {#if pickTag([entry.tag])}
                      <span
                        class={"rounded-full px-2 py-0.5 text-[10px] font-semibold " +
                          styleForTag(pickTag([entry.tag]) as string)}
                        >{pickTag([entry.tag])}</span
                      >
                    {/if}
                  </div>
                  <p class="mt-1 text-sm text-[#07140f]/70 line-clamp-2">
                    {entry.summary}
                  </p>
                </div>
              </a>
            </li>
          {/each}
        </ol>
      </div>
    {/each}

    {#if groups.length === 0}
      <div
        class="rounded-2xl border border-[#e2dec7] bg-white/70 p-10 text-center text-[#07140f]/70"
      >
        Nothing here yet. Try a different tag.
      </div>
    {/if}
  </section>

  <!-- SUBSCRIBE / CTA -->
  <section class="max-w-5xl mx-auto px-6 mt-16 md:mt-20">
    <div
      class="rounded-3xl border border-[#e2dec7] bg-[#0f2b1f] text-[#f9f8f4] p-8 md:p-10 shadow-[0_32px_64px_-26px_rgba(7,20,15,.55)]"
      use:reveal={{ animation: "up", delay: 0 }}
    >
      <div
        class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div>
          <h3 class="text-xl font-bold">Get calm updates in your inbox</h3>
          <p class="mt-1 text-[#f9f8f4]/75">Monthly highlights, no spam.</p>
        </div>
        <div class="flex w-full md:w-auto items-center gap-3">
          <button
            data-tally-open="n0XQp9"
            data-tally-width="520"
            data-tally-overlay="1"
            class="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-[#FDFDFC] text-[#07140f] px-5 py-3 text-sm font-medium shadow-[0_18px_30px_-18px_rgba(253,253,252,.45)] hover:-translate-y-0.5 transition"
          >
            Subscribe & Join Waitlist
          </button>
          <a
            href="https://x.com/browsewithnook"
            rel="noopener"
            class="inline-flex items-center justify-center rounded-2xl border border-[#f9f8f4]/25 px-5 py-3 text-sm font-medium hover:bg-white/10"
          >
            Follow us on X
          </a>
        </div>
      </div>
    </div>
  </section>

  <Footer />
</div>

<style>
  /* Minimal prose tune-up to keep it cozy */
  .prose :where(ul):not(:where(.not-prose, .not-prose *)) {
    margin: 0.25rem 0 0 0;
    padding-left: 1rem;
  }
  .prose :where(li)::marker {
    font-size: 0.8em;
  }
</style>
