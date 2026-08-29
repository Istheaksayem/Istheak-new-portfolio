"use client";

import { motion } from "motion/react";
import { education } from "@/data/education";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionBackground } from "@/components/ui/SectionBackground";

export function Education() {
  return (
    <AnimatedSection
      id="education"
      className="relative overflow-hidden px-6 py-24 sm:py-32"
    >
      <SectionBackground variant="education" />
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          label="Education"
          title="Where It Started"
          description="The academic foundation that shaped my analytical mindset alongside my coding journey."
        />

        <div className="relative">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-border to-secondary/40 md:left-1/2" />

          <div className="space-y-10">
            {education.map((item, i) => (
              <motion.div
                key={item.institution}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative pl-12 md:w-1/2 md:pl-0 ${
                  i % 2 === 0
                    ? "md:pr-12 md:text-right"
                    : "md:ml-auto md:pl-12"
                }`}
              >
                <span
                  className={`absolute top-2 left-4 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full bg-primary ring-4 ring-background md:left-auto ${
                    i % 2 === 0 ? "md:-right-1.5" : "md:-left-1.5"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                </span>

                <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-soft">
                  <span className="text-xs font-medium text-primary">
                    {item.period}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold">{item.degree}</h3>
                  <p className="text-sm font-medium text-foreground/80">
                    {item.institution}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.location}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
