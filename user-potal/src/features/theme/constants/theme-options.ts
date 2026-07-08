import type { ColorTheme } from "../types/theme.types";

export interface ThemeOption {
  value: ColorTheme;
  swatch: string;
  labelKey: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  { value: "emerald", swatch: "oklch(0.6 0.14 162)", labelKey: "theme.emerald" },
  { value: "blue", swatch: "oklch(0.58 0.16 255)", labelKey: "theme.blue" },
  { value: "violet", swatch: "oklch(0.56 0.19 293)", labelKey: "theme.violet" },
  { value: "rose", swatch: "oklch(0.62 0.19 15)", labelKey: "theme.rose" },
  { value: "orange", swatch: "oklch(0.65 0.17 45)", labelKey: "theme.orange" },
  { value: "slate", swatch: "oklch(0.5 0.02 250)", labelKey: "theme.slate" },
];
