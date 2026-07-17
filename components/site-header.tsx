import Link from 'next/link';
import { ReadingListBadge } from './reading-list-badge';

// Internal Next.js pages
const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/authors', label: 'Authors' },
    { href: '/about', label: 'About' },
];

export function SiteHeader() {
    return (
        <header className="site-header">
            <div className="site-header__inner">
                <Link href="/" className="site-header__brand" aria-label="Zyrox home">
                    Zyrox
                </Link>
                <nav aria-label="Primary navigation">
                    {navLinks.map((item) => (
                        <Link key={item.href} href={item.href}>
                            {item.label}
                        </Link>
                    ))}
                    <ReadingListBadge />
                    {/* RSS is a static file — use plain <a> to avoid Next.js router */}
                    <a href="/rss.xml" rel="alternate" type="application/rss+xml">
                        RSS
                    </a>
                </nav>
            </div>
        </header>
    );
}
