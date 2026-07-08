"use client";

import { useAuthStore } from "../store/auth.store";

export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const signIn = useAuthStore((state) => state.signIn);
  const signUp = useAuthStore((state) => state.signUp);
  const forgotPassword = useAuthStore((state) => state.forgotPassword);
  const signOut = useAuthStore((state) => state.signOut);

  return { user, isAuthenticated, signIn, signUp, forgotPassword, signOut };
};
