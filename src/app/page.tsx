import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Stats } from "@/components/sections/Stats";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Services } from "@/components/sections/Services";
import { WhyWorkWithMe } from "@/components/sections/WhyWorkWithMe";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Stats />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Services />
      <WhyWorkWithMe />
      <Contact />
    </>
  );
}
