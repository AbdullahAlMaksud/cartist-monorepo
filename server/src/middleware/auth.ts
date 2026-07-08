import { createMiddleware } from "hono/factory";
import { auth } from "../auth";

export const authMiddleware = createMiddleware(async (c, next) => {
  try {
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });

    if (!session) {
      return c.json({ error: "Unauthorized - No active session found" }, 401);
    }

    // Attach user and session to Hono context variables
    c.set("user", session.user);
    c.set("session", session.session);

    await next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return c.json({ error: "Internal Server Error during authentication" }, 500);
  }
});
export type HonoEnv = {
  Variables: {
    user: any;
    session: any;
  };
};
