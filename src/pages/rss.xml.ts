import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async (context) => {
  if (context.site == null) {
    throw new Error("context.site is not defined");
  }

  const articles = await getCollection("articles");

  return rss({
    title: "dotboris.io",
    description: "Articles from dotboris.io",
    site: context.site,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.pubDate,
      link: `/articles/${article.slug}/`,
    })),
    trailingSlash: true,
  });
};
