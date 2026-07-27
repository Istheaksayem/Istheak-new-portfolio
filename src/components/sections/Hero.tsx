"use client";

import { motion } from "motion/react";
import { profile } from "@/data/profile";
import { SplitText } from "@/components/ui/SplitText";
import { Typewriter } from "@/components/ui/Typewriter";
import { GradientMesh } from "@/components/ui/GradientMesh";
import { FloatingBadges } from "@/components/ui/FloatingBadges";
import { MagneticButton } from "@/components/ui/MagneticButton";

const ROLES = [
  "Full-Stack Developer",
  "UI Engineer",
  "Problem Solver",
  "Creative Coder",
];

export function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative grid min-h-screen items-center overflow-hidden lg:grid-cols-2"
    >
      <GradientMesh />
      <FloatingBadges />

      <div className="relative z-10 flex flex-col justify-center px-6 py-32 lg:px-12 lg:py-0">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex items-center gap-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="text-xs font-medium tracking-wide text-muted-foreground">
            Available for work
          </span>
        </motion.div>

        <div className="mb-4 text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
          <SplitText
            text={`Hi, I'm ${profile.name}`}
            delay={0.2}
            stagger={0.04}
            as="h1"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-4 text-xl sm:text-2xl lg:text-3xl"
        >
          <Typewriter words={ROLES} typeSpeed={70} deleteSpeed={40} pauseDuration={2000} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="mb-8 max-w-md text-muted-foreground leading-relaxed"
        >
          {profile.title} specializing in crafting performant, visually
          stunning web applications with modern technologies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex flex-wrap items-center gap-4"
        >
          <MagneticButton strength={0.2}>
            <button
              onClick={() => scrollTo("#projects")}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-8 text-sm font-medium text-background transition-all hover:shadow-glow"
            >
              View My Work
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </button>
          </MagneticButton>
          <MagneticButton strength={0.15}>
            <button
              onClick={() => scrollTo("#contact")}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border px-8 text-sm font-medium transition-all hover:bg-muted"
            >
              Get In Touch
            </button>
          </MagneticButton>
        </motion.div>
      </div>

      <div className="relative hidden items-center justify-center lg:flex">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative"
        >
          <div className="flex h-80 w-80 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 via-purple-300/10 to-pink-300/10 ring-1 ring-border/30">
            <span className="text-8xl font-bold text-primary/20">
              {profile.name.charAt(0)}
            </span>
          </div>
          <div className="absolute -inset-4 animate-spin-slow rounded-full border border-dashed border-primary/20" />
          <div className="absolute -inset-8 animate-spin-slow rounded-full border border-dashed border-purple-300/10" style={{ animationDirection: "reverse", animationDuration: "12s" }} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-xs text-muted-foreground"
        >
          <span>Scroll</span>
          <svg className="h-4 w-4 animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
