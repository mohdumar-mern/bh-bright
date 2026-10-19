
"use client";

import { useEffect, useState } from "react";
import { X, Upload, LoaderCircle } from "lucide-react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  companyName: "",
  jobTitle: "",
  vacancies: "1",
  location: "",
  experience: "",
};

const experienceOptions = [
  "Fresher",
  "Less than 1 year",
  "1–3 years",
  "3–5 years",
  "5–10 years",
  "10+ years",
];

export default function HireTalentModal({ open, onClose }) {
    const [form, setForm] = useState(initialForm);
    const [uploadedDocument, setUploadedDocument] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    setDocument(document.body.style.overflow = "hidden");
  }, [open, onClose]);

  if (!open) return null;

  function updateField(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (document && document.size > 5 * 1024 * 1024) {
      setError("The document must be smaller than 5 MB.");
      return;
    }

    try {
      setSubmitting(true);

      const body = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        body.append(key, value);
      });

      if (document) body.append("document", document);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/hiring-requirements`,
        {
          method: "POST",
          body,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to submit your requirement.");
      }

      setSuccess("Your hiring requirement has been submitted successfully.");
      setForm(initialForm);
      setDocument(null);
      event.target.reset();
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-3 backdrop-blur-[2px] sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !submitting) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="hire-talent-title"
        className="relative max-h-[94dvh] w-full max-w-[900px] overflow-y-auto rounded-[30px] border-[10px] border-[#80db36] bg-white p-5 shadow-2xl sm:rounded-[40px] sm:border-[15px] sm:p-8 md:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          disabled={submitting}
          aria-label="Close hiring form"
          className="absolute right-2 top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition hover:bg-gray-100 sm:-right-2 sm:-top-2"
        >
          <X size={23} />
        </button>

        <div className="mb-7 pr-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#699c32]">
            Employer enquiry
          </p>
          <h2
            id="hire-talent-title"
            className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            Tell us who you&apos;re hiring
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Share your requirements and our recruitment team can get in touch.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
            <Field
              label="Your Name"
              name="name"
              value={form.name}
              onChange={updateField}
              placeholder="Enter your name"
              autoComplete="name"
              required
            />

            <Field
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={updateField}
              placeholder="Enter your email"
              autoComplete="email"
              required
            />

            <Field
              label="Phone Number"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={updateField}
              placeholder="Enter your 10-digit mobile number"
              autoComplete="tel"
              maxLength={10}
              required
            />

            <Field
              label="Company Name"
              name="companyName"
              value={form.companyName}
              onChange={updateField}
              placeholder="Enter your company name"
              autoComplete="organization"
              required
            />

            <Field
              label="Job Title / Position"
              name="jobTitle"
              value={form.jobTitle}
              onChange={updateField}
              placeholder="Enter job title you are hiring for"
              required
            />

            <Field
              label="Number of Vacancies"
              name="vacancies"
              type="number"
              value={form.vacancies}
              onChange={updateField}
              min="1"
              max="10000"
              placeholder="How many candidates needed?"
              required
            />

            <Field
              label="Job Location"
              name="location"
              value={form.location}
              onChange={updateField}
              placeholder="e.g. Delhi, Mumbai, Remote"
              required
            />

            <div className="space-y-2">
              <label
                htmlFor="experience"
                className="block text-sm font-medium text-gray-700"
              >
                Experience Required <Required />
              </label>
              <select
                id="experience"
                name="experience"
                value={form.experience}
                onChange={updateField}
                required
                className="form-control"
              >
                <option value="">Select Experience Required</option>
                {experienceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="document"
              className="block text-sm font-medium text-gray-700"
            >
              Attach Document <span className="text-gray-400">(optional)</span>
            </label>

            <label
              htmlFor="document"
              className="flex min-h-14 cursor-pointer items-center gap-3 rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 transition hover:border-[#80db36]"
            >
              <Upload size={19} />
              <span className="min-w-0 flex-1 truncate">
                {document ? document.name : "Upload job description (PDF, DOC, DOCX)"}
              </span>
              <span className="shrink-0 rounded-md border bg-white px-3 py-2">
                Browse
              </span>
              <input
                id="document"
                type="file"
                accept=".pdf,.doc,.docx"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0] || null;

                  if (
                    file &&
                    !/\.(pdf|doc|docx)$/i.test(file.name)
                  ) {
                    setError("Upload a PDF, DOC, or DOCX document.");
                    event.target.value = "";
                    setDocument(null);
                    return;
                  }

                  setError("");
                  setDocument(file);
                }}
              />
            </label>
            <p className="text-xs text-gray-500">
              Accepted formats: PDF, DOC, DOCX. Maximum size: 5 MB.
            </p>
          </div>

          {error && (
            <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          {success && (
            <p role="status" className="rounded-md bg-green-50 p-3 text-sm text-green-800">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-slate-950 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#80bd39] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting && <LoaderCircle size={17} className="animate-spin" />}
            {submitting ? "Submitting..." : "Submit Requirement"}
          </button>
        </form>
      </section>
    </div>
  );
}

function Required() {
  return <span className="text-red-500">*</span>;
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  ...props
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700"
      >
        {label} {required && <Required />}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="form-control"
        {...props}
      />
    </div>
  );
}
