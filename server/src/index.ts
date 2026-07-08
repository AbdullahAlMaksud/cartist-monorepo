import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import dotenv from "dotenv";
import { connectDB } from "./db";
import { auth } from "./auth";
import { notesRouter } from "./routes/notes";
import { adminRouter } from "./routes/admin";

dotenv.config();

const app = new Hono();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

// Initialize Database Connection
connectDB().then(() => {
  console.log("Database initialized");
}).catch((err) => {
  console.error("Database initialization failed:", err);
});

// Configure CORS to allow frontend connections
app.use(
  "/api/*",
  cors({
    origin: "*", // Adjust this in production to match your frontend URL
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

// Better Auth API Route
app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

// Notes Router
app.route("/api/notes", notesRouter);

// Admin Router
app.route("/api/admin", adminRouter);

// Root Hello Page
app.get("/", (c) => {
  return c.text("Cartist Monorepo Hono Server is running!");
});

// Start Server
console.log(`Starting Hono server on port ${PORT}...`);
serve({
  fetch: app.fetch,
  port: PORT,
});
