export interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "Product Manager",
    company: "TechCorp Inc.",
    avatar: "",
    content:
      "Isitheak is the kind of developer every team needs. His ability to translate complex requirements into elegant, performant code is remarkable. He doesn't just build features — he crafts experiences.",
  },
  {
    name: "Marcus Johnson",
    role: "CTO",
    company: "DataFlow Labs",
    avatar: "",
    content:
      "Working with Isitheak was a game-changer for our platform. He brought both technical depth and a design-minded approach that elevated our entire product. Our users noticed the difference immediately.",
  },
  {
    name: "Emily Rodriguez",
    role: "Design Lead",
    company: "WebCraft Agency",
    avatar: "",
    content:
      "Isitheak has an incredible eye for detail. He bridges the gap between design and development seamlessly, bringing mockups to life with animations and interactions that exceed expectations.",
  },
];
