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
    socket.on("message:deleted", (payload: { messageId: string }) => {
      setMessages((prev) => prev.filter(m => m.id !== payload.messageId));
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

  const deleteMessage = useCallback((messageId: string) => {
    if (!socketRef.current || !conversationIdRef.current) return;
    socketRef.current.emit("visitor:message:delete", { messageId });
  }, []);

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
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-border bg-card px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2">
                {step === "chat" && (
                  <button
                    onClick={() => setStep("intro")}
                    className="-ml-1 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label="Back"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}
                <div className="relative">
                  <img
                    src="/profile.jpg"
                    alt="Istheak"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-card ${
                      connected ? "bg-emerald-500" : "bg-amber-500"
                    }`}
                  />
                </div>
                <span className="text-sm font-semibold">Hi there 👋</span>
              </div>
              <button
                onClick={toggleOpen}
                aria-label="Close chat"
                className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>
            </div>

            {step === "intro" ? (
              <form onSubmit={handleStart} className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">
                <div className="mb-2 text-center">
                  <h3 className="text-lg font-semibold text-foreground">Welcome!</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Please fill out the form below to start chatting with me.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="chat-name" className="text-xs font-medium text-muted-foreground">
                    Name
                  </label>
                  <input
                    id="chat-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/20 ${
                      errors.name ? "border-red-500" : "border-border focus:border-primary"
                    }`}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="chat-email" className="text-xs font-medium text-muted-foreground">
                    Email
                  </label>
                  <input
                    id="chat-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/20 ${
                      errors.email ? "border-red-500" : "border-border focus:border-primary"
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>
                <button
                  type="submit"
                  className="mt-auto inline-flex h-11 items-center justify-center rounded-xl bg-primary text-sm font-medium text-primary-foreground shadow-glow transition-all hover:opacity-90"
                >
                  Start Chat
                </button>
              </form>
            ) : (
              <>
                <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
                  {/* Offline Welcome Message */}
                  <div className="flex justify-start">
                    <div className="flex max-w-[85%] items-start gap-2">
                      <img
                        src="/profile.jpg"
                        alt="Istheak"
                        className="mt-1 h-6 w-6 rounded-full object-cover shadow-sm"
                      />
                      <div className="rounded-2xl rounded-tl-sm bg-muted px-3.5 py-2.5 text-[13px] leading-relaxed text-foreground shadow-sm">
                        <p>
                          Hi there 👋 We are currently offline, but if you need any assistance, feel free to ask. We will reply as soon as possible.
                        </p>
                      </div>
                    </div>
                  </div>

                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${m.sender === "visitor" ? "justify-end" : "justify-start"}`}
                    >
                      {m.sender === "admin" && (
                        <img
                          src="/profile.jpg"
                          alt="Istheak"
                          className="mr-2 mt-1 h-6 w-6 rounded-full object-cover shadow-sm"
                        />
                      )}
                      <div
                        className={`group relative max-w-[80%] rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed shadow-sm ${
                          m.sender === "visitor"
                            ? "rounded-tr-sm bg-primary text-primary-foreground"
                            : "rounded-tl-sm bg-muted text-foreground"
                        }`}
                      >
                        {m.sender === "visitor" && (
                          <button
                            onClick={() => deleteMessage(m.id)}
                            className="absolute -left-8 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-red-500 opacity-0 transition-opacity hover:bg-muted group-hover:opacity-100"
                            aria-label="Delete message"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                        <p className="whitespace-pre-wrap break-words">{m.text}</p>
                        <span className="mt-1 block text-[9px] opacity-60">
                          {new Date(m.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                  {adminTyping && (
                    <div className="flex justify-start">
                      <div className="flex max-w-[80%] items-start gap-2">
                        <img
                          src="/profile.jpg"
                          alt="Istheak"
                          className="mt-1 h-6 w-6 rounded-full object-cover shadow-sm"
                        />
                        <div className="rounded-2xl rounded-tl-sm bg-muted px-3.5 py-3 text-sm text-muted-foreground shadow-sm">
                          <span className="inline-flex gap-1">
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.2s]" />
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.1s]" />
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 border-t border-border bg-card p-3 pb-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-muted-foreground transition-colors hover:text-foreground">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
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
                      placeholder="Type a message..."
                      className="max-h-24 flex-1 resize-none bg-transparent py-1.5 text-sm outline-none placeholder:text-muted-foreground"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!draft.trim()}
                      aria-label="Send message"
                      className="p-1 text-primary transition-colors hover:text-primary/80 disabled:opacity-40"
                    >
                      <svg className="h-6 w-6 -rotate-90" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-center text-[9px] font-medium tracking-wider text-muted-foreground/50 uppercase">
                    POWERED BY ISTHEAK
                  </p>
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
