/**
 * Placeholder for a future HTTP client (e.g. a thin wrapper around `fetch`
 * or axios) once a real backend exists.
 *
 * Every feature currently talks to a "mock service" (see
 * `features/<feature-name>/services/<name>.service.ts`) that reads/writes through the
 * Zustand `persist` store instead of the network. Each mock service already
 * exposes the same async, Promise-based shape a real API call would have —
 * e.g. `shoppingListService.create(input)` — so migrating a feature to a
 * live backend is a matter of:
 *
 *   1. Implementing the request here, e.g.:
 *        export const apiClient = {
 *          post: <T>(path: string, body: unknown) =>
 *            fetch(`${API_BASE_URL}${path}`, {
 *              method: "POST",
 *              headers: { "Content-Type": "application/json" },
 *              body: JSON.stringify(body),
 *            }).then((res) => res.json() as Promise<T>),
 *          ...
 *        };
 *
 *   2. Replacing the body of the relevant mock service functions with calls
 *      to `apiClient`, keeping the same function signatures.
 *
 * No changes are needed in hooks, components, or the Zustand stores that
 * call these services — they only depend on the service's async contract,
 * not on how it's implemented.
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export const isBackendConfigured = (): boolean => API_BASE_URL.length > 0;
