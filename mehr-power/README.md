# MEHR Power

A 3D, multi-page marketing site for a solar / lithium battery / generator business,
built with **Next.js (App Router, TypeScript, Three.js)** on the frontend and an
optional **FastAPI (Python)** backend for the quote form and product catalog.

## Structure

```
mehr-power/
  app/
    page.tsx                Home — 3D hero, capability strip, category teasers, process, CTA
    about/page.tsx           About — story, values, timeline
    categories/page.tsx      Categories — client-side filterable product grid
    categories/[slug]/page.tsx   Single category detail page
    contact/page.tsx         Contact / quote form (pre-fills category from a product link)
    api/quote/route.ts       Fallback Next.js API route (works with no Python running)
    globals.css               Shared design system (colors, type, layout)
  components/
    Navbar.tsx, Footer.tsx
    Hero3D.tsx                Three.js scene: rotating solar panel + orbiting battery
    ExplodedDiagram.tsx       CSS 3D exploded battery-cell diagram
    ProductCard.tsx           Mouse-tilt 3D product card
    CategoryFilter.tsx        Client-side category filtering
    ContactForm.tsx           Validated form, submits to the API
  lib/
    products.ts               Shared catalog data + submitQuote() API helper
  backend/                     FastAPI service (optional, richer than the Next.js route)
    main.py, models.py, data.py, requirements.txt
```

## Run the frontend

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. By default the contact form posts to the built-in
Next.js route at `/api/quote` — no Python required.

## Get quote submissions emailed to you

By default, submissions are only saved in memory — nobody gets notified. To get
an email every time someone submits the form:

1. Sign up free at [resend.com](https://resend.com) and grab an API key.
2. Copy `.env.local.example` to `.env.local` in the project root and fill in:
   ```
   RESEND_API_KEY=re_your_key_here
   CONTACT_EMAIL=you@example.com
   ```
   `CONTACT_EMAIL` must match the address you signed up to Resend with, until
   you verify your own domain in the Resend dashboard — until then, emails can
   only be sent to your own account email.
3. Restart `npm run dev`. Submit the form — you should get an email within
   seconds. If `RESEND_API_KEY` is missing, submissions still save normally,
   they just don't trigger an email (check the server console for details).

If you're running the FastAPI backend instead, set the same two variables as
environment variables before starting `uvicorn` (e.g. in a `.env` loaded by
your shell, or `export RESEND_API_KEY=...` / `export CONTACT_EMAIL=...`).

## Run the Python backend (optional)

```bash
cd backend
pip install -r requirements.txt --break-system-packages
uvicorn main:app --reload --port 8000
```

Then copy `.env.local.example` to `.env.local` in the project root and set:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Restart `npm run dev`. The contact form now posts to FastAPI instead, and you get:

- `GET /api/categories` — category list
- `GET /api/products?category=solar-panels` — filtered product list
- `GET /api/products/{id}` — single product
- `POST /api/quote` — validated quote submission (Pydantic)
- `GET /api/quotes` — stored submissions (demo only, no auth — add one before shipping)
- `GET /api/loadshedding?area=karachi` — sample schedule endpoint
- Interactive API docs at `http://localhost:8000/docs`

## Notes

- Both `lib/products.ts` and `backend/data.py` hold the same catalog data —
  in production, point the frontend entirely at the backend's `/api/products`
  instead of the local copy, so there's a single source of truth.
- `QUOTES` in `backend/main.py` and `submissions` in `app/api/quote/route.ts`
  are in-memory and reset on restart — swap in a real database before launch.
- All specs, pricing and warranty figures in the catalog are placeholders —
  replace with your real product data.
