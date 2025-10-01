import type { LayoutServerLoad } from "./$types";
import { sanityQuery } from "$lib/sanity/client";

const GROQ_LATEST = `
  *[_type == "changelogEntry" && !hidden] | order(publishedAt desc)[0]{
    version,
    "slug": slug.current
  }
`;

export const load: LayoutServerLoad = async ({ fetch }) => {
  try {
    const [latest, repo] = await Promise.all([
      sanityQuery(GROQ_LATEST, {}, fetch as any),
      fetch("https://api.github.com/repos/nook-browser/nook").then((r) =>
        r.ok ? r.json() : null
      ),
    ]);
    const stars = repo?.stargazers_count ?? null;
    return { latest, stars };
  } catch {
    return { latest: null, stars: null };
  }
};
