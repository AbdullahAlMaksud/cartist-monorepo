"use client";

import { useSyncExternalStore } from "react";

interface PersistApi {
  persist: {
    hasHydrated: () => boolean;
    onFinishHydration: (callback: () => void) => () => void;
  };
}

/**
 * Tracks whether a Zustand `persist` store has finished rehydrating from
 * localStorage. Built on `useSyncExternalStore` (rather than an effect +
 * setState) so it subscribes correctly to the store's hydration event
 * without extra render-triggering side effects.
 */
export const useHasHydrated = (store: PersistApi): boolean => {
  return useSyncExternalStore(
    (onStoreChange) => store.persist.onFinishHydration(onStoreChange),
    () => store.persist.hasHydrated(),
    () => false
  );
};
