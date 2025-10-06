<script lang="ts">
  import { reveal } from "$lib/actions/reveal";
  import Footer from "$lib/components/Footer.svelte";
  import Nav from "$lib/components/Nav.svelte";

  import { styleForTag, pickTag, TAG_PRIORITY } from "$lib/changelog/data";
  const { data } = $props<{ data: { entries: Array<any> } }>();
  type Entry = {
    title: string;
    summary?: string;
    tag?: string | string[];
    slug?: { current?: string };
    id?: string;
    publishedAt?: string;
    date?: string;
    version?: string;
  };

  let activeTag: string | null = null;
  let query = "";

  const capitalize = (s: string) =>
    s ? s.charAt(0).toUpperCase() + s.slice(1) : s;

  const filtered: Entry[] = (data.entries as Entry[])
    .filter((e: Entry) => {
      if (!activeTag) return true;
      const tags = Array.isArray(e.tag)
        ? e.tag
        : ([e.tag].filter(Boolean) as string[]);
      return tags.map((t) => t.toLowerCase()).includes(activeTag.toLowerCase());
    })
    .filter((e: Entry) => {
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        (e.title || "").toLowerCase().includes(q) ||
        (e.summary || "").toLowerCase().includes(q)
      );
    })
    .sort(
      (a: Entry, b: Entry) =>
        +new Date(b.publishedAt || b.date || 0) -
        +new Date(a.publishedAt || a.date || 0)
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
  const groups: Group[] = (() => {
    const map = new Map<string, Group>();
    for (const e of filtered) {
      const base = e.publishedAt || e.date || new Date().toISOString();
      const d = new Date(base as string);
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
  <Nav />

  <!-- HERO -->
  <section class="max-w-5xl mx-auto px-6 pt-24 md:pt-32">
    <h1
      class="text-[clamp(2.1rem,5.6vw,4rem)] leading-[1.06] tracking-tight font-hero"
      use:reveal={{ animation: "up", delay: 0, duration: 650, distance: 10 }}
    >
      What’s new in <span class="gradient-ink">Nook Browser.</span>
    </h1>
    <p
      class="mt-4 text-[clamp(1rem,2.1vw,1.2rem)] text-[#07140f]/70"
      use:reveal={{ animation: "up", delay: 90, distance: 10 }}
    >
      Stay up to date with the latest changes to your favorite browser.
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
                  {shortDay(
                    new Date(
                      (entry.publishedAt ||
                        entry.date ||
                        new Date().toISOString()) as string
                    )
                  )}
                </div>
                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-3 flex-wrap">
                    <h3
                      class="text-[15px] md:text-[16px] font-medium tracking-tight"
                    >
                      {entry.title}
                    </h3>
                    <div class="flex items-center gap-1.5">
                      {#if entry.version}
                        <span
                          class="rounded-full bg-[#0f2b1f] text-[#f9f8f4] px-2 py-0.5 text-[10px] font-semibold"
                        >
                          {entry.version}
                        </span>
                      {/if}
                      {#if pickTag([entry.tag as any])}
                        <span
                          class={"rounded-full px-2 py-0.5 text-[10px] font-semibold " +
                            styleForTag(pickTag([entry.tag as any]) as string)}
                          >{pickTag([entry.tag as any])}</span
                        >
                      {/if}
                    </div>
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
  /* Reserved for page-specific tweaks if needed */
</style>
