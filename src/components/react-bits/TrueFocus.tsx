"use client";

import { motion } from "motion/react";

interface TrueFocusProps {
  sentence: string;
  className?: string;
}

export function TrueFocus({ sentence, className = "" }: TrueFocusProps) {
  const words = sentence.split(" ");

  return (
    <span className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-flex overflow-hidden">
          <motion.span
            initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: i * 0.12,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
