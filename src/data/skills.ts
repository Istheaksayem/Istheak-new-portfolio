export interface Skill {
  name: string;
  level: number;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Framer Motion", level: 85 },
      { name: "Vue.js", level: 75 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Python", level: 82 },
      { name: "PostgreSQL", level: 80 },
      { name: "MongoDB", level: 78 },
      { name: "GraphQL", level: 75 },
    ],
  },
  {
    title: "Tools & Cloud",
    skills: [
      { name: "Docker", level: 82 },
      { name: "AWS", level: 78 },
      { name: "Git", level: 92 },
      { name: "CI/CD", level: 80 },
      { name: "Linux", level: 85 },
    ],
  },
];
