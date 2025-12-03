import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

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

          <div className="mt-8 text-center">
            <button
              onClick={handleDownloadCV}
              className="group inline-flex items-center px-6 py-3 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 text-sm font-semibold text-gray-800 dark:text-gray-200 shadow-sm hover:shadow-md"
            >
              <DownloadOutlinedIcon className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
              Download Resume
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 items-start">
          {/* FORM */}
          <div className="animate-fade-in max-w-2xl mx-auto w-full">
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
                  disabled={isSubmitting}
                  className="w-full group bg-gradient-to-r from-blue-400 to-purple-400 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
              {submitStatus === 'success' && (
                <p className="mt-4 text-center text-green-600">Message sent successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="mt-4 text-center text-red-600">Failed to send message. Please try again.</p>
              )}
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
