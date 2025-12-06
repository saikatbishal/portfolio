import React, { useState, useEffect, useRef } from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const { isDarkMode } = useTheme();
  const desktopNavRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const mobileNavRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filteredDesktopRefs = desktopNavRefs.current.filter((ref) => ref != null);
    gsap.set(filteredDesktopRefs, { y: -20, opacity: 0 });
    gsap.to(filteredDesktopRefs, {
      y: 0,
      opacity: 1,
      delay: 0.2,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out"
    });
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      const filteredMobileRefs = mobileNavRefs.current.filter((ref) => ref != null);
      gsap.set(filteredMobileRefs, { y: -50, opacity: 0 });
      gsap.to(filteredMobileRefs, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform,opacity"
      });
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close more menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setIsMoreMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Home", href: "/", type: "route" },
    { label: "Projects", href: "#projects", type: "scroll" },
    { label: "Experience", href: "#experience", type: "scroll" },
    { label: "Education", href: "#education", type: "scroll" },
    { label: "Contact", href: "#contact", type: "scroll" },
    { label: "Games", href: "/games", type: "route" },
    { label: "Blogs", href: "/blogs", type: "route" },
    { label: "CSS to Tailwind", href: "/ast-transpiler", type: "route" },
  ];

  const visibleNavItems = navItems.slice(0, 4);
  const hiddenNavItems = navItems.slice(4);

  const handleNavClick = (href: string, type: string) => {
    setIsMobileMenuOpen(false);
    setIsMoreMenuOpen(false);
    if (type === "scroll") {
      // If we're not on the home page, navigate there first
      if (location.pathname !== "/") {
        navigate("/");
        // Wait for navigation, then scroll
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    }
    // For route navigation, NavLink handles it automatically
  };

  return (
    <>
      {/* NAV WRAPPER */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b
          ${isScrolled
            ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-gray-200 dark:border-gray-800 py-3"
            : "bg-transparent border-transparent py-6"
          }`}
      >
        {/* NAV CONTENT */}
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative z-10">
          {/* LOGO */}
          <div className="group cursor-pointer">
            <span className="text-xl font-bold font-mono text-gray-900 dark:text-white">
              saikat_bishal
            </span>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {visibleNavItems.map((item, index) => (
                item.type === "route" ? (
                  <NavLink
                    key={item.label}
                    to={item.href}
                    ref={(el) => (desktopNavRefs.current[index] = el)}
                    style={{ opacity: 0 }}
                    className={({ isActive }) =>
                      `text-sm font-mono transition-colors duration-300
                      ${isActive ? "text-gray-900 dark:text-white font-bold" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}`
                    }
                  >
                    {item.label}
                  </NavLink>
                ) : (
                  <button
                    key={item.label}
                    ref={(el) => (desktopNavRefs.current[index] = el as any)}
                    style={{ opacity: 0 }}
                    onClick={() => handleNavClick(item.href, item.type)}
                    className={`text-sm font-mono transition-colors duration-300 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white`}
                  >
                    {item.label}
                  </button>
                )
              ))}

              {/* More Button */}
              <div className="relative" ref={moreMenuRef}>
                <button
                  onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                  className={`flex items-center text-sm font-mono transition-colors duration-300 ${isMoreMenuOpen ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}
                >
                  More <MoreHorizOutlinedIcon className="ml-1" fontSize="small" />
                </button>

                {/* Popover */}
                {isMoreMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl py-2 animate-fade-in">
                    {hiddenNavItems.map((item) => (
                      item.type === "route" ? (
                        <NavLink
                          key={item.label}
                          to={item.href}
                          onClick={() => setIsMoreMenuOpen(false)}
                          className={({ isActive }) =>
                            `block px-4 py-2 text-sm font-mono transition-colors
                            ${isActive ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold" : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"}`
                          }
                        >
                          {item.label}
                        </NavLink>
                      ) : (
                        <button
                          key={item.label}
                          onClick={() => handleNavClick(item.href, item.type)}
                          className="block w-full text-left px-4 py-2 text-sm font-mono text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                          {item.label}
                        </button>
                      )
                    ))}
                  </div>
                )}
              </div>
            </div>

            <ThemeToggle />
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle />

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-900 dark:text-white"
            >
              {isMobileMenuOpen ? (
                <ClearOutlinedIcon style={{ fontSize: "1.5rem" }} />
              ) : (
                <MenuOutlinedIcon style={{ fontSize: "1.5rem" }} />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"
            }`}
        >
          <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-xl">
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item, index) => (
                item.type === "route" ? (
                  <NavLink
                    key={item.label}
                    to={item.href}
                    ref={(el) => (mobileNavRefs.current[index] = el)}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block text-lg font-mono transition-colors
                      ${isActive ? "text-gray-900 dark:text-white font-bold" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}`
                    }
                  >
                    {item.label}
                  </NavLink>
                ) : (
                  <button
                    key={item.label}
                    ref={(el) => (mobileNavRefs.current[index] = el as any)}
                    onClick={() => handleNavClick(item.href, item.type)}
                    className="block w-full text-left text-lg font-mono text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                )
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* OVERLAY */}
      <div
        className={`md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Navigation;
