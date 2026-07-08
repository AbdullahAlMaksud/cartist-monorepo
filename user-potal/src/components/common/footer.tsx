"use client";

import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-1 px-4 text-center text-xs text-muted-foreground sm:px-6">
        <p>{t("footer.tagline")}</p>
        <p>
          © {year} {t("app.name")} — {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
};
