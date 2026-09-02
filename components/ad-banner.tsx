'use client';

import { useEffect, useRef, useState } from 'react';

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

/**
 * Injects an ad unit into article HTML content after approximately the Nth paragraph.
 * This is used to insert mid-article ads without needing React components inside
 * dangerouslySetInnerHTML content.
 */
export function injectMidArticleAd(html: string, afterParagraph: number = 4): string {
    const adHtml = `
        <div style="margin:2rem 0;text-align:center;overflow:hidden;min-height:100px" class="mid-article-ad">
            <ins class="adsbygoogle"
                style="display:block"
                data-ad-client="ca-pub-5194383766905175"
                data-ad-slot="2799753806"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </div>
    `;

    // Split by closing </p> tags and inject after the Nth one
    const parts = html.split('</p>');
    if (parts.length <= afterParagraph) {
        // Not enough paragraphs, inject before the last one
        const midPoint = Math.floor(parts.length / 2);
        parts.splice(midPoint, 0, '</p>' + adHtml);
        return parts.join('</p>');
    }

    parts.splice(afterParagraph, 0, '</p>' + adHtml);
    return parts.join('</p>');
}
