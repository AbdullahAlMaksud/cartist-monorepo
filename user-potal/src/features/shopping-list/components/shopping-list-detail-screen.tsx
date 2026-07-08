"use client";

import { ArrowLeft, PackageOpen, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/shared/components/empty-state";
import { ROUTES } from "@/shared/constants/routes";
import { useHasHydrated } from "@/shared/hooks/use-has-hydrated";
import { formatCurrency } from "@/shared/utils/format";

import { useListDetail } from "../hooks/use-list-detail";
import { useShoppingListStore } from "../store/shopping-list.store";
import { DeleteItemAlert } from "./delete-item-alert";
import { DeleteListAlert } from "./delete-list-alert";
import { ItemList } from "./item-list";
import { ListFormDialog } from "./list-form-dialog";

interface ShoppingListDetailScreenProps {
  listId: string;
}

export const ShoppingListDetailScreen = ({ listId }: ShoppingListDetailScreenProps) => {
  const { t, i18n } = useTranslation();
  const hasHydrated = useHasHydrated(useShoppingListStore);
  const { list, items, totalPrice, completedCount } = useListDetail(listId);
  const reorderItems = useShoppingListStore((state) => state.reorderItems);
  const updateItemStatus = useShoppingListStore((state) => state.updateItemStatus);
  const addItem = useShoppingListStore((state) => state.addItem);
  const updateItem = useShoppingListStore((state) => state.updateItem);

  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);
  const [listFormOpen, setListFormOpen] = useState(false);
  const [deleteListOpen, setDeleteListOpen] = useState(false);

  // Form states for inline add
  const [newName, setNewName] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);

  if (hasHydrated && !list) {
    notFound();
  }

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || isAdding) return;

    setIsAdding(true);
    try {
      await addItem({
        listId,
        name: newName.trim(),
        quantity: newQuantity.trim(),
        price: Number(newPrice) || 0,
      });
      setNewName("");
      setNewQuantity("");
      setNewPrice("");
      // Focus back to name input for fast workflow
      nameInputRef.current?.focus();
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 pb-28 sm:px-6">
      <Link
        href={ROUTES.LISTS}
        className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> {t("common.back")}
      </Link>

      {!hasHydrated || !list ? (
        <div className="h-40 animate-pulse rounded-xl bg-muted" />
      ) : (
        <>
          <div className="flex items-start justify-between gap-3">
            <h1 className="font-display text-2xl font-bold sm:text-3xl">{list.title}</h1>
            <div className="flex shrink-0 gap-1">
              <Button variant="ghost" size="icon" aria-label={t("listCard.edit")} onClick={() => setListFormOpen(true)}>
                <Pencil className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label={t("listCard.delete")}
                onClick={() => setDeleteListOpen(true)}
              >
                <Trash2 className="size-4 text-destructive" />
              </Button>
            </div>
          </div>

          {/* Inline Add Form */}
          <Card className="p-4 border-dashed border-2 bg-secondary/10">
            <form onSubmit={handleAddItem} className="flex flex-col gap-3 md:flex-row md:items-end">
              <div className="flex flex-1 flex-col gap-1.5">
                <span className="text-xs font-semibold text-muted-foreground">{t("listDetails.productName")}</span>
                <Input
                  ref={nameInputRef}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder={t("listDetails.productNamePlaceholder")}
                  className="bg-background text-base"
                  required
                />
              </div>

              <div className="flex flex-wrap gap-3 md:flex-1">
                <div className="flex flex-1 flex-col gap-1.5 min-w-[100px]">
                  <span className="text-xs font-semibold text-muted-foreground">{t("listDetails.quantity")}</span>
                  <Input
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                    placeholder={t("listDetails.quantityPlaceholder")}
                    className="bg-background text-base"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-1.5 min-w-[80px]">
                  <span className="text-xs font-semibold text-muted-foreground">{t("listDetails.price")} (৳)</span>
                  <Input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder={t("listDetails.pricePlaceholder")}
                    className="bg-background font-ledger text-base"
                    min={0}
                  />
                </div>
              </div>

              <Button type="submit" disabled={isAdding} className="h-10 md:w-auto w-full gap-1.5 shrink-0">
                <Plus className="size-4" />
                {t("listDetails.addProduct")}
              </Button>
            </form>
          </Card>

          <div className="flex items-center justify-between mt-2">
            <h2 className="font-display text-lg font-semibold">{t("nav.lists")}</h2>
          </div>

          {items.length === 0 ? (
            <EmptyState
              icon={PackageOpen}
              title={t("listDetails.empty.title")}
              description={t("listDetails.empty.description")}
            />
          ) : (
            <ItemList
              items={items}
              onReorder={(orderedIds) => reorderItems(listId, orderedIds)}
              onChangeStatus={updateItemStatus}
              onUpdate={updateItem}
              onDelete={setDeletingItemId}
            />
          )}

          {/* Fixed Bottom bar showing total and stats */}
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border shadow-lg py-4 px-6 md:px-8">
            <div className="mx-auto max-w-3xl flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{t("listDetails.totalLabel")}</span>
                <span className="font-ledger text-2xl md:text-3xl font-bold text-primary">
                  {formatCurrency(totalPrice, i18n.language === "bn" ? "bn-BD" : "en-US")}
                </span>
              </div>
              <Badge variant="secondary" className="px-3 py-1 text-sm font-semibold h-fit">
                {completedCount} / {items.length} {i18n.language === "bn" ? "কেনা হয়েছে" : "picked up"}
              </Badge>
            </div>
          </div>

          <ListFormDialog open={listFormOpen} onOpenChange={setListFormOpen} list={list} />
          <DeleteItemAlert
            open={deletingItemId !== null}
            onOpenChange={(open) => !open && setDeletingItemId(null)}
            itemId={deletingItemId}
          />
          <DeleteListAlert
            open={deleteListOpen}
            onOpenChange={setDeleteListOpen}
            listId={list.id}
          />
        </>
      )}
    </div>
  );
};
