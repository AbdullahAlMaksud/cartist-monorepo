export const ROUTES = {
  HOME: "/",
  SIGN_IN: "/signin",
  SIGN_UP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  LISTS: "/lists",
  LIST_DETAILS: (listId: string): string => `/lists/${listId}`,
  SETTINGS: "/settings",
} as const;
