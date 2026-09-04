import Link from "next/link";

export default function AboutPage() {
  return (
    <main>
      <section className="page-hero wrap">
        <h1>Built in Karachi, for Karachi&apos;s power problem.</h1>
        <p>
          MEHR Power started with a simple frustration: solar companies sell panels,
          battery companies sell batteries, and generator dealers sell generators — and
          none of them talk to each other. We design and install all three as one system,
          sized around the hours you actually lose power.
        </p>
      </section>

      <section className="wrap">
        <div className="section-head">
          <h2>What we hold ourselves to</h2>
        </div>
        <div className="values-grid">
          <div className="value-card">
            <h3>Sized, not guessed</h3>
            <p>Every system starts with a real load calculation, not a standard package pushed on every customer.</p>
          </div>
          <div className="value-card">
            <h3>One point of contact</h3>
            <p>Panels, battery and generator come from one install team and one support line — no finger-pointing between vendors.</p>
          </div>
          <div className="value-card">
            <h3>Built for local conditions</h3>
            <p>Dust, heat and voltage fluctuations are part of the design brief, not an afterthought.</p>
          </div>
        </div>
      </section>

      <section className="wrap">
        <div className="section-head">
          <h2>Where we&apos;ve been</h2>
        </div>
        <div className="timeline">
          <div className="timeline-item">
            <div className="year">Year 1</div>
            <div>
              <h3>First rooftop installs</h3>
              <p>Started with residential solar-plus-battery installs across Karachi neighbourhoods.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="year">Year 2</div>
            <div>
              <h3>Added hybrid generators</h3>
              <p>Brought generators into the same system design so batteries and fuel back-up share one controller.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="year">Year 3</div>
            <div>
              <h3>App-based monitoring</h3>
              <p>Rolled out remote monitoring so customers and our support team can see system health in real time.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section wrap">
        <div className="cta-inner">
          <h2>Want a system designed around your home?</h2>
          <Link href="/contact" className="btn-primary">Talk to us</Link>
        </div>
      </section>
    </main>
  );
}
