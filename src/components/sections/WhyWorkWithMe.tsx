"use client";

import { motion } from "motion/react";
import { whyWorkWithMe } from "@/data/whyWorkWithMe";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhyWorkWithMe() {
  return (
    <section id="why" className="section-padding">
      <div className="container-fluid mx-auto max-w-5xl">
        <SectionHeading
          label="Why Istheak?"
          title="More Than A Coder"
          description="Principles that shape how I approach every project — and the difference you'll feel in the result."
        />

        <div className="mt-10 space-y-px overflow-hidden rounded-3xl border border-border/50 bg-card">
          {whyWorkWithMe.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="group relative grid grid-cols-[auto_1fr] gap-5 px-6 py-7 transition-colors duration-300 hover:bg-primary/[0.04] sm:grid-cols-[5rem_1fr] sm:gap-8 sm:px-10 sm:py-8"
            >
              <span className="font-mono text-sm font-semibold text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-xl font-bold leading-tight tracking-tight transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
              <span className="pointer-events-none absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-primary to-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
