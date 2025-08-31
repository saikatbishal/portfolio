import React from 'react';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const contactInfo = [
    {
      icon: MailOutlineOutlinedIcon,
      label: 'Email',
      value: 'saikat.bishal786@gmail.com',
      href: 'mailto:saikat.bishal786@gmail.com',
      color: '#3b82f6'
    },
    {
      icon: PhoneOutlinedIcon,
      label: 'Phone',
      value: '+91 (906) 421-7900',
      href: 'tel:+919064217900',
      color: '#10b981'
    },
    {
      icon: LocationOnOutlinedIcon,
      label: 'Location',
      value: 'Kolkata, India',
      href: '#',
      color: '#f59e0b'
    }
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/saikatbishal',
      icon: LinkedInIcon,
      color: '#0077b5'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/saikatbishal',
      icon: GitHubIcon,
      color: '#333333'
    },
    {
      name: 'Medium',
      url: 'https://medium.com/@saikatbishal',
      icon: ArticleOutlinedIcon,
      color: '#00ab6c'
    },
    {
      name: 'Upwork',
      url: 'https://upwork.com/freelancers/saikatbishal',
      icon: WorkOutlineOutlinedIcon,
      color: '#14a800'
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-black py-16">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-20 w-64 h-64 rounded-full animate-float bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-400/10 dark:to-purple-400/10 blur-[40px]" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full animate-float bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 dark:from-emerald-400/10 dark:to-cyan-400/10 blur-[50px]" style={{ animationDelay: '3s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-3 gap-12 mb-12">
          {/* Personal Salutation */}
          <div className="lg:col-span-1">
            <div className="bg-white/25 dark:bg-gray-800/25 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 p-8 rounded-3xl h-full">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">SB</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Saikat Bishal
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  Thank you for visiting my portfolio! I'm passionate about creating 
                  innovative digital solutions and would love to collaborate on your next project.
                </p>
                <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-500">
                  <span>Made with</span>
                  <FavoriteOutlinedIcon 
                    className="mx-2 text-red-500 animate-pulse" 
                    style={{ fontSize: '1rem' }}
                  />
                  <span>in India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white/25 dark:bg-gray-800/25 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 p-8 rounded-3xl h-full">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Get In Touch
              </h4>
              <div className="space-y-4">
                {contactInfo.map((contact) => {
                  const IconComponent = contact.icon;
                  return (
                    <a
                      key={contact.label}
                      href={contact.href}
                      className="group flex items-center space-x-4 p-3 rounded-xl transition-all duration-300 hover:bg-white/30 dark:hover:bg-gray-700/30 hover:scale-105"
                    >
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${contact.color}20` }}
                      >
                        <IconComponent 
                          style={{ 
                            color: contact.color,
                            fontSize: '1.25rem'
                          }} 
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {contact.label}
                        </p>
                        <p className="text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {contact.value}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Social Links & Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white/25 dark:bg-gray-800/25 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 p-8 rounded-3xl h-full">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
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
                      className="group flex items-center space-x-2 p-3 rounded-xl transition-all duration-300 hover:scale-105"
                      style={{
                        backgroundColor: `${link.color}10`,
                        border: `1px solid ${link.color}20`
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = link.color;
                        e.currentTarget.style.borderColor = link.color;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = `${link.color}10`;
                        e.currentTarget.style.borderColor = `${link.color}20`;
                      }}
                    >
                      <IconComponent 
                        className="transition-colors duration-300 group-hover:text-white"
                        style={{ 
                          color: link.color,
                          fontSize: '1.1rem'
                        }} 
                      />
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-white transition-colors duration-300">
                        {link.name}
                      </span>
                    </a>
                  );
                })}
              </div>

              {/* Back to Top Button */}
              <button
                onClick={scrollToTop}
                className="w-full group flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <ArrowUpwardOutlinedIcon 
                  className="text-white transition-transform duration-300 group-hover:-translate-y-1"
                  style={{ fontSize: '1.1rem' }}
                />
                <span className="text-white font-medium">Back to Top</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 dark:border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <p className="text-gray-600 dark:text-gray-400">
                © {currentYear} Saikat Bishal. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a 
                href="#hero" 
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Home
              </a>
              <a 
                href="#projects" 
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Projects
              </a>
              <a 
                href="#contact" 
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
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