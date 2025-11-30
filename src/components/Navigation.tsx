import React, { useState, useEffect, useRef } from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode } = useTheme();
  const desktopNavRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const mobileNavRefs = useRef<(HTMLAnchorElement | null)[]>([]);

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

  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Home", href: "/", type: "route" },
    { label: "Projects", href: "#projects", type: "scroll" },
    { label: "Experience", href: "#experience", type: "scroll" },
    { label: "Education", href: "#education", type: "scroll" },
    { label: "Contact", href: "#contact", type: "scroll" },
    { label: "Games", href: "/games", type: "route" },
  ];

  const handleNavClick = (href: string, type: string) => {
    setIsMobileMenuOpen(false);
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${isScrolled
            ? `${isDarkMode
              ? "bg-zinc-900/30 border-b border-zinc-700/20 shadow-lg"
              : "bg-white/50 border-b border-white/40 shadow-lg"
            } backdrop-blur-xl py-3`
            : "bg-transparent py-6"
          }`}
      >
        <div className={`absolute inset-0 transition-opacity duration-500 ${isScrolled ? "opacity-100" : "opacity-0"}`}>
          <div
            className={`absolute inset-0 ${isDarkMode
              ? "bg-gradient-to-r from-pink-400/10 via-blue-400/10 to-green-300/10"
              : "bg-gradient-to-r from-pink-300/10 via-blue-300/10 to-green-200/10"
              }`}
          />
        </div>

        {/* NAV CONTENT */}
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative z-10">
          {/* LOGO */}
          <div className="group cursor-pointer">
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-blue-400 to-green-400 bg-clip-text text-transparent hover:scale-105 transition-transform inline-block">
              Saikat's Portfolio
            </span>
            <div className="h-0.5 w-0 bg-gradient-to-r from-pink-400 to-blue-400 transition-all duration-300 group-hover:w-full" />
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {navItems.map((item, index) => (
                item.type === "route" ? (
                  <NavLink
                    key={item.label}
                    to={item.href}
                    ref={(el) => (desktopNavRefs.current[index] = el)}
                    style={{ opacity: 0 }}
                    className={({ isActive }) =>
                      `relative px-4 py-2 font-medium text-base tracking-wide transition-all group
                      ${isDarkMode ? "text-zinc-100" : "text-zinc-700"}
                      ${isActive ? "text-pink-500" : ""}
                      hover:text-pink-500 hover:scale-105 inline-block`
                    }
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-300/20 to-blue-300/20 rounded-full scale-0 group-hover:scale-100 transition-transform" />
                    <span className="relative z-10">{item.label}</span>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full transition-all group-hover:w-3/4" />
                  </NavLink>
                ) : (
                  <button
                    key={item.label}
                    ref={(el) => (desktopNavRefs.current[index] = el as any)}
                    style={{ opacity: 0 }}
                    onClick={() => handleNavClick(item.href, item.type)}
                    className={`relative px-4 py-2 font-medium text-base tracking-wide transition-all group
                    ${isDarkMode ? "text-zinc-100" : "text-zinc-700"}
                    hover:text-pink-500 hover:scale-105`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-300/20 to-blue-300/20 rounded-full scale-0 group-hover:scale-100 transition-transform" />
                    <span className="relative z-10">{item.label}</span>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full transition-all group-hover:w-3/4" />
                  </button>
                )
              ))}
            </div>

            <ThemeToggle />
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle />

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`relative p-3 rounded-2xl transition-all hover:scale-110 active:scale-95 ${isScrolled
                  ? `${isDarkMode ? "bg-zinc-800/40" : "bg-white/40"} backdrop-blur-md border border-white/30`
                  : `${isDarkMode ? "bg-zinc-800/20" : "bg-white/30"} backdrop-blur-md border border-white/20`
                }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-300/10 to-blue-300/10 rounded-2xl" />
              <div className={`relative z-10 ${isDarkMode ? "text-zinc-200" : "text-zinc-700"} transition-transform`}>
                {isMobileMenuOpen ? (
                  <ClearOutlinedIcon className="rotate-90 transition-transform" style={{ fontSize: "1.5rem" }} />
                ) : (
                  <MenuOutlinedIcon style={{ fontSize: "1.5rem" }} />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 transition-all duration-500 ${isMobileMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"
            }`}
        >
          <div
            className={`${isDarkMode ? "bg-zinc-900/95" : "bg-white/95"} backdrop-blur-xl border-b border-white/30 shadow-xl`}
          >
            <div
              className={`absolute inset-0 ${isDarkMode
                  ? "bg-gradient-to-br from-pink-400/10 via-blue-400/10 to-green-400/10"
                  : "bg-gradient-to-br from-pink-300/10 via-blue-300/10 to-green-300/10"
                }`}
            />

            <div className="relative z-10 px-6 py-6 space-y-2">
              {navItems.map((item, index) => (
                item.type === "route" ? (
                  <NavLink
                    key={item.label}
                    to={item.href}
                    ref={(el) => (mobileNavRefs.current[index] = el)}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `w-full text-left px-4 py-3 text-xl font-medium rounded-xl transition-all group
                      ${isDarkMode ? "text-zinc-100" : "text-zinc-700"}
                      ${isActive ? "text-pink-500 bg-pink-200/20" : ""}
                      hover:text-pink-500 hover:bg-pink-200/20 hover:scale-105 inline-block`
                    }
                  >
                    <span className="relative">
                      {item.label}
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-blue-400 transition-all group-hover:w-full rounded-full" />
                    </span>
                    <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full scale-0 group-hover:scale-100 transition-transform absolute right-4 top-1/2 -translate-y-1/2" />
                  </NavLink>
                ) : (
                  <button
                    key={item.label}
                    ref={(el) => (mobileNavRefs.current[index] = el as any)}
                    onClick={() => handleNavClick(item.href, item.type)}
                    className={`w-full text-left px-4 py-3 text-xl font-medium rounded-xl transition-all group
                      ${isDarkMode ? "text-zinc-100" : "text-zinc-700"}
                      hover:text-pink-500 hover:bg-pink-200/20 hover:scale-105`}
                  >
                    <span className="relative">
                      {item.label}
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-blue-400 transition-all group-hover:w-full rounded-full" />
                    </span>
                    <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full scale-0 group-hover:scale-100 transition-transform absolute right-4 top-1/2 -translate-y-1/2" />
                  </button>
                )
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* OVERLAY */}
      <div
        className={`md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Navigation;
