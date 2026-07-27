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
    title: "Synthwave Dashboard",
    description:
      "A real-time analytics dashboard with interactive charts, dark synthwave theme, and WebSocket-driven live data updates.",
    tags: ["React", "TypeScript", "D3.js", "WebSocket"],
    image: "/placeholder.svg",
    liveUrl: "#",
    repoUrl: "#",
    featured: true,
  },
  {
    title: "EcoTrack",
    description:
      "A carbon footprint tracker that visualizes your environmental impact with actionable recommendations and progress tracking.",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Chart.js"],
    image: "/placeholder.svg",
    liveUrl: "#",
    repoUrl: "#",
    featured: true,
  },
  {
    title: "CodeCollab",
    description:
      "A real-time collaborative code editor with syntax highlighting, video chat, and AI-powered code suggestions.",
    tags: ["React", "Socket.io", "WebRTC", "Monaco"],
    image: "/placeholder.svg",
    liveUrl: "#",
    repoUrl: "#",
    featured: true,
  },
  {
    title: "Artisan Marketplace",
    description:
      "An e-commerce platform for handmade goods with AI recommendation engine and seamless checkout experience.",
    tags: ["Next.js", "Stripe", "Redis", "TensorFlow"],
    image: "/placeholder.svg",
    liveUrl: "#",
    repoUrl: "#",
    featured: false,
  },
  {
    title: "WeatherViz",
    description:
      "A 3D weather visualization app with interactive globe, real-time forecasts, and historical climate data.",
    tags: ["React", "Three.js", "GraphQL", "Mapbox"],
    image: "/placeholder.svg",
    liveUrl: "#",
    repoUrl: "#",
    featured: false,
  },
  {
    title: "DevBlog Engine",
    description:
      "A headless CMS for developers with MDX support, syntax highlighting, and automated social media sharing.",
    tags: ["Next.js", "MDX", "AWS", "Redis"],
    image: "/placeholder.svg",
    liveUrl: "#",
    repoUrl: "#",
    featured: false,
  },
];
