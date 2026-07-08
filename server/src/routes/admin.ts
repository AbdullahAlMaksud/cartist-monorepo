import { Hono } from "hono";
import { authMiddleware, HonoEnv } from "../middleware/auth";
import { Note } from "../models/Note";
import { getMongoDb } from "../db";

export const adminRouter = new Hono<HonoEnv>();

// Protect all admin routes: must be authenticated and have the 'admin' role
adminRouter.use("*", authMiddleware);
adminRouter.use("*", async (c, next) => {
  const user = c.get("user");
  if (user?.role !== "admin") {
    return c.json({ error: "Forbidden - Administrative access required" }, 403);
  }
  await next();
});

// 1. GET /api/admin/notes: Retrieve all notes in the system
adminRouter.get("/notes", async (c) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    return c.json(notes);
  } catch (error) {
    console.error("Admin fetch notes error:", error);
    return c.json({ error: "Failed to retrieve notes" }, 500);
  }
});

// 2. GET /api/admin/users: Retrieve all users from the database
adminRouter.get("/users", async (c) => {
  try {
    const db = getMongoDb();
    
    // Better Auth stores users in the 'user' collection
    const users = await db.collection("user").find().toArray();
    
    // Sanitize users (remove passwords if they exist in the object)
    const sanitizedUsers = users.map(user => {
      const { password, ...rest } = user;
      return rest;
    });
    
    return c.json(sanitizedUsers);
  } catch (error) {
    console.error("Admin fetch users error:", error);
    return c.json({ error: "Failed to retrieve users" }, 500);
  }
});

// 3. DELETE /api/admin/users/:id: Delete a user and all their notes
adminRouter.delete("/users/:id", async (c) => {
  try {
    const userId = c.req.param("id");
    const db = getMongoDb();
    
    // Verify user exists in collection
    // Better Auth MongoDB uses the string id as '_id'
    const userExists = await db.collection("user").findOne({ _id: userId });
    
    if (!userExists) {
      return c.json({ error: "User not found" }, 404);
    }
    
    // Delete the user from 'user' collection
    await db.collection("user").deleteOne({ _id: userId });
    
    // Delete all notes owned by this user
    const notesDeletion = await Note.deleteMany({ userId });
    
    return c.json({ 
      message: "User and associated notes deleted successfully",
      deletedNotesCount: notesDeletion.deletedCount
    });
  } catch (error) {
    console.error("Admin delete user error:", error);
    return c.json({ error: "Failed to delete user" }, 500);
  }
});
