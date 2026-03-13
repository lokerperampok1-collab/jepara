import { buildCatalogIndex } from "@/data/catalog";

export const prerender = true;

export async function GET() {
  return new Response(JSON.stringify(buildCatalogIndex()), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
