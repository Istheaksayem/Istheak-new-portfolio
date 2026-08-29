"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Loader() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDone(true);
      return;
    }

    const total = 5;
    let frame = 0;
    const step = () => {
      frame += 1;
      setCount(Math.min(total, frame));
      if (frame < total) {
        timer = window.setTimeout(step, 180);
      } else {
        timer = window.setTimeout(() => setDone(true), 420);
      }
    };
    let timer = window.setTimeout(step, 200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-display text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Istheak<span className="text-primary">.</span>
            </motion.span>
            <span className="font-mono text-sm tabular-nums text-muted-foreground">
              {String(count).padStart(2, "0")}
              <span className="text-border"> / 05</span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
