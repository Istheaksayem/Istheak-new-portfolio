"use client";

import { motion } from "motion/react";
import { services } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionBackground } from "@/components/ui/SectionBackground";

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-muted/30 section-padding">
      <SectionBackground variant="services" />
      <div className="container-fluid mx-auto max-w-5xl">
        <SectionHeading
          label="What I Build"
          title="Services"
          description="End-to-end product development — from a blank canvas to a deployed, living application."
        />

        <div className="mt-8 border-t border-border/50">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <div
                data-cursor="link"
                className="group relative flex items-center justify-between gap-4 border-b border-border/50 px-2 py-7 transition-colors duration-300 hover:bg-gradient-to-r hover:from-primary/[0.06] hover:to-transparent sm:px-6"
              >
                <div className="flex items-baseline gap-5 sm:gap-8">
                  <span className="font-mono text-sm text-muted-foreground transition-colors group-hover:text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1 sm:text-3xl">
                      {service.title}
                    </h3>
                    <div className="grid grid-rows-[0fr] transition-all duration-300 ease-out group-hover:grid-rows-[1fr]">
                      <p className="overflow-hidden text-sm text-muted-foreground sm:max-w-xl">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>

                <svg
                  className="h-6 w-6 flex-shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-2 group-hover:text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
