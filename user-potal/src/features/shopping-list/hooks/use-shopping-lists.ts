"use client";

import { useMemo } from "react";

import { useShoppingListStore } from "../store/shopping-list.store";
import type { ShoppingListWithStats } from "../types/shopping-list.types";
import { calculateTotalPrice, countItems } from "../utils/calculate-totals";

interface UseShoppingListsResult {
  listsWithStats: ShoppingListWithStats[];
  isEmpty: boolean;
}

export const useShoppingLists = (): UseShoppingListsResult => {
  const lists = useShoppingListStore((state) => state.lists);
  const items = useShoppingListStore((state) => state.items);

  const listsWithStats = useMemo<ShoppingListWithStats[]>(() => {
    return lists.map((list) => {
      const listItems = items
        .filter((item) => item.listId === list.id)
        .sort((a, b) => a.order - b.order);

      return {
        ...list,
        itemCount: countItems(listItems),
        totalPrice: calculateTotalPrice(listItems),
        items: listItems,
      };
    });
  }, [lists, items]);

  return {
    listsWithStats,
    isEmpty: listsWithStats.length === 0,
  };
};
