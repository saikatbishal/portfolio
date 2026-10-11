import React from "react";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { EMAIL, FREELANCER_URL, LINKEDIN_URL, RESUME_FILENAME, RESUME_URL } from "../data/links";

const textLink =
  "underline underline-offset-4 decoration-gray-300 dark:decoration-gray-600 text-gray-900 dark:text-white hover:decoration-gray-900 dark:hover:decoration-white";

const Contact: React.FC = () => (
  <section
    id="contact"
    className="py-20 relative bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900"
  >
    <div className="max-w-2xl mx-auto px-6 relative z-10 text-center">
      <h2 className="text-3xl md:text-4xl font-bold font-sans text-gray-900 dark:text-white tracking-tight mb-4">
        Get in touch
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 font-sans">
        I'm looking for my next frontend role (on-site, hybrid or remote, remote preferred), and I take on
        freelance projects. Tell me about yours.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <a href={`mailto:${EMAIL}`} className="btn btn-primary">
          <MailOutlineIcon fontSize="small" />
          {EMAIL}
        </a>
        <a href={RESUME_URL} download={RESUME_FILENAME} className="btn btn-secondary">
          <DownloadOutlinedIcon fontSize="small" />
          Résumé (PDF)
        </a>
      </div>

      <p className="mt-6 font-sans text-gray-600 dark:text-gray-400">
        Or find me on{" "}
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={textLink}>
          LinkedIn
        </a>
        .
      </p>

      <p className="mt-10 font-sans text-sm text-gray-600 dark:text-gray-400">
        Also available for freelance work: React front ends (dashboards, admin panels, portals), turning Figma
        designs into a reusable UI kit, and making slow sites fast.{" "}
        <a href={FREELANCER_URL} target="_blank" rel="noopener noreferrer" className={textLink}>
          Freelancer profile ↗
        </a>
      </p>
    </div>
  </section>
);

export default Contact;
