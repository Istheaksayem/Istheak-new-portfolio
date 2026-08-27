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
    role: "MERN Stack Developer",
    company: "Self-Directed Projects",
    location: "Bangladesh",
    period: "2025 — Present",
    description:
      "Building full-stack web applications independently, focusing on real-world features like real-time communication, payment integration, authentication, and role-based access control.",
    highlights: [
      "Built a hospital management system with multi-role RBAC and real-time notifications",
      "Developed real-time GPS tracking and ride booking with Socket.io for a ride-sharing platform",
      "Integrated SSLCommerz and Stripe payment gateways for secure online transactions",
      "Implemented KYC and facial verification systems to enhance user safety",
    ],
  },
  {
    role: "Team Project Contributor",
    company: "OnWay (Collaborative Build)",
    location: "Remote",
    period: "2025",
    description:
      "Collaborated with a development team to ship a production ride-sharing platform, practicing agile communication, code reviews, and shared codebase ownership.",
    highlights: [
      "Coordinated backend and real-time features with frontend teammates",
      "Followed a shared Git workflow with pull requests and code reviews",
      "Shipped features incrementally against a shared product roadmap",
    ],
  },
  {
    role: "Freelance & Client Work",
    company: "Independent",
    location: "Remote",
    period: "2025 — Present",
    description:
      "Taking on small client and practice projects — from landing pages to full-stack apps — to sharpen delivery, communication, and production-ready code.",
    highlights: [
      "Delivered responsive, accessible UIs tailored to client briefs",
      "Managed project scope, timelines, and client feedback end to end",
      "Deployed apps to Vercel and Netlify with CI-friendly workflows",
    ],
  },
  {
    role: "Complete Web Development Course",
    company: "Programming Hero",
    location: "Remote",
    period: "2024 — 2025",
    description:
      "Completed an intensive full-stack web development program, covering modern frontend and backend technologies and building multiple real projects.",
    highlights: [
      "Mastered the MERN stack: React, Node.js, Express.js, and MongoDB",
      "Built multiple full-stack projects demonstrating real-world capabilities",
      "Earned certification with excellence for outstanding performance",
    ],
  },
];
