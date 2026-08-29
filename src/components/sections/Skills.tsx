"use client";

import {
  Atom,
  Server,
  Database,
  GitBranch,
  Wind,
  Braces,
  FileCode,
  Code2,
  Paintbrush,
  Cpu,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import { techStack } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionBackground } from "@/components/ui/SectionBackground";

const ICON_MAP: Record<string, LucideIcon> = {
  HTML: Code2,
  CSS: Paintbrush,
  "Tailwind CSS": Wind,
  JavaScript: Braces,
  TypeScript: FileCode,
  "Next.js": Cpu,
  "React.js": Atom,
  "Node.js": Server,
  "Express.js": Server,
  MongoDB: Database,
  "Git / GitHub": GitBranch,
};

function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Terminal;
}

function MarqueeRow({
  items,
  direction = "left",
}: {
  items: string[];
  direction?: "left" | "right";
}) {
  const doubled = [...items, ...items];
  return (
    <div className="group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div
        className={`flex shrink-0 gap-4 pr-4 ${
          direction === "left" ? "animate-marquee" : "animate-marquee-slow"
        } group-hover:[animation-play-state:paused]`}
      >
        {doubled.map((tech, i) => {
          const Icon = getIcon(tech);
          return (
            <div
              key={`${tech}-${i}`}
              data-cursor="link"
              className="glass flex items-center gap-2.5 rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-glow"
            >
              <Icon className="h-4 w-4 text-primary" />
              {tech}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Skills() {
  // Split the stack into two balanced rows for a richer marquee
  const mid = Math.ceil(techStack.length / 2);
  const rowA = techStack.slice(0, mid);
  const rowB = techStack.slice(mid);

  return (
    <section id="skills" className="relative overflow-hidden bg-muted/30 section-padding">
      <SectionBackground variant="skills" />
      <div className="container-fluid mx-auto max-w-6xl">
        <SectionHeading
          label="Tech Stack"
          title="Tools I Build With"
          description="A modern toolkit spanning frontend, backend, and databases — used daily to ship production software."
        />

        <div className="mt-4 space-y-4">
          <MarqueeRow items={rowA} direction="left" />
          <MarqueeRow items={rowB} direction="right" />
        </div>
      </div>
    </section>
  );
}
