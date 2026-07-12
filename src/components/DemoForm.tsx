"use client";

import { useState, type FormEvent } from "react";

const FIRM_SIZES = ["1–5", "6–15", "16–40", "41+"];

export function DemoForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string; mailto?: string };
      if (!res.ok) {
        setStatus("error");
        setError(json.error || "Something went wrong. Please try again.");
        if (json.mailto) {
          window.location.href = json.mailto;
        }
        return;
      }
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
      setError("Network error. Please try again or email us directly.");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl border border-[var(--line)] bg-white px-6 py-10 text-center shadow-sm">
        <p className="font-display text-2xl text-ink">Thank you</p>
        <p className="mt-3 text-ink-soft">
          We received your request and will reach out shortly to schedule a demo.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-[var(--line)] bg-white p-4 shadow-sm sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Full name</span>
          <input
            required
            name="name"
            autoComplete="name"
            className="w-full rounded-lg border border-[var(--line)] bg-paper px-3 py-2.5 outline-none ring-copper/30 transition focus:ring-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Firm name</span>
          <input
            required
            name="firm"
            autoComplete="organization"
            className="w-full rounded-lg border border-[var(--line)] bg-paper px-3 py-2.5 outline-none ring-copper/30 transition focus:ring-2"
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Work email</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className="w-full rounded-lg border border-[var(--line)] bg-paper px-3 py-2.5 outline-none ring-copper/30 transition focus:ring-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Phone</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className="w-full rounded-lg border border-[var(--line)] bg-paper px-3 py-2.5 outline-none ring-copper/30 transition focus:ring-2"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-ink">Firm size</span>
        <select
          name="firmSize"
          defaultValue=""
          className="w-full rounded-lg border border-[var(--line)] bg-paper px-3 py-2.5 outline-none ring-copper/30 transition focus:ring-2"
        >
          <option value="" disabled>
            Select…
          </option>
          {FIRM_SIZES.map((size) => (
            <option key={size} value={size}>
              {size} people
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-ink">Anything we should know?</span>
        <textarea
          name="message"
          rows={3}
          className="w-full resize-y rounded-lg border border-[var(--line)] bg-paper px-3 py-2.5 outline-none ring-copper/30 transition focus:ring-2"
        />
      </label>
      {error ? <p className="text-sm text-copper-deep">{error}</p> : null}
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center rounded-full bg-copper px-6 py-3 text-sm font-semibold text-white transition hover:bg-copper-deep disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Sending…" : "Request a demo"}
      </button>
    </form>
  );
}
