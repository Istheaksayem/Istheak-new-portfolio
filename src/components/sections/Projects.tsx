"use client";

import { projects } from "@/data/projects";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function Projects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <AnimatedSection id="projects" className="bg-muted/30 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Projects"
          title="Things I've Built"
          description="Selected projects that showcase my skills and passion for development."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
