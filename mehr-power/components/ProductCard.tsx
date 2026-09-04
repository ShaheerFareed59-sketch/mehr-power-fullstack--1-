"use client";

import Link from "next/link";
import { useRef } from "react";
import type { Category, Product } from "@/lib/products";

const icons: Record<Category["slug"], JSX.Element> = {
  "solar-panels": (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="24" cy="24" r="7" />
      <path d="M24 4v6M24 38v6M4 24h6M38 24h6M9.5 9.5l4.2 4.2M34.3 34.3l4.2 4.2M9.5 38.5l4.2-4.2M34.3 13.7l4.2-4.2" />
    </svg>
  ),
  "lithium-batteries": (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="8" y="14" width="28" height="20" rx="2" />
      <rect x="36" y="20" width="4" height="8" rx="1" />
      <path d="M14 24h20M20 19v10M28 19v10" />
    </svg>
  ),
  generators: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="6" y="18" width="36" height="16" rx="2" />
      <circle cx="16" cy="26" r="3.4" />
      <path d="M22 26h14M30 21v10" />
    </svg>
  )
};

export default function ProductCard({ product, accent }: { product: Product; accent: string }) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  }

  function onMouseLeave() {
    if (cardRef.current) cardRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
  }

  return (
    <div
      ref={cardRef}
      className="card"
      style={{ ["--card-accent" as any]: accent }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="card-icon">{icons[product.category]}</div>
      <h3>{product.name}</h3>
      <div className="card-sub">{product.summary}</div>
      <ul className="spec-list">
        {product.specs.map((s) => (
          <li key={s.label}>
            <span>{s.label}</span>
            <span>{s.value}</span>
          </li>
        ))}
      </ul>
      <Link href={`/contact?product=${product.id}`} className="card-link">
        Request a quote
      </Link>
    </div>
  );
}
