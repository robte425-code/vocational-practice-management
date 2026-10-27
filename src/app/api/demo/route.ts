import { NextResponse } from "next/server";
import { emailConfigured, sendEmail } from "@/lib/email";

type DemoBody = {
  name?: string;
  firm?: string;
  email?: string;
  phone?: string;
  firmSize?: string;
  message?: string;
  /** Honeypot: hidden in the form, so only bots fill it in. */
  website?: string;
};

const MAX_FIELD_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

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

  // Pretend success so bots don't learn to skip the field.
  if (String(body.website || "").trim()) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !firm || !email || !isEmail(email)) {
    return NextResponse.json(
      { error: "Name, firm, and a valid email are required." },
      { status: 400 }
    );
  }

  if (
    [name, firm, email, phone, firmSize].some((v) => v.length > MAX_FIELD_LENGTH) ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return NextResponse.json(
      { error: `Please keep fields under ${MAX_FIELD_LENGTH} characters and the message under ${MAX_MESSAGE_LENGTH}.` },
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

  // Deployed without Postmark: fail loudly instead of telling the visitor it worked, and keep
  // their details out of the logs.
  if (process.env.NODE_ENV === "production") {
    console.error("[demo lead] POSTMARK_SERVER_TOKEN / EMAIL_FROM not configured; request not delivered");
    return NextResponse.json(
      { error: "Demo requests are temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  // Local development without Postmark: log the lead instead of sending it.
  console.info("[demo lead]", { name, firm, email, phone, firmSize, message });
  return NextResponse.json({
    ok: true,
    delivered: "logged",
  });
}
