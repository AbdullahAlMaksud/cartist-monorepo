import type { BaseEntity } from "@/shared/types/entity";

export interface ShoppingList extends BaseEntity {
  title: string;
  isPinned: boolean;
  order: number;
}

export interface CreateShoppingListInput {
  title: string;
}

export interface UpdateShoppingListInput {
  title?: string;
  isPinned?: boolean;
  order?: number;
}

import type { ShoppingItem } from "./shopping-item.types";

export interface ShoppingListWithStats extends ShoppingList {
  itemCount: number;
  totalPrice: number;
  items: ShoppingItem[];
}

export const SORT_OPTIONS = ["manual", "recent", "created", "name"] as const;
export type SortOption = (typeof SORT_OPTIONS)[number];
