<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap"
    rel="stylesheet"
  />

  <script async src="https://tally.so/widgets/embed.js"></script>

  <link
    href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap"
    rel="stylesheet"
  />

  <meta name="theme-color" content="#0f2b1f" />

  <meta property="og:title" content="Nook Browser — Open Sourcing Arc" />
  <meta
    property="og:description"
    content="Open-source. Private by default. Better Arc without the noise."
  />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="LOREM IPSUM" />
  <meta property="og:url" content="LOREM IPSUM/" />
  <meta name="twitter:card" content="LOREM IPSUM" />
  <link rel="canonical" href="LOREM IPSUM/" />
</svelte:head>

{@render children?.()}
