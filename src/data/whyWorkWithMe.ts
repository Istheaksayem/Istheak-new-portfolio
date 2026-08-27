export interface ValueProp {
  title: string;
  description: string;
  icon: "code" | "responsive" | "tech" | "performance" | "communication" | "client";
}

export const whyWorkWithMe: ValueProp[] = [
  {
    title: "Clean & Maintainable Code",
    description:
      "I write readable, well-structured code with consistent conventions so projects stay easy to extend and hand off.",
    icon: "code",
  },
  {
    title: "Responsive & User-Friendly UI",
    description:
      "Interfaces are crafted mobile-first, accessible, and intuitive so every user has a smooth experience.",
    icon: "responsive",
  },
  {
    title: "Modern Technologies",
    description:
      "I build with the current MERN ecosystem — Next.js, TypeScript, and Tailwind — for future-proof products.",
    icon: "tech",
  },
  {
    title: "Performance-Focused",
    description:
      "I care about fast loads and smooth interactions, optimizing rendering, assets, and data fetching.",
    icon: "performance",
  },
  {
    title: "Good Communication",
    description:
      "I keep things transparent with clear updates, questions, and documentation throughout a project.",
    icon: "communication",
  },
  {
    title: "Client-Focused Approach",
    description:
      "I listen first, then build toward your goals — your success is the real measure of the work.",
    icon: "client",
  },
];
