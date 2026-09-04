import { notFound } from "next/navigation";
import Link from "next/link";
import { categories, getCategory, getProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default function CategoryDetailPage({ params }: { params: { slug: string } }) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  const products = getProducts(category.slug);

  return (
    <main>
      <section className="page-hero wrap">
        <div className="kicker" style={{ color: category.accent }}>{category.tagline}</div>
        <h1>{category.name}</h1>
        <p>{category.description}</p>
      </section>

      <section className="wrap">
        <div className="filter-bar">
          <Link href="/categories" className="filter-btn">All products</Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              className={`filter-btn ${c.slug === category.slug ? "active" : ""}`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        <div className="products-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} accent={category.accent} />
          ))}
        </div>
      </section>
    </main>
  );
}
