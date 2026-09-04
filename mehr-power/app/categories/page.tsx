import CategoryFilter from "@/components/CategoryFilter";

export default function CategoriesPage() {
  return (
    <main>
      <section className="page-hero wrap">
        <h1>Categories</h1>
        <p>Browse solar panels, lithium battery banks and hybrid generators, or filter down to one category.</p>
      </section>
      <section className="wrap">
        <CategoryFilter />
      </section>
    </main>
  );
}
