import { Hono } from "hono";
import { authMiddleware, HonoEnv } from "../middleware/auth";
import { Note } from "../models/Note";
import crypto from "crypto";

export const notesRouter = new Hono<HonoEnv>();

// 1. PUBLIC ROUTE: Get a note by public share token
notesRouter.get("/shared/:token", async (c) => {
  try {
    const token = c.req.param("token");
    const note = await Note.findOne({ shareToken: token, isPublic: true });

    if (!note) {
      return c.json({ error: "Note not found, or public sharing has been disabled" }, 404);
    }

    return c.json({
      id: note._id,
      title: note.title,
      content: note.content,
      isPublic: note.isPublic,
      createdAt: note.createdAt,
    });
  } catch (error) {
    console.error("Fetch shared note error:", error);
    return c.json({ error: "Failed to fetch shared note" }, 500);
  }
});

// --- ALL ROUTES BELOW THIS LINE REQUIRE AUTHENTICATION ---
notesRouter.use("*", authMiddleware);

// 2. GET /api/notes: Retrieve all notes owned by or shared with current user
notesRouter.get("/", async (c) => {
  try {
    const user = c.get("user");
    const notes = await Note.find({
      $or: [{ userId: user.id }, { sharedWith: user.email }],
    }).sort({ updatedAt: -1 });

    return c.json(notes);
  } catch (error) {
    console.error("Fetch notes error:", error);
    return c.json({ error: "Failed to retrieve notes" }, 500);
  }
});

// 3. POST /api/notes: Create a new note
notesRouter.post("/", async (c) => {
  try {
    const user = c.get("user");
    const { title, content } = await c.req.json();

    if (!title || !content) {
      return c.json({ error: "Title and content are required" }, 400);
    }

    const newNote = new Note({
      title,
      content,
      userId: user.id,
      sharedWith: [],
      isPublic: false,
    });

    await newNote.save();
    return c.json(newNote, 201);
  } catch (error) {
    console.error("Create note error:", error);
    return c.json({ error: "Failed to create note" }, 500);
  }
});

// 4. GET /api/notes/:id: Fetch a specific note (must be owner or recipient)
notesRouter.get("/:id", async (c) => {
  try {
    const user = c.get("user");
    const noteId = c.req.param("id");
    const note = await Note.findById(noteId);

    if (!note) {
      return c.json({ error: "Note not found" }, 404);
    }

    const isOwner = note.userId === user.id;
    const isShared = note.sharedWith.includes(user.email);

    if (!isOwner && !isShared) {
      return c.json({ error: "Forbidden - You do not have access to this note" }, 403);
    }

    return c.json(note);
  } catch (error) {
    console.error("Fetch note error:", error);
    return c.json({ error: "Failed to retrieve note" }, 500);
  }
});

// 5. PUT /api/notes/:id: Update a note (Owner only)
notesRouter.put("/:id", async (c) => {
  try {
    const user = c.get("user");
    const noteId = c.req.param("id");
    const { title, content } = await c.req.json();

    const note = await Note.findById(noteId);

    if (!note) {
      return c.json({ error: "Note not found" }, 404);
    }

    if (note.userId !== user.id) {
      return c.json({ error: "Forbidden - Only the owner can edit this note" }, 403);
    }

    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;

    await note.save();
    return c.json(note);
  } catch (error) {
    console.error("Update note error:", error);
    return c.json({ error: "Failed to update note" }, 500);
  }
});

// 6. DELETE /api/notes/:id: Delete a note (Owner only)
notesRouter.delete("/:id", async (c) => {
  try {
    const user = c.get("user");
    const noteId = c.req.param("id");

    const note = await Note.findById(noteId);

    if (!note) {
      return c.json({ error: "Note not found" }, 404);
    }

    if (note.userId !== user.id) {
      return c.json({ error: "Forbidden - Only the owner can delete this note" }, 403);
    }

    await Note.findByIdAndDelete(noteId);
    return c.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Delete note error:", error);
    return c.json({ error: "Failed to delete note" }, 500);
  }
});

// 7. POST /api/notes/:id/share-email: Share a note with another user by email (Owner only)
notesRouter.post("/:id/share-email", async (c) => {
  try {
    const user = c.get("user");
    const noteId = c.req.param("id");
    const { email } = await c.req.json();

    if (!email) {
      return c.json({ error: "Recipient email is required" }, 400);
    }

    const note = await Note.findById(noteId);

    if (!note) {
      return c.json({ error: "Note not found" }, 404);
    }

    if (note.userId !== user.id) {
      return c.json({ error: "Forbidden - Only the owner can share this note" }, 403);
    }

    // Add to sharedWith array if not already present
    if (!note.sharedWith.includes(email)) {
      note.sharedWith.push(email);
      await note.save();
    }

    return c.json({ message: `Note shared successfully with ${email}`, note });
  } catch (error) {
    console.error("Email sharing error:", error);
    return c.json({ error: "Failed to share note via email" }, 500);
  }
});

// 8. POST /api/notes/:id/share-link: Toggle public link sharing and get share URL (Owner only)
notesRouter.post("/:id/share-link", async (c) => {
  try {
    const user = c.get("user");
    const noteId = c.req.param("id");
    const { isPublic } = await c.req.json();

    if (isPublic === undefined) {
      return c.json({ error: "isPublic boolean is required" }, 400);
    }

    const note = await Note.findById(noteId);

    if (!note) {
      return c.json({ error: "Note not found" }, 404);
    }

    if (note.userId !== user.id) {
      return c.json({ error: "Forbidden - Only the owner can toggle public sharing" }, 403);
    }

    note.isPublic = isPublic;

    if (isPublic) {
      // Generate secure token if it doesn't exist
      if (!note.shareToken) {
        note.shareToken = crypto.randomUUID();
      }
    } else {
      // Clear token when sharing is turned off
      note.shareToken = undefined;
    }

    await note.save();

    const shareUrl = isPublic
      ? `${process.env.BETTER_AUTH_URL || "http://localhost:5000"}/api/notes/shared/${note.shareToken}`
      : null;

    return c.json({
      message: isPublic ? "Public link sharing enabled" : "Public link sharing disabled",
      isPublic: note.isPublic,
      shareToken: note.shareToken,
      shareUrl,
    });
  } catch (error) {
    console.error("Link sharing error:", error);
    return c.json({ error: "Failed to toggle public link sharing" }, 500);
  }
});

// 9. POST /api/notes/shared/:token/save: Save a copy of a shared public note to owner's account
notesRouter.post("/shared/:token/save", async (c) => {
  try {
    const user = c.get("user");
    const token = c.req.param("token");

    const sharedNote = await Note.findOne({ shareToken: token, isPublic: true });

    if (!sharedNote) {
      return c.json({ error: "Shared note not found or no longer public" }, 404);
    }

    // Save a copy under the current user's ID
    const copiedNote = new Note({
      title: `${sharedNote.title} (Copy)`,
      content: sharedNote.content,
      userId: user.id,
      sharedWith: [],
      isPublic: false,
    });

    await copiedNote.save();
    return c.json({ message: "Note copy saved to your account", note: copiedNote }, 201);
  } catch (error) {
    console.error("Save shared note copy error:", error);
    return c.json({ error: "Failed to save a copy of the shared note" }, 500);
  }
});
