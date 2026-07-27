"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, animate, easeOut } from "motion/react";

interface AnimatedCounterProps {
  from?: number;
  to: number;
  suffix?: string;
  className?: string;
  duration?: number;
}

export function AnimatedCounter({
  from = 0,
  to,
  suffix = "",
  className = "",
  duration = 2,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState(from);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(from, to, {
      duration,
      ease: easeOut,
      onUpdate: (val) => setDisplayed(Math.round(val)),
    });
    return () => controls.stop();
  }, [inView, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {displayed}
      {suffix}
    </span>
  );
}
