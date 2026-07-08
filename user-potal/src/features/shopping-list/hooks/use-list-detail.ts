"use client";

import { useMemo } from "react";

import { useShoppingListStore } from "../store/shopping-list.store";
import type { ShoppingItem } from "../types/shopping-item.types";
import type { ShoppingList } from "../types/shopping-list.types";
import { calculateTotalPrice } from "../utils/calculate-totals";

interface UseListDetailResult {
  list: ShoppingList | undefined;
  items: ShoppingItem[];
  totalPrice: number;
  completedCount: number;
}

export const useListDetail = (listId: string): UseListDetailResult => {
  const list = useShoppingListStore((state) => state.lists.find((entry) => entry.id === listId));
  const allItems = useShoppingListStore((state) => state.items);

  const items = useMemo(
    () =>
      allItems
        .filter((item) => item.listId === listId)
        .sort((a, b) => a.order - b.order),
    [allItems, listId]
  );

  const totalPrice = useMemo(() => calculateTotalPrice(items), [items]);
  const completedCount = useMemo(
    () => items.filter((item) => item.isCompleted).length,
    [items]
  );

  return { list, items, totalPrice, completedCount };
};
