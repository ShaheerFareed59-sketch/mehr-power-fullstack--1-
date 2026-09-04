"use client";

import { useState, type FormEvent } from "react";
import { categories, submitQuote } from "@/lib/products";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm({ presetCategory }: { presetCategory?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const payload = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim(),
      city: String(form.get("city") ?? "").trim(),
      category: String(form.get("category") ?? ""),
      message: String(form.get("message") ?? "").trim()
    };

    const errors: Record<string, string> = {};
    if (!payload.name) errors.name = "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(payload.email)) errors.email = "Please enter a valid email address.";
    if (!/^[0-9+\-\s]{7,15}$/.test(payload.phone)) errors.phone = "Please enter a valid phone number.";
    if (!payload.city) errors.city = "City is required.";

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setStatus("submitting");
    setErrorMsg("");
    try {
      await submitQuote(payload);
      setStatus("success");
      formEl.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" type="text" placeholder="Ahmed Raza" />
          {fieldErrors.name && <div className="form-error">{fieldErrors.name}</div>}
        </div>
        <div className="form-field">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" placeholder="0300 1234567" />
          {fieldErrors.phone && <div className="form-error">{fieldErrors.phone}</div>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="you@example.com" />
          {fieldErrors.email && <div className="form-error">{fieldErrors.email}</div>}
        </div>
        <div className="form-field">
          <label htmlFor="city">City</label>
          <input id="city" name="city" type="text" placeholder="Karachi" />
          {fieldErrors.city && <div className="form-error">{fieldErrors.city}</div>}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="category">What are you interested in?</label>
        <select id="category" name="category" defaultValue={presetCategory ?? ""}>
          <option value="">Not sure yet</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="message">Tell us about your outage hours or load</label>
        <textarea id="message" name="message" rows={4} placeholder="e.g. 6–8 hours of load-shedding daily, need to keep fans, fridge and Wi-Fi running" />
      </div>

      <button className="btn-primary" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Request a free site assessment"}
      </button>

      {status === "success" && (
        <p className="form-status success">Thanks — we&apos;ll reach out within one business day.</p>
      )}
      {status === "error" && <p className="form-status error">{errorMsg}</p>}
    </form>
  );
}
