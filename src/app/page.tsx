import type { ReactNode } from "react";
import { DemoForm } from "@/components/DemoForm";
import {
  HotlineMock,
  HrMock,
  PayrollMock,
  RequestsMock,
  UpdatesMock,
} from "@/components/MockFrames";
import { Reveal } from "@/components/Reveal";
import { SiteHeader } from "@/components/SiteHeader";

const modules = [
  { name: "Updates", blurb: "Announcements, key dates, ticker" },
  { name: "Requests", blurb: "Internal helpdesk tickets without email chaos" },
  { name: "Voc Hotline", blurb: "WAC & L&I answers with citations" },
  { name: "Payroll", blurb: "Rates, leave, stubs, analytics" },
  { name: "HR", blurb: "Directory, onboarding, reviews" },
  { name: "Phone book", blurb: "Firm contacts in one place" },
];

export default function Home() {
  return (
    <div id="top" className="min-h-screen overflow-x-hidden">
      <SiteHeader />

      {/* Hero — brand first, one composition */}
      <section className="hero-atmosphere relative pt-20 sm:min-h-[100svh] sm:pt-24">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-12 pt-8 sm:gap-10 sm:px-8 sm:pb-16 sm:pt-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end lg:gap-12 lg:pb-20 lg:pt-16">
          <div className="relative z-10 max-w-xl min-w-0">
            <p className="animate-rise font-display text-xl tracking-tight text-ink sm:text-3xl md:text-4xl">
              Vocational Practice Management
            </p>
            <h1 className="animate-rise-delay mt-4 font-display text-[1.65rem] leading-[1.15] tracking-tight text-ink sm:mt-6 sm:text-5xl sm:leading-[1.12] md:text-[3.25rem]">
              Unified back-office and counselor tools for day-to-day practice management.
            </h1>
            <p className="animate-rise-delay-2 mt-4 max-w-md text-[0.95rem] leading-relaxed text-ink-soft sm:mt-5 sm:text-lg">
              Built for Washington State Voc firm owners and managers—align counselors,
              unblock ops, stay compliant, and automate payroll.
            </p>
            <div className="animate-rise-delay-2 mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="#demo"
                className="inline-flex items-center justify-center rounded-full bg-copper px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_var(--glow)] transition hover:bg-copper-deep"
              >
                Request a demo
              </a>
              <a
                href="#platform"
                className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-white/60 px-6 py-3 text-sm font-semibold text-ink backdrop-blur transition hover:bg-white"
              >
                See the platform
              </a>
            </div>
          </div>
          <div className="animate-mock relative min-w-0 lg:translate-y-2">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_50%_40%,rgba(181,106,43,0.16),transparent_65%)] sm:-inset-8"
            />
            <UpdatesMock />
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="section-atmosphere border-t border-[var(--line)] py-14 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-8">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">
              The problem
            </p>
            <h2 className="mt-4 font-display text-[1.75rem] tracking-tight text-ink sm:text-4xl">
              Voc firms shouldn’t run on scattered email and spreadsheets.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft sm:mt-5 sm:text-lg">
              Deadlines hide in inboxes. IT requests stall. Counselors hunt WAC language. Leave and
              L&I rates live in fragile sheets. Onboarding and acknowledgements fall through the
              cracks. Owners need one place that holds the firm together.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Platform overview */}
      <section id="platform" className="border-t border-[var(--line)] bg-ink py-14 text-mist sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">
              Platform
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-[1.75rem] tracking-tight sm:text-4xl">
              Six connected modules. One Microsoft sign-in.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-mist/75">
              From the morning dashboard to payroll and HR, Vocational Practice Management keeps
              your firm aligned without using and paying for multiple unrelated tools.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {modules.map((m, i) => (
              <Reveal key={m.name} className={i > 0 ? "" : ""}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-5 sm:px-5 sm:py-6">
                  <p className="font-display text-xl text-mist">{m.name}</p>
                  <p className="mt-2 text-sm text-mist/65">{m.blurb}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-[var(--line)] py-8">
        <FeatureBlock
          eyebrow="Updates"
          title="Keep every counselor on the same page."
          body="Publish updates and reminders, track key dates with countdowns, run a live ticker, and popup announcements—so policy changes and deadlines actually get seen."
          mock={<UpdatesMock />}
        />
        <FeatureBlock
          eyebrow="Requests"
          title="Replace email chaos with a real ticketing system."
          body="Staff submit requests with priority and category. Agents assign, reply, and leave internal notes. Owners see what’s open without digging through threads."
          mock={<RequestsMock />}
          reverse
        />
        <FeatureBlock
          eyebrow="Voc Hotline"
          title="Grounded answers to WAC and L&I questions."
          body="Counselors ask in plain language and get guidance with citations—built for Washington vocational rehab work, with history and feedback for continuous improvement."
          mock={<HotlineMock />}
        />
        <FeatureBlock
          eyebrow="Payroll"
          title="Automate how your firm pays your counselors."
          body="Manage employee rates, PTO and sick balances, pay stub delivery, and spreadsheet analysis for L&I-style invoice verification—so payroll and billing stay aligned."
          mock={<PayrollMock />}
          reverse
        />
        <FeatureBlock
          eyebrow="HR"
          title="Hire, onboard, and retain with less friction."
          body="Directory and documents, onboarding checklists, performance cycles, and acknowledgements with e-sign and countersign—so people ops scale with your caseload."
          mock={<HrMock />}
        />
      </section>

      {/* Audience */}
      <section id="audience" className="section-atmosphere py-14 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-12">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">
                Who it’s for
              </p>
              <h2 className="mt-4 font-display text-[1.75rem] tracking-tight text-ink sm:text-4xl">
                Designed for vocational firm owners and managers.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-soft sm:mt-5 sm:text-lg">
                If you lead a Washington vocational rehabilitation practice, you balance compliance,
                counselors in the field, and the business of running a firm. Vocational Practice
                Management is built for that world—not generic office software dressed up for
                voc rehab firms.
              </p>
            </Reveal>
            <Reveal>
              <ul className="space-y-3 sm:space-y-4">
                {[
                  "Owners who need visibility without living in every inbox",
                  "Office managers coordinating deadlines, leave, and onboarding",
                  "Lead counselors who need faster, citeable guidance",
                  "Growing firms ready to leave spreadsheet ops behind",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl border border-[var(--line)] bg-white/70 px-4 py-3.5 text-sm text-ink-soft sm:text-base"
                  >
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-copper" />
                    <span className="min-w-0">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-t border-[var(--line)] bg-white py-14 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-8">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">
              Trust
            </p>
            <h2 className="mt-4 font-display text-[1.75rem] tracking-tight text-ink sm:text-4xl">
              Enterprise sign-in. Role-aware access.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:mt-5 sm:text-lg">
              Staff sign in with Microsoft 365. Admins control who can manage updates, handle
              requests, review payroll, and administer HR—so sensitive firm data stays in the right
              hands.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="border-t border-[var(--line)] bg-mist/50 py-14 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:gap-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">
              Next step
            </p>
            <h2 className="mt-4 font-display text-[1.75rem] tracking-tight text-ink sm:text-4xl">
              Request a demo
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft sm:mt-5 sm:text-lg">
              Tell us about your firm. We’ll walk you through the platform with your workflows in
              mind—using sample environments like CounselWorks so you can see how a voc practice
              actually runs day to day.
            </p>
          </Reveal>
          <Reveal>
            <DemoForm />
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-[var(--line)] bg-ink py-10 text-mist/70 sm:py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div className="min-w-0">
            <p className="font-display text-lg text-mist">Vocational Practice Management</p>
            <p className="mt-1 text-xs tracking-wide text-mist/45">VPM</p>
            <p className="mt-3 max-w-sm text-sm">
              Software for Washington vocational rehabilitation firm owners and managers.
            </p>
          </div>
          <div className="text-sm">
            <a href="#demo" className="transition hover:text-mist">
              Request a demo
            </a>
            <span className="mx-3 opacity-30">·</span>
            <span className="opacity-60">Privacy</span>
            <p className="mt-4 text-xs text-mist/40">
              © {new Date().getFullYear()} Vocational Practice Management, LLC
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureBlock({
  eyebrow,
  title,
  body,
  mock,
  reverse = false,
}: {
  eyebrow: string;
  title: string;
  body: string;
  mock: ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className="border-b border-[var(--line)] py-12 sm:py-24">
      <div
        className={`mx-auto grid max-w-6xl items-center gap-8 px-4 sm:gap-10 sm:px-8 lg:grid-cols-2 lg:gap-14 ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <Reveal className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">
            {eyebrow}
          </p>
          <h2 className="mt-4 font-display text-[1.75rem] tracking-tight text-ink sm:text-[2.35rem]">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft sm:mt-5 sm:text-lg">{body}</p>
        </Reveal>
        <Reveal className="min-w-0">{mock}</Reveal>
      </div>
    </div>
  );
}
