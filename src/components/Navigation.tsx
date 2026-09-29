import React, { useState, useEffect } from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ThemeToggle from "./ThemeToggle";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { RESUME_URL } from "../data/links";

type NavItem = { label: string; href: string; type: "scroll" | "route" | "external" };

const navItems: NavItem[] = [
  { label: "Work", href: "#projects", type: "scroll" },
  { label: "Experience", href: "#experience", type: "scroll" },
  { label: "Writing", href: "/blogs", type: "route" },
  { label: "Contact", href: "#contact", type: "scroll" },
  { label: "Résumé", href: RESUME_URL, type: "external" },
];

const linkBase =
  "font-sans transition-colors duration-200 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white";

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobileMenuOpen]);

  const scrollTo = (href: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for the home page to mount, then scroll
      setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), 100);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderItem = (item: NavItem, extra: string) => {
    if (item.type === "route") {
      return (
        <NavLink
          key={item.label}
          to={item.href}
          onClick={() => setIsMobileMenuOpen(false)}
          className={({ isActive }) =>
            `${extra} ${isActive ? "font-sans font-semibold text-gray-900 dark:text-white" : linkBase}`
          }
        >
          {item.label}
        </NavLink>
      );
    }
    if (item.type === "external") {
      return (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsMobileMenuOpen(false)}
          className={`${extra} ${linkBase}`}
        >
          {item.label}
          <span aria-hidden="true"> ↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      );
    }
    return (
      <button key={item.label} onClick={() => scrollTo(item.href)} className={`${extra} ${linkBase} text-left`}>
        {item.label}
      </button>
    );
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b
          ${isScrolled
            ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-gray-200 dark:border-gray-800 py-3"
            : "bg-transparent border-transparent py-6"
          }`}
      >
        <div className="max-w-[1000px] mx-auto px-6 flex items-center justify-between relative z-10">
          <NavLink
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-lg font-bold font-sans tracking-tight text-gray-900 dark:text-white"
          >
            Saikat Bishal
          </NavLink>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => renderItem(item, "text-sm"))}
            <ThemeToggle />
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-900 dark:text-white"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
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
          id="mobile-menu"
          className={`md:hidden absolute top-full left-0 right-0 transition-all duration-200 ${isMobileMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
            }`}
        >
          <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-xl">
            <div className="px-6 py-6 flex flex-col gap-4">
              {navItems.map((item) => renderItem(item, "block w-full text-lg"))}
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
