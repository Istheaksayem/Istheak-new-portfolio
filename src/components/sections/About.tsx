"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { profile } from "@/data/profile";
import { SectionBackground } from "@/components/ui/SectionBackground";

const TIMELINE = [
  { year: "2024", label: "Started Coding" },
  { year: "2025", label: "Built Real-world Projects" },
  { year: "2026", label: "Building Products & Experiences" },
];

export function About() {
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInView = useInView(imageRef, { once: true });

  return (
    <section id="about" className="relative overflow-hidden section-padding">
      <SectionBackground variant="about" />
      <div className="container-fluid mx-auto max-w-6xl">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 inline-block text-sm font-medium uppercase tracking-widest text-primary"
        >
          About
        </motion.span>

        <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="block"
          >
            I DON&apos;T JUST WRITE CODE.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="block text-gradient"
          >
            I BUILD EXPERIENCES.
          </motion.span>
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {profile.bio.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="text-base leading-relaxed text-muted-foreground sm:text-lg"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <div className="mt-10">
              <p className="mb-5 text-sm font-medium uppercase tracking-widest text-muted-foreground">
                My Journey
              </p>
              <div className="relative space-y-6 border-l border-border/60 pl-6">
                {TIMELINE.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    className="relative"
                  >
                    <span className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary shadow-glow" />
                    <p className="font-display text-xl font-semibold">{item.year}</p>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <motion.div
              ref={imageRef}
              initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
              animate={
                imageInView
                  ? { clipPath: "inset(0% 0 0 0)", opacity: 1 }
                  : {}
              }
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass relative aspect-[4/5] overflow-hidden rounded-3xl"
            >
              <Image
                src={profile.image}
                alt={profile.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-display text-lg font-semibold">{profile.name}</p>
                <p className="text-sm text-muted-foreground">{profile.title}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
