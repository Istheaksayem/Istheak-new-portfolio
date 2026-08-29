"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { experiences } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 60%",
              end: "bottom 80%",
              scrub: true,
            },
          },
        );
      }
    },
    { scope: rootRef },
  );

  return (
    <section id="experience" className="bg-muted/30 section-padding">
      <div ref={rootRef} className="container-fluid mx-auto max-w-4xl">
        <SectionHeading
          label="Experience"
          title="My Journey"
          description="The path I've walked — from first lines of code to shipping real products."
        />

        <div className="relative mt-4 pl-8 sm:pl-12">
          {/* Track */}
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border sm:left-[23px]" />
          {/* Animated draw line */}
          <div
            ref={lineRef}
            className="absolute left-[15px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-primary to-secondary sm:left-[23px]"
            style={{ transform: "scaleY(0)" }}
          />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${exp.period}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="relative"
              >
                {/* Dot */}
                <span className="absolute -left-[31px] top-2 flex h-4 w-4 items-center justify-center rounded-full bg-background ring-2 ring-primary sm:-left-[39px]">
                  <span className="h-2 w-2 rounded-full bg-primary shadow-glow" />
                </span>

                <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-soft sm:p-7">
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {exp.period}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {exp.location}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold sm:text-2xl">
                    {exp.role}
                  </h3>
                  <p className="mb-3 text-sm font-medium text-foreground/80">
                    {exp.company}
                  </p>
                  <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                    {exp.description}
                  </p>
                  <ul className="space-y-2">
                    {exp.highlights.map((h, hi) => (
                      <li
                        key={hi}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-secondary" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
