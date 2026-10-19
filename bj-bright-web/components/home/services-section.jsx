
import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, Building2, Users } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Talent Acquisition",
    description:
      "Connect with professionals whose skills and goals align with your business.",
    icon: Users,
    href: "/services",
  },
  {
    number: "02",
    title: "Workforce Solutions",
    description:
      "Recruitment support shaped around your organisation and its needs.",
    icon: Building2,
    href: "/services",
  },
  {
    number: "03",
    title: "Career Opportunities",
    description:
      "Explore opportunities and take your next professional step.",
    icon: BriefcaseBusiness,
    href: "/jobs",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="services-section section-pad">
      <div className="container-shell">
        <div className="section-heading-row">
          <div>
            <div className="section-kicker">
              <span className="kicker-line" />
              WHAT WE DO
            </div>

            <h2>
              People make the
              <br />
              <span>difference.</span>
            </h2>
          </div>

          <p className="section-intro">
            Understand the role, the person and the opportunity
            before making the right connection.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                className="service-card"
                key={service.number}
              >
                <div className="service-card-top">
                  <span className="service-number">
                    {service.number}
                  </span>

                  <span className="service-icon">
                    <Icon size={22} />
                  </span>
                </div>

                <h3>{service.title}</h3>
                <p>{service.description}</p>

                <Link href={service.href} className="service-link">
                  Explore <ArrowUpRight size={17} />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
