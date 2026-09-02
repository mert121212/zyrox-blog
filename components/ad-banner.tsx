'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface AdBannerProps {
    dataAdSlot?: string;
    dataAdFormat?: 'auto' | 'fluid' | 'rectangle';
    dataFullWidthResponsive?: boolean;
}

export function AdBanner({ dataAdSlot = '2799753806', dataAdFormat = 'auto', dataFullWidthResponsive = true }: AdBannerProps) {
    const [mounted, setMounted] = useState(false);
    const pushed = useRef(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || pushed.current) return;
        pushed.current = true;

        const timer = setTimeout(() => {
            try {
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (error) {
                console.error('AdSense error:', error);
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [mounted]);

    if (!mounted) return null;

    return (
        <div style={{ margin: '2rem 0', textAlign: 'center', overflow: 'hidden', minHeight: '100px' }}>
            <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-5194383766905175"
                data-ad-slot={dataAdSlot}
                data-ad-format={dataAdFormat}
                data-full-width-responsive={dataFullWidthResponsive ? "true" : "false"}>
            </ins>
        </div>
    );
}

export function MidArticleAdInjector() {
    const [placeholder, setPlaceholder] = useState<HTMLElement | null>(null);

    useEffect(() => {
        // Wait a small tick for the DOM to be ready inside dangerouslySetInnerHTML
        const timer = setTimeout(() => {
            const el = document.getElementById('mid-article-ad-placeholder');
            if (el) setPlaceholder(el);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    if (!placeholder) return null;

    return createPortal(<AdBanner />, placeholder);
}
