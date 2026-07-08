"use client";

import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import type { SupportedLanguage } from "./config";

interface UseLanguageResult {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
}

export const useLanguage = (): UseLanguageResult => {
  const { i18n } = useTranslation();
  const language = (i18n.language?.split("-")[0] ?? "bn") as SupportedLanguage;

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback(
    (nextLanguage: SupportedLanguage) => {
      void i18n.changeLanguage(nextLanguage);
    },
    [i18n]
  );

  return { language, setLanguage };
};
