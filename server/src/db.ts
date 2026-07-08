import mongoose from "mongoose";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/cartist";

let client: MongoClient | null = null;

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB Connected via Mongoose");
    
    // Retrieve the underlying MongoClient instance
    client = mongoose.connection.getClient() as unknown as MongoClient;
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
}

export function getMongoDb() {
  if (!mongoose.connection.db) {
    throw new Error("Database not connected yet");
  }
  return mongoose.connection.db;
}

export function getMongoClient() {
  if (!client) {
    // If not connected yet, we can initialize a new Client
    client = new MongoClient(MONGODB_URI);
  }
  return client;
}
