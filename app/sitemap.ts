import type { MetadataRoute } from "next";
import { navItems, solutions } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://novadis.eu";

  const staticRoutes = ["", ...navItems.map((item) => item.href), "/legal", "/privacy"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const solutionRoutes = solutions.map((solution) => ({
    url: `${baseUrl}/solutions/${solution.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...solutionRoutes];
}
