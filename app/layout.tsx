import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import dynamic from 'next/dynamic';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

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
    alternates: {
        canonical: '/',
    },
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
                {/* Google tag (gtag.js) */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-3Q3BBMSERB"></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-3Q3BBMSERB');
                        `,
                    }}
                />
            </head>
            <body>
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
            </body>
        </html>
    );
}
