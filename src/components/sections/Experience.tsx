"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { experiences } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useGSAP(() => {
    if (!isDesktop) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!section || !track || !progress) return;

    const cards = track.querySelectorAll(".exp-card");
    if (cards.length === 0) return;
    const cardWidth = (cards[0] as HTMLElement)?.offsetWidth || 480;
    const gap = 48;
    const totalWidth = (cardWidth + gap) * experiences.length - gap;
    const offset = Math.max(0, totalWidth - window.innerWidth + 160);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${experiences.length * 120}%`,
        pin: true,
        scrub: 1.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(track, {
      x: -offset,
      ease: "none",
    });

    tl.to(
      progress,
      {
        scaleX: 1,
        ease: "none",
      },
      0,
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [isDesktop]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative overflow-hidden bg-muted/30"
    >
      <div className={`mx-auto flex flex-col justify-center px-6 py-24 sm:py-32 ${isDesktop ? "min-h-screen" : ""}`}>
        <SectionHeading
          label="Experience"
          title="Where I've Worked"
          description="My professional journey in software engineering."
        />

        {isDesktop ? (
          <>
            <div
              ref={trackRef}
              className="mt-12 flex gap-12 will-change-transform"
              style={{ minWidth: "max-content" }}
            >
              {experiences.map((exp) => (
                <div
                  key={`${exp.company}-${exp.period}`}
                  className="exp-card w-[calc(100vw-4rem)] max-w-[480px] flex-shrink-0"
                >
                  <div className="flex h-full flex-col rounded-2xl border border-border/50 bg-card p-8 shadow-sm transition-all duration-500 hover:shadow-soft hover:border-primary/20">
                    <div className="mb-2 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                        {exp.company.charAt(0)}
                      </div>
                      <div>
                        <span className="text-xs font-medium text-primary">
                          {exp.period}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold">{exp.role}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      {exp.company} &mdash; {exp.location}
                    </p>

                    <p className="mb-6 flex-1 text-sm text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>

                    <ul className="space-y-2">
                      {exp.highlights.map((h, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                          {h}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative mt-12 h-1 overflow-hidden rounded-full bg-border">
              <div
                ref={progressRef}
                className="h-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-primary to-emerald-400"
              />
            </div>

            <div className="mt-4 text-center text-xs text-muted-foreground">
              Scroll to explore my journey &rarr;
            </div>
          </>
        ) : (
          <div className="mt-12 space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${exp.period}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex flex-col rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-500 hover:shadow-soft hover:border-primary/20 sm:p-8">
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                      {exp.company.charAt(0)}
                    </div>
                    <div>
                      <span className="text-xs font-medium text-primary">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold sm:text-xl">{exp.role}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {exp.company} &mdash; {exp.location}
                  </p>

                  <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="space-y-2">
                    {exp.highlights.map((h, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                        {h}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!isDesktop && (
          <div className="mt-10 border-t border-border/30 pt-6 text-center text-xs text-muted-foreground">
            End of journey
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-muted/30 to-transparent" />
    </section>
  );
}