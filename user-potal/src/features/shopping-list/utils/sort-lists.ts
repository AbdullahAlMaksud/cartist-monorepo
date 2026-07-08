import type { ShoppingListWithStats, SortOption } from "../types/shopping-list.types";

export const sortLists = (
  lists: ShoppingListWithStats[],
  sortOption: SortOption
): ShoppingListWithStats[] => {
  const sorted = [...lists];

  switch (sortOption) {
    case "manual":
      return sorted.sort((a, b) => a.order - b.order);
    case "recent":
      return sorted.sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    case "created":
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case "name":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sorted;
  }
};

export const filterListsBySearch = (
  lists: ShoppingListWithStats[],
  query: string
): ShoppingListWithStats[] => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return lists;
  }

  return lists.filter((list) => list.title.toLowerCase().includes(normalizedQuery));
};

export const partitionPinnedLists = (
  lists: ShoppingListWithStats[]
): { pinned: ShoppingListWithStats[]; unpinned: ShoppingListWithStats[] } => {
  return {
    pinned: lists.filter((list) => list.isPinned),
    unpinned: lists.filter((list) => !list.isPinned),
  };
};
