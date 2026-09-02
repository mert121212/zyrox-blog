'use client';

import { useEffect } from 'react';

/**
 * Loads the AdSense script lazily — waits until the page is idle
 * or the user starts scrolling, whichever comes first.
 * This dramatically improves initial page load speed (LCP, TBT, CLS).
 */
export function AdSenseScript() {
    useEffect(() => {
        // Don't load if already loaded
        if (document.querySelector('script[src*="adsbygoogle"]')) return;

        const loadScript = () => {
            if (document.querySelector('script[src*="adsbygoogle"]')) return;
            const script = document.createElement('script');
            script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5194383766905175';
            script.async = true;
            script.crossOrigin = 'anonymous';
            document.head.appendChild(script);
        };

        // Strategy: Load on first user interaction or after 3 seconds idle
        let loaded = false;
        const triggerLoad = () => {
            if (loaded) return;
            loaded = true;
            loadScript();
            // Cleanup listeners
            window.removeEventListener('scroll', triggerLoad);
            window.removeEventListener('mousemove', triggerLoad);
            window.removeEventListener('touchstart', triggerLoad);
        };

        // Load after 3 seconds (idle) OR on first interaction
        const idleTimer = setTimeout(triggerLoad, 3000);
        window.addEventListener('scroll', triggerLoad, { once: true, passive: true });
        window.addEventListener('mousemove', triggerLoad, { once: true, passive: true });
        window.addEventListener('touchstart', triggerLoad, { once: true, passive: true });

        return () => {
            clearTimeout(idleTimer);
            window.removeEventListener('scroll', triggerLoad);
            window.removeEventListener('mousemove', triggerLoad);
            window.removeEventListener('touchstart', triggerLoad);
        };
    }, []);

    return null;
}
