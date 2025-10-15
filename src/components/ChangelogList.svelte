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

  function styleForTag(tag: string): string {
    const map: Record<string, string> = {
      New: "bg-[#171717] text-[#f9f8f4]",
      Fix: "bg-[#17202a] text-[#f9f8f4]",
      Improved: "bg-[#efe9d0] text-[#07140f] border border-[#e2dec7]",
    };
    return map[tag] ?? "bg-[#efe9d0] text-[#07140f] border border-[#e2dec7]";
  }
</script>

{#each groups as g, gi}
  <div class="mb-8">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold">{g.label}</h2>
    </div>
    <ol
      class="mt-4 divide-y divide-[#e2dec7] rounded-2xl border border-[#e2dec7] bg-white/41 backdrop-blur-sm"
    >
      {#each g.items as entry}
        <li class="group">
          <a
            href={`/whats-new/${entry.slug || entry.id}`}
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
                      class="rounded-full bg-[#405E3A] text-[#f9f8f4] px-2 py-0.5 text-[10px] font-semibold"
                      >{entry.version}</span
                    >
                  {/if}
                  {#if pickTag([entry.tag])}
                    <span
                      class={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${styleForTag(pickTag([entry.tag]) as string)}`}
                      >{pickTag([entry.tag])}</span
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
