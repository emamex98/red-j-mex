import { defineCollection } from "astro:content";
import { contentfulClient } from "./lib/contentful";

interface ContentfulEntry {
  contentTypeId: string;
  fields: Record<string, unknown>;
}

const homepage = defineCollection({
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

const contentPages = defineCollection({
  loader: async () => {
    const { items } = await contentfulClient.getEntries<ContentfulEntry>({
      content_type: "contentPage",
    });

    const entries = items.map((item) => ({
      id: item.fields.slug,
      ...item.fields,
    }));

    return entries;
  },
});

const news = defineCollection({
  loader: async () => {
    const { items } = await contentfulClient.getEntries<ContentfulEntry>({
      content_type: "news",
    });

    const entries = items.map((item) => ({
      id: item.fields.slug,
      ...item.fields,
    }));

    return entries;
  },
});

const events = defineCollection({
  loader: async () => {
    const { items } = await contentfulClient.getEntries<ContentfulEntry>({
      content_type: "calendarEvent",
    });

    const entries = items.map((item) => ({
      id: item.fields.title,
      ...item.fields,
    }));

    return entries;
  },
});

export const collections = { homepage, contentPages, news, events };
