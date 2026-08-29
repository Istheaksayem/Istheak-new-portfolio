"use client";

import type { CSSProperties } from "react";

type Variant =
  | "hero"
  | "stats"
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "education"
  | "services"
  | "why"
  | "contact";

interface SectionBackgroundProps {
  variant?: Variant;
  className?: string;
}

const blob = (
  style: CSSProperties,
  anim?: "aurora-anim-a" | "aurora-anim-b" | "aurora-anim-c",
  extra = "",
) => (
  <div
    aria-hidden
    className={`pointer-events-none absolute rounded-full blur-3xl ${
      anim ?? ""
    } ${extra}`}
    style={style}
  />
);

export function SectionBackground({
  variant = "about",
  className = "",
}: SectionBackgroundProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      {variant === "hero" && (
        <>
          <div className="absolute inset-0 aurora-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          {blob(
            {
              top: "-10rem",
              left: "50%",
              marginLeft: "-20rem",
              height: "40rem",
              width: "40rem",
              background:
                "radial-gradient(circle, var(--aurora-indigo), transparent 60%)",
            },
            "aurora-anim-a",
          )}
          {blob(
            {
              bottom: "-6rem",
              right: "0",
              height: "30rem",
              width: "30rem",
              background:
                "radial-gradient(circle, var(--aurora-emerald-soft), transparent 60%)",
            },
            "aurora-anim-b",
          )}
        </>
      )}

      {variant === "stats" && (
        <>
          <div className="absolute inset-0 aurora-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 50% -10%, transparent 0%, var(--bg-deep) 100%)",
            }}
          />
          {blob(
            {
              top: "-8rem",
              left: "-4rem",
              height: "24rem",
              width: "24rem",
              background:
                "radial-gradient(circle, var(--aurora-indigo-soft), transparent 60%)",
            },
            "aurora-anim-c",
          )}
        </>
      )}

      {variant === "about" && (
        <>
          <div className="absolute inset-0 aurora-grid opacity-50 [mask-image:radial-gradient(ellipse_at_30%_20%,black,transparent_75%)]" />
          {blob(
            {
              top: "10%",
              left: "-8rem",
              height: "34rem",
              width: "34rem",
              background:
                "radial-gradient(circle, var(--aurora-indigo), transparent 60%)",
            },
            "aurora-anim-a",
          )}
        </>
      )}

      {variant === "skills" && (
        <>
          <div className="absolute inset-0 aurora-grid opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
          {blob(
            {
              top: "-6rem",
              right: "-6rem",
              height: "22rem",
              width: "22rem",
              background:
                "radial-gradient(circle, var(--aurora-indigo-soft), transparent 60%)",
            },
            "aurora-anim-b",
          )}
        </>
      )}

      {variant === "projects" && (
        <>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 100% at 50% 0%, transparent 0%, var(--bg-deep) 95%)",
            }}
          />
          <div className="absolute inset-0 aurora-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_85%)]" />
          {blob(
            {
              bottom: "-10rem",
              left: "50%",
              marginLeft: "-11rem",
              height: "22rem",
              width: "22rem",
              background:
                "radial-gradient(circle, var(--aurora-emerald-soft), transparent 60%)",
            },
            "aurora-anim-c",
          )}
        </>
      )}

      {variant === "experience" && (
        <>
          <div className="absolute inset-0 aurora-grid opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
          {blob(
            {
              top: "-12rem",
              left: "50%",
              marginLeft: "-19rem",
              height: "38rem",
              width: "38rem",
              background:
                "radial-gradient(circle, var(--aurora-indigo-soft), transparent 60%)",
            },
            "aurora-anim-a",
          )}
        </>
      )}

      {variant === "education" && (
        <div className="absolute inset-0 aurora-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_82%)]" />
      )}

      {variant === "services" && (
        <>
          <div className="absolute inset-0 aurora-grid opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
          {blob(
            {
              top: "20%",
              right: "-8rem",
              height: "34rem",
              width: "34rem",
              background:
                "radial-gradient(circle, var(--aurora-emerald), transparent 60%)",
            },
            "aurora-anim-b",
          )}
        </>
      )}

      {variant === "why" && (
        <>
          <div className="absolute inset-0 aurora-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_84%)]" />
          {blob(
            {
              bottom: "-8rem",
              right: "-6rem",
              height: "24rem",
              width: "24rem",
              background:
                "radial-gradient(circle, var(--aurora-emerald-soft), transparent 60%)",
            },
            "aurora-anim-c",
          )}
        </>
      )}

      {variant === "contact" && (
        <>
          <div className="absolute inset-0 aurora-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
          {blob(
            {
              top: "-10rem",
              left: "-8rem",
              height: "40rem",
              width: "40rem",
              background:
                "radial-gradient(circle, var(--aurora-indigo), transparent 60%)",
            },
            "aurora-anim-a",
          )}
          {blob(
            {
              bottom: "-12rem",
              right: "-8rem",
              height: "42rem",
              width: "42rem",
              background:
                "radial-gradient(circle, var(--aurora-emerald), transparent 60%)",
            },
            "aurora-anim-b",
          )}
        </>
      )}
    </div>
  );
}
