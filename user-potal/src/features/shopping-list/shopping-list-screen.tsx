"use client";

import { ListChecks, Plus, SearchX } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { useHasHydrated } from "@/shared/hooks/use-has-hydrated";
import { EmptyState } from "@/shared/components/empty-state";

import { useListGrid } from "./hooks/use-list-grid";
import { useShoppingListStore } from "./store/shopping-list.store";
import type { ShoppingListWithStats } from "./types/shopping-list.types";
import { DeleteListAlert } from "./components/delete-list-alert";
import { ListGridSkeleton } from "./components/list-card-skeleton";
import { ListFormDialog } from "./components/list-form-dialog";
import { ListGrid } from "./components/list-grid";
import { ListSearchBar } from "./components/list-search-bar";
import { SortDropdown } from "./components/sort-dropdown";

export const ShoppingListScreen = () => {
  const { t } = useTranslation();
  const hasHydrated = useHasHydrated(useShoppingListStore);

  const {
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    pinnedLists,
    unpinnedLists,
    isEmpty,
    hasNoSearchResults,
  } = useListGrid();

  const reorderLists = useShoppingListStore((state) => state.reorderLists);
  const togglePinList = useShoppingListStore((state) => state.togglePinList);

  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [editingList, setEditingList] = useState<ShoppingListWithStats | undefined>(undefined);
  const [deletingListId, setDeletingListId] = useState<string | null>(null);

  const openCreateDialog = () => {
    setEditingList(undefined);
    setFormDialogOpen(true);
  };

  const openEditDialog = (list: ShoppingListWithStats) => {
    setEditingList(list);
    setFormDialogOpen(true);
  };

  const sortDisabled = sortOption !== "manual";

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-display text-2xl font-bold sm:text-3xl">{t("lists.title")}</h1>
        <Button onClick={openCreateDialog}>
          <Plus /> {t("lists.create")}
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <ListSearchBar value={searchQuery} onChange={setSearchQuery} />
        <SortDropdown value={sortOption} onChange={setSortOption} />
      </div>

      {!hasHydrated && <ListGridSkeleton />}

      {hasHydrated && isEmpty && (
        <EmptyState
          icon={ListChecks}
          title={t("lists.empty.title")}
          description={t("lists.empty.description")}
          action={
            <Button onClick={openCreateDialog} variant="secondary">
              <Plus /> {t("lists.create")}
            </Button>
          }
        />
      )}

      {hasHydrated && hasNoSearchResults && (
        <EmptyState
          icon={SearchX}
          title={t("lists.empty.searchTitle")}
          description={t("lists.empty.searchDescription")}
        />
      )}

      {hasHydrated && pinnedLists.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {t("lists.pinned")}
          </h2>
          <ListGrid
            lists={pinnedLists}
            onReorder={reorderLists}
            onEdit={openEditDialog}
            onDelete={setDeletingListId}
            onTogglePin={togglePinList}
            sortDisabled={sortDisabled}
          />
        </section>
      )}

      {hasHydrated && unpinnedLists.length > 0 && (
        <section className="flex flex-col gap-3">
          {pinnedLists.length > 0 && (
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {t("lists.allLists")}
            </h2>
          )}
          <ListGrid
            lists={unpinnedLists}
            onReorder={reorderLists}
            onEdit={openEditDialog}
            onDelete={setDeletingListId}
            onTogglePin={togglePinList}
            sortDisabled={sortDisabled}
          />
        </section>
      )}

      <ListFormDialog open={formDialogOpen} onOpenChange={setFormDialogOpen} list={editingList} />
      <DeleteListAlert
        open={deletingListId !== null}
        onOpenChange={(open) => !open && setDeletingListId(null)}
        listId={deletingListId}
      />
    </div>
  );
};
