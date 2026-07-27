"use client";

import { skillCategories } from "@/data/skills";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillBadge } from "@/components/ui/SkillBadge";

export function Skills() {
  return (
    <AnimatedSection id="skills" className="bg-muted/30 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Skills"
          title="My Expertise"
          description="A comprehensive toolkit I've built over years of hands-on development."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm"
            >
              <h3 className="mb-6 text-lg font-semibold">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, index) => (
                  <SkillBadge
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    index={index}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
