"use client";

import { motion } from "framer-motion";
import { GripVertical, MoreVertical, Circle, CheckCircle2, RefreshCw, Check, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/shared/lib/utils";
import { formatCurrency } from "@/shared/utils/format";

import type { ShoppingItem, ShoppingItemStatus } from "../types/shopping-item.types";

interface ItemRowProps {
  item: ShoppingItem;
  onChangeStatus: (itemId: string, status: ShoppingItemStatus) => void;
  onUpdate: (itemId: string, values: { name: string; quantity: string; price: number }) => Promise<void>;
  onDelete: (itemId: string) => void;
  dragHandleProps?: React.HTMLAttributes<HTMLButtonElement>;
  isDragging?: boolean;
}

export const ItemRow = ({
  item,
  onChangeStatus,
  onUpdate,
  onDelete,
  dragHandleProps,
  isDragging = false,
}: ItemRowProps) => {
  const { t, i18n } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(item.name);
  const [editQuantity, setEditQuantity] = useState(item.quantity);
  const [editPrice, setEditPrice] = useState(String(item.price));

  const handleSave = async () => {
    if (!editName.trim()) return;
    await onUpdate(item.id, {
      name: editName.trim(),
      quantity: editQuantity.trim(),
      price: Number(editPrice) || 0,
    });
    setIsEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSave();
    } else if (event.key === "Escape") {
      setIsEditing(false);
      setEditName(item.name);
      setEditQuantity(item.quantity);
      setEditPrice(String(item.price));
    }
  };

  if (isEditing) {
    return (
      <motion.div
        layout
        className="flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2"
      >
        {dragHandleProps && (
          <button
            type="button"
            className="cursor-grab touch-none rounded-md p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-accent group-hover:opacity-100 active:cursor-grabbing"
            aria-label="Drag to reorder"
            {...dragHandleProps}
          >
            <GripVertical className="size-4" />
          </button>
        )}

        <div className="flex flex-1 flex-wrap items-center gap-2">
          <Input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-9 min-w-[120px] flex-1 bg-background text-base"
            placeholder={t("listDetails.productNamePlaceholder")}
            autoFocus
          />
          <Input
            value={editQuantity}
            onChange={(e) => setEditQuantity(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-9 w-[120px] bg-background text-base"
            placeholder={t("listDetails.quantityPlaceholder")}
          />
          <Input
            type="number"
            value={editPrice}
            onChange={(e) => setEditPrice(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-9 w-[100px] bg-background font-ledger text-base"
            placeholder={t("listDetails.pricePlaceholder")}
          />
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/20"
            onClick={handleSave}
            aria-label="Save"
          >
            <Check className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground hover:bg-secondary"
            onClick={() => {
              setIsEditing(false);
              setEditName(item.name);
              setEditQuantity(item.quantity);
              setEditPrice(String(item.price));
            }}
            aria-label="Cancel"
          >
            <X className="size-4" />
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.16 }}
      className={cn(
        "group flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 hover:border-border hover:bg-secondary/60",
        isDragging && "z-10 border-border bg-card shadow-md"
      )}
    >
      {dragHandleProps && (
        <button
          type="button"
          className="cursor-grab touch-none rounded-md p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-accent group-hover:opacity-100 active:cursor-grabbing"
          aria-label="Drag to reorder"
          {...dragHandleProps}
        >
          <GripVertical className="size-4" />
        </button>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            className={cn(
              "flex h-8 items-center gap-1.5 rounded-full px-2 sm:px-2.5 text-xs font-semibold border transition-all shrink-0",
              item.status === "done" && "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30",
              item.status === "alternative" && "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:text-amber-800 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30",
              (item.status === "buy" || !item.status) && "bg-secondary text-secondary-foreground border-transparent hover:bg-secondary/80"
            )}
          >
            {item.status === "done" ? (
              <CheckCircle2 className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            ) : item.status === "alternative" ? (
              <RefreshCw className="size-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
            ) : (
              <Circle className="size-3.5 shrink-0 text-muted-foreground" />
            )}
            <span className="hidden sm:inline">
              {item.status === "done"
                ? t("status.done")
                : item.status === "alternative"
                ? t("status.alternative")
                : t("status.buy")}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => onChangeStatus(item.id, "buy")}>
            <Circle className="mr-2 size-4 text-muted-foreground" />
            {t("status.buy")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onChangeStatus(item.id, "done")} className="text-emerald-600 focus:text-emerald-600 focus:bg-emerald-50 dark:focus:bg-emerald-950/20">
            <CheckCircle2 className="mr-2 size-4" />
            {t("status.done")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onChangeStatus(item.id, "alternative")} className="text-amber-600 focus:text-amber-600 focus:bg-amber-50 dark:focus:bg-amber-950/20">
            <RefreshCw className="mr-2 size-4" />
            {t("status.alternative")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
        <div className="flex min-w-0 flex-col">
          <span
            className={cn(
              "truncate text-base font-semibold text-foreground",
              item.isCompleted && "text-muted-foreground/60 line-through font-normal"
            )}
          >
            {item.name}
          </span>
          <span className="font-ledger text-sm text-muted-foreground/80">{item.quantity}</span>
        </div>

        <span
          className={cn(
            "font-ledger shrink-0 text-base font-bold",
            item.isCompleted ? "text-muted-foreground/60 line-through font-semibold" : "text-foreground"
          )}
        >
          {formatCurrency(item.price, i18n.language === "bn" ? "bn-BD" : "en-US")}
        </span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="ghost" size="icon" className="size-8 shrink-0">
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setIsEditing(true)}>{t("common.edit")}</DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onSelect={() => onDelete(item.id)}>
            {t("common.delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
};
