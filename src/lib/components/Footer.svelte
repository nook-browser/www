<script lang="ts">
  export let className = "";
</script>

<footer
  class={"mt-24 text-sm text-[#07140f]/70 " + className}
  aria-label="Site footer"
>
  <div class="max-w-6xl mx-auto px-6 pb-32">
    <div
      class="rounded-3xl border border-[#e2dec7] bg-white/70 p-8 md:p-10 shadow-[0_28px_60px_-40px_rgba(7,20,15,.35)] backdrop-blur-sm"
    >
      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p class="font-semibold text-[#07140f]">Nook Browser</p>
          <p class="mt-1 text-[#07140f]/65">
            Open-source • local-first • cozy by design
          </p>
        </div>

        <div>
          <p class="text-[11px] uppercase tracking-[0.08em] text-[#07140f]/55">
            Product
          </p>
          <ul class="mt-3 space-y-2">
            <li>
              <a class="hover:text-[#07140f]" href="/whats-new">What's New</a>
            </li>
            <li><a class="hover:text-[#07140f]" href="/roadmap">Roadmap</a></li>
            <li><a class="hover:text-[#07140f]" href="/support">Support</a></li>
          </ul>
        </div>

        <div>
          <p class="text-[11px] uppercase tracking-[0.08em] text-[#07140f]/55">
            Project
          </p>
          <ul class="mt-3 space-y-2">
            <li><a class="hover:text-[#07140f]" href="/team">Team</a></li>
            <li>
              <a
                class="hover:text-[#07140f]"
                href="https://github.com/nook-browser"
                rel="noopener">GitHub</a
              >
            </li>
            <li>
              <a
                class="hover:text-[#07140f]"
                href="https://opencollective.com/nook-browser"
                rel="noopener"
                target="_blank">Fund</a
              >
            </li>
          </ul>
        </div>

        <div>
          <p class="text-[11px] uppercase tracking-[0.08em] text-[#07140f]/55">
            Community
          </p>
          <ul class="mt-3 space-y-2">
            <li>
              <a
                class="hover:text-[#07140f]"
                href="https://discord.gg/2gX69DuWwX"
                rel="noopener">Discord</a
              >
            </li>
            <li>
              <a
                class="hover:text-[#07140f]"
                href="https://x.com/browsewithnook"
                rel="noopener">X (FKA Twitter)</a
              >
            </li>
            <li>
              <a
                class="hover:text-[#07140f]"
                href="https://www.instagram.com/browsewithnook/"
                rel="noopener">Instagram</a
              >
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-8 pt-6 border-t border-[#e2dec7] flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <p>© {new Date().getFullYear()} Nook Browser</p>
        <div class="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            class="hover:text-[#07140f]"
            href="https://github.com/nook-browser"
            rel="noopener">Learn more</a
          >
          <a
            class="hover:text-[#07140f] cursor-pointer"
            data-tally-open="n0XQp9"
            data-tally-width="520"
            data-tally-overlay="1">Join the waitlist</a
          >
          <a class="hover:text-[#07140f]" href="/support" rel="noopener"
            >Report a bug</a
          >
          <a
            class="hover:text-[#07140f]"
            href="mailto:support@browsewithnook.com"
            rel="noopener">Email us</a
          >

          <!-- <a
            href="https://www.producthunt.com/products/nook-an-open-source-arc-alternative?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-nook&#0045;an&#0045;open&#0045;source&#0045;arc&#0045;alternative"
            target="_blank"
            ><img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1022726&theme=light&t=1759533472842"
              alt="Nook&#0032;&#0045;&#0032;An&#0032;Open&#0032;Source&#0032;Arc&#0032;Alternative - Fast&#0044;&#0032;focused&#0044;&#0032;and&#0032;open&#0032;—&#0032;a&#0032;new&#0032;WebKit&#0032;browser&#0032;for&#0032;Mac | Product Hunt"
              style="width: 200px; height: 40px;"
              width="200"
              height="40"
            /></a
          >
          -->
        </div>
        <a
          href="https://www.producthunt.com/products/nook-an-open-source-arc-alternative?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-nook&#0045;an&#0045;open&#0045;source&#0045;arc&#0045;alternative"
          target="_blank"
          ><img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1022726&theme=light&t=1759533472842"
            alt="Nook&#0032;&#0045;&#0032;An&#0032;Open&#0032;Source&#0032;Arc&#0032;Alternative - Fast&#0044;&#0032;focused&#0044;&#0032;and&#0032;open&#0032;—&#0032;a&#0032;new&#0032;WebKit&#0032;browser&#0032;for&#0032;Mac | Product Hunt"
            style="width: 200px; height: 40px;"
            width="200"
            height="40"
          /></a
        >
      </div>
    </div>
  </div>
</footer>
