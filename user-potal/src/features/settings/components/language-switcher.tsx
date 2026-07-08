"use client";

import { useTranslation } from "react-i18next";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/i18n/use-language";

export const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  return (
    <Select value={language} onValueChange={(value) => setLanguage(value as "bn" | "en")}>
      <SelectTrigger className="w-full sm:w-48" aria-label={t("settings.language")}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="bn">{t("settings.languageBn")}</SelectItem>
        <SelectItem value="en">{t("settings.languageEn")}</SelectItem>
      </SelectContent>
    </Select>
  );
};
