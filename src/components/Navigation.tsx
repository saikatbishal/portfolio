import React, { useState, useEffect, useRef } from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";
import gsap from "gsap";

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark } = useTheme();
  const desktopNavRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mobileNavRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const filteredDesktopRefs = desktopNavRefs.current.filter(
      (ref) => ref != null
    );
    gsap.set(filteredDesktopRefs, { y: -50, opacity: 0 });
    gsap.to(filteredDesktopRefs, {
      y: 8,
      opacity: 1,
      delay:1,
      duration: 1,
      stagger: 0.2,
      yoyo: true,
      ease: "sine.inOut",
      // clearProps: "transform,opacity"
    });
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      const filteredMobileRefs = mobileNavRefs.current.filter(
        (ref) => ref != null
      );
      gsap.set(filteredMobileRefs, { y: -50, opacity: 0 });
      gsap.to(filteredMobileRefs, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      setIsScrolled(scrollTop > 50 && scrollTop < maxScroll - 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#hero" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 
          duration-500 ease-out ${
            isScrolled
              ? `${
                  isDark ? "bg-gray-900/20" : "bg-white/20"
                } backdrop-blur-xl border-b ${
                  isDark ? "border-gray-700/20" : "border-white/20"
                } py-3 shadow-lg ${
                  isDark ? "shadow-black/20" : "shadow-black/5"
                }`
              : "bg-transparent py-6"
          }`}
      >
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`absolute inset-0 ${
              isDark
                ? "bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10"
                : "bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5"
            }`}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative z-10">
          <div className="group cursor-pointer">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 inline-block">
              Saikat's Portfolio
            </span>
            <div className="h-0.5 w-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full" />
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {navItems.map((item, index) => (
                <button
                style={{opacity:0}}
                  ref={(el) => {(desktopNavRefs.current[index] = el)}}
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`nav-item relative px-4 py-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  } font-medium text-sm tracking-wide transition-all duration-300 group hover:text-blue-600 hover:scale-105`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                  <span className="relative z-10">{item.label}</span>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-3/4 rounded-full" />
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-sm scale-110" />
                </button>
              ))}
            </div>
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle />
            <button
              className={`relative p-3 rounded-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${
                isScrolled
                  ? `${
                      isDark ? "bg-gray-800/30" : "bg-white/30"
                    } backdrop-blur-md border ${
                      isDark ? "border-gray-700/20" : "border-white/20"
                    } shadow-lg`
                  : `${
                      isDark ? "bg-gray-800/20" : "bg-white/20"
                    } backdrop-blur-md border ${
                      isDark ? "border-gray-700/10" : "border-white/10"
                    }`
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl" />
              <div
                className={`relative z-10 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                } transition-transform duration-300`}
              >
                {isMobileMenuOpen ? (
                  <ClearOutlinedIcon
                    className="transform rotate-90 transition-transform duration-300"
                    style={{ fontSize: "1.5rem" }}
                  />
                ) : (
                  <MenuOutlinedIcon
                    className="transition-transform duration-300"
                    style={{ fontSize: "1.5rem" }}
                  />
                )}
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 scale-0 transition-transform duration-300 hover:scale-100" />
            </button>
          </div>
        </div>

        <div
          className={`md:hidden absolute top-full left-0 right-0 transition-all duration-500 ease-out ${
            isMobileMenuOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-4"
          }`}
        >
          <div
            className={`${
              isDark ? "bg-gray-900/95" : "bg-white/95"
            } backdrop-blur-xl border-b ${
              isDark ? "border-gray-700/20" : "border-white/20"
            } shadow-2xl`}
          >
            <div
              className={`absolute inset-0 ${
                isDark
                  ? "bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10"
                  : "bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5"
              }`}
            />

            <div className="relative z-10 px-6 py-6 space-y-2">
              {navItems.map((item, index) => (
                <button
                  ref={(el) => {(mobileNavRefs.current[index] = el)}}
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`nav-item block w-full text-left px-4 py-3 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  } font-medium text-lg transition-all duration-300 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 rounded-xl hover:scale-105 hover:shadow-md group`}
                >
                  <div className="flex items-center justify-between">
                    <span className="relative">
                      {item.label}
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full rounded-full" />
                    </span>
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
{/* 
      <style>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style> */}
    </>
  );
};

export default Navigation;
