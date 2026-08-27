export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML", level: 95 },
      { name: "CSS", level: 92 },
      { name: "Tailwind CSS", level: 90 },
      { name: "JavaScript", level: 88 },
      { name: "TypeScript", level: 80 },
      { name: "Next.js", level: 82 },
      { name: "React.js", level: 85 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 82 },
      { name: "Express.js", level: 85 },
      { name: "REST API Development", level: 85 },
      { name: "JWT Auth", level: 80 },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "MongoDB", level: 82 },
      { name: "Mongoose", level: 80 },
      { name: "Firebase", level: 76 },
    ],
  },
  {
    title: "Tools & Workflow",
    skills: [
      { name: "Git", level: 85 },
      { name: "GitHub", level: 85 },
      { name: "VS Code / Cursor", level: 90 },
      { name: "Vercel / Netlify", level: 84 },
    ],
  },
];

export const techStack: string[] = [
  "HTML",
  "CSS",
  "Tailwind CSS",
  "JavaScript",
  "TypeScript",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Git / GitHub",
];
