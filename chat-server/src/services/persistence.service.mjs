import { MongoClient } from "mongodb";
import { config } from "../config.mjs";

export async function createPersistence() {
  let coll = null;

  if (config.mongodbUri) {
    try {
      const client = new MongoClient(config.mongodbUri);
      await client.connect();
      coll = client.db("portfolio").collection("chat_messages");
      console.log("[chat] Connected to MongoDB");
    } catch (err) {
      console.error("[chat] MongoDB connection failed:", err.message);
    }
  }

  return {
    persist(msg) {
      if (coll) coll.insertOne(msg).catch(() => {});
    },
    async fetchHistory(limit = 200) {
      if (!coll) return [];
      return coll.find({}).sort({ createdAt: 1 }).limit(limit).toArray();
    },
  };
}
