"use client";

import { useEffect, useRef, useState } from "react";
import { getChatSocket } from "@/lib/socket-client";

type ChatMsg = {
  role: "visitor" | "admin";
  name?: string;
  text: string;
  createdAt?: string;
};

export default function AdminChatPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [reply, setReply] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!authed) return;
    let socket;
    try {
      socket = getChatSocket("admin");
    } catch {
      return;
    }
    if (!socket.connected) socket.connect();

    const onAuth = (m: { ok: boolean }) => {
      if (!m.ok) {
        setAuthed(false);
        alert("Incorrect password");
      }
    };
    const onHistory = (h: ChatMsg[]) => setMessages(h);
    const onMessage = (m: ChatMsg) => setMessages((p) => [...p, m]);

    socket.on("admin:auth", onAuth);
    socket.on("admin:history", onHistory);
    socket.on("admin:message", onMessage);
    socket.emit("admin:auth", { password });

    return () => {
      socket.off("admin:auth", onAuth);
      socket.off("admin:history", onHistory);
      socket.off("admin:message", onMessage);
    };
  }, [authed, password]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  const sendReply = () => {
    const text = reply.trim();
    if (!text) return;
    try {
      getChatSocket("admin").emit("admin:reply", { text });
      setReply("");
    } catch {
      /* noop */
    }
  };

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setAuthed(true);
          }}
          className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-soft"
        >
          <h1 className="mb-1 font-display text-2xl font-bold">Chat Admin</h1>
          <p className="mb-6 text-sm text-muted-foreground">
            Enter the admin password to view messages.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-all hover:shadow-glow"
          >
            Enter
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-6 font-display text-2xl font-bold">Inbox</h1>
      <div
        ref={scrollRef}
        className="h-[60vh] space-y-3 overflow-y-auto rounded-2xl border border-border bg-card p-4"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "admin" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm ${
                m.role === "admin"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              {m.role === "visitor" && (
                <p className="mb-0.5 text-xs font-semibold text-secondary">
                  {m.name ?? "Visitor"}
                </p>
              )}
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <input
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendReply()}
          placeholder="Reply to visitor…"
          className="flex-1 rounded-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
        />
        <button
          onClick={sendReply}
          className="inline-flex h-11 items-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-all hover:shadow-glow"
        >
          Send
        </button>
      </div>
    </main>
  );
}
