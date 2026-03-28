import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

export const collections = {
  articles: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "./src/content/articles",
    }),
    schema: z.object({
      pubDate: z.date(),
      title: z.string(),
      description: z.string(),
      descriptionAsFirstParagraph: z.boolean().default(false),
    }),
  }),
};
