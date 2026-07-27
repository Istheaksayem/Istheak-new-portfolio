export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    role: "Senior Full-Stack Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    period: "Jan 2024 — Present",
    description:
      "Leading the development of a next-gen SaaS platform, architecting microservices and mentoring junior developers.",
    highlights: [
      "Architected microservices reducing API latency by 40%",
      "Led migration from legacy codebase to Next.js + TypeScript",
      "Mentored 4 junior developers through structured code reviews",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "DataFlow Labs",
    location: "Austin, TX",
    period: "Jun 2022 — Dec 2023",
    description:
      "Built scalable data visualization tools and real-time collaboration features for enterprise clients.",
    highlights: [
      "Developed real-time dashboards serving 10K+ concurrent users",
      "Implemented CI/CD pipelines reducing deployment time by 60%",
      "Contributed to open-source data visualization library",
    ],
  },
  {
    role: "Frontend Developer",
    company: "WebCraft Agency",
    location: "Remote",
    period: "Aug 2020 — May 2022",
    description:
      "Created responsive, animated web experiences for diverse clients across industries.",
    highlights: [
      "Delivered 15+ client projects on time and under budget",
      "Built reusable component library used across all projects",
      "Introduced animation-driven interactions improving engagement by 35%",
    ],
  },
  {
    role: "Junior Developer",
    company: "StartUp Hub",
    location: "New York, NY",
    period: "Jan 2019 — Jul 2020",
    description:
      "Started career building landing pages and simple web apps while learning modern development practices.",
    highlights: [
      "Transitioned team from jQuery to React",
      "Built automated testing suite achieving 90% code coverage",
      "Won internal hackathon with AI-powered chat application",
    ],
  },
];
