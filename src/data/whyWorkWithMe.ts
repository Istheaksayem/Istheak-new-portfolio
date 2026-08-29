export interface ValueProp {
  title: string;
  description: string;
  icon: "code" | "responsive" | "tech" | "performance" | "communication" | "client";
}

export const whyWorkWithMe: ValueProp[] = [
  {
    title: "I Think Like A Product Builder.",
    description:
      "I don't just take tickets — I consider the user, the goal, and the business outcome before writing a single line.",
    icon: "tech",
  },
  {
    title: "I Care About The Details.",
    description:
      "Spacing, micro-interactions, error states, and edge cases — the small things that separate good from great.",
    icon: "code",
  },
  {
    title: "I Build For Real Users.",
    description:
      "Performance, accessibility, and clarity matter because actual people will use what I ship — not just reviewers.",
    icon: "responsive",
  },
  {
    title: "I Don't Stop At \"It Works.\"",
    description:
      "Working is the baseline. I push for clean architecture, smooth UX, and code I'd be proud to hand to a team.",
    icon: "performance",
  },
  {
    title: "I Make It Feel Good.",
    description:
      "Engineering and design aren't separate to me — I sweat the motion, the rhythm, and the moment-to-moment feel.",
    icon: "client",
  },
];
