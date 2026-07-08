import { generateId } from "@/shared/utils/generate-id";
import { simulateLatency } from "@/shared/utils/simulate-latency";

import type {
  CreateShoppingListInput,
  ShoppingList,
  UpdateShoppingListInput,
} from "../types/shopping-list.types";

/**
 * Mock shopping-list service. Reads/writes go through the Zustand persisted
 * store rather than touching localStorage directly here, since the store is
 * the single source of truth for reactive UI updates. This service exists so
 * call sites (hooks) talk to a stable async contract — swapping the body of
 * each function for a `fetch()` call is the only change needed to go live.
 */
export const shoppingListService = {
  create: async (
    input: CreateShoppingListInput,
    existingLists: ShoppingList[]
  ): Promise<ShoppingList> => {
    await simulateLatency();

    const now = new Date().toISOString();
    const maxOrder = existingLists.reduce((max, list) => Math.max(max, list.order), -1);

    const newList: ShoppingList = {
      id: generateId(),
      title: input.title.trim(),
      isPinned: false,
      order: maxOrder + 1,
      createdAt: now,
      updatedAt: now,
    };

    return newList;
  },

  update: async (
    list: ShoppingList,
    input: UpdateShoppingListInput
  ): Promise<ShoppingList> => {
    await simulateLatency();

    return {
      ...list,
      ...input,
      title: input.title !== undefined ? input.title.trim() : list.title,
      updatedAt: new Date().toISOString(),
    };
  },

  remove: async (): Promise<void> => {
    await simulateLatency();
  },
};
