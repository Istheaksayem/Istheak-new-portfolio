"use client";

import { experiences } from "@/data/experience";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TimelineItem } from "@/components/ui/TimelineItem";

export function Experience() {
  return (
    <AnimatedSection id="experience" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          label="Experience"
          title="Where I've Worked"
          description="My professional journey in software engineering."
        />

        <div className="relative space-y-8">
          {experiences.map((exp, index) => (
            <TimelineItem key={`${exp.company}-${exp.period}`} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
