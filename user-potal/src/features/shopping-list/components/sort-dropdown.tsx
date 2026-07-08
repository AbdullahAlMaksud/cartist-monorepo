"use client";

import { ArrowUpDown } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { SORT_OPTIONS, type SortOption } from "../types/shopping-list.types";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  const { t } = useTranslation();

  return (
    <Select value={value} onValueChange={(next) => onChange(next as SortOption)}>
      <SelectTrigger className="w-full sm:w-44" aria-label={t("lists.sortBy")}>
        <ArrowUpDown className="size-4 text-muted-foreground" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map((option) => (
          <SelectItem key={option} value={option}>
            {t(`lists.sort.${option}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
