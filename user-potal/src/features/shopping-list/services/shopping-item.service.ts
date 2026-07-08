import { generateId } from "@/shared/utils/generate-id";
import { simulateLatency } from "@/shared/utils/simulate-latency";

import type {
  CreateShoppingItemInput,
  ShoppingItem,
  UpdateShoppingItemInput,
} from "../types/shopping-item.types";

/**
 * Mock shopping-item service — same shape as `shoppingListService`. See that
 * file for the rationale behind keeping an async contract even over local
 * storage: it keeps the future API swap a one-file change.
 */
export const shoppingItemService = {
  create: async (
    input: CreateShoppingItemInput,
    existingItems: ShoppingItem[]
  ): Promise<ShoppingItem> => {
    await simulateLatency();

    const now = new Date().toISOString();
    const maxOrder = existingItems.reduce((max, item) => Math.max(max, item.order), -1);

    const newItem: ShoppingItem = {
      id: generateId(),
      listId: input.listId,
      name: input.name.trim(),
      quantity: input.quantity.trim(),
      price: input.price,
      isCompleted: input.status === "done",
      status: input.status ?? "buy",
      order: maxOrder + 1,
      createdAt: now,
      updatedAt: now,
    };

    return newItem;
  },

  update: async (item: ShoppingItem, input: UpdateShoppingItemInput): Promise<ShoppingItem> => {
    await simulateLatency();

    const status = input.status !== undefined ? input.status : item.status;
    const isCompleted = input.status !== undefined ? (input.status === "done") : (input.isCompleted !== undefined ? input.isCompleted : item.isCompleted);

    return {
      ...item,
      ...input,
      isCompleted,
      status,
      name: input.name !== undefined ? input.name.trim() : item.name,
      quantity: input.quantity !== undefined ? input.quantity.trim() : item.quantity,
      updatedAt: new Date().toISOString(),
    };
  },

  remove: async (): Promise<void> => {
    await simulateLatency();
  },
};
