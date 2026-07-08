"use client";

import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Input } from "@/components/ui/input";

interface ListSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const ListSearchBar = ({ value, onChange }: ListSearchBarProps) => {
  const { t } = useTranslation();

  return (
    <div className="relative flex-1">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={t("lists.searchPlaceholder")}
        aria-label={t("common.search")}
        className="pl-9"
      />
    </div>
  );
};
