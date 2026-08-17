'use client';

import { useState, useEffect } from 'react';

export function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let ticking = false;
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 500);
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(toggleVisibility);
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="back-to-top"
            aria-label="Back to top"
        >
            ↑
        </button>
    );
}
