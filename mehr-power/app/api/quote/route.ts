import { NextResponse } from "next/server";
import { sendQuoteNotification } from "@/lib/email";

type QuotePayload = {
  name: string;
  email: string;
  phone: string;
  city: string;
  category: string;
  message: string;
};

// In-memory store for demo purposes only — resets on every server restart.
// The FastAPI backend in /backend is the persistent version of this endpoint.
const submissions: (QuotePayload & { id: string; receivedAt: string })[] = [];

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as QuotePayload | null;

  if (!body || !body.name || !body.email || !body.phone || !body.city) {
    return NextResponse.json({ detail: "Missing required fields." }, { status: 422 });
  }
  if (!/^\S+@\S+\.\S+$/.test(body.email)) {
    return NextResponse.json({ detail: "Invalid email address." }, { status: 422 });
  }

  const record = { ...body, id: crypto.randomUUID(), receivedAt: new Date().toISOString() };
  submissions.push(record);

  const emailResult = await sendQuoteNotification(body);

  return NextResponse.json(
    { ok: true, id: record.id, emailSent: emailResult.sent },
    { status: 201 }
  );
}

export async function GET() {
  return NextResponse.json({ count: submissions.length, submissions });
}
