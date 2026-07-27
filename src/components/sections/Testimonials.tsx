"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { testimonials } from "@/data/testimonials";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

function QuoteMark() {
  return (
    <svg
      className="h-10 w-10 text-primary/20"
      viewBox="0 0 40 40"
      fill="currentColor"
    >
      <path d="M12.5 5C5.6 5 0 10.6 0 17.5V35h15V17.5H7.5C7.5 12.8 11.3 9 16 9V5h-3.5zM32.5 5C25.6 5 20 10.6 20 17.5V35h15V17.5H27.5C27.5 12.8 31.3 9 36 9V5h-3.5z" />
    </svg>
  );
}

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((a) => (a + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [paused, next]);

  const t = testimonials[active];
  const prevIndex = (active - 1 + testimonials.length) % testimonials.length;
  const nextIndex = (active + 1) % testimonials.length;

  return (
    <AnimatedSection id="testimonials" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Testimonials"
          title="What People Say"
          description="Feedback from colleagues and clients I've worked with."
        />

        <div
          className="relative mx-auto max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative flex items-center justify-center py-12">
            <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 opacity-30 scale-90">
              <div className="rounded-2xl border border-border/30 bg-card/50 p-6 backdrop-blur-sm w-64">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {testimonials[prevIndex].content}
                </p>
                <p className="mt-3 text-xs font-medium">
                  {testimonials[prevIndex].name}
                </p>
              </div>
            </div>

            <div className="z-10 w-full max-w-xl px-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="rounded-2xl border border-border/50 bg-card p-8 shadow-sm md:p-10"
                >
                  <QuoteMark />

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground italic md:text-base">
                    &ldquo;{t.content}&rdquo;
                  </p>

                  <div className="mt-8 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-purple-300/20 text-lg font-semibold text-primary ring-2 ring-primary/10">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {t.role}, {t.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 opacity-30 scale-90">
              <div className="rounded-2xl border border-border/30 bg-card/50 p-6 backdrop-blur-sm w-64">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {testimonials[nextIndex].content}
                </p>
                <p className="mt-3 text-xs font-medium">
                  {testimonials[nextIndex].name}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Previous testimonial"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active ? "w-6 bg-primary" : "w-2 bg-border"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Next testimonial"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
