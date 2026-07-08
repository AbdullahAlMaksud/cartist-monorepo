# Cartist
A modern, fast, production-ready shopping list manager — mobile-first, bilingual (বাংলা/English), and built to plug into a real backend later without touching UI code.

## Stack

Next.js 15+ (App Router) · TypeScript (strict) · Tailwind CSS v4 · shadcn/ui-style primitives · Zustand · i18next · React Hook Form + Zod · Framer Motion · dnd-kit

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root path redirects to `/lists`.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## What's implemented

- **Shopping lists** — create / edit / delete, pin-to-top, drag-and-drop reorder (grid, via dnd-kit), search, and sort (manual / recently updated / date created / name).
- **Products inside a list** — add / edit / delete, quantity as free text (`২ কেজি`, `500g`, ...), price as a number, set status (**Buy** / **Done** / **Take Alternative**), drag-and-drop reorder, auto-calculated total shown on the list card and the detail page.
- **Themes** — 6 color themes (Emerald, Blue, Violet, Rose, Orange, Slate) × light/dark/system, switching instantly app-wide via CSS variables (`src/app/globals.css`), persisted with Zustand.
- **Language** — বাংলা / English via i18next, every string sourced from `src/i18n/locales/{bn,en}/common.json` — no hardcoded UI text.
- **Auth (placeholder)** — sign in / sign up / forgot password screens with a mock service. There is no backend yet, so this is a working preview, not real authentication — see `src/features/auth/services/auth.service.ts`.
- **Settings** — theme, mode, and language controls in one place.
- SEO (Metadata API, Open Graph, Twitter card, canonical URLs, `sitemap.ts`, `robots.ts`), keyboard-accessible drag handles, ARIA labels on icon-only buttons, skeleton loading states, and empty states throughout.

## Architecture

Feature-based, matching the brief:

```
src/
├── app/                  # routes only — (auth), (dashboard), (main) groups
├── components/
│   ├── ui/                # shadcn-style primitives (button, dialog, form, ...)
│   └── common/             # navbar, footer
├── features/
│   ├── shopping-list/      # components, hooks, services, store, types, utils
│   ├── auth/
│   ├── settings/
│   └── theme/
├── shared/                 # cross-feature hooks, lib, constants, types, utils, services
└── i18n/                   # i18next config + bn/en resource files
```

Every feature keeps business logic out of components — it lives in hooks (`use-*.ts`) or services, and components stay presentational.

### Data today: local-first, API-ready tomorrow

There's no backend yet, so all data lives in Zustand stores with the `persist` middleware (localStorage). Each feature's `*.service.ts` file (e.g. `shoppingListService`, `authService`) already exposes the same `async`/`Promise`-based contract a real API client would have. To connect a real backend later:

1. Implement `src/shared/services/api-client.ts` (a `fetch`/axios wrapper) — it's a documented stub today.
2. Swap the body of each `*.service.ts` function for a call to that client, keeping the same function signature.

No changes are needed in components, hooks, or stores — they only depend on the service's async contract, not its implementation. `src/shared/types/repository.ts` documents the shared contract shape.

### Not built yet (intentionally out of scope for this pass)

The architecture leaves room for these, but they aren't implemented: cloud sync, real login, offline sync, shared/family lists, push notifications, categories/tags, budget analytics, OCR product import, voice input.

## Notes

- Fonts (Anek Bangla, Hind Siliguri, IBM Plex Mono) are self-hosted via `@fontsource*` packages rather than `next/font/google`, so the build never depends on reaching Google's font CDN.
- Prices/quantities use a monospace ledger face as a quiet nod to the app's financial notebook vibe — Cartist, the smart ledger tool to track a day's purchases.
