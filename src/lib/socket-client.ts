import { io, type Socket } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_SOCKET_URL;

const sockets: Partial<Record<"visitor" | "admin", Socket>> = {};

export function getChatSocket(role: "visitor" | "admin"): Socket {
  if (!URL) {
    throw new Error("NEXT_PUBLIC_SOCKET_URL is not set");
  }
  if (!sockets[role]) {
    sockets[role] = io(URL, {
      autoConnect: false,
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 800,
      reconnectionDelayMax: 5000,
    });
  }
  return sockets[role]!;
}
