<script lang="ts">
  import { reveal } from "$lib/actions/reveal";
  import Footer from "$lib/components/Footer.svelte";
  import Nav from "$lib/components/Nav.svelte";
  const { data } = $props<
    | {
        ok: true;
        buckets: {
          now: any[];
          next: any[];
          later: any[];
          uncategorized: any[];
        };
        labels: string[];
      }
    | {
        ok: false;
        status: number;
        error: string;
        details?: string;
      }
  >();

  let activeLabels = new Set<string>();

  function toggleLabel(label: string) {
    if (activeLabels.has(label)) {
      activeLabels.delete(label);
    } else {
      activeLabels.add(label);
    }
    // reassign to trigger update
    activeLabels = new Set(activeLabels);
  }

  function isVisible(issue: any) {
    if (activeLabels.size === 0) return true;
    const labels = (issue.labels || [])
      .map((l: any) => (typeof l === "string" ? l : l.name))
      .filter(Boolean)
      .map((n: string) => n.toLowerCase());
    for (const l of activeLabels) {
      if (labels.includes(l)) return true;
    }
    return false;
  }

  function relativeTimeFrom(dateStr?: string): string {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const diff = Date.now() - d.getTime();
    const s = Math.round(diff / 1000);
    const m = Math.round(s / 60);
    const h = Math.round(m / 60);
    const dys = Math.round(h / 24);
    if (dys >= 1) return `${dys}d ago`;
    if (h >= 1) return `${h}h ago`;
    if (m >= 1) return `${m}m ago`;
    return "now";
  }

  let sortMode: "recent" | "number" = "recent";
  function getSorted(list: any[]) {
    const copy = [...(list || [])];
    if (sortMode === "recent") {
      return copy.sort(
        (a, b) =>
          new Date(b.updated_at || b.created_at || 0).getTime() -
          new Date(a.updated_at || a.created_at || 0).getTime()
      );
    }
    return copy.sort((a, b) => (b.number || 0) - (a.number || 0));
  }
</script>

<svelte:head>
  <title>Roadmap — Nook Browser</title>
  <meta
    name="description"
    content="See what's shipping Now, Next, and Later."
  />
</svelte:head>

