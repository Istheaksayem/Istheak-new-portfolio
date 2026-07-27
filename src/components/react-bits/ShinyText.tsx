"use client";

interface ShinyTextProps {
  text: string;
  speed?: number;
  className?: string;
}

export function ShinyText({
  text,
  speed = 3,
  className = "",
}: ShinyTextProps) {
  return (
    <span
      className={`inline-block bg-[length:200%_100%] bg-clip-text text-transparent animate-shine ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(120deg, currentColor 0%, currentColor 20%, #6C63FF 40%, currentColor 60%, currentColor 80%, currentColor 100%)",
        animationDuration: `${speed}s`,
      }}
    >
      {text}
    </span>
  );
}
