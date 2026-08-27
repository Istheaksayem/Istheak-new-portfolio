"use client";

import { motion } from "motion/react";
import { services, type Service } from "@/data/services";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: Record<Service["icon"], React.ReactNode> = {
  frontend: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
  ),
  fullstack: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L21 10.5m0 0l-3.75 3.75M21 10.5H3M3 18.75l3.75-3.75M3 18.75h15" />
  ),
  react: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L4.5 12l2.25-2.25M6.75 9.75h10.5" />
  ),
  nextjs: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  ),
  responsive: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3M4.5 9.75h15M4.5 14.25h15" />
  ),
  dashboard: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12M3.75 3h12.75a2.25 2.25 0 012.25 2.25V21M3.75 3v16.5A2.25 2.25 0 006 21.75h12M3.75 3h12.75M16.5 9.75h.008v.008h-.008V9.75zm0 3h.008v.008h-.008V12.75zm0 3h.008v.008h-.008V15.75zm-3-6h.008v.008h-.008V9.75zm0 3h.008v.008h-.008V12.75z" />
  ),
  ecommerce: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.5l.75 3m0 0h13.5l1.125-3.75M5.25 6l-.75 3m0 0H18.75M5.25 6l.75 3m0 0v8.25A2.25 2.25 0 008.25 19.5h7.5a2.25 2.25 0 002.25-2.25V9M5.25 9h13.5M9 12.75h6" />
  ),
};

export function Services() {
  return (
    <AnimatedSection id="services" className="bg-muted/30 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Services"
          title="What I Can Build For You"
          description="From landing pages to full-stack products, here's how I can help bring your idea to life."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="group h-full rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-soft">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    {icons[service.icon]}
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold">{service.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
