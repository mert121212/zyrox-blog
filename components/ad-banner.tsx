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
    const [mounted, setMounted] = useState(false);
    const pushed = useRef(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || pushed.current) return;

        const pushAd = () => {
            if (pushed.current) return;
            const el = containerRef.current;
            if (!el) return;

            if (el.offsetWidth > 0) {
                pushed.current = true;
                try {
                    // @ts-ignore
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                } catch (e) {
                    // Silently ignore any benign push errors
                }
            }
        };

        const timer = setTimeout(pushAd, 200);
        return () => clearTimeout(timer);
    }, [mounted]);

    if (!mounted) {
        return (
            <div
                style={{
                    margin: '2rem 0',
                    textAlign: 'center',
                    minHeight: '100px',
                    width: '100%'
                }}
            />
        );
    }

    return (
        <div
            ref={containerRef}
            style={{
                margin: '2rem 0',
                textAlign: 'center',
                overflow: 'hidden',
                minHeight: '100px',
                width: '100%',
                display: 'block'
            }}
        >
            <ins
                className="adsbygoogle"
                style={{
                    display: 'block',
                    width: '100%',
                    minHeight: '100px',
                    textAlign: 'center'
                }}
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
