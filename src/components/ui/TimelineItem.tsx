"use client";

import { motion } from "motion/react";
import type { Experience } from "@/data/experience";

interface TimelineItemProps {
  experience: Experience;
  index: number;
}

export function TimelineItem({ experience, index }: TimelineItemProps) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className={`relative flex flex-col gap-4 md:flex-row ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <div className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"}`}>
        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
          <span className="mb-1 inline-block text-xs font-medium text-primary">
            {experience.period}
          </span>
          <h3 className="text-lg font-semibold">{experience.role}</h3>
          <p className="mb-2 text-sm text-muted-foreground">
            {experience.company} — {experience.location}
          </p>
          <p className="mb-3 text-sm text-muted-foreground">
            {experience.description}
          </p>
          <ul className={`space-y-1 ${isLeft ? "md:text-right" : "md:text-left"}`}>
            {experience.highlights.map((h, i) => (
              <li key={i} className="text-sm text-muted-foreground">
                {isLeft ? "← " : "→ "}
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="hidden md:flex md:w-8 md:flex-col md:items-center">
        <div className="z-10 h-4 w-4 rounded-full border-2 border-primary bg-background" />
        <div className="h-full w-px bg-border" />
      </div>
      <div className="hidden md:block md:flex-1" />
    </motion.div>
  );
}
