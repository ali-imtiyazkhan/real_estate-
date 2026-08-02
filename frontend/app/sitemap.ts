import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/for-sale`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/for-rent`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/sell-property`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/contact`, changeFrequency: "monthly", priority: 0.5 },
  ];
}
