import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import CurrentYear from "./current-year";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container-shell footer-main">
        <div className="footer-brand">
          <Link href="/" className="brand footer-brand-link">
            <span className="brand-mark">BJ</span>
            <span className="brand-copy">
              <strong>BJ BRIGHT</strong>
              <span>ENTERPRISES</span>
            </span>
          </Link>

          <p>
            Connecting people with possibilities and businesses
            with talent.
          </p>
        </div>

        <div className="footer-column">
          <h3>Explore</h3>
          <Link href="/about">About us</Link>
          <Link href="/services">Our services</Link>
          <Link href="/jobs">Find jobs</Link>
        </div>

        <div className="footer-column">
          <h3>Get started</h3>
          <Link href="/hire-talent">
            Hire talent <ArrowUpRight size={14} />
          </Link>
          <Link href="/register">Find opportunities</Link>
          <Link href="/contact">Contact us</Link>
        </div>
      </div>

      <div className="container-shell footer-bottom">
        <span>© <CurrentYear /> BJ Bright Enterprises.</span>
        <span>People first. Always.</span>
      </div>
    </footer>
  );
}
