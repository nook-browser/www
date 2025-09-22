<script lang="ts">
  import { reveal } from "$lib/actions/reveal";
  import {
    pickTag,
    styleForTag,
    shortDay,
    monthLabel,
  } from "$lib/changelog/data";
  import { portableTextToHtml } from "$lib/sanity/portableText";
  export let data: { entry: any };
  const entry = data.entry;
  const dateObj = entry ? new Date(entry.publishedAt || entry.date) : null;
</script>

<svelte:head>
  <title>{entry ? `${entry.version} — ${entry.title}` : "Changelog"}</title>
  <meta
    name="description"
    content={entry ? entry.summary : "Changelog entry"}
  />
</svelte:head>

<div class="min-h-screen antialiased bg-[#f9f8f4] text-[#07140f]">
  <section class="max-w-3xl mx-auto px-6 pt-20 md:pt-28 pb-14">
    {#if !entry}
      <div
        class="rounded-2xl border border-[#e2dec7] bg-white/70 p-8 text-center"
      >
        Not found.
      </div>
    {:else}
      <div class="text-sm text-[#07140f]/60" use:reveal={{ animation: "up" }}>
        <a href="/whats-new" class="hover:text-[#07140f]">Changelog</a>
        · {dateObj ? monthLabel(dateObj) : ""}
      </div>
      <h1
        class="mt-2 text-[clamp(1.8rem,4.8vw,2.75rem)] font-semibold tracking-tight"
        use:reveal={{ animation: "up", delay: 60 }}
      >
        {entry.title}
      </h1>

      <div
        class="mt-3 flex items-center gap-3"
        use:reveal={{ animation: "up", delay: 90 }}
      >
        {#if dateObj}
          <time datetime={entry.publishedAt} class="text-sm text-[#07140f]/60"
            >{shortDay(dateObj)}</time
          >
        {/if}
        {#if entry.version}
          <span
            class="rounded-full bg-[#0f2b1f] text-[#f9f8f4] px-2 py-0.5 text-[11px] font-semibold"
            >{entry.version}</span
          >
        {/if}
        {#if pickTag([entry.tag])}
          <span
            class={"rounded-full px-2 py-0.5 text-[11px] font-semibold " +
              styleForTag(pickTag([entry.tag]) as string)}
            >{pickTag([entry.tag])}</span
          >
        {/if}
      </div>

      {#if entry.image?.asset?.url}
        <figure
          class="mt-6 overflow-hidden rounded-2xl border border-[#e2dec7] bg-white/70 shadow-[0_24px_48px_-32px_rgba(7,20,15,.35)]"
          use:reveal={{ animation: "up", delay: 110 }}
        >
          <img src={entry.image.asset.url} alt={entry.title} class="w-full" />
        </figure>
      {/if}

      {#if entry.summary}
        <p
          class="mt-6 text-[15px] md:text-[16px] text-[#07140f]/85"
          use:reveal={{ animation: "up", delay: 120 }}
        >
          {entry.summary}
        </p>
      {/if}

      <article
        class="changelog-body mt-6"
        use:reveal={{ animation: "up", delay: 140 }}
      >
        {@html portableTextToHtml(entry.body || [])}
      </article>

      {#if entry.links && entry.links.length}
        <div class="mt-8" use:reveal={{ animation: "up", delay: 160 }}>
          <h2 class="text-sm font-semibold tracking-wide text-[#07140f]/70">
            Related links
          </h2>
          <ul class="mt-2 space-y-1">
            {#each entry.links as href}
              <li>
                <a
                  {href}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm text-[#07140f]/80 hover:text-[#07140f]"
                  >{href}</a
                >
              </li>
            {/each}
          </ul>
        </div>
      {/if}

      <div
        class="mt-12 border-t border-[#e2dec7] pt-6 text-sm text-[#07140f]/60"
      >
        <a href="/whats-new" class="hover:text-[#07140f]">← Back to changelog</a
        >
      </div>
    {/if}
  </section>
</div>
