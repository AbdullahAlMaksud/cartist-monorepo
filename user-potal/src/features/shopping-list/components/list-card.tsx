"use client";

import { motion } from "framer-motion";
import { GripVertical, MoreVertical, Pin, PinOff, Pencil } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/shared/constants/routes";
import { cn } from "@/shared/lib/utils";
import { formatCurrency, formatRelativeTime } from "@/shared/utils/format";

import type { ShoppingListWithStats } from "../types/shopping-list.types";

interface ListCardProps {
  list: ShoppingListWithStats;
  onEdit: (list: ShoppingListWithStats) => void;
  onDelete: (listId: string) => void;
  onTogglePin: (listId: string) => void;
  dragHandleProps?: React.HTMLAttributes<HTMLButtonElement>;
  isDragging?: boolean;
}

export const ListCard = ({
  list,
  onEdit,
  onDelete,
  onTogglePin,
  dragHandleProps,
  isDragging = false,
}: ListCardProps) => {
  const { t, i18n } = useTranslation();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.18 }}
      className={isDragging ? "z-20 opacity-90 shadow-lg" : ""}
    >
      <Card className="group relative flex h-[280px] flex-col justify-between overflow-hidden py-4 transition-all duration-300 hover:shadow-lg hover:border-primary/45 hover:-translate-y-1 cursor-pointer bg-card/75 backdrop-blur-sm border-border/80">
        <Link
          href={ROUTES.LIST_DETAILS(list.id)}
          className="absolute inset-0 z-0"
          aria-label={list.title}
        />

        <div className="relative z-10 flex items-start justify-between gap-2 px-5">
          <div className="flex min-w-0 items-center gap-1.5">
            {dragHandleProps && (
              <button
                type="button"
                className="cursor-grab touch-none rounded-md p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-accent hover:text-accent-foreground group-hover:opacity-100 active:cursor-grabbing"
                aria-label="Drag to reorder"
                {...dragHandleProps}
              >
                <GripVertical className="size-4" />
              </button>
            )}
            <h3 className="truncate font-display text-lg font-semibold">{list.title}</h3>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8 relative z-10"
              aria-label={list.isPinned ? t("listCard.unpin") : t("listCard.pin")}
              onClick={(event) => {
                event.preventDefault();
                onTogglePin(list.id);
              }}
            >
              {list.isPinned ? (
                <Pin className="size-4 fill-current text-primary" />
              ) : (
                <Pin className="size-4" />
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8 relative z-10 text-muted-foreground hover:text-foreground"
              aria-label={t("listCard.edit")}
              onClick={(event) => {
                event.preventDefault();
                window.location.href = ROUTES.LIST_DETAILS(list.id);
              }}
            >
              <Pencil className="size-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-8 relative z-10"
                  aria-label={t("listCard.openMenu")}
                  onClick={(event) => event.preventDefault()}
                >
                  <MoreVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => onEdit(list)}>{t("listCard.edit")}</DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => onTogglePin(list.id)}
                >
                  {list.isPinned ? (
                    <>
                      <PinOff /> {t("listCard.unpin")}
                    </>
                  ) : (
                    <>
                      <Pin /> {t("listCard.pin")}
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onSelect={() => onDelete(list.id)}>
                  {t("listCard.delete")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="relative z-10 flex-1 px-5 py-2 overflow-hidden">
          <ul className="flex flex-col gap-1 text-xs text-muted-foreground">
            {list.items && list.items.slice(0, 5).map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-2 py-0.5">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className={cn(
                    "size-2 rounded-full shrink-0",
                    item.status === "done" && "bg-emerald-500",
                    item.status === "alternative" && "bg-amber-500",
                    (item.status === "buy" || !item.status) && "bg-muted-foreground/30"
                  )} />
                  <span className={cn(
                    "truncate font-medium",
                    item.status === "done" && "line-through text-muted-foreground/60"
                  )}>
                    {item.name}
                  </span>
                  {item.quantity && (
                    <span className="text-[10px] text-muted-foreground/50 shrink-0">({item.quantity})</span>
                  )}
                </div>
                {item.price > 0 && (
                  <span className="font-ledger shrink-0">
                    {formatCurrency(item.price, i18n.language === "bn" ? "bn-BD" : "en-US")}
                  </span>
                )}
              </li>
            ))}
            {list.itemCount > 5 && (
              <li className="text-[10px] text-muted-foreground/60 italic pt-1">
                {i18n.language === "bn" 
                  ? `+ আরও ${list.itemCount - 5}টি পণ্য...` 
                  : `+ ${list.itemCount - 5} more items...`}
              </li>
            )}
            {(!list.items || list.items.length === 0) && (
              <li className="text-muted-foreground/30 italic py-2">
                {i18n.language === "bn" ? "কোনো পণ্য নেই" : "No items"}
              </li>
            )}
          </ul>
        </div>

        <div className="relative z-10 flex items-end justify-between px-5 pt-2 border-t border-border/40">
          <div className="flex flex-col gap-0.5">
            <Badge variant="secondary" className="w-fit text-[10px] py-0 px-1.5">{t("lists.items", { count: list.itemCount })}</Badge>
            <span className="text-[10px] text-muted-foreground/70">
              {t("lists.updated", { time: formatRelativeTime(list.updatedAt, i18n.language) })}
            </span>
          </div>
          <span className="font-ledger text-lg font-bold text-primary">
            {formatCurrency(list.totalPrice, i18n.language === "bn" ? "bn-BD" : "en-US")}
          </span>
        </div>
      </Card>
    </motion.div>
  );
};
