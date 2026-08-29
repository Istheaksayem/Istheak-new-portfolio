"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { profile } from "@/data/profile";
import { SectionBackground } from "@/components/ui/SectionBackground";

const HEADLINE = ["BUILDING", "DIGITAL", "EXPERIENCES."];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });

  // 3D tilt for the developer card
  const rotX = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const rotY = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });

  // Smooth mouse-following ambient glow (Motion springs — only tick on change)
  const mx = useSpring(useMotionValue(50), {
    stiffness: 55,
    damping: 20,
    restDelta: 0.01,
  });
  const my = useSpring(useMotionValue(28), {
    stiffness: 55,
    damping: 20,
    restDelta: 0.01,
  });
  const mxPct = useTransform(mx, (v) => `${v}%`);
  const myPct = useTransform(my, (v) => `${v}%`);

  const onSectionMove = (e: React.MouseEvent) => {
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  const onCardMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setPointer({ x: px, y: py });
    rotY.set((px - 0.5) * 14);
    rotX.set(-(py - 0.5) * 14);
  };

  const onCardLeave = () => {
    rotX.set(0);
    rotY.set(0);
    setPointer({ x: 0.5, y: 0.5 });
  };

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: Element, o?: object) => void } }).lenis;
    if (lenis && el) lenis.scrollTo(el, { offset: -80 });
    else el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      onMouseMove={onSectionMove}
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16 sm:pt-24"
    >
      {/* ── Interactive background ── */}
      <SectionBackground variant="hero" />
      {/* mouse-following glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={
          {
            "--mx": mxPct,
            "--my": myPct,
            background:
              "radial-gradient(420px circle at var(--mx) var(--my), var(--aurora-indigo-soft), transparent 60%)",
          } as unknown as React.CSSProperties
        }
      />

      <div className="container-fluid mx-auto grid w-full items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        {/* LEFT */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
            </span>
            <span className="text-xs font-medium tracking-wide text-muted-foreground">
              Available for work
            </span>
          </motion.div>

          <h1 className="font-display text-[clamp(2.75rem,13vw,7.5rem)] font-bold leading-[0.92] tracking-tight">
            {HEADLINE.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.15 + i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`block ${i === 2 ? "text-gradient" : ""}`}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            I&apos;m{" "}
            <span className="font-medium text-foreground">
              {profile.name}
            </span>{" "}
            — a MERN Stack / Full-Stack Developer focused on building modern,
            scalable and engaging web applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => scrollTo("#projects")}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-7 text-sm font-medium text-background transition-all hover:shadow-glow"
            >
              Explore My Work
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border px-7 text-sm font-medium transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
            >
              Let&apos;s Talk
            </button>
          </motion.div>
        </div>

        {/* RIGHT — Developer card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex justify-center lg:justify-end"
        >
          <motion.div
            ref={cardRef}
            onMouseMove={onCardMove}
            onMouseLeave={onCardLeave}
            style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1000 }}
            className="glass relative w-full max-w-sm rounded-3xl p-7 shadow-glow"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            {/* glow following cursor inside card */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{
                background: `radial-gradient(220px circle at ${pointer.x * 100}% ${
                  pointer.y * 100
                }%, rgba(99,102,241,0.18), transparent 65%)`,
              }}
            />

            <div className="relative flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl ring-1 ring-border">
                <Image
                  src={profile.image}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div>
                <p className="font-mono text-xs text-primary">&lt; ISTHEAK /&gt;</p>
                <p className="text-lg font-semibold">Full Stack Developer</p>
              </div>
            </div>

            <div className="relative mt-6 space-y-2.5">
              {["Next.js", "React", "Node.js", "MongoDB", "TypeScript"].map(
                (tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    {tech}
                  </div>
                ),
              )}
            </div>

            <div className="relative mt-6 flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-2 text-xs font-medium text-secondary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
              </span>
              Available for work
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground"
        >
          <span>Scroll</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
