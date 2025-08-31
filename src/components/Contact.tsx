import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import { socialLinks } from "../data/socialLinks";
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // Map EmailJS field names to form data fields
    const fieldMap: { [key: string]: string } = {
      from_name: "name",
      reply_to: "email",
      subject: "subject",
      message: "message",
    };

    setFormData((prev) => ({
      ...prev,
      [fieldMap[name] || name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Sending email with form data:", formData);

      // Initialize EmailJS
      emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: import.meta.env.VITE_EMAILJS_TO_EMAIL,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log("Email sent successfully:", result);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Failed to send email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
  };

  const handleDownloadCV = () => {
    // Replace with your actual Google Drive file ID
    const downloadUrl = `https://drive.google.com/uc?export=download&id=1K8EzBfYmsuTXhUXLH8l4x0JRwvh2DXwf`;

    // Create a temporary link and trigger download
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "Saikat_Bishal_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="contact"
      className="py-20 relative min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-40 left-20 w-96 h-96 rounded-full animate-float bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-400/10 dark:to-purple-400/10 blur-[60px]"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute bottom-20 right-16 w-80 h-80 rounded-full animate-float bg-gradient-to-br from-cyan-500/5 to-emerald-500/5 dark:from-cyan-400/10 dark:to-emerald-400/10 blur-[50px]"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-caption px-4 py-2 rounded-full bg-blue-500/10 dark:bg-blue-400/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 dark:border-blue-400/30 backdrop-blur-md mb-4 inline-block">
            📬 Get In Touch
          </span>

          <h2
            className="text-display mb-6"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 700,
              marginBottom: "var(--spacing-lg)",
            }}
          >
            Let's Work <span className="gradient-text">Together</span>
          </h2>

          <p
            className="text-body max-w-3xl mx-auto"
            style={{
              fontSize: "1.25rem",
              color: "var(--text-secondary)",
            }}
          >
            Have a project in mind or want to discuss opportunities? I'd love to
            hear from you. Let's create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="animate-fade-in">
            <div
              className="card-glass p-8"
              style={{ borderRadius: "var(--radius-xl)" }}
            >
              <h3
                className="text-heading mb-6"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                Send me a message
              </h3>

              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="from_name"
                      className="block text-body mb-2"
                      style={{
                        color: "var(--text-primary)",
                        fontSize: "0.95rem",
                        fontWeight: 500,
                      }}
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="from_name"
                      name="from_name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--primary)";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(99, 102, 241, 0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(0, 0, 0, 0.1)";
                        e.target.style.boxShadow = "none";
                      }}
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-body mb-2"
                      style={{
                        color: "var(--text-primary)",
                        fontSize: "0.95rem",
                        fontWeight: 500,
                      }}
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="reply_to"
                      name="reply_to"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--primary)";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(99, 102, 241, 0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(0, 0, 0, 0.1)";
                        e.target.style.boxShadow = "none";
                      }}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-body mb-2"
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "0.95rem",
                      fontWeight: 500,
                    }}
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--primary)";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(99, 102, 241, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(0, 0, 0, 0.1)";
                      e.target.style.boxShadow = "none";
                    }}
                    placeholder="What's this about?"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-body mb-2"
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "0.95rem",
                      fontWeight: 500,
                    }}
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none resize-none bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--primary)";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(99, 102, 241, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(0, 0, 0, 0.1)";
                      e.target.style.boxShadow = "none";
                    }}
                    placeholder="Tell me about your project or idea..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn w-full group ${
                    submitStatus === "success"
                      ? "btn-success"
                      : submitStatus === "error"
                      ? "btn-error"
                      : "btn-primary"
                  }`}
                  style={{
                    padding: "1rem 2rem",
                    fontSize: "1.1rem",
                    borderRadius: "var(--radius-md)",
                    backgroundColor:
                      submitStatus === "success"
                        ? "var(--success)"
                        : submitStatus === "error"
                        ? "var(--error)"
                        : "var(--primary)",
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                  }}
                >
                  {isSubmitting
                    ? "Sending..."
                    : submitStatus === "success"
                    ? "Message Sent!"
                    : submitStatus === "error"
                    ? "Try Again"
                    : "Send Message"}
                  {!isSubmitting && (
                    <ArrowOutwardOutlinedIcon
                      className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      style={{ fontSize: "1.25rem" }}
                    />
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info & Social Links */}
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="space-y-8">
              {/* Contact Info */}
              <div
                className="card-glass p-8"
                style={{ borderRadius: "var(--radius-xl)" }}
              >
                <h3
                  className="text-heading mb-6"
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  Let's connect
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "rgba(99, 102, 241, 0.1)" }}
                    >
                      <MailOutlineOutlinedIcon
                        style={{ color: "var(--primary)", fontSize: "1.5rem" }}
                      />
                    </div>
                    <div>
                      <p
                        className="text-body"
                        style={{
                          color: "var(--text-primary)",
                          fontSize: "1rem",
                          fontWeight: 500,
                        }}
                      >
                        Email
                      </p>
                      <p
                        className="text-caption"
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "0.95rem",
                        }}
                      >
                        saikat.bishal786@gmail.com{" "}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "rgba(6, 182, 212, 0.1)" }}
                    >
                      <span
                        style={{ color: "var(--accent)", fontSize: "1.5rem" }}
                      >
                        📍
                      </span>
                    </div>
                    <div>
                      <p
                        className="text-body"
                        style={{
                          color: "var(--text-primary)",
                          fontSize: "1rem",
                          fontWeight: 500,
                        }}
                      >
                        Location
                      </p>
                      <p
                        className="text-caption"
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "0.95rem",
                        }}
                      >
                        Kolkata, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white/25 dark:bg-gray-800/25 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 p-8 rounded-3xl">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  Connect & Follow
                </h3>

                {/* Social Media Links */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {socialLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative overflow-hidden rounded-2xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        style={{
                          backgroundColor: link.bgColor,
                          border: `1px solid ${link.color}20`,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = link.color;
                          e.currentTarget.style.borderColor = link.hoverColor;
                          e.currentTarget.style.boxShadow = `0 10px 25px ${link.color}30`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = link.bgColor;
                          e.currentTarget.style.borderColor = `${link.color}20`;
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        {/* Background gradient effect */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: `linear-gradient(135deg, ${link.color}15, ${link.hoverColor}25)`,
                          }}
                        />

                        <div className="relative z-10 flex items-center space-x-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                            style={{ backgroundColor: `${link.color}20` }}
                          >
                            <IconComponent
                              className="transition-all duration-300 group-hover:text-white"
                              style={{
                                color: link.color,
                                fontSize: "1.25rem",
                              }}
                            />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-white transition-colors duration-300">
                              {link.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                              {link.name === "LinkedIn"
                                ? "Professional Network"
                                : link.name === "GitHub"
                                ? "Code Repository"
                                : link.name === "Medium"
                                ? "Blog & Articles"
                                : "Freelance Profile"}
                            </p>
                          </div>
                        </div>

                        {/* Hover arrow */}
                        <ArrowOutwardOutlinedIcon
                          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:text-white transform translate-x-2 group-hover:translate-x-0"
                          style={{ fontSize: "1rem" }}
                        />
                      </a>
                    );
                  })}
                </div>

                {/* Download CV Button */}
                <button
                  onClick={handleDownloadCV}
                  className="w-full group relative overflow-hidden rounded-2xl p-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{
                    boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
                  }}
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10 flex items-center justify-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                      <DownloadOutlinedIcon
                        className="text-white transition-transform duration-300 group-hover:translate-y-0.5"
                        style={{ fontSize: "1.25rem" }}
                      />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-white">
                        Download Resume
                      </p>
                      <p className="text-sm text-blue-100">
                        Get my latest CV (PDF)
                      </p>
                    </div>
                    <ArrowOutwardOutlinedIcon
                      className="text-white opacity-70 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"
                      style={{ fontSize: "1rem" }}
                    />
                  </div>

                  {/* Ripple effect */}
                  <div className="absolute inset-0 rounded-2xl bg-white/10 scale-0 group-active:scale-100 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
