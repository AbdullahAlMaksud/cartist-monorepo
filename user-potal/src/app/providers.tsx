"use client";

import type { ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";
import { ColorThemeApplier, ThemeProvider } from "@/features/theme";
import { I18nProvider } from "@/i18n/i18n-provider";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider>
      <ColorThemeApplier />
      <I18nProvider>
        {children}
        <Toaster />
      </I18nProvider>
    </ThemeProvider>
  );
};
