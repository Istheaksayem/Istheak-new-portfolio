"use client";

import { useEffect, useRef, useState, useCallback, useSyncExternalStore } from "react";
import { getChatSocket } from "@/lib/socket-client";
import type { ChatMessage, Conversation } from "@/lib/chat-types";

const TOKEN_KEY = "admin_token";

let currentToken: string | null =
  typeof window !== "undefined" ? sessionStorage.getItem(TOKEN_KEY) : null;
const tokenListeners = new Set<() => void>();

function setSessionToken(value: string | null) {
  currentToken = value;
  if (typeof window !== "undefined") {
    if (value) sessionStorage.setItem(TOKEN_KEY, value);
    else sessionStorage.removeItem(TOKEN_KEY);
  }
  tokenListeners.forEach((l) => l());
}

const tokenStore = {
  subscribe(cb: () => void) {
    tokenListeners.add(cb);
    return () => tokenListeners.delete(cb);
  },
  getSnapshot() {
    return currentToken;
  },
  getServerSnapshot() {
    return null;
  },
};

export default function AdminChatPage() {
  const token = useSyncExternalStore(tokenStore.subscribe, tokenStore.getSnapshot, tokenStore.getServerSnapshot);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [authed, setAuthed] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);

  const socketRef = useRef<ReturnType<typeof getChatSocket> | null>(null);
  const activeIdRef = useRef<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const connect = useCallback((tk: string) => {
    const socket = getChatSocket("admin");
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("admin:auth", { token: tk }, (res: { ok?: boolean }) => {
        if (res?.ok) setAuthed(true);
        else {
          setSessionToken(null);
          setLoginError("Session expired. Please log in again.");
        }
      });
    });

    socket.on("admin:conversations", (p: { conversations: Conversation[] }) => {
      setConversations(p.conversations);
    });

    socket.on("conversation:messages", (p: { conversationId: string; messages: ChatMessage[] }) => {
      if (p.conversationId === activeIdRef.current) setMessages(p.messages);
    });

    socket.on("message:new", (p: { message: ChatMessage }) => {
      const m = p.message;
      if (m.conversationId === activeIdRef.current) {
        setMessages((prev) => [...prev, m]);
      }
    });

    socket.on("visitor:typing", (p: { conversationId: string; typing: boolean }) => {
      if (p.conversationId === activeIdRef.current) setTyping(!!p.typing);
    });

    if (!socket.connected) socket.connect();
  }, []);

  useEffect(() => {
    if (token && !authed) connect(token);
  }, [token, authed, connect]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (!typing) return;
    const t = setTimeout(() => setTyping(false), 2500);
    return () => clearTimeout(t);
  }, [typing]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.error ?? "Login failed");
        return;
      }
      setSessionToken(data.token);
    } catch {
      setLoginError("Network error");
    }
  };

  const openConversation = (id: string) => {
    activeIdRef.current = id;
    setActiveId(id);
    setTyping(false);
    setMessages([]);
    socketRef.current?.emit("admin:open", { conversationId: id });
  };

  const sendMessage = () => {
    const text = draft.trim();
    if (!text || !activeIdRef.current || !socketRef.current) return;
    socketRef.current.emit("admin:message", { conversationId: activeIdRef.current, text });
    setDraft("");
  };

  const onDraftChange = (value: string) => {
    setDraft(value);
    if (activeIdRef.current) {
      socketRef.current?.emit("admin:typing", { conversationId: activeIdRef.current, typing: value.length > 0 });
    }
  };

  const logout = () => {
    socketRef.current?.disconnect();
    socketRef.current = null;
    setSessionToken(null);
    setAuthed(false);
    setConversations([]);
    setActiveId(null);
    setMessages([]);
  };

  if (!token || !authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4 rounded-2xl border border-border bg-card p-8 shadow-sm">
          <h1 className="text-lg font-semibold">Admin Login</h1>
          <p className="text-sm text-muted-foreground">Enter the admin password to access live chats.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
          {loginError && <p className="text-xs text-red-500">{loginError}</p>}
          <button type="submit" className="inline-flex h-11 w-full items-center justify-center rounded-full bg-foreground text-sm font-medium text-background transition-all hover:shadow-glow">
            Login
          </button>
        </form>
      </main>
    );
  }

  const active = conversations.find((c) => c.conversationId === activeId);

  return (
    <main className="flex h-screen flex-col bg-background">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h1 className="text-lg font-semibold">Live Chat</h1>
          <p className="text-xs text-muted-foreground">{conversations.length} conversation(s)</p>
        </div>
        <button onClick={logout} className="rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground transition-all hover:bg-muted hover:text-foreground">
          Logout
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-72 shrink-0 overflow-y-auto border-r border-border">
          {conversations.length === 0 && (
            <p className="p-4 text-sm text-muted-foreground">No conversations yet.</p>
          )}
          {conversations.map((c) => (
            <button
              key={c.conversationId}
              onClick={() => openConversation(c.conversationId)}
              className={`flex w-full flex-col gap-1 border-b border-border/60 px-4 py-3 text-left transition-all ${
                c.conversationId === activeId ? "bg-primary/10" : "hover:bg-muted/60"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm font-medium">{c.visitorName}</span>
                {c.unreadForAdmin > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">
                    {c.unreadForAdmin}
                  </span>
                )}
              </div>
              <span className="truncate text-xs text-muted-foreground">{c.lastMessage || "No messages yet"}</span>
              <span className="text-[10px] text-muted-foreground/70">{c.visitorEmail}</span>
            </button>
          ))}
        </aside>

        <section className="flex flex-1 flex-col">
          {!active ? (
            <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
              Select a conversation to start replying.
            </div>
          ) : (
            <>
              <div className="border-b border-border px-5 py-3">
                <p className="text-sm font-semibold">{active.visitorName}</p>
                <p className="text-xs text-muted-foreground">{active.visitorEmail}</p>
              </div>

              <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-5">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.sender === "admin" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm ${
                        m.sender === "admin"
                          ? "rounded-br-sm bg-primary text-primary-foreground"
                          : "rounded-bl-sm bg-muted text-foreground"
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words">{m.text}</p>
                      <span className="mt-1 block text-[10px] opacity-60">
                        {new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl rounded-bl-sm bg-muted px-3.5 py-2.5 text-sm text-muted-foreground">
                      <span className="inline-flex gap-1">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.2s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.1s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-end gap-2 border-t border-border p-4">
                <textarea
                  value={draft}
                  onChange={(e) => onDraftChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  rows={1}
                  maxLength={2000}
                  placeholder="Reply…"
                  className="max-h-32 flex-1 resize-none rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
                <button
                  onClick={sendMessage}
                  disabled={!draft.trim()}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:opacity-90 disabled:opacity-40"
                  aria-label="Send reply"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3 21l9-9 9 9-3-9-3-6-3 6-3 0z" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
