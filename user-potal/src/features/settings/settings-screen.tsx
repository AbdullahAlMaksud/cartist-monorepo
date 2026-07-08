"use client";

import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ModeToggle, ThemeSwitcher } from "@/features/theme";

import { LanguageSwitcher } from "./components/language-switcher";

export const SettingsScreen = () => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-8 sm:px-6">
      <h1 className="font-display text-2xl font-bold sm:text-3xl">{t("settings.title")}</h1>

      <Card>
        <CardHeader>
          <CardTitle>{t("settings.appearance")}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5 pb-5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{t("settings.mode.label")}</span>
            <ModeToggle />
          </div>
          <Separator />
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium">{t("settings.colorTheme")}</span>
            <ThemeSwitcher />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("settings.language")}</CardTitle>
        </CardHeader>
        <CardContent className="pb-5">
          <LanguageSwitcher />
        </CardContent>
      </Card>
    </div>
  );
};
