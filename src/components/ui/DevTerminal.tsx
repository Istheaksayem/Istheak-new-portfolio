"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { profile } from "@/data/profile";
import { techStack } from "@/data/skills";
import { projects } from "@/data/projects";

type Line = { kind: "input" | "output" | "error"; text: string };

const BANNER = [
  "Istheak Ahmed Sayem — interactive portfolio terminal",
  "Type 'help' to see available commands.",
];

export function DevTerminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(
    BANNER.map((t) => ({ kind: "output", text: t })),
  );
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [, setHistIdx] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines, open]);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      return true;
    }
    return false;
  };

  const run = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setHistory((h) => [raw, ...h]);
    setHistIdx(-1);

    const out: Line[] = [{ kind: "input", text: raw }];
    const push = (text: string, kind: Line["kind"] = "output") =>
      out.push({ kind, text });

    switch (cmd) {
      case "help":
        push("Available commands:");
        push("  about      — who I am");
        push("  skills     — my tech stack");
        push("  projects   — things I've built");
        push("  experience — my journey");
        push("  education  — academic background");
        push("  services   — what I offer");
        push("  contact    — get in touch");
        push("  social     — my profiles");
        push("  resume     — open my resume");
        push("  clear      — clear the screen");
        break;
      case "about":
        push(profile.name);
        push(profile.title);
        profile.bio.forEach((p) => push(p));
        if (scrollTo("#about")) push("→ Scrolled to About section.");
        break;
      case "skills":
        push("Core tech stack:");
        push("  " + techStack.join("  ·  "));
        if (scrollTo("#skills")) push("→ Scrolled to Skills section.");
        break;
      case "projects":
        push(`Featured projects (${projects.length}):`);
        projects.forEach((p, i) => push(`  ${i + 1}. ${p.title}`));
        if (scrollTo("#projects")) push("→ Scrolled to Projects section.");
        break;
      case "experience":
        push("Scrolling to my Experience / Journey…");
        if (!scrollTo("#experience")) push("Section not found.", "error");
        break;
      case "education":
        push("Scrolling to my Education…");
        if (!scrollTo("#education")) push("Section not found.", "error");
        break;
      case "services":
        push("Scrolling to Services…");
        if (!scrollTo("#services")) push("Section not found.", "error");
        break;
      case "contact":
        push("Opening the contact form…");
        if (!scrollTo("#contact")) push("Section not found.", "error");
        break;
      case "social":
        push("GitHub    — " + profile.socials.github);
        push("LinkedIn  — " + profile.socials.linkedin);
        push("Facebook  — " + profile.socials.facebook);
        push("Email     — " + profile.socials.email);
        break;
      case "resume":
        push("Opening resume…");
        window.open(profile.resumeUrl, "_blank", "noopener,noreferrer");
        break;
      case "clear":
        setLines([]);
        return;
      default:
        push(`command not found: ${cmd}`, "error");
        push("Type 'help' for a list of commands.");
    }

    setLines((prev) => [...prev, ...out]);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistIdx((idx) => {
        const next = Math.min(idx + 1, history.length - 1);
        if (history[next]) setInput(history[next]);
        return next;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistIdx((idx) => {
        const next = Math.max(idx - 1, -1);
        setInput(next === -1 ? "" : history[next] ?? "");
        return next;
      });
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 left-6 z-[60] flex items-center gap-2 rounded-full border border-border/60 bg-card/90 px-4 py-2.5 text-xs font-medium text-muted-foreground shadow-soft backdrop-blur-xl transition-all hover:border-primary/40 hover:text-primary"
        aria-label="Open portfolio terminal"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25M9.75 12h6M17.25 6v12" />
        </svg>
        <span className="font-mono">~ dev</span>
        <kbd className="ml-1 hidden rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] sm:inline">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed bottom-20 left-6 z-[70] w-[calc(100vw-3rem)] max-w-xl overflow-hidden rounded-2xl border border-border/70 bg-card/95 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                <span className="h-3 w-3 rounded-full bg-green-400/80" />
                <span className="ml-2 font-mono text-xs text-muted-foreground">
                  istheak@portfolio: ~
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded p-1 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Close terminal"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div
              ref={scrollRef}
              className="h-64 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed"
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.kind === "input"
                      ? "text-foreground"
                      : line.kind === "error"
                        ? "text-red-400"
                        : "text-muted-foreground"
                  }
                >
                  {line.kind === "input" ? (
                    <span>
                      <span className="text-secondary">❯</span> {line.text}
                    </span>
                  ) : (
                    line.text
                  )}
                </div>
              ))}

              <div className="flex items-center gap-2 text-foreground">
                <span className="text-secondary">❯</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  className="flex-1 bg-transparent font-mono text-[13px] text-foreground outline-none placeholder:text-muted-foreground/50"
                  placeholder="type a command…"
                />
                <span className="h-4 w-2 animate-blink bg-secondary" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
