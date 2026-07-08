import type { Metadata, Viewport } from "next";

import { APP_CONFIG } from "@/shared/constants/app";

import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(APP_CONFIG.URL),
  title: {
    default: `${APP_CONFIG.NAME_BN} · ${APP_CONFIG.NAME}`,
    template: `%s · ${APP_CONFIG.NAME_BN}`,
  },
  description: APP_CONFIG.DESCRIPTION_BN,
  applicationName: APP_CONFIG.NAME,
  keywords: ["shopping list", "haat", "khata", "শপিং লিস্ট", "বাজার লিস্ট", "হাটখাতা"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    alternateLocale: "en_US",
    url: APP_CONFIG.URL,
    title: `${APP_CONFIG.NAME_BN} · ${APP_CONFIG.NAME}`,
    description: APP_CONFIG.DESCRIPTION_BN,
    siteName: APP_CONFIG.NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_CONFIG.NAME_BN} · ${APP_CONFIG.NAME}`,
    description: APP_CONFIG.DESCRIPTION_BN,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#171a20" },
  ],
  width: "device-width",
  initialScale: 1,
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="bn" suppressHydrationWarning className="h-full">
      <body className="relative flex min-h-full flex-col antialiased">
        <div 
          className="fixed inset-0 -z-50 bg-cover bg-center bg-no-repeat pointer-events-none opacity-[0.04] dark:opacity-[0.015]" 
          style={{ backgroundImage: 'url("/fresh-produce.png")' }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
