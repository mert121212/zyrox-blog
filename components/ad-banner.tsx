'use client';

import { useEffect } from 'react';

interface AdBannerProps {
    dataAdSlot: string;
    dataAdFormat?: 'auto' | 'fluid' | 'rectangle';
    dataFullWidthResponsive?: boolean;
}

export function AdBanner({ dataAdSlot, dataAdFormat = 'auto', dataFullWidthResponsive = true }: AdBannerProps) {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
            console.error('AdSense error:', error);
        }
    }, []);

    return (
        <div style={{ margin: '2rem 0', textAlign: 'center', overflow: 'hidden' }}>
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
