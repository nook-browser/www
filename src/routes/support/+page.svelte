<script>
  let dismissed = $state(false);

  function dismissSupportBanner() {
    dismissed = true;
  }
</script>

<svelte:head>
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
  />
  <title>Nook Browser | Support</title>
  <script async src="https://tally.so/widgets/embed.js"></script>
</svelte:head>

{#if !dismissed}
  <div class="fixed //top-5 //left-1/2 -translate-x-1/2 z-50 bottom-5 left-1/2">
    <div
      class="inline-flex items-center gap-2 rounded-full border border-[#0f2b1f]/15 bg-white/80 px-4 py-2 backdrop-blur shadow-[0_10px_24px_-18px_rgba(7,20,15,.25)] hover:bg-white transition-colors duration-200 ease-in-out"
    >
      <a
        href="mailto:support@browsewithnook.com"
        class="inline-flex items-center gap-2 text-sm text-[#07140f]/85 hover:text-[#07140f]"
      >
        <span class="font-medium">Email us</span>
        <!-- <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M7 17L17 7M9 7H17V15"
              stroke="#07140f"
              stroke-opacity="0.7"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg> -->
      </a>
      <button
        class="ml-1 text-[#07140f]/60 hover:text-[#07140f] cursor-pointer"
        aria-label="Dismiss support banner"
        on:click={dismissSupportBanner}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-4 h-4"
        >
          <path
            fill-rule="evenodd"
            d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
{/if}

<div style="margin:0;height:100vh;overflow:hidden;">
  <a
    class="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/30 cursor-pointer"
    href="/"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="white"
      class="w-4 h-4 opacity-60"
      ><path
        d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"
      /></svg
    >
  </a>

  <iframe
    data-tally-src="https://tally.so/r/3lQXJ6"
    width="100%"
    height="100%"
    frameborder="0"
    marginheight="0"
    marginwidth="0"
    title="Nook Browser | Support"
    style="position:absolute;top:0;right:0;bottom:0;left:0;border:0;"
  ></iframe>
</div>
