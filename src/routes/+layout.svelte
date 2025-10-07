<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";
  import { dev } from "$app/environment";
  import { injectAnalytics } from "@vercel/analytics/sveltekit";
  const { data, children } = $props<{
    data: {
      latest?: { version?: string; slug?: string } | null;
      stars?: number | null;
    };
  }>();

  const siteUrl = "https://browsewithnook.com";
  const siteName = "Nook Browser";
  const defaultTitle = "Nook Browser";
  const defaultDesc =
    "Open-source. Private by default. Better Arc without the noise.";
  const twitterHandle = "@browsewithnook";

  let hideBanner = false;

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

  <link
    href="https://fonts.googleapis.com/css2?family=Rethink+Sans:ital,wght@0,400..800;1,400..800&display=swap"
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
  </script>
</svelte:head>

{@render children?.()}
