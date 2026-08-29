"use client";

import { motion } from "motion/react";
import { profile } from "@/data/profile";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export function Stats() {
  return (
    <section className="border-y border-border/40 bg-muted/30 section-padding">
      <div className="container-fluid mx-auto">
        <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {profile.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative px-2 text-center sm:px-6 ${
                i !== 0 ? "lg:border-l lg:border-border/40" : ""
              }`}
            >
              <p className="font-display text-5xl font-bold tracking-tight text-gradient sm:text-6xl">
                <AnimatedCounter to={stat.value} duration={2} />
              </p>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
