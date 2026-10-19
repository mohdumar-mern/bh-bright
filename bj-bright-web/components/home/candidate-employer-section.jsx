
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Users,
} from "lucide-react";

import "./candidate-employer-section.css";
import RecruitmentFormModal from "./recruitment-form-modal";

const options = [
  {
    id: "candidates",
    label: "FOR JOB SEEKERS",
    title: "Looking for a job?",
    description:
      "Submit your profile and explore the right career opportunities.",
    primaryText: "UPLOAD YOUR RESUME",
    secondaryText: "SUBMIT YOUR CV NOW",
    buttonText: "Apply for Jobs",
    href: "/register",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1100&q=80",
    imageAlt: "Professional woman working in a modern office",
    icon: BriefcaseBusiness,
  },
  {
    id: "employers",
    label: "FOR EMPLOYERS",
    title: "Looking for talent?",
    description:
      "Share your requirements and let us find the right candidates for you.",
    primaryText: "CANDIDATES / STAFF",
    secondaryText: "POST YOUR REQUIREMENT",
    buttonText: "Hire Talent",
    href: "/hire-talent",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1100&q=80",
    imageAlt: "Business team collaborating in an office",
    icon: Users,
  },
];

function OpportunityCard({ option, onOpenModal }) {
  const Icon = option.icon;

  function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpenModal(option.id);
    }
  }

  return (
    <article className="opportunity-card">
      {/* Clicking this visual opens the relevant form modal. */}
      <div
        className="opportunity-card__visual"
        role="button"
        tabIndex={0}
        aria-label={`Open ${option.label.toLowerCase()} form`}
        onClick={() => onOpenModal(option.id)}
        onKeyDown={handleKeyDown}
      >
        <div
          className="opportunity-card__image"
          role="img"
          aria-label={option.imageAlt}
          style={{
            backgroundImage: `url("${option.image}")`,
          }}
        />

        <div className="opportunity-card__overlay" />

        <div className="opportunity-card__content">
          <span className="opportunity-card__label">
            {option.label}
          </span>

          <h3>{option.title}</h3>

          <div
            className="opportunity-card__arrow"
            aria-hidden="true"
          >
            <ArrowUpRight size={22} />
          </div>

          <div className="opportunity-card__prompts">
            <span className="opportunity-card__primary">
              {option.primaryText}
            </span>

            <span className="opportunity-card__secondary">
              {option.secondaryText}
            </span>
          </div>
        </div>
      </div>

      <div className="opportunity-card__body">
        <p>{option.description}</p>

        {/* These buttons retain their original navigation. */}
        <Link
          href={option.href}
          className="opportunity-card__button"
        >
          {option.buttonText}
          <ArrowRight size={17} />
        </Link>
      </div>
    </article>
  );
}

export default function CandidateEmployerSection() {
  const [activeForm, setActiveForm] = useState(null);

  function closeModal() {
    setActiveForm(null);
  }

  return (
    <>
      <section
        className="candidate-employer-section"
        aria-labelledby="candidate-employer-title"
      >
        <div className="candidate-employer-section__heading">
          <span>YOUR NEXT OPPORTUNITY STARTS HERE</span>

          <h2 id="candidate-employer-title">
            B J Bright Enterprises — Best Recruitment Agency in
            Noida &amp; Delhi NCR
          </h2>
        </div>

        <div className="candidate-employer-section__container">
          <div className="candidate-employer-section__grid">
            {options.map((option) => (
              <OpportunityCard
                key={option.id}
                option={option}
                onOpenModal={setActiveForm}
              />
            ))}
          </div>
        </div>
      </section>

      <RecruitmentFormModal
        open={activeForm !== null}
        onClose={closeModal}
        type={activeForm}
      />
    </>
  );
}
