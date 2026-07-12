import { NextResponse } from "next/server";
import { emailConfigured, sendEmail } from "@/lib/email";

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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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

  const to = process.env.DEMO_INBOX_EMAIL?.trim() || "ghim@voc-hotline.org";
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
  const html = [
    `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
    `<p><strong>Firm:</strong> ${escapeHtml(firm)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
    `<p><strong>Phone:</strong> ${escapeHtml(phone || "—")}</p>`,
    `<p><strong>Firm size:</strong> ${escapeHtml(firmSize || "—")}</p>`,
    `<p>${escapeHtml(message || "(no message)").replace(/\n/g, "<br>")}</p>`,
  ].join("\n");

  if (emailConfigured()) {
    try {
      await sendEmail({
        to,
        subject,
        html,
        text,
        replyTo: email,
      });
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("Postmark request failed", err);
      return NextResponse.json(
        {
          error: "Could not send email. Opening your mail client instead.",
          mailto: `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`,
        },
        { status: 502 }
      );
    }
  }

  // No Postmark: accept the lead and return success (suitable for local demos).
  console.info("[demo lead]", { name, firm, email, phone, firmSize, message });
  return NextResponse.json({
    ok: true,
    delivered: "logged",
  });
}
