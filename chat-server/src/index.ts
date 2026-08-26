import { createServer } from "http";
import { Server, type Socket } from "socket.io";
import dotenv from "dotenv";
import { verifyAdminToken } from "./adminAuth";
import {
  getOrCreateConversation,
  addMessage,
  getMessages,
  listConversations,
  markRead,
} from "./store";

dotenv.config();

const PORT = Number(process.env.PORT || 3001);
const origins = (process.env.CLIENT_ORIGIN || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const httpServer = createServer((_req, res) => {
  res.writeHead(200, { "content-type": "text/plain" });
  res.end("chat server ok");
});

const io = new Server(httpServer, {
  cors: {
    origin: origins.length ? origins : true,
    methods: ["GET", "POST"],
  },
});

const MAX_LEN = 2000;
const RATE_MS = 250;
const rate = new Map<string, number>();

function rateLimited(socket: Socket): boolean {
  const now = Date.now();
  const last = rate.get(socket.id) ?? 0;
  if (now - last < RATE_MS) return true;
  rate.set(socket.id, now);
  return false;
}

function str(v: unknown): string {
  return typeof v === "string" ? v : "";
}

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

type Ack = (response: unknown) => void;

io.on("connection", (socket: Socket) => {
  socket.data.role = "anon";
  socket.data.conversationId = null;

  socket.on("visitor:identify", async (payload: unknown, ack?: Ack) => {
    try {
      const p = (payload ?? {}) as Record<string, unknown>;
      const name = str(p.name).trim();
      const email = str(p.email).trim();
      const conversationId = p.conversationId ? str(p.conversationId) : undefined;
      if (!name || name.length < 2 || !isEmail(email)) {
        ack?.({ error: "Invalid identity" });
        return;
      }
      const conv = await getOrCreateConversation(conversationId, name, email);
      socket.data.role = "visitor";
      socket.data.conversationId = conv.conversationId;
      socket.join(`conv:${conv.conversationId}`);
      const messages = await getMessages(conv.conversationId);
      ack?.({ conversationId: conv.conversationId, messages });
    } catch (e) {
      console.error("[chat] visitor:identify error", e);
      ack?.({ error: "Server error" });
    }
  });

  socket.on("visitor:message", async (payload: unknown) => {
    try {
      if (socket.data.role !== "visitor" || !socket.data.conversationId) return;
      if (rateLimited(socket)) return;
      const text = str((payload as Record<string, unknown>)?.text).trim().slice(0, MAX_LEN);
      if (!text) return;
      const id = socket.data.conversationId;
      const msg = await addMessage(id, "visitor", text);
      io.to(`conv:${id}`).emit("message:new", { message: msg });
      io.to("admin").emit("message:new", { message: msg });
      io.to("admin").emit("admin:conversations", { conversations: await listConversations() });
    } catch (e) {
      console.error("[chat] visitor:message error", e);
    }
  });

  socket.on("visitor:typing", (payload: unknown) => {
    if (socket.data.role !== "visitor" || !socket.data.conversationId) return;
    socket.to("admin").emit("visitor:typing", {
      conversationId: socket.data.conversationId,
      typing: !!(payload as Record<string, unknown>)?.typing,
    });
  });

  socket.on("admin:auth", async (payload: unknown, ack?: Ack) => {
    const token = str((payload as Record<string, unknown>)?.token);
    if (!verifyAdminToken(token)) {
      ack?.({ ok: false });
      return;
    }
    socket.data.role = "admin";
    socket.join("admin");
    const conversations = await listConversations();
    ack?.({ ok: true });
    socket.emit("admin:conversations", { conversations });
  });

  socket.on("admin:open", async (payload: unknown) => {
    if (socket.data.role !== "admin") return;
    const conversationId = str((payload as Record<string, unknown>)?.conversationId);
    if (!conversationId) return;
    socket.join(`conv:${conversationId}`);
    const messages = await getMessages(conversationId);
    await markRead(conversationId);
    socket.emit("conversation:messages", { conversationId, messages });
    socket.emit("admin:conversations", { conversations: await listConversations() });
  });

  socket.on("admin:message", async (payload: unknown) => {
    try {
      if (socket.data.role !== "admin") return;
      if (rateLimited(socket)) return;
      const p = payload as Record<string, unknown>;
      const conversationId = str(p.conversationId);
      const text = str(p.text).trim().slice(0, MAX_LEN);
      if (!conversationId || !text) return;
      const msg = await addMessage(conversationId, "admin", text);
      io.to(`conv:${conversationId}`).emit("message:new", { message: msg });
      io.to("admin").emit("message:new", { message: msg });
      io.to("admin").emit("admin:conversations", { conversations: await listConversations() });
    } catch (e) {
      console.error("[chat] admin:message error", e);
    }
  });

  socket.on("admin:typing", (payload: unknown) => {
    if (socket.data.role !== "admin") return;
    const p = payload as Record<string, unknown>;
    const conversationId = str(p.conversationId);
    if (!conversationId) return;
    io.to(`conv:${conversationId}`).emit("admin:typing", { typing: !!p.typing });
  });

  socket.on("disconnect", () => {
    rate.delete(socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`[chat] listening on :${PORT}`);
});
