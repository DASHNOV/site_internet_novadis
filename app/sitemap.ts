import type { MetadataRoute } from "next";
import { lidarChapter } from "@/data/lidar-walkthrough";
import { getPublishedContent } from "@/lib/content/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { navItems, solutions } = await getPublishedContent();
  const baseUrl = "https://novadis.eu";

  const staticRoutes = ["", ...navItems.map((item) => item.href), "/legal", "/privacy"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const solutionRoutes = [...solutions.map((solution) => solution.slug), lidarChapter.slug].map((slug) => ({
    url: `${baseUrl}/solutions/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...solutionRoutes];
}
