
"use client";

import { useState } from "react";
import "./recruitment-forms.css";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  companyName: "",
  jobTitle: "",
  vacancies: "1",
  location: "",
  experience: "",
};

export default function EmployerForm() {
  const [values, setValues] = useState(initialValues);
  const [document, setDocument] = useState(null);
  const [status, setStatus] = useState({
    loading: false,
    message: "",
    error: false,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (document) {
      formData.append("document", document);
    }

    setStatus({ loading: true, message: "", error: false });

    try {
      const response = await fetch(`${API_URL}/hiring-requirements`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to submit your requirement.");
      }

      setValues(initialValues);
      setDocument(null);
      event.target.reset();

      setStatus({
        loading: false,
        message: "Your hiring requirement has been submitted successfully!",
        error: false,
      });
    } catch (error) {
      setStatus({
        loading: false,
        message:
          error.message === "Failed to fetch"
            ? "Unable to connect to the server. Please try again."
            : error.message || "Something went wrong. Please try again.",
        error: true,
      });
    }
  }

  return (
    <form className="recruitment-form" onSubmit={handleSubmit}>
      <div className="recruitment-form__heading">
        <span className="recruitment-form__step">01</span>
        <div>
          <h2>Hiring Requirement</h2>
          <p>Tell us about your organisation and hiring needs.</p>
        </div>
      </div>

      <div className="recruitment-form__section">
        <h3>Company details</h3>
        <p>Share your contact information so our team can reach you.</p>
      </div>

      <div className="recruitment-form__grid">
        <label className="recruitment-field">
          Contact person *
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            autoComplete="name"
            required
            maxLength={100}
          />
        </label>

        <label className="recruitment-field">
          Business email *
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="you@company.com"
            autoComplete="email"
            required
            maxLength={254}
          />
        </label>

        <label className="recruitment-field">
          Phone number *
          <input
            type="tel"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            autoComplete="tel"
            inputMode="tel"
            pattern="[0-9+\s()-]{10,18}"
            title="Enter a valid phone number."
            required
          />
        </label>

        <label className="recruitment-field">
          Company name *
          <input
            name="companyName"
            value={values.companyName}
            onChange={handleChange}
            placeholder="Enter your company name"
            required
            maxLength={150}
          />
        </label>
      </div>

      <div className="recruitment-form__section">
        <h3>Hiring requirements</h3>
        <p>Help us understand the role and your expectations.</p>
      </div>

      <div className="recruitment-form__grid">
        <label className="recruitment-field">
          Job title / Position *
          <input
            name="jobTitle"
            value={values.jobTitle}
            onChange={handleChange}
            placeholder="e.g. Sales Manager"
            required
            maxLength={120}
          />
        </label>

        <label className="recruitment-field">
          Number of vacancies *
          <input
            type="number"
            name="vacancies"
            value={values.vacancies}
            onChange={handleChange}
            min="1"
            max="10000"
            required
          />
        </label>

        <label className="recruitment-field">
          Job location *
          <input
            name="location"
            value={values.location}
            onChange={handleChange}
            placeholder="e.g. Noida, Delhi, Remote"
            required
            maxLength={150}
          />
        </label>

        <label className="recruitment-field">
          Experience required *
          <select
            name="experience"
            value={values.experience}
            onChange={handleChange}
            required
          >
            <option value="">Select required experience</option>
            <option value="Fresher">Fresher</option>
            <option value="0-1 years">0–1 years</option>
            <option value="1-3 years">1–3 years</option>
            <option value="3-5 years">3–5 years</option>
            <option value="5-8 years">5–8 years</option>
            <option value="8+ years">8+ years</option>
          </select>
        </label>

        <label className="recruitment-field recruitment-field--full">
          Attach job description (optional)
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(event) => {
              const file = event.target.files?.[0];

              if (file && file.size > 5 * 1024 * 1024) {
                event.target.value = "";
                setDocument(null);
                setStatus({
                  loading: false,
                  message: "Document must be 5 MB or smaller.",
                  error: true,
                });
                return;
              }

              setDocument(file || null);
              setStatus({ loading: false, message: "", error: false });
            }}
          />
          <span className="recruitment-field__hint">
            PDF, DOC or DOCX. Maximum 5 MB.
          </span>
        </label>
      </div>

      {status.message && (
        <p
          className={`recruitment-form__message ${
            status.error ? "is-error" : "is-success"
          }`}
          role="status"
        >
          {status.message}
        </p>
      )}

      <button
        type="submit"
        className="recruitment-form__submit"
        disabled={status.loading}
      >
        {status.loading ? "Submitting..." : "Submit Requirement"}
      </button>
    </form>
  );
}
