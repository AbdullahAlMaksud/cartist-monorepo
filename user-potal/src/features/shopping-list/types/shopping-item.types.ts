import type { BaseEntity } from "@/shared/types/entity";

export type ShoppingItemStatus = "buy" | "done" | "alternative";

export interface ShoppingItem extends BaseEntity {
  listId: string;
  name: string;
  quantity: string;
  price: number;
  isCompleted: boolean;
  status: ShoppingItemStatus;
  order: number;
}

export interface CreateShoppingItemInput {
  listId: string;
  name: string;
  quantity: string;
  price: number;
  status?: ShoppingItemStatus;
}

export interface UpdateShoppingItemInput {
  name?: string;
  quantity?: string;
  price?: number;
  isCompleted?: boolean;
  status?: ShoppingItemStatus;
  order?: number;
}
