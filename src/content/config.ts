import { z, defineCollection } from "astro:content";

export const collections = {
  articles: defineCollection({
    type: "content",
    schema: z.object({
      pubDate: z.date(),
      title: z.string(),
      description: z.string(),
      descriptionAsFirstParagraph: z.boolean().default(false),
    }),
  }),
};
