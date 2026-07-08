import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import { APP_CONFIG } from "@/shared/constants/app";

import bnCommon from "./locales/bn/common.json";
import enCommon from "./locales/en/common.json";

export const SUPPORTED_LANGUAGES = ["bn", "en"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const I18N_STORAGE_KEY = "haatkhata:language";

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        bn: { common: bnCommon },
        en: { common: enCommon },
      },
      fallbackLng: APP_CONFIG.DEFAULT_LOCALE,
      supportedLngs: SUPPORTED_LANGUAGES,
      defaultNS: "common",
      interpolation: { escapeValue: false },
      detection: {
        order: ["localStorage", "navigator"],
        lookupLocalStorage: I18N_STORAGE_KEY,
        caches: ["localStorage"],
      },
      react: {
        useSuspense: false,
      },
    });
}

export default i18n;
