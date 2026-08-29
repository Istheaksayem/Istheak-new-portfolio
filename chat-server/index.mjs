import { createServer } from "node:http";
import { Server } from "socket.io";
import { MongoClient } from "mongodb";

const PORT = Number(process.env.CHAT_PORT ?? 3001);
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin";
const MONGODB_URI = process.env.MONGODB_URI ?? "";

const httpServer = createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }
  res.writeHead(404);
  res.end();
});

const io = new Server(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

// ── MongoDB (optional persistence) ──────────────────────────────────────
let coll = null;
if (MONGODB_URI) {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    coll = client.db("portfolio").collection("chat_messages");
    console.log("[chat] Connected to MongoDB");
  } catch (err) {
    console.error("[chat] MongoDB connection failed:", err.message);
  }
}

let latestVisitor = null;

function persist(msg) {
  if (coll) coll.insertOne(msg).catch(() => {});
}

io.on("connection", (socket) => {
  // ── Visitor → server ──
  socket.on("visitor:message", (payload = {}) => {
    const { name = "Visitor", email = "", text = "" } = payload;
    if (!text.trim()) return;
    latestVisitor = socket.id;
    const msg = {
      role: "visitor",
      name,
      email,
      text: text.trim(),
      createdAt: new Date().toISOString(),
      socketId: socket.id,
    };
    persist(msg);
    io.to("admin").emit("admin:message", msg);
    socket.emit("visitor:message", msg);
  });

  // ── Admin auth ──
  socket.on("admin:auth", async (payload = {}) => {
    if (payload.password !== ADMIN_PASSWORD) {
      socket.emit("admin:auth", { ok: false });
      return;
    }
    socket.join("admin");
    socket.emit("admin:auth", { ok: true });
    if (coll) {
      const history = await coll
        .find({})
        .sort({ createdAt: 1 })
        .limit(200)
        .toArray();
      socket.emit("admin:history", history);
    }
    console.log("[chat] Admin connected");
  });

  // ── Admin → visitor reply ──
  socket.on("admin:reply", (payload = {}) => {
    const text = (payload.text ?? "").trim();
    if (!text) return;
    const msg = {
      role: "admin",
      text,
      createdAt: new Date().toISOString(),
      to: payload.to ?? latestVisitor,
    };
    persist(msg);
    io.to("admin").emit("admin:message", msg);
    if (msg.to) io.to(msg.to).emit("visitor:reply", msg);
  });

  socket.on("disconnect", () => {
    if (socket.id === latestVisitor) latestVisitor = null;
  });
});

httpServer.listen(PORT, () => {
  console.log(`[chat] Socket server listening on http://localhost:${PORT}`);
});
