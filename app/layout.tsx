import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { BackToTop } from '@/components/back-to-top';

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
    metadataBase: new URL('https://zyroxnet.netlify.app'),
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
        url: 'https://zyroxnet.netlify.app',
        description: 'A sharp, technical blog about PC hardware, builds, troubleshooting, and performance tuning.',
        potentialAction: {
            '@type': 'SearchAction',
            target: 'https://zyroxnet.netlify.app/?search={search_term_string}',
            'query-input': 'required name=search_term_string',
        },
    };

    const organizationJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Zyrox',
        url: 'https://zyroxnet.netlify.app',
        description: 'Authoritative hardware guides and practical build advice.',
        logo: 'https://zyroxnet.netlify.app/logo.png',
        sameAs: [
            'https://twitter.com/zyrox',
        ],
    };

    return (
        <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
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
