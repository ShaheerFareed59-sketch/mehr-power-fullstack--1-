import { Resend } from "resend";

type QuotePayload = {
  name: string;
  email: string;
  phone: string;
  city: string;
  category: string;
  message: string;
};

/**
 * Sends a notification email to the business when a new quote request comes in.
 * Returns { sent: boolean, reason?: string } instead of throwing, so a missing
 * or misconfigured Resend key never breaks the form submission itself.
 */
export async function sendQuoteNotification(payload: QuotePayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "MEHR Power <onboarding@resend.dev>";

  if (!apiKey || !toEmail) {
    return { sent: false, reason: "RESEND_API_KEY or CONTACT_EMAIL not set" };
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: payload.email,
      subject: `New quote request — ${payload.name} (${payload.city})`,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Phone: ${payload.phone}`,
        `City: ${payload.city}`,
        `Interested in: ${payload.category || "Not specified"}`,
        "",
        "Message:",
        payload.message || "(no message)"
      ].join("\n")
    });

    if (error) return { sent: false, reason: error.message };
    return { sent: true };
  } catch (err) {
    return { sent: false, reason: err instanceof Error ? err.message : "Unknown error" };
  }
}
