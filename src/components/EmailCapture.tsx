"use client";

import { FormEvent, useState } from "react";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("Your new favorite mornings with Christ + Pilates.");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setMessage("Submitting...");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      let payload: { error?: string; details?: string } = {};
      try {
        payload = (await response.json()) as typeof payload;
      } catch {
        /* non-JSON body */
      }

      if (!response.ok) {
        setStatus("error");
        setMessage(
          payload.error || "Could not join the list. Please try again.",
        );
        return;
      }

      setStatus("success");
      setMessage("You are on the list. We will be in touch soon.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Check your connection and try again.");
    }
  }

  return (
    <section className="fadeIn-delay-2 fadeIn mt-8 w-full max-w-xl px-2">
      <div className="relative overflow-hidden rounded-3xl border border-white/30 bg-white/10 p-4 shadow-[0_14px_40px_rgba(0,0,0,0.35)] backdrop-blur-lg sm:p-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0.08) 100%), radial-gradient(120% 80% at 50% 100%, rgba(255, 230, 185, 0.28) 0%, rgba(255, 238, 210, 0.12) 42%, transparent 72%)",
          }}
        />
        <div className="relative">
          <p className="font-headline mb-3 flex items-center justify-center gap-1.5 text-center text-sm font-medium uppercase tracking-[0.12em] text-white/90">
            <span>Coming May 2026</span>
            <span
              aria-hidden
              className="text-[#FFEFD6]/90 [filter:drop-shadow(0_0_7px_rgba(255,239,214,0.55))]"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                <path d="M18 2.5a.75.75 0 0 1 .72.54l.88 2.84a3.2 3.2 0 0 0 2.12 2.12l2.84.88a.75.75 0 0 1 0 1.44l-2.84.88a3.2 3.2 0 0 0-2.12 2.12l-.88 2.84a.75.75 0 0 1-1.44 0l-.88-2.84a3.2 3.2 0 0 0-2.12-2.12l-2.84-.88a.75.75 0 0 1 0-1.44l2.84-.88A3.2 3.2 0 0 0 16.4 5.88l.88-2.84a.75.75 0 0 1 .72-.54ZM7.25 11.5a.75.75 0 0 1 .72.54l.46 1.48a2.2 2.2 0 0 0 1.45 1.45l1.48.46a.75.75 0 0 1 0 1.44l-1.48.46a2.2 2.2 0 0 0-1.45 1.45l-.46 1.48a.75.75 0 0 1-1.44 0l-.46-1.48a2.2 2.2 0 0 0-1.45-1.45l-1.48-.46a.75.75 0 0 1 0-1.44l1.48-.46a2.2 2.2 0 0 0 1.45-1.45l.46-1.48a.75.75 0 0 1 .72-.54Z" />
              </svg>
            </span>
          </p>
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex w-full max-w-lg flex-col gap-2.5 sm:flex-row"
          >
            <label htmlFor="email-capture" className="sr-only">
              Email address
            </label>
            <input
              id="email-capture"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="h-11 w-full rounded-full border border-white/30 bg-black/25 px-4 text-[15px] text-white placeholder:text-white/65 shadow-[inset_0_1px_2px_rgba(0,0,0,0.22)] outline-none transition focus:border-sky-blue focus:bg-black/35"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="h-11 shrink-0 rounded-full border border-white/30 bg-gradient-to-r from-[#6EADE4] to-[#8ABAE8] px-4 font-headline text-xs font-semibold tracking-wide text-brand-light shadow-[0_8px_18px_rgba(110,173,228,0.35)] transition hover:brightness-110 sm:px-5 sm:text-sm"
            >
              {status === "loading"
                ? "Joining..."
                : "Join the waitlist"}
            </button>
          </form>
          <p className="mt-3 min-h-[1.75rem] text-center text-sm font-medium leading-snug text-brand-light/90 sm:text-base">
            {message}
          </p>
        </div>
      </div>
    </section>
  );
}
