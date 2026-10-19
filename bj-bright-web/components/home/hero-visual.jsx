"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Check,
  CircleCheck,
  Sparkles,
  Users,
} from "lucide-react";

export function HeroVisual() {
  const reducedMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reducedMotion ? 0 : 0.55,
      delay: reducedMotion ? 0 : delay,
      ease: "easeOut",
    },
  });

  return (
    <div className="hero-visual">
      <div className="visual-orbit orbit-one" />
      <div className="visual-orbit orbit-two" />

      <motion.div className="visual-top-label" {...reveal(0.1)}>
        <span className="status-dot" />
        PEOPLE FIRST. ALWAYS.
      </motion.div>

      <motion.article className="talent-card" {...reveal(0.15)}>
        <div className="talent-card-header">
          <div>
            <span className="eyebrow">TALENT CONNECTIONS</span>
            <h3>
              Better people.
              <br />
              Brighter possibilities.
            </h3>
          </div>
          <span className="sparkle-icon">
            <Sparkles size={20} />
          </span>
        </div>

        <div className="match-divider" />

        {[
          { initial: "A", title: "Product Designer", detail: "Creative · Problem solver", cls: "avatar-one" },
          { initial: "D", title: "Software Engineer", detail: "Technical · Collaborative", cls: "avatar-two" },
          { initial: "R", title: "HR Specialist", detail: "People · Operations", cls: "avatar-three" },
        ].map((person) => (
          <div className="candidate-row" key={person.title}>
            <span className={`avatar ${person.cls}`}>{person.initial}</span>
            <span className="candidate-info">
              <strong>{person.title}</strong>
              <span>{person.detail}</span>
            </span>
            <span className="match-check">
              <Check size={14} />
            </span>
          </div>
        ))}

        <div className="talent-card-footer">
          <CircleCheck size={17} />
          The right fit starts here.
        </div>
      </motion.article>

      <motion.div className="floating-note floating-note-top" {...reveal(0.45)}>
        <span className="note-icon">
          <Users size={19} />
        </span>
        <span>
          <strong>Talent first</strong>
          <small>People-powered growth</small>
        </span>
      </motion.div>

      <motion.div className="floating-note floating-note-bottom" {...reveal(0.6)}>
        <span className="note-icon note-icon-green">
          <CircleCheck size={19} />
        </span>
        <span>
          <strong>Your next chapter</strong>
          <small>Careers &amp; opportunities</small>
        </span>
        <ArrowUpRight size={17} />
      </motion.div>

      <div className="visual-bottom-caption">
        <span>PEOPLE</span>
        <span>POTENTIAL</span>
        <span>PROGRESS</span>
      </div>
    </div>
  );
}