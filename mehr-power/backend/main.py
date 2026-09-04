"""
MEHR Power — backend API (FastAPI)

Run locally:
    pip install -r requirements.txt --break-system-packages
    uvicorn main:app --reload --port 8000

Then point the Next.js app at it by setting, in the project root's .env.local:
    NEXT_PUBLIC_API_URL=http://localhost:8000

Email notifications (optional): set RESEND_API_KEY and CONTACT_EMAIL as
environment variables before starting uvicorn — see README.md.
"""

import os
import uuid
from datetime import datetime, timezone
from typing import Optional

import resend
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

from data import CATEGORIES, PRODUCTS, LOADSHEDDING_WINDOWS
from models import QuoteRequest, QuoteRecord, QuoteResponse, LoadSheddingWindow

RESEND_API_KEY = os.environ.get("RESEND_API_KEY")
CONTACT_EMAIL = os.environ.get("CONTACT_EMAIL")
FROM_EMAIL = os.environ.get("RESEND_FROM_EMAIL", "MEHR Power <onboarding@resend.dev>")


def send_quote_notification(quote: QuoteRequest) -> bool:
    """Best-effort email notification — never raises, just returns whether it sent."""
    if not RESEND_API_KEY or not CONTACT_EMAIL:
        return False
    try:
        resend.api_key = RESEND_API_KEY
        resend.Emails.send({
            "from": FROM_EMAIL,
            "to": CONTACT_EMAIL,
            "reply_to": quote.email,
            "subject": f"New quote request — {quote.name} ({quote.city})",
            "text": (
                f"Name: {quote.name}\n"
                f"Email: {quote.email}\n"
                f"Phone: {quote.phone}\n"
                f"City: {quote.city}\n"
                f"Interested in: {quote.category or 'Not specified'}\n\n"
                f"Message:\n{quote.message or '(no message)'}"
            ),
        })
        return True
    except Exception:
        return False

app = FastAPI(title="MEHR Power API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# In-memory store — swap for a real database (Postgres, SQLite, etc.) in production.
QUOTES: list[QuoteRecord] = []


@app.get("/api/categories")
def list_categories():
    return CATEGORIES


@app.get("/api/products")
def list_products(category: Optional[str] = Query(default=None)):
    if category and category not in {c["slug"] for c in CATEGORIES}:
        raise HTTPException(status_code=404, detail=f"Unknown category '{category}'.")
    if not category:
        return PRODUCTS
    return [p for p in PRODUCTS if p["category"] == category]


@app.get("/api/products/{product_id}")
def get_product(product_id: str):
    for p in PRODUCTS:
        if p["id"] == product_id:
            return p
    raise HTTPException(status_code=404, detail="Product not found.")


@app.post("/api/quote", response_model=QuoteResponse, status_code=201)
def create_quote(payload: QuoteRequest):
    record = QuoteRecord(
        id=str(uuid.uuid4()),
        received_at=datetime.now(timezone.utc),
        **payload.model_dump(),
    )
    QUOTES.append(record)
    send_quote_notification(payload)
    return QuoteResponse(ok=True, id=record.id, received_at=record.received_at)


@app.get("/api/quotes")
def list_quotes():
    # Demo-only: no auth. Add an auth dependency before using this in production.
    return QUOTES


@app.get("/api/loadshedding", response_model=LoadSheddingWindow)
def loadshedding(area: str = Query(default="karachi")):
    key = area.strip().lower()
    if key not in LOADSHEDDING_WINDOWS:
        raise HTTPException(status_code=404, detail=f"No data for area '{area}'.")
    return LOADSHEDDING_WINDOWS[key]


@app.get("/api/health")
def health():
    return {"status": "ok", "time": datetime.now(timezone.utc).isoformat()}
