import { buildAdminMessage, buildVisitorMessage } from "../models/message.model.mjs";

export function registerChatController(io, { persistence, authService }) {
  let latestVisitor = null;

  io.on("connection", (socket) => {
    socket.on("visitor:message", (payload = {}) => {
      const { name = "Visitor", email = "", text = "" } = payload;
      if (!text.trim()) return;
      latestVisitor = socket.id;
      const msg = buildVisitorMessage({
        name,
        email,
        text,
        socketId: socket.id,
      });
      persistence.persist(msg);
      io.to("admin").emit("admin:message", msg);
      socket.emit("visitor:message", msg);
    });

    socket.on("admin:auth", async (payload = {}) => {
      if (!authService.verify(payload.password)) {
        socket.emit("admin:auth", { ok: false });
        return;
      }
      socket.join("admin");
      socket.emit("admin:auth", { ok: true });
      const history = await persistence.fetchHistory();
      socket.emit("admin:history", history);
      console.log("[chat] Admin connected");
    });

    socket.on("admin:reply", (payload = {}) => {
      const text = (payload.text ?? "").trim();
      if (!text) return;
      const msg = buildAdminMessage({
        text,
        to: payload.to ?? latestVisitor,
      });
      persistence.persist(msg);
      io.to("admin").emit("admin:message", msg);
      if (msg.to) io.to(msg.to).emit("visitor:reply", msg);
    });

    socket.on("disconnect", () => {
      if (socket.id === latestVisitor) latestVisitor = null;
    });
  });
}
