
"use client";

import { useState } from "react";
import "./recruitment-forms.css";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  jobTitle: "",
  currentSalary: "",
  location: "",
  experience: "",
};

export default function CandidateForm() {
  const [values, setValues] = useState(initialValues);
  const [resume, setResume] = useState(null);
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

    if (!resume) {
      setStatus({
        loading: false,
        message: "Please upload your resume.",
        error: true,
      });
      return;
    }

    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append("resume", resume);

    setStatus({ loading: true, message: "", error: false });

    try {
      const response = await fetch(`${API_URL}/applications`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to submit your application.");
      }

      setValues(initialValues);
      setResume(null);
      event.target.reset();

      setStatus({
        loading: false,
        message: "Your application has been submitted successfully!",
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
          <h2>Candidate Registration</h2>
          <p>Tell us about yourself and your next career move.</p>
        </div>
      </div>

      <div className="recruitment-form__grid">
        <label className="recruitment-field">
          Full name *
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
          Email address *
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="you@example.com"
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
          Job title / Position *
          <input
            name="jobTitle"
            value={values.jobTitle}
            onChange={handleChange}
            placeholder="e.g. Software Developer"
            required
            maxLength={120}
          />
        </label>

        <label className="recruitment-field">
          Current salary
          <input
            name="currentSalary"
            value={values.currentSalary}
            onChange={handleChange}
            placeholder="e.g. ₹25,000/month"
            maxLength={80}
          />
        </label>

        <label className="recruitment-field">
          Current location *
          <input
            name="location"
            value={values.location}
            onChange={handleChange}
            placeholder="e.g. Noida, Delhi"
            required
            maxLength={120}
          />
        </label>

        <label className="recruitment-field recruitment-field--full">
          Work experience *
          <select
            name="experience"
            value={values.experience}
            onChange={handleChange}
            required
          >
            <option value="">Select your experience</option>
            <option value="Fresher">Fresher</option>
            <option value="0-1 years">0–1 years</option>
            <option value="1-3 years">1–3 years</option>
            <option value="3-5 years">3–5 years</option>
            <option value="5-8 years">5–8 years</option>
            <option value="8+ years">8+ years</option>
          </select>
        </label>

        <label className="recruitment-field recruitment-field--full">
          Upload resume (PDF, DOC, DOCX) *
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            required
            onChange={(event) => {
              const file = event.target.files?.[0];

              if (file && file.size > 5 * 1024 * 1024) {
                event.target.value = "";
                setResume(null);
                setStatus({
                  loading: false,
                  message: "Resume must be 5 MB or smaller.",
                  error: true,
                });
                return;
              }

              setResume(file || null);
              setStatus({ loading: false, message: "", error: false });
            }}
          />
          <span className="recruitment-field__hint">
            Maximum file size: 5 MB.
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
        {status.loading ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
