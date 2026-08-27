export interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
  description: string;
}

export const education: Education[] = [
  {
    degree: "BBA (Honours) in Accounting",
    institution: "National University",
    period: "2021 — Present",
    location: "Bangladesh",
    description:
      "Pursuing a Bachelor of Business Administration with a major in Accounting, building analytical and problem-solving foundations that complement my logical approach to software development.",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Sitakunda Degree College",
    location: "Sitakunda, Chittagong",
    period: "2018 — 2020",
    description:
      "Completed higher secondary education with a focus on science, developing the discipline and curiosity that later drew me toward programming and web development.",
  },
];
