import { Schema, model, Document } from "mongoose";

export interface INote extends Document {
  title: string;
  content: string;
  userId: string;
  sharedWith: string[];
  isPublic: boolean;
  shareToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema<INote>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: String, required: true, index: true },
    sharedWith: { type: [String], default: [], index: true },
    isPublic: { type: Boolean, default: false },
    shareToken: { type: String, unique: true, sparse: true, index: true },
  },
  { timestamps: true }
);

export const Note = model<INote>("Note", NoteSchema);
