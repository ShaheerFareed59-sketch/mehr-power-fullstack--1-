import Link from "next/link";

export default function WhyUsPage() {
  return (
    <main>
      <section className="page-hero wrap">
        <h1>Why customers choose MEHR Power</h1>
        <p>
          Four reasons homeowners and small businesses stick with us after the first
          install, plus a few notes from recent customers.
        </p>
      </section>

      <section className="wrap">
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

      <section className="wrap" style={{ paddingTop: 0 }}>
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
          <h2>See it for yourself — get a free site assessment.</h2>
          <Link href="/contact" className="btn-primary">Request an assessment</Link>
        </div>
      </section>
    </main>
  );
}
