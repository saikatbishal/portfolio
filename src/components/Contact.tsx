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
      className="py-20 relative min-h-screen bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-sm text-gray-500 dark:text-gray-400 mb-4 inline-block">
            // contact
          </span>

          <h2 className="text-3xl md:text-4xl font-bold font-sans text-gray-900 dark:text-white tracking-tight mb-6">
            Let's Work Together
          </h2>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-sans">
            Have a project in mind or want to discuss opportunities? I'd love
            to hear from you.
          </p>

          <div className="mt-8 text-center">
            <button
              onClick={handleDownloadCV}
              className="group inline-flex items-center px-6 py-3 border border-gray-900 dark:border-white text-gray-900 dark:text-white font-mono text-sm hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300"
            >
              <DownloadOutlinedIcon className="mr-2 h-5 w-5" />
              Download Resume
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 items-start">
          {/* FORM */}
          <div className="max-w-2xl mx-auto w-full">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8">
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white font-mono">
                Send me a message
              </h3>

              {/* FORM FIELDS */}
              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                {/* Name + Email */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-mono mb-2 text-gray-600 dark:text-gray-400">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="from_name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:border-gray-900 dark:focus:border-white transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-mono mb-2 text-gray-600 dark:text-gray-400">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="reply_to"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:border-gray-900 dark:focus:border-white transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-mono mb-2 text-gray-600 dark:text-gray-400">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:border-gray-900 dark:focus:border-white transition-colors"
                    placeholder="What's this about?"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-mono mb-2 text-gray-600 dark:text-gray-400">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-mono text-sm resize-none focus:outline-none focus:border-gray-900 dark:focus:border-white transition-colors"
                    placeholder="Tell me about your idea..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-mono text-sm font-bold py-4 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
              {submitStatus === 'success' && (
                <p className="mt-4 text-center text-sm font-mono text-green-600 dark:text-green-400">Message sent successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="mt-4 text-center text-sm font-mono text-red-600 dark:text-red-400">Failed to send message. Please try again.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;