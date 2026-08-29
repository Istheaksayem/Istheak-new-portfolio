"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import type Lenis from "lenis";
import { navLinks } from "@/data/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    for (const link of navLinks) {
      const el = document.querySelector(link.href);
      if (!el) continue;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(link.href);
        },
        { threshold: 0.4, rootMargin: "-40% 0px -55% 0px" },
      );
      observer.observe(el);
      observers.push(observer);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    const lenis = (window as unknown as { lenis?: Lenis }).lenis;
    if (lenis) {
      lenis.scrollTo(el as HTMLElement, { offset: -80 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-4 sm:top-4">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={`glass flex w-full max-w-3xl items-center justify-between rounded-full px-3 py-2 transition-all duration-300 sm:px-4 ${
          scrolled
            ? "shadow-glow"
            : ""
        }`}
      >
        <button
          onClick={() => handleClick("#hero")}
          className="group flex items-center text-base font-bold tracking-tight sm:text-lg"
          aria-label="Go to top"
        >
          <span className="bg-gradient-to-r from-foreground to-foreground bg-clip-text text-transparent transition-all duration-300 group-hover:from-primary group-hover:to-secondary">
            Istheak
          </span>
          <span className="text-primary">.</span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className={`relative rounded-full px-3 py-2 text-sm transition-colors ${
                activeSection === link.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
              {activeSection === link.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-3 -bottom-0.5 h-px rounded-full bg-gradient-to-r from-primary to-secondary"
                />
              )}
            </button>
          ))}
          <div className="ml-1 border-l border-border pl-2">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-full"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <div className="flex flex-col gap-1.5">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block h-px w-5 bg-foreground"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-px w-5 bg-foreground"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block h-px w-5 bg-foreground"
              />
            </div>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="glass absolute top-16 left-4 right-4 flex flex-col gap-1 rounded-2xl p-3 sm:left-auto sm:right-4 sm:w-64"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => handleClick(link.href)}
                className={`rounded-xl px-4 py-3 text-left text-base font-medium transition-colors hover:bg-muted ${
                  activeSection === link.href
                    ? "text-primary"
                    : "text-foreground"
                }`}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
