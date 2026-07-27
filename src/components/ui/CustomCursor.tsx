"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch = "ontouchstart" in window;
    if (isTouch) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    const ringAnim = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
      }
      requestAnimationFrame(ringAnim);
    };

    window.addEventListener("mousemove", onMouse);
    requestAnimationFrame(ringAnim);

    const onHoverIn = () => {
      dotRef.current?.classList.add("scale-150", "mix-blend-difference");
      ringRef.current?.classList.add("scale-150", "border-primary/60", "bg-primary/5");
    };
    const onHoverOut = () => {
      dotRef.current?.classList.remove("scale-150", "mix-blend-difference");
      ringRef.current?.classList.remove("scale-150", "border-primary/60", "bg-primary/5");
    };

    const hoverables = document.querySelectorAll(
      "a, button, input, textarea, [data-cursor]",
    );
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", onHoverIn);
      el.addEventListener("mouseleave", onHoverOut);
    });

    return () => {
      window.removeEventListener("mousemove", onMouse);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", onHoverIn);
        el.removeEventListener("mouseleave", onHoverOut);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-[width,height] duration-150"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 rounded-full border border-border transition-all duration-200"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
