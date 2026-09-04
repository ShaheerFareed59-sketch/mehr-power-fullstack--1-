"use client";

import { useMemo, useState } from "react";
import { categories, products as allProducts } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function CategoryFilter({ initialSlug = "all" }: { initialSlug?: string }) {
  const [active, setActive] = useState(initialSlug);

  const filtered = useMemo(() => {
    if (active === "all") return allProducts;
    return allProducts.filter((p) => p.category === active);
  }, [active]);

  return (
    <div>
      <div className="filter-bar">
        <button
          className={`filter-btn ${active === "all" ? "active" : ""}`}
          onClick={() => setActive("all")}
        >
          All products
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            className={`filter-btn ${active === c.slug ? "active" : ""}`}
            onClick={() => setActive(c.slug)}
          >
            {c.name}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">No products in this category yet.</p>
      ) : (
        <div className="products-grid">
          {filtered.map((p) => {
            const cat = categories.find((c) => c.slug === p.category)!;
            return <ProductCard key={p.id} product={p} accent={cat.accent} />;
          })}
        </div>
      )}
    </div>
  );
}
