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
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const pushed = useRef(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || pushed.current) return;

        const tryPush = () => {
            if (pushed.current) return;
            const el = containerRef.current;
            if (!el) return;

            const rect = el.getBoundingClientRect();
            if (rect.width <= 0 || el.offsetWidth <= 0) return;

            pushed.current = true;
            try {
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (err) {
                console.warn('AdSense notice:', err);
            }
        };

        const timer = setTimeout(tryPush, 300);

        let resizeObserver: ResizeObserver | null = null;
        if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
            resizeObserver = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    if (!pushed.current && entry.contentRect.width > 0) {
                        tryPush();
                        if (pushed.current && resizeObserver) resizeObserver.disconnect();
                    }
                }
            });
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            clearTimeout(timer);
            if (resizeObserver) resizeObserver.disconnect();
        };
    }, [mounted]);

    if (!mounted) return null;

    return (
        <div ref={containerRef} style={{ margin: '2rem 0', textAlign: 'center', overflow: 'hidden', minHeight: '100px', width: '100%' }}>
            <ins className="adsbygoogle"
                style={{ display: 'block', width: '100%' }}
                data-ad-client="ca-pub-5194383766905175"
                data-ad-slot={dataAdSlot}
                data-ad-format={dataAdFormat}
                data-full-width-responsive={dataFullWidthResponsive ? 'true' : 'false'}
            />
        </div>
    );
}

/**
 * Finds all mid-article-ad-placeholder-* divs in the DOM
 * and portals an AdBanner into each one.
 */
export function MidArticleAdInjector() {
    const [placeholders, setPlaceholders] = useState<HTMLElement[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const els: HTMLElement[] = [];
            // Find all placeholders (mid-article-ad-placeholder-0, mid-article-ad-placeholder-1, etc.)
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
