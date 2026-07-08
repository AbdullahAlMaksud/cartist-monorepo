import { generateId } from "@/shared/utils/generate-id";
import { simulateLatency } from "@/shared/utils/simulate-latency";

import type { AuthUser, ForgotPasswordInput, SignInInput, SignUpInput } from "../types/auth.types";

/**
 * Mock authentication service. Every method already matches the async
 * contract a real backend call would have, so wiring up an actual API later
 * is a matter of replacing each function body with a `fetch()`/HTTP client
 * call — no changes needed in the store or components that consume this.
 */
export const authService = {
  signIn: async (input: SignInInput): Promise<AuthUser> => {
    await simulateLatency(400);

    return {
      id: generateId(),
      name: input.email.split("@")[0] ?? "User",
      email: input.email,
    };
  },

  signUp: async (input: SignUpInput): Promise<AuthUser> => {
    await simulateLatency(400);

    return {
      id: generateId(),
      name: input.name,
      email: input.email,
    };
  },

  forgotPassword: async (_input: ForgotPasswordInput): Promise<void> => {
    await simulateLatency(400);
  },

  signOut: async (): Promise<void> => {
    await simulateLatency(150);
  },
};
