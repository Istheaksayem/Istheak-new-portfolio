"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { profile } from "@/data/profile";
import { getChatSocket } from "@/lib/socket-client";

type ChatMsg = {
  role: "visitor" | "admin";
  text: string;
  name?: string;
  createdAt?: string;
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);
  const [available] = useState(!!process.env.NEXT_PUBLIC_SOCKET_URL);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !available) return;
    let socket;
    try {
      socket = getChatSocket("visitor");
    } catch {
      return;
    }
    if (!socket.connected) socket.connect();

    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);
    const onVisitorMsg = (m: ChatMsg) =>
      setMessages((prev) => [...prev, { ...m, role: "visitor" }]);
    const onReply = (m: ChatMsg) =>
      setMessages((prev) => [...prev, { ...m, role: "admin" }]);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("visitor:message", onVisitorMsg);
    socket.on("visitor:reply", onReply);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConnected(socket.connected);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("visitor:message", onVisitorMsg);
      socket.off("visitor:reply", onReply);
    };
  }, [open, available]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, open]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    try {
      const socket = getChatSocket("visitor");
      socket.emit("visitor:message", { name: "Visitor", text });
      setInput("");
    } catch {
      /* socket unavailable */
    }
  };

  return (
    <>
      {/* Collapsed launcher */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(true)}
            data-cursor="link"
            className="glass fixed bottom-6 right-6 z-[60] flex items-center gap-3 rounded-full py-2.5 pl-3 pr-5 text-left shadow-glow"
            aria-label="Open chat"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-secondary" />
            </span>
            <span className="leading-tight">
              <span className="block text-xs font-medium text-muted-foreground">
                Available for work
              </span>
              <span className="block text-sm font-semibold">
                Let&apos;s talk
              </span>
            </span>
            <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="glass fixed bottom-6 right-6 z-[70] flex h-[28rem] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-2xl shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${connected ? "bg-secondary" : "bg-muted-foreground"}`} />
                <span className="text-sm font-semibold">Let&apos;s talk</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Close chat"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {available ? (
              <>
                <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                  {messages.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      Have a project? Tell me about it — I&apos;ll get back to you.
                    </p>
                  )}
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={`flex ${m.role === "visitor" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm ${
                          m.role === "visitor"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 border-t border-border/60 p-3">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send()}
                    placeholder="Type a message…"
                    className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                  />
                  <button
                    onClick={send}
                    data-cursor="link"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background transition-all hover:shadow-glow"
                    aria-label="Send"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Live chat isn&apos;t configured in this environment. Reach me directly:
                </p>
                <a
                  href={`mailto:${profile.socials.email}`}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-all hover:shadow-glow"
                >
                  {profile.socials.email}
                </a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
