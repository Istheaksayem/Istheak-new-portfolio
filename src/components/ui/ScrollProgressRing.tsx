"use client";

import { useScroll, useSpring, motion } from "motion/react";

export function ScrollProgressRing() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const circumference = 2 * Math.PI * 22;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 hidden h-12 w-12 items-center justify-center rounded-full bg-background/80 shadow-soft backdrop-blur-md md:flex"
      aria-label="Scroll to top"
    >
      <svg className="h-12 w-12 -rotate-90" viewBox="0 0 48 48">
        <circle
          cx="24"
          cy="24"
          r="22"
          fill="none"
          stroke="var(--border)"
          strokeWidth="2"
        />
        <motion.circle
          cx="24"
          cy="24"
          r="22"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ pathLength: smoothProgress }}
        />
      </svg>
      <svg
        className="absolute h-4 w-4 text-foreground"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 15.75l7.5-7.5 7.5 7.5"
        />
      </svg>
    </motion.button>
  );
}
