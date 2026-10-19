
"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const initialCandidateForm = {
  name: "",
  email: "",
  phone: "",
  position: "",
  salary: "",
  location: "",
  experience: "",
};

const initialEmployerForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  jobTitle: "",
  vacancies: "1",
  location: "",
  experience: "",
};

const experienceOptions = [
  "Fresher",
  "Less than 1 year",
  "1–2 years",
  "3–5 years",
  "6–10 years",
  "10+ years",
];

function FormField({ label, required = false, children }) {
  return (
    <div className="recruitment-modal__field">
      <label>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
    </div>
  );
}

export default function RecruitmentFormModal({
  open,
  onClose,
  type,
}) {
  const isCandidate = type === "candidates";

  const [candidateForm, setCandidateForm] = useState(
    initialCandidateForm
  );

  const [employerForm, setEmployerForm] = useState(
    initialEmployerForm
  );

  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;

    function handleEscape(event) {
      if (event.key === "Escape") onClose();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setSuccessMessage("");
      setIsSubmitting(false);
    }
  }, [open, type]);

  if (!open || !type) return null;

  const formData = isCandidate ? candidateForm : employerForm;

  function updateField(event) {
    const { name, value } = event.target;

    if (isCandidate) {
      setCandidateForm((previous) => ({
        ...previous,
        [name]: value,
      }));
    } else {
      setEmployerForm((previous) => ({
        ...previous,
        [name]: value,
      }));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const payload = new FormData();

      payload.append("type", type);

      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });

      if (uploadedDocument) {
        payload.append("document", uploadedDocument);
      }

      /*
       * Connect your backend here.
       *
       * Example:
       * const response = await fetch("/api/recruitment", {
       *   method: "POST",
       *   body: payload,
       * });
       *
       * if (!response.ok) {
       *   throw new Error("Unable to submit the form.");
       * }
       *
       * Do not show success until the server confirms submission.
       */

      setSuccessMessage(
        "Form validation passed. Connect your API endpoint to submit your details."
      );
    } catch (error) {
      setSuccessMessage(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleDocumentChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      setUploadedDocument(null);
      return;
    }

    const allowedTypes = isCandidate
      ? [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ]
      : null;

    if (allowedTypes && !allowedTypes.includes(file.type)) {
      event.target.value = "";
      setUploadedDocument(null);
      setSuccessMessage("Please upload a PDF, DOC, or DOCX file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      event.target.value = "";
      setUploadedDocument(null);
      setSuccessMessage("File size must not exceed 5 MB.");
      return;
    }

    setUploadedDocument(file);
    setSuccessMessage("");
  }

  return (
    <div
      className="recruitment-modal__backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="recruitment-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="recruitment-modal-title"
      >
        <button
          type="button"
          className="recruitment-modal__close"
          onClick={onClose}
          aria-label="Close form"
        >
          <X size={23} />
        </button>

        <div className="recruitment-modal__content">
          <h2
            id="recruitment-modal-title"
            className="recruitment-modal__title"
          >
            {isCandidate
              ? "Apply for Jobs"
              : "Submit Hiring Requirement"}
          </h2>

          <p className="recruitment-modal__subtitle">
            {isCandidate
              ? "Share your details and upload your resume."
              : "Tell us about your company and hiring needs."}
          </p>

          <form onSubmit={handleSubmit}>
            {isCandidate ? (
              <>
                <FormField label="Your Name" required>
                  <input
                    name="name"
                    autoComplete="name"
                    placeholder="Enter your name"
                    value={candidateForm.name}
                    onChange={updateField}
                    required
                  />
                </FormField>

                <FormField label="Email" required>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    value={candidateForm.email}
                    onChange={updateField}
                    required
                  />
                </FormField>

                <FormField label="Phone Number" required>
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    placeholder="Enter your 10-digit mobile number"
                    value={candidateForm.phone}
                    onChange={updateField}
                    required
                  />
                </FormField>

                <FormField label="Job Position" required>
                  <input
                    name="position"
                    placeholder="Enter your job position"
                    value={candidateForm.position}
                    onChange={updateField}
                    required
                  />
                </FormField>

                <FormField label="Current Salary">
                  <input
                    name="salary"
                    placeholder="e.g. ₹25,000/month"
                    value={candidateForm.salary}
                    onChange={updateField}
                  />
                </FormField>

                <FormField label="Current Location">
                  <input
                    name="location"
                    placeholder="e.g. Delhi, India"
                    value={candidateForm.location}
                    onChange={updateField}
                  />
                </FormField>

                <FormField label="Experience" required>
                  <select
                    name="experience"
                    value={candidateForm.experience}
                    onChange={updateField}
                    required
                  >
                    <option value="">Select Experience</option>
                    {experienceOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Upload Your CV (PDF, DOC, DOCX)" required>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleDocumentChange}
                    required
                  />
                </FormField>
              </>
            ) : (
              <>
                <FormField label="Your Name" required>
                  <input
                    name="name"
                    autoComplete="name"
                    placeholder="Enter your name"
                    value={employerForm.name}
                    onChange={updateField}
                    required
                  />
                </FormField>

                <FormField label="Email" required>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    value={employerForm.email}
                    onChange={updateField}
                    required
                  />
                </FormField>

                <FormField label="Phone Number" required>
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    placeholder="Enter your 10-digit mobile number"
                    value={employerForm.phone}
                    onChange={updateField}
                    required
                  />
                </FormField>

                <FormField label="Company Name" required>
                  <input
                    name="company"
                    autoComplete="organization"
                    placeholder="Enter your company name"
                    value={employerForm.company}
                    onChange={updateField}
                    required
                  />
                </FormField>

                <FormField label="Job Title / Position" required>
                  <input
                    name="jobTitle"
                    placeholder="Enter job title you are hiring for"
                    value={employerForm.jobTitle}
                    onChange={updateField}
                    required
                  />
                </FormField>

                <FormField label="Number of Vacancies" required>
                  <input
                    name="vacancies"
                    type="number"
                    min="1"
                    placeholder="How many candidates needed?"
                    value={employerForm.vacancies}
                    onChange={updateField}
                    required
                  />
                </FormField>

                <FormField label="Job Location" required>
                  <input
                    name="location"
                    placeholder="e.g. Delhi, Mumbai, Remote"
                    value={employerForm.location}
                    onChange={updateField}
                    required
                  />
                </FormField>

                <FormField label="Experience Required" required>
                  <select
                    name="experience"
                    value={employerForm.experience}
                    onChange={updateField}
                    required
                  >
                    <option value="">
                      Select Experience Required
                    </option>
                    {experienceOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Attach Document (optional)">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleDocumentChange}
                  />
                </FormField>
              </>
            )}

            {successMessage && (
              <p
                className="recruitment-modal__message"
                role="status"
              >
                {successMessage}
              </p>
            )}

            <button
              type="submit"
              className="recruitment-modal__submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "PLEASE WAIT..."
                : isCandidate
                  ? "SUBMIT APPLICATION"
                  : "SUBMIT REQUIREMENT"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
