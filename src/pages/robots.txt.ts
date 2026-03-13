import { DEFAULT_SITE_URL } from "@/config/site";

export const prerender = true;

export async function GET() {
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap-index.xml", DEFAULT_SITE_URL).toString()}\n`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}
