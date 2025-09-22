import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useGSAPAnimations = () => {
  useEffect(() => {
    // Navbar Animation
    // gsap.from(".nav-item", {
    //   y: -50,
    //   opacity: 0,
    //   stagger: 0.1,
    //   duration: 0.8,
    //   ease: "power2.out",
    // });

    // Hero Title Animation (letter by letter)
    const heroTitle = document.querySelector(".hero-title");
    if (heroTitle) {
      const text = heroTitle.textContent || "";
      heroTitle.textContent = "";
      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.display = "inline-block";
        heroTitle.appendChild(span);
      });

      gsap.from(".hero-title span", {
        y: 100,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        ease: "back.out(1.7)",
      });
    }

    // Project Cards Animation
    gsap.utils.toArray(".project-card").forEach((card) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          end: "top center",
          toggleActions: "play none none reverse",
          scrub: 1,
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
    });

    // Experience Section Animation
    gsap.utils.toArray(".experience-item").forEach((item: Element) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top center+=100",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    });

    // Skills Animation
    gsap.utils.toArray(".skill-item").forEach((skill: Element, i: number) => {
      gsap.from(skill, {
        scrollTrigger: {
          trigger: skill,
          start: "top center+=150",
          toggleActions: "play none none reverse",
        },
        scale: 0.5,
        opacity: 0,
        duration: 0.5,
        delay: i * 0.1,
        ease: "back.out(1.7)",
      });
    });

    // Contact Form Animation
    gsap.from(".contact-form", {
      scrollTrigger: {
        trigger: ".contact-form",
        start: "top center+=100",
        toggleActions: "play none none reverse",
      },
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);
};
