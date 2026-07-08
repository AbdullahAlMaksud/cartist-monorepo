import { z } from "zod";

import { FORM_LIMITS } from "@/shared/constants/app";

type Translate = (key: string, options?: Record<string, unknown>) => string;

export const createSignInSchema = (t: Translate) =>
  z.object({
    email: z.string().trim().min(1, t("validation.required")).email(t("validation.invalidEmail")),
    password: z
      .string()
      .min(FORM_LIMITS.PASSWORD_MIN, t("validation.minLength", { count: FORM_LIMITS.PASSWORD_MIN })),
  });

export type SignInFormValues = z.infer<ReturnType<typeof createSignInSchema>>;

export const createSignUpSchema = (t: Translate) =>
  z
    .object({
      name: z.string().trim().min(1, t("validation.required")),
      email: z.string().trim().min(1, t("validation.required")).email(t("validation.invalidEmail")),
      password: z
        .string()
        .min(FORM_LIMITS.PASSWORD_MIN, t("validation.minLength", { count: FORM_LIMITS.PASSWORD_MIN })),
      confirmPassword: z.string().min(1, t("validation.required")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("validation.passwordMismatch"),
      path: ["confirmPassword"],
    });

export type SignUpFormValues = z.infer<ReturnType<typeof createSignUpSchema>>;

export const createForgotPasswordSchema = (t: Translate) =>
  z.object({
    email: z.string().trim().min(1, t("validation.required")).email(t("validation.invalidEmail")),
  });

export type ForgotPasswordFormValues = z.infer<ReturnType<typeof createForgotPasswordSchema>>;
