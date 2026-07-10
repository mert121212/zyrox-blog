import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

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
    return (
        <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
            <body>
                <SiteHeader />
                {children}
                <SiteFooter />
            </body>
        </html>
    );
}
