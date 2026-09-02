'use client';

import { useEffect, useRef } from 'react';

interface AdBannerProps {
    dataAdSlot?: string;
    dataAdFormat?: 'auto' | 'fluid' | 'rectangle';
    dataFullWidthResponsive?: boolean;
}

export function AdBanner({ dataAdSlot = '2799753806', dataAdFormat = 'auto', dataFullWidthResponsive = true }: AdBannerProps) {
    const adRef = useRef<HTMLDivElement>(null);
    const pushed = useRef(false);

    useEffect(() => {
        if (pushed.current) return;
        pushed.current = true;

        try {
            const timer = setTimeout(() => {
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }, 300);
            return () => clearTimeout(timer);
        } catch (error) {
            console.error('AdSense error:', error);
        }
    }, []);

    return (
        <div ref={adRef} style={{ margin: '2rem 0', textAlign: 'center', overflow: 'hidden', minHeight: '100px' }}>
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
