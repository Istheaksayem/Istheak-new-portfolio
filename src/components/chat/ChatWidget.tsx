"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { getChatSocket } from "@/lib/socket-client";
import type { ChatMessage } from "@/lib/chat-types";

const LS_CONV = "chat:conversationId";
const LS_NAME = "chat:name";
const LS_EMAIL = "chat:email";

function validateName(v: string) {
  return v.trim().length >= 2;
}

function validateEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"intro" | "chat">("intro");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [connected, setConnected] = useState(false);
  const [adminTyping, setAdminTyping] = useState(false);

  const conversationIdRef = useRef<string | null>(null);
  const socketRef = useRef<ReturnType<typeof getChatSocket> | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const configured = !!process.env.NEXT_PUBLIC_SOCKET_URL;

  const identify = useCallback(() => {
    const socket = socketRef.current;
    if (!socket) return;
    socket.emit(
      "visitor:identify",
      {
        conversationId: conversationIdRef.current,
        name: localStorage.getItem(LS_NAME),
        email: localStorage.getItem(LS_EMAIL),
      },
      (res: { conversationId?: string; messages?: ChatMessage[]; error?: string }) => {
        if (res?.conversationId) {
          conversationIdRef.current = res.conversationId;
          localStorage.setItem(LS_CONV, res.conversationId);
          setMessages(res.messages ?? []);
          setStep("chat");
        }
      }
    );
  }, []);

  const setupSocket = useCallback(() => {
    if (socketRef.current) return;
    const socket = getChatSocket("visitor");
    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);
      identify();
    });
    socket.on("disconnect", () => setConnected(false));
    socket.on("message:new", (payload: { message: ChatMessage }) => {
      if (payload.message.conversationId === conversationIdRef.current) {
        setMessages((prev) => [...prev, payload.message]);
      }
    });
    socket.on("admin:typing", (payload: { typing: boolean }) => {
      setAdminTyping(!!payload.typing);
    });

    socket.connect();
  }, [identify]);

  const handleStart = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const errs: { name?: string; email?: string } = {};
      if (!configured) {
        setErrors({ email: "Chat is not configured." });
        return;
      }
      if (!validateName(name)) errs.name = "Name must be at least 2 characters.";
      if (!validateEmail(email)) errs.email = "Please enter a valid email address.";
      setErrors(errs);
      if (Object.keys(errs).length) return;
      localStorage.setItem(LS_NAME, name.trim());
      localStorage.setItem(LS_EMAIL, email.trim());
      setupSocket();
    },
    [name, email, setupSocket, configured]
  );

  const sendMessage = useCallback(() => {
    const text = draft.trim();
    if (!text || !socketRef.current || !conversationIdRef.current) return;
    socketRef.current.emit("visitor:message", { text });
    setDraft("");
  }, [draft]);

  const onDraftChange = (value: string) => {
    setDraft(value);
    const socket = socketRef.current;
    if (socket && conversationIdRef.current) {
      socket.emit("visitor:typing", { typing: value.length > 0 });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, adminTyping, open]);

  useEffect(() => {
    if (!adminTyping) return;
    const t = setTimeout(() => setAdminTyping(false), 2500);
    return () => clearTimeout(t);
  }, [adminTyping]);

  const toggleOpen = () => {
    const next = !open;
    if (next) {
      const c = localStorage.getItem(LS_CONV);
      const n = localStorage.getItem(LS_NAME);
      const e = localStorage.getItem(LS_EMAIL);
      if (c && n && e && configured) {
        conversationIdRef.current = c;
        setName(n);
        setEmail(e);
        setStep("chat");
        setupSocket();
      }
    }
    setOpen(next);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="flex h-[520px] max-h-[80vh] w-[360px] max-w-[92vw] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            <div className="flex items-center justify-between gap-3 border-b border-border bg-gradient-to-r from-primary/10 to-transparent px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h5m-9 6l3.5-3.5H18a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className={`absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-card ${connected ? "bg-emerald-500" : "bg-amber-500"}`} />
                </span>
                <div>
                  <p className="text-sm font-semibold leading-tight">Chat with Istheak</p>
                  <p className="text-[11px] text-muted-foreground">
                    {connected ? "Online" : "Connecting…"}
                  </p>
                </div>
              </div>
              <button
                onClick={toggleOpen}
                aria-label="Close chat"
                className="rounded-lg p-1.5 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {step === "intro" ? (
              <form onSubmit={handleStart} className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
                <p className="text-sm text-muted-foreground">
                  Hey! Drop your details and a message — I&apos;ll reply right here.
                </p>
                <div className="space-y-1.5">
                  <label htmlFor="chat-name" className="text-xs font-medium">Name</label>
                  <input
                    id="chat-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/10 ${errors.name ? "border-red-500" : "border-border focus:border-primary"}`}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="chat-email" className="text-xs font-medium">Email</label>
                  <input
                    id="chat-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/10 ${errors.email ? "border-red-500" : "border-border focus:border-primary"}`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>
                <button
                  type="submit"
                  className="mt-auto inline-flex h-11 items-center justify-center rounded-full bg-foreground text-sm font-medium text-background transition-all hover:shadow-glow"
                >
                  Start chat
                </button>
              </form>
            ) : (
              <>
                <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
                  {messages.length === 0 && (
                    <p className="mt-8 text-center text-sm text-muted-foreground">
                      Say hello! Your messages will appear here.
                    </p>
                  )}
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${m.sender === "visitor" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm ${
                          m.sender === "visitor"
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
                  {adminTyping && (
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

                <div className="flex items-end gap-2 border-t border-border p-3">
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
                    placeholder="Type a message…"
                    className="max-h-28 flex-1 resize-none rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!draft.trim()}
                    aria-label="Send message"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:opacity-90 disabled:opacity-40"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3 21l9-9 9 9-3-9-3-6-3 6-3 0z" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? "Close chat" : "Open chat"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow transition-all hover:shadow-lg"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.svg key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h5m-9 6l3.5-3.5H18a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
