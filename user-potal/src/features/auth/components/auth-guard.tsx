"use client";

import type { ReactNode } from "react";

import { useAuth } from "../hooks/use-auth";

interface AuthGuardProps {
  children: ReactNode;
  /** Rendered instead of `children` while there is no authenticated session. */
  fallback?: ReactNode;
}

/**
 * Scaffolding for protected routes. There is no backend session to verify
 * yet, so this currently renders `children` unconditionally when there's no
 * fallback and never blocks navigation — shopping lists are local-first and
 * usable without an account. Once real authentication exists, swap the
 * `isAuthenticated` check here for a server-verified session and this
 * component (plus the `(auth)` route group it pairs with) is already in
 * place to gate any route that needs it.
 */
export const AuthGuard = ({ children, fallback = null }: AuthGuardProps) => {
  const { isAuthenticated } = useAuth();

  if (fallback && !isAuthenticated) {
    return fallback;
  }

  return children;
};
