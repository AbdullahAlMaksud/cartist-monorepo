import type { ShoppingItem } from "../types/shopping-item.types";

export const calculateTotalPrice = (items: ShoppingItem[]): number => {
  return items.reduce((total, item) => total + item.price, 0);
};

export const countItems = (items: ShoppingItem[]): number => items.length;
