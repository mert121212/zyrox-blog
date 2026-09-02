'use client';

import { useEffect } from 'react';

/**
 * Loads the AdSense script after React hydration using vanilla JS.
 * This avoids:
 * 1. Hydration mismatch (script loads after hydration)
 * 2. data-nscript attribute error (next/script adds this, AdSense rejects it)
 */
export function AdSenseScript() {
    useEffect(() => {
        // Don't load if already loaded
        if (document.querySelector('script[src*="adsbygoogle"]')) return;

        const script = document.createElement('script');
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5194383766905175';
        script.async = true;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
    }, []);

    return null;
}
