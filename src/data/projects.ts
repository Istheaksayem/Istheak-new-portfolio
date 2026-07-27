export interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    title: "OnWay Ride Sharing Platform",
    description:
      "A modern ride-sharing platform featuring real-time booking, live GPS tracking, secure KYC and facial verification, and SSLCommerz payment gateway integration. Built collaboratively as part of a development team.",
    tags: ["Next.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "JWT", "SSLCommerz", "Tailwind CSS"],
    image: "/placeholder.svg",
    liveUrl: "#",
    repoUrl: "#",
    featured: true,
  },
  {
    title: "Local Chef Bazar",
    description:
      "A full-stack food marketplace connecting home chefs with customers. Features a multi-role RBAC system (Admin, Chef, User) with role upgrade requests, admin approval workflows, and secure payments.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Firebase Auth", "JWT", "Stripe", "Tailwind CSS"],
    image: "/LocalChef.png",
    liveUrl: "#",
    repoUrl: "#",
    featured: true,
  },
  {
    title: "Freelance Marketplace",
    description:
      "A secure freelance marketplace connecting clients with freelancers. Includes complete CRUD job posting, user-specific task management, Firebase authentication, and responsive UI for seamless collaboration.",
    tags: ["React.js", "Tailwind CSS", "React Router", "Node.js", "Express.js", "MongoDB", "Firebase Auth", "JWT"],
    image: "/Freelance-MarketPlace.png",
    liveUrl: "#",
    repoUrl: "#",
    featured: true,
  },
];
