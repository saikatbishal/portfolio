import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import { Link } from 'react-router-dom';
import { EMAIL, FREELANCER_URL, GITHUB_URL, LINKEDIN_URL, MEDIUM_URL } from '../data/links';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: LINKEDIN_URL,
      icon: LinkedInIcon,
    },
    {
      name: 'GitHub',
      url: GITHUB_URL,
      icon: GitHubIcon,
    },
    {
      name: 'Medium',
      url: MEDIUM_URL,
      icon: ArticleOutlinedIcon,
    },
    {
      name: 'Freelancer profile',
      url: FREELANCER_URL,
      icon: WorkOutlineOutlinedIcon,
    }
  ];

  return (
    <footer className="relative bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Email + social links */}
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-x-6 gap-y-3 mb-8">
          <a
            href={`mailto:${EMAIL}`}
            className="group flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            <MailOutlineOutlinedIcon
              className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300"
              style={{ fontSize: '1.1rem' }}
            />
            {EMAIL}
          </a>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {socialLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                >
                  <IconComponent style={{ fontSize: '1.1rem' }} />
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm font-sans text-gray-500 dark:text-gray-500">
              © {currentYear} Saikat Bishal
            </p>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-sans">
              <a
                href="#hero"
                className="text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Home
              </a>
              <a
                href="#projects"
                className="text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Work
              </a>
              <a
                href="#contact"
                className="text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact
              </a>
              <Link to="/games" className="text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                Games
              </Link>
              <Link to="/ast-transpiler" className="text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                CSS to Tailwind
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
