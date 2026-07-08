"use client";

import { useMemo, useState } from "react";

import type { ShoppingListWithStats, SortOption } from "../types/shopping-list.types";
import { filterListsBySearch, partitionPinnedLists, sortLists } from "../utils/sort-lists";
import { useShoppingLists } from "./use-shopping-lists";

interface UseListGridResult {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  pinnedLists: ShoppingListWithStats[];
  unpinnedLists: ShoppingListWithStats[];
  isEmpty: boolean;
  hasNoSearchResults: boolean;
}

export const useListGrid = (): UseListGridResult => {
  const { listsWithStats, isEmpty } = useShoppingLists();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("manual");

  const filteredAndSorted = useMemo(() => {
    const filtered = filterListsBySearch(listsWithStats, searchQuery);
    return sortLists(filtered, sortOption);
  }, [listsWithStats, searchQuery, sortOption]);

  const { pinned, unpinned } = useMemo(
    () => partitionPinnedLists(filteredAndSorted),
    [filteredAndSorted]
  );

  return {
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    pinnedLists: pinned,
    unpinnedLists: unpinned,
    isEmpty,
    hasNoSearchResults: !isEmpty && filteredAndSorted.length === 0 && searchQuery.trim() !== "",
  };
};
