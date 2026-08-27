"use client";

import { motion } from "motion/react";
import { whyWorkWithMe, type ValueProp } from "@/data/whyWorkWithMe";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: Record<ValueProp["icon"], React.ReactNode> = {
  code: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L21 10.5m0 0l-3.75 3.75M21 10.5H3" />
  ),
  responsive: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
  ),
  tech: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a2.25 2.25 0 012.25 2.25v.921m0 0l1.5 4.5m-1.5-4.5h-3m3 0v3.375m-3-3.375v3.375m0 0l-1.5 4.5m3-9.375l3.375-3.375M14.25 9.75l1.5 4.5" />
  ),
  performance: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  ),
  communication: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.25 5.25 0 0112 18.75a5.25 5.25 0 01-5.25-5.25c0-1.125.348-2.172.99-3.03M21 12a9 9 0 11-18 0" />
  ),
  client: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  ),
};

export function WhyWorkWithMe() {
  return (
    <AnimatedSection id="why" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Why Work With Me"
          title="A Partner, Not Just A Developer"
          description="Principles I bring to every project to make the collaboration smooth and the result reliable."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyWorkWithMe.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="flex h-full items-start gap-4 rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:border-secondary/30 hover:shadow-soft">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    {icons[item.icon]}
                  </svg>
                </div>
                <div>
                  <h3 className="mb-1.5 text-base font-semibold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
