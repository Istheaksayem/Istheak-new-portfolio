"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { profile } from "@/data/profile";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function About() {
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInView = useInView(imageRef, { once: true });

  useGSAP(() => {
    gsap.fromTo(
      ".deco-ring",
      { rotation: 0, scale: 0.8, opacity: 0 },
      {
        rotation: 360,
        scale: 1,
        opacity: 0.4,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: ".deco-ring", start: "top 80%" },
      },
    );
  });

  return (
    <AnimatedSection id="about" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="About"
          title="Who I Am"
          description="A passionate developer dedicated to crafting exceptional digital experiences."
        />

        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <div ref={imageRef} className="relative">
              <motion.div
                initial={{ clipPath: "circle(30% at 50% 50%)", opacity: 0 }}
                animate={
                  imageInView
                    ? { clipPath: "circle(50% at 50% 50%)", opacity: 1 }
                    : {}
                }
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative mx-auto aspect-square w-64 overflow-hidden rounded-full md:w-72"
              >
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-purple-300/20 text-7xl font-bold text-primary/30">
                  {profile.name.charAt(0)}
                </div>
                <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-border/30" />
              </motion.div>
              <svg
                className="deco-ring pointer-events-none absolute -inset-8 h-[calc(100%+4rem)] w-[calc(100%+4rem)] opacity-0"
                viewBox="0 0 200 200"
                fill="none"
              >
                <circle cx="100" cy="100" r="92" stroke="var(--primary)" strokeWidth="1" strokeDasharray="8 6" opacity="0.3" />
                <circle cx="100" cy="100" r="82" stroke="var(--secondary)" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.2" />
              </svg>
            </div>
          </div>

          <div className="lg:col-span-3">
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
                  className="group rounded-xl border border-border/50 bg-card p-4 text-center transition-all duration-300 hover:border-primary/20 hover:shadow-soft"
                >
                  <p className="text-2xl font-bold text-primary">
                    <AnimatedCounter to={stat.value} suffix="+" duration={2} />
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
              <MagneticButton strength={0.15}>
                <a
                  href={profile.resumeUrl}
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-border px-5 text-sm font-medium transition-all hover:bg-muted"
                >
                  Download Resume
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </a>
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
