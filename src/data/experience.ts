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
    period: "Jan 2025 — Present",
    description:
      "Building full-stack web applications independently, focusing on real-world features like real-time communication, payment integration, authentication, and role-based access control.",
    highlights: [
      "Developed real-time GPS tracking and ride booking with Socket.io for a ride-sharing platform",
      "Integrated SSLCommerz payment gateway for secure online transactions",
      "Implemented KYC and facial verification systems to enhance user safety",
      "Built multi-role RBAC systems with admin approval workflows",
    ],
  },
  {
    role: "Complete Web Development Course",
    company: "Programming Hero",
    location: "Remote",
    period: "2024 — 2025",
    description:
      "Completed an intensive full-stack web development program with excellence, covering modern frontend and backend technologies.",
    highlights: [
      "Mastered MERN stack including React, Node.js, Express.js, and MongoDB",
      "Built multiple full-stack projects demonstrating real-world capabilities",
      "Earned certification with excellence for outstanding performance",
    ],
  },
];
