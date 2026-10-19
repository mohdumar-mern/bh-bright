
import Link from "next/link";
import { ArrowRight, CheckCircle2, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

const principles = [
  "A people-first approach",
  "Clear communication",
  "Role-focused recruitment",
];

export default function ApproachSection() {
  return (
    <section className="approach-section section-pad">
      <div className="container-shell approach-grid">
        <div className="approach-visual">
          <div className="approach-circle circle-large" />
          <div className="approach-circle circle-small" />

          <div className="approach-message">
            <Compass size={29} />

            <span>THE RIGHT FIT</span>

            <strong>
              Starts with
              <br />
              understanding.
            </strong>

            <span className="approach-message-bottom">
              PEOPLE FIRST. ALWAYS.
            </span>
          </div>

          <span className="approach-side-label">
            A HUMAN APPROACH
          </span>
        </div>

        <div className="approach-copy">
          <div className="section-kicker">
            <span className="kicker-line" />
            OUR APPROACH
          </div>

          <h2>
            More than a
            <br />
            <span>job title.</span>
          </h2>

          <p>
            Every business has unique goals. Every professional
            brings a different story. Recruitment works best when
            both sides are understood.
          </p>

          <ul className="principles-list">
            {principles.map((principle) => (
              <li key={principle}>
                <CheckCircle2 size={19} />
                {principle}
              </li>
            ))}
          </ul>

          <Button  size="lg" className="primary-button">
            <Link href="/about">
              Get to know us <ArrowRight size={17} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
