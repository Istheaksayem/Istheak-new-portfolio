"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { profile } from "@/data/profile";

// ─── Types ─────────────────────────────────────────────────────────────────────

type FormState = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<FormState>;

type SendStatus = "idle" | "sending" | "success" | "error";

// ─── Validation (client-side) ──────────────────────────────────────────────────

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim() || form.name.trim().length < 2)
    errors.name = "Name must be at least 2 characters.";
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Please enter a valid email address.";
  if (!form.message.trim() || form.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters.";
  return errors;
}

// ─── Inline field error ────────────────────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-1 text-xs text-red-500"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

// ─── Floating Toast ────────────────────────────────────────────────────────────

const TOAST_DURATION_MS = 5000;

function Toast({
  status,
  onDismiss,
}: {
  status: "success" | "error";
  onDismiss: () => void;
}) {
  const ok = status === "success";
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / TOAST_DURATION_MS) * 100);
      setProgress(remaining);
      if (remaining === 0) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.92 }}
      transition={{ type: "spring", stiffness: 340, damping: 28 }}
      role="alert"
      aria-live="polite"
      className={`relative w-[340px] max-w-[90vw] overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-md ${
        ok
          ? "border-emerald-500/30 bg-emerald-950/90 text-emerald-300 dark:bg-emerald-950/95"
          : "border-red-500/30 bg-red-950/90 text-red-300 dark:bg-red-950/95"
      }`}
    >
      {/* Content */}
      <div className="flex items-start gap-3 px-5 py-4">
        {/* Icon */}
        <span
          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
            ok ? "bg-emerald-500/20" : "bg-red-500/20"
          }`}
        >
          {ok ? (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          )}
        </span>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold leading-snug">
            {ok ? "Message Sent Successfully! 🎉" : "Failed to Send"}
          </p>
          <p className="mt-0.5 text-xs opacity-70">
            {ok
              ? "I'll get back to you as soon as possible."
              : "Something went wrong. Please try again or email me directly."}
          </p>
        </div>

        {/* Dismiss */}
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          className="ml-1 shrink-0 rounded-lg p-1 opacity-50 transition-all hover:opacity-100 hover:bg-white/10"
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Auto-dismiss progress bar */}
      <div className="h-0.5 w-full bg-white/10">
        <motion.div
          className={`h-full ${ok ? "bg-emerald-400" : "bg-red-400"}`}
          initial={{ width: "100%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0 }}
        />
      </div>
    </motion.div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [sendStatus, setSendStatus] = useState<SendStatus>("idle");
  const [copied, setCopied] = useState(false);

  const isSending = sendStatus === "sending";
  const isSuccess = sendStatus === "success";
  const isError = sendStatus === "error";

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleChange = useCallback(
    (field: keyof FormState, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      if (touched[field]) {
        setErrors((prev) => {
          const fieldErrors = validate({ ...form, [field]: value });
          const next = { ...prev };
          if (fieldErrors[field]) next[field] = fieldErrors[field];
          else delete next[field];
          return next;
        });
      }
    },
    [form, touched]
  );

  const handleBlur = useCallback(
    (field: keyof FormState) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const fieldErrors = validate(form);
      if (fieldErrors[field])
        setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
    },
    [form]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setTouched({ name: true, email: true, message: true });
      const validationErrors = validate(form);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setSendStatus("sending");

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
            message: form.message.trim(),
          }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error ?? "Unknown error");

        setSendStatus("success");
        setForm({ name: "", email: "", message: "" });
        setErrors({});
        setTouched({});
        setTimeout(() => setSendStatus("idle"), 6000);
      } catch (err) {
        console.error("[Contact] Submit failed:", err);
        setSendStatus("error");
        setTimeout(() => setSendStatus("idle"), 8000);
      }
    },
    [form]
  );

  const copyEmail = useCallback(async () => {
    await navigator.clipboard.writeText(profile.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <AnimatedSection id="contact" className="bg-muted/30 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Contact"
          title="Let's Work Together"
          description="Have a project in mind? I'd love to hear about it. Drop me a message and I'll get back to you."
        />

        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5 lg:col-span-3"
          >


            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                aria-invalid={!!errors.name}
                className={`w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-primary/10 ${
                  errors.name
                    ? "border-red-500 focus:border-red-500"
                    : "border-border focus:border-primary"
                }`}
                placeholder="Your name"
              />
              <FieldError message={errors.name} />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                aria-invalid={!!errors.email}
                className={`w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-primary/10 ${
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-border focus:border-primary"
                }`}
                placeholder="your@email.com"
              />
              <FieldError message={errors.email} />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                maxLength={500}
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                onBlur={() => handleBlur("message")}
                aria-invalid={!!errors.message}
                className={`w-full resize-none rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-primary/10 ${
                  errors.message
                    ? "border-red-500 focus:border-red-500"
                    : "border-border focus:border-primary"
                }`}
                placeholder="Tell me about your project..."
              />
              <div className="flex items-center justify-between">
                <FieldError message={errors.message} />
                <span className="ml-auto text-xs text-muted-foreground">
                  {form.message.length}/500
                </span>
              </div>
            </div>

            {/* Submit */}
            <MagneticButton strength={0.15}>
              <motion.button
                type="submit"
                whileHover={!isSending ? { scale: 1.02 } : undefined}
                whileTap={!isSending ? { scale: 0.98 } : undefined}
                disabled={isSending}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-8 text-sm font-medium text-background transition-all hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSending ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  "Send Message"
                )}
              </motion.button>
            </MagneticButton>
          </motion.form>

          {/* Right column — unchanged */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4 lg:col-span-2"
          >
            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold">Email</h3>
              <button
                onClick={copyEmail}
                className="group flex w-full items-center justify-between rounded-xl border border-border/50 px-4 py-3 text-sm text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5"
              >
                <span>{profile.socials.email}</span>
                <span className="text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  {copied ? "Copied!" : "Copy"}
                </span>
              </button>
            </div>

            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold">Location</h3>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Remote / Open to relocation
              </p>
            </div>

            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold">Social</h3>
              <div className="flex gap-3">
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href={profile.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.969h-1.513c-1.491 0-1.956.93-1.956 1.886v2.262h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Floating Toast (fixed bottom-right) ── */}
      <AnimatePresence>
        {(isSuccess || isError) && (
          <div className="fixed bottom-6 right-6 z-[9999]">
            <Toast
              status={isSuccess ? "success" : "error"}
              onDismiss={() => setSendStatus("idle")}
            />
          </div>
        )}
      </AnimatePresence>
    </AnimatedSection>
  );
}
