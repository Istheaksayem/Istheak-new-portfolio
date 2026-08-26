import { MongoClient, Db, ObjectId } from "mongodb";
import { randomUUID } from "crypto";
import type { ChatMessage, Conversation } from "./types";

let dbPromise: Promise<Db> | null = null;

function getDb(): Promise<Db> {
  if (!dbPromise) {
    const client = new MongoClient(process.env.MONGODB_URI!);
    dbPromise = client.connect().then((c) => c.db("portfolio"));
  }
  return dbPromise;
}

interface ConversationDoc {
  conversationId: string;
  visitorName: string;
  visitorEmail: string;
  status: "open" | "closed";
  unreadForAdmin: number;
  lastMessage?: string;
  lastMessageAt: Date;
  createdAt: Date;
}

interface MessageDoc {
  conversationId: string;
  sender: "visitor" | "admin";
  text: string;
  createdAt: Date;
  read: boolean;
}

export async function getOrCreateConversation(
  conversationId: string | undefined,
  name: string,
  email: string
): Promise<ConversationDoc> {
  const db = await getDb();
  const col = db.collection<ConversationDoc>("conversations");
  if (conversationId) {
    const existing = await col.findOne({ conversationId });
    if (existing) return existing;
  }
  const id = conversationId || randomUUID();
  const now = new Date();
  const doc: ConversationDoc = {
    conversationId: id,
    visitorName: name,
    visitorEmail: email,
    status: "open",
    unreadForAdmin: 0,
    lastMessageAt: now,
    createdAt: now,
  };
  await col.insertOne(doc);
  return doc;
}

export async function addMessage(
  conversationId: string,
  sender: "visitor" | "admin",
  text: string
): Promise<ChatMessage> {
  const db = await getDb();
  const msgCol = db.collection<MessageDoc>("messages");
  const now = new Date();
  const doc: MessageDoc = { conversationId, sender, text, createdAt: now, read: sender === "admin" };
  const res = await msgCol.insertOne(doc);
  const convCol = db.collection<ConversationDoc>("conversations");
  await convCol.updateOne(
    { conversationId },
    {
      $set: { lastMessage: text, lastMessageAt: now, status: "open" },
      $inc: { unreadForAdmin: sender === "visitor" ? 1 : 0 },
    }
  );
  return {
    id: res.insertedId.toString(),
    conversationId,
    sender,
    text,
    createdAt: now.toISOString(),
    read: doc.read,
  };
}

export async function getMessages(conversationId: string): Promise<ChatMessage[]> {
  const db = await getDb();
  const msgs = await db
    .collection<MessageDoc>("messages")
    .find({ conversationId })
    .sort({ createdAt: 1 })
    .toArray();
  return msgs.map((m) => ({
    id: m._id.toString(),
    conversationId: m.conversationId,
    sender: m.sender,
    text: m.text,
    createdAt: m.createdAt.toISOString(),
    read: m.read,
  }));
}

export async function getConversation(conversationId: string): Promise<ConversationDoc | null> {
  const db = await getDb();
  return await db.collection<ConversationDoc>("conversations").findOne({ conversationId });
}

export async function deleteMessage(messageId: string, conversationId: string): Promise<boolean> {
  const db = await getDb();
  const col = db.collection<MessageDoc>("messages");
  try {
    const result = await col.deleteOne({ 
      _id: new ObjectId(messageId), 
      conversationId, 
      sender: "visitor" 
    });
    return result.deletedCount === 1;
  } catch (e) {
    return false;
  }
}

export async function listConversations(): Promise<Conversation[]> {
  const db = await getDb();
  const convs = await db
    .collection<ConversationDoc>("conversations")
    .find({})
    .sort({ lastMessageAt: -1 })
    .toArray();
  return convs.map((c) => ({
    conversationId: c.conversationId,
    visitorName: c.visitorName,
    visitorEmail: c.visitorEmail,
    status: c.status,
    unreadForAdmin: c.unreadForAdmin,
    lastMessage: c.lastMessage,
    lastMessageAt: c.lastMessageAt.toISOString(),
    createdAt: c.createdAt.toISOString(),
  }));
}

export async function markRead(conversationId: string): Promise<void> {
  const db = await getDb();
  await db
    .collection<MessageDoc>("messages")
    .updateMany({ conversationId, sender: "visitor" }, { $set: { read: true } });
  await db
    .collection<ConversationDoc>("conversations")
    .updateOne({ conversationId }, { $set: { unreadForAdmin: 0 } });
}
