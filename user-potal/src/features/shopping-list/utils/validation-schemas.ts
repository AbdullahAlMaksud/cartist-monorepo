import { z } from "zod";

import { FORM_LIMITS } from "@/shared/constants/app";

/**
 * Schema factories accept i18next's `t` so validation messages are already
 * translated strings by the time React Hook Form renders them — no second
 * translation pass needed at display time.
 */
type Translate = (key: string, options?: Record<string, unknown>) => string;

export const createListFormSchema = (t: Translate) =>
  z.object({
    title: z
      .string()
      .trim()
      .min(FORM_LIMITS.LIST_TITLE_MIN, t("validation.required"))
      .max(FORM_LIMITS.LIST_TITLE_MAX, t("validation.maxLength", { count: FORM_LIMITS.LIST_TITLE_MAX })),
  });

export type ListFormValues = z.infer<ReturnType<typeof createListFormSchema>>;

export const createItemFormSchema = (t: Translate) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(FORM_LIMITS.PRODUCT_NAME_MIN, t("validation.required"))
      .max(
        FORM_LIMITS.PRODUCT_NAME_MAX,
        t("validation.maxLength", { count: FORM_LIMITS.PRODUCT_NAME_MAX })
      ),
    quantity: z
      .string()
      .trim()
      .min(1, t("validation.required"))
      .max(FORM_LIMITS.QUANTITY_MAX, t("validation.maxLength", { count: FORM_LIMITS.QUANTITY_MAX })),
    price: z
      .string()
      .trim()
      .min(1, t("validation.required"))
      .refine((value) => !Number.isNaN(Number(value)), t("validation.priceMin"))
      .refine((value) => Number(value) >= FORM_LIMITS.PRICE_MIN, t("validation.priceMin"))
      .refine((value) => Number(value) <= FORM_LIMITS.PRICE_MAX, t("validation.priceMax")),
  });

export type ItemFormValues = z.infer<ReturnType<typeof createItemFormSchema>>;
