import { defineCollection } from "astro:content";
import { contentfulClient } from "./lib/contentful";

interface ContentfulEntry {
  contentTypeId: string;
  fields: Record<string, unknown>;
}

const homepage = defineCollection({
  // Load data from anywhere!
  loader: async () => {
    const { items } = await contentfulClient.getEntries<ContentfulEntry>({
      content_type: "homepage",
    });

    const entries = items.map((item) => ({
      id: item.fields.url,
      ...item.fields,
    }));

    return entries;
  },
});

export const collections = { homepage };
