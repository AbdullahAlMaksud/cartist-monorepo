export const APP_CONFIG = {
  NAME: "Cartist",
  NAME_BN: "কার্টিস্ট",
  DESCRIPTION: "A modern, fast shopping list manager for your everyday bazaar.",
  DESCRIPTION_BN: "আপনার প্রতিদিনের বাজারের জন্য একটি আধুনিক শপিং লিস্ট ম্যানেজার।",
  URL: "https://cartist.app",
  DEFAULT_LOCALE: "bn",
} as const;

export const FORM_LIMITS = {
  LIST_TITLE_MIN: 1,
  LIST_TITLE_MAX: 60,
  PRODUCT_NAME_MIN: 1,
  PRODUCT_NAME_MAX: 80,
  QUANTITY_MAX: 20,
  PRICE_MIN: 0,
  PRICE_MAX: 10_000_000,
  PASSWORD_MIN: 8,
} as const;

export const DEBOUNCE_DELAY_MS = 250;
export const TOAST_DURATION_MS = 3000;
