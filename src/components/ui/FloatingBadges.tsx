"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const BADGES = [
  "React", "Next.js", "TypeScript", "Node.js",
  "GSAP", "Framer", "Tailwind", "PostgreSQL",
];

export function FloatingBadges() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll(".badge");

    items.forEach((badge, i) => {
      const angle = (i / items.length) * Math.PI * 2;
      const radius = 160 + Math.random() * 60;

      gsap.set(badge, {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      });

      gsap.to(badge, {
        x: `+=${Math.cos(angle + Math.PI / 2) * 30}`,
        y: `+=${Math.sin(angle + Math.PI / 2) * 30}`,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2,
      });

      gsap.to(badge, {
        rotation: -15 + Math.random() * 30,
        duration: 4 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.3,
      });
    });

    return () => {
      gsap.killTweensOf(items);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      {BADGES.map((badge) => (
        <span
          key={badge}
          className="badge absolute rounded-full border border-border/30 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm"
        >
          {badge}
        </span>
      ))}
    </div>
  );
}
