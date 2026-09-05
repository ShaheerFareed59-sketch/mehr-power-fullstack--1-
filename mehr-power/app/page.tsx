import Link from "next/link";
import Hero3D from "@/components/Hero3D";
import ExplodedDiagram from "@/components/ExplodedDiagram";
import { categories } from "@/lib/products";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="wrap" style={{ display: "contents" }}>
          <div className="hero-copy">
            <div className="kicker">Solar · Lithium storage · Backup generators</div>
            <h1>Power that doesn&apos;t wait for the grid.</h1>
            <p>
              We design solar arrays, lithium battery banks and hybrid generators as one
              connected system — so your home or business keeps running through every
              outage, not just the short ones.
            </p>
            <div className="hero-actions">
              <Link href="/contact" className="btn-primary">Plan my system</Link>
              <Link href="#process" className="btn-ghost">See how it works</Link>
            </div>
          </div>
          <div className="hero-visual">
            <Hero3D />
          </div>
        </div>
      </section>

      <div className="strip">
        <div className="wrap">
          <div className="strip-item">
            <strong>One system, one install</strong>
            Solar, battery and generator wired together from day one — not bolted on later.
          </div>
          <div className="strip-item">
            <strong>10-year output warranty</strong>
            On every panel we install, backed by manufacturer performance data.
          </div>
          <div className="strip-item">
            <strong>Under 10 seconds</strong>
            Automatic switchover to stored battery power when the grid drops.
          </div>
        </div>
      </div>

      <section className="wrap">
        <div className="section-head">
          <h2>Three systems. Built to run together.</h2>
          <p>
            Each component is sized to your actual load — roof space, appliance draw, and
            how many hours you need to ride out — rather than a one-size package.
          </p>
        </div>
        <div className="category-teaser-grid">
          {categories.map((c) => (
            <div key={c.slug} className="teaser-card" style={{ ["--accent" as any]: c.accent }}>
              <h3>{c.name}</h3>
              <p>{c.description}</p>
              <Link href={`/categories/${c.slug}`} className="link">
                View {c.name.toLowerCase()}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section id="process" className="process-section">
        <div className="wrap">
          <div className="section-head">
            <h2>How a system comes together</h2>
            <p>Four stages, from first site visit to a system you can monitor from your phone.</p>
          </div>
          <div className="process-list">
            <div className="process-item">
              <div className="process-num">01</div>
              <h3>Assess</h3>
              <p>A site survey and load calculation based on what you actually run.</p>
            </div>
            <div className="process-item">
              <div className="process-num">02</div>
              <h3>Design</h3>
              <p>Panel count, battery capacity and generator size matched to your roof and outages.</p>
            </div>
            <div className="process-item">
              <div className="process-num">03</div>
              <h3>Install</h3>
              <p>Certified electricians wire panels, battery bank and changeover switch as one system.</p>
            </div>
            <div className="process-item">
              <div className="process-num">04</div>
              <h3>Monitor</h3>
              <p>Track generation, storage and battery health from an app, with support on call.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap why-section">
        <div className="why-copy">
          <h2>Built for load-shedding, not just backup.</h2>
          <ul className="why-list">
            <li><span className="dot" /><span><strong>Sized to your outage hours,</strong> not a generic kWh figure.</span></li>
            <li><span className="dot" /><span><strong>Batteries and generator share a controller,</strong> so the generator only runs when charge is genuinely low.</span></li>
            <li><span className="dot" /><span><strong>Dust and heat-rated components,</strong> chosen for Karachi&apos;s climate.</span></li>
            <li><span className="dot" /><span><strong>One support line</strong> for panels, battery and generator.</span></li>
          </ul>
        </div>
        <ExplodedDiagram />
      </section>

      <section className="wrap">
        <div className="section-head">
          <h2>Why customers choose MEHR Power</h2>
          <p>Four reasons homeowners and small businesses stick with us after the first install.</p>
        </div>
        <div className="reasons-grid">
          <div className="reason-card">
            <h3>You pay for what you need</h3>
            <p>Every quote starts with your actual bill and outage hours — not a fixed package that leaves capacity unused or a gap in coverage.</p>
          </div>
          <div className="reason-card">
            <h3>One team, one warranty</h3>
            <p>Solar, battery and generator are installed and supported by the same team, so a fault doesn&apos;t turn into three phone calls to three vendors.</p>
          </div>
          <div className="reason-card">
            <h3>Built for Karachi&apos;s conditions</h3>
            <p>Components are chosen for heat and dust exposure, not just imported specs that assume a cooler, cleaner climate.</p>
          </div>
          <div className="reason-card">
            <h3>You can see the system working</h3>
            <p>App-based monitoring shows generation, storage and battery health in real time, instead of trusting a black box on your roof.</p>
          </div>
        </div>
      </section>

      <section className="wrap">
        <div className="section-head">
          <h2>What customers say</h2>
          <p>A few notes from recent installs.</p>
        </div>
        <div className="reviews-grid">
          <div className="review-card">
            <div className="review-stars">★★★★★</div>
            <p className="review-quote">
              &ldquo;We used to plan our whole evening around load-shedding hours. Now the switchover is
              automatic and honestly I forget the grid ever went down.&rdquo;
            </p>
            <div className="review-author">
              <div className="review-avatar">AR</div>
              <div>
                <div className="name">Ahmed Raza</div>
                <div className="meta">Gulshan-e-Iqbal, Karachi</div>
              </div>
            </div>
          </div>
          <div className="review-card">
            <div className="review-stars">★★★★★</div>
            <p className="review-quote">
              &ldquo;What sold me was the site visit before the quote — they actually measured our
              load instead of just pushing the biggest package.&rdquo;
            </p>
            <div className="review-author">
              <div className="review-avatar">SF</div>
              <div>
                <div className="name">Sana Farooq</div>
                <div className="meta">DHA Phase 6, Karachi</div>
              </div>
            </div>
          </div>
          <div className="review-card">
            <div className="review-stars">★★★★☆</div>
            <p className="review-quote">
              &ldquo;Install took a bit longer than scheduled, but support has been responsive
              every time we&apos;ve called. Battery health tracking in the app is a nice touch.&rdquo;
            </p>
            <div className="review-author">
              <div className="review-avatar">BK</div>
              <div>
                <div className="name">Bilal Khan</div>
                <div className="meta">North Nazimabad, Karachi</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section wrap">
        <div className="cta-inner">
          <h2>Ready to stop worrying about the next outage?</h2>
          <Link href="/contact" className="btn-primary">Request a free site assessment</Link>
        </div>
      </section>
    </main>
  );
}
