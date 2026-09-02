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

            // CRITICAL: Do NOT push if container is hidden (display:none) or has 0 available width!
            // This prevents "TagError: adsbygoogle.push() error: No slot size for availableWidth=0"
            const rect = el.getBoundingClientRect();
            if (rect.width <= 0 || el.offsetWidth <= 0) {
                return;
            }

            pushed.current = true;
            try {
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (err) {
                // Ignore benign AdSense tag errors gracefully
                console.warn('AdSense notice:', err);
            }
        };

        // Try pushing after DOM layout
        const timer = setTimeout(tryPush, 200);

        // If the element starts hidden (e.g. sidebar on mobile or slow flex layout),
        // observe it so we push immediately when it receives positive width.
        let resizeObserver: ResizeObserver | null = null;
        if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
            resizeObserver = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    if (!pushed.current && entry.contentRect.width > 0) {
                        tryPush();
                        if (pushed.current && resizeObserver) {
                            resizeObserver.disconnect();
                        }
                    }
                }
            });
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            clearTimeout(timer);
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        };
    }, [mounted]);

    if (!mounted) return null;

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
                style={{ display: 'block', width: '100%' }}
                data-ad-client="ca-pub-5194383766905175"
                data-ad-slot={dataAdSlot}
                data-ad-format={dataAdFormat}
                data-full-width-responsive={dataFullWidthResponsive ? 'true' : 'false'}
            />
        </div>
    );
}

export function MidArticleAdInjector() {
    const [placeholder, setPlaceholder] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const checkPlaceholder = () => {
            const el = document.getElementById('mid-article-ad-placeholder');
            if (el) {
                setPlaceholder(el);
            }
        };

        // Check after DOM is ready
        const timer = setTimeout(checkPlaceholder, 100);
        return () => clearTimeout(timer);
    }, []);

    if (!placeholder) return null;

    return createPortal(<AdBanner />, placeholder);
}
