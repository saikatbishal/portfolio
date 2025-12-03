import React, { useEffect } from 'react';
import { useSound } from '../../hooks/useSound';

const GlobalSound: React.FC = () => {
    const { playClick } = useSound();

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            // Check if the clicked element is a button, link, or has role="button"
            const target = e.target as HTMLElement;
            const clickable = target.closest('button, a, [role="button"], input[type="submit"], input[type="button"], .cursor-pointer');
            
            if (clickable) {
                playClick();
            }
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [playClick]);

    return null;
};

export default GlobalSound;
