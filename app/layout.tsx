import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import dynamic from 'next/dynamic';

import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { CookieBanner } from '@/components/cookie-banner';
import { AdSenseScript } from '@/components/adsense-script';

// Client-only — uses scroll event listener, must not SSR
const BackToTop = dynamic(
    () => import('@/components/back-to-top').then((m) => ({ default: m.BackToTop })),
    { ssr: false },
);

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space', display: 'swap' });

export const metadata: Metadata = {
    title: {
        default: 'Zyrox | PC Hardware & Build Insights',
        template: '%s | Zyrox',
    },
    description:
        'A sharp, technical blog about PC hardware, builds, troubleshooting, and performance tuning.',
    keywords: ['PC hardware', 'PC building', 'NVMe SSD', 'BIOS tuning', 'overclocking'],
    metadataBase: new URL('https://zyroxlab.com'),
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: 'Zyrox',
        description: 'Authoritative hardware guides and practical build advice.',
        type: 'website',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Zyrox',
        url: 'https://zyroxlab.com',
        description: 'A sharp, technical blog about PC hardware, builds, troubleshooting, and performance tuning.',
        potentialAction: {
            '@type': 'SearchAction',
            target: 'https://zyroxlab.com/?search={search_term_string}',
            'query-input': 'required name=search_term_string',
        },
    };

    const organizationJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Zyrox',
        url: 'https://zyroxlab.com',
        description: 'Authoritative hardware guides and practical build advice.',
        logo: 'https://zyroxlab.com/logo.png',
        sameAs: [
            'https://twitter.com/zyrox',
        ],
    };

    return (
        <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
            <head>
                {/* Preconnect to third-party origins for faster resource loading */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
                <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

                {/* Google Analytics — deferred until browser idle or 5s */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-3Q3BBMSERB');
                            (function(){
                                function loadGA(){
                                    if(document.querySelector('script[src*="googletagmanager"]'))return;
                                    var s=document.createElement('script');
                                    s.src='https://www.googletagmanager.com/gtag/js?id=G-3Q3BBMSERB';
                                    s.async=true;
                                    document.head.appendChild(s);
                                }
                                if('requestIdleCallback' in window){
                                    requestIdleCallback(loadGA,{timeout:5000});
                                }else{
                                    setTimeout(loadGA,5000);
                                }
                            })();
                        `,
                    }}
                />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </head>
            <body suppressHydrationWarning>
                {/* AdSense — loaded AFTER React hydration via vanilla JS to avoid data-nscript error */}
                <AdSenseScript />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
                />
                <SiteHeader />
                {children}
                <SiteFooter />
                <BackToTop />
                <CookieBanner />
            </body>
        </html>
    );
}
