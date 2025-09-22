import type { PageServerLoad } from "./$types";
import { sanityQuery } from "$lib/sanity/client";

const GROQ = `
  *[_type == "changelogEntry" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug,
    version,
    tag,
    summary,
    publishedAt,
    image{asset->{url}},
    body,
    links
  }
`;

export const load: PageServerLoad = async ({ params, fetch }) => {
  try {
    const entry = await sanityQuery(GROQ, { slug: params.id }, fetch as any);
    return { entry };
  } catch (e) {
    return { entry: null };
  }
};
