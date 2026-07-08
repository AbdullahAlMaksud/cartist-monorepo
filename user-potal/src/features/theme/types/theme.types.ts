export const COLOR_THEMES = ["emerald", "blue", "violet", "rose", "orange", "slate"] as const;

export type ColorTheme = (typeof COLOR_THEMES)[number];

export const COLOR_MODES = ["light", "dark", "system"] as const;

export type ColorMode = (typeof COLOR_MODES)[number];

export interface ThemeState {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}
