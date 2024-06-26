import type { APIRoute } from "astro";

const sitemapUrl = new URL("sitemap-index.xml", import.meta.env.SITE);

const robotsTxt = `
User-agent: *
Allow: /

Sitemap: ${sitemapUrl.href}
`.trim();

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
