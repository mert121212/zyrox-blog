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
    const [shouldRenderAd, setShouldRenderAd] = useState(false);
    const pushed = useRef(false);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const checkVisibility = () => {
            if (pushed.current) return;
            // Only allow rendering the <ins> tag if container is visible and has width > 0
            if (el.offsetWidth > 0 && el.offsetHeight >= 0 && window.getComputedStyle(el).display !== 'none') {
                setShouldRenderAd(true);
            }
        };

        // Check on mount
        checkVisibility();

        // Check via ResizeObserver if initially hidden (e.g. mobile responsive sidebar)
        let observer: ResizeObserver | null = null;
        if (typeof ResizeObserver !== 'undefined') {
            observer = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    if (entry.contentRect.width > 0) {
                        checkVisibility();
                    }
                }
            });
            observer.observe(el);
        }

        return () => {
            if (observer) observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!shouldRenderAd || pushed.current) return;

        // Give the browser time to layout the newly rendered <ins> tag
        const timer = setTimeout(() => {
            if (pushed.current) return;
            const el = containerRef.current;
            if (el && el.offsetWidth > 0) {
                pushed.current = true;
                try {
                    // @ts-ignore
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                } catch (err) {
                    // Suppress any benign ad push errors
                    console.warn('AdSense notice:', err);
                }
            }
        }, 150);

        return () => clearTimeout(timer);
    }, [shouldRenderAd]);

    return (
        <div
            ref={containerRef}
            style={{
                margin: '2rem 0',
                textAlign: 'center',
                overflow: 'hidden',
                minHeight: shouldRenderAd ? '100px' : '0px',
                width: '100%',
                display: 'block'
            }}
        >
            {shouldRenderAd && (
                <ins
                    className="adsbygoogle"
                    style={{ display: 'block', width: '100%' }}
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
        }, 150);
        return () => clearTimeout(timer);
    }, []);

    if (placeholders.length === 0) return null;

    return (
        <>
            {placeholders.map((el, idx) => createPortal(<AdBanner key={idx} />, el))}
        </>
    );
}
