import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/saikat-bishal',
      icon: LinkedInIcon,
    },
    {
      name: 'GitHub',
      url: 'https://github.com/saikatbishal',
      icon: GitHubIcon,
    },
    {
      name: 'Medium',
      url: 'https://medium.com/@saikat.bishal786',
      icon: ArticleOutlinedIcon,
    },
    {
      name: 'Freelancer',
      url: 'https://www.freelancer.com/u/saikatbishal',
      icon: WorkOutlineOutlinedIcon,
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Personal Salutation */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 h-full">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center border border-gray-900 dark:border-white rounded-full">
                  <span className="text-2xl font-bold font-mono text-gray-900 dark:text-white">SB</span>
                </div>
                <h3 className="text-2xl font-bold font-sans text-gray-900 dark:text-white mb-4">
                  Saikat Bishal
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed font-sans">
                  Thank you for visiting my portfolio! I'm passionate about creating
                  innovative digital solutions and would love to collaborate on your next project.
                </p>
                <div className="flex items-center justify-center text-sm font-mono text-gray-500 dark:text-gray-500">
                  <span>Made with</span>
                  <FavoriteOutlinedIcon
                    className="mx-2 text-gray-900 dark:text-white"
                    style={{ fontSize: '1rem' }}
                  />
                  <span>in India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links & Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 h-full">
              <h4 className="text-xl font-bold font-mono text-gray-900 dark:text-white mb-6">
                Connect & Follow
              </h4>

              {/* Social Links */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {socialLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center space-x-2 p-3 border border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-white transition-colors duration-300 bg-white dark:bg-gray-950"
                    >
                      <IconComponent
                        className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300"
                        style={{ fontSize: '1.1rem' }}
                      />
                      <span className="text-sm font-mono font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                        {link.name}
                      </span>
                    </a>
                  );
                })}
              </div>

              {/* Contact Info */}
              <div className="space-y-4 mb-6">
                <a href="mailto:saikat.bishal786@gmail.com" className="group flex items-center space-x-3">
                  <div className="w-10 h-10 flex items-center justify-center border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950">
                    <MailOutlineOutlinedIcon className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-gray-500 dark:text-gray-500 uppercase">Email</p>
                    <p className="font-mono text-sm font-medium text-gray-900 dark:text-white">saikat.bishal786@gmail.com</p>
                  </div>
                </a>
                <div className="group flex items-center space-x-3">
                  <div className="w-10 h-10 flex items-center justify-center border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950">
                    <LocationOnOutlinedIcon className="text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-gray-500 dark:text-gray-500 uppercase">Location</p>
                    <p className="font-mono text-sm font-medium text-gray-900 dark:text-white">Kolkata, India</p>
                  </div>
                </div>
              </div>

              {/* Back to Top Button */}
              <button
                onClick={scrollToTop}
                className="w-full group flex items-center justify-center space-x-2 p-3 border border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300"
              >
                <ArrowUpwardOutlinedIcon
                  className="transition-transform duration-300 group-hover:-translate-y-1"
                  style={{ fontSize: '1.1rem' }}
                />
                <span className="font-mono font-medium">Back to Top</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <p className="text-sm font-mono text-gray-500 dark:text-gray-500">
                © {currentYear} Saikat Bishal. Crafted with logic and caffeine.
              </p>
            </div>

            <div className="flex items-center space-x-6 text-sm font-mono">
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
                Projects
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
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;