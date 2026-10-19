
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { HeroVisual } from "@/components/home/hero-visual";

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="container-shell hero-grid">
        <div className="hero-copy">
          <div className="section-kicker">
            <span className="kicker-line" />
            RECRUITMENT. REIMAGINED.
          </div>

          <h1>
            The right people.
            <br />
            <span>The brighter</span>
            <br />
            future.
          </h1>

          <p className="hero-description">
            Great businesses begin with great people. We help
            employers connect with talent and professionals
            explore meaningful opportunities.
          </p>

          <div className="hero-actions">
            <Button  size="lg" className="primary-button">
              <Link href="/hire-talent">
                Hire the right talent
                <ArrowUpRight size={18} />
              </Link>
            </Button>

            <Button
              
              size="lg"
              variant="outline"
              className="secondary-button"
            >
              <Link href="/jobs">
                Explore opportunities
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>

          <div className="hero-trust">
            <span className="trust-icon">
              <CheckCircle2 size={19} />
            </span>

            <p>
              <strong>People over paperwork.</strong>
              <span>
                Thoughtful recruitment built around people.
              </span>
            </p>
          </div>
        </div>

        <HeroVisual />
      </div>

      <div className="container-shell hero-bottom">
        <span>BUILT AROUND PEOPLE</span>

        <span className="hero-bottom-center">
          Talent meets opportunity
        </span>

        <Link href="#services">
          OUR APPROACH <ArrowDownRight size={15} />
        </Link>
      </div>
    </section>
  );
}
