import { MockTicker } from "@/components/MockTicker";

function Chrome({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-[var(--line)] px-4 py-2.5">
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#d4cfc7]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#d4cfc7]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#d4cfc7]" />
      </div>
      <div className="min-w-0 flex-1 truncate text-center text-[11px] font-medium tracking-wide text-ink-soft/70">
        CounselWorks · {title}
      </div>
      <div className="w-10" />
    </div>
  );
}

export function UpdatesMock({ className = "" }: { className?: string }) {
  return (
    <div className={`mock-window max-w-full overflow-hidden rounded-xl ${className}`}>
      <Chrome title="Dashboard" />
      <MockTicker />
      <div className="grid max-h-[22rem] grid-cols-1 gap-0 overflow-hidden sm:max-h-none md:grid-cols-[1.1fr_0.9fr] md:items-stretch">
        <div className="flex min-h-0 min-w-0 flex-col border-t border-[var(--line)] bg-[#f5f5f4]/80 p-3 sm:p-4 md:h-0 md:min-h-full md:border-t-0">
          <div className="mb-2.5 flex shrink-0 items-center justify-between gap-2 sm:mb-3">
            <div className="flex min-w-0 items-center gap-2 sm:gap-2.5">
              <div className="h-7 w-1 shrink-0 rounded-full bg-amber-400" aria-hidden />
              <p className="truncate text-sm font-semibold tracking-tight text-stone-900 sm:text-base">
                Updates & Reminders
              </p>
            </div>
            <span className="shrink-0 text-[11px] font-medium text-amber-700">Archive</span>
          </div>
          <ul className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-0.5 sm:space-y-2.5">
            {[
              {
                title:
                  "Plan Development & Implementation: Rights & Responsibilities (2026 Updates)",
                body: "L&I has updated the Rights & Responsibilities documents for Plan Development and Plan Implementation. The updated versions will be added to Gardiant soon.",
                published: "Jul 9",
                isNew: true,
              },
              {
                title: "Vocational Conference - Receipts",
                body: "If you are attending this week's vocational conference, thank you! Just a reminder: save your hotel and meal receipts for reimbursement. Actual itemized receipts are required.",
                published: "Jul 8",
                isNew: true,
              },
              {
                title: "Vocational Provider Newsletter",
                body: "The latest vocational provider newsletter from L&I is available.",
                published: "Jun 30",
                isNew: false,
              },
            ].map((item) => (
              <li
                key={item.title}
                className="rounded-xl border border-stone-200/80 bg-white p-2.5 shadow-sm sm:p-3"
              >
                {item.isNew && (
                  <span className="mb-1.5 inline-block rounded-full bg-red-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                    New
                  </span>
                )}
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-2">
                  <p className="min-w-0 flex-1 text-[12px] font-semibold leading-snug text-stone-900 sm:text-[13px]">
                    {item.title}
                  </p>
                  <span className="shrink-0 text-[10px] text-stone-400">
                    Published: {item.published}
                  </span>
                </div>
                <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-stone-600">
                  {item.body}
                </p>
                <span className="mt-1 block text-[11px] font-medium text-amber-600">… More</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden min-w-0 flex-col border-t border-[var(--line)] bg-[#f5f5f4]/80 p-4 sm:flex md:border-l md:border-t-0">
          <div className="mb-3 flex items-center gap-2.5">
            <div className="h-7 w-1 shrink-0 rounded-full bg-emerald-400" aria-hidden />
            <p className="text-base font-semibold tracking-tight text-stone-900">Key dates</p>
          </div>
          <ul className="space-y-2.5">
            {[
              {
                title: "On-the-Job Recovery Webinar",
                body: "Update: Time is now 12:00–1:00 PM. L&I is hosting a webinar for vocational providers.",
                published: "Jun 2",
                dateLabel: "Event date:",
                dateValue: "Jul 15, 2026 at 12:00 PM",
                timeLeft: "4 days left",
                soon: true,
              },
              {
                title: "Monthly Meeting - Mandatory",
                body: "All monthly meetings will be mandatory starting August 5. First Wednesday of each month.",
                published: "Jul 1",
                dateLabel: "Event date:",
                dateValue: "Aug 5, 2026 at 12:00 PM",
                timeLeft: "25 days left",
                soon: false,
              },
              {
                title: "Submit July Closed Case Info.",
                body: "Submit the completed case closure template via Requests.",
                published: "Jul 7",
                dateLabel: "Due date:",
                dateValue: "Aug 7, 2026 at 12:00 PM",
                timeLeft: "27 days left",
                soon: false,
              },
            ].map((d) => (
              <li
                key={d.title}
                className="overflow-hidden rounded-xl border border-stone-200/80 bg-white shadow-sm"
              >
                <div className="space-y-1.5 px-3 pt-3 pb-2">
                  {d.soon && (
                    <span className="inline-block rounded-full bg-amber-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                      Soon
                    </span>
                  )}
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="min-w-0 flex-1 text-[13px] font-semibold leading-snug text-stone-900">
                      {d.title}
                    </p>
                    <span className="shrink-0 text-[10px] text-stone-400">
                      Published: {d.published}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-[11px] leading-relaxed text-stone-600">{d.body}</p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-1.5 border-t border-stone-200/60 bg-stone-50 px-3 py-2">
                  <p className="min-w-0 text-[10px] font-medium text-stone-900">
                    <span className="font-semibold">{d.dateLabel}</span>{" "}
                    <span className="font-normal text-stone-700">{d.dateValue}</span>
                  </p>
                  <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                    {d.timeLeft}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function RequestsMock({ className = "" }: { className?: string }) {
  return (
    <div className={`mock-window max-w-full overflow-hidden rounded-xl ${className}`}>
      <Chrome title="Requests" />
      <div className="p-3 sm:p-5">
        <div className="mb-3 flex flex-wrap gap-2 sm:mb-4">
          {["Open 7", "In progress 4", "Waiting 2"].map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-[var(--line)] bg-paper px-3 py-1 text-xs font-medium text-ink-soft"
            >
              {chip}
            </span>
          ))}
        </div>
        <div className="space-y-2">
          {[
            { id: "CW-184", subject: "Update PD extension date for John Smith", pri: "Normal", status: "Open" },
            { id: "CW-179", subject: "Close referral for Sarah Johnson", pri: "High", status: "In progress" },
            { id: "CW-171", subject: "Process office supply reimbursement", pri: "Low", status: "Waiting" },
          ].map((row) => (
            <div
              key={row.id}
              className="flex items-start justify-between gap-3 rounded-lg border border-[var(--line)] px-3 py-2.5 text-sm"
            >
              <div className="min-w-0">
                <span className="font-mono text-[11px] text-ink-soft/60">{row.id}</span>
                <p className="mt-0.5 font-medium leading-snug text-ink">{row.subject}</p>
              </div>
              <span className="shrink-0 rounded-md bg-mist px-2 py-0.5 text-[11px] text-ink-soft">
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HotlineMock({ className = "" }: { className?: string }) {
  return (
    <div className={`mock-window max-w-full overflow-hidden rounded-xl ${className}`}>
      <Chrome title="Voc Hotline" />
      <div className="max-h-[22rem] space-y-3 overflow-y-auto p-3 sm:max-h-[28rem] sm:p-5">
        <div className="ml-auto max-w-[92%] rounded-2xl rounded-br-md bg-ink px-3.5 py-2.5 text-[13px] leading-snug text-mist sm:max-w-[90%] sm:px-4 sm:py-3 sm:text-sm">
          Is mileage reimbursement allowed in Skill Enhancement Training?
        </div>
        <div className="max-w-full space-y-2.5 rounded-2xl rounded-bl-md border border-[var(--line)] bg-paper px-3.5 py-2.5 text-[13px] leading-relaxed text-ink-soft sm:max-w-[95%] sm:space-y-3 sm:px-4 sm:py-3 sm:text-sm">
          <p>
            Based on the official L&I guidelines,{" "}
            <strong className="font-semibold text-ink">
              mileage reimbursement is NOT allowed in Skill Enhancement Training (SET)
            </strong>
            .
          </p>
          <p>
            The SET Guidelines explicitly state that &ldquo;SET does not cover travel or
            accommodation expenses&rdquo; [SET Guidelines for Vocational Providers]. This means
            workers cannot be reimbursed for mileage, lodging, or other travel costs associated with
            attending SET courses.
          </p>
          <p className="hidden sm:block">
            Additionally, the guidelines clarify that &ldquo;A worker cannot be reimbursed through
            SET&rdquo; [SET Guidelines for Vocational Providers], which reinforces that SET funding
            does not cover any reimbursement to the worker, including mileage.
          </p>
          <div className="hidden sm:block">
            <p className="font-semibold text-ink">What SET does cover:</p>
            <p className="mt-1">
              SET funding may cover tuition, equipment, technology, or software needed to
              participate effectively in the training, but these costs are paid directly to approved
              providers with L&I provider accounts—not reimbursed to the worker [2026MARFSChapter25].
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-copper">Sources</p>
            <ul className="mt-1.5 space-y-1 text-[11px] leading-snug">
              <li>
                SET Guidelines for Vocational Providers —{" "}
                <span className="break-all text-copper">lni.wa.gov/…/SET_Guidelines.pdf</span>
              </li>
              <li>
                2026MARFSChapter25 —{" "}
                <span className="break-all text-copper">lni.wa.gov/…/2026MARFSChapter25.pdf</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PayrollMock({ className = "" }: { className?: string }) {
  return (
    <div className={`mock-window max-w-full overflow-hidden rounded-xl ${className}`}>
      <Chrome title="Payroll" />
      <div className="p-3 sm:p-5">
        <p className="font-display text-lg text-ink">Leave balances</p>
        <div className="mt-4 space-y-3">
          {[
            { name: "Jordan Lee", pto: "64h", sick: "32h" },
            { name: "Sam Rivera", pto: "40h", sick: "48h" },
            { name: "Alex Kim", pto: "88h", sick: "16h" },
          ].map((person) => (
            <div
              key={person.name}
              className="flex items-center justify-between gap-3 rounded-lg border border-[var(--line)] px-3 py-3 sm:px-3.5"
            >
              <span className="min-w-0 truncate text-sm font-semibold text-ink">{person.name}</span>
              <span className="shrink-0 text-xs text-ink-soft">
                PTO {person.pto} · Sick {person.sick}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-mist/70 px-3.5 py-3 text-xs text-ink-soft">
          Pay stub uploaded · Check date Mar 14 · Unread for 3 staff
        </div>
      </div>
    </div>
  );
}

export function HrMock({ className = "" }: { className?: string }) {
  return (
    <div className={`mock-window max-w-full overflow-hidden rounded-xl ${className}`}>
      <Chrome title="HR" />
      <div className="grid gap-0 sm:grid-cols-2">
        <div className="space-y-3 border-b border-[var(--line)] p-3 sm:border-b-0 sm:border-r sm:p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft/60">
            Onboarding
          </p>
          {[
            { step: "Offer letter signed", done: true },
            { step: "I-9 & handbook ack", done: true },
            { step: "Benefits enrollment", done: false },
            { step: "System access checklist", done: false },
          ].map((s) => (
            <div key={s.step} className="flex items-center gap-2 text-sm">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] ${
                  s.done ? "bg-ink text-mist" : "border border-[var(--line)] text-ink-soft/50"
                }`}
              >
                {s.done ? "✓" : ""}
              </span>
              <span className={`min-w-0 ${s.done ? "text-ink" : "text-ink-soft"}`}>{s.step}</span>
            </div>
          ))}
        </div>
        <div className="space-y-3 p-3 sm:p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft/60">
            Acknowledgements
          </p>
          <div className="rounded-lg border border-[var(--line)] bg-paper p-3">
            <p className="text-sm font-semibold leading-snug text-ink">401K Contribution Change Form</p>
            <p className="mt-1 text-xs text-ink-soft">Awaiting signature</p>
          </div>
          <div className="rounded-lg border border-[var(--line)] bg-paper p-3">
            <p className="text-sm font-semibold leading-snug text-ink">John Smith Offer Letter</p>
            <p className="mt-1 text-xs text-ink-soft">Awaiting countersign</p>
          </div>
        </div>
      </div>
    </div>
  );
}
