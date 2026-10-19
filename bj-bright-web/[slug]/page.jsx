import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const pages = {
  about: {
    title: "People first. Always.",
    description:
      "Learn about our approach to recruitment and connecting talent with opportunity.",
  },
  services: {
    title: "Recruitment solutions built around people.",
    description:
      "Explore recruitment services for employers and professionals.",
  },
  jobs: {
    title: "Your next opportunity starts here.",
    description:
      "Our searchable job listings will be available here in the next implementation phase.",
  },
  register: {
    title: "Take the next step in your career.",
    description:
      "Candidate registration and profile management will be implemented in the next phase.",
  },
  contact: {
    title: "Let's start a conversation.",
    description:
      "Use our employer hiring form to send a recruitment enquiry while we build the general contact form.",
  },
};

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = pages[slug];

  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
  };
}

export default async function InformationPage({ params }) {
  const { slug } = await params;
  const page = pages[slug];

  if (!page) notFound();

  return (
    <section className="form-page">
      <div className="container-shell">
        <Link href="/" className="back-link">
          <ArrowLeft size={16} /> Back to home
        </Link>

        <div className="form-heading">
          <div className="section-kicker">
            <span className="kicker-line" />
            BJ BRIGHT ENTERPRISES
          </div>

          <h1>{page.title}</h1>
          <p>{page.description}</p>

          {slug === "contact" && (
            <Link href="/hire-talent" className="header-cta">
              Send a hiring enquiry <ArrowUpRight size={16} />
            </Link>
          )}

          {slug === "jobs" && (
            <p>Job listings are not connected to a database yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}