import ContactForm from "@/components/ContactForm";
import { products } from "@/lib/products";
import { buildWhatsAppLink } from "@/lib/site";

export default function ContactPage({
  searchParams
}: {
  searchParams: { product?: string; category?: string };
}) {
  const matchedProduct = searchParams.product
    ? products.find((p) => p.id === searchParams.product)
    : undefined;
  const presetCategory = matchedProduct?.category ?? searchParams.category;

  return (
    <main>
      <section className="wrap" style={{ padding: "80px 0 100px" }}>
        <div className="contact-grid">
          <div className="contact-info">
            <h2>Let&apos;s size a system for your home.</h2>
            <p>
              Tell us your city and roughly how many hours you lose power — we&apos;ll follow
              up with a free site assessment and a system proposal.
            </p>

            <div className="contact-detail">
              <span className="label">Phone</span>
              <span className="value">+92 330 1450272</span>
            </div>
            <div className="contact-detail">
              <span className="label">WhatsApp</span>
              <span className="value">
                <a
                  href={buildWhatsAppLink("Hi MEHR Power, I'd like to ask about a system for my home.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-link"
                >
                  Chat on WhatsApp
                </a>
              </span>
            </div>
            <div className="contact-detail">
              <span className="label">Email</span>
              <span className="value">hello@mehrpower.example</span>
            </div>
            <div className="contact-detail">
              <span className="label">Service area</span>
              <span className="value">Karachi, Sindh</span>
            </div>
          </div>

          <div>
            <ContactForm presetCategory={presetCategory} />
          </div>
        </div>
      </section>
    </main>
  );
}
