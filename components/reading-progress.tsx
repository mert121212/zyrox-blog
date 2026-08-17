'use client';

import { useEffect, useState } from 'react';

export function ReadingProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let ticking = false;
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight > 0) {
                setProgress(Math.min((scrollTop / docHeight) * 100, 100));
            }
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(updateProgress);
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        updateProgress();

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className="reading-progress-bar">
            <div 
                className="reading-progress-fill" 
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
