"use client";

import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib/utils";

import { THEME_OPTIONS } from "../constants/theme-options";
import { useThemeStore } from "../store/theme.store";

export const ThemeSwitcher = () => {
  const { t } = useTranslation();
  const colorTheme = useThemeStore((state) => state.colorTheme);
  const setColorTheme = useThemeStore((state) => state.setColorTheme);

  return (
    <div className="flex flex-wrap gap-3" role="radiogroup" aria-label={t("settings.colorTheme")}>
      {THEME_OPTIONS.map((option) => {
        const isActive = option.value === colorTheme;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={t(option.labelKey)}
            onClick={() => setColorTheme(option.value)}
            className={cn(
              "flex size-11 items-center justify-center rounded-full border-2 shadow-sm transition-transform hover:scale-105",
              "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40",
              isActive ? "border-foreground" : "border-transparent"
            )}
            style={{ backgroundColor: option.swatch }}
          >
            {isActive && <Check className="size-5 text-white drop-shadow" />}
          </button>
        );
      })}
    </div>
  );
};
