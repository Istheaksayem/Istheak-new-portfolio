export interface Project {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  category: string;
}

export const projects: Project[] = [
  {
    title: "Mirsarai General Hospital Management System",
    description:
      "A comprehensive hospital management system with online appointment booking, patient & doctor scheduling, report management, role-based dashboards (Super Admin, Reception, Doctors, Lab Admin), website CMS, real-time notifications, and secure authentication.",
    tags: ["Next.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "JWT", "Socket.io", "Cloudinary"],
    image: "/hospital-management.jpg",
    liveUrl: "https://www.mirsaraigeneralhospital.com",
    category: "Full-Stack",
    featured: true,
  },
  {
    title: "OnWay Ride Sharing Platform",
    description:
      "A modern ride-sharing platform with real-time booking, live GPS tracking, secure KYC and facial verification, and SSLCommerz payment integration. Built collaboratively as part of a development team.",
    tags: ["Next.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "JWT", "SSLCommerz"],
    image: "/onway.png",
    liveUrl: "https://onway-5g8a.onrender.com",
    repoUrl: "https://github.com/Zarif207/OnWay",
    category: "Full-Stack",
    featured: true,
  },
  {
    title: "Local Chef Bazar",
    description:
      "A full-stack food marketplace connecting home chefs with customers. Features a multi-role RBAC system (Admin, Chef, User) with role upgrade requests, admin approval workflows, and secure payments.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Firebase Auth", "JWT", "Stripe"],
    image: "/LocalChef.png",
    liveUrl: "https://dynamic-halva-2b4012.netlify.app",
    repoUrl: "https://github.com/Istheaksayem/local-chef-bazar-client",
    category: "Full-Stack",
    featured: true,
  },
  {
    title: "Green Earth",
    description:
      "An eco-friendly awareness platform encouraging sustainable living with article publishing, event listings, and a community-driven pledge wall to track green actions.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
    liveUrl: "#",
    category: "Frontend",
    featured: true,
  },
  {
    title: "Emergency Service Directory",
    description:
      "A location-aware directory that helps users quickly find nearby hospitals, police, fire, and ambulance services with one-tap calling and saved contacts for fast emergencies.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    liveUrl: "#",
    category: "Full-Stack",
    featured: true,
  },
  {
    title: "Ticket System",
    description:
      "A support ticket system with user submission, agent assignment, status tracking, and internal notes — built to practice role-based workflows and real-time updates.",
    tags: ["Next.js", "Node.js", "Express.js", "MongoDB", "Socket.io"],
    liveUrl: "#",
    category: "Full-Stack",
    featured: true,
  },
  {
    title: "Freelance Marketplace",
    description:
      "A secure freelance marketplace connecting clients with freelancers. Includes CRUD job posting, user-specific task management, Firebase authentication, and a responsive collaboration UI.",
    tags: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Firebase Auth"],
    image: "/Freelance-MarketPlace.png",
    liveUrl: "https://dapper-buttercream-10e70b.netlify.app",
    repoUrl: "https://github.com/Istheaksayem/local-chef-bazar-client",
    category: "Full-Stack",
    featured: true,
  },
];
