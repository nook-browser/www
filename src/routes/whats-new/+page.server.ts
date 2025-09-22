import type { PageServerLoad } from "./$types";
import { sanityQuery } from "$lib/sanity/client";

const GROQ = `
  *[_type == "changelogEntry" && !hidden] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug,
    version,
    tag,
    summary,
    publishedAt,
    image{asset->{url}},
  }
`;

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    const entries = await sanityQuery(GROQ, {}, fetch as any);
    return { entries };
  } catch (e) {
    return { entries: [] };
  }
};
