"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { skillCategories, techStack } from "@/data/skills";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillBadge } from "@/components/ui/SkillBadge";

export function Skills() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <AnimatedSection id="skills" className="bg-muted/30 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Skills"
          title="My Expertise"
          description="A comprehensive toolkit I've built over years of hands-on development."
        />

        <div className="mb-10 flex justify-center overflow-x-auto scrollbar-none">
          <div className="inline-flex flex-shrink-0 rounded-full border border-border/50 bg-card p-1 shadow-sm">
            {skillCategories.map((cat, i) => (
              <button
                key={cat.title}
                onClick={() => setActiveTab(i)}
                className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  activeTab === i
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeTab === i && (
                  <motion.span
                    layoutId="skill-tab"
                    className="absolute inset-0 rounded-full bg-primary"
                  />
                )}
                <span className="relative z-10">{cat.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="perspective-[1000px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, rotateX: -10, y: 20 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, rotateX: 10, y: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mx-auto max-w-2xl rounded-2xl border border-border/50 bg-card p-8 shadow-sm"
              style={{ transformStyle: "preserve-3d" }}
            >
              <h3 className="mb-8 text-center text-lg font-semibold">
                {skillCategories[activeTab].title}
              </h3>
              <div className="space-y-5">
                {skillCategories[activeTab].skills.map((skill, index) => (
                  <SkillBadge
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-12 max-w-3xl"
        >
          <p className="mb-4 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Core Tech Stack
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border/50 bg-card px-4 py-2 text-sm font-medium text-foreground/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
