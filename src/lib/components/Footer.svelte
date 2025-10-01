<script lang="ts">
  export let className = "";
</script>

<footer
  class={"max-w-6xl mx-auto px-6 mt-24 pb-12 text-sm text-[#07140f]/65 " +
    className}
>
  <div
    class="rounded-2xl border border-[#e2dec7] bg-white/70 p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
  >
    <div>
      <p class="font-semibold text-[#07140f]">Nook Browser</p>
      <p class="text-[#07140f]/65">
        Open-source • local-first • cozy by design
      </p>
    </div>
    <nav class="flex flex-wrap items-center gap-x-5 gap-y-2">
      <a class="hover:text-[#07140f]" href="/whats-new">What's New</a>
      <a class="hover:text-[#07140f]" href="/roadmap">Roadmap</a>
      <a class="hover:text-[#07140f]" href="/team">Team</a>
      <a class="hover:text-[#07140f]" href="/support">Support</a>
      <a
        class="hover:text-[#07140f]"
        href="https://github.com/nook-browser"
        rel="noopener">GitHub</a
      >
      <a
        class="hover:text-[#07140f]"
        href="https://discord.gg/2gX69DuWwX"
        rel="noopener">Discord</a
      >
      <a
        class="hover:text-[#07140f]"
        href="https://x.com/browsewithnook"
        rel="noopener">X</a
      >
      <a
        class="hover:text-[#07140f]"
        href="https://buymeacoffee.com/nookbrowser"
        rel="noopener"
        target="_blank">Fund</a
      >
    </nav>
  </div>
  <p class="mt-4 text-center">© {new Date().getFullYear()} Nook Browser</p>
</footer>
