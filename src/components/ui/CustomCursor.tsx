"use client";

import { useEffect, useRef } from "react";

type Variant = "default" | "link" | "project" | "image";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let variant: Variant = "default";
    let raf = 0;

    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

      const target = e.target as HTMLElement | null;
      const el = target?.closest(
        "[data-cursor], a, button, input, textarea, [role='button']",
      );
      let next = el?.getAttribute("data-cursor") as Variant | null;
      if (!next && el) next = "link";
      const variantValue: Variant = next ?? "default";
      if (variantValue !== variant) {
        variant = variantValue;
        ring.dataset.variant = variant;
        if (variant === "image" || variant === "project") {
          label.textContent = "VIEW ↗";
        } else {
          label.textContent = "";
        }
      }
    };

    const ringAnim = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(ringAnim);
    };

    const onDown = () => ring.classList.add("scale-90");
    const onUp = () => ring.classList.remove("scale-90");

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(ringAnim);

    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary mix-blend-difference"
        style={{ width: 6, height: 6, willChange: "transform" }}
      />
      <div
        ref={ringRef}
        data-variant="default"
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full border border-primary/50 transition-[width,height,background-color,border-color] duration-200 ease-out"
        style={{ width: 30, height: 30, willChange: "transform" }}
      >
        <span
          ref={labelRef}
          className="select-none font-mono text-[9px] font-semibold tracking-wider text-primary opacity-0 transition-opacity duration-200 data-[show]:opacity-100"
        />
      </div>
      <style>{`
        [data-variant="link"] { width: 46px !important; height: 46px !important; background-color: rgba(99,102,241,0.08); }
        [data-variant="project"], [data-variant="image"] { width: 64px !important; height: 64px !important; background-color: rgba(99,102,241,0.12); border-color: rgba(99,102,241,0.7); }
        [data-variant="project"] span, [data-variant="image"] span { opacity: 1 !important; }
      `}</style>
    </>
  );
}
