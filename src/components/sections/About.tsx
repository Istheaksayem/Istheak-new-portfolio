"use client";

import { motion } from "motion/react";
import { profile } from "@/data/profile";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <AnimatedSection id="about" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="About"
          title="Who I Am"
          description="A passionate developer dedicated to crafting exceptional digital experiences."
        />

        <div className="grid items-center gap-12 md:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto aspect-square w-64 overflow-hidden rounded-2xl md:col-span-2 md:w-full"
          >
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-purple-300/20 text-6xl font-bold text-primary/30">
              {profile.name.charAt(0)}
            </div>
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-border/50" />
          </motion.div>

          <div className="md:col-span-3">
            <div className="space-y-4">
              {profile.bio.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="text-muted-foreground leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {profile.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="rounded-xl border border-border/50 bg-card p-4 text-center"
                >
                  <p className="text-2xl font-bold text-primary">
                    {stat.value}+
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <a
                href={profile.resumeUrl}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-border px-5 text-sm font-medium transition-all hover:bg-muted"
              >
                Download Resume
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
