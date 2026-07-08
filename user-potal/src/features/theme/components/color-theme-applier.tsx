"use client";

import { useEffect } from "react";

import { useThemeStore } from "../store/theme.store";

/**
 * Applies the persisted color theme to the <html> element as a data attribute.
 * `globals.css` defines CSS variable overrides per `data-theme` value, so the
 * whole app re-themes instantly without a re-render of the component tree.
 */
export const ColorThemeApplier = (): null => {
  const colorTheme = useThemeStore((state) => state.colorTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", colorTheme);
  }, [colorTheme]);

  return null;
};
