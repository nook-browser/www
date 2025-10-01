<script lang="ts">
  import Logo from "$lib/components/Logo.svelte";
  import { reveal } from "$lib/actions/reveal";
  import Footer from "$lib/components/Footer.svelte";
  export let data: {
    team: Array<{
      login: string;
      name?: string;
      role?: string;
      avatar_url: string;
      html_url: string;
      email?: string;
    }>;
    contributors: Array<{
      login: string;
      avatar_url: string;
      html_url: string;
    }>;
  };

  const team = data.team || [];
  const contributors = data.contributors || [];
  function getInitials(name?: string, login?: string) {
    const base = (name || login || "").trim();
    if (!base) return "?";
    const parts = base.split(/\s+/).slice(0, 2);
    return parts.map((p) => p[0]?.toUpperCase() || "").join("") || "?";
  }
</script>

<svelte:head>
  <title>Meet the Team — Nook Browser</title>
  <meta
    name="description"
    content="The people building a calmer, open browser."
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
          class="hidden rounded-full border border-[#0f2b1f]/15 bg-white/70 px-5 py-2.5 text-sm font-medium shadow-[0_8px_18px_-14px_rgba(7,20,15,.25)] hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9cb57f] md:inline-flex items-center justify-center gap-1.5"
        >
          <svg
            class="h-4 w-auto"
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
  <section class="max-w-6xl mx-auto px-6 pt-20 md:pt-28">
    <h1
      class="text-[clamp(2.1rem,5.6vw,3.6rem)] leading-[1.06] tracking-tight"
      use:reveal={{ animation: "up" }}
    >
      Meet our <span class="gradient-ink instrument-serif-regular-italic"
        >team</span
      >.
    </h1>
    <p
      class="mt-3 text-[clamp(0.95rem,2.1vw,1.15rem)] text-[#07140f]/70"
      use:reveal={{ animation: "up", delay: 80 }}
    >
      Builders, designers, and contributors crafting Nook Browser.
    </p>
  </section>

  <!-- CORE TEAM GRID -->
  {#if team.length}
    <section class="max-w-6xl mx-auto px-6 mt-10">
      <h2 class="sr-only">Core team</h2>
      <ul
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        {#each team as m, i}
          <li
            class="group rounded-2xl border border-[#e2dec7] bg-white/70 p-4 shadow-[0_18px_36px_-30px_rgba(7,20,15,.35)] transition will-change-transform"
            use:reveal={{ animation: "up", delay: 24 * i }}
          >
            <a href={m.html_url} target="_blank" rel="noopener" class="block">
              {#if m.avatar_url}
                <img
                  src={m.avatar_url}
                  alt={m.name || m.login}
                  class="w-full aspect-square object-cover rounded-lg"
                />
              {:else}
                <div
                  class="w-full aspect-square rounded-xl bg-[#e2dec7] text-[#07140f]/80 flex items-center justify-center"
                >
                  <span class="text-lg font-semibold"
                    >{getInitials(m.name, m.login)}</span
                  >
                </div>
              {/if}
              <div class="mt-3 flex items-center justify-between">
                <div class="min-w-0">
                  <p class="text-[15px] font-medium truncate">
                    {m.name || m.login}
                  </p>
                  <p class="text-xs text-[#07140f]/60 truncate">
                    {m.role || `@${m.login}`}
                  </p>
                  {#if m.email}
                    <span class="block text-xs text-[#07140f]/40 truncate mt-2"
                      >{m.email}</span
                    >
                  {/if}
                </div>
                <svg
                  class="h-4 w-4 text-[#07140f]/50 group-hover:text-[#07140f] transition"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  ><path
                    d="M7 17L17 7M9 7H17V15"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  /></svg
                >
              </div>
            </a>
          </li>
        {/each}
      </ul>
    </section>
  {/if}

  <!-- CONTRIBUTORS GRID -->
  {#if contributors.length}
    <section class="max-w-6xl mx-auto px-6 mt-12">
      <div
        class="flex items-center justify-between"
        use:reveal={{ animation: "up" }}
      >
        <h2 class="text-lg font-semibold">Contributors</h2>
        <a
          href="https://github.com/nook-browser"
          rel="noopener"
          class="text-sm rounded-full border border-[#0f2b1f]/15 bg-white/70 px-3 py-1 hover:bg-white"
          >Become a contributor</a
        >
      </div>
      <ul
        class="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3"
      >
        {#each contributors as m, i}
          <li
            class="group rounded-xl border border-[#e2dec7] bg-white/70 p-3 transition will-change-transform"
            use:reveal={{ animation: "up", delay: 16 * i }}
          >
            <a
              href={m.html_url}
              target="_blank"
              rel="noopener"
              class="block text-center"
            >
              <img
                src={m.avatar_url}
                alt={m.login}
                class="w-full aspect-square object-cover rounded-lg"
              />
              <p class="mt-2 text-xs text-[#07140f]/80 truncate">{m.login}</p>
            </a>
          </li>
        {/each}
      </ul>
    </section>
  {/if}

  <!-- CTA STRIP -->
  <section class="max-w-6xl mx-auto px-6 mt-16">
    <div
      class="rounded-2xl border border-[#e2dec7] bg-[#0f2b1f] text-[#f9f8f4] p-6 md:p-8 shadow-[0_32px_64px_-26px_rgba(7,20,15,.55)]"
      use:reveal={{ animation: "up" }}
    >
      <div
        class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div>
          <h3 class="text-lg font-semibold">Want to help build Nook?</h3>
          <p class="mt-1 text-[#f9f8f4]/75">
            Open issues, PRs, or say hi in Discord.
          </p>
        </div>
        <div class="flex items-center gap-3">
          <a
            href="https://github.com/nook-browser"
            rel="noopener"
            class="inline-flex items-center justify-center rounded-2xl bg-[#FDFDFC] text-[#07140f] px-5 py-2 text-sm font-medium shadow-[0_18px_30px_-18px_rgba(253,253,252,.45)] hover:-translate-y-0.5 transition"
            >GitHub</a
          >
          <a
            href="https://discord.gg/2gX69DuWwX"
            rel="noopener"
            class="inline-flex items-center justify-center rounded-2xl border border-[#f9f8f4]/30 px-5 py-2 text-sm font-medium hover:bg-white/10"
            >Discord</a
          >
        </div>
      </div>
    </div>
  </section>

  <Footer />
</div>
