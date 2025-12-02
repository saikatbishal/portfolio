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

      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS environment variables are missing. Please check your .env file.");
      }

      // Initialize EmailJS
      emailjs.init(publicKey);

      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          reply_to: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: import.meta.env.VITE_EMAIL_TO,
        },
        publicKey
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
    const downloadUrl = `https://drive.google.com/uc?export=download&id=168azpZ_Q_ZRj0C-uBEUQORexoqSUyYfk`;

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
      className="py-20 relative min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
    >
      {/* Pastel floating blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-40 left-20 w-96 h-96 rounded-full animate-float bg-blue-200/30 dark:bg-blue-300/20 blur-[60px]"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute bottom-20 right-16 w-80 h-80 rounded-full animate-float bg-emerald-200/30 dark:bg-emerald-300/20 blur-[50px]"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-caption px-4 py-2 rounded-full bg-blue-200/40 dark:bg-blue-300/30 text-blue-700 dark:text-blue-300 border border-blue-300 backdrop-blur-md mb-4 inline-block">
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
            Let's Work{" "}
            <span className="bg-gradient-to-r  from-pink-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
              Together
            </span>
          </h2>

          <p
            className="text-body max-w-3xl mx-auto"
            style={{
              fontSize: "1.25rem",
              color: "var(--text-secondary)",
            }}
          >
            Have a project in mind or want to discuss opportunities? I'd love
            to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* FORM */}
          <div className="animate-fade-in">
            <div className="bg-white/40 dark:bg-blue-900/20 backdrop-blur-xl border border-blue-200 dark:border-blue-700 p-8 rounded-3xl shadow-lg">
              <h3
                className="text-heading mb-6 text-blue-900 dark:text-blue-200"
                style={{ fontSize: "1.5rem", fontWeight: 600 }}
              >
                Send me a message
              </h3>

              {/* FORM FIELDS */}
              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                {/* Name + Email */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-body mb-2 text-blue-900 dark:text-blue-200">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="from_name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border-2 bg-white/80 dark:bg-blue-900/40 border-blue-200 dark:border-blue-700 text-blue-900 dark:text-blue-100"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-body mb-2 text-blue-900 dark:text-blue-200">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="reply_to"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border-2 bg-white/80 dark:bg-blue-900/40 border-blue-200 dark:border-blue-700 text-blue-900 dark:text-blue-100"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-body mb-2 text-blue-900 dark:text-blue-200">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border-2 bg-white/80 dark:bg-blue-900/40 border-blue-200 dark:border-blue-700 text-blue-900 dark:text-blue-100"
                    placeholder="What's this about?"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-body mb-2 text-blue-900 dark:text-blue-200">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border-2 resize-none bg-white/80 dark:bg-blue-900/40 border-blue-200 dark:border-blue-700 text-blue-900 dark:text-blue-100"
                    placeholder="Tell me about your idea..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full group bg-gradient-to-r from-blue-400 to-purple-400 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-xl transition-all"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* CONTACT INFO + SOCIAL LINKS */}
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="space-y-8">
              {/* Contact Card */}
              <div className="bg-white/20 dark:bg-blue-900/20 backdrop-blur-xl border border-blue-200 dark:border-blue-700 p-8 rounded-3xl shadow-lg">
                <h3 className="text-heading text-blue-900 dark:text-blue-200 mb-6">
                  Let's connect
                </h3>

                <div className="space-y-4">
                  {/* Email */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-200/40">
                      <MailOutlineOutlinedIcon className="text-blue-700" />
                    </div>
                    <div>
                      <p className="text-body text-blue-900 dark:text-blue-200">
                        Email
                      </p>
                      <p className="text-caption text-blue-700 dark:text-blue-300">
                        saikat.bishal786@gmail.com
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-emerald-200/40">
                      <span className="text-emerald-700 text-xl">📍</span>
                    </div>
                    <div>
                      <p className="text-body text-blue-900 dark:text-blue-200">
                        Location
                      </p>
                      <p className="text-caption text-blue-700 dark:text-blue-300">
                        Kolkata, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="
              bg-white/50 
              dark:bg-indigo-900/30 
              border border-indigo-200/40 
              dark:border-indigo-700/40 
              p-8 rounded-3xl backdrop-blur-xl
            "
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  Connect & Follow
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {socialLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
            group relative overflow-hidden rounded-2xl p-4 
            transition-all duration-300
            hover:scale-105 hover:shadow-lg
          "
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
                        <div
                          className="
              absolute inset-0 opacity-0 group-hover:opacity-100 
              transition-opacity duration-300
            "
                          style={{
                            background: `linear-gradient(135deg, ${link.color}15, ${link.hoverColor}25)`,
                          }}
                        />

                        <div className="relative z-10 flex items-center space-x-3">
                          <div
                            className="
                w-10 h-10 rounded-xl flex items-center justify-center 
                transition-all duration-300 group-hover:scale-110
              "
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

                        <ArrowOutwardOutlinedIcon
                          className="
              absolute top-4 right-4 opacity-0 
              group-hover:opacity-100 transition-all duration-300
              group-hover:text-white transform translate-x-2 
              group-hover:translate-x-0
            "
                          style={{ fontSize: "1rem" }}
                        />
                      </a>
                    );
                  })}
                </div>

                <button
                  onClick={handleDownloadCV}
                  className="
      w-full group relative overflow-hidden rounded-2xl p-4 
      bg-gradient-to-r  from-pink-400 via-blue-400 to-green-400 
      hover:from-pink-500 hover:via-blue-500 hover:to-green-500 
      transition-all duration-300 hover:scale-[102%] hover:shadow-xl
    "
                  style={{
                    boxShadow: "0 4px 15px rgba(129, 140, 248, 0.3)", // pastel indigo
                  }}
                >
                  <div
                    className="
        absolute inset-0 bg-gradient-to-r 
        from-pink-400 via-blue-400 to-green-400
        opacity-0 group-hover:opacity-100 
        transition-opacity duration-300
      "
                  />

                  <div className="relative z-10 flex items-center justify-center space-x-3">
                    <div
                      className="
          w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center 
          transition-all duration-300 group-hover:scale-110 group-hover:rotate-12
        "
                    >
                      <DownloadOutlinedIcon
                        className="text-white transition-transform duration-300 group-hover:translate-y-0.5"
                        style={{ fontSize: "1.25rem" }}
                      />
                    </div>

                    <div className="text-left">
                      <p className="font-semibold text-white">Download Resume</p>
                      <p className="text-sm text-indigo-100">Get my latest CV (PDF)</p>
                    </div>

                    <ArrowOutwardOutlinedIcon
                      className="
          text-white opacity-70 group-hover:opacity-100 
          transition-all duration-300 transform translate-x-2 
          group-hover:translate-x-0
        "
                      style={{ fontSize: "1rem" }}
                    />
                  </div>

                  <div
                    className="
        absolute inset-0 rounded-2xl bg-white/10 scale-0 
        group-active:scale-100 transition-transform duration-200
      "
                  />
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

/**
 * 
 *  
 */
