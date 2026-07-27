"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapAnimation(
  animationFn: (ctx: { gsap: typeof gsap; scope: HTMLElement }) => void,
  deps: unknown[] = [],
) {
  const scopeRef = useRef<HTMLDivElement>(null!);

  useGSAP(
    ({ scope }) => {
      if (scope) {
        const ctx = scopeRef.current || (scope as unknown as HTMLElement);
        animationFn({ gsap, scope: ctx });
      }
    },
    { scope: scopeRef, dependencies: deps },
  );

  return scopeRef;
}
