"use client";

import { motion } from "motion/react";
import { SpotlightCard } from "@/components/react-bits/SpotlightCard";
import { ShinyText } from "@/components/react-bits/ShinyText";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <SpotlightCard className="group h-full flex flex-col">
        <div className="relative aspect-video overflow-hidden bg-muted">
          <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-muted-foreground/20">
            {project.title.charAt(0)}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <p className="flex-1 text-sm text-muted-foreground">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-auto flex gap-3 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                <ShinyText text="Live Demo" speed={4} />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Source Code →
              </a>
            )}
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