<div class="min-h-screen antialiased bg-[#f9f8f4] text-[#07140f]">
  <!-- NAV -->
  <Nav />

  <!-- HERO -->
  <section class="max-w-6xl mx-auto px-6 pt-24 md:pt-32">
    <h1
      class="text-[clamp(2.1rem,5.6vw,3.4rem)] leading-[1.06] tracking-tight font-hero"
      use:reveal={{ animation: "up", duration: 650, distance: 10 }}
    >
      What's next in our <span class="gradient-ink">roadmap</span>.
    </h1>
    <p
      class="mt-3 text-[clamp(1rem,2.1vw,1.2rem)] text-[#07140f]/70"
      use:reveal={{ animation: "up", delay: 90, distance: 8 }}
    >
      What we’re building now, next, and later
    </p>
  </section>

  <section class="max-w-6xl mx-auto px-6 mt-8">
    {#if !data.ok}
      <div
        class="rounded-2xl border border-[#e2dec7] bg-white/70 p-6 text-center"
        use:reveal={{ animation: "up" }}
      >
        <p class="font-semibold">Couldn’t load the roadmap.</p>
        <p class="text-[#07140f]/70 mt-1">{data.error}</p>
      </div>
    {:else}
      <!-- <div
        class="flex items-center justify-center gap-3 text-xs text-[#07140f]/70"
        use:reveal={{ animation: "up" }}
      >
        <a
          href="#now"
          class="inline-flex items-center gap-1 rounded-full border border-[#0f2b1f]/15 bg-white/70 px-3 py-1 hover:bg-white transition"
          >Now: {data.buckets.now.length}</a
        >
        <a
          href="#next"
          class="inline-flex items-center gap-1 rounded-full border border-[#0f2b1f]/15 bg-white/70 px-3 py-1 hover:bg-white transition"
          >Next: {data.buckets.next.length}</a
        >
        <a
          href="#later"
          class="inline-flex items-center gap-1 rounded-full border border-[#0f2b1f]/15 bg-white/70 px-3 py-1 hover:bg-white transition"
          >Later: {data.buckets.later.length}</a
        >
      </div>
      <div class="mt-3 flex items-center justify-center gap-2 text-xs">
        <button
          class="px-3 py-1.5 rounded-full border border-[#0f2b1f]/15 bg-white/70 hover:bg-white transition-colors"
          class:!bg-[#0f2b1f]={sortMode === "recent"}
          class:!text-[#f9f8f4]={sortMode === "recent"}
          on:click={() => (sortMode = "recent")}
          aria-pressed={sortMode === "recent"}
        >
          Sort: Recent
        </button>
        <button
          class="px-3 py-1.5 rounded-full border border-[#0f2b1f]/15 bg-white/70 hover:bg-white transition-colors"
          class:!bg-[#0f2b1f]={sortMode === "number"}
          class:!text-[#f9f8f4]={sortMode === "number"}
          on:click={() => (sortMode = "number")}
          aria-pressed={sortMode === "number"}
        >
          Sort: Number
        </button>
      </div> -->

      <!-- <div class="mt-6 grid md:grid-cols-3 gap-5">
        <div class="space-y-3">
          <h2
            id="now"
            class="sticky top-0 z-10 -mx-1 px-1 py-2 bg-[#f9f8f4]/85 backdrop-blur font-semibold"
            use:reveal={{ animation: "up" }}
          >
            Now
          </h2>
          <div
            class="rounded-2xl bg-white/60 border border-[#e2dec7] p-3 space-y-3"
          >
            {#if data.buckets.now.length === 0}
              <p
                class="text-sm text-[#07140f]/60"
                use:reveal={{ animation: "up", delay: 60 }}
              >
                Nothing here yet.
              </p>
            {/if}
            {#each getSorted(data.buckets.now) as issue, i}
              {#if isVisible(issue)}
                <a
                  href={issue.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block rounded-2xl border border-[#e2dec7] bg-white/70 p-4 hover:bg-white transition-colors shadow-[0_18px_36px_-30px_rgba(7,20,15,.35)] transition-transform"
                  use:reveal={{ animation: "up", delay: 40 * i }}
                >
                  <div class="text-[15px] font-medium">{issue.title}</div>
                  <div
                    class="mt-1 flex items-center justify-between text-xs text-[#07140f]/60"
                  >
                    <span>#{issue.number}</span>
                    <span>{relativeTimeFrom(issue.updated_at)}</span>
                  </div>
                  {#if issue.labels && issue.labels.length}
                    <div class="mt-2 flex flex-wrap gap-1.5">
                      {#each issue.labels.slice(0, 2) as lb}
                        <span
                          class="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold bg-white ring-1 ring-[#0f2b1f]/10 text-[#07140f]"
                          >{typeof lb === "string" ? lb : lb.name}</span
                        >
                      {/each}
                    </div>
                  {/if}
                </a>
              {/if}
            {/each}
          </div>
        </div>

        <!-- <div class="space-y-3">
          <h2
            id="next"
            class="sticky top-0 z-10 -mx-1 px-1 py-2 bg-[#f9f8f4]/85 backdrop-blur font-semibold"
            use:reveal={{ animation: "up" }}
          >
            Next
          </h2>
          <div
            class="rounded-2xl bg-white/60 border border-[#e2dec7] p-3 space-y-3"
          >
            {#if data.buckets.next.length === 0}
              <p
                class="text-sm text-[#07140f]/60"
                use:reveal={{ animation: "up", delay: 60 }}
              >
                Nothing here yet.
              </p>
            {/if}
            {#each getSorted(data.buckets.next) as issue, i}
              {#if isVisible(issue)}
                <a
                  href={issue.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block rounded-2xl border border-[#e2dec7] bg-white/70 p-4 hover:bg-white transition-colors shadow-[0_18px_36px_-30px_rgba(7,20,15,.35)] transition-transform"
                  use:reveal={{ animation: "up", delay: 40 * i }}
                >
                  <div class="text-[15px] font-medium">{issue.title}</div>
                  <div
                    class="mt-1 flex items-center justify-between text-xs text-[#07140f]/60"
                  >
                    <span>#{issue.number}</span>
                    <span>{relativeTimeFrom(issue.updated_at)}</span>
                  </div>
                  {#if issue.labels && issue.labels.length}
                    <div class="mt-2 flex flex-wrap gap-1.5">
                      {#each issue.labels.slice(0, 2) as lb}
                        <span
                          class="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold bg-white ring-1 ring-[#0f2b1f]/10 text-[#07140f]"
                          >{typeof lb === "string" ? lb : lb.name}</span
                        >
                      {/each}
                    </div>
                  {/if}
                </a>
              {/if}
            {/each}
          </div>
        </div> -->

      <!-- <div class="space-y-3">
          <h2
            id="later"
            class="sticky top-0 z-10 -mx-1 px-1 py-2 bg-[#f9f8f4]/85 backdrop-blur font-semibold"
            use:reveal={{ animation: "up" }}
          >
            Later
          </h2>
          <div
            class="rounded-2xl bg-white/60 border border-[#e2dec7] p-3 space-y-3"
          >
            {#if data.buckets.later.length === 0}
              <p
                class="text-sm text-[#07140f]/60"
                use:reveal={{ animation: "up", delay: 60 }}
              >
                Nothing here yet.
              </p>
            {/if}
            {#each getSorted(data.buckets.later) as issue, i}
              {#if isVisible(issue)}
                <a
                  href={issue.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block rounded-2xl border border-[#e2dec7] bg-white/70 p-4 hover:bg-white transition-colors shadow-[0_18px_36px_-30px_rgba(7,20,15,.35)] transition-transform"
                  use:reveal={{ animation: "up", delay: 40 * i }}
                >
                  <div class="text-[15px] font-medium">{issue.title}</div>
                  <div
                    class="mt-1 flex items-center justify-between text-xs text-[#07140f]/60"
                  >
                    <span>#{issue.number}</span>
                    <span>{relativeTimeFrom(issue.updated_at)}</span>
                  </div>
                  {#if issue.labels && issue.labels.length}
                    <div class="mt-2 flex flex-wrap gap-1.5">
                      {#each issue.labels.slice(0, 2) as lb}
                        <span
                          class="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold bg-white ring-1 ring-[#0f2b1f]/10 text-[#07140f]"
                          >{typeof lb === "string" ? lb : lb.name}</span
                        >
                      {/each}
                    </div>
                  {/if}
                </a>
              {/if}
            {/each}
          </div>
        </div>
      </div> -->

      {#if data.buckets.uncategorized.length}
        <div class="mt-10">
          <h2
            class="font-semibold font-hero text-lg"
            use:reveal={{ animation: "up" }}
          >
            <!-- Uncategorized -->
            All
          </h2>
          <div class="mt-3 grid md:grid-cols-2 gap-4">
            {#each data.buckets.uncategorized as issue, i}
              {#if isVisible(issue)}
                <a
                  href={issue.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block rounded-2xl border border-[#e2dec7] bg-white/70 p-4 hover:bg-white transition-colors shadow-[0_18px_36px_-30px_rgba(7,20,15,.35)] transition-transform"
                  use:reveal={{ animation: "up", delay: 30 * i }}
                >
                  <div class="text-[15px] md:text-[16px] font-medium">
                    {issue.title}
                  </div>
                  <div class="mt-1 text-xs text-[#07140f]/60">
                    #{issue.number}
                  </div>
                </a>
              {/if}
            {/each}
          </div>
        </div>
      {/if}
    {/if}
  </section>

  <Footer />
</div>
