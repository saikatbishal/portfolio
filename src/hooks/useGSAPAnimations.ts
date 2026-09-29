import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll animations for the home page.
 *
 * Several sections call this hook, and React StrictMode runs effects twice in
 * development. `gsap.from()` applied twice to the same element records the
 * first call's hidden state (opacity 0) as its end state, so the element stays
 * invisible for good. Two guards prevent that:
 *   1. every element is bound at most once (data-gsap-bound), and
 *   2. everything runs inside a gsap.context that is reverted on unmount,
 *      which restores the elements and kills their ScrollTriggers.
 */
export const useGSAPAnimations = () => {
  useEffect(() => {
    // Content stays visible and static for people who ask for less motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const bound: HTMLElement[] = [];

    // Elements matching `selector` that no other hook instance has animated yet.
    const unbound = (selector: string): HTMLElement[] =>
      gsap.utils.toArray<HTMLElement>(selector).filter((el) => {
        if (el.dataset.gsapBound) return false;
        el.dataset.gsapBound = "1";
        bound.push(el);
        return true;
      });

    const ctx = gsap.context(() => {
      // Experience
      unbound(".experience-item").forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top bottom-=80",
            toggleActions: "play none none reverse",
          },
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        });
      });

      // Contact Form
      unbound(".contact-form").forEach((form) => {
        gsap.from(form, {
          scrollTrigger: {
            trigger: form,
            start: "top center+=100",
            toggleActions: "play none none reverse",
          },
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });
    });

    // Sections are lazy-loaded, so the page keeps growing after triggers are
    // created. Recalculate trigger positions once layout has settled.
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", onLoad);
      ctx.revert();
      bound.forEach((el) => delete el.dataset.gsapBound);
    };
  }, []);
};
