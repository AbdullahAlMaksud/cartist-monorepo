import type { MetadataRoute } from "next";

import { APP_CONFIG } from "@/shared/constants/app";

const sitemap = (): MetadataRoute.Sitemap => {
  const routes = ["", "/lists", "/settings", "/signin", "/signup", "/forgot-password"];

  return routes.map((route) => ({
    url: `${APP_CONFIG.URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "/lists" ? 1 : 0.6,
  }));
};

export default sitemap;
