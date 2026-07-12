import { NextResponse } from "next/server";

type DemoBody = {
  name?: string;
  firm?: string;
  email?: string;
  phone?: string;
  firmSize?: string;
  message?: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: DemoBody;
  try {
    body = (await request.json()) as DemoBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = String(body.name || "").trim();
  const firm = String(body.firm || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const phone = String(body.phone || "").trim();
  const firmSize = String(body.firmSize || "").trim();
  const message = String(body.message || "").trim();

  if (!name || !firm || !email || !isEmail(email)) {
    return NextResponse.json(
      { error: "Name, firm, and a valid email are required." },
      { status: 400 }
    );
  }

  const to = process.env.DEMO_INBOX_EMAIL?.trim() || "hello@vocationalpracticemanagement.com";
  const subject = `Demo request — ${firm}`;
  const text = [
    `Name: ${name}`,
    `Firm: ${firm}`,
    `Email: ${email}`,
    `Phone: ${phone || "—"}`,
    `Firm size: ${firmSize || "—"}`,
    "",
    message || "(no message)",
  ].join("\n");

  const resendKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.DEMO_FROM_EMAIL?.trim() || "onboarding@resend.dev";

  if (resendKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: email,
          subject,
          text,
        }),
      });
      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        console.error("Resend error", res.status, detail);
        return NextResponse.json(
          {
            error: "Could not send email. Opening your mail client instead.",
            mailto: `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`,
          },
          { status: 502 }
        );
      }
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("Resend request failed", err);
      return NextResponse.json(
        {
          error: "Could not send email. Opening your mail client instead.",
          mailto: `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`,
        },
        { status: 502 }
      );
    }
  }

  // No Resend key: accept the lead and return a mailto for the client to open.
  console.info("[demo lead]", { name, firm, email, phone, firmSize, message });
  return NextResponse.json({
    ok: true,
    delivered: "logged",
    mailto: `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`,
  });
}
