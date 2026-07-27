"use client";

import { useState, useEffect } from "react";

interface TypewriterProps {
  words: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
}

export function Typewriter({
  words,
  className = "",
  typeSpeed = 80,
  deleteSpeed = 50,
  pauseDuration = 2000,
}: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(
      () => {
        if (!deleting && charIndex < currentWord.length) {
          setCharIndex((c) => c + 1);
        } else if (!deleting && charIndex === currentWord.length) {
          setTimeout(() => setDeleting(true), pauseDuration);
        } else if (deleting && charIndex > 0) {
          setCharIndex((c) => c - 1);
        } else if (deleting && charIndex === 0) {
          setDeleting(false);
          setWordIndex((w) => (w + 1) % words.length);
        }
      },
      deleting ? deleteSpeed : typeSpeed,
    );

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, typeSpeed, deleteSpeed, pauseDuration]);

  return (
    <span className={className}>
      {words[wordIndex].slice(0, charIndex)}
      <span className="inline-block h-[1em] w-[2px] animate-blink bg-primary align-middle" />
    </span>
  );
}
