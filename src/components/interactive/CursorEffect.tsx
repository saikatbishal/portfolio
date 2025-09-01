import { useEffect } from "react";

const CursorEffect = () => {
  useEffect(() => {
    // Prevent text selection on double click
    const preventDoubleClickSelection = (e: MouseEvent) => {
      if (e.detail >= 2) { // Double click or more
        e.preventDefault();
        e.stopPropagation();
        // Clear any existing selection
        if (window.getSelection) {
          const selection = window.getSelection();
          if (selection) {
            selection.removeAllRanges();
          }
        }
        // For older browsers
        if ((document as any).selection) {
          (document as any).selection.empty();
        }
      }
    };

    // Add global double-click prevention
    document.addEventListener('mousedown', preventDoubleClickSelection, true);

    // Check if device supports hover (desktop)
    if (!window.matchMedia("(hover: hover)").matches) {
      return () => {
        document.removeEventListener('mousedown', preventDoubleClickSelection, true);
      };
    }

    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: var(--primary);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: difference;
      transition: transform 0.1s ease;
      transform: translate(-50%, -50%);
    `;
    
    document.body.appendChild(cursor);

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };

    const handleMouseEnter = () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
    };

    const handleMouseLeave = () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
    };

    // Add event listeners
    window.addEventListener("mousemove", moveCursor);
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll("a, button, input, textarea, select, [role='button']");
    interactiveElements.forEach(el => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousedown', preventDoubleClickSelection, true);
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      if (document.body.contains(cursor)) {
        document.body.removeChild(cursor);
      }
    };
  }, []);

  return null;
};

export default CursorEffect;