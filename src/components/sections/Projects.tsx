"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects, type Project } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BrowserMockup } from "@/components/ui/BrowserMockup";

gsap.registerPlugin(ScrollTrigger);

const featured: Project[] = projects.filter(
  (p) => p.image && p.liveUrl && p.liveUrl !== "#",
);

function ArrowUpRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  );
}

function GitHubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

export function Projects() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".project-item");
      items.forEach((item) => {
        const image = item.querySelector(".project-image");
        const text = item.querySelector(".project-text");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 78%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        });

        if (image) {
          tl.fromTo(
            image,
            { clipPath: "inset(12% 12% 12% 12% round 1rem)", scale: 1.12, opacity: 0.4 },
            {
              clipPath: "inset(0% 0% 0% 0% round 1rem)",
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
            },
          );
        }
        if (text) {
          tl.fromTo(
            text.children,
            { y: 28, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" },
            "-=0.8",
          );
        }
      });
    },
    { scope: rootRef },
  );

  return (
    <section id="projects" className="section-padding">
      <div ref={rootRef} className="container-fluid mx-auto max-w-6xl">
        <SectionHeading
          label="Selected Work"
          title="Projects That Speak"
          description="A few products I've designed and built end to end — from architecture to the final pixel."
        />

        <div className="mt-4 space-y-24 sm:space-y-32">
          {featured.map((project, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={project.title}
                className={`project-item grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                  flip ? "lg:[&>.project-text]:order-2" : ""
                }`}
              >
                <div className="project-text space-y-5">
                  <span className="block font-display text-6xl font-bold text-border/60 sm:text-7xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                    {project.title}
                  </h3>
                  <p className="max-w-md text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border/60 bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3 pt-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="link"
                        className="group inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-all hover:shadow-glow"
                      >
                        View Project
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="link"
                        className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-6 text-sm font-medium transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                      >
                        <GitHubIcon />
                        Source
                      </a>
                    )}
                  </div>
                </div>

                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="image"
                  className="project-image block"
                  aria-label={`Open ${project.title}`}
                >
                  <BrowserMockup url={project.liveUrl?.replace(/^https?:\/\//, "")}>
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={project.image!}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </BrowserMockup>
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
