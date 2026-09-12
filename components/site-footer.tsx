import Link from 'next/link';

const currentYear = 2026;

const footerLinks = {
    content: [
        { href: '/', label: 'Home' },
        { href: '/stories/', label: '⚡ Visual Stories' },
        { href: '/about/', label: 'About' },
        { href: '/authors/', label: 'Authors' },
        { href: '/contact/', label: 'Contact' },
    ],
    legal: [
        { href: '/privacy-policy/', label: 'Privacy Policy' },
        { href: '/terms/', label: 'Terms of Use' },
        { href: '/disclaimer/', label: 'Disclaimer' },
    ],
};

/**
 * Popular/evergreen posts hardcoded in the footer for SEO.
 * This reduces crawl depth: Google can reach these high-value pages
 * from every page on the site (footer = sitewide).
 */
const popularPosts = [
    { href: '/posts/best-gpu-for-1440p-gaming/', label: 'Best GPU for 1440p Gaming' },
    { href: '/posts/how-to-build-a-budget-gaming-pc/', label: 'Build a Budget Gaming PC' },
    { href: '/posts/best-cpu-cooler-for-ryzen-7-7800x3d/', label: 'Best Cooler for 7800X3D' },
    { href: '/posts/how-to-speed-up-a-slow-windows-11-pc-in-under-30-minutes/', label: 'Speed Up Windows 11' },
    { href: '/posts/how-to-choose-the-right-psu-for-your-build/', label: 'Choose the Right PSU' },
    { href: '/posts/what-to-check-first-when-a-pc-wont-boot/', label: 'PC Won\'t Boot? Check This' },
];



export function SiteFooter() {
    return (
        <footer className="site-footer">
            <div className="site-footer__inner">
                <div className="site-footer__brand">
                    <Link href="/" className="site-footer__logo" aria-label="Zyrox home" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <img src="/logo.png" alt="Zyrox Logo" width="40" height="40" loading="lazy" style={{ borderRadius: '8px' }} />
                        Zyrox
                    </Link>
                    <p className="site-footer__tagline">
                        Independent PC hardware guides focused on practical advice, honest analysis, and real-world results.
                    </p>
                </div>

                <nav className="site-footer__nav" aria-label="Footer navigation">
                    <div className="site-footer__col">
                        <p className="site-footer__col-heading">Site</p>
                        <ul>
                            {footerLinks.content.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="site-footer__col">
                        <p className="site-footer__col-heading">Popular Guides</p>
                        <ul>
                            {popularPosts.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="site-footer__col">
                        <p className="site-footer__col-heading">Legal</p>
                        <ul>
                            {footerLinks.legal.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </nav>
            </div>

            <div className="site-footer__bottom">
                <p>© {currentYear} Zyrox. All rights reserved. Independent PC hardware publication.</p>
                <p className="site-footer__disclaimer">
                    Content is provided for informational purposes. See our{' '}
                    <Link href="/terms/">Terms of Use</Link> and{' '}
                    <Link href="/privacy-policy/">Privacy Policy</Link>.
                </p>
            </div>
        </footer>
    );
}
