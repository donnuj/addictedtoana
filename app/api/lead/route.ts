import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/lib/config";

interface LeadPayload {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  campaign?: string;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  let body: LeadPayload;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { name, email, phone, message, campaign } = body;

  if (!name?.trim() || !email?.trim() || !isValidEmail(email)) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 422 });
  }

  // --- Notification via email (configure SMTP/Resend/Nodemailer as needed) ---
  // Example: send to alert contacts
  const alertContacts = siteConfig.alertContacts.filter(Boolean);

  // Log lead (replace with your preferred notification service)
  const leadData = {
    name: name.trim(),
    email: email.trim(),
    phone: phone?.trim(),
    message: message?.trim(),
    campaign: campaign?.trim(),
    receivedAt: new Date().toISOString(),
    alertContacts,
  };

  // In production, send email/webhook here
  console.info("[lead]", leadData);

  return NextResponse.json({ ok: true }, { status: 201 });
}
