"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

const initialForm = {
  companyName: "",
  contactPerson: "",
  email: "",
  phone: "",
  jobRole: "",
  openings: "1",
  location: "",
  salaryRange: "",
  requiredSkills: "",
  description: "",
};

export default function HireTalentPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        "http://localhost:4000";

      const response = await fetch(
        `${apiUrl}/api/hiring-requirements`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            openings: Number(form.openings),
            requiredSkills: form.requiredSkills
              .split(",")
              .map((skill) => skill.trim())
              .filter(Boolean),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Submission failed.");
      }

      setStatus("success");
      setMessage(
        "Your hiring requirement has been submitted successfully."
      );
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setMessage(
        error.message ||
          "Unable to submit your request. Please try again."
      );
    }
  }

  return (
    <section className="form-page">
      <div className="container-shell form-layout">
        <Link href="/" className="back-link">
          <ArrowLeft size={16} /> Back to home
        </Link>

        <div className="form-heading">
          <div className="section-kicker">
            <span className="kicker-line" />
            FOR EMPLOYERS
          </div>
          <h1>Tell us who you&apos;re looking for.</h1>
          <p>
            Share your hiring requirements and our recruitment
            team can review your enquiry.
          </p>
        </div>

        <form className="hiring-form" onSubmit={handleSubmit}>
          <div className="form-section-heading">
            <span>01</span>
            <div>
              <h2>Company details</h2>
              <p>Tell us how to reach your organisation.</p>
            </div>
          </div>

          <div className="form-grid">
            <Field
              label="Company name"
              name="companyName"
              value={form.companyName}
              onChange={updateField}
              required
            />
            <Field
              label="Contact person"
              name="contactPerson"
              value={form.contactPerson}
              onChange={updateField}
              required
            />
            <Field
              label="Business email"
              name="email"
              type="email"
              value={form.email}
              onChange={updateField}
              required
            />
            <Field
              label="Phone number"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={updateField}
            />
          </div>

          <div className="form-section-heading">
            <span>02</span>
            <div>
              <h2>Hiring requirements</h2>
              <p>Help us understand the role and your expectations.</p>
            </div>
          </div>

          <div className="form-grid">
            <Field
              label="Job role"
              name="jobRole"
              value={form.jobRole}
              onChange={updateField}
              required
            />
            <Field
              label="Number of openings"
              name="openings"
              type="number"
              min="1"
              max="10000"
              value={form.openings}
              onChange={updateField}
              required
            />
            <Field
              label="Job location"
              name="location"
              value={form.location}
              onChange={updateField}
              required
            />
            <Field
              label="Salary range (optional)"
              name="salaryRange"
              value={form.salaryRange}
              onChange={updateField}
              placeholder="e.g. ₹4–6 LPA"
            />
          </div>

          <div className="form-field">
            <label htmlFor="requiredSkills">
              Required skills
            </label>
            <input
              id="requiredSkills"
              name="requiredSkills"
              value={form.requiredSkills}
              onChange={updateField}
              placeholder="React, Node.js, MongoDB"
            />
            <span className="field-hint">
              Separate skills with commas.
            </span>
          </div>

          <div className="form-field">
            <label htmlFor="description">
              Additional requirements
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={updateField}
              rows={5}
              maxLength={5000}
              placeholder="Experience, job responsibilities, timeline..."
            />
          </div>

          {message && (
            <div
              className={`form-message ${status === "success" ? "success" : "error"}`}
              role="status"
              aria-live="polite"
            >
              {status === "success" && <CheckCircle2 size={19} />}
              {message}
            </div>
          )}

          <button
            className="form-submit"
            type="submit"
            disabled={status === "loading"}
          >
            {status === "loading"
              ? "Submitting..."
              : "Submit hiring requirement"}
            {status !== "loading" && <ArrowRight size={18} />}
          </button>

          <p className="form-disclaimer">
            Please provide accurate business contact details.
            Do not include confidential or sensitive personal data.
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  min,
  max,
  placeholder,
}) {
  return (
    <div className="form-field">
      <label htmlFor={name}>{label}{required ? " *" : ""}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        min={min}
        max={max}
        placeholder={placeholder}
      />
    </div>
  );
}