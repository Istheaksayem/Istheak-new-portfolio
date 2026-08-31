import { MongoClient } from "mongodb";

let cachedClient: MongoClient | null = null;

export async function getMongoClient(): Promise<MongoClient> {
  if (cachedClient) return cachedClient;
  const uri = process.env.MONGODB_URI!;
  cachedClient = new MongoClient(uri);
  await cachedClient.connect();
  return cachedClient;
}
