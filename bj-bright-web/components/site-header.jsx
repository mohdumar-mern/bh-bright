import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/jobs", label: "Find Jobs" },
  { href: "/about", label: "About Us" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container-shell header-inner">
        <Link href="/" className="brand" aria-label="BJ Bright Enterprises home">
          <span className="brand-mark">BJ</span>
          <span className="brand-copy">
            <strong>BJ BRIGHT</strong>
            <span>ENTERPRISES</span>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <Link className="nav-link" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link href="/hire-talent" className="header-cta">
            Hire Talent <ArrowUpRight size={16} />
          </Link>

          <details className="mobile-menu">
            <summary aria-label="Toggle navigation">
              <Menu size={22} />
            </summary>
            <nav aria-label="Mobile navigation">
              {links.map((link) => (
                <Link href={link.href} key={link.href}>
                  {link.label}
                </Link>
              ))}
              <Link href="/hire-talent">Hire Talent</Link>
              <Link href="/register">Find Opportunities</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}