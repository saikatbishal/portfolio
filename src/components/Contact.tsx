import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { EMAIL, FREELANCER_URL, LINKEDIN_URL, RESUME_FILENAME, RESUME_URL } from "../data/links";

// Sent to EmailJS as `subject`, so the existing template keeps working.
const PURPOSES = [
  { value: "role", label: "I'm hiring for a role", subject: "Hiring: a role for Saikat" },
  { value: "project", label: "I have a project", subject: "Freelance project enquiry" },
  { value: "other", label: "Something else", subject: "Message from saikatbishal.com" },
] as const;

type Purpose = (typeof PURPOSES)[number]["value"];

interface FormData {
  name: string;
  email: string;
  purpose: Purpose;
  message: string;
}

const emptyForm: FormData = { name: "", email: "", purpose: "role", message: "" };

const inputClass =
  "w-full px-4 py-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-sans text-base focus:outline-none focus:border-gray-900 dark:focus:border-white transition-colors";
const labelClass = "block text-sm font-sans font-medium mb-2 text-gray-700 dark:text-gray-300";
const textLink =
  "underline underline-offset-4 decoration-gray-300 dark:decoration-gray-600 text-gray-900 dark:text-white hover:decoration-gray-900 dark:hover:decoration-white";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (submitStatus !== "idle") setSubmitStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS environment variables are missing. Please check your .env file.");
      }

      emailjs.init(publicKey);

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          reply_to: formData.email,
          subject: PURPOSES.find((p) => p.value === formData.purpose)?.subject,
          message: formData.message,
          to_email: import.meta.env.VITE_EMAIL_TO,
        },
        publicKey
      );

      setSubmitStatus("success");
      setFormData(emptyForm);
    } catch (error) {
      console.error("Failed to send email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 relative bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900"
    >
      <div className="max-w-2xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-sans text-gray-900 dark:text-white tracking-tight mb-4">
            Get in touch
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-sans">
            I'm looking for my next frontend role (on-site, hybrid or remote, remote preferred), and I take on
            freelance projects. Tell me about yours.
          </p>
          <p className="mt-4 font-sans text-gray-600 dark:text-gray-400">
            Email me at{" "}
            <a href={`mailto:${EMAIL}`} className={textLink}>
              {EMAIL}
            </a>{" "}
            or find me on{" "}
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={textLink}>
              LinkedIn
            </a>
            .
          </p>
          <div className="mt-6">
            <a href={RESUME_URL} download={RESUME_FILENAME} className="btn btn-secondary">
              <DownloadOutlinedIcon fontSize="small" />
              Download résumé (PDF)
            </a>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className={labelClass}>
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="from_name"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className={labelClass}>
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="reply_to"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={inputClass}
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <fieldset>
              <legend className={labelClass}>What's this about?</legend>
              <div className="flex flex-col sm:flex-row gap-2">
                {PURPOSES.map((p) => (
                  <label
                    key={p.value}
                    className={`flex-1 flex items-center gap-2 px-4 py-3 border cursor-pointer font-sans text-sm transition-colors ${
                      formData.purpose === p.value
                        ? "border-gray-900 dark:border-white text-gray-900 dark:text-white"
                        : "border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-600"
                    }`}
                  >
                    <input
                      type="radio"
                      name="purpose"
                      value={p.value}
                      checked={formData.purpose === p.value}
                      onChange={() => update("purpose", p.value)}
                      className="accent-gray-900 dark:accent-white"
                    />
                    {p.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="contact-message" className={labelClass}>
                Message
              </label>
              <textarea
                id="contact-message"
                rows={5}
                name="message"
                required
                value={formData.message}
                onChange={(e) => update("message", e.target.value)}
                className={`${inputClass} resize-y`}
                placeholder="For a role: the title and team. For a project: what you need and when."
              />
            </div>

            <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">
              {isSubmitting ? "Sending…" : "Send message"}
            </button>
          </form>

          <div role="status" aria-live="polite">
            {submitStatus === "success" && (
              <p className="mt-4 text-center font-sans text-green-700 dark:text-green-400">
                Thanks, it's on its way. I'll reply by email.
              </p>
            )}
            {submitStatus === "error" && (
              <p className="mt-4 text-center font-sans text-red-700 dark:text-red-400">
                That didn't send. Email me at{" "}
                <a href={`mailto:${EMAIL}`} className={textLink}>
                  {EMAIL}
                </a>{" "}
                instead.
              </p>
            )}
          </div>
        </div>

        <p className="mt-8 text-center font-sans text-sm text-gray-600 dark:text-gray-400">
          Also available for freelance work: React front ends (dashboards, admin panels, portals), turning Figma
          designs into a reusable UI kit, and making slow sites fast.{" "}
          <a href={FREELANCER_URL} target="_blank" rel="noopener noreferrer" className={textLink}>
            Freelancer profile ↗
          </a>
        </p>
      </div>
    </section>
  );
};

export default Contact;
