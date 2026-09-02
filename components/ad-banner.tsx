'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface AdBannerProps {
    dataAdSlot?: string;
    dataAdFormat?: 'auto' | 'fluid' | 'rectangle';
    dataFullWidthResponsive?: boolean;
}

export function AdBanner({
    dataAdSlot = '2799753806',
    dataAdFormat = 'auto',
    dataFullWidthResponsive = true
}: AdBannerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const pushed = useRef(false);

    // Lazy load: only activate when ad is near the viewport
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px' } // Start loading 200px before it enters viewport
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!visible || pushed.current) return;

        const pushAd = () => {
            if (pushed.current) return;
            const el = containerRef.current;
            if (!el || el.offsetWidth <= 0) return;

            pushed.current = true;
            try {
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                // Silently ignore
            }
        };

        const timer = setTimeout(pushAd, 300);
        return () => clearTimeout(timer);
    }, [visible]);

    return (
        <div
            ref={containerRef}
            className="ad-container"
        >
            {visible && (
                <ins
                    className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client="ca-pub-5194383766905175"
                    data-ad-slot={dataAdSlot}
                    data-ad-format={dataAdFormat}
                    data-full-width-responsive={dataFullWidthResponsive ? 'true' : 'false'}
                />
            )}
        </div>
    );
}

/**
 * Finds all mid-article-ad-placeholder-* divs in the DOM
 * and portals an AdBanner into each one after hydration.
 */
export function MidArticleAdInjector() {
    const [placeholders, setPlaceholders] = useState<HTMLElement[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const els: HTMLElement[] = [];
            for (let i = 0; i < 5; i++) {
                const el = document.getElementById(`mid-article-ad-placeholder-${i}`);
                if (el) els.push(el);
            }
            if (els.length > 0) setPlaceholders(els);
        }, 200);
        return () => clearTimeout(timer);
    }, []);

    if (placeholders.length === 0) return null;

    return (
        <>
            {placeholders.map((el, idx) => createPortal(<AdBanner key={idx} />, el))}
        </>
    );
}
