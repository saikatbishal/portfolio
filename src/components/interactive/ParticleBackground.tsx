import { useCallback, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticleBackground = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();
    
    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  const particlesInit = useCallback(async (engine: any) => {
    console.log("Initializing particles...");
    await loadFull(engine);
    console.log("Particles initialized successfully");
  }, []);

  const particlesLoaded = useCallback(async (container: any) => {
    console.log("Particles loaded:", container);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none'
      }}
      options={{
        particles: {
          number: {
            value: 60,
          },
          color: {
            value: isDark ? "#60a5fa" : "#6366f1",
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: isDark ? 0.4 : 0.6,
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.1,
              sync: false,
            },
          },
          size: {
            value: {
              min: 1,
              max: 4,
            },
            animation: {
              enable: true,
              speed: 2,
              minimumValue: 0.5,
              sync: false,
            },
          },
          links: {
            enable: true,
            distance: 150,
            color: isDark ? "#60a5fa" : "#6366f1",
            opacity: isDark ? 0.3 : 0.4,
            width: 1.5,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            straight: false,
            outModes: {
              default: "bounce",
            },
            attract: {
              enable: false,
              rotate: { x: 600, y: 1200 },
            },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
            onClick: {
              enable: true,
              mode: "push",
            },
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
            push: {
              quantity: 4,
            },
          },
        },
        background: {
          color: "transparent",
        },
      }}
    />
  );
};

export default ParticleBackground;