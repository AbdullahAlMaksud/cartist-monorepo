import type { MetadataRoute } from "next";

import { APP_CONFIG } from "@/shared/constants/app";

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${APP_CONFIG.URL}/sitemap.xml`,
  };
};

export default robots;
