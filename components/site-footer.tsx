import Link from 'next/link';

const currentYear = 2026;

const footerLinks = {
    content: [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/authors', label: 'Authors' },
    ],
    legal: [
        { href: '/privacy-policy', label: 'Privacy Policy' },
        { href: '/terms', label: 'Terms of Use' },
    ],
    feeds: [
        { href: '/rss.xml', label: 'RSS Feed' },
        { href: '/sitemap.xml', label: 'Sitemap' },
    ],
};

export function SiteFooter() {
    return (
        <footer className="site-footer">
            <div className="site-footer__inner">
                <div className="site-footer__brand">
                    <Link href="/" className="site-footer__logo" aria-label="Zyrox home">
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
                        <p className="site-footer__col-heading">Legal</p>
                        <ul>
                            {footerLinks.legal.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="site-footer__col">
                        <p className="site-footer__col-heading">Feeds</p>
                        <ul>
                            {footerLinks.feeds.map((link) => (
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
                    <Link href="/terms">Terms of Use</Link> and{' '}
                    <Link href="/privacy-policy">Privacy Policy</Link>.
                </p>
            </div>
        </footer>
    );
}
