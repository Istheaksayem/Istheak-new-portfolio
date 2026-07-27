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
    title: "Programming Languages",
    skills: [
      { name: "JavaScript (ES6+)", level: 88 },
      { name: "HTML5", level: 92 },
      { name: "CSS3", level: 90 },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React.js", level: 85 },
      { name: "Next.js", level: 82 },
      { name: "TypeScript", level: 78 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Framer Motion / GSAP", level: 75 },
      { name: "TanStack Query", level: 72 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 82 },
      { name: "Express.js", level: 85 },
      { name: "REST API Development", level: 85 },
      { name: "JWT Authentication", level: 80 },
    ],
  },
  {
    title: "Database & Auth",
    skills: [
      { name: "MongoDB", level: 80 },
      { name: "Firebase (Auth, Firestore)", level: 78 },
      { name: "NextAuth", level: 72 },
    ],
  },
  {
    title: "Deployment & Hosting",
    skills: [
      { name: "Vercel", level: 88 },
      { name: "Netlify", level: 85 },
      { name: "Render", level: 78 },
    ],
  },
  {
    title: "Tools & Version Control",
    skills: [
      { name: "Git & GitHub", level: 85 },
      { name: "VS Code / Cursor", level: 90 },
      { name: "Chrome DevTools", level: 82 },
      { name: "npm / Yarn", level: 85 },
    ],
  },
];
