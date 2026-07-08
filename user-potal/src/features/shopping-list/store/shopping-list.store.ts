"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { STORAGE_KEYS } from "@/shared/constants/storage-keys";

import { shoppingItemService } from "../services/shopping-item.service";
import { shoppingListService } from "../services/shopping-list.service";
import type { CreateShoppingItemInput, ShoppingItem, ShoppingItemStatus } from "../types/shopping-item.types";
import type {
  CreateShoppingListInput,
  ShoppingList,
  UpdateShoppingListInput,
} from "../types/shopping-list.types";

interface ShoppingListState {
  lists: ShoppingList[];
  items: ShoppingItem[];

  createList: (input: CreateShoppingListInput) => Promise<ShoppingList>;
  updateList: (listId: string, input: UpdateShoppingListInput) => Promise<void>;
  removeList: (listId: string) => Promise<void>;
  togglePinList: (listId: string) => Promise<void>;
  reorderLists: (orderedListIds: string[]) => void;

  addItem: (input: CreateShoppingItemInput) => Promise<void>;
  updateItem: (
    itemId: string,
    input: { name?: string; quantity?: string; price?: number; status?: ShoppingItemStatus }
  ) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  toggleItemComplete: (itemId: string) => Promise<void>;
  updateItemStatus: (itemId: string, status: ShoppingItemStatus) => Promise<void>;
  reorderItems: (listId: string, orderedItemIds: string[]) => void;
}

export const useShoppingListStore = create<ShoppingListState>()(
  persist(
    (set, get) => ({
      lists: [],
      items: [],

      createList: async (input) => {
        const newList = await shoppingListService.create(input, get().lists);
        set((state) => ({ lists: [...state.lists, newList] }));
        return newList;
      },

      updateList: async (listId, input) => {
        const existingList = get().lists.find((list) => list.id === listId);
        if (!existingList) return;

        const updatedList = await shoppingListService.update(existingList, input);
        set((state) => ({
          lists: state.lists.map((list) => (list.id === listId ? updatedList : list)),
        }));
      },

      removeList: async (listId) => {
        await shoppingListService.remove();
        set((state) => ({
          lists: state.lists.filter((list) => list.id !== listId),
          items: state.items.filter((item) => item.listId !== listId),
        }));
      },

      togglePinList: async (listId) => {
        const existingList = get().lists.find((list) => list.id === listId);
        if (!existingList) return;

        await get().updateList(listId, { isPinned: !existingList.isPinned });
      },

      reorderLists: (orderedListIds) => {
        set((state) => ({
          lists: state.lists.map((list) => {
            const newOrder = orderedListIds.indexOf(list.id);
            return newOrder === -1 ? list : { ...list, order: newOrder };
          }),
        }));
      },

      addItem: async (input) => {
        const existingItems = get().items.filter((item) => item.listId === input.listId);
        const newItem = await shoppingItemService.create(input, existingItems);
        set((state) => ({ items: [...state.items, newItem] }));

        await get().updateList(input.listId, {});
      },

      updateItem: async (itemId, input) => {
        const existingItem = get().items.find((item) => item.id === itemId);
        if (!existingItem) return;

        const updatedItem = await shoppingItemService.update(existingItem, input);
        set((state) => ({
          items: state.items.map((item) => (item.id === itemId ? updatedItem : item)),
        }));

        await get().updateList(existingItem.listId, {});
      },

      removeItem: async (itemId) => {
        const existingItem = get().items.find((item) => item.id === itemId);
        await shoppingItemService.remove();
        set((state) => ({ items: state.items.filter((item) => item.id !== itemId) }));

        if (existingItem) {
          await get().updateList(existingItem.listId, {});
        }
      },

      toggleItemComplete: async (itemId) => {
        const existingItem = get().items.find((item) => item.id === itemId);
        if (!existingItem) return;

        const nextStatus = existingItem.status === "done" ? "buy" : "done";
        await get().updateItemStatus(itemId, nextStatus);
      },

      updateItemStatus: async (itemId, status) => {
        const existingItem = get().items.find((item) => item.id === itemId);
        if (!existingItem) return;

        const updatedItem = await shoppingItemService.update(existingItem, {
          status,
          isCompleted: status === "done",
        });
        set((state) => ({
          items: state.items.map((item) => (item.id === itemId ? updatedItem : item)),
        }));

        await get().updateList(existingItem.listId, {});
      },

      reorderItems: (listId, orderedItemIds) => {
        set((state) => ({
          items: state.items.map((item) => {
            if (item.listId !== listId) return item;
            const newOrder = orderedItemIds.indexOf(item.id);
            return newOrder === -1 ? item : { ...item, order: newOrder };
          }),
        }));
      },
    }),
    {
      name: STORAGE_KEYS.SHOPPING_LISTS,
    }
  )
);
