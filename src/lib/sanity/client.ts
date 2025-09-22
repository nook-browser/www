type Fetcher = typeof fetch;

export type SanityEntry = {
  _id: string;
  title: string;
  slug: { current: string };
  version: string;
  tag: string;
  summary: string;
  publishedAt: string;
  image?: { asset?: { url?: string } };
  body?: any;
};

import { env as publicEnv } from "$env/dynamic/public";
import { env as privateEnv } from "$env/dynamic/private";

const projectId = publicEnv.PUBLIC_SANITY_PROJECT_ID;
const dataset = publicEnv.PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2025-09-22";
const token = privateEnv.SANITY_READ_TOKEN;

export function buildSanityUrl(
  query: string,
  params?: Record<string, unknown>
) {
  const base = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`;
  const url = new URL(base);
  url.searchParams.set("query", query);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.set(`$${k}`, JSON.stringify(v));
    }
  }
  return url.toString();
}

export async function sanityQuery<T>(
  query: string,
  params?: Record<string, unknown>,
  fetcher?: Fetcher
): Promise<T> {
  if (!projectId) throw new Error("Missing PUBLIC_SANITY_PROJECT_ID");
  const url = buildSanityUrl(query, params);
  const headers: Record<string, string> = { Accept: "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await (fetcher ?? fetch)(url, { headers });
  if (!res.ok) {
    throw new Error(`Sanity query failed: ${res.status}`);
  }
  const json = (await res.json()) as { result: T };
  return json.result;
}
