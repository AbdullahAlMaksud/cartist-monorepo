"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { STORAGE_KEYS } from "@/shared/constants/storage-keys";

import { authService } from "../services/auth.service";
import type {
  AuthUser,
  ForgotPasswordInput,
  SignInInput,
  SignUpInput,
} from "../types/auth.types";

interface AuthStoreState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  signIn: (input: SignInInput) => Promise<AuthUser>;
  signUp: (input: SignUpInput) => Promise<AuthUser>;
  forgotPassword: (input: ForgotPasswordInput) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      signIn: async (input) => {
        const user = await authService.signIn(input);
        set({ user, isAuthenticated: true });
        return user;
      },

      signUp: async (input) => {
        const user = await authService.signUp(input);
        set({ user, isAuthenticated: true });
        return user;
      },

      forgotPassword: async (input) => {
        await authService.forgotPassword(input);
      },

      signOut: async () => {
        await authService.signOut();
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: STORAGE_KEYS.AUTH,
    }
  )
);
