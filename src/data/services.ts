export interface Service {
  title: string;
  description: string;
  icon: "frontend" | "fullstack" | "react" | "nextjs" | "responsive" | "dashboard" | "ecommerce";
}

export const services: Service[] = [
  {
    title: "Frontend Development",
    description:
      "Pixel-perfect, interactive user interfaces built with React, Next.js, and Tailwind CSS that feel fast and delightful.",
    icon: "frontend",
  },
  {
    title: "Full-Stack Development",
    description:
      "End-to-end applications with secure Node.js/Express APIs, MongoDB data layers, and clean React frontends.",
    icon: "fullstack",
  },
  {
    title: "React Development",
    description:
      "Component-driven, reusable React applications with smooth state management and great developer ergonomics.",
    icon: "react",
  },
  {
    title: "Next.js Development",
    description:
      "Production-ready Next.js apps with server components, API routes, SEO, and optimized performance.",
    icon: "nextjs",
  },
  {
    title: "Responsive Website Development",
    description:
      "Mobile-first websites that look and work beautifully across phones, tablets, and desktops.",
    icon: "responsive",
  },
  {
    title: "Dashboard Development",
    description:
      "Data-rich admin dashboards with charts, role-based access, and real-time updates for actionable insights.",
    icon: "dashboard",
  },
  {
    title: "E-commerce Development",
    description:
      "Storefronts and marketplaces with cart, payments, and order flows using modern, secure stacks.",
    icon: "ecommerce",
  },
];
