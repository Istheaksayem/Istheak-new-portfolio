import { createServer } from "node:http";
import { Server } from "socket.io";
import { config } from "./src/config.mjs";
import { createHttpRequestHandler } from "./src/routes/http.routes.mjs";
import { createPersistence } from "./src/services/persistence.service.mjs";
import { createAuthService } from "./src/services/auth.service.mjs";
import { registerChatController } from "./src/controllers/chat.controller.mjs";

const httpServer = createServer(createHttpRequestHandler());

const io = new Server(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

const persistence = await createPersistence();
const authService = createAuthService({ adminPassword: config.adminPassword });

registerChatController(io, { persistence, authService });

httpServer.listen(config.port, () => {
  console.log(`[chat] Socket server listening on http://localhost:${config.port}`);
});
