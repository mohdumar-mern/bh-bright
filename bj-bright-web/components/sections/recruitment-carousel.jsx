
"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

const slides = [
  {
    eyebrow: "OPPORTUNITY FOR EVERYONE",
    title: "100% Free Jobs for Job Seekers",
    description:
      "We connect job seekers with verified opportunities and help them take the next step in their careers.",
    button: "EXPLORE OPPORTUNITIES",
    href: "/jobs",
    image:
      "https://bjbrightenterprises.com/wp-content/uploads/slider/cache/010f36850293e973db44951afd1e971d/pexels-resumegenius-18848929-scaled.jpg",
    alt: "Professional woman in a modern office",
    position: "center 40%",
  },
  {
    eyebrow: "YOUR NEXT CHAPTER",
    title: "Get Hired for Your Dream Job Today",
    description:
      "We help talented professionals discover opportunities that match their skills, experience and ambitions.",
    button: "FIND YOUR NEXT ROLE",
    href: "/jobs",
    image:
      "https://bjbrightenterprises.com/wp-content/uploads/slider/cache/18399c9ac833c07939f3f475dd3f90ef/staff-agreement-applicant-associate-boardroom-business-1652041-pxhere.com_-scaled.jpg",
    alt: "Professional ready for a business meeting",
    position: "center 40%",
  },
  {
    eyebrow: "RECRUITMENT THAT DELIVERS",
    title: "Find & Hire Top Talent for Any Job",
    description:
      "Connect with qualified candidates through recruitment solutions designed around your business needs.",
    button: "HIRE TOP TALENT",
    href: "/hire-talent",
    image:
      "https://bjbrightenterprises.com/wp-content/uploads/slider/cache/7bb747157398bdad075b71ca80c19f04/applicant-attentive-black-business-businessman-businesswoman-1652047-pxhere.com_-scaled.jpg",
    alt: "Professionals collaborating in a team meeting",
    position: "center 45%",
  },
];

export default function RecruitmentCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const next = useCallback(() => {
    setActive((current) => (current + 1) % slides.length);
  }, []);

  const previous = useCallback(() => {
    setActive((current) => (current - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return;

    const timer = window.setInterval(next, 6000);
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion, next]);

  const slide = slides[active];

  return (
    <section
      className="recruitment-carousel"
      aria-label="Recruitment highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
    >
      <div className="recruitment-carousel__frame">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.image}
            className="recruitment-carousel__background"
            style={{
              backgroundImage: `url("${slide.image}")`,
              backgroundPosition: slide.position,
            }}
            role="img"
            aria-label={slide.alt}
            initial={reduceMotion ? false : { opacity: 0, scale: 1.025 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.65 }}
          />
        </AnimatePresence>

        <div className="recruitment-carousel__shade" />

        <div className="recruitment-carousel__content-wrap">
          <AnimatePresence mode="wait">
            <motion.article
              key={slide.title}
              className="recruitment-carousel__card"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0 : 0.35 }}
            >
              <span className="recruitment-carousel__eyebrow">
                {slide.eyebrow}
              </span>

              <h2>{slide.title}</h2>

              <div
                className="recruitment-carousel__zigzag"
                aria-hidden="true"
              >
                〰
              </div>

              <p>{slide.description}</p>

              <a
                href={slide.href}
                className="recruitment-carousel__cta"
              >
                {slide.button}
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </motion.article>
          </AnimatePresence>
        </div>

        <button
          type="button"
          className="recruitment-carousel__arrow recruitment-carousel__arrow--prev"
          onClick={previous}
          aria-label="Previous slide"
        >
          <ArrowLeft size={23} />
        </button>

        <button
          type="button"
          className="recruitment-carousel__arrow recruitment-carousel__arrow--next"
          onClick={next}
          aria-label="Next slide"
        >
          <ArrowRight size={23} />
        </button>

        <div
          className="recruitment-carousel__dots"
          aria-label="Choose a slide"
        >
          {slides.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={`recruitment-carousel__dot ${
                active === index ? "is-active" : ""
              }`}
              onClick={() => setActive(index)}
              aria-label={`Show slide ${index + 1}: ${item.title}`}
              aria-current={active === index ? "true" : undefined}
            />
          ))}
        </div>

        <span className="sr-only" aria-live="polite" aria-atomic="true">
          Slide {active + 1} of {slides.length}: {slide.title}
        </span>
      </div>
    </section>
  );
}
