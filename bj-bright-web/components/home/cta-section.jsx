
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CtaSection() {
  return (
    <section className="cta-section">
      <div className="container-shell cta-inner">
        <div>
          <div className="section-kicker kicker-light">
            <span className="kicker-line" />
            YOUR NEXT CHAPTER
          </div>

          <h2>
            Let&apos;s make
            <br />
            <span>the right connection.</span>
          </h2>

          <p>
            Growing a team or looking for your next opportunity?
            Start a conversation with us.
          </p>
        </div>

        <div className="cta-actions">
          <Button  size="lg" className="cta-button">
            <Link href="/hire-talent">
              I&apos;m hiring <ArrowUpRight size={18} />
            </Link>
          </Button>

          <Button
            
            size="lg"
            variant="outline"
            className="cta-outline"
          >
            <Link href="/register">
              I&apos;m looking for work
              <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
