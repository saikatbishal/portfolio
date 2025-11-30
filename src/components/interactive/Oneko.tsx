import { useEffect, useRef } from 'react';
import { Neko } from 'neko-ts';

const Oneko = () => {
  // Use a ref to store the Neko instance so it persists across renders
  const neko = useRef<Neko | null>(null);

  useEffect(() => {
    // Initialize Neko only once
    if (!neko.current) {
      neko.current = new Neko({
        speed: 10,
        origin: { x: 100, y: 100 },
      });
    }

    // Cleanup isn't strictly necessary for a global effect, 
    // but good practice if you unmount the component
    return () => {
      if (neko.current) {
        // neko-ts might not have a destroy method exposed easily,
        // but usually, this cat lives as long as the app does.
      }
    };
  }, []);

  return null; // This component renders nothing visually itself
};

export default Oneko;