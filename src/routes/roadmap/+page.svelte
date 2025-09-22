<script lang="ts">
  import { reveal } from "$lib/actions/reveal";
  export let data:
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
      };

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
</script>

<svelte:head>
  <title>Roadmap — Nook Browser</title>
  <meta
    name="description"
    content="See what's shipping Now, Next, and Later."
  />
</svelte:head>

<div class="min-h-screen antialiased bg-[#f9f8f4] text-[#07140f]">
  <header class="max-w-6xl mx-auto px-6 pt-16">
    <div class="text-center">
      <h1
        class="text-[clamp(2rem,5.4vw,3.2rem)] leading-tight tracking-tight"
        use:reveal={{ animation: "up", duration: 650, distance: 10 }}
      >
        Roadmap
      </h1>
      <p
        class="mt-3 text-[clamp(0.95rem,2.1vw,1.15rem)] text-[#07140f]/70"
        use:reveal={{ animation: "up", delay: 90, distance: 8 }}
      >
        What we’re building <span class="font-semibold">now</span>,
        <span class="font-semibold">next</span>, and
        <span class="font-semibold">later</span> — straight from GitHub.
      </p>
    </div>

    {#if data.ok}
      {#if data.labels.length}
        <div
          class="mt-8 flex flex-wrap items-center justify-center gap-2"
          use:reveal={{ animation: "up", delay: 140, distance: 8 }}
        >
          {#each data.labels as l}
            <button
              class="px-3 py-1.5 rounded-full border border-[#0f2b1f]/15 bg-white/70 text-sm hover:bg-white transition-colors"
              class:!bg-[#0f2b1f]={activeLabels.has(l)}
              class:!text-[#f9f8f4]={activeLabels.has(l)}
              on:click={() => toggleLabel(l)}
            >
              {l}
            </button>
          {/each}
        </div>
      {/if}
    {/if}
  </header>

  <section class="max-w-6xl mx-auto px-6 mt-12">
    {#if !data.ok}
      <div
        class="rounded-2xl border border-[#e2dec7] bg-white/70 p-6 text-center"
        use:reveal={{ animation: "up" }}
      >
        <p class="font-semibold">Couldn’t load the roadmap.</p>
        <p class="text-[#07140f]/70 mt-1">{data.error}</p>
      </div>
    {:else}
      <div class="grid md:grid-cols-3 gap-5">
        <div class="space-y-3">
          <h2 class="font-semibold" use:reveal={{ animation: "up" }}>Now</h2>
          {#if data.buckets.now.length === 0}
            <p
              class="text-sm text-[#07140f]/60"
              use:reveal={{ animation: "up", delay: 60 }}
            >
              Nothing here yet.
            </p>
          {/if}
          {#each data.buckets.now as issue, i}
            {#if isVisible(issue)}
              <a
                href={issue.html_url}
                target="_blank"
                rel="noopener noreferrer"
                class="block rounded-2xl border border-[#e2dec7] bg-white/70 p-4 hover:bg-white transition-colors"
                use:reveal={{ animation: "up", delay: 40 * i }}
              >
                <div class="text-[15px] font-medium">{issue.title}</div>
                <div class="mt-1 text-xs text-[#07140f]/60">
                  #{issue.number}
                </div>
              </a>
            {/if}
          {/each}
        </div>

        <div class="space-y-3">
          <h2 class="font-semibold" use:reveal={{ animation: "up" }}>Next</h2>
          {#if data.buckets.next.length === 0}
            <p
              class="text-sm text-[#07140f]/60"
              use:reveal={{ animation: "up", delay: 60 }}
            >
              Nothing here yet.
            </p>
          {/if}
          {#each data.buckets.next as issue, i}
            {#if isVisible(issue)}
              <a
                href={issue.html_url}
                target="_blank"
                rel="noopener noreferrer"
                class="block rounded-2xl border border-[#e2dec7] bg-white/70 p-4 hover:bg-white transition-colors"
                use:reveal={{ animation: "up", delay: 40 * i }}
              >
                <div class="text-[15px] font-medium">{issue.title}</div>
                <div class="mt-1 text-xs text-[#07140f]/60">
                  #{issue.number}
                </div>
              </a>
            {/if}
          {/each}
        </div>

        <div class="space-y-3">
          <h2 class="font-semibold" use:reveal={{ animation: "up" }}>Later</h2>
          {#if data.buckets.later.length === 0}
            <p
              class="text-sm text-[#07140f]/60"
              use:reveal={{ animation: "up", delay: 60 }}
            >
              Nothing here yet.
            </p>
          {/if}
          {#each data.buckets.later as issue, i}
            {#if isVisible(issue)}
              <a
                href={issue.html_url}
                target="_blank"
                rel="noopener noreferrer"
                class="block rounded-2xl border border-[#e2dec7] bg-white/70 p-4 hover:bg-white transition-colors"
                use:reveal={{ animation: "up", delay: 40 * i }}
              >
                <div class="text-[15px] font-medium">{issue.title}</div>
                <div class="mt-1 text-xs text-[#07140f]/60">
                  #{issue.number}
                </div>
              </a>
            {/if}
          {/each}
        </div>
      </div>

      {#if data.buckets.uncategorized.length}
        <div class="mt-10">
          <h2 class="font-semibold" use:reveal={{ animation: "up" }}>
            Uncategorized
          </h2>
          <div class="mt-3 grid md:grid-cols-2 gap-3">
            {#each data.buckets.uncategorized as issue, i}
              {#if isVisible(issue)}
                <a
                  href={issue.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block rounded-2xl border border-[#e2dec7] bg-white/70 p-4 hover:bg-white transition-colors"
                  use:reveal={{ animation: "up", delay: 30 * i }}
                >
                  <div class="text-[15px] font-medium">{issue.title}</div>
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

  <footer class="max-w-6xl mx-auto px-6 mt-20 pb-12 text-sm text-[#07140f]/65">
    <div
      class="rounded-2xl border border-[#e2dec7] bg-white/70 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      use:reveal={{ animation: "up" }}
    >
      <div>
        <p class="font-semibold text-[#07140f]">Nook Browser</p>
        <p class="text-[#07140f]/65">
          Open-source • local-first • cozy by design
        </p>
      </div>
      <div class="flex items-center gap-5">
        <a class="hover:text-[#07140f]" href="/">Home</a>
        <a
          class="hover:text-[#07140f]"
          href="https://github.com/nook-browser"
          rel="noopener"
          target="_blank">GitHub</a
        >
        <a
          class="hover:text-[#07140f]"
          href="https://discord.gg/TjSybMAa"
          rel="noopener"
          target="_blank">Discord</a
        >
      </div>
    </div>
  </footer>
</div>
