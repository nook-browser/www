import type { PageServerLoad } from "./$types";
import { sanityQuery } from "$lib/sanity/client";

const GROQ_LATEST = `
  *[_type == "changelogEntry" && !hidden] | order(publishedAt desc)[0]{
    version,
    "slug": slug.current
  }
`;

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    const latest = await sanityQuery(GROQ_LATEST, {}, fetch as any);
    return { latest };
  } catch {
    return { latest: null };
  }
};
