"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { STORAGE_KEYS } from "@/shared/constants/storage-keys";

import type { ThemeState } from "../types/theme.types";

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      colorTheme: "emerald",
      setColorTheme: (colorTheme) => set({ colorTheme }),
    }),
    {
      name: STORAGE_KEYS.THEME,
    }
  )
);
