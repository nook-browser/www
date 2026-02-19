<script lang="ts">
  type Entry = {
    id: number | string;
    title: string;
    slug: string;
    version?: string;
    tag?: string;
    publishedAt?: string;
    date?: string;
    summary?: string;
  };

  type Group = { label: string; items: Entry[] };

  export let groups: Group[] = [];

  const shortDay = (d: Date) =>
    d.toLocaleDateString(undefined, { month: "short", day: "numeric" });

  function pickTag(tags: (string | undefined | null)[]): string | undefined {
    const t = tags.find(Boolean);
    return t ?? undefined;
  }

  const badgeStyle = "bg-[#efe9d0] text-[#07140f]/50 border border-[#e2dec7]";

  function getOffset(gi: number): number {
    let o = 0;
    for (let i = 0; i < gi; i++) {
      o += groups[i].items.length + 1;
    }
    return o;
  }
</script>

{#each groups as g, gi}
  <div class="mb-10">
    <h2
      class="text-sm font-medium text-[#9b9688] mb-4 animate-blur-in"
      style="--stagger: {getOffset(gi)}"
    >
      {g.label}
    </h2>
    <ol
      class="divide-y divide-[#e2dec7] rounded-2xl border border-[#e2dec7] bg-white/50 backdrop-blur-sm shadow-[0px_1px_3px_0px_rgba(0,0,0,0.03),inset_0px_1px_0px_0px_rgba(255,255,255,0.5)] overflow-hidden animate-blur-in"
      style="--stagger: {getOffset(gi) + 1}"
    >
      {#each g.items as entry, ei}
        <li
          class="animate-blur-in"
          style="--stagger: {getOffset(gi) + 1 + ei}"
        >
          <a
            href={`/whats-new/${entry.slug || entry.id}`}
            class="changelog-row flex items-start gap-4 p-5 md:p-6 transition-colors duration-150 block hover:bg-white/60"
          >
            <div class="w-24 shrink-0 text-xs text-[#07140f]/50 pt-0.5">
              {shortDay(
                new Date(
                  (entry.publishedAt ||
                    entry.date ||
                    new Date().toISOString())
                )
              )}
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-3 flex-wrap">
                <h3
                  class="text-[15px] md:text-[16px] font-medium tracking-tight text-[#373230]"
                >
                  {entry.title}
                </h3>
                <div class="flex items-center gap-1.5">
                  {#if entry.version}
                    <span
                      class={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${badgeStyle}`}
                      >{entry.version}</span
                    >
                  {/if}
                  {#if pickTag([entry.tag])}
                    <span
                      class={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${badgeStyle}`}
                      >{pickTag([entry.tag])}</span
                    >
                  {/if}
                </div>
              </div>
              {#if entry.summary}
                <p class="mt-1.5 text-sm text-[#07140f]/60 line-clamp-2 leading-relaxed">
                  {entry.summary}
                </p>
              {/if}
            </div>
          </a>
        </li>
      {/each}
    </ol>
  </div>
{/each}

{#if groups.length === 0}
  <div
    class="rounded-2xl border border-[#e2dec7] bg-white/70 p-10 text-center text-[#07140f]/70 animate-blur-in"
    style="--stagger: 0"
  >
    Nothing here yet. Try a different tag.
  </div>
{/if}
