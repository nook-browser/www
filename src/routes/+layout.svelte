<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";
  import { dev } from "$app/environment";
  import { injectAnalytics } from "@vercel/analytics/sveltekit";

  let { children } = $props();

  const siteUrl = "https://browsewithnook.com";
  const siteName = "Nook Browser";
  const defaultTitle = "Nook Browser — Keeping what we love, open";
  const defaultDesc = "Open-source, Private, Yours forever.";
  const ogImage = `${siteUrl}/og-default.png`;
  const twitterHandle = "@browsewithnook";

  injectAnalytics({ mode: dev ? "development" : "production" });
</script>

<svelte:head>
  <meta name="theme-color" content="#F9F8F4" />
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

  <!-- Primary SEO -->
  <meta name="description" content={defaultDesc} />
  <link rel="canonical" href={siteUrl + "/"} />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={siteName} />
  <meta property="og:title" content={defaultTitle} />
  <meta property="og:description" content={defaultDesc} />
  <meta property="og:url" content={siteUrl + "/"} />
  <meta property="og:image" content={ogImage} />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={twitterHandle} />
  <meta name="twitter:title" content={defaultTitle} />
  <meta name="twitter:description" content={defaultDesc} />
  <meta name="twitter:image" content={ogImage} />

  <!-- JSON-LD -->
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteName,
      url: siteUrl + '/',
      logo: siteUrl + '/favicon.svg',
      sameAs: ['https://x.com/browsewithnook','https://github.com/nook-browser']
    })}
  </script>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: siteUrl + '/',
      potentialAction: {
        '@type': 'SearchAction',
        target: siteUrl + '/search?q={query}',
        'query-input': 'required name=query'
      }
    })}


    let showBanner = true;
  </script>
</svelte:head>

<div class="dev-banner">
    🚧 This is a <strong>Developer Preview</strong>. Things may change!
    <button class="close-btn" on:click={() => (showBanner = false)}>×</button>
</div>

{@render children?.()}

<style>
  .dev-banner {
    background: #fef3c7; /* amber-100 */
    color: #92400e; /* amber-800 */
    text-align: center;
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    border-bottom: 1px solid #fcd34d;
    position: sticky;
    top: 0;
    z-index: 50;
  }

  .dev-banner strong {
    font-weight: 700;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 1.25rem;
    line-height: 1;
    cursor: pointer;
    color: inherit;
    margin-left: auto;
  }

  .close-btn:hover {
    opacity: 0.7;
  }
</style>
